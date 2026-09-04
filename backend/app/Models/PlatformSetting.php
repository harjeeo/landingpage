<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlatformSetting extends Model
{
    protected $fillable = ['key', 'data'];

    protected $casts = [
        'data' => 'array',
    ];

    public const DEFAULT_KEY = 'default';

    public static function defaults(): array
    {
        return [
            'platformName' => 'Ojar',
            'supportEmail' => 'support@designsclue.com',
            'billingEmail' => 'billing@designsclue.com',
            'trialDays' => 7,
            'planPricing' => [
                'Starter' => 399,
                'Growth' => 599,
            ],
            'allowSelfSignup' => true,
            'emailSettings' => [
                'provider' => 'none',
                'fromName' => '',
                'fromEmail' => '',
                'mailjet' => ['apiKey' => '', 'apiSecret' => ''],
                'brevo' => ['apiKey' => ''],
            ],
            'smsSettings' => [
                'provider' => 'none',
                'twilio' => ['accountSid' => '', 'authToken' => '', 'fromNumber' => ''],
            ],
            'razorpayKeyId' => '',
            'razorpayKeySecret' => '',
        ];
    }
}
