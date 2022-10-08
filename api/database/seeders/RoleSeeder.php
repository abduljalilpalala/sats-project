<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $roles = [
      [
        'id' => RoleEnum::ADMIN->value,
        'name' => RoleEnum::tryFrom(RoleEnum::ADMIN->value)->toString()
      ],
      [
        'id' => RoleEnum::USER->value,
        'name' => RoleEnum::tryFrom(RoleEnum::USER->value)->toString()
      ],
    ];

    Role::upsert($roles, ['id'], ['name']);
  }
}
