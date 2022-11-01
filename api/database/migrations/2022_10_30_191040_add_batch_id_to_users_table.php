<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
    Schema::table('users', function (Blueprint $table) {
      $table->foreignId('batch_id')
        ->constrained()
        ->onDelete('cascade')
        ->onUpdate('cascade');
    });
    DB::statement("ALTER TABLE users MODIFY batch_id BIGINT(20) UNSIGNED NOT NULL AFTER employment_status_id");
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('users', function (Blueprint $table) {
      $table->dropColumn('batch_id');
    });
  }
};
