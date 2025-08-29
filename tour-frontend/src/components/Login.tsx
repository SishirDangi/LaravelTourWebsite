import React, { useState, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormData {
  email: string;
  password: string;
}

interface ErrorResponse {
  errors?: Record<string, string[]>;
  message?: string;
}

interface LoginResponse {
  token: string;
  user: {
    role_id: string;
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string[]>>>({});
  const [serverError, setServerError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin-dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setIsAuthenticated(false);

    try {
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_URL}/login`,
        form
      );

      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userRole", response.data.user.role_id);
      setIsAuthenticated(true);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (
        axiosError.response?.status === 422 ||
        axiosError.response?.status === 404 ||
        axiosError.response?.status === 401 ||
        axiosError.response?.status === 403
      ) {
        if (axiosError.response?.data.errors) {
          setErrors(axiosError.response.data.errors);
        } else if (axiosError.response?.data.message) {
          setServerError(axiosError.response.data.message);
        }
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          Admin Login
        </h2>

        {serverError && (
          <p className="text-red-500 text-center text-sm mb-6">{serverError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Email
            </label>
            <input
              ref={emailInputRef}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              placeholder="you@example.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm pr-12"
                placeholder="********"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg text-lg transition shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Forgot your password?{" "}
          <a href="/forgot-password" className="text-indigo-600 hover:underline">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;