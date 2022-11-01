<?php

namespace App\Http\Controllers;

use App\Models\AdminSetting;
use Illuminate\Http\Request;

class AdminSettingController extends Controller
{
  public function store(Request $request)
  {
    $setting = AdminSetting::firstOrFail();
    $setting->update(['status' => !$setting->status]);
    return response()->noContent();
  }
}
