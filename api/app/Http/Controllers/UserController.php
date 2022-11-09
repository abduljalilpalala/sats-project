<?php

namespace App\Http\Controllers;

use App\Enums\ApplicationStatusEnum;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
  public function index()
  {
    $users = User::with(['avatar', 'batch'])->applicants();
    $all = $users->get();
    $approved = $users->approved()->get();
    $pending = $users->pending()->get();

    return response()->json([
      'all' => UserResource::collection($all),
      'pending' => UserResource::collection($pending),
      'approved' => UserResource::collection($approved)
    ]);
  }

  public function store(Request $request)
  {
    $user = User::findOrFail($request->id);
    $user->update(['is_verified' => ApplicationStatusEnum::APPROVED->value]);
    return response()->json($user);
  }

  public function destroy(User $user)
  {
    $user->deleteOrFail();
    return response()->noContent();
  }
}
