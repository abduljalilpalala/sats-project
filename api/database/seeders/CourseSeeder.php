<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $courses = [
            ['id' => 1, 'name' => 'BSIT'],
            ['id' => 2, 'name' => 'BSED'],
            ['id' => 3, 'name' => 'BEED'],
            ['id' => 4, 'name' => 'BPED'],
            ['id' => 5, 'name' => 'BSBA'],
        ];

        Course::upsert($courses, ['id'], ['name']);
    }
}
