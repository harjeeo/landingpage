<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PlatformSetting;
use App\Models\Subscription;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SubscriptionController extends Controller
{
    private const PLAN_KEYS = ['Starter', 'Growth'];

    public function checkout(Request $request)
    {
        $data = $request->validate([
            'plan' => ['nullable', 'string'],
            'courseSlug' => ['nullable', 'string'],
            'courseTitle' => ['nullable', 'string'],
            'classMode' => ['nullable', 'in:online,offline'],
            'amount' => ['nullable', 'numeric'],
            'billingCycle' => ['nullable', 'string'],
        ]);

        $settings = PlatformSetting::firstOrCreate(
            ['key' => PlatformSetting::DEFAULT_KEY],
            ['data' => PlatformSetting::defaults()],
        )->data;

        $keyId = ! empty($settings['razorpayKeyId']) ? $settings['razorpayKeyId'] : env('RAZORPAY_KEY_ID', '');
        $keySecret = ! empty($settings['razorpayKeySecret']) ? $settings['razorpayKeySecret'] : env('RAZORPAY_KEY_SECRET', '');

        // Check if this is a Course enrollment or a Subscription plan
        $isCourse = ! empty($data['courseSlug']) || ! empty($data['classMode']) || ! empty($data['courseTitle']);

        if ($isCourse) {
            $classMode = $data['classMode'] ?? 'online';
            $planName = $data['courseTitle'] ?? ($data['courseSlug'] ?? 'Course Enrollment');
            $billingCycle = 'course_'.$classMode;

            if (! empty($data['amount'])) {
                $amountInRupees = (int) $data['amount'];
            } else {
                $amountInRupees = $classMode === 'offline' ? 4999 : 2999;
            }
        } else {
            $planName = $data['plan'] ?? 'Starter';
            $billingCycle = $data['billingCycle'] ?? 'monthly';
            $monthlyPrice = (int) ($settings['planPricing'][$planName] ?? 0);
            $amountInRupees = $billingCycle === 'annual'
                ? (int) round($monthlyPrice * 0.6) * 12
                : $monthlyPrice;
        }

        $amountInPaise = $amountInRupees * 100;
        $receipt = 'order_'.uniqid();

        if (! $keyId || ! $keySecret) {
            $subscription = Subscription::create([
                'user_id' => $request->user()->id,
                'plan' => $planName,
                'billing_cycle' => $billingCycle,
                'amount' => $amountInRupees,
                'currency' => 'INR',
                'status' => 'pending',
                'razorpay_order_id' => 'sandbox_order_'.uniqid(),
            ]);

            return response()->json([
                'isMock' => true,
                'subscriptionId' => $subscription->id,
                'orderId' => null,
                'amount' => $amountInPaise,
                'currency' => 'INR',
                'keyId' => null,
                'message' => 'Razorpay keys not configured yet in Super Admin settings.',
            ]);
        }

        $orderId = null;

        try {
            $response = Http::withBasicAuth($keyId, $keySecret)
                ->timeout(4)
                ->post('https://api.razorpay.com/v1/orders', [
                    'amount' => $amountInPaise,
                    'currency' => 'INR',
                    'receipt' => $receipt,
                ]);

            if ($response->successful()) {
                $order = $response->json();
                $orderId = $order['id'] ?? null;
            }
        } catch (\Throwable $e) {
            // If server-side order creation is unreachable, client-side Razorpay will still open with keyId
            $orderId = null;
        }

        $subscription = Subscription::create([
            'user_id' => $request->user()->id,
            'plan' => $planName,
            'billing_cycle' => $billingCycle,
            'amount' => $amountInRupees,
            'currency' => 'INR',
            'status' => 'pending',
            'razorpay_order_id' => $orderId ?? ('order_dc_'.uniqid()),
        ]);

        return response()->json([
            'subscriptionId' => $subscription->id,
            'orderId' => $orderId,
            'amount' => $amountInPaise,
            'currency' => 'INR',
            'keyId' => $keyId,
        ]);
    }

    public function verify(Request $request)
    {
        $data = $request->validate([
            'subscriptionId' => ['required', 'integer'],
            'razorpay_order_id' => ['nullable', 'string'],
            'razorpay_payment_id' => ['required', 'string'],
            'razorpay_signature' => ['nullable', 'string'],
        ]);

        $subscription = Subscription::where('id', $data['subscriptionId'])
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $settings = PlatformSetting::firstOrCreate(
            ['key' => PlatformSetting::DEFAULT_KEY],
            ['data' => PlatformSetting::defaults()],
        )->data;
        $keySecret = ! empty($settings['razorpayKeySecret']) ? $settings['razorpayKeySecret'] : env('RAZORPAY_KEY_SECRET', '');

        $isSandbox = empty($keySecret) || str_starts_with($subscription->razorpay_order_id ?? '', 'sandbox_') || str_starts_with($data['razorpay_order_id'], 'sandbox_');

        if (! $isSandbox) {
            $expectedSignature = hash_hmac(
                'sha256',
                $data['razorpay_order_id'].'|'.$data['razorpay_payment_id'],
                $keySecret,
            );

            if (! hash_equals($expectedSignature, $data['razorpay_signature'])) {
                return response()->json(['error' => 'Payment verification failed.'], 422);
            }
        }

        $startsAt = now();
        $endsAt = str_starts_with($subscription->billing_cycle ?? '', 'course_')
            ? $startsAt->copy()->addYears(10) // Lifetime access for courses
            : ($subscription->billing_cycle === 'annual'
                ? $startsAt->copy()->addYear()
                : $startsAt->copy()->addMonth());

        $subscription->update([
            'status' => 'active',
            'razorpay_payment_id' => $data['razorpay_payment_id'],
            'razorpay_signature' => $data['razorpay_signature'],
            'starts_at' => $startsAt,
            'ends_at' => $endsAt,
        ]);

        return response()->json($this->mapSubscription($subscription));
    }

    public function mine(Request $request)
    {
        $subscriptions = Subscription::where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'items' => $subscriptions->map(fn ($s) => $this->mapSubscription($s)),
        ]);
    }

    private function mapSubscription(Subscription $s): array
    {
        return [
            'id' => $s->id,
            'plan' => $s->plan,
            'billingCycle' => $s->billing_cycle,
            'amount' => $s->amount,
            'currency' => $s->currency,
            'status' => $s->status,
            'startsAt' => $s->starts_at,
            'endsAt' => $s->ends_at,
        ];
    }
}
