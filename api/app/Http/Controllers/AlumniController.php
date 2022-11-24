<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class AlumniController extends Controller
{

    public function __invoke()
    {
        return UserResource::collection(
            User::with('avatar', 'batch')
                ->applicants()
                ->approved()
                ->get()
        );
    }
}
