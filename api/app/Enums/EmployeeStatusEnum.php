<?php

namespace App\Enums;

enum EmployeeStatusEnum: int
{
  case UNEMPLOYED = 1;
  case EMPLOYED = 2;
  case SELF_EMPLOYED = 3;

  public function toString()
  {
    return match ($this) {
      self::UNEMPLOYED => 'Unemployed',
      self::EMPLOYED => 'Employed',
      self::SELF_EMPLOYED => 'Self-Employed',
    };
  }
}
