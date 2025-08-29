<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class BlogController extends Controller
{
    public function __construct()
    {
        // Register custom validation rule for max words
        Validator::extend('max_words', function ($attribute, $value, $parameters, $validator) {
            $wordCount = count(array_filter(explode('\s+', trim($value))));
            return $wordCount <= $parameters[0];
        }, 'The :attribute must not exceed :max words.');
    }

    public function index()
    {
        try {
            $blogs = Blog::all();
            if ($blogs->isEmpty()) {
                return response()->json(['message' => 'No blogs found'], 200);
            }
            return response()->json($blogs);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Failed to fetch blogs due to database error: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unexpected error while fetching blogs: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $blog = Blog::findOrFail($id);
            return response()->json($blog);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => "Blog with ID $id not found"], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unexpected error while fetching blog: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:100',
            'writer_name' => 'required|string',
            'content' => 'required|string|max_words:500',
            'image' => 'nullable|image|mimes:webp,jpg,jpeg,png|max:512',
            'post_date' => 'required|date|before_or_equal:today',
        ], [
            'title.required' => 'Title is required.',
            'title.string' => 'Title must be a string.',
            'title.max' => 'Title cannot exceed 100 characters.',
            'writer_name.required' => 'Writer name is required.',
            'writer_name.string' => 'Writer name must be a string.',
            'content.required' => 'Content is required.',
            'content.string' => 'Content must be a string.',
            'content.max_words' => 'Content cannot exceed 500 words.',
            'image.image' => 'Uploaded file must be an image.',
            'image.mimes' => 'Image must be in webp, jpg, jpeg, or png format.',
            'image.max' => 'Image size cannot exceed 512KB.',
            'post_date.required' => 'Post date is required.',
            'post_date.date' => 'Post date must be a valid date.',
            'post_date.before_or_equal' => 'Post date cannot be in the future.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $data = $request->all();
            if ($request->hasFile('image')) {
                if (!$request->file('image')->isValid()) {
                    return response()->json(['errors' => ['image' => 'Invalid image file uploaded.']], 422);
                }
                $path = $request->file('image')->store('images', 'public');
                if (!$path) {
                    return response()->json(['error' => 'Failed to store image.'], 500);
                }
                $data['image'] = $path;
            }

            $blog = Blog::create($data);
            return response()->json(['blog' => $blog], 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Failed to create blog due to database error: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unexpected error while creating blog: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $blog = Blog::findOrFail($id);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => "Blog with ID $id not found"], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:100',
            'writer_name' => 'required|string',
            'content' => 'required|string|max_words:500',
            'image' => 'nullable|image|mimes:webp,jpg,jpeg,png|max:512',
            'post_date' => 'required|date|before_or_equal:today',
        ], [
            'title.required' => 'Title is required.',
            'title.string' => 'Title must be a string.',
            'title.max' => 'Title cannot exceed 100 characters.',
            'writer_name.required' => 'Writer name is required.',
            'writer_name.string' => 'Writer name must be a string.',
            'content.required' => 'Content is required.',
            'content.string' => 'Content must be a string.',
            'content.max_words' => 'Content cannot exceed 500 words.',
            'image.image' => 'Uploaded file must be an image.',
            'image.mimes' => 'Image must be in webp, jpg, jpeg, or png format.',
            'image.max' => 'Image size cannot exceed 512KB.',
            'post_date.required' => 'Post date is required.',
            'post_date.date' => 'Post date must be a valid date.',
            'post_date.before_or_equal' => 'Post date cannot be in the future.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $data = $request->all();
            if ($request->hasFile('image')) {
                if (!$request->file('image')->isValid()) {
                    return response()->json(['errors' => ['image' => 'Invalid image file uploaded.']], 422);
                }
                if ($blog->image) {
                    Storage::disk('public')->delete($blog->image);
                }
                $path = $request->file('image')->store('images', 'public');
                if (!$path) {
                    return response()->json(['error' => 'Failed to store image.'], 500);
                }
                $data['image'] = $path;
            }

            $blog->update($data);
            return response()->json(['blog' => $blog], 200);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Failed to update blog due to database error: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unexpected error while updating blog: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $blog = Blog::findOrFail($id);
            if ($blog->image) {
                if (!Storage::disk('public')->delete($blog->image)) {
                    return response()->json(['error' => 'Failed to delete blog image.'], 500);
                }
            }
            $blog->delete();
            return response()->json(['message' => 'Blog deleted successfully'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => "Blog with ID $id not found"], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unexpected error while deleting blog: ' . $e->getMessage()], 500);
        }
    }
}