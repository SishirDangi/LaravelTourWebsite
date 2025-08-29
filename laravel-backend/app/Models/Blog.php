<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'writer_name',
        'content',
        'image',
        'post_date',
    ];

    protected $casts = [
        'post_date' => 'date',
    ];
}