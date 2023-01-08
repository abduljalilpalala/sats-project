<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AlumniController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UpdateUserController;
use App\Http\Controllers\UserAvatarController;
use App\Http\Controllers\AdminSettingController;
use App\Http\Controllers\UpdatePasswordController;
use App\Http\Controllers\UpdateUserAboutController;
use App\Http\Controllers\EmploymentStatusController;
use App\Http\Controllers\CourseAlumniCountController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('auth', [AuthController::class, 'index']);

    Route::group(['prefix' => 'admin'], function () {
        Route::get('sms-status', [AdminSettingController::class, 'index']);
        Route::get('dashboard', [DashboardController::class, 'index']);
        Route::post('change-sms-setting', [AdminSettingController::class, 'store']);
    });

    Route::group(['prefix' => 'user'], function () {
        Route::post('user-about', UpdateUserAboutController::class);
        Route::put('change-password', [UpdatePasswordController::class, 'update']);
        Route::get('number', [UpdatePasswordController::class, 'number']);
        Route::post('user-avatar', [UserAvatarController::class, 'store']);
        Route::delete('user-avatar', [UserAvatarController::class, 'destroy']);
        Route::put('/', UpdateUserController::class);
    });

    Route::apiResource('user', UserController::class)->except(['show', 'update']);
    Route::apiResource('post', PostController::class)->except(['show']);
    Route::get('alumni', AlumniController::class);
    Route::get('course', CourseController::class);
    Route::get('employment-status', EmploymentStatusController::class);
    Route::get('course-count', CourseAlumniCountController::class);
});

require __DIR__ . '/auth.php';
