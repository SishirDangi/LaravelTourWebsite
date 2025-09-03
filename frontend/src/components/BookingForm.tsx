import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle } from 'lucide-react';
import axios from 'axios';

interface ContactForm {
  full_name: string;
  email: string;
  phone_number?: string;
  tour_package_id: string;
  no_of_persons?: string;
  message?: string;
}

const trekOptions = [
  { id: '1', name: 'Everest Base Camp Trek' },
  { id: '2', name: 'Annapurna Circuit Trek' },
  { id: '3', name: 'Langtang Valley Trek' },
  { id: '4', name: 'Manaslu Circuit Trek' },
  { id: '5', name: 'Gokyo Lakes Trek' },
  { id: '6', name: 'Annapurna Base Camp' },
  { id: '7', name: 'Custom Trek' },
  { id: '8', name: 'Other' },
];

const BookingForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await axios.post('/api/book-tours', data);
      console.log('Form submitted:', response.data);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrorMessage(
        error.response?.data?.message || 'An error occurred while submitting the form.'
      );
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-orange-50 p-8 rounded-xl shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-3xl font-bold text-[#1E293B] mb-6 text-center">
        Book Your Trek
      </h2>
      <p className="text-[#334155] mb-8 text-center">
        Fill out the form below and our team will get back to you within 24 hours with a customized itinerary.
      </p>

      {isSubmitted ? (
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="h-16 w-16 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-orange-600 mb-2">
            Booking Request Sent!
          </h3>
          <p className="text-[#475569]">
            Thank you for your inquiry. We'll get back to you soon!
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Full Name *
              </label>
              <input
                {...register('full_name', { required: 'Name is required' })}
                className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent text-[#1E293B]"
                placeholder="Your full name"
              />
              {errors.full_name && (
                <p className="text-red-600 text-sm mt-1">{errors.full_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Email Address *
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent text-[#1E293B]"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Phone Number
              </label>
              <input
                {...register('phone_number')}
                type="tel"
                className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent text-[#1E293B]"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Preferred Trek *
              </label>
              <select
                {...register('tour_package_id', { required: 'Please select a trek' })}
                className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent text-[#1E293B]"
              >
                <option value="">Select a trek</option>
                {trekOptions.map(trek => (
                  <option key={trek.id} value={trek.id}>
                    {trek.name}
                  </option>
                ))}
              </select>
              {errors.tour_package_id && (
                <p className="text-red-600 text-sm mt-1">{errors.tour_package_id.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">
              Number of Participants
            </label>
            <select
              {...register('no_of_persons')}
              className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent text-[#1E293B]"
            >
              <option value="">Select group size</option>
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3-5">3-5 people</option>
              <option value="6-10">6-10 people</option>
              <option value="10+">10+ people</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">
              Additional Message
            </label>
            <textarea
              {...register('message')}
              rows={4}
              className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent text-[#1E293B]"
              placeholder="Tell us about your experience level, special requirements, or any questions you have..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 transition-colors duration-200 text-white py-4 rounded-lg font-semibold flex items-center justify-center group"
          >
            Send Inquiry
            <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default BookingForm;