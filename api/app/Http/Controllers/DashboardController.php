<?php

namespace App\Http\Controllers;

use App\Http\Resources\BatchEmploymentStatusResource;
use App\Models\Post;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $employed = User::applicants()->filterBatch(request('batch'))->employed()->count();
        $unemployed = User::applicants()->filterBatch(request('batch'))->unEmployed()->count();
        $selfEmployed = User::applicants()->filterBatch(request('batch'))->selfEmployed()->count();

        return response()->json([
            'batch' => [
                'employed' => $employed,
                'unemployed' => $unemployed,
                'selfEmployed' => $selfEmployed,
            ],
            'total_users' => User::applicants()->approved()->count(),
            'total_posts' => Post::count()
        ]);
    }
}
