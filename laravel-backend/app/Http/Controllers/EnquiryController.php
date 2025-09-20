<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Exception;
use Illuminate\Support\Facades\Log;

class EnquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $enquiries = Enquiry::with('status')->get(); // Load status relationship

            return response()->json([
                'success' => true,
                'message' => 'Enquiries retrieved successfully!',
                'data' => $enquiries,
            ], 200);

        } catch (QueryException $e) {
            Log::error('Database error in EnquiryController@index: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve enquiries due to a database error. Please try again later.',
                'data' => null,
            ], 500);

        } catch (Exception $e) {
            Log::error('Unexpected error in EnquiryController@index: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred. Please try again later.',
                'data' => null,
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Validate the incoming request with enhanced rules
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
                'email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:20|regex:/^[\+]?[0-9\s\-\(\)]{7,20}$/',
                'message' => [
                    'required',
                    'string',
                    function ($attribute, $value, $fail) {
                        $words = str_word_count($value);
                        if ($words > 500) {
                            $fail('The ' . $attribute . ' may not be greater than 500 words.');
                        }
                    },
                ],
            ], [
                'name.regex' => 'Please enter a valid name.',
                'phone.regex' => 'The phone number format is invalid.',
            ]);

            // Add default status_id = 1 (Pending) to the validated data
            $validated['status_id'] = 1;

            // Create the enquiry
            $enquiry = Enquiry::create($validated);

            // Load the status relationship for the response
            $enquiry->load('status');

            return response()->json([
                'success' => true,
                'message' => 'Enquiry submitted successfully! It has been marked as Pending.',
                'data' => $enquiry,
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);

        } catch (QueryException $e) {
            Log::error('Database error in EnquiryController@store: ' . $e->getMessage(), [
                'request_data' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to save enquiry due to a database error. Please try again later.',
                'errors' => null,
            ], 500);

        } catch (Exception $e) {
            Log::error('Unexpected error in EnquiryController@store: ' . $e->getMessage(), [
                'request_data' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred. Please try again later.',
                'errors' => null,
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Enquiry $enquiry): JsonResponse
    {
        try {
            // Load the status relationship
            $enquiry->load('status');

            return response()->json([
                'success' => true,
                'message' => 'Enquiry retrieved successfully!',
                'data' => $enquiry,
            ], 200);

        } catch (Exception $e) {
            Log::error('Unexpected error in EnquiryController@show: ' . $e->getMessage(), [
                'enquiry_id' => $enquiry->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred. Please try again later.',
                'data' => null,
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Enquiry $enquiry): JsonResponse
    {
        try {
            // Validate the incoming request with enhanced rules (using 'sometimes' for optional updates)
            $validated = $request->validate([
                'name' => ['sometimes', 'required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
                'email' => 'sometimes|required|email|max:255',
                'phone' => 'sometimes|nullable|string|max:20|regex:/^[\+]?[0-9\s\-\(\)]{7,20}$/',
                'message' => [
                    'sometimes',
                    'required',
                    function ($attribute, $value, $fail) {
                        $words = str_word_count($value);
                        if ($words > 500) {
                            $fail('The ' . $attribute . ' may not be greater than 500 words.');
                        }
                    },
                ],
                'status_id' => 'sometimes|exists:statuses,id', // Allow status updates for admin
            ], [
                'name.regex' => 'Please enter a valid name.',
                'phone.regex' => 'The phone number format is invalid.',
                'status_id.exists' => 'The selected status is invalid.',
            ]);

            // Update the enquiry
            $enquiry->update($validated);

            // Reload with fresh data and status relationship
            $enquiry->fresh()->load('status');

            return response()->json([
                'success' => true,
                'message' => 'Enquiry updated successfully!',
                'data' => $enquiry,
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);

        } catch (QueryException $e) {
            Log::error('Database error in EnquiryController@update: ' . $e->getMessage(), [
                'enquiry_id' => $enquiry->id,
                'request_data' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update enquiry due to a database error. Please try again later.',
                'errors' => null,
            ], 500);

        } catch (Exception $e) {
            Log::error('Unexpected error in EnquiryController@update: ' . $e->getMessage(), [
                'enquiry_id' => $enquiry->id,
                'request_data' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred. Please try again later.',
                'errors' => null,
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enquiry $enquiry): JsonResponse
    {
        try {
            $enquiry->delete();

            return response()->json([
                'success' => true,
                'message' => 'Enquiry deleted successfully!',
                'data' => null,
            ], 200);

        } catch (QueryException $e) {
            Log::error('Database error in EnquiryController@destroy: ' . $e->getMessage(), [
                'enquiry_id' => $enquiry->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete enquiry due to a database error. Please try again later.',
                'data' => null,
            ], 500);

        } catch (Exception $e) {
            Log::error('Unexpected error in EnquiryController@destroy: ' . $e->getMessage(), [
                'enquiry_id' => $enquiry->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred. Please try again later.',
                'data' => null,
            ], 500);
        }
    }
}