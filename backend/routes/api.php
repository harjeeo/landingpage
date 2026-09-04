<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\PlatformSettingController;
use App\Http\Controllers\Api\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::post('/leads', [LeadController::class, 'store']);

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/signup', [AuthController::class, 'signup']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::post('/subscriptions/checkout', [SubscriptionController::class, 'checkout']);
    Route::post('/subscriptions/verify', [SubscriptionController::class, 'verify']);
    Route::get('/subscriptions/mine', [SubscriptionController::class, 'mine']);

    Route::middleware('super-admin')->group(function () {
        Route::get('/leads', [LeadController::class, 'index']);

        Route::get('/platform-settings', [PlatformSettingController::class, 'show']);
        Route::patch('/platform-settings', [PlatformSettingController::class, 'update']);
    });
});
