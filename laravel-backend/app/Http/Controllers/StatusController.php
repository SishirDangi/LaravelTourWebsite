<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class StatusController extends Controller
{
    public function index()
    {
        $statuses = Status::all(['id', 'name']);
        return response()->json([
            'data' => $statuses,
            'message' => $statuses->isEmpty() ? 'No statuses found' : 'Statuses retrieved successfully'
        ], Response::HTTP_OK);
    }

    public function tourStatuses()
    {
        // Fetch only statuses with IDs 4 (Available) and 5 (Unavailable)
        $statuses = Status::whereIn('id', [4, 5])->get(['id', 'name']);
        return response()->json([
            'data' => $statuses,
            'message' => $statuses->isEmpty() ? 'No tour statuses found for IDs 4 or 5' : 'Tour statuses retrieved successfully'
        ], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50|unique:statuses,name',
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                    'required_fields' => [
                        'name' => 'required|string|max:50|unique',
                    ],
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $validated = $validator->validated();
        $status = Status::create($validated);

        return response()->json(
            [
                'message' => 'Status created successfully.',
                'data' => $status,
            ],
            Response::HTTP_CREATED
        );
    }

    public function show($id)
    {
        $status = Status::find($id, ['id', 'name']);
        if (!$status) {
            return response()->json(
                [
                    'message' => 'Status not found',
                    'errors' => ['status' => ['No status found with the given ID.']],
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        return response()->json([
            'data' => $status,
            'message' => 'Status retrieved successfully'
        ], Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $status = Status::find($id);
        if (!$status) {
            return response()->json(
                [
                    'message' => 'Status not found',
                    'errors' => ['status' => ['No status found with the given ID.']],
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $validator = Validator::make($request->all(), [
            'name' => ['sometimes', 'required', 'string', 'max:50', Rule::unique('statuses')->ignore($status->id)],
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                    'required_fields' => [
                        'name' => 'required|string|max:50|unique',
                    ],
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $validated = $validator->validated();
        $status->update($validated);

        return response()->json(
            [
                'message' => 'Status updated successfully.',
                'data' => $status,
            ],
            Response::HTTP_OK
        );
    }

    public function destroy($id)
    {
        $status = Status::find($id);
        if (!$status) {
            return response()->json(
                [
                    'message' => 'Status not found',
                    'errors' => ['status' => ['No status found with the given ID.']],
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $status->delete();

        return response()->json(
            [
                'message' => 'Status deleted successfully.',
            ],
            Response::HTTP_OK
        );
    }
}