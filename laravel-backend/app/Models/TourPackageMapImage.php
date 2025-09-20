<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TourPackageMapImage extends Model
{
    use HasFactory;

    protected $fillable = ['tour_package_id', 'map_image_path', 'is_main'];

    protected $casts = [
        'is_main' => 'boolean',
    ];

    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class);
    }
}