<?php

namespace App\Enums;

enum RoleEnum: int
{
  case ADMIN = 1;
  case USER = 2;

  public function toString()
  {
    return match ($this) {
      self::ADMIN => 'Admin',
      self::USER => 'User',
    };
  }
}
