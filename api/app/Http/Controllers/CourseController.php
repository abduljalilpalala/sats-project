<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResouce;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function __invoke()
    {
        return Course::select('id', 'name')->get();
    }
}
