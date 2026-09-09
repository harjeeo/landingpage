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
