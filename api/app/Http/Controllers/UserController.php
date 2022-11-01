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
}
