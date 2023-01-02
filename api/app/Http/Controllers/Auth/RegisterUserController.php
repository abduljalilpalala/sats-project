<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;

class RegisterUserController extends Controller
{
  public function store(RegisterUserRequest $request)
  {
    return User::registerApplicant($request);
  }
}
