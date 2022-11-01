<?php

namespace App\Enums;

enum EmploymentStatusEnum: int
{
  case UNEMPLOYED = 1;
  case EMPLOYED = 2;
  case SELF_EMPLOYED = 3;


  private static function getLabel(self $value): string
  {
    return match ($value) {
      EmploymentStatusEnum::UNEMPLOYED => 'Unemployed',
      EmploymentStatusEnum::EMPLOYED => 'Employed',
      EmploymentStatusEnum::SELF_EMPLOYED => 'Self-Employed',
    };
  }

  public function label(): string
  {
    return static::getLabel($this);
  }
}
