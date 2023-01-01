<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Enums\ApplicationStatusEnum;

class DashboardController extends Controller
{
    public function index()
    {
        $employed = User::applicants()->where('is_verified', ApplicationStatusEnum::APPROVED)->filterBatch(request('batch'))->employed()->count();
        $unemployed = User::applicants()->where('is_verified', ApplicationStatusEnum::APPROVED)->filterBatch(request('batch'))->unEmployed()->count();
        $selfEmployed = User::applicants()->where('is_verified', ApplicationStatusEnum::APPROVED)->filterBatch(request('batch'))->selfEmployed()->count();

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
