import { type FC, useState, useRef, useEffect } from "react";
import {
  XIcon,
  MailIcon,
  UserIcon,
  MessageCircleIcon,
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  SendIcon,
  CheckCircleIcon,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const TopBar: FC = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const openEnquiryModal = () => {
    setIsEnquiryOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeEnquiryModal = () => {
    setIsEnquiryOpen(false);
    document.body.style.overflow = 'unset'; // Restore scroll
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEnquiryOpen) {
        closeEnquiryModal();
      }
    };
    if (isEnquiryOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isEnquiryOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Social Media Icons - Left */}
          <div className="flex items-center space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 rounded-full bg-gray-800 hover:bg-yellow-500/20 transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <FacebookIcon size={18} className="group-hover:text-yellow-400 transition-colors duration-300" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 rounded-full bg-gray-800 hover:bg-yellow-500/20 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} className="group-hover:text-yellow-400 transition-colors duration-300" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 rounded-full bg-gray-800 hover:bg-yellow-500/20 transition-all duration-300 hover:scale-110"
              aria-label="TikTok"
            >
              <FaTiktok size={18} className="group-hover:text-yellow-400 transition-colors duration-300" />
            </a>
          </div>

          {/* Contact Info - Center */}
          <div className="hidden md:flex items-center space-x-6 mx-auto">
            <a
              href="tel:+97714123456"
              className="group flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-all duration-300"
            >
              <PhoneIcon size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>+977-1-4123456</span>
            </a>
            <a
              href="mailto:info@himalayatrekking.com"
              className="group flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-all duration-300"
            >
              <MailIcon size={16} className="group-hover:scale-110 transition-transform duration-300" />
              <span>info@himalayatrekking.com</span>
            </a>
          </div>

          {/* Enhanced Enquiry Button - Right */}
          <div className="flex items-center">
            <button
              onClick={openEnquiryModal}
              className="group relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <SendIcon size={16} />
                <span>Enquiry Now</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Contact Info - Shows on small screens */}
      <div className="md:hidden bg-gray-800 text-white py-2 px-4">
        <div className="container mx-auto flex flex-col items-center space-y-1">
          <a
            href="tel:+97714123456"
            className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
          >
            +977-1-4123456
          </a>
          <a
            href="mailto:info@himalayatrekking.com"
            className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
          >
            info@himalayatrekking.com
          </a>
        </div>
      </div>

      {/* Compact Top-Right Modal */}
      {isEnquiryOpen && (
        <EnquiryModal onClose={closeEnquiryModal} />
      )}
    </>
  );
};

// Compact Top-Right Enquiry Modal component with Standard Widths
interface EnquiryModalProps {
  onClose: () => void;
}

const EnquiryModal: FC<EnquiryModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFieldErrors(prev => ({ ...prev, [name]: [] }));
    if (generalError) setGeneralError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setGeneralError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Form submitted:', data);
        setIsSubmitted(true);
        // Reset form on success
        setFormData({ name: '', email: '', phone: '', message: '' });
        // Close modal after 7 seconds on success
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFieldErrors({});
          setGeneralError(null);
        }, 7000);
      } else {
        // Handle validation or other client errors
        if (response.status === 422) {
          setFieldErrors(data.errors || {});
          setGeneralError(null);
        } else {
          setGeneralError(data.message || 'Failed to submit enquiry. Please try again.');
          setFieldErrors({});
        }
      }
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setGeneralError('Network error. Please check your connection and try again.');
      setFieldErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <>
      {/* Subtle Background overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Compact Top-Right Modal Container with Standard Widths */}
      <div 
        ref={modalRef}
        className="fixed top-4 right-4 z-50 w-[90vw] max-w-sm animate-in slide-in-from-right-4 duration-300 md:w-auto md:max-w-md lg:max-w-lg xl:max-w-xl"
        onClick={handleBackdropClick}
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        {/* Modal Content with fixed height */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl border border-gray-200 w-full max-h-[600px] md:max-h-[700px] flex flex-col">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 text-white p-4 sm:p-5 flex-shrink-0">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <SendIcon size={20} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                    Get in Touch
                  </h2>
                  <p className="text-yellow-100 text-sm font-medium">
                    Ready for your adventure?
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="group p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
                aria-label="Close modal"
              >
                <XIcon size={20} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-4 sm:p-5 space-y-5 max-h-[calc(600px-120px)] md:max-h-[calc(700px-140px)]">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
                <CheckCircleIcon className="h-16 w-16 text-green-500 animate-pulse" />
                <h3 className="text-xl font-semibold text-gray-900">Thank You!</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your enquiry has been successfully submitted. We'll get back to you within 24 hours!
                </p>
              </div>
            ) : (
              <>
                {/* Description */}
                <div className="text-center pb-2">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Have questions or ready to plan your next adventure? 
                    Fill out the form below and we'll get back to you within 24 hours!
                  </p>
                </div>

                {/* General Error Message */}
                {generalError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-red-600 text-sm">{generalError}</p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-200" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="block w-full pl-10 pr-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500 peer disabled:opacity-50"
                        placeholder="Your full name"
                      />
                      <label 
                        htmlFor="name" 
                        className="absolute -top-2 left-3 px-2 text-xs text-gray-500 bg-white rounded-md transition-all duration-200 group-focus-within:text-yellow-600 peer-filled:text-yellow-600"
                      >
                        Full Name *
                      </label>
                    </div>
                    {fieldErrors.name && fieldErrors.name.length > 0 && (
                      <div className="pl-10 text-red-600 text-xs">
                        {fieldErrors.name.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-200" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="block w-full pl-10 pr-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500 peer disabled:opacity-50"
                        placeholder="your.email@example.com"
                      />
                      <label 
                        htmlFor="email" 
                        className="absolute -top-2 left-3 px-2 text-xs text-gray-500 bg-white rounded-md transition-all duration-200 group-focus-within:text-yellow-600 peer-filled:text-yellow-600"
                      >
                        Email Address *
                      </label>
                    </div>
                    {fieldErrors.email && fieldErrors.email.length > 0 && (
                      <div className="pl-10 text-red-600 text-xs">
                        {fieldErrors.email.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-1">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-200" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="block w-full pl-10 pr-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500 peer disabled:opacity-50"
                        placeholder="Your phone number (optional)"
                      />
                      <label 
                        htmlFor="phone" 
                        className="absolute -top-2 left-3 px-2 text-xs text-gray-500 bg-white rounded-md transition-all duration-200 group-focus-within:text-yellow-600 peer-filled:text-yellow-600"
                      >
                        Phone Number
                      </label>
                    </div>
                    {fieldErrors.phone && fieldErrors.phone.length > 0 && (
                      <div className="pl-10 text-red-600 text-xs">
                        {fieldErrors.phone.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1">
                    <div className="relative group">
                      <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                        <MessageCircleIcon className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-200" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        disabled={isSubmitting}
                        className="block w-full pl-10 pr-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none placeholder:text-gray-500 peer disabled:opacity-50"
                        placeholder="Tell us about your adventure plans..."
                      ></textarea>
                      <label 
                        htmlFor="message" 
                        className="absolute -top-2 left-3 px-2 text-xs text-gray-500 bg-white rounded-md transition-all duration-200 group-focus-within:text-yellow-600 peer-filled:text-yellow-600"
                      >
                        Your Message *
                      </label>
                    </div>
                    {fieldErrors.message && fieldErrors.message.length > 0 && (
                      <div className="pl-10 text-red-600 text-xs">
                        {fieldErrors.message.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full py-3 px-6 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-white overflow-hidden ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                        : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <SendIcon size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                          <span>Send Your Enquiry</span>
                        </>
                      )}
                    </span>
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;