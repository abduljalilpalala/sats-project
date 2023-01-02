<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseAlumniCountResource;
use App\Models\Course;

class CourseAlumniCountController extends Controller
{
    public function __invoke()
    {
        return CourseAlumniCountResource::collection(Course::with(['users'])->get());
    }
}
