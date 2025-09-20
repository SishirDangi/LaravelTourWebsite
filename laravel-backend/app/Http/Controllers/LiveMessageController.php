<?php

namespace App\Http\Controllers;

use App\Models\LiveMessage;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LiveMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = LiveMessage::with('status')
            ->orderBy('show_until', 'desc')
            ->get();
        return response()->json($messages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'message' => 'required|string|max:500',
            'show_until' => 'required|date|after_or_equal:today',
            'status_id' => 'required|in:7,8', // Only allow status IDs 7 and 8
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $message = LiveMessage::create($request->all());
        $message->load('status');
        return response()->json($message, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(LiveMessage $liveMessage)
    {
        $liveMessage->load('status');
        return response()->json($liveMessage);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LiveMessage $liveMessage)
    {
        $validator = Validator::make($request->all(), [
            'message' => 'sometimes|required|string|max:500',
            'show_until' => 'sometimes|required|date|after_or_equal:today',
            'status_id' => 'sometimes|required|in:7,8', // Only allow status IDs 7 and 8
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $liveMessage->update($request->all());
        $liveMessage->load('status');
        return response()->json($liveMessage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LiveMessage $liveMessage)
    {
        $liveMessage->delete();
        return response()->json(null, 204);
    }

    /**
     * Get only Active (7) and Inactive (8) statuses for dropdown
     */
    public function getStatuses()
    {
        $statuses = Status::whereIn('id', [7, 8])
            ->select('id', 'name')
            ->orderBy('id')
            ->get();
        return response()->json($statuses);
    }
}