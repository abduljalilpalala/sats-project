<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RegisterUserController extends Controller
{
  public function store(RegisterUserRequest $request)
  {
    $user = User::create([
      'id_number' => $request->id_number,
      'name' => $request->name,
      'email' => $request->email,
      'password' => bcrypt($request->password),
      'birth_date' => $request->birth_date,
      'contact_number' => $request->contact_number,
      'batch_id' => $request->batch,
      'employment_status_id' => $request->employment_status,
      'course_id' => $request->course,
    ]);

    Auth::login($user);

    return response()->noContent();
  }
}
