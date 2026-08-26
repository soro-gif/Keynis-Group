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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('product_categories')->nullOnDelete();
            $table->enum('type', ['produit', 'commodity'])->default('produit');
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('reference')->nullable();
            $table->string('brand')->nullable();
            $table->text('description')->nullable();
            $table->json('characteristics')->nullable();
            $table->string('origin')->nullable();
            $table->string('conditioning')->nullable();
            $table->string('min_quantity')->nullable();
            $table->string('quantity_available')->nullable();
            $table->string('location')->nullable();
            $table->enum('price_mode', ['affiche', 'masque', 'sur_demande'])->default('sur_demande');
            $table->decimal('price', 12, 2)->nullable();
            $table->json('images')->nullable();
            $table->string('document_pdf')->nullable();
            $table->enum('status', ['disponible', 'indisponible', 'sur_demande'])->default('disponible');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
