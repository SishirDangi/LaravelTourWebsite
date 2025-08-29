import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// Define interfaces for TypeScript
interface User {
  fullname: string;
  gender: string;
  phone_number: string;
  email: string;
  updated_at: string;
}

interface FormData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

interface Errors {
  current_password?: string[];
  new_password?: string[];
  new_password_confirmation?: string[];
}

interface ShowPasswords {
  current_password: boolean;
  new_password: boolean;
  new_password_confirmation: boolean;
}

interface ApiResponse {
  message: string;
  errors?: Errors;
}

const Loader: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-[#661F1F] rounded-full animate-spin"></div>
  </div>
);

const AdminProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [profileError, setProfileError] = useState<string>('');

  const [form, setForm] = useState<FormData>({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loadingChange, setLoadingChange] = useState<boolean>(false);
  const [showPasswords, setShowPasswords] = useState<ShowPasswords>({
    current_password: false,
    new_password: false,
    new_password_confirmation: false,
  });
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setProfileError('Not authenticated. Please login again.');
        setLoadingProfile(false);
        return;
      }

      try {
        const res = await axios.get<User>(`${import.meta.env.VITE_API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setLastUpdated(res.data.updated_at);
      } catch (err) {
        setProfileError('Failed to load user profile.');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field: keyof ShowPasswords) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  // Handle password change submit
  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setLoadingChange(true);

    const token = sessionStorage.getItem('token');

    try {
      const res = await axios.post<ApiResponse>(
        `${import.meta.env.VITE_API_URL}/user/change-password`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message, { position: 'top-right', autoClose: 3000 });
      setLastUpdated(new Date().toISOString());
      setForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });
    } catch (err: unknown) {
      const message = (err as any).response?.data?.message || 'Failed to change password.';
      const details = (err as any).response?.data?.errors || {};
      setErrors(details);
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setLoadingChange(false);
    }
  };

  if (loadingProfile) {
    return <Loader />;
  }

  if (profileError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">{profileError}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-lg p-8 space-y-8">
        {/* Profile Info */}
        <div>
          <h2 className="text-3xl font-semibold font-['Winky_Rough',sans-serif] text-[#661F1F] mb-6">Admin Profile</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center">
              <strong className="w-1/3">Full Name:</strong>
              <span>{user?.fullname}</span>
            </div>
            <div className="flex items-center">
              <strong className="w-1/3">Gender:</strong>
              <span>{user?.gender}</span>
            </div>
            <div className="flex items-center">
              <strong className="w-1/3">Phone Number:</strong>
              <span>{user?.phone_number}</span>
            </div>
            <div className="flex items-center">
              <strong className="w-1/3">Email:</strong>
              <span>{user?.email}</span>
            </div>
            {lastUpdated && (
              <div className="flex items-center">
                <strong className="w-1/3">Password Last Updated:</strong>
                <span>{new Date(lastUpdated).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Change Password */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type={showPasswords.current_password ? 'text' : 'password'}
                name="current_password"
                value={form.current_password}
                onChange={handleChange}
                required
                className={`w-full border ${errors.current_password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#661F1F] focus:border-[#661F1F] transition duration-200`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current_password')}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.current_password ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
              {errors.current_password && (
                <p className="text-red-500 text-sm mt-1">{errors.current_password.join(' ')}</p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type={showPasswords.new_password ? 'text' : 'password'}
                name="new_password"
                value={form.new_password}
                onChange={handleChange}
                required
                className={`w-full border ${errors.new_password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#661F1F] focus:border-[#661F1F] transition duration-200`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new_password')}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.new_password ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
              {errors.new_password && (
                <p className="text-red-500 text-sm mt-1">{errors.new_password.join(' ')}</p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type={showPasswords.new_password_confirmation ? 'text' : 'password'}
                name="new_password_confirmation"
                value={form.new_password_confirmation}
                onChange={handleChange}
                required
                className={`w-full border ${errors.new_password_confirmation ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#661F1F] focus:border-[#661F1F] transition duration-200`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new_password_confirmation')}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.new_password_confirmation ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
              {errors.new_password_confirmation && (
                <p className="text-red-500 text-sm mt-1">{errors.new_password_confirmation.join(' ')}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#661F1F] text-white py-2 rounded-lg hover:bg-[#4a1414] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loadingChange}
            >
              {loadingChange ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Changing...
                </span>
              ) : (
                'Change Password'
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminProfile;