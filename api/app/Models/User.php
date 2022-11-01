<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements HasMedia
{
  use HasApiTokens, HasFactory, Notifiable, InteractsWithMedia;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $guarded = [];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public function avatar()
  {
    return $this->media()->where('collection_name', 'avatar');
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('avatar')->singleFile();
  }

  public function employmentStatus()
  {
    return $this->belongsTo(EmploymentStatus::class);
  }

  public function batch()
  {
    return $this->belongsTo(Batch::class);
  }

  public function role()
  {
    return $this->belongsTo(Role::class);
  }

  public static function boot()
  {
    parent::boot();

    self::created(function (User $user) {
      $user->addMedia(public_path('assets/avatars/default.png'))
        ->preservingOriginal()->toMediaCollection('avatar');
    });
  }
}
