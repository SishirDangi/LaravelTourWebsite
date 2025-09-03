<?php

namespace App\Console\Commands;

use App\Models\BookTour;
use App\Models\PopularTour;
use App\Models\TourPackage;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdatePopularTours extends Command
{
    protected $signature = 'popular-tours:update';
    protected $description = 'Initialize or update booking counts for popular tours based on book_tours table';

    public function handle(): void
    {
        try {
            $this->info('Starting to initialize/update popular tours booking counts...');

            // Verify database connection
            try {
                DB::connection()->getPdo();
                $this->info('Database connection established.');
            } catch (\Exception $e) {
                $this->error('Database connection failed: ' . $e->getMessage());
                Log::error('Database connection failed in UpdatePopularTours', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ]);
                return;
            }

            // Check table engine
            $tableEngine = DB::select("SHOW TABLE STATUS WHERE Name = 'popular_tours'")[0]->Engine ?? 'Unknown';
            if (strtolower($tableEngine) !== 'innodb') {
                $this->warn('Warning: popular_tours table is using ' . $tableEngine . ' engine. Transactions require InnoDB.');
                Log::warning('popular_tours table engine is not InnoDB', ['engine' => $tableEngine]);
            }

            // Get all tour packages
            $tourPackages = TourPackage::pluck('id');
            $this->info('Found ' . $tourPackages->count() . ' tour packages.');

            if ($tourPackages->isEmpty()) {
                $this->warn('No tour packages found. Skipping update.');
                Log::warning('No tour packages found in UpdatePopularTours');
                return;
            }

            // Calculate booking counts
            $bookingCounts = BookTour::select('tour_package_id')
                ->groupBy('tour_package_id')
                ->selectRaw('count(*) as booking_count')
                ->pluck('booking_count', 'tour_package_id')
                ->toArray();
            $this->info('Calculated booking counts for ' . count($bookingCounts) . ' tour packages.');

            // Start transaction
            DB::beginTransaction();

            // Insert or update records
            foreach ($tourPackages as $tourPackageId) {
                $bookingCount = $bookingCounts[$tourPackageId] ?? 0;
                PopularTour::updateOrCreate(
                    ['tour_package_id' => $tourPackageId],
                    ['booking_count' => $bookingCount]
                );
            }

            DB::commit();
            $this->info('Popular tours booking counts initialized/updated successfully. Processed ' . count($tourPackages) . ' tour packages.');
            Log::info('Popular tours initialized/updated', [
                'tour_packages_processed' => count($tourPackages),
                'booking_counts' => $bookingCounts,
            ]);

        } catch (\Exception $e) {
            if (DB::transactionLevel() > 0) {
                DB::rollBack();
            }
            $this->error('Failed to initialize/update popular tours: ' . $e->getMessage());
            Log::error('Failed to initialize/update popular tours', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }
}