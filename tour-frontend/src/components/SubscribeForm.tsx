import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [showResend, setShowResend] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Countdown timer effect
  useEffect(() => {
    if (isOtpSent && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setError("The OTP has expired. Please request a new OTP.");
            setShowResend(true);
            setIsOtpSent(false);
            setOtp("");
            setSuccess("");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOtpSent, timeLeft]);

  // Format timeLeft to mm:ss
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle email submission to request OTP
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    setShowResend(false);

    if (!email.trim()) {
      setError("Email is required.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/subscribers/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422 && data.errors?.email) {
          setError(data.errors.email[0]);
        } else if (response.status === 409) {
          setError(data.message || "This email is already subscribed.");
        } else {
          setError(data.message || "Failed to send OTP. Please try again.");
        }
      } else {
        setIsOtpSent(true);
        setTimeLeft(300);
        setSuccess(
          "Please check your email. We have sent an OTP to your provided email address. OTP expires in: " +
            formatTime(300)
        );
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    setShowResend(false);

    if (!otp.trim() || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/subscribers/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422 && data.errors) {
          setError(data.errors.otp ? data.errors.otp[0] : data.errors.email[0]);
        } else if (response.status === 400) {
          setError(
            data.message ||
              "Invalid OTP. Please enter the correct OTP or request a new one."
          );
          setShowResend(true);
          if (data.message.includes("expired")) {
            setIsOtpSent(false);
            setOtp("");
          }
        } else if (response.status === 409) {
          setError(data.message || "This email is already subscribed.");
        } else {
          setError(data.message || "Failed to verify OTP. Please try again.");
        }
      } else {
        setSubmitted(true);
        setSuccess("Subscription successful!");
        setEmail("");
        setOtp("");
        setIsOtpSent(false);
        setTimeLeft(300);

        setTimeout(() => {
          setSubmitted(false);
          setSuccess("");
        }, 3000);
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setOtp("");
    await handleEmailSubmit(e as any); // TypeScript workaround for event compatibility
    setIsSubmitting(false);
  };

  // Update success message with current time left
  const getSuccessMessage = (): string => {
    if (success && isOtpSent) {
      return success.replace(
        /OTP expires in: \d+:\d{2}/,
        `OTP expires in: ${formatTime(timeLeft)}`
      );
    }
    return success;
  };

  return (
    <form
      onSubmit={isOtpSent ? handleOtpSubmit : handleEmailSubmit}
      className="flex flex-col items-center md:items-start gap-4 w-full"
    >
      <div className="flex flex-col w-full space-y-2">
        <input
          type="email"
          placeholder="Enter your email"
          disabled={submitted || isSubmitting}
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
          className="px-4 py-3 text-white bg-transparent placeholder-white border border-orange-500 rounded-lg w-full text-base text-center md:text-left focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        />
        {isOtpSent && (
          <input
            type="text"
            placeholder="Enter OTP"
            disabled={submitted || isSubmitting}
            value={otp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOtp(e.target.value)
            }
            required
            className="px-4 py-3 text-white bg-transparent placeholder-white border border-orange-500 rounded-lg w-full text-base text-center md:text-left focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          />
        )}
        {error && (
          <p className="text-sm text-red-400 bg-red-900 bg-opacity-50 p-2 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-400 bg-green-900 bg-opacity-50 p-2 rounded">
            {getSuccessMessage()}
          </p>
        )}
        <button
          type="submit"
          disabled={submitted || isSubmitting}
          className="
            relative 
            overflow-hidden 
            bg-orange-500 
            hover:bg-orange-600 
            text-white 
            px-10 py-3 
            rounded-full 
            font-semibold 
            transition 
            duration-300 
            w-full 
            flex items-center justify-center gap-2
            disabled:opacity-70 disabled:cursor-not-allowed
          "
        >
          {!submitted ? (
            isOtpSent ? (
              isSubmitting ? (
                "Verifying..."
              ) : (
                "Verify OTP"
              )
            ) : isSubmitting ? (
              "Subscribing..."
            ) : (
              "Subscribe"
            )
          ) : (
            <>
              <FaCheck className="animate-checkmark" />
              Subscribed
              <style>{`
                @keyframes checkmark {
                  0% {
                    opacity: 0;
                    transform: scale(0);
                  }
                  50% {
                    opacity: 1;
                    transform: scale(1.3);
                  }
                  100% {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
                .animate-checkmark {
                  animation: checkmark 0.5s ease forwards;
                }
              `}</style>
            </>
          )}
        </button>
        {showResend && (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isSubmitting}
            className="
              relative 
              overflow-hidden 
              bg-orange-500 
              hover:bg-orange-600 
              text-white 
              px-10 py-3 
              rounded-full 
              font-semibold 
              transition 
              duration-300 
              w-full 
              flex items-center justify-center gap-2
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            Request New OTP
          </button>
        )}
      </div>
    </form>
  );
};

export default SubscribeForm;