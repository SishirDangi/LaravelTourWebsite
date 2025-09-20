<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Status;

class StatusSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            ['name' => 'Pending'],
            ['name' => 'Checked'],
            ['name' => 'Resolved'],
            ['name' => 'Available'],
            ['name' => 'Unavailable'],
            ['name' => 'Booked'],
            ['name' => 'Active'],
            ['name' => 'Inactive'],
        ];

        foreach ($statuses as $status) {
            Status::firstOrCreate(
                ['name' => $status['name']],
                ['created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}
