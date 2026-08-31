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
        Schema::table('assets', function (Blueprint $table) {
            // Propriétaire
            $table->string('owner_type')->nullable();
            $table->string('id_number')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('contact_role')->nullable();

            // Véhicule
            $table->string('vehicle_category')->nullable();
            $table->string('registration')->nullable();
            $table->string('color')->nullable();
            $table->string('mileage')->nullable();
            $table->string('condition')->nullable();
            $table->string('transmission')->nullable();
            $table->string('engine')->nullable();
            $table->string('air_conditioning')->nullable();
            $table->string('equipment')->nullable();
            $table->string('intervention_zone')->nullable();
            $table->string('driver_available')->nullable();

            // Disponibilité et conditions de partenariat
            $table->json('available_days')->nullable();
            $table->json('schedule')->nullable();
            $table->json('service_zone')->nullable();
            $table->json('duration_type')->nullable();
            $table->string('with_driver')->nullable();
            $table->string('price_per_day')->nullable();
            $table->string('price_per_mission')->nullable();

            // Documents et engagement
            $table->json('documents_provided')->nullable();
            $table->boolean('agreement')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assets', function (Blueprint $table) {
            $table->dropColumn([
                'owner_type',
                'id_number',
                'address',
                'city',
                'contact_person',
                'contact_role',
                'vehicle_category',
                'registration',
                'color',
                'mileage',
                'condition',
                'transmission',
                'engine',
                'air_conditioning',
                'equipment',
                'intervention_zone',
                'driver_available',
                'available_days',
                'schedule',
                'service_zone',
                'duration_type',
                'with_driver',
                'price_per_day',
                'price_per_mission',
                'documents_provided',
                'agreement',
            ]);
        });
    }
};
