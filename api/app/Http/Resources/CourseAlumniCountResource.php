<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class CourseAlumniCountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            $this->name => [
                'employed' => User::applicants()->approved()->filterCourse($this->id)->employed()->count(),
                'unemployed' => User::applicants()->approved()->filterCourse($this->id)->unEmployed()->count(),
            ]
        ];
    }
}
