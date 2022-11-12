<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
  public function index()
  {
    $all = User::with(['avatar', 'batch'])->applicants()->get();
    $pending = User::with(['avatar', 'batch'])->applicants()->pending()->get();
    $approved = User::with(['avatar', 'batch'])->applicants()->approved()->get();

    return response()->json([
      'all' => UserResource::collection($all),
      'pending' => UserResource::collection($pending),
      'approved' => UserResource::collection($approved)
    ]);
  }

  public function store(Request $request)
  {
    $user = User::findOrFail($request->id);
    $user->approveApplication();
    return response()->json($user);
  }

  public function destroy(User $user)
  {
    $user->rejectApplication();
    return response()->noContent();
  }
}
