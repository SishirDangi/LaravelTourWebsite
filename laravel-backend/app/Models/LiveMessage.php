<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'show_until',
        'status_id',
    ];

    protected $casts = [
        'show_until' => 'date',
    ];

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}