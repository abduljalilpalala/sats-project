<?php

namespace Database\Seeders;

use App\Enums\EmploymentStatusEnum;
use App\Models\EmploymentStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeStatusSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $statuses = [
      [
        'id' => EmploymentStatusEnum::EMPLOYED->value,
        'status' => EmploymentStatusEnum::EMPLOYED->label()
      ],
      [
        'id' => EmploymentStatusEnum::UNEMPLOYED->value,
        'status' => EmploymentStatusEnum::UNEMPLOYED->label()
      ],
      [
        'id' => EmploymentStatusEnum::SELF_EMPLOYED->value,
        'status' => EmploymentStatusEnum::SELF_EMPLOYED->label()
      ],
    ];

    EmploymentStatus::upsert($statuses, ['id'], ['status']);
  }
}
