<?php

namespace Database\Seeders;

use App\Enums\EmploymentStatusEnum;
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
    User::updateOrCreate(
      ['id_number' => '19-10323', 'email' => 'charlinemiro01@gmail.com'],
      [
        'name' => 'Charline Miro',
        'password' => bcrypt('sweetbadass'),
        'birth_date' => '2001/10/21',
        'contact_number' => '09518335791',
        'is_verified' => true,
        'employment_status_id' => EmploymentStatusEnum::EMPLOYED->value,
        'batch_id' => 1,
        'role_id' => RoleEnum::ADMIN->value,
        'course_id' => 1,
      ]
    );
  }
}
