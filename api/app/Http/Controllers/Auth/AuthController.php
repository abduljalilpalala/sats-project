<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  public function index()
  {
    return User::with(['avatar', 'job.iDImage'])->findOrFail(Auth::user()->id);
  }

  public function store(LoginRequest $request)
  {
    $request->authenticate();

    $user = User::email($request->email)->first();
    $token = $user->is_verified ? $user->createToken('access-token')->plainTextToken : '';

    return response()->json([
      'role' => $user->role_id,
      'is_verified' => $user->is_verified,
      'token' => $token
    ]);
  }

  public function destroy()
  {
    auth()->user()->currentAccessToken()->delete();

    return response()->noContent();
  }
}
