<?php

namespace Database\Seeders;

use App\Enums\BatchEnum;
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
        'id' => BatchEnum::BATCH_2017_TO_2018,
        'batch' => BatchEnum::BATCH_2017_TO_2018->label()
      ],
      [
        'id' => BatchEnum::BATCH_2018_TO_2019,
        'batch' => BatchEnum::BATCH_2018_TO_2019->label()
      ],
      [
        'id' => BatchEnum::BATCH_2019_TO_2020,
        'batch' => BatchEnum::BATCH_2019_TO_2020->label()
      ],
      [
        'id' => BatchEnum::BATCH_2020_TO_2021,
        'batch' => BatchEnum::BATCH_2020_TO_2021->label()
      ],
      [
        'id' => BatchEnum::BATCH_2021_TO_2022,
        'batch' => BatchEnum::BATCH_2021_TO_2022->label()
      ]
    ];

    Batch::upsert($batches, ['id'], ['batch']);
  }
}
