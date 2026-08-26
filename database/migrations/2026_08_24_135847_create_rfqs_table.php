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
        Schema::create('rfqs', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->enum('category', ['demande', 'offre', 'partenariat']);
            $table->string('type');
            $table->string('name');
            $table->string('company')->nullable();
            $table->string('phone');
            $table->string('whatsapp')->nullable();
            $table->string('email');
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('subject');
            $table->text('description')->nullable();
            $table->string('quantity')->nullable();
            $table->string('budget')->nullable();
            $table->date('deadline')->nullable();
            $table->string('delivery_location')->nullable();
            $table->json('details')->nullable();
            $table->string('attachment')->nullable();
            $table->enum('status', [
                'nouvelle',
                'en_analyse',
                'sourcing',
                'offre_disponible',
                'negociation',
                'validee',
                'livraison',
                'cloturee',
                'annulee',
                'rejetee',
                'en_attente',
            ])->default('nouvelle');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rfqs');
    }
};
