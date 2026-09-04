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
            'plan' => ['required', 'in:Starter,Growth'],
            'billingCycle' => ['required', 'in:monthly,annual'],
        ]);

        $settings = PlatformSetting::firstOrCreate(
            ['key' => PlatformSetting::DEFAULT_KEY],
            ['data' => PlatformSetting::defaults()],
        )->data;

        $keyId = $settings['razorpayKeyId'] ?? '';
        $keySecret = $settings['razorpayKeySecret'] ?? '';

        if (! $keyId || ! $keySecret) {
            return response()->json(['error' => 'Razorpay is not configured yet. Add the API keys in Super Admin settings.'], 422);
        }

        $monthlyPrice = (int) ($settings['planPricing'][$data['plan']] ?? 0);
        $amountInRupees = $data['billingCycle'] === 'annual'
            ? $monthlyPrice * 12
            : (int) ceil($monthlyPrice / 0.6);
        $amountInPaise = $amountInRupees * 100;

        $receipt = 'sub_'.uniqid();

        try {
            $response = Http::withBasicAuth($keyId, $keySecret)
                ->post('https://api.razorpay.com/v1/orders', [
                    'amount' => $amountInPaise,
                    'currency' => 'INR',
                    'receipt' => $receipt,
                ]);
        } catch (ConnectionException $e) {
            return response()->json(['error' => 'Could not reach Razorpay. Please try again.'], 502);
        }

        if (! $response->successful()) {
            $razorpayError = $response->json('error.description') ?? $response->body();

            return response()->json([
                'error' => 'Could not create Razorpay order: '.$razorpayError,
            ], 502);
        }

        $order = $response->json();

        $subscription = Subscription::create([
            'user_id' => $request->user()->id,
            'plan' => $data['plan'],
            'billing_cycle' => $data['billingCycle'],
            'amount' => $amountInRupees,
            'currency' => 'INR',
            'status' => 'pending',
            'razorpay_order_id' => $order['id'],
        ]);

        return response()->json([
            'subscriptionId' => $subscription->id,
            'orderId' => $order['id'],
            'amount' => $amountInPaise,
            'currency' => 'INR',
            'keyId' => $keyId,
        ]);
    }

    public function verify(Request $request)
    {
        $data = $request->validate([
            'subscriptionId' => ['required', 'integer'],
            'razorpay_order_id' => ['required', 'string'],
            'razorpay_payment_id' => ['required', 'string'],
            'razorpay_signature' => ['required', 'string'],
        ]);

        $subscription = Subscription::where('id', $data['subscriptionId'])
            ->where('user_id', $request->user()->id)
            ->where('razorpay_order_id', $data['razorpay_order_id'])
            ->firstOrFail();

        $settings = PlatformSetting::firstOrCreate(
            ['key' => PlatformSetting::DEFAULT_KEY],
            ['data' => PlatformSetting::defaults()],
        )->data;
        $keySecret = $settings['razorpayKeySecret'] ?? '';

        $expectedSignature = hash_hmac(
            'sha256',
            $data['razorpay_order_id'].'|'.$data['razorpay_payment_id'],
            $keySecret,
        );

        if (! hash_equals($expectedSignature, $data['razorpay_signature'])) {
            return response()->json(['error' => 'Payment verification failed.'], 422);
        }

        $startsAt = now();
        $endsAt = $subscription->billing_cycle === 'annual'
            ? $startsAt->copy()->addYear()
            : $startsAt->copy()->addMonth();

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
