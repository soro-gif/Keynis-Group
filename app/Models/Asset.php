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
    ];

    protected $casts = [
        'photos' => 'array',
        'documents' => 'array',
        'period_from' => 'date',
        'period_to' => 'date',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(AssetCategory::class, 'category_id');
    }
}
