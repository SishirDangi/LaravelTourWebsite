<?php

namespace App\Http\Controllers;

use App\Models\BookTour;
use App\Models\TourPackage;
use App\Models\Status;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BookTourController extends Controller
{
    /**
     * Return a standardized error response.
     *
     * @param string $message
     * @param int $statusCode
     * @param array $errors
     * @return JsonResponse
     */
    protected function errorResponse(string $message, int $statusCode, array $errors = []): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $statusCode);
    }

    /**
     * Display a listing of the book tours.
     */
    public function index(): JsonResponse
    {
        try {
            $bookTours = BookTour::with(['tourPackage', 'status'])->get();
            return response()->json([
                'success' => true,
                'data' => $bookTours,
                'message' => $bookTours->isEmpty() ? 'No bookings found' : 'Book tours retrieved successfully'
            ], 200);
        } catch (QueryException $e) {
            Log::error('Database error fetching book tours', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->errorResponse('Database error occurred while fetching bookings: ' . $e->getMessage(), 500);
        } catch (\Exception $e) {
            Log::error('Unexpected error fetching book tours', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->errorResponse('Server error occurred while fetching bookings: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Store a newly created book tour in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255|regex:/^[\p{L}\s]+$/u',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:20|regex:/^[\+]?[0-9\s\-]+$/',
            'no_of_persons' => 'required|integer|min:1',
            'tour_date' => 'nullable|date|after:today',
            'tour_package_id' => 'required|exists:tour_packages,id',
        ], [
            'full_name.regex' => 'Full name must contain only letters and spaces.',
            'phone_number.regex' => 'Phone number must contain only numbers, spaces, hyphens, or a leading plus sign.',
            'tour_date.after' => 'Tour date must be tomorrow or a future date.'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', 422, $validator->errors()->toArray());
        }

        try {
            DB::beginTransaction();

            // Validate number of persons against tour package max_people
            $tourPackage = TourPackage::findOrFail($request->tour_package_id);
            if ($request->no_of_persons > $tourPackage->max_people) {
                return $this->errorResponse(
                    "Number of persons exceeds the maximum allowed ({$tourPackage->max_people}) for this tour package",
                    422
                );
            }

            // Check for duplicate booking
            $existingBooking = BookTour::where('email', $request->email)
                ->where('phone_number', $request->phone_number)
                ->where('tour_package_id', $request->tour_package_id)
                ->where('tour_date', $request->tour_date)
                ->first();

            if ($existingBooking) {
                return $this->errorResponse(
                    'A booking for this tour package on the same day already exists for this email and phone number',
                    422
                );
            }

            // Fetch the "Pending" status
            $pendingStatus = Status::where('name', 'Pending')->first();
            if (!$pendingStatus) {
                return $this->errorResponse('Pending status not found in the database', 500);
            }

            $bookTour = BookTour::create([
                'full_name' => $request->full_name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'no_of_persons' => $request->no_of_persons,
                'tour_date' => $request->tour_date,
                'tour_package_id' => $request->tour_package_id,
                'status_id' => $pendingStatus->id,
            ]);

            DB::commit();
            return response()->json([
                'success' => true,
                'data' => $bookTour->load(['tourPackage', 'status']),
                'message' => 'Tour booking created successfully'
            ], 201);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            Log::warning('Tour package not found for booking', [
                'tour_package_id' => $request->tour_package_id,
                'error' => $e->getMessage()
            ]);
            return $this->errorResponse('Invalid tour package selected', 404);
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error('Database error creating book tour', [
                'error' => $e->getMessage(),
                'request' => $request->except(['email', 'phone_number']),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->errorResponse('Database error occurred while creating booking: ' . $e->getMessage(), 500);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Unexpected error creating book tour', [
                'error' => $e->getMessage(),
                'request' => $request->except(['email', 'phone_number']),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->errorResponse('Server error occurred while creating booking: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Display the specified book tour.
     */
    public function show($id): JsonResponse
    {
        try {
            $bookTour = BookTour::with(['tourPackage', 'status'])->findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $bookTour,
                'message' => 'Book tour retrieved successfully'
            ], 200);
        } catch (ModelNotFoundException $e) {
            Log::warning('Book tour not found', ['id' => $id]);
            return $this->errorResponse('Booking not found', 404);
        } catch (QueryException $e) {
            Log::error('Database error fetching book tour', [
                'id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->errorResponse('Database error occurred while fetching booking: ' . $e->getMessage(), 500);
        } catch (\Exception $e) {
            Log::error('Unexpected error fetching book tour', [
                'id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->errorResponse('Server error occurred while fetching booking: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Update the specified book tour in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'sometimes|string|max:255|regex:/^[\p{L}\s]+$/u',
            'email' => 'sometimes|email|max:255',
            'phone_number' => 'sometimes|string|max:20|regex:/^[\+]?[0-9\s\-]+$/',
            'no_of_persons' => 'sometimes|integer|min:1',
            'tour_date' => 'nullable|date|after:today',
            'tour_package_id' => 'sometimes|exists:tour_packages,id',
        ], [
            'full_name.regex' => 'Full name must contain only letters and spaces.',
            'phone_number.regex' => 'Phone number must contain only numbers, spaces, hyphens, or a leading plus sign.',
            'tour_date.after' => 'Tour date must be tomorrow or a future date.'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', 422, $validator->errors()->toArray());
        }

        try {
            DB::beginTransaction();
            $bookTour = BookTour::findOrFail($id);

            // Validate number of persons against tour package max_people
            if ($request->has('no_of_persons') || $request->has('tour_package_id')) {
                $tourPackageId = $request->tour_package_id ?? $bookTour->tour_package_id;
                $tourPackage = TourPackage::findOrFail($tourPackageId);
                $noOfPersons = $request->no_of_persons ?? $bookTour->no_of_persons;
                if ($noOfPersons > $tourPackage->max_people) {
                    return $this->errorResponse(
                        "Number of persons exceeds the maximum allowed ({$tourPackage->max_people}) for this tour package",
                        422
                    );
                }
            }

            // Check for duplicate booking
            if ($request->hasAny(['email', 'phone_number', 'tour_package_id', 'tour_date'])) {
                $email = $request->email ?? $bookTour->email;
                $phone_number = $request->phone_number ?? $bookTour->phone_number;
                $tour_package_id = $request->tour_package_id ?? $bookTour->tour_package_id;
                $tour_date = $request->tour_date ?? $bookTour->tour_date;

                $existingBooking = BookTour::where('email', $email)
                    ->where('phone_number', $phone_number)
                    ->where('tour_package_id', $tour_package_id)
                    ->where('tour_date', $tour_date)
                    ->where('id', '!=', $id)
                    ->first();

                if ($existingBooking) {
                    return $this->errorResponse(
                        'A booking for this tour package on the same day already exists for this email and phone number',
                        422
                    );
                }
            }

            $bookTour->update($request->all());
            DB::commit();
            return response()->json([
                'success' => true,
                'data' => $bookTour->load(['tourPackage', 'status']),
                'message' => 'Tour booking updated successfully'
            ], 200);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            Log::warning('Book tour not found for update', ['id' => $id]);
            return $this->errorResponse('Booking not found', 404);
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error('Database error updating book tour', [
                'id' => $id,
                'request' => $request->except(['email', 'phone_number']),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->errorResponse('Database error occurred while updating booking: ' . $e->getMessage(), 500);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Unexpected error updating book tour', [
                'id' => $id,
                'request' => $request->except(['email', 'phone_number']),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->errorResponse('Server error occurred while updating booking: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified book tour from storage.
     */
    public function destroy($id): JsonResponse
    {
        try {
            DB::beginTransaction();
            $bookTour = BookTour::findOrFail($id);
            $bookTour->delete();
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Tour booking deleted successfully'
            ], 204);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            Log::warning('Book tour not found for deletion', ['id' => $id]);
            return $this->errorResponse('Booking not found', 404);
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error('Database error deleting book tour', [
                'id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->errorResponse('Database error occurred while deleting booking: ' . $e->getMessage(), 500);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Unexpected error deleting book tour', [
                'id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->errorResponse('Server error occurred while deleting booking: ' . $e->getMessage(), 500);
        }
    }
}