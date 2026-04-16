<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('instruments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('type');
            $table->string('brand');
            $table->string('serial_number')->unique();
            $table->enum('status', ['available', 'maintenance', 'assigned'])->default('available');
            $table->uuid('borrower_id')->nullable();
            $table->string('image_path')->nullable();
            $table->timestamps();

            $table->foreign('borrower_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instruments');
    }
};
