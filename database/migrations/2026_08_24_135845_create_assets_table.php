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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('asset_categories')->nullOnDelete();
            $table->enum('listing_type', ['propose', 'recherche']);
            $table->string('owner_name');
            $table->string('owner_company')->nullable();
            $table->string('owner_phone');
            $table->string('owner_whatsapp')->nullable();
            $table->string('owner_email')->nullable();
            $table->string('name');
            $table->string('brand')->nullable();
            $table->string('model')->nullable();
            $table->string('year')->nullable();
            $table->string('capacity')->nullable();
            $table->string('location')->nullable();
            $table->string('availability')->nullable();
            $table->date('period_from')->nullable();
            $table->date('period_to')->nullable();
            $table->string('indicative_price')->nullable();
            $table->json('photos')->nullable();
            $table->json('documents')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['en_attente', 'publie', 'indisponible'])->default('en_attente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
