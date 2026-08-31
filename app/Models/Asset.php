<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Asset extends Model
{
    protected $fillable = [
        'category_id',
        'listing_type',
        'owner_name',
        'owner_company',
        'owner_phone',
        'owner_whatsapp',
        'owner_email',
        'name',
        'brand',
        'model',
        'year',
        'capacity',
        'location',
        'availability',
        'period_from',
        'period_to',
        'indicative_price',
        'photos',
        'documents',
        'description',
        'status',
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
    ];

    protected $casts = [
        'photos' => 'array',
        'documents' => 'array',
        'period_from' => 'date',
        'period_to' => 'date',
        'available_days' => 'array',
        'schedule' => 'array',
        'service_zone' => 'array',
        'duration_type' => 'array',
        'documents_provided' => 'array',
        'agreement' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(AssetCategory::class, 'category_id');
    }
}
