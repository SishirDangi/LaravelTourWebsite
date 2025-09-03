<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BookTour extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'email',
        'phone_number',
        'no_of_persons',
        'tour_date',
        'booking_code',
        'tour_package_id',
        'status_id'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->booking_code = 'TOUR-' . strtoupper(Str::random(8));
        });
    }

    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
