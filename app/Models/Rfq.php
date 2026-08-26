<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rfq extends Model
{
    protected $fillable = [
        'reference',
        'category',
        'type',
        'name',
        'company',
        'phone',
        'whatsapp',
        'email',
        'country',
        'city',
        'subject',
        'description',
        'quantity',
        'budget',
        'deadline',
        'delivery_location',
        'details',
        'attachment',
        'status',
    ];

    protected $casts = [
        'details' => 'array',
        'deadline' => 'date',
    ];

    protected static function booted(): void
    {
        static::creating(function (Rfq $rfq) {
            $rfq->reference ??= static::generateReference();
        });
    }

    public static function generateReference(): string
    {
        $year = date('Y');
        $sequence = static::whereYear('created_at', $year)->count() + 1;

        do {
            $reference = sprintf('RFQ-%s-%06d', $year, $sequence);
            $sequence++;
        } while (static::where('reference', $reference)->exists());

        return $reference;
    }
}
