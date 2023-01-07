<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UpdateUserController extends Controller
{
    public function __invoke(UpdateUserRequest $request)
    {
        auth()->user()->updateUserDetails($request);
        return new UserResource(User::with(['avatar', 'batch', 'course', 'job.iDImage'])->findOrFail(auth()->user()->id));
    }
}
