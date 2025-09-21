<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subscriber;
use App\Models\SubscriberOTP;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use Exception;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SubscriberController extends Controller
{
    // Generate and send OTP
    public function requestOTP(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:subscribers,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid email provided.',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Generate 6-digit OTP
            $otp = rand(100000, 999999);
            
            // Delete any existing OTP for this email
            SubscriberOTP::where('email', $request->email)->delete();

            // Store OTP with 5-minute expiration
            SubscriberOTP::create([
                'email' => $request->email,
                'otp' => $otp,
                'expires_at' => now()->addMinutes(5),
            ]);

            // Send OTP via email
            Mail::html("
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;'>
                    <div style='text-align: center; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
                        <h1 style='color: #333333; font-size: 24px; margin-bottom: 20px;'>Arati Hotel OTP Verification</h1>
                        <p style='color: #555555; font-size: 16px; margin-bottom: 20px;'>Dear Customer,</p>
                        <p style='color: #555555; font-size: 16px; margin-bottom: 20px;'>Thank you for choosing Arati Hotel. Your One-Time Password (OTP) for subscribing to our services is:</p>
                        <input type='text' value='$otp' readonly style='font-size: 24px; font-weight: bold; color: #ffffff; text-align: center; border: 1px solid #661F1F; border-radius: 5px; padding: 10px; margin: 20px auto; width: 150px; background-color: #661F1F; cursor: text; user-select: text; -webkit-user-select: text; -moz-user-select: text; -ms-user-select: text;' />
                        <p style='color: #555555; font-size: 16px; margin: 20px 0;'>Please highlight and copy the OTP above to complete your subscription. This OTP is valid for 5 minutes only.</p>
                        <p style='color: #555555; font-size: 16px; margin-bottom: 20px;'>If you did not initiate this request, please ignore this email or contact our support team.</p>
                        <p style='color: #555555; font-size: 16px;'>Best regards,<br>Arati Hotel Team</p>
                    </div>
                    <div style='text-align: center; margin-top: 20px; color: #888888; font-size: 12px;'>© " . date('Y') . " Arati Hotel. All rights reserved.</div>
                </div>", function ($message) use ($request) {
                    $message->to($request->email)
                            ->subject('Arati Hotel OTP Verification');
            });

            return response()->json([
                'status' => 'success',
                'message' => 'OTP sent to your email address. Please check your inbox (and spam folder).',
            ], 200);

        } catch (QueryException $e) {
            Log::error('Database error in requestOTP', ['error' => $e->getMessage(), 'email' => $request->email]);
            if ($e->getCode() === '42S02') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Database table not found. Please contact support.',
                    'error' => $e->getMessage(),
                ], 500);
            }
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to process OTP request due to a database issue.',
                'error' => $e->getMessage(),
            ], 500);
        } catch (Exception $e) {
            Log::error('Error sending OTP email', ['error' => $e->getMessage(), 'email' => $request->email]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to send OTP. Please check your email address or try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Verify OTP and create subscriber
    public function verifyOTP(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid email or OTP format. OTP must be a 6-digit number.',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $otpRecord = SubscriberOTP::where('email', $request->email)
                ->where('otp', $request->otp)
                ->first();

            if (!$otpRecord) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid OTP. Please enter the correct OTP or request a new one.',
                ], 400);
            }

            if ($otpRecord->expires_at <= now()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'The OTP has expired. Please request a new OTP.',
                ], 400);
            }

            // Create subscriber
            $subscriber = Subscriber::create([
                'email' => $request->email,
            ]);

            // Delete the used OTP
            $otpRecord->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Subscription completed successfully.',
                'data' => $subscriber,
            ], 201);

        } catch (QueryException $e) {
            Log::error('Database error in verifyOTP', ['error' => $e->getMessage(), 'email' => $request->email]);
            if ($e->getCode() === '23000') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'This email is already subscribed.',
                    'error' => $e->getMessage(),
                ], 409);
            }
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to save subscriber due to a database issue.',
                'error' => $e->getMessage(),
            ], 500);
        } catch (Exception $e) {
            Log::error('Unexpected error in verifyOTP', ['error' => $e->getMessage(), 'email' => $request->email]);
            return response()->json([
                'status' => 'error',
                'message' => 'An unexpected error occurred during OTP verification.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Admin: View All Subscribers
    public function index()
    {
        try {
            $subscribers = Subscriber::orderBy('created_at', 'desc')->get();

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'Subscribers fetched successfully.',
                    'data' => $subscribers,
                ],
                200,
            );
        } catch (Exception $e) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Failed to fetch subscribers.',
                    'error' => $e->getMessage(),
                ],
                500,
            );
        }
    }

    // Admin: Delete Subscriber by ID
    public function destroy($id)
    {
        try {
            $subscriber = Subscriber::find($id);

            if (!$subscriber) {
                return response()->json(
                    [
                        'status' => 'error',
                        'message' => 'Subscriber not found.',
                    ],
                    404,
                );
            }

            $subscriber->delete();

            return response()->json(
                [
                    'status' => 'success',
                    'message' => 'Subscriber deleted successfully.',
                ],
                200,
            );
        } catch (Exception $e) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Failed to delete subscriber.',
                    'error' => $e->getMessage(),
                ],
                500,
            );
        }
    }
}