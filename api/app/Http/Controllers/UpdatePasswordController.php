<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Controllers\AdminSettingController;

class UpdatePasswordController extends Controller
{
    public function update(UpdatePasswordRequest $request, User $user)
    {
        auth()->user()->update(['password' => bcrypt($request->newPassword)]);
        return response()->noContent();
    }

    public function number()
    {
        $approvedStudents = new User();
        $smsStatus = new AdminSettingController();
        return response()->json([
            "numbers" => $approvedStudents->number(),
            "smsStatus" => $smsStatus->index()->original
        ]);
    }
}
