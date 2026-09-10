<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PlatformSetting;
use Illuminate\Http\Request;

class PlatformSettingController extends Controller
{
    public function publicConfig()
    {
        $settings = $this->current();

        return response()->json([
            'platformName' => $settings['platformName'] ?? 'Designs Clue',
            'supportEmail' => $settings['supportEmail'] ?? 'support@designsclue.com',
            'razorpayKeyId' => ! empty($settings['razorpayKeyId']) ? $settings['razorpayKeyId'] : env('RAZORPAY_KEY_ID', ''),
            'allowSelfSignup' => $settings['allowSelfSignup'] ?? true,
            'liveClassesSettings' => $settings['liveClassesSettings'] ?? PlatformSetting::defaults()['liveClassesSettings'],
            'studentsList' => $settings['studentsList'] ?? (PlatformSetting::defaults()['studentsList'] ?? []),
            'subscribersList' => $settings['subscribersList'] ?? (PlatformSetting::defaults()['subscribersList'] ?? []),
        ]);
    }

    public function subscribe(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|max:50',
        ]);

        $phone = trim($request->input('phone'));
        $row = PlatformSetting::firstOrCreate(
            ['key' => PlatformSetting::DEFAULT_KEY],
            ['data' => PlatformSetting::defaults()],
        );

        $data = $row->data;
        $subscribers = $data['subscribersList'] ?? [];

        // Check if already subscribed
        $existing = false;
        foreach ($subscribers as $s) {
            if (isset($s['phone']) && trim($s['phone']) === $phone) {
                $existing = true;
                break;
            }
        }

        if (! $existing) {
            $newSubscriber = [
                'id' => 'sub-' . uniqid(),
                'phone' => $phone,
                'source' => $request->input('source', 'Homepage Newsletter'),
                'status' => 'Active',
                'subscribedDate' => date('d M Y'),
                'subscribedTime' => date('h:i A'),
                'created_at' => now()->toISOString(),
            ];
            array_unshift($subscribers, $newSubscriber);
            $data['subscribersList'] = $subscribers;
            $row->update(['data' => $data]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Thank you for subscribing!',
            'phone' => $phone,
            'subscribersList' => $subscribers,
        ]);
    }

    public function show()
    {
        return response()->json($this->current());
    }

    public function update(Request $request)
    {
        $row = PlatformSetting::firstOrCreate(
            ['key' => PlatformSetting::DEFAULT_KEY],
            ['data' => PlatformSetting::defaults()],
        );

        $merged = array_replace_recursive($row->data, $request->all());
        $row->update(['data' => $merged]);

        return response()->json($merged);
    }

    private function current(): array
    {
        $row = PlatformSetting::firstOrCreate(
            ['key' => PlatformSetting::DEFAULT_KEY],
            ['data' => PlatformSetting::defaults()],
        );

        return $row->data;
    }
}
