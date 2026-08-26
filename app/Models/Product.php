<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'type',
        'name',
        'slug',
        'reference',
        'brand',
        'description',
        'characteristics',
        'origin',
        'conditioning',
        'min_quantity',
        'quantity_available',
        'location',
        'price_mode',
        'price',
        'images',
        'document_pdf',
        'status',
        'is_featured',
    ];

    protected $casts = [
        'characteristics' => 'array',
        'images' => 'array',
        'price' => 'decimal:2',
        'is_featured' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }
}
