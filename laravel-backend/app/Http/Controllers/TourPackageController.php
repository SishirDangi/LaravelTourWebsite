<?php
namespace App\Http\Controllers;

use App\Models\TourPackage;
use App\Models\Destination;
use App\Models\TourType;
use App\Models\Level;
use App\Models\TourPackageImage;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class TourPackageController extends Controller
{
    public function index()
    {
        try {
            $tourPackages = TourPackage::with(['destination', 'tourType', 'level', 'status', 'images'])->get();
            return response()->json(['data' => $tourPackages], Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('Fetch tour packages error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'Failed to fetch tour packages',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'destination_id' => 'required|exists:destinations,id',
                'tour_type_id' => 'required|exists:tour_types,id',
                'subcategory' => 'nullable|string|max:255',
                'level_id' => 'required|exists:levels,id',
                'price' => 'required|numeric|min:0',
                'discount' => 'nullable|numeric|min:0|max:100',
                'currency' => 'required|in:USD,NPR',
                'duration_days' => 'required|integer|min:1',
                'height_meters' => 'nullable|integer|min:0',
                'location' => 'nullable|string|max:255',
                'min_people' => 'required|integer|min:1',
                'max_people' => 'required|integer|min:1|gte:min_people',
                'overview' => 'nullable|string',
                'card_highlights' => 'nullable|array',
                'card_highlights.*' => 'string|max:255',
                'detailed_highlights' => 'nullable|array',
                'detailed_highlights.*' => 'string|max:255',
                'itinerary' => 'nullable|array',
                'itinerary.*.day' => 'required_with:itinerary|string|max:255',
                'itinerary.*.description' => 'required_with:itinerary|string',
                'map_url' => 'nullable|url',
      'map' => [
    'nullable',
    'string',
    function ($attribute, $value, $fail) {
        // Check if it's a valid URL
        if (filter_var($value, FILTER_VALIDATE_URL)) {
            if (!str_contains($value, 'google.com/maps')) {
                $fail("The $attribute must be a valid Google Maps URL.");
            }
            return;
        }

        // Check if it's a valid iframe
        if (!preg_match('/^<iframe\s+[^>]*src=["\']https:\/\/www\.google\.com\/maps\/embed\/?.*?["\'][^>]*>.*<\/iframe>$/i', $value)) {
            $fail("The $attribute must be a valid Google Maps embed iframe or URL.");
        }
    },
],

                
                'includes' => 'nullable|array',
                'includes.*' => 'string|max:255',
                'excludes' => 'nullable|array',
                'excludes.*' => 'string|max:255',
                'faqs' => 'nullable|array',
                'faqs.*.question' => 'required_with:faqs|string|max:255',
                'faqs.*.answer' => 'required_with:faqs|string',
                'images' => 'required|array|min:1',
                'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:512',
                'status_id' => 'required|in:4,5',
            ]);

            $images = $validated['images'];
            unset($validated['images']);

            $tourPackage = TourPackage::create($validated);

            foreach ($images as $index => $image) {
                $path = $image->store('uploads/tour_packages', 'public');
                $tourPackage->images()->create([
                    'image_path' => $path,
                    'is_main' => $index === 0,
                ]);
            }

            return response()->json(
                ['data' => $tourPackage->load(['destination', 'tourType', 'level', 'status', 'images'])],
                Response::HTTP_CREATED
            );
        } catch (ValidationException $e) {
            return response()->json(
                ['message' => 'Validation failed.', 'errors' => $e->errors()],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        } catch (\Exception $e) {
            \Log::error('Store tour package error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to create tour package', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function show($id)
    {
        try {
            $tourPackage = TourPackage::with(['destination', 'tourType', 'level', 'status', 'images'])->findOrFail($id);
            return response()->json(['data' => $tourPackage], Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('Show tour package error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'Tour package not found',
                'error' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $tourPackage = TourPackage::findOrFail($id);
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'destination_id' => 'sometimes|required|exists:destinations,id',
                'tour_type_id' => 'sometimes|required|exists:tour_types,id',
                'subcategory' => 'sometimes|nullable|string|max:255',
                'level_id' => 'sometimes|required|exists:levels,id',
                'price' => 'sometimes|required|numeric|min:0',
                'discount' => 'sometimes|nullable|numeric|min:0|max:100',
                'currency' => 'sometimes|required|in:USD,NPR',
                'duration_days' => 'sometimes|required|integer|min:1',
                'height_meters' => 'sometimes|nullable|integer|min:0',
                'location' => 'sometimes|nullable|string|max:255',
                'min_people' => 'sometimes|required|integer|min:1',
                'max_people' => 'sometimes|required|integer|min:1|gte:min_people',
                'overview' => 'sometimes|nullable|string',
                'card_highlights' => 'sometimes|nullable|array',
                'card_highlights.*' => 'string|max:255',
                'detailed_highlights' => 'sometimes|nullable|array',
                'detailed_highlights.*' => 'string|max:255',
                'itinerary' => 'sometimes|nullable|array',
                'itinerary.*.day' => 'required_with:itinerary|string|max:255',
                'itinerary.*.description' => 'required_with:itinerary|string',
                'map_url' => 'sometimes|nullable|url',
             'map' => [
    'nullable',
    'string',
    function ($attribute, $value, $fail) {
        // Check if it's a valid URL
        if (filter_var($value, FILTER_VALIDATE_URL)) {
            if (!str_contains($value, 'google.com/maps')) {
                $fail("The $attribute must be a valid Google Maps URL.");
            }
            return;
        }

        // Check if it's a valid iframe
        if (!preg_match('/^<iframe\s+[^>]*src=["\']https:\/\/www\.google\.com\/maps\/embed\/?.*?["\'][^>]*>.*<\/iframe>$/i', $value)) {
            $fail("The $attribute must be a valid Google Maps embed iframe or URL.");
        }
    },
],


                'includes' => 'sometimes|nullable|array',
                'includes.*' => 'string|max:255',
                'excludes' => 'sometimes|nullable|array',
                'excludes.*' => 'string|max:255',
                'faqs' => 'sometimes|nullable|array',
                'faqs.*.question' => 'required_with:faqs|string|max:255',
                'faqs.*.answer' => 'required_with:faqs|string',
                'images' => 'sometimes|array',
                'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:512',
                'deleted_images' => 'sometimes|array',
                'deleted_images.*' => 'integer|exists:tour_package_images,id',
                'status_id' => 'sometimes|required|in:4,5',
            ]);

            DB::beginTransaction();

            // Handle deleted images
            if (isset($validated['deleted_images'])) {
                foreach ($validated['deleted_images'] as $did) {
                    $image = $tourPackage->images()->where('id', $did)->first();
                    if ($image) {
                        if (Storage::disk('public')->exists($image->image_path)) {
                            Storage::disk('public')->delete($image->image_path);
                        }
                        $image->delete();
                    }
                }
            }

            // Ensure there's a main image if there are remaining images
            $remainingImages = $tourPackage->images()->get();
            if ($remainingImages->count() > 0 && !$remainingImages->contains('is_main', true)) {
                $remainingImages->first()->update(['is_main' => true]);
            }

            // Handle new images
            if ($request->hasFile('images')) {
                $imageFiles = $request->file('images');
                $hasNoImages = $tourPackage->images()->count() === 0;
                foreach ($imageFiles as $index => $imageFile) {
                    $path = $imageFile->store('uploads/tour_packages', 'public');
                    $isMain = $hasNoImages && $index === 0;
                    $tourPackage->images()->create([
                        'image_path' => $path,
                        'is_main' => $isMain,
                    ]);
                }
            }

            unset($validated['images']);
            unset($validated['deleted_images']);
            $tourPackage->update($validated);

            DB::commit();

            return response()->json(
                ['data' => $tourPackage->load(['destination', 'tourType', 'level', 'status', 'images'])],
                Response::HTTP_OK
            );
        } catch (ValidationException $e) {
            return response()->json(
                ['message' => 'Validation failed.', 'errors' => $e->errors()],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Update tour package error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to update tour package', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function destroy($id)
    {
        try {
            $tourPackage = TourPackage::with('images')->findOrFail($id);

            DB::beginTransaction();

            foreach ($tourPackage->images as $image) {
                if (Storage::disk('public')->exists($image->image_path)) {
                    Storage::disk('public')->delete($image->image_path);
                }
                $image->delete();
            }
            $tourPackage->delete();

            DB::commit();

            return response()->json(
                ['message' => 'Tour package deleted successfully.'],
                Response::HTTP_NO_CONTENT
            );
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Delete tour package error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to delete tour package', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function getDestinations()
    {
        try {
            $destinations = Destination::with('tourPackages')->get();
            return response()->json(['data' => $destinations], Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('Get destinations error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to fetch destinations', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function addDestination(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|unique:destinations,name|max:255',
            ]);
            $destination = Destination::create($validated);
            return response()->json(['data' => $destination], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(
                ['message' => 'Validation failed.', 'errors' => $e->errors()],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        } catch (\Exception $e) {
            \Log::error('Add destination error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to add destination', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function deleteDestination($id)
    {
        try {
            $destination = Destination::findOrFail($id);
            if ($destination->tourPackages()->count()) {
                return response()->json(
                    ['message' => 'Cannot delete destination assigned to tour packages.'],
                    Response::HTTP_CONFLICT
                );
            }
            $destination->delete();
            return response()->json(['message' => 'Destination deleted.'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            \Log::error('Delete destination error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to delete destination', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function getTourTypes()
    {
        try {
            $tourTypes = TourType::with('tourPackages')->get();
            return response()->json(['data' => $tourTypes], Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('Get tour types error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to fetch tour types', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function addTourType(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|unique:tour_types,name|max:255',
            ]);
            $tourType = TourType::create($validated);
            return response()->json(['data' => $tourType], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(
                ['message' => 'Validation failed.', 'errors' => $e->errors()],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        } catch (\Exception $e) {
            \Log::error('Add tour type error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to add tour type', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function deleteTourType($id)
    {
        try {
            $tourType = TourType::findOrFail($id);
            if ($tourType->tourPackages()->count()) {
                return response()->json(
                    ['message' => 'Cannot delete tour type assigned to tour packages.'],
                    Response::HTTP_CONFLICT
                );
            }
            $tourType->delete();
            return response()->json(['message' => 'Tour type deleted.'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            \Log::error('Delete tour type error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to delete tour type', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function getLevels()
    {
        try {
            $levels = Level::with('tourPackages')->get();
            return response()->json(['data' => $levels], Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('Get levels error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to fetch levels', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function addLevel(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|unique:levels,name|max:255',
            ]);
            $level = Level::create($validated);
            return response()->json(['data' => $level], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(
                ['message' => 'Validation failed.', 'errors' => $e->errors()],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        } catch (\Exception $e) {
            \Log::error('Add level error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to add level', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function deleteLevel($id)
    {
        try {
            $level = Level::findOrFail($id);
            if ($level->tourPackages()->count()) {
                return response()->json(
                    ['message' => 'Cannot delete level assigned to tour packages.'],
                    Response::HTTP_CONFLICT
                );
            }
            $level->delete();
            return response()->json(['message' => 'Level deleted.'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            \Log::error('Delete level error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(
                ['message' => 'Failed to delete level', 'error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}