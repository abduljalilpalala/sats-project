<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateUserAboutRequest;

class UpdateUserAboutController extends Controller
{
    public function __invoke(UpdateUserAboutRequest $request)
    {
        auth()->user()->updateUserAboutDetails($request);
        return new UserResource(User::with(['job.iDImage'])->findOrFail(auth()->user()->id));
    }

    public function allowed()
    {
        return $this->except(['job_id', 'work_place', 'position', 'work_id', 'company_name']);
    }
}
