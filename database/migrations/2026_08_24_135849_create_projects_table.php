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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('client_sector')->nullable();
            $table->string('location')->nullable();
            $table->text('problem')->nullable();
            $table->text('solution')->nullable();
            $table->text('resources_used')->nullable();
            $table->text('results')->nullable();
            $table->json('photos')->nullable();
            $table->date('project_date')->nullable();
            $table->boolean('is_confidential')->default(false);
            $table->enum('status', ['brouillon', 'publie'])->default('publie');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
