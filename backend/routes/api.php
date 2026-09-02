<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\PlatformSettingController;
use Illuminate\Support\Facades\Route;

Route::post('/leads', [LeadController::class, 'store']);

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/leads', [LeadController::class, 'index']);

    Route::get('/platform-settings', [PlatformSettingController::class, 'show']);
    Route::patch('/platform-settings', [PlatformSettingController::class, 'update']);
});
