<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserAvatarRequest;
use Symfony\Component\HttpFoundation\Response;

class UserAvatarController extends Controller
{
    public function store(UserAvatarRequest $request)
    {
        return auth()->user()->updateAvatar($request);
    }

    public function destroy()
    {
        return auth()->user()->removeAvatar();
    }
}
