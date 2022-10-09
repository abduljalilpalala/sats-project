<?php

namespace Database\Seeders;

use App\Enums\EmployeeStatusEnum;
use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    User::upsert([
      'id_number' => '19-10323',
      'name' => 'Charline Miro',
      'email' => 'charlinemiro01@gmail.com',
      'password' => bcrypt('sweetbadass'),
      'birth_date' => '2001/10/21',
      'contact_number' => '09518335791',
      'is_verified' => true,
      'employee_status_id' => EmployeeStatusEnum::EMPLOYED->value,
      'role_id' => RoleEnum::ADMIN->value
    ], ['id']);
  }
}
