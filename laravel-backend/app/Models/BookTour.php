<?php

namespace App\Models;

use App\Models\PopularTour;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
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

        // Generate booking code before creating
        static::creating(function ($model) {
            $model->booking_code = 'TOUR-' . strtoupper(Str::random(8));
        });

        // Update PopularTour when a booking is created
        static::created(function (BookTour $bookTour) {
            try {
                // Find or create the PopularTour record for the tour package
                $popularTour = PopularTour::firstOrCreate(
                    ['tour_package_id' => $bookTour->tour_package_id],
                    ['booking_count' => 0]
                );

                // Increment the booking count
                $popularTour->increment('booking_count');

                Log::info('Updated PopularTour booking count', [
                    'tour_package_id' => $bookTour->tour_package_id,
                    'new_booking_count' => $popularTour->booking_count,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to update PopularTour on new booking', [
                    'tour_package_id' => $bookTour->tour_package_id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ]);
            }
        });

        // Update PopularTour when a booking is deleted
        static::deleted(function (BookTour $bookTour) {
            try {
                $popularTour = PopularTour::where('tour_package_id', $bookTour->tour_package_id)->first();
                if ($popularTour && $popularTour->booking_count > 0) {
                    $popularTour->decrement('booking_count');
                    Log::info('Decremented PopularTour booking count', [
                        'tour_package_id' => $bookTour->tour_package_id,
                        'new_booking_count' => $popularTour->booking_count,
                    ]);
                }
            } catch (\Exception $e) {
                Log::error('Failed to decrement PopularTour on booking deletion', [
                    'tour_package_id' => $bookTour->tour_package_id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ]);
            }
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