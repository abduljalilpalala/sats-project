<?php

namespace App\Enums;

enum ApplicationStatusEnum: int
{
  case APPROVED = 1;
  case PENDING = 0;

  private static function getLabel(self $value): string
  {
    return match ($value) {
      ApplicationStatusEnum::APPROVED => 'approved',
      ApplicationStatusEnum::PENDING => 'pending',
    };
  }

  public function label(): string
  {
    return static::getLabel($this);
  }
}
