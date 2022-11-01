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
        'name' => RoleEnum::ADMIN->label()
      ],
      [
        'id' => RoleEnum::USER->value,
        'name' => RoleEnum::USER->label()
      ],
    ];

    Role::upsert($roles, ['id'], ['name']);
  }
}
