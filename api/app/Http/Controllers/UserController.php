<?php

namespace App\Http\Controllers;

use App\Enums\ApplicationStatusEnum;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\SMSNotificationService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
  public function index()
  {
    $user = User::with(['avatar', 'batch'])->applicants();

    if (request('filter')) {
      if (request('filter') === ApplicationStatusEnum::APPROVED->label()) {
        return UserResource::collection($user->approved()->get());
      }

      if (request('filter') === ApplicationStatusEnum::PENDING->label()) {
        return UserResource::collection($user->pending()->get());
      }
    }

    return UserResource::collection($user->get());
  }

  public function store(Request $request)
  {
    DB::beginTransaction();

    try {
      $user = User::findOrFail($request->id);
      $user->update(['is_verified' => ApplicationStatusEnum::APPROVED->value]);
      SMSNotificationService::sendSMS($user->contact_number);
      DB::commit();

      return $user;
    } catch (Exception $e) {
      DB::rollBack();
      return response()->json("Error: " . $e->getMessage(), 500);
    }
  }

  public function destroy(User $user)
  {
    $user->deleteOrFail();
    return response()->noContent();
  }
}
