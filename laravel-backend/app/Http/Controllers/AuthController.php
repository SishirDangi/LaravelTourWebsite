<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class AuthController extends Controller
{
    // Register new user (unchanged)
    public function register(Request $request)
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
                ],
                422,
            );
        }

        try {
            $validated = $validator->validated();
            $validated['password'] = Hash::make($validated['password']);

            $user = User::create($validated);
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(
                [
                    'message' => 'User registered successfully',
                    'user' => $user,
                    'token' => $token,
                ],
                201,
            );
        } catch (QueryException $e) {
            return response()->json(
                [
                    'message' => 'Database error occurred during registration',
                    'errors' => ['database' => [$e->getMessage()]],
                ],
                500,
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'An unexpected error occurred',
                    'errors' => ['server' => [$e->getMessage()]],
                ],
                500,
            );
        }
    }

    // Login existing user (updated)
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ],
                422,
            );
        }

        try {
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json(
                    [
                        'message' => 'Invalid credentials',
                        'errors' => ['email' => ['The provided email does not exist.']],
                    ],
                    404,
                );
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json(
                    [
                        'message' => 'Invalid credentials',
                        'errors' => ['password' => ['The provided password is incorrect.']],
                    ],
                    401,
                );
            }

            // Check if user has admin role (role_id = 1)
            if ((int) $user->role_id !== 1) {
                return response()->json(
                    [
                        'message' => 'Unauthorized access',
                        'errors' => [
                            'role' => [
                                'Only admin users are allowed to login.',
                                'Debug: role_id found = ' . ($user->role_id ?? 'null'),
                            ],
                        ],
                    ],
                    403,
                );
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(
                [
                    'message' => 'Login successful!',
                    'user' => $user,
                    'token' => $token,
                ],
                200,
            );
        } catch (QueryException $e) {
            return response()->json(
                [
                    'message' => 'Database error occurred during login',
                    'errors' => ['database' => [$e->getMessage()]],
                ],
                500,
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'An unexpected error occurred',
                    'errors' => ['server' => [$e->getMessage()]],
                ],
                500,
            );
        }
    }

    // Get current logged-in user (unchanged)
    public function user(Request $request)
    {
        try {
            return response()->json($request->user());
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Error retrieving user data',
                    'errors' => ['server' => [$e->getMessage()]],
                ],
                500,
            );
        }
    }

    // Logout (Revoke token) (unchanged)
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Logged out successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => 'Error during logout',
                    'errors' => ['server' => [$e->getMessage()]],
                ],
                500,
            );
        }
    }
}