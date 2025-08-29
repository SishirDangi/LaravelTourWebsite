<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // List all users
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    // Register a new user
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['Male', 'Female', 'Other'])],
            'phone_number' => 'required|string|max:15|unique:users,phone_number',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                    'required_fields' => [
                        'fullname' => 'required|string|max:255',
                        'gender' => 'required: Male | Female | Other',
                        'phone_number' => 'required|string|max:15|unique',
                        'email' => 'required|email|unique',
                        'password' => 'required|string|min:6|confirmed',
                        'password_confirmation' => 'required for confirmation',
                        'role_id' => 'required|exists in roles table',
                    ],
                ],
                422,
            );
        }

        $validated = $validator->validated();
        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return response()->json(
            [
                'message' => 'User registered successfully.',
                'data' => $user,
            ],
            201,
        );
    }

    // Show single user
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(
                [
                    'message' => 'User not found',
                    'errors' => ['user' => ['No user found with the given ID.']],
                ],
                404,
            );
        }

        return response()->json($user, 200);
    }

    // Update user
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(
                [
                    'message' => 'User not found',
                    'errors' => ['user' => ['No user found with the given ID.']],
                ],
                404,
            );
        }

        $validator = Validator::make($request->all(), [
            'fullname' => 'sometimes|required|string|max:255',
            'gender' => ['sometimes', 'required', Rule::in(['Male', 'Female', 'Other'])],
            'phone_number' => ['sometimes', 'required', 'string', 'max:15', Rule::unique('users')->ignore($user->id)],
            'email' => ['sometimes', 'required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'sometimes|required|string|min:6|confirmed',
            'role_id' => 'sometimes|required|exists:roles,id',
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                    'required_fields' => [
                        'fullname' => 'required|string|max:255',
                        'gender' => 'required: Male | Female | Other',
                        'phone_number' => 'required|string|max:15|unique',
                        'email' => 'required|email|unique',
                        'password' => 'required|string|min:6|confirmed',
                        'password_confirmation' => 'required for confirmation',
                        'role_id' => 'required|exists in roles table',
                    ],
                ],
                422,
            );
        }

        $validated = $validator->validated();

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json(
            [
                'message' => 'User updated successfully.',
                'data' => $user,
            ],
            200,
        );
    }

    public function changePassword(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                    'required_fields' => [
                        'current_password' => 'required',
                        'new_password' => 'required|string|min:6|confirmed',
                        'new_password_confirmation' => 'required for confirmation',
                    ],
                ],
                422,
            );
        }

        // Check current password
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(
                [
                    'message' => 'Current password is incorrect.',
                    'errors' => ['current_password' => ['The provided current password does not match our records.']],
                ],
                403,
            );
        }

        // Check if new password is the same as current password
        if (Hash::check($request->new_password, $user->password)) {
            return response()->json(
                [
                    'message' => 'New password cannot be the same as the current password.',
                    'errors' => ['new_password' => ['The new password must be different from the current password.']],
                ],
                422,
            );
        }

        // Update password
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(
            [
                'message' => 'Password updated successfully.',
            ],
            200,
        );
    }

    // Delete user
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(
                [
                    'message' => 'User not found',
                    'errors' => ['user' => ['No user found with the given ID.']],
                ],
                404,
            );
        }

        $user->delete();

        return response()->json(
            [
                'message' => 'User deleted successfully.',
            ],
            200,
        );
    }
}
