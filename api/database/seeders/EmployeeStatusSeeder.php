<?php

namespace Database\Seeders;

use App\Enums\EmployeeStatusEnum;
use App\Models\EmployeeStatus;
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
        'id' => EmployeeStatusEnum::EMPLOYED->value,
        'status' => EmployeeStatusEnum::tryFrom(EmployeeStatusEnum::EMPLOYED->value)->toString()
      ],
      [
        'id' => EmployeeStatusEnum::UNEMPLOYED->value,
        'status' => EmployeeStatusEnum::tryFrom(EmployeeStatusEnum::UNEMPLOYED->value)->toString()
      ],
      [
        'id' => EmployeeStatusEnum::SELF_EMPLOYED->value,
        'status' => EmployeeStatusEnum::tryFrom(EmployeeStatusEnum::SELF_EMPLOYED->value)->toString()
      ],
    ];

    EmployeeStatus::upsert($statuses, ['id'], ['status']);
  }
}
