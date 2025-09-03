<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TourPackageController;
use App\Http\Controllers\BookTourController;
use App\Http\Controllers\PopularTourController;

Route::apiResource('users', UserController::class);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/user', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/user/change-password', [UserController::class, 'changePassword']);

Route::apiResource('contact-messages', ContactMessageController::class);
Route::apiResource('blogs', BlogController::class);




Route::prefix('statuses')->group(function () {
    Route::get('/', [StatusController::class, 'index'])->name('statuses.index');
    Route::post('/', [StatusController::class, 'store'])->name('statuses.store');
    Route::get('/{id}', [StatusController::class, 'show'])->name('statuses.show');
    Route::put('/{id}', [StatusController::class, 'update'])->name('statuses.update');
    Route::delete('/{id}', [StatusController::class, 'destroy'])->name('statuses.destroy');
});

Route::prefix('tour-packages')->group(function () {
    Route::get('/', [TourPackageController::class, 'index'])->name('tour-packages.index');
    Route::post('/', [TourPackageController::class, 'store'])->name('tour-packages.store');
    Route::get('/{id}', [TourPackageController::class, 'show'])->name('tour-packages.show');
    Route::put('/{id}', [TourPackageController::class, 'update'])->name('tour-packages.update');
    Route::delete('/{id}', [TourPackageController::class, 'destroy'])->name('tour-packages.destroy');
});

Route::prefix('destinations')->group(function () {
    Route::get('/', [TourPackageController::class, 'getDestinations'])->name('destinations.index');
    Route::post('/', [TourPackageController::class, 'addDestination'])->name('destinations.store');
    Route::delete('/{id}', [TourPackageController::class, 'deleteDestination'])->name('destinations.destroy');
});

Route::prefix('tour-types')->group(function () {
    Route::get('/', [TourPackageController::class, 'getTourTypes'])->name('tour-types.index');
    Route::post('/', [TourPackageController::class, 'addTourType'])->name('tour-types.store');
    Route::delete('/{id}', [TourPackageController::class, 'deleteTourType'])->name('tour-types.destroy');
});

Route::prefix('levels')->group(function () {
    Route::get('/', [TourPackageController::class, 'getLevels'])->name('levels.index');
    Route::post('/', [TourPackageController::class, 'addLevel'])->name('levels.store');
    Route::delete('/{id}', [TourPackageController::class, 'deleteLevel'])->name('levels.destroy');
});

Route::apiResource('book-tours', BookTourController::class);


Route::get('/popular-tours', [PopularTourController::class, 'index']);