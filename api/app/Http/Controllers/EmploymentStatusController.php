<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class EmploymentStatusController extends Controller
{
    public function __invoke(Request $request)
    {
        $employed = User::with(['avatar', 'batch', 'course', 'job.iDImage'])
            ->applicants()
            ->approved()
            ->employed()
            ->get();
            
        $unEmployed = User::with(['avatar', 'batch', 'course'])
            ->applicants()
            ->approved()
            ->unEmployed()
            ->get();

        $selfEmployed = User::with(['avatar', 'batch', 'course'])
            ->applicants()
            ->approved()
            ->selfEmployed()
            ->get();

        return response()->json([
            'employed' => UserResource::collection($employed),
            'unemployed' => UserResource::collection($unEmployed),
            'selfemployed' => UserResource::collection($selfEmployed),
        ]);
    }
}
