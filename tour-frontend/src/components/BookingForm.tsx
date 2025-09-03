import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TourPackage {
  id: number;
  name: string;
  max_people: number;
}

interface FormData {
  full_name: string;
  email: string;
  phone_number: string;
  no_of_persons: number;
  tour_date: string;
  tour_package_id: number;
}

interface ErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

interface BookingFormProps {
  scrollToBooking?: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ scrollToBooking }) => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone_number: '',
    no_of_persons: 1,
    tour_date: '',
    tour_package_id: 0,
  });
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionError, setSubmissionError] = useState<string>('');
  const [submissionSuccess, setSubmissionSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  const getTomorrowDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/tour-packages`);
        console.log('API Response:', response.data);
        if (response.data.success && Array.isArray(response.data.data)) {
          setTourPackages(response.data.data);
          const packageId = id ? parseInt(id) : response.data.data[0]?.id || 0;
          if (packageId && response.data.data.some((pkg: TourPackage) => pkg.id === packageId)) {
            setFormData((prev) => ({ ...prev, tour_package_id: packageId }));
          } else if (response.data.data.length > 0) {
            setFormData((prev) => ({ ...prev, tour_package_id: response.data.data[0].id }));
          } else {
            setSubmissionError('No tour packages available');
          }
        } else {
          setSubmissionError(response.data.message || 'Failed to load tour packages');
        }
      } catch (error) {
        console.error('Error fetching tour packages:', error);
        setSubmissionError('Failed to load tour packages. Please try again later.');
      }
    };

    fetchData();
  }, [API_URL, id]);

  useEffect(() => {
    if (scrollToBooking && fullNameInputRef.current) {
      fullNameInputRef.current.focus();
    }
  }, [scrollToBooking]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'no_of_persons' || name === 'tour_package_id' ? parseInt(value) || 0 : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmissionError('');
    setSubmissionSuccess('');
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const tomorrow = getTomorrowDate();

    if (!formData.full_name.match(/^[\p{L}\s]+$/u)) {
      newErrors.full_name = 'Full name must contain only letters and spaces';
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone_number.match(/^[\+]?[0-9\s\-]+$/)) {
      newErrors.phone_number = 'Phone number must contain only numbers, spaces, hyphens, or a leading plus sign';
    }
    if (formData.no_of_persons < 1) {
      newErrors.no_of_persons = 'Number of persons must be at least 1';
    }
    const selectedPackage = tourPackages.find((pkg) => pkg.id === formData.tour_package_id);
    if (selectedPackage && formData.no_of_persons > selectedPackage.max_people) {
      newErrors.no_of_persons = `Number of persons cannot exceed ${selectedPackage.max_people} for this tour package`;
    }
    if (!formData.tour_date) {
      newErrors.tour_date = 'Tour date is required';
    } else if (formData.tour_date < tomorrow) {
      newErrors.tour_date = 'Tour date must be tomorrow or a future date';
    }
    if (formData.tour_package_id === 0) {
      newErrors.tour_package_id = 'Please select a tour package';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError('');
    setSubmissionSuccess('');
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/book-tours`, formData);
      if (response.data.success) {
        setSubmissionSuccess(response.data.message || 'Tour booking created successfully');
        setFormData({
          full_name: '',
          email: '',
          phone_number: '',
          no_of_persons: 1,
          tour_date: '',
          tour_package_id: tourPackages[0]?.id || 0,
        });
        setErrors({});
        setTimeout(() => setSubmissionSuccess(''), 5000);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const result: ErrorResponse = error.response?.data || { success: false, message: 'Server error occurred' };
      if (result.errors) {
        const flattenedErrors: Record<string, string> = {};
        for (const key in result.errors) {
          flattenedErrors[key] = result.errors[key][0];
        }
        setErrors(flattenedErrors);
      }
      setSubmissionError(result.message || 'Failed to create booking');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPackageName = tourPackages.find((pkg) => pkg.id === formData.tour_package_id)?.name || 'No package selected';

  return (
    <div id="booking-form" className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Book a Tour</h2>
      {submissionError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{submissionError}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            ref={fullNameInputRef}
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.full_name ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your full name"
            required
          />
          {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your email"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.phone_number ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your phone number"
            required
          />
          {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Persons *</label>
          <input
            type="number"
            name="no_of_persons"
            value={formData.no_of_persons}
            onChange={handleChange}
            min="1"
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.no_of_persons ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            required
          />
          {errors.no_of_persons && <p className="text-red-500 text-sm mt-1">{errors.no_of_persons}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tour Date *</label>
          <input
            type="date"
            name="tour_date"
            value={formData.tour_date}
            onChange={handleChange}
            min={getTomorrowDate()}
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.tour_date ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            required
          />
          {errors.tour_date && <p className="text-red-500 text-sm mt-1">{errors.tour_date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tour Package *</label>
          <p className="mt-1 text-lg font-semibold text-gray-900">{selectedPackageName}</p>
          <select
            name="tour_package_id"
            value={formData.tour_package_id}
            onChange={handleChange}
            className={`mt-2 block w-full p-2 border rounded-md ${
              errors.tour_package_id ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            required
          >
            <option value={0} disabled>Select a tour package</option>
            {tourPackages.length > 0 ? (
              tourPackages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </option>
              ))
            ) : (
              <option value={0} disabled>No tour packages available</option>
            )}
          </select>
          {errors.tour_package_id && <p className="text-red-500 text-sm mt-1">{errors.tour_package_id}</p>}
        </div>
        <button
          type="submit"
          disabled={isLoading || tourPackages.length === 0}
          className={`w-full p-2 rounded-md text-white font-semibold ${
            isLoading || tourPackages.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Book Tour'}
        </button>
        {submissionSuccess && (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-[#475569]">
              Thank you for your booking. We'll get back to you soon!
            </p>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;