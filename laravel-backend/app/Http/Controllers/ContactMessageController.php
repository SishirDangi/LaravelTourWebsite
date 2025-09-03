<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactMessageController extends Controller
{
    // List all messages
    public function index()
    {
        $messages = ContactMessage::latest()->get();
        return response()->json($messages);
    }

    // Store a new message
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => ['nullable', 'regex:/^\d{7,20}$/'],
            'message' => ['required', 'string', 'max:2000', function ($attribute, $value, $fail) {
                if (str_word_count($value) > 300) {
                    $fail('The '.$attribute.' may not be greater than 300 words.');
                }
            }],
        ], [
            'name.required'    => 'Please enter your name.',
            'name.string'      => 'Name must be a valid string.',
            'name.max'         => 'Name cannot exceed 255 characters.',
            'email.required'   => 'Please enter your email address.',
            'email.email'      => 'Please enter a valid email address.',
            'email.max'        => 'Email cannot exceed 255 characters.',
            'phone.regex'      => 'Please enter a valid phone number.',
            'message.required' => 'Please enter your message.',
            'message.string'   => 'Message must be a valid string.',
            'message.max'      => 'Message cannot exceed 2000 characters.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();
        $data['status_id'] = 1;

        $message = ContactMessage::create($data);

        return response()->json([
            'message' => 'Message created successfully',
            'data'    => $message
        ], 201);
    }

    // Show a single message
    public function show($id)
    {
        $message = ContactMessage::find($id);

        if (!$message) {
            return response()->json(['error' => 'Message not found'], 404);
        }

        return response()->json($message);
    }

    // Update a message
    public function update(Request $request, $id)
    {
        $message = ContactMessage::find($id);

        if (!$message) {
            return response()->json(['error' => 'Message not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name'    => 'sometimes|required|string|max:255',
            'email'   => 'sometimes|required|email|max:255',
            'phone'   => ['nullable', 'regex:/^\d{7,20}$/'],
            'message' => ['sometimes', 'required', 'string', 'max:2000', function ($attribute, $value, $fail) {
                if (str_word_count($value) > 300) {
                    $fail('The '.$attribute.' may not be greater than 300 words.');
                }
            }],
        ], [
            'name.required'    => 'Please enter your name.',
            'name.string'      => 'Name must be a valid string.',
            'name.max'         => 'Name cannot exceed 255 characters.',
            'email.required'   => 'Please enter your email address.',
            'email.email'      => 'Please enter a valid email address.',
            'email.max'        => 'Email cannot exceed 255 characters.',
            'phone.regex'      => 'Please enter a valid phone number.',
            'message.required' => 'Please enter your message.',
            'message.string'   => 'Message must be a valid string.',
            'message.max'      => 'Message cannot exceed 2000 characters.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $message->update($request->all());

        return response()->json([
            'message' => 'Message updated successfully',
            'data'    => $message
        ]);
    }

    // Delete a message
    public function destroy($id)
    {
        $message = ContactMessage::find($id);

        if (!$message) {
            return response()->json(['error' => 'Message not found'], 404);
        }

        $message->delete();

        return response()->json(['message' => 'Message deleted successfully']);
    }
}