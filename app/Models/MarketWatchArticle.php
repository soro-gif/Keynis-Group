<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarketWatchArticle extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'excerpt',
        'content',
        'cover_image',
        'author',
        'tags',
        'status',
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
    ];
}
