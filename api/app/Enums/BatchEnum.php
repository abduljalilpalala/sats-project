<?php

namespace App\Enums;

enum BatchEnum: int
{
  case BATCH_2017_TO_2018 = 1;
  case BATCH_2018_TO_2019 = 2;
  case BATCH_2019_TO_2020 = 3;
  case BATCH_2020_TO_2021 = 4;
  case BATCH_2021_TO_2022 = 5;

  private static function getLabel(self $value): string
  {
    return match ($value) {
      BatchEnum::BATCH_2017_TO_2018 => '2017-2018',
      BatchEnum::BATCH_2018_TO_2019 => '2018-2019',
      BatchEnum::BATCH_2019_TO_2020 => '2019-2020',
      BatchEnum::BATCH_2020_TO_2021 => '2020-2021',
      BatchEnum::BATCH_2021_TO_2022 => '2021-2022',
    };
  }

  public function label(): string
  {
    return static::getLabel($this);
  }
}
