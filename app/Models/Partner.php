<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    protected $fillable = [
        'category',
        'company_name',
        'logo',
        'contact_name',
        'country',
        'city',
        'phone',
        'whatsapp',
        'email',
        'website',
        'sector',
        'products_services',
        'capacities',
        'coverage_area',
        'documents',
        'message',
        'status',
        'confirmed_at',
    ];

    protected $casts = [
        'documents' => 'array',
        'confirmed_at' => 'datetime',
    ];

    /**
     * Guards against invalid UTF-8 bytes reaching the database (e.g. text
     * pasted from Word/Outlook in Windows-1252, or a mis-encoded request).
     * Without this, a single bad byte breaks json_encode() for any page
     * that lists this record, blanking out the whole page for every visitor.
     */
    public function setAttribute($key, $value)
    {
        if (is_string($value) && $value !== '' && ! mb_check_encoding($value, 'UTF-8')) {
            $value = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');
        }

        return parent::setAttribute($key, $value);
    }
}
