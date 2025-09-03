<?php

namespace App\Http\Controllers;

use App\Models\PopularTour;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class PopularTourController extends Controller
{
    /**
     * Display a listing of popular tours sorted by booking count.
     *
     * Fetches all popular tours with their associated tour package data,
     * sorted by booking count in descending order.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $popularTours = PopularTour::with([
                'tourPackage',
                'tourPackage.destination',
                'tourPackage.tourType',
                'tourPackage.level',
                'tourPackage.status',
                'tourPackage.images'
            ])
                ->orderBy('booking_count', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $popularTours,
                'message' => $popularTours->isEmpty() ? 'No popular tours found' : 'Popular tours retrieved successfully'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Fetch popular tours error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch popular tours',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}