<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TourPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'destination_id',
        'tour_type_id',
        'subcategory',
        'level_id',
        'price',
        'discount',
        'currency',
        'duration_days',
        'height_meters',
        'location',
        'min_people',
        'max_people',
        'overview',
        'card_highlights',
        'detailed_highlights',
        'itinerary',
        'map_url',       
        'map_iframe',    
        'includes',
        'excludes',
        'faqs',
        'status_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount' => 'decimal:2',
        'height_meters' => 'integer',
        'min_people' => 'integer',
        'max_people' => 'integer',
        'duration_days' => 'integer',
        'card_highlights' => 'array',       // JSON → array
        'detailed_highlights' => 'array',   // JSON → array
        'itinerary' => 'array',             // JSON → array
        'includes' => 'array',              // JSON → array
        'excludes' => 'array',              // JSON → array
        'faqs' => 'array',                  // JSON → array
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    public function tourType()
    {
        return $this->belongsTo(TourType::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function images()
    {
        return $this->hasMany(TourPackageImage::class);
    }
    
     public function bookTours()
    {
        return $this->hasMany(BookTour::class);
    }

    public function popularTour()
    {
        return $this->hasOne(PopularTour::class);
    }
}
