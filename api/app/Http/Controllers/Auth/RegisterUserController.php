<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;

class RegisterUserController extends Controller
{
  /**
   * Handle an incoming registration request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(RegisterUserRequest $request)
  {
    User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => bcrypt($request->password),
      'birth_date' => $request->birth_date,
      'contact_number' => $request->contact_number,
      'employee_status_id' => $request->employee_status_id,
    ]);

    return response()->noContent();
  }
}
