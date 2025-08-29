<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TourPackageImage extends Model
{
    use HasFactory;

    protected $fillable = ['tour_package_id', 'image_path', 'is_main'];

    protected $casts = [
        'is_main' => 'boolean',
    ];

    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class);
    }
}