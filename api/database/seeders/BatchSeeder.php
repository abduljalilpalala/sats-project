<?php

namespace Database\Seeders;

use App\Models\Batch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BatchSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $batches = [
      [
        'id' => 1,
        'batch' => '2018-2019'
      ],
      [
        'id' => 2,
        'batch' => '2019-2020'
      ],
      [
        'id' => 3,
        'batch' => '2020-2021'
      ],
      [
        'id' => 4,
        'batch' => '2021-2022'
      ]
    ];

    Batch::upsert($batches, ['id'], ['batch']);
  }
}
