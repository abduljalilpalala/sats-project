<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePasswordRequest;
use App\Models\User;

class UpdatePasswordController extends Controller
{
  public function update(UpdatePasswordRequest $request, User $user)
  {
    auth()->user()->update(['password' => bcrypt($request->newPassword)]);
    return response()->noContent();
  }
}
