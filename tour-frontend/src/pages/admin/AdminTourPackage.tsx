import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { useDropzone } from "react-dropzone";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

// Define interfaces for the data structures
interface Image {
  id: number;
  image_path: string;
  is_main: boolean;
}

interface MapImage {
  id: number;
  map_image_path: string;
  is_main: boolean;
}

interface Option {
  id: number;
  name: string;
}

interface ItineraryItem {
  day: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface TourPackage {
  id: number;
  name: string;
  destination?: Option;
  tour_type?: Option;
  level?: Option;
  subcategory?: string;
  price?: number;
  discount?: number;
  currency?: string;
  duration_days?: number;
  height_meters?: number;
  location?: string;
  min_people?: number;
  max_people?: number;
  overview?: string;
  card_highlights?: string[];
  detailed_highlights?: string[];
  itinerary?: ItineraryItem[];
  includes?: string[];
  excludes?: string[];
  faqs?: FaqItem[];
  status_id?: number;
  status?: Option;
  images?: Image[];
  map_images?: MapImage[];
  destination_id?: number;
  tour_type_id?: number;
  level_id?: number;
}

interface SelectedTourPackage extends TourPackage {
  displayIndex: number;
}

interface FormState {
  name: string;
  destination_id: string;
  tour_type_id: string;
  level_id: string;
  subcategory: string;
  price: string;
  discount: string;
  currency: string;
  duration_days: string;
  height_meters: string;
  location: string;
  min_people: string;
  max_people: string;
  overview: string;
  card_highlights: string[];
  detailed_highlights: string[];
  itinerary: ItineraryItem[];
  includes: string[];
  excludes: string[];
  faqs: FaqItem[];
  status_id: number | null;
}

interface Errors {
  [key: string]: string | undefined;
}

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL as string;
const MAX_FILE_SIZE_KB = 512;

const Loader: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
  </div>
);

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 backdrop-blur-[2px] bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={onCancel}>
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl border border-gray-200"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-lg mb-6 text-center font-medium text-gray-800">{message}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition shadow"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow"
        >
          Delete
        </button>
      </div>
    </motion.div>
  </div>
);

interface TourPackageDetailModalProps {
  tourPackage: SelectedTourPackage;
  onClose: () => void;
}

const TourPackageDetailModal: React.FC<TourPackageDetailModalProps> = ({ tourPackage, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentMapImageIndex, setCurrentMapImageIndex] = useState<number>(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (tourPackage.images?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (tourPackage.images?.length || 0) - 1 : prev - 1
    );
  };

  const nextMapImage = () => {
    setCurrentMapImageIndex((prev) =>
      prev === (tourPackage.map_images?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevMapImage = () => {
    setCurrentMapImageIndex((prev) =>
      prev === 0 ? (tourPackage.map_images?.length || 0) - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-black bg-opacity-40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
          >
            <FaTimes className="text-gray-800 text-xl" />
          </button>
          <div className="p-8 overflow-y-auto max-h-[90vh] bg-gradient-to-b from-gray-50 to-white">
            <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden mb-6">
              {tourPackage.images && tourPackage.images.length > 0 ? (
                <>
                  <img
                    src={`${API_BASE_URL.replace("/api", "")}/storage/${
                      tourPackage.images[currentImageIndex].image_path
                    }`}
                    alt={tourPackage.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-image.jpg";
                      e.currentTarget.alt = "Image not available";
                    }}
                  />
                  {tourPackage.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                      >
                        <FaArrowLeft className="text-gray-800" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                      >
                        <FaArrowRight className="text-gray-800" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {tourPackage.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          currentImageIndex === index ? "bg-orange-500" : "bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                  No Image Available
                </div>
              )}
            </div>
            <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden mb-6">
              {tourPackage.map_images && tourPackage.map_images.length > 0 ? (
                <>
                  <img
                    src={`${API_BASE_URL.replace("/api", "")}/storage/${
                      tourPackage.map_images[currentMapImageIndex].map_image_path
                    }`}
                    alt={`${tourPackage.name} Map`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-image.jpg";
                      e.currentTarget.alt = "Map Image not available";
                    }}
                  />
                  {tourPackage.map_images.length > 1 && (
                    <>
                      <button
                        onClick={prevMapImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                      >
                        <FaArrowLeft className="text-gray-800" />
                      </button>
                      <button
                        onClick={nextMapImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                      >
                        <FaArrowRight className="text-gray-800" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {tourPackage.map_images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMapImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          currentMapImageIndex === index ? "bg-orange-500" : "bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                  No Map Image Available
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">{tourPackage.name || "Unnamed Tour Package"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Destination</h3>
                <p className="text-xl text-gray-800 whitespace-normal break-words max-w-[90%]">
                  {tourPackage.destination?.name ?? "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Type</h3>
                <p className="text-xl text-gray-800">{tourPackage.tour_type?.name ?? "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Subcategory</h3>
                <p className="text-xl text-gray-800">{tourPackage.subcategory ?? "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Level</h3>
                <p className="text-xl text-gray-800">{tourPackage.level?.name ?? "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Price</h3>
                <p className="text-xl text-gray-800">
                  {tourPackage.currency} {tourPackage.price?.toLocaleString() ?? "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Discount</h3>
                <p className="text-xl text-gray-800">{tourPackage.discount ? `${tourPackage.discount}%` : "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Duration</h3>
                <p className="text-xl text-gray-800">{tourPackage.duration_days ?? "N/A"} days</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Height</h3>
                <p className="text-xl text-gray-800">{tourPackage.height_meters ?? "N/A"} meters</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Location</h3>
                <p className="text-xl text-gray-800">{tourPackage.location ?? "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">People</h3>
                <p className="text-xl text-gray-800">
                  {tourPackage.min_people}–{tourPackage.max_people ?? "N/A"} people
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Status</h3>
                <div className="flex items-center">
                  <p className="text-xl text-gray-800">{tourPackage.status?.name ?? "N/A"}</p>
                  {tourPackage.status_id === 4 ? (
                    <FaCheckCircle className="text-green-500 ml-2" />
                  ) : (
                    <FaClock className="text-yellow-500 ml-2" />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-4 text-2xl">Overview</h3>
              <p className="text-gray-700 whitespace-pre-line text-justify leading-relaxed">
                {tourPackage.overview ?? "No overview available"}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-4 text-2xl">Card Highlights</h3>
              {tourPackage.card_highlights && tourPackage.card_highlights.length > 0 ? (
                <ul className="list-disc pl-5 text-gray-700">
                  {tourPackage.card_highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No highlights available</p>
              )}
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-4 text-2xl">Detailed Highlights</h3>
              {tourPackage.detailed_highlights && tourPackage.detailed_highlights.length > 0 ? (
                <ul className="list-disc pl-5 text-gray-700">
                  {tourPackage.detailed_highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No detailed highlights available</p>
              )}
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-4 text-2xl">Itinerary</h3>
              {tourPackage.itinerary && tourPackage.itinerary.length > 0 ? (
                <ul className="list-disc pl-5 text-gray-700">
                  {tourPackage.itinerary.map((item, index) => (
                    <li key={index}>
                      <strong>{item.day}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No itinerary available</p>
              )}
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-4 text-2xl">Includes</h3>
              {tourPackage.includes && tourPackage.includes.length > 0 ? (
                <ul className="list-disc pl-5 text-gray-700">
                  {tourPackage.includes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No includes available</p>
              )}
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-4 text-2xl">Excludes</h3>
              {tourPackage.excludes && tourPackage.excludes.length > 0 ? (
                <ul className="list-disc pl-5 text-gray-700">
                  {tourPackage.excludes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No excludes available</p>
              )}
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-4 text-2xl">FAQs</h3>
              {tourPackage.faqs && tourPackage.faqs.length > 0 ? (
                <div>
                  {tourPackage.faqs.map((faq, index) => (
                    <div key={index} className="mb-4">
                      <strong>Q: {faq.question}</strong>
                      <p>A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">No FAQs available</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AdminTourPackage: React.FC = () => {
  const [existingImages, setExistingImages] = useState<Image[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [existingMapImages, setExistingMapImages] = useState<MapImage[]>([]);
  const [deletedMapImageIds, setDeletedMapImageIds] = useState<number[]>([]);
  const [newDestination, setNewDestination] = useState<string>("");
  const [newTourType, setNewTourType] = useState<string>("");
  const [newLevel, setNewLevel] = useState<string>("");
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [destinations, setDestinations] = useState<Option[]>([]);
  const [tourTypes, setTourTypes] = useState<Option[]>([]);
  const [levels, setLevels] = useState<Option[]>([]);
  const [statuses, setStatuses] = useState<Option[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [form, setForm] = useState<FormState>({
    name: "",
    destination_id: "",
    tour_type_id: "",
    level_id: "",
    subcategory: "",
    price: "",
    discount: "",
    currency: "USD",
    duration_days: "",
    height_meters: "",
    location: "",
    min_people: "",
    max_people: "",
    overview: "",
    card_highlights: [],
    detailed_highlights: [],
    itinerary: [],
    includes: [],
    excludes: [],
    faqs: [],
    status_id: null,
  });
  const [images, setImages] = useState<File[]>([]);
  const [mapImages, setMapImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [fileError, setFileError] = useState<string>("");
  const [mapFileError, setMapFileError] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteDestinationId, setDeleteDestinationId] = useState<number | null>(null);
  const [selectedTourPackage, setSelectedTourPackage] = useState<SelectedTourPackage | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tourPackagesPerPage] = useState<number>(12);

  // Temp states for adding new items
  const [newCardHighlight, setNewCardHighlight] = useState("");
  const [newDetailedHighlight, setNewDetailedHighlight] = useState("");
  const [newItineraryDay, setNewItineraryDay] = useState("");
  const [newItineraryDesc, setNewItineraryDesc] = useState("");
  const [newInclude, setNewInclude] = useState("");
  const [newExclude, setNewExclude] = useState("");
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");

  const fetchTourPackages = async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<{ data: TourPackage[] }> = await axios.get(`${API_BASE_URL}/tour-packages`);
      const sortedTourPackages = res.data.data.sort((a, b) =>
        (a.name ?? "").localeCompare(b.name ?? "")
      );
      setTourPackages(sortedTourPackages);
    } catch (err) {
      console.error("Fetch tour packages error:", err);
      toast.error("Failed to fetch tour packages");
    } finally {
      setLoading(false);
    }
  };

  const fetchDestinations = async () => {
    try {
      const res: AxiosResponse<{ data: Option[] }> = await axios.get(`${API_BASE_URL}/destinations`);
      const sorted = res.data.data.sort((a, b) => a.name.localeCompare(b.name));
      setDestinations(sorted);
    } catch {
      toast.error("Failed to fetch destinations");
    }
  };

  const fetchTourTypes = async () => {
    try {
      const res: AxiosResponse<{ data: Option[] }> = await axios.get(`${API_BASE_URL}/tour-types`);
      const sorted = res.data.data.sort((a, b) => a.name.localeCompare(b.name));
      setTourTypes(sorted);
    } catch {
      toast.error("Failed to fetch tour types");
    }
  };

  const fetchLevels = async () => {
    try {
      const res: AxiosResponse<{ data: Option[] }> = await axios.get(`${API_BASE_URL}/levels`);
      const sorted = res.data.data.sort((a, b) => a.name.localeCompare(b.name));
      setLevels(sorted);
    } catch {
      toast.error("Failed to fetch levels");
    }
  };

  const fetchStatuses = async () => {
    try {
      const res: AxiosResponse<{ data: Option[] }> = await axios.get(`${API_BASE_URL}/statuses`);
      const filteredStatuses = res.data.data
        .filter((s) => s.id === 4 || s.id === 5)
        .sort((a, b) => a.name.localeCompare(b.name));
      setStatuses(filteredStatuses);
    } catch {
      toast.error("Failed to fetch statuses");
    }
  };

  useEffect(() => {
    fetchTourPackages();
    fetchDestinations();
    fetchTourTypes();
    fetchLevels();
    fetchStatuses();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple: true,
    maxSize: MAX_FILE_SIZE_KB * 1024,
    onDrop: (acceptedFiles: File[], fileRejections: any[]) => {
      setFileError("");
      if (fileRejections.length > 0) {
        setFileError(
          `Some files are too large (max ${MAX_FILE_SIZE_KB}KB) or not valid images.`
        );
        toast.error(
          `Some files are too large (max ${MAX_FILE_SIZE_KB}KB) or not valid images.`
        );
      } else {
        setImages((prev) => [...prev, ...acceptedFiles]);
      }
    },
  });

  const { getRootProps: getMapRootProps, getInputProps: getMapInputProps, isDragActive: isMapDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple: true,
    maxSize: MAX_FILE_SIZE_KB * 1024,
    onDrop: (acceptedFiles: File[], fileRejections: any[]) => {
      setMapFileError("");
      if (fileRejections.length > 0) {
        setMapFileError(
          `Some files are too large (max ${MAX_FILE_SIZE_KB}KB) or not valid images.`
        );
        toast.error(
          `Some files are too large (max ${MAX_FILE_SIZE_KB}KB) or not valid images.`
        );
      } else {
        setMapImages((prev) => [...prev, ...acceptedFiles]);
      }
    },
  });

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  if (name === "status_id") {
    setForm((prev) => ({ ...prev, [name]: value ? parseInt(value, 10) : null }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  setErrors((prev) => ({ ...prev, [name]: undefined }));
};

  const addCardHighlight = () => {
    if (newCardHighlight.trim()) {
      setForm((prev) => ({
        ...prev,
        card_highlights: [...prev.card_highlights, newCardHighlight.trim()],
      }));
      setNewCardHighlight("");
    }
  };

  const removeCardHighlight = (index: number) => {
    setForm((prev) => ({
      ...prev,
      card_highlights: prev.card_highlights.filter((_, i) => i !== index),
    }));
  };

  const addDetailedHighlight = () => {
    if (newDetailedHighlight.trim()) {
      setForm((prev) => ({
        ...prev,
        detailed_highlights: [...prev.detailed_highlights, newDetailedHighlight.trim()],
      }));
      setNewDetailedHighlight("");
    }
  };

  const removeDetailedHighlight = (index: number) => {
    setForm((prev) => ({
      ...prev,
      detailed_highlights: prev.detailed_highlights.filter((_, i) => i !== index),
    }));
  };

  const addItinerary = () => {
    if (newItineraryDay.trim() && newItineraryDesc.trim()) {
      setForm((prev) => ({
        ...prev,
        itinerary: [...prev.itinerary, { day: newItineraryDay.trim(), description: newItineraryDesc.trim() }],
      }));
      setNewItineraryDay("");
      setNewItineraryDesc("");
    }
  };

  const removeItinerary = (index: number) => {
    setForm((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  const addInclude = () => {
    if (newInclude.trim()) {
      setForm((prev) => ({
        ...prev,
        includes: [...prev.includes, newInclude.trim()],
      }));
      setNewInclude("");
    }
  };

  const removeInclude = (index: number) => {
    setForm((prev) => ({
      ...prev,
      includes: prev.includes.filter((_, i) => i !== index),
    }));
  };

  const addExclude = () => {
    if (newExclude.trim()) {
      setForm((prev) => ({
        ...prev,
        excludes: [...prev.excludes, newExclude.trim()],
      }));
      setNewExclude("");
    }
  };

  const removeExclude = (index: number) => {
    setForm((prev) => ({
      ...prev,
      excludes: prev.excludes.filter((_, i) => i !== index),
    }));
  };

  const addFaq = () => {
    if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
      setForm((prev) => ({
        ...prev,
        faqs: [...prev.faqs, { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }],
      }));
      setNewFaqQuestion("");
      setNewFaqAnswer("");
    }
  };

  const removeFaq = (index: number) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const validate = (): boolean => {
    const err: Errors = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.destination_id) err.destination_id = "Destination is required";
    if (!form.tour_type_id) err.tour_type_id = "Tour type is required";
    if (!form.level_id) err.level_id = "Level is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0)
      err.price = "Price must be a positive number";
    if (form.discount && (isNaN(Number(form.discount)) || Number(form.discount) < 0 || Number(form.discount) > 100))
      err.discount = "Discount must be between 0 and 100";
    if (!form.currency) err.currency = "Currency is required";
    if (!form.duration_days || isNaN(Number(form.duration_days)) || Number(form.duration_days) < 1)
      err.duration_days = "Duration must be at least 1 day";
    if (form.height_meters && (isNaN(Number(form.height_meters)) || Number(form.height_meters) < 0))
      err.height_meters = "Height must be a non-negative number";
    if (!form.min_people || isNaN(Number(form.min_people)) || Number(form.min_people) < 1)
      err.min_people = "Minimum people must be at least 1";
    if (!form.max_people || isNaN(Number(form.max_people)) || Number(form.max_people) < 1)
      err.max_people = "Maximum people must be at least 1";
    if (Number(form.min_people) > Number(form.max_people))
      err.max_people = "Maximum people must be greater than or equal to minimum people";
    if (form.status_id === null || ![4, 5].includes(form.status_id))
      err.status_id = "Status must be either Available or Unavailable";
    if (!isEditing && images.length === 0) {
      err.images = "At least one image is required";
    }
    const oversizedImages = images.filter((img) => img.size > MAX_FILE_SIZE_KB * 1024);
    if (oversizedImages.length > 0) {
      err.images = `Some images exceed the ${MAX_FILE_SIZE_KB}KB size limit`;
      toast.error(
        `Some images exceed the ${MAX_FILE_SIZE_KB}KB size limit. Please upload smaller images.`
      );
    }
    const oversizedMapImages = mapImages.filter((img) => img.size > MAX_FILE_SIZE_KB * 1024);
    if (oversizedMapImages.length > 0) {
      err.map_images = `Some map images exceed the ${MAX_FILE_SIZE_KB}KB size limit`;
      toast.error(
        `Some map images exceed the ${MAX_FILE_SIZE_KB}KB size limit. Please upload smaller images.`
      );
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  setLoading(true);
  const formData = new FormData();
  Object.entries(form).forEach(([key, val]) => {
    if (key === "card_highlights") {
      (val as string[]).forEach((item, idx) => formData.append(`card_highlights[${idx}]`, item));
    } else if (key === "detailed_highlights") {
      (val as string[]).forEach((item, idx) => formData.append(`detailed_highlights[${idx}]`, item));
    } else if (key === "itinerary") {
      (val as ItineraryItem[]).forEach((item, idx) => {
        formData.append(`itinerary[${idx}][day]`, item.day);
        formData.append(`itinerary[${idx}][description]`, item.description);
      });
    } else if (key === "includes") {
      (val as string[]).forEach((item, idx) => formData.append(`includes[${idx}]`, item));
    } else if (key === "excludes") {
      (val as string[]).forEach((item, idx) => formData.append(`excludes[${idx}]`, item));
    } else if (key === "faqs") {
      (val as FaqItem[]).forEach((item, idx) => {
        formData.append(`faqs[${idx}][question]`, item.question);
        formData.append(`faqs[${idx}][answer]`, item.answer);
      });
    } else if (val !== null && val !== "") {
      formData.append(key, val.toString());
    }
  });
  images.forEach((img) => {
    formData.append("images[]", img);
  });
  deletedImageIds.forEach((id) => {
    formData.append("deleted_images[]", id.toString());
  });
  mapImages.forEach((img) => {
    formData.append("map_images[]", img);
  });
  deletedMapImageIds.forEach((id) => {
    formData.append("deleted_map_images[]", id.toString());
  });
  
  try {
    let res: AxiosResponse<{ data: TourPackage }>;
    if (isEditing && editingId) {
      res = await axios.post(
        `${API_BASE_URL}/tour-packages/${editingId}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTourPackages((prev) =>
        prev
          .map((tp) => {
            if (tp.id === editingId) {
              return {
                ...res.data.data,
                destination: {
                  id: Number(res.data.data.destination_id),
                  name: destinations.find((d) => d.id === Number(res.data.data.destination_id))?.name || "N/A",
                },
                tour_type: {
                  id: Number(res.data.data.tour_type_id),
                  name: tourTypes.find((tt) => tt.id === Number(res.data.data.tour_type_id))?.name || "N/A",
                },
                level: {
                  id: Number(res.data.data.level_id),
                  name: levels.find((l) => l.id === Number(res.data.data.level_id))?.name || "N/A",
                },
                status: {
                  id: Number(res.data.data.status_id),
                  name: res.data.data.status_id === 4 ? "Available" : "Unavailable",
                },
                images: res.data.data.images || [],
                map_images: res.data.data.map_images || [],
              };
            }
            return tp;
          })
          .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
      );
      toast.success("Tour package updated successfully");
    } else {
      res = await axios.post(
        `${API_BASE_URL}/tour-packages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTourPackages((prev) =>
        [
          ...prev,
          {
            ...res.data.data,
            destination: {
              id: Number(res.data.data.destination_id),
              name: destinations.find((d) => d.id === Number(res.data.data.destination_id))?.name || "N/A",
            },
            tour_type: {
              id: Number(res.data.data.tour_type_id),
              name: tourTypes.find((tt) => tt.id === Number(res.data.data.tour_type_id))?.name || "N/A",
            },
            level: {
              id: Number(res.data.data.level_id),
              name: levels.find((l) => l.id === Number(res.data.data.level_id))?.name || "N/A",
            },
            status: {
              id: Number(res.data.data.status_id),
              name: res.data.data.status_id === 4 ? "Available" : "Unavailable",
            },
            images: res.data.data.images || [],
            map_images: res.data.data.map_images || [],
          },
        ].sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
      );
      toast.success("Tour package created successfully");
    }
    setShowForm(false);
    resetForm();
    await fetchTourPackages();
  } catch (err: unknown) {
    const error = err as AxiosError<ApiErrorResponse>;
    console.error("Error in handleSubmit:", error.response?.data);
    if (error.response?.status === 422 && error.response.data?.errors) {
      const serverErrors = error.response.data.errors;
      const formattedErrors: Errors = {};
      for (const key in serverErrors) {
        formattedErrors[key] = serverErrors[key][0];
      }
      setErrors(formattedErrors);
      toast.error("Please fix the highlighted errors.");
    } else if (error.response?.status === 409) {
      toast.error(error.response.data?.message ?? "Conflict occurred.");
    } else {
      toast.error(error.response?.data?.message ?? "Failed to save tour package.");
    }
  } finally {
    setLoading(false);
  }
};

  const handleAddDestination = async () => {
    const trimmedName = newDestination.trim();
    if (!trimmedName) {
      toast.error("Destination name is required");
      return;
    }
    try {
      const res: AxiosResponse<{ data: Option }> = await axios.post(`${API_BASE_URL}/destinations`, {
        name: trimmedName,
      });
      const updated = [...destinations, res.data.data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setDestinations(updated);
      setForm((prev) => ({ ...prev, destination_id: String(res.data.data.id) }));
      setNewDestination("");
      toast.success("Destination added");
    } catch (err: unknown) {
      const error = err as AxiosError<ApiErrorResponse>;
      console.error("Error in handleAddDestination:", error);
      if (error.response?.status === 422 && error.response.data?.errors) {
        const serverErrors = error.response.data.errors;
        toast.error(`Validation failed: ${serverErrors.name?.[0] ?? "Unknown error"}`);
      } else {
        toast.error(error.response?.data?.message ?? "Failed to add destination");
      }
    }
  };

  const handleAddTourType = async () => {
    const trimmedName = newTourType.trim();
    if (!trimmedName) {
      toast.error("Tour type name is required");
      return;
    }
    try {
      const res: AxiosResponse<{ data: Option }> = await axios.post(`${API_BASE_URL}/tour-types`, {
        name: trimmedName,
      });
      const updated = [...tourTypes, res.data.data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setTourTypes(updated);
      setForm((prev) => ({ ...prev, tour_type_id: String(res.data.data.id) }));
      setNewTourType("");
      toast.success("Tour Type added");
    } catch (err: unknown) {
      const error = err as AxiosError<ApiErrorResponse>;
      console.error("Error in handleAddTourType:", error);
      if (error.response?.status === 422 && error.response.data?.errors) {
        const serverErrors = error.response.data.errors;
        toast.error(`Validation failed: ${serverErrors.name?.[0] ?? "Unknown error"}`);
      } else {
        toast.error(error.response?.data?.message ?? "Failed to add tour type");
      }
    }
  };

  const handleAddLevel = async () => {
    const trimmedName = newLevel.trim();
    if (!trimmedName) {
      toast.error("Level name is required");
      return;
    }
    try {
      const res: AxiosResponse<{ data: Option }> = await axios.post(`${API_BASE_URL}/levels`, {
        name: trimmedName,
      });
      const updated = [...levels, res.data.data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setLevels(updated);
      setForm((prev) => ({ ...prev, level_id: String(res.data.data.id) }));
      setNewLevel("");
      toast.success("Level added");
    } catch (err: unknown) {
      const error = err as AxiosError<ApiErrorResponse>;
      console.error("Error in handleAddLevel:", error);
      if (error.response?.status === 422 && error.response.data?.errors) {
        const serverErrors = error.response.data.errors;
        toast.error(`Validation failed: ${serverErrors.name?.[0] ?? "Unknown error"}`);
      } else {
        toast.error(error.response?.data?.message ?? "Failed to add level");
      }
    }
  };

  const handleDeleteDestination = async () => {
    if (!deleteDestinationId) return;
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/destinations/${deleteDestinationId}`);
      const deletedDestination = destinations.find((dest) => dest.id === deleteDestinationId);
      setDestinations((prev) => prev.filter((dest) => dest.id !== deleteDestinationId));
      if (selectedDestination === deletedDestination?.name) {
        setSelectedDestination("all");
      }
      toast.success(`Destination "${deletedDestination?.name}" deleted successfully`);
    } catch (err: unknown) {
      const error = err as AxiosError<ApiErrorResponse>;
      if (error.response?.status === 409) {
        toast.error(error.response.data?.message ?? "Cannot delete destination with assigned tour packages");
      } else {
        toast.error(error.response?.data?.message ?? "Failed to delete destination");
      }
    } finally {
      setLoading(false);
      setDeleteDestinationId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) {
      toast.error("No tour package selected for deletion");
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/tour-packages/${deleteId}`);
      const deletedTourPackage = tourPackages.find((tp) => tp.id === deleteId);
      setTourPackages((prev) =>
        prev.filter((tp) => tp.id !== deleteId).sort((a, b) =>
          (a.name ?? "").localeCompare(b.name ?? "")
        )
      );
      toast.success(`Tour package "${deletedTourPackage?.name}" deleted successfully`);
      const filteredTourPackages =
        selectedDestination === "all"
          ? tourPackages.filter((tp) => tp.id !== deleteId)
          : tourPackages.filter(
              (tp) => tp.id !== deleteId && tp.destination?.name === selectedDestination
            );
      const totalPagesAfterDelete = Math.max(
        1,
        Math.ceil(filteredTourPackages.length / tourPackagesPerPage)
      );
      if (currentPage > totalPagesAfterDelete) {
        setCurrentPage(totalPagesAfterDelete);
      }
    } catch (err: unknown) {
      const error = err as AxiosError<ApiErrorResponse>;
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message ?? "Failed to delete tour package");
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const resetForm = () => {
  setForm({
    name: "",
    destination_id: "",
    tour_type_id: "",
    level_id: "",
    subcategory: "",
    price: "",
    discount: "",
    currency: "USD",
    duration_days: "",
    height_meters: "",
    location: "",
    min_people: "",
    max_people: "",
    overview: "",
    card_highlights: [],
    detailed_highlights: [],
    itinerary: [],
    includes: [],
    excludes: [],
    faqs: [],
    status_id: null,
  });
  setImages([]);
  setMapImages([]);
  setExistingImages([]);
  setDeletedImageIds([]);
  setExistingMapImages([]);
  setDeletedMapImageIds([]);
  setErrors({});
  setFileError("");
  setMapFileError("");
  setIsEditing(false);
  setEditingId(null);
  setNewCardHighlight("");
  setNewDetailedHighlight("");
  setNewItineraryDay("");
  setNewItineraryDesc("");
  setNewInclude("");
  setNewExclude("");
  setNewFaqQuestion("");
  setNewFaqAnswer("");
};

 const handleEdit = (tourPackage: TourPackage) => {
  setForm({
    name: tourPackage.name ?? "",
    destination_id: tourPackage.destination?.id?.toString() ?? tourPackage.destination_id?.toString() ?? "",
    tour_type_id: tourPackage.tour_type?.id?.toString() ?? tourPackage.tour_type_id?.toString() ?? "",
    level_id: tourPackage.level?.id?.toString() ?? tourPackage.level_id?.toString() ?? "",
    subcategory: tourPackage.subcategory ?? "",
    price: tourPackage.price?.toString() ?? "",
    discount: tourPackage.discount?.toString() ?? "",
    currency: tourPackage.currency ?? "USD",
    duration_days: tourPackage.duration_days?.toString() ?? "",
    height_meters: tourPackage.height_meters?.toString() ?? "",
    location: tourPackage.location ?? "",
    min_people: tourPackage.min_people?.toString() ?? "",
    max_people: tourPackage.max_people?.toString() ?? "",
    overview: tourPackage.overview ?? "",
    card_highlights: tourPackage.card_highlights ?? [],
    detailed_highlights: tourPackage.detailed_highlights ?? [],
    itinerary: tourPackage.itinerary ?? [],
    includes: tourPackage.includes ?? [],
    excludes: tourPackage.excludes ?? [],
    faqs: tourPackage.faqs ?? [],
    status_id: tourPackage.status_id ?? null,
  });
  setExistingImages(tourPackage.images ?? []);
  setDeletedImageIds([]);
  setExistingMapImages(tourPackage.map_images ?? []);
  setDeletedMapImageIds([]);
  setImages([]);
  setMapImages([]);
  setIsEditing(true);
  setEditingId(tourPackage.id);
  setShowForm(true);
  setTimeout(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 200);
};

  const removeExistingImage = (id: number) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    setDeletedImageIds((prev) => [...prev, id]);
  };

  const removeExistingMapImage = (id: number) => {
    setExistingMapImages((prev) => prev.filter((img) => img.id !== id));
    setDeletedMapImageIds((prev) => [...prev, id]);
  };

  const filteredTourPackages: TourPackage[] =
    selectedDestination === "all"
      ? tourPackages
      : tourPackages.filter((tp) => tp.destination?.name === selectedDestination);

  const indexOfLastTourPackage = currentPage * tourPackagesPerPage;
  const indexOfFirstTourPackage = indexOfLastTourPackage - tourPackagesPerPage;
  const currentTourPackages = filteredTourPackages.slice(
    indexOfFirstTourPackage,
    indexOfLastTourPackage
  );

  const totalPages = Math.max(1, Math.ceil(filteredTourPackages.length / tourPackagesPerPage));

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex max-w-7xl mx-auto">
      <aside className="w-64 p-6 border-r border-gray-200">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">Destinations</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => {
                setSelectedDestination("all");
                setCurrentPage(1);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                selectedDestination === "all"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              All
            </button>
          </li>
          {destinations.map((dest) => (
            <li key={dest.id} className="flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedDestination(dest.name);
                  setCurrentPage(1);
                }}
                className={`flex-1 text-left px-4 py-2 rounded-lg whitespace-normal break-words max-w-[90%] ${
                  selectedDestination === dest.name
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {dest.name}
              </button>
              <button
                onClick={() => setDeleteDestinationId(dest.id)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-6">
        <div className="p-6 max-w-6xl mx-auto">
          <ToastContainer position="top-right" autoClose={3000} />
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl text-center font-semibold font-['Winky_Rough',sans-serif] mb-6 text-orange-500">
              Admin Tour Packages
            </h1>
            <button
              onClick={() => {
                setShowForm(true);
                resetForm();
              }}
              className="flex items-center gap-2 text-white bg-orange-500 hover:bg-orange-600 px-5 py-4 rounded-full"
            >
              <FaPlus /> Add Tour Package
            </button>
          </div>
          {loading && <Loader />}
          <AnimatePresence>
            {showForm && !loading && (
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white shadow-xl p-8 rounded-3xl border border-gray-300 mb-10"
              >
                <form onSubmit={handleSubmit} className="grid gap-6">
                  <h2 className="text-2xl font-semibold text-orange-500 mb-2">
                    Tour Package Details
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Fields marked with <span className="text-red-500">*</span> are required.
                  </p>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="EBC Heli Tour"
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Destination <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleAddDestination}
                          className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={newDestination}
                          onChange={(e) => setNewDestination(e.target.value)}
                          placeholder="Add new destination"
                          className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm"
                        />
                      </div>
                      <select
                        name="destination_id"
                        value={form.destination_id}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.destination_id ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      >
                        <option value="">Select Destination</option>
                        {destinations.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                      {errors.destination_id && (
                        <p className="text-sm text-red-600 mt-1">{errors.destination_id}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Tour Type <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleAddTourType}
                          className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={newTourType}
                          onChange={(e) => setNewTourType(e.target.value)}
                          placeholder="Add new tour type"
                          className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm"
                        />
                      </div>
                      <select
                        name="tour_type_id"
                        value={form.tour_type_id}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.tour_type_id ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      >
                        <option value="">Select Tour Type</option>
                        {tourTypes.map((tt) => (
                          <option key={tt.id} value={tt.id}>
                            {tt.name}
                          </option>
                        ))}
                      </select>
                      {errors.tour_type_id && (
                        <p className="text-sm text-red-600 mt-1">{errors.tour_type_id}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Subcategory
                      </label>
                      <input
                        name="subcategory"
                        value={form.subcategory}
                        onChange={handleChange}
                        placeholder="Everest Region"
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.subcategory ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      />
                      {errors.subcategory && (
                        <p className="text-sm text-red-600 mt-1">{errors.subcategory}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Level <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleAddLevel}
                          className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={newLevel}
                          onChange={(e) => setNewLevel(e.target.value)}
                          placeholder="Add new level"
                          className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm"
                        />
                      </div>
                      <select
                        name="level_id"
                        value={form.level_id}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.level_id ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      >
                        <option value="">Select Level</option>
                        {levels.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.name}
                          </option>
                        ))}
                      </select>
                      {errors.level_id && (
                        <p className="text-sm text-red-600 mt-1">{errors.level_id}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="1000.00"
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.price ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      />
                      {errors.price && (
                        <p className="text-sm text-red-600 mt-1">{errors.price}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Discount
                      </label>
                      <input
                        name="discount"
                        value={form.discount}
                        onChange={handleChange}
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="10"
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.discount ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      />
                      {errors.discount && (
                        <p className="text-sm text-red-600 mt-1">{errors.discount}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Currency <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="currency"
                        value={form.currency}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.currency ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      >
                        <option value="">Select Currency</option>
                        <option value="USD">USD ($)</option>
                        <option value="NPR">NPR (Rs)</option>
                      </select>
                      {errors.currency && (
                        <p className="text-sm text-red-600 mt-1">{errors.currency}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Duration (days) <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="duration_days"
                        value={form.duration_days}
                        onChange={handleChange}
                        type="number"
                        min="1"
                        placeholder="10"
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.duration_days ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      />
                      {errors.duration_days && (
                        <p className="text-sm text-red-600 mt-1">{errors.duration_days}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Height (meters)
                      </label>
                      <input
                        name="height_meters"
                        value={form.height_meters}
                        onChange={handleChange}
                        type="number"
                        min="0"
                        placeholder="5000"
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.height_meters ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      />
                      {errors.height_meters && (
                        <p className="text-sm text-red-600 mt-1">{errors.height_meters}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Location
                      </label>
                      <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Everest Region"
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.location ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      />
                      {errors.location && (
                        <p className="text-sm text-red-600 mt-1">{errors.location}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Min People <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="min_people"
                        value={form.min_people}
                        onChange={handleChange}
                        type="number"
                        min="1"
                        placeholder="2"
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.min_people ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      />
                      {errors.min_people && (
                        <p className="text-sm text-red-600 mt-1">{errors.min_people}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Max People <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="max_people"
                        value={form.max_people}
                        onChange={handleChange}
                        type="number"
                        min="1"
                        placeholder="12"
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.max_people ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      />
                      {errors.max_people && (
                        <p className="text-sm text-red-600 mt-1">{errors.max_people}</p>
                      )}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="status_id"
                        value={form.status_id ?? ""}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.status_id ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      >
                        <option value="">Select Status</option>
                        {statuses.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                      {errors.status_id && (
                        <p className="text-sm text-red-600 mt-1">{errors.status_id}</p>
                      )}
                    </div>
                    <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Overview
                      </label>
                      <textarea
                        name="overview"
                        value={form.overview}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-2 rounded-md border ${
                          errors.overview ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                      />
                      {errors.overview && (
                        <p className="text-sm text-red-600 mt-1">{errors.overview}</p>
                      )}
                    </div>
                    <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Card Highlights
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          value={newCardHighlight}
                          onChange={(e) => setNewCardHighlight(e.target.value)}
                          placeholder="Add highlight"
                          className="flex-1 px-3 py-2 rounded border border-gray-300"
                        />
                        <button type="button" onClick={addCardHighlight} className="bg-blue-500 text-white px-4 py-2 rounded">
                          Add
                        </button>
                      </div>
                      <ul className="list-disc pl-5">
                        {form.card_highlights.map((hl, index) => (
                          <li key={index} className="flex justify-between">
                            {hl}
                            <button type="button" onClick={() => removeCardHighlight(index)} className="text-red-500">
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Detailed Highlights
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          value={newDetailedHighlight}
                          onChange={(e) => setNewDetailedHighlight(e.target.value)}
                          placeholder="Add detailed highlight"
                          className="flex-1 px-3 py-2 rounded border border-gray-300"
                        />
                        <button type="button" onClick={addDetailedHighlight} className="bg-blue-500 text-white px-4 py-2 rounded">
                          Add
                        </button>
                      </div>
                      <ul className="list-disc pl-5">
                        {form.detailed_highlights.map((hl, index) => (
                          <li key={index} className="flex justify-between">
                            {hl}
                            <button type="button" onClick={() => removeDetailedHighlight(index)} className="text-red-500">
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Itinerary
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          value={newItineraryDay}
                          onChange={(e) => setNewItineraryDay(e.target.value)}
                          placeholder="Day (e.g. Day 1)"
                          className="w-1/3 px-3 py-2 rounded border border-gray-300"
                        />
                        <input
                          value={newItineraryDesc}
                          onChange={(e) => setNewItineraryDesc(e.target.value)}
                          placeholder="Description"
                          className="flex-1 px-3 py-2 rounded border border-gray-300"
                        />
                        <button type="button" onClick={addItinerary} className="bg-blue-500 text-white px-4 py-2 rounded">
                          Add
                        </button>
                      </div>
                      <ul className="list-disc pl-5">
                        {form.itinerary.map((item, index) => (
                          <li key={index} className="flex justify-between">
                            {item.day}: {item.description}
                            <button type="button" onClick={() => removeItinerary(index)} className="text-red-500">
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Includes
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          value={newInclude}
                          onChange={(e) => setNewInclude(e.target.value)}
                          placeholder="Add include item"
                          className="flex-1 px-3 py-2 rounded border border-gray-300"
                        />
                        <button type="button" onClick={addInclude} className="bg-blue-500 text-white px-4 py-2 rounded">
                          Add
                        </button>
                      </div>
                      <ul className="list-disc pl-5">
                        {form.includes.map((item, index) => (
                          <li key={index} className="flex justify-between">
                            {item}
                            <button type="button" onClick={() => removeInclude(index)} className="text-red-500">
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Excludes
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          value={newExclude}
                          onChange={(e) => setNewExclude(e.target.value)}
                          placeholder="Add exclude item"
                          className="flex-1 px-3 py-2 rounded border border-gray-300"
                        />
                        <button type="button" onClick={addExclude} className="bg-blue-500 text-white px-4 py-2 rounded">
                          Add
                        </button>
                      </div>
                      <ul className="list-disc pl-5">
                        {form.excludes.map((item, index) => (
                          <li key={index} className="flex justify-between">
                            {item}
                            <button type="button" onClick={() => removeExclude(index)} className="text-red-500">
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        FAQs
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          value={newFaqQuestion}
                          onChange={(e) => setNewFaqQuestion(e.target.value)}
                          placeholder="Question"
                          className="w-1/2 px-3 py-2 rounded border border-gray-300"
                        />
                        <input
                          value={newFaqAnswer}
                          onChange={(e) => setNewFaqAnswer(e.target.value)}
                          placeholder="Answer"
                          className="flex-1 px-3 py-2 rounded border border-gray-300"
                        />
                        <button type="button" onClick={addFaq} className="bg-blue-500 text-white px-4 py-2 rounded">
                          Add
                        </button>
                      </div>
                      <div>
                        {form.faqs.map((faq, index) => (
                          <div key={index} className="flex justify-between mb-2">
                            <div>
                              <strong>Q:</strong> {faq.question}<br />
                              <strong>A:</strong> {faq.answer}
                            </div>
                            <button type="button" onClick={() => removeFaq(index)} className="text-red-500">
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 border border-gray-300 rounded-lg p-5 shadow-sm">
                    <h2 className="text-xl font-semibold text-orange-500 mb-3">
                      Tour Images {isEditing ? "" : <span className="text-red-500">*</span>}
                    </h2>
                    {isEditing && existingImages.length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-medium mb-2">Existing Images</h3>
                        <div className="flex flex-wrap gap-4">
                          {existingImages.map((img) => (
                            <div key={img.id} className="relative">
                              <img
                                src={`${API_BASE_URL.replace("/api", "")}/storage/${img.image_path}`}
                                alt="Tour Package"
                                className="w-24 h-24 object-cover rounded"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder-image.jpg";
                                  e.currentTarget.alt = "Image not available";
                                }}
                              />
                              <span
                                className={`absolute top-1 left-1 px-2 py-1 text-xs rounded ${
                                  img.is_main ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                                }`}
                              >
                                {img.is_main ? "Main" : "Secondary"}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeExistingImage(img.id)}
                                className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                        fileError ? "border-red-500" : "border-gray-400 hover:border-orange-500"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p className="text-orange-500 font-medium">Drop images here...</p>
                      ) : (
                        <p className="text-gray-500">
                          Click or drag images to upload (Max {MAX_FILE_SIZE_KB}KB each, jpeg/jpg/png/webp)
                        </p>
                      )}
                      {fileError && (
                        <p className="text-sm text-red-600 mt-1">{fileError}</p>
                      )}
                    </div>
                    {errors.images && (
                      <p className="text-sm text-red-600 mt-1">{errors.images}</p>
                    )}
                    {images.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-4">
                        {images.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`upload-${index}`}
                              className="w-24 h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                              className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 border border-gray-300 rounded-lg p-5 shadow-sm">
                    <h2 className="text-xl font-semibold text-orange-500 mb-3">
                      Map Images
                    </h2>
                    {isEditing && existingMapImages.length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-medium mb-2">Existing Map Images</h3>
                        <div className="flex flex-wrap gap-4">
                          {existingMapImages.map((img) => (
                            <div key={img.id} className="relative">
                              <img
                                src={`${API_BASE_URL.replace("/api", "")}/storage/${img.map_image_path}`}
                                alt="Tour Package Map"
                                className="w-24 h-24 object-cover rounded"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder-image.jpg";
                                  e.currentTarget.alt = "Map Image not available";
                                }}
                              />
                              <span
                                className={`absolute top-1 left-1 px-2 py-1 text-xs rounded ${
                                  img.is_main ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                                }`}
                              >
                                {img.is_main ? "Main" : "Secondary"}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeExistingMapImage(img.id)}
                                className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div
                      {...getMapRootProps()}
                      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                        mapFileError ? "border-red-500" : "border-gray-400 hover:border-orange-500"
                      }`}
                    >
                      <input {...getMapInputProps()} />
                      {isMapDragActive ? (
                        <p className="text-orange-500 font-medium">Drop map images here...</p>
                      ) : (
                        <p className="text-gray-500">
                          Click or drag map images to upload (Max {MAX_FILE_SIZE_KB}KB each, jpeg/jpg/png/webp)
                        </p>
                      )}
                      {mapFileError && (
                        <p className="text-sm text-red-600 mt-1">{mapFileError}</p>
                      )}
                    </div>
                    {errors.map_images && (
                      <p className="text-sm text-red-600 mt-1">{errors.map_images}</p>
                    )}
                    {mapImages.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-4">
                        {mapImages.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`map-upload-${index}`}
                              className="w-24 h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => setMapImages((prev) => prev.filter((_, i) => i !== index))}
                              className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-8 gap-4">
                    <button
                      type="submit"
                      className="bg-orange-500 text-white px-8 py-3 rounded-full shadow hover:bg-orange-600 transition"
                    >
                      {isEditing ? "Update Tour Package" : "Create Tour Package"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="bg-gray-200 px-8 py-3 rounded-full hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="grid md:grid-cols-3 gap-6">
            {currentTourPackages.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500">
                No tour packages available
              </div>
            ) : (
              currentTourPackages.map((tourPackage, index) => {
                const displayIndex = (currentPage - 1) * tourPackagesPerPage + index + 1;
                return (
                  <motion.div
                    key={tourPackage.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    }}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 relative cursor-pointer overflow-hidden transform transition duration-300 hover:bg-gray-50"
                    onClick={() => setSelectedTourPackage({ ...tourPackage, displayIndex })}
                  >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-bold text-orange-500 mb-1 tracking-tight">
                            {tourPackage.name ?? "Unnamed Tour Package"}
                          </h2>
                          <p className="text-sm text-gray-600 font-medium whitespace-normal break-words max-w-[90%]">
                            Destination: {tourPackage.destination?.name ?? "N/A"}
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            Status: {tourPackage.status?.name ?? "N/A"}
                          </p>
                        </div>
                        <div className="flex gap-3 items-center">
                          <button
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              handleEdit(tourPackage);
                            }}
                            className="text-orange-500 hover:text-orange-600 transform hover:scale-110 transition z-10"
                          >
                            <FaEdit className="text-lg" />
                          </button>
                          <button
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              setDeleteId(tourPackage.id);
                            }}
                            className="text-red-500 hover:text-red-600 transform hover:scale-110 transition z-10"
                          >
                            <FaTrash className="text-lg" />
                          </button>
                        </div>
                      </div>
                      {tourPackage.images && tourPackage.images.length > 0 ? (
                        <img
                          src={`${API_BASE_URL.replace("/api", "")}/storage/${
                            tourPackage.images.find((img) => img.is_main)?.image_path ??
                            tourPackage.images[0].image_path
                          }`}
                          alt={tourPackage.name ?? "Tour Package"}
                          className="w-full h-40 object-cover mt-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = "/placeholder-image.jpg";
                            e.currentTarget.alt = "Image not available";
                          }}
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-200 rounded-lg mt-3 flex items-center justify-center text-gray-500 font-medium">
                          <img
                            src="/placeholder-image.jpg"
                            alt="No Image Available"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`w-10 h-10 rounded-full ${
                    currentPage === page
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
          <AnimatePresence>
            {deleteId && (
             <ConfirmModal
                message="Are you sure you want to delete this tour package?"
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
              />
            )}
            {deleteDestinationId && (
              <ConfirmModal
                message="Are you sure you want to delete this destination? This action cannot be undone."
                onConfirm={handleDeleteDestination}
                onCancel={() => setDeleteDestinationId(null)}
              />
            )}
            {selectedTourPackage && (
              <TourPackageDetailModal
                tourPackage={selectedTourPackage}
                onClose={() => setSelectedTourPackage(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminTourPackage;