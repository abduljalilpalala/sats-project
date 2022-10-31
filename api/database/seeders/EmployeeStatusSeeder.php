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
        'status' => EmploymentStatusEnum::tryFrom(EmploymentStatusEnum::EMPLOYED->value)->toString()
      ],
      [
        'id' => EmploymentStatusEnum::UNEMPLOYED->value,
        'status' => EmploymentStatusEnum::tryFrom(EmploymentStatusEnum::UNEMPLOYED->value)->toString()
      ],
      [
        'id' => EmploymentStatusEnum::SELF_EMPLOYED->value,
        'status' => EmploymentStatusEnum::tryFrom(EmploymentStatusEnum::SELF_EMPLOYED->value)->toString()
      ],
    ];

    EmploymentStatus::upsert($statuses, ['id'], ['status']);
  }
}
