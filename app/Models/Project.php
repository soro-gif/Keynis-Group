<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'client_sector',
        'location',
        'problem',
        'solution',
        'resources_used',
        'results',
        'photos',
        'project_date',
        'is_confidential',
        'status',
    ];

    protected $casts = [
        'photos' => 'array',
        'project_date' => 'date',
        'is_confidential' => 'boolean',
    ];
}
