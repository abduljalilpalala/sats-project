<?php

use App\Enums\RoleEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('id_number')->nullable();
      $table->string('name');
      $table->string('email')->unique();
      $table->date('birth_date');
      $table->string('contact_number');
      $table->boolean('is_verified')->default(false);
      $table->foreignId('role_id')
        ->default(RoleEnum::USER->value)
        ->constrained()
        ->onDelete('cascade');
      $table->foreignId('employee_status_id')
        ->constrained()
        ->onDelete('cascade')
        ->onUpdate('cascade');
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password');
      $table->rememberToken();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('users');
  }
};
