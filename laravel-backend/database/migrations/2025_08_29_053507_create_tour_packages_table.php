<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tour_packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('destination_id');
            $table->unsignedBigInteger('tour_type_id');
            $table->string('subcategory')->nullable();
            $table->unsignedBigInteger('level_id');
            $table->decimal('price', 10, 2);
            $table->decimal('discount', 5, 2)->nullable();
            $table->string('currency');
            $table->integer('duration_days');
            $table->integer('height_meters')->nullable();
            $table->string('location')->nullable();
            $table->integer('min_people');
            $table->integer('max_people');
            $table->text('overview')->nullable();
            $table->text('card_highlights')->nullable();
            $table->text('detailed_highlights')->nullable();
            $table->text('itinerary')->nullable();
            $table->string('map_url')->nullable();
            $table->text('includes')->nullable();
            $table->text('excludes')->nullable();
            $table->text('faqs')->nullable();
            $table->unsignedBigInteger('status_id');
            $table->timestamps();

            $table->foreign('destination_id')->references('id')->on('destinations')->onDelete('cascade');
            $table->foreign('tour_type_id')->references('id')->on('tour_types')->onDelete('cascade');
            $table->foreign('level_id')->references('id')->on('levels')->onDelete('cascade');
            $table->foreign('status_id')->references('id')->on('statuses')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tour_packages');
    }
};