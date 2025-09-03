import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle } from 'lucide-react';
import axios from 'axios';

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true); // Disable button during submission
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact-messages`, { ...data, status_id: 1 }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        setIsSubmitted(true);
        reset();
        setErrorMessage(null);
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error: any) {
      console.error('Full error response:', error.response?.data); // Log for debugging
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        setErrorMessage(Object.values(errors).flat().join(' '));
      } else {
        setErrorMessage(error.response?.data?.message || 'An error occurred on the server. Please try again later.');
      }
    } finally {
      setIsSubmitting(false); // Re-enable button after submission completes
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
        Contact Us
      </h2>
      <p className="text-[#334155] mb-8 text-center">
        Fill out the form below and our team will get back to you within 24 hours.
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
            Message Sent!
          </h3>
          <p className="text-[#475569]">
            Thank you for your inquiry. We'll get back to you soon!
          </p>
        </motion.div>
      ) : (
        <div>
          {errorMessage && (
            <p className="text-red-600 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Full Name *
              </label>
              <input
                {...register('name', {
                  required: 'Please enter your name.',
                  maxLength: {
                    value: 255,
                    message: 'Name cannot exceed 255 characters.',
                  },
                })}
                className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent text-[#1E293B]"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Email Address *
              </label>
              <input
                {...register('email', {
                  required: 'Please enter your email address.',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email address.',
                  },
                  maxLength: {
                    value: 255,
                    message: 'Email cannot exceed 255 characters.',
                  },
                })}
                type="email"
                className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent text-[#1E293B]"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Phone Number
              </label>
              <input
                {...register('phone', {
                  pattern: {
                    value: /^\d{7,20}$/,
                    message: 'Please enter a valid phone number.',
                  },
                })}
                type="tel"
                className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent text-[#1E293B]"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Message *
              </label>
              <textarea
                {...register('message', {
                  required: 'Please enter your message.',
                  maxLength: {
                    value: 2000,
                    message: 'Message cannot exceed 2000 characters.',
                  },
                  validate: {
                    wordCount: (value) =>
                      str_word_count(value) <= 300 || 'Message may not be greater than 300 words.',
                  },
                })}
                rows={4}
                className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent text-[#1E293B]"
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-orange-500 hover:bg-orange-700 transition-colors duration-200 text-white py-4 rounded-lg font-semibold flex items-center justify-center group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Send Message
              <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
};

// Helper function to count words (approximating PHP's str_word_count)
const str_word_count = (str: string): number => {
  return str.trim().split(/\s+/).length;
};

export default ContactForm;