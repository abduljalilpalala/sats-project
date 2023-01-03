<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [RegisterUserController::class, 'store'])
  ->name('register');
Route::post('/login', [AuthController::class, 'store'])
  ->name('login');
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
  ->name('password.email');
Route::post('/reset-password', [NewPasswordController::class, 'store'])
  ->name('password.update');

Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
  ->middleware(['auth', 'signed', 'throttle:6,1'])
  ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
  ->middleware(['auth', 'throttle:6,1'])
  ->name('verification.send');

Route::post('/logout', [AuthController::class, 'destroy'])
  ->middleware('auth:sanctum')
  ->name('logout');
