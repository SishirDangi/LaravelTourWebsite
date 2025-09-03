import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DestinationLayout from "./DestinationLayout";
import {
  FaClock,
  FaUsers,
  FaMountain,
  FaMapMarkerAlt,
  FaRegCalendarCheck,
  FaSearch,
} from "react-icons/fa";
import Footer from "./Footer";

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

interface Image {
  id: number;
  image_path: string;
  is_main: boolean;
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

const API_BASE = import.meta.env.VITE_API_URL;

export default function Destination() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<string>("");
  const cardsPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE}/tour-packages`)
      .then((res) => {
        const filteredPackages = res.data.data.filter(
          (pkg: TourPackage) => pkg.status?.id === 4
        );
        setPackages(filteredPackages);

        axios
          .get(`${API_BASE}/destinations`)
          .then((res) => {
            const allDestinations = res.data.data;
            const destinationsWithPackages = allDestinations.filter((dest: Destination) =>
              filteredPackages.some((pkg: TourPackage) => pkg.destination.id === dest.id)
            );
            const sortedDestinations = destinationsWithPackages.sort(
              (a: Destination, b: Destination) => a.name.localeCompare(b.name)
            );
            setDestinations([{ id: 0, name: "All" }, ...sortedDestinations]);
          })
          .catch((err) => {
            console.error("Error fetching destinations:", err);
          });
      })
      .catch((err) => {
        console.error("Error fetching tour packages:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPackages = packages
    .filter((pkg) =>
      selectedDestination ? pkg.destination.id === selectedDestination : true
    )
    .filter((pkg) =>
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "price-low-high") {
        const priceA = parseFloat(a.price as string) * (1 - (a.discount || 0) / 100);
        const priceB = parseFloat(b.price as string) * (1 - (b.discount || 0) / 100);
        return priceA - priceB;
      } else if (sortOption === "price-high-low") {
        const priceA = parseFloat(a.price as string) * (1 - (a.discount || 0) / 100);
        const priceB = parseFloat(b.price as string) * (1 - (b.discount || 0) / 100);
        return priceB - priceA;
      } else if (sortOption === "duration-short-long") {
        return a.duration_days - b.duration_days;
      } else if (sortOption === "name-a-z") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "name-z-a") {
        return b.name.localeCompare(a.name);
      } else if (sortOption === "latest-first") {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredPackages.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredPackages.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <DestinationLayout>
      <nav className="bg-gray-200 border-b border-gray-200 shadow-md w-full overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex flex-wrap justify-center gap-4 sm:gap-6">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => {
                const value = dest.id === 0 ? null : dest.id;
                setSelectedDestination(value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedDestination === dest.id || (dest.id === 0 && selectedDestination === null)
                  ? "bg-orange-500 text-white font-bold"
                  : "text-gray-800 hover:bg-orange-700 hover:text-white"
              }`}
            >
              {dest.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search tour packages..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-full border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          >
            <option value="">Sort By</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="duration-short-long">Duration: Short to Long</option>
            <option value="name-a-z">Name: A to Z</option>
            <option value="name-z-a">Name: Z to A</option>
            <option value="latest-first">Latest First</option>
          </select>
        </div>

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
        ) : filteredPackages.length === 0 ? (
          <p className="text-center text-gray-600 text-sm sm:text-base">
            No available packages for the selected destination or search query.
          </p>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {currentCards.map((pkg) => {
                const mainImage =
                  pkg.images.find((img) => img.is_main) || pkg.images[0];
                const currencySymbol = pkg.currency === "USD" ? "$" : "Rs.";
                const originalPrice = parseFloat(pkg.price as string);
                const discountedPrice = pkg.discount
                  ? originalPrice * (1 - pkg.discount / 100)
                  : originalPrice;

                return (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative group overflow-hidden">
                      {mainImage && (
                        <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                          <img
                            src={`${API_BASE.replace("/api", "")}/storage/${mainImage.image_path}`}
                            alt={pkg.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            style={{ transformOrigin: "center" }}
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
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">{pkg.name}</h3>
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-3">
                        <FaMapMarkerAlt className="mr-1 text-red-500" />
                        <span>{pkg.destination?.name}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(pkg.created_at)}</span>
                      </div>

                      {pkg.overview && (
                        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-3">{pkg.overview}</p>
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
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">Price:</span>
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

                      {pkg.card_highlights && pkg.card_highlights.length > 0 && (
                        <div className="mb-4">
                          <p className="font-medium text-xs sm:text-sm text-gray-800 mb-2">Highlights:</p>
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
                        </div>
                      )}

                      <div className="mt-auto flex flex-col sm:flex-row justify-center items-center gap-3">
                        <button
                          onClick={() => navigate(`/packages/${pkg.id}`)}
                          className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold overflow-hidden transition-all duration-300 hover:from-blue-700 hover:to-blue-900 group w-full sm:w-auto"
                        >
                          <span className="relative z-10">View Details</span>
                          <span className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                        </button>
                        <button
                          onClick={() => navigate(`/packages/${pkg.id}`, { state: { scrollToBooking: true } })}
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

            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  Previous
                </button>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow-md scale-110"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
            
          </>
        )}
      </div>
      <Footer />
    </DestinationLayout>
  );
}