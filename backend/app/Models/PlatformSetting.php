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
            'liveClassesSettings' => [
                'todayClass' => [
                    'isLive' => true,
                    'targetCourse' => 'ui-design-masterclass',
                    'courseTitle' => 'UI/UX Design Masterclass',
                    'topic' => 'Mastering Figma Auto Layout, Variables & Component Props',
                    'batchCode' => 'Batch #04 (Evening)',
                    'mentor' => 'Harpreet Singh',
                    'time' => 'Today, 7:00 PM – 8:30 PM IST',
                    'platform' => 'Google Meet',
                    'meetLink' => 'https://meet.google.com/dc-uiux-live',
                ],
                'weekSessions' => [
                    [
                        'id' => 'sess-1',
                        'day' => 'Today',
                        'date' => '8 Sep',
                        'time' => '7:00 PM',
                        'course' => 'UI/UX Design Masterclass',
                        'topic' => 'Mastering Figma Auto Layout & Component Props',
                        'isToday' => true,
                        'platform' => 'Google Meet',
                        'meetLink' => 'https://meet.google.com/dc-uiux-live',
                    ],
                    [
                        'id' => 'sess-2',
                        'day' => 'Wednesday',
                        'date' => '10 Sep',
                        'time' => '7:00 PM',
                        'course' => 'UI/UX Design Masterclass',
                        'topic' => 'UX Research Synthesis, User Personas & Wireflows',
                        'isToday' => false,
                        'platform' => 'Google Meet',
                        'meetLink' => 'https://meet.google.com/dc-uiux-live',
                    ],
                    [
                        'id' => 'sess-3',
                        'day' => 'Friday',
                        'date' => '12 Sep',
                        'time' => '7:00 PM',
                        'course' => 'UI/UX Design Masterclass',
                        'topic' => 'Interactive Micro-interactions & Smart Animate',
                        'isToday' => false,
                        'platform' => 'Google Meet',
                        'meetLink' => 'https://meet.google.com/dc-uiux-live',
                    ],
                    [
                        'id' => 'sess-4',
                        'day' => 'Saturday',
                        'date' => '13 Sep',
                        'time' => '11:00 AM',
                        'course' => 'Graphic Design & AI Mastery',
                        'topic' => 'Generative Fill & AI Vector Art in Adobe Photoshop',
                        'isToday' => false,
                        'platform' => 'Zoom Meeting',
                        'meetLink' => 'https://zoom.us/j/sample-graphic-design',
                    ],
                ],
                'batches' => [
                    [
                        'id' => 'batch-1',
                        'courseTitle' => 'UI/UX Design Masterclass',
                        'badge' => 'Live Interactive Batch',
                        'batchCode' => 'Batch #04 (Evening)',
                        'mentor' => 'Harpreet Singh',
                        'mentorRole' => 'Lead Product Designer',
                        'schedule' => 'Mon, Wed, Fri • 7:00 PM – 8:30 PM IST',
                        'platform' => 'Google Meet',
                        'meetLink' => 'https://meet.google.com/dc-uiux-live',
                        'whatsappLink' => 'https://chat.whatsapp.com/sample-uiux-batch',
                        'totalSessions' => 24,
                        'completedSessions' => 14,
                    ],
                    [
                        'id' => 'batch-2',
                        'courseTitle' => 'Graphic Design & AI Mastery',
                        'badge' => 'Weekend Live Batch',
                        'batchCode' => 'Batch #02 (Weekend)',
                        'mentor' => 'Harpreet Singh',
                        'mentorRole' => 'Creative Director',
                        'schedule' => 'Sat & Sun • 11:00 AM – 1:00 PM IST',
                        'platform' => 'Zoom Meeting',
                        'meetLink' => 'https://zoom.us/j/sample-graphic-design',
                        'whatsappLink' => 'https://chat.whatsapp.com/sample-gd-batch',
                        'totalSessions' => 16,
                        'completedSessions' => 6,
                    ],
                ],
                'noticeBoard' => [
                    [
                        'id' => 'not-1',
                        'title' => 'Figma Starter Kit v2.4 Uploaded',
                        'desc' => 'The updated design system kit for today’s session is available in your My Learning study materials.',
                        'time' => '2 hours ago',
                        'tag' => 'Resource',
                    ],
                    [
                        'id' => 'not-2',
                        'title' => 'Live Q&A at the end of class',
                        'desc' => 'Keep your doubt questions ready for the last 20 minutes of today’s Figma Auto Layout session.',
                        'time' => 'Yesterday',
                        'tag' => 'Announcement',
                    ],
                ],
            ],
        ];
    }
}
