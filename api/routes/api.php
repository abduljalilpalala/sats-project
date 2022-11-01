<?php

use App\Http\Controllers\AdminSettingController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UpdatePasswordController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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

  Route::put('user/change-password', [UpdatePasswordController::class, 'update']);
  Route::post('admin/change-sms-setting', [AdminSettingController::class, 'store']);
  Route::apiResource('user', UserController::class)->only(['index', 'store', 'destroy']);
  Route::apiResource('post', PostController::class)->except(['show']);
});
