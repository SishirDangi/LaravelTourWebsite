<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookToursTable extends Migration
{
    public function up(): void
    {
        Schema::create('book_tours', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone_number');
            $table->unsignedBigInteger('no_of_persons');
            $table->date('tour_date');
            $table->string('booking_code')->unique();
            $table->unsignedBigInteger('tour_package_id');
            $table->unsignedBigInteger('status_id');
            $table->timestamps();

            $table->foreign('tour_package_id')->references('id')->on('tour_packages')->onDelete('cascade');
            $table->foreign('status_id')->references('id')->on('statuses')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('book_tours');
    }
}
