<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;

class UpdateUserController extends Controller
{
    public function __invoke(UpdateUserRequest $request)
    {
        auth()->user()->updateUserDetails($request);
        return response()->json(auth()->user());
    }
}
