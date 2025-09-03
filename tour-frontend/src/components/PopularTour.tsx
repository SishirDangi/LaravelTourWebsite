import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PopularTourLayout from './PopularTourLayout';
import {
  FaClock,
  FaUsers,
  FaMountain,
  FaMapMarkerAlt,
  FaRegCalendarCheck,
} from 'react-icons/fa';
import Footer from './Footer';

interface Image {
  id: number;
  image_path: string;
  is_main: boolean;
}

interface Destination {
  id: number;
  name: string;
}

interface TourType {
  id: number;
  name: string;
}

interface Level {
  id: number;
  name: string;
}

interface Status {
  id: number;
  name: string;
}

interface TourPackage {
  id: number;
  name: string;
  price: number | string;
  discount: number | null;
  currency: string;
  duration_days: number;
  height_meters: number | null;
  min_people: number;
  max_people: number;
  location: string | null;
  overview: string | null;
  destination: Destination;
  tourType: TourType;
  level: Level;
  status: Status;
  images: Image[];
  card_highlights?: string[];
  created_at?: string;
}

interface PopularTour {
  id: number;
  tour_package_id: number;
  booking_count: number;
  tour_package: TourPackage;
}

interface ApiResponse {
  success: boolean;
  data: PopularTour[];
  message: string;
}

const API_BASE = import.meta.env.VITE_API_URL;

const PopularTour: React.FC = () => {
  const [tours, setTours] = useState<PopularTour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularTours = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${API_BASE}/popular-tours`);
        if (response.data.success) {
          const filteredTours = response.data.data
            .filter((tour) => tour.tour_package.status?.id === 4)
            .sort((a, b) => b.booking_count - a.booking_count) 
            .slice(0, 9); 
          setTours(filteredTours);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch popular tours');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTours();
  }, []);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <PopularTourLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Popular Tours</h1>

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px] w-full">
            <svg
              className="animate-spin h-16 w-16 text-orange-500"
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
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
              ></path>
            </svg>
          </div>
        ) : error ? (
          <p className="text-center text-gray-600 text-sm sm:text-base">
            {error}
          </p>
        ) : tours.length === 0 ? (
          <p className="text-center text-gray-600 text-sm sm:text-base">
            No popular tours available at the moment.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => {
              const pkg = tour.tour_package;
              const mainImage = pkg.images.find((img) => img.is_main) || pkg.images[0];
              const currencySymbol = pkg.currency === 'USD' ? '$' : 'Rs.';
              const originalPrice = parseFloat(pkg.price as string);
              const discountedPrice = pkg.discount
                ? originalPrice * (1 - pkg.discount / 100)
                : originalPrice;

              return (
                <div
                  key={tour.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative group overflow-hidden">
                    {mainImage && (
                      <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                        <img
                          src={`${API_BASE.replace('/api', '')}/storage/${mainImage.image_path}`}
                          alt={pkg.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          style={{ transformOrigin: 'center' }}
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                    {pkg.discount && (
                      <span className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold">
                        {`${Math.round(pkg.discount)}% off`}
                      </span>
                    )}

                    {pkg.level && (
                      <span className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-blue-100 text-blue-800 font-medium px-2 sm:px-3 py-1 rounded-full text-xs">
                        {pkg.level.name}
                      </span>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-3">
                      <FaMapMarkerAlt className="mr-1 text-red-500" />
                      <span>{pkg.destination?.name}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(pkg.created_at)}</span>
                    </div>

                    {pkg.overview && (
                      <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-3">
                        {pkg.overview}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 text-xs sm:text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-blue-500" />
                        {pkg.duration_days} Days
                      </div>
                      {pkg.height_meters && (
                        <div className="flex items-center gap-2">
                          <FaMountain className="text-green-500" />
                          {pkg.height_meters} m
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-purple-500" />
                        {pkg.min_people}–{pkg.max_people} People
                      </div>
                      {pkg.location && (
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-red-500" />
                          {pkg.location}
                        </div>
                      )}
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                      <span className="font-semibold text-gray-800 text-sm sm:text-base">
                        Price:
                      </span>
                      {pkg.discount ? (
                        <>
                          <span className="text-red-500 line-through text-xs sm:text-sm">
                            {currencySymbol}{originalPrice.toFixed(2)}
                          </span>
                          <span className="text-green-600 font-bold text-base sm:text-lg">
                            {currencySymbol}{discountedPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-900 font-bold text-base sm:text-lg">
                          {currencySymbol}{originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      {pkg.card_highlights && pkg.card_highlights.length > 0 && (
                        <>
                          <p className="font-medium text-xs sm:text-sm text-gray-800 mb-2">
                            Highlights:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {pkg.card_highlights.slice(0, 3).map((highlight, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {highlight}
                              </span>
                            ))}
                            {pkg.card_highlights.length > 3 && (
                              <span className="text-xs text-gray-500 self-center">
                                +{pkg.card_highlights.length - 3} MORE
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row justify-center items-center gap-3">
                      <button
                        onClick={() => navigate(`/packages/${pkg.id}`)}
                        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold overflow-hidden transition-all duration-300 hover:from-blue-700 hover:to-blue-900 group w-full sm:w-auto"
                      >
                        <span className="relative z-10">View Details</span>
                        <span className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/packages/${pkg.id}`, { state: { scrollToBooking: true } })
                        }
                        className="relative bg-gradient-to-r from-orange-500 to-orange-700 text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold overflow-hidden transition-all duration-300 hover:from-orange-600 hover:to-orange-800 group flex items-center justify-center gap-2 w-full sm:w-auto"
                      >
                        <FaRegCalendarCheck className="relative z-10 text-sm sm:text-base" />
                        <span className="relative z-10">Book Now</span>
                        <span className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </PopularTourLayout>
  );
};

export default PopularTour;