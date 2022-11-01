<?php

namespace Database\Seeders;

use App\Models\AdminSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSettingSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $settings = [
      'id' => 1,
      'description' => 'Automatically send post with SMS',
      'status' => false
    ];

    AdminSetting::upsert($settings, ['id'], ['description', 'status']);
  }
}
