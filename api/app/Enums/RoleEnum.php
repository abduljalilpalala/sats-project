<?php

namespace App\Enums;

enum RoleEnum: int
{
  case ADMIN = 1;
  case USER = 2;

  private static function getLabel(self $value): string
  {
    return match ($value) {
      RoleEnum::ADMIN => 'Admin',
      RoleEnum::USER => 'User',
    };
  }

  public function label(): string
  {
    return static::getLabel($this);
  }
}
