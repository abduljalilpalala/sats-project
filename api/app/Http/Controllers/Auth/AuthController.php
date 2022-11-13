<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  public function index(Request $request)
  {
    return User::with('avatar')->findOrFail(Auth::user()->id);
  }

  public function store(LoginRequest $request)
  {
    $request->authenticate();

    $request->session()->regenerate();
    $user = User::email($request->email)->first();

    return response()->json([
      'role' => $user->role_id,
      'is_verified' => $user->is_verified
    ]);
  }

  public function destroy(Request $request)
  {
    Auth::guard('web')->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return response()->noContent();
  }
}
