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
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->enum('category', [
                'producteur',
                'cooperative',
                'fabricant',
                'fournisseur',
                'detenteur_stock',
                'proprietaire_actif',
                'transporteur',
                'transitaire',
                'entrepositaire',
                'distributeur',
            ]);
            $table->string('company_name');
            $table->string('contact_name');
            $table->string('country');
            $table->string('city')->nullable();
            $table->string('phone');
            $table->string('whatsapp')->nullable();
            $table->string('email');
            $table->string('website')->nullable();
            $table->string('sector')->nullable();
            $table->text('products_services')->nullable();
            $table->text('capacities')->nullable();
            $table->string('coverage_area')->nullable();
            $table->json('documents')->nullable();
            $table->text('message')->nullable();
            $table->enum('status', ['nouveau', 'en_qualification', 'valide', 'rejete'])->default('nouveau');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partners');
    }
};
