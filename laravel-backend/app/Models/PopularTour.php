<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PopularTour extends Model
{
    use HasFactory;

    protected $fillable = ['tour_package_id', 'booking_count'];

    /**
     * Get the tour package associated with this popular tour.
     */
    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class, 'tour_package_id');
    }
}