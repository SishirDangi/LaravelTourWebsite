import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Define interfaces for type safety
interface Image {
  id: number;
  image_path: string;
  is_main: boolean;
}

interface Option {
  id: number;
  name: string;
}

interface FormState {
  name: string;
  destination_id: number | null;
  tour_type_id: number | null;
  subcategory: string;
  level_id: number | null;
  price: string;
  discount: string;
  currency: string;
  duration_days: string;
  height_meters: string;
  location: string;
  min_people: string;
  max_people: string;
  status_id: number | null;
  overview: string;
  card_highlights: string;
  detailed_highlights: string;
  itinerary: string;
  map_url: string;
  includes: string;
  excludes: string;
  faqs: string;
}

interface Errors {
  name?: string;
  destination_id?: string;
  tour_type_id?: string;
  subcategory?: string;
  level_id?: string;
  price?: string;
  discount?: string;
  currency?: string;
  duration_days?: string;
  height_meters?: string;
  location?: string;
  min_people?: string;
  max_people?: string;
  status_id?: string;
  overview?: string;
  card_highlights?: string;
  detailed_highlights?: string;
  itinerary?: string;
  map_url?: string;
  includes?: string;
  excludes?: string;
  faqs?: string;
  images?: string;
}

interface AdminTourPackageFormProps {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  existingImages: Image[];
  setExistingImages: React.Dispatch<React.SetStateAction<Image[]>>;
  deletedImageIds: number[];
  setDeletedImageIds: React.Dispatch<React.SetStateAction<number[]>>;
  errors: Errors;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
  fileError: string;
  setFileError: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  editingId: number | null;
  destinations: Option[];
  tourTypes: Option[];
  levels: Option[];
  statuses: Option[];
  newDestination: string;
  setNewDestination: React.Dispatch<React.SetStateAction<string>>;
  newTourType: string;
  setNewTourType: React.Dispatch<React.SetStateAction<string>>;
  newLevel: string;
  setNewLevel: React.Dispatch<React.SetStateAction<string>>;
  handleAddDestination: () => Promise<void>;
  handleAddTourType: () => Promise<void>;
  handleAddLevel: () => Promise<void>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  API_BASE_URL: string;
  MAX_FILE_SIZE_KB: number;
}

const AdminTourPackageForm: React.FC<AdminTourPackageFormProps> = ({
  form,
  setForm,
  images,
  setImages,
  existingImages,
  setExistingImages,
  
  setDeletedImageIds,
  errors,
  setErrors,
  fileError,
  setFileError,
  isEditing,
  destinations,
  tourTypes,
  levels,
  statuses,
  newDestination,
  setNewDestination,
  newTourType,
  setNewTourType,
  newLevel,
  setNewLevel,
  handleAddDestination,
  handleAddTourType,
  handleAddLevel,
  handleSubmit,
  setShowForm,
  API_BASE_URL,
  MAX_FILE_SIZE_KB,
}) => {
  const formRef = useRef<HTMLDivElement>(null);

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

  const removeExistingImage = (id: number) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    setDeletedImageIds((prev) => [...prev, id]);
  };

  return (
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
              value={form.destination_id ?? ""}
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
              value={form.tour_type_id ?? ""}
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
              value={form.level_id ?? ""}
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
              Card Highlights (comma separated)
            </label>
            <textarea
              name="card_highlights"
              value={form.card_highlights}
              onChange={handleChange}
              rows={2}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.card_highlights ? "border-red-500" : "border-gray-300"
              } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
            />
            {errors.card_highlights && (
              <p className="text-sm text-red-600 mt-1">{errors.card_highlights}</p>
            )}
          </div>
          <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Detailed Highlights (bullet points)
            </label>
            <textarea
              name="detailed_highlights"
              value={form.detailed_highlights}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.detailed_highlights ? "border-red-500" : "border-gray-300"
              } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
            />
            {errors.detailed_highlights && (
              <p className="text-sm text-red-600 mt-1">{errors.detailed_highlights}</p>
            )}
          </div>
          <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Itinerary
            </label>
            <textarea
              name="itinerary"
              value={form.itinerary}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.itinerary ? "border-red-500" : "border-gray-300"
              } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
            />
            {errors.itinerary && (
              <p className="text-sm text-red-600 mt-1">{errors.itinerary}</p>
            )}
          </div>
          <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Map URL
            </label>
            <input
              name="map_url"
              value={form.map_url}
              onChange={handleChange}
              placeholder="https://example.com/map"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.map_url ? "border-red-500" : "border-gray-300"
              } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
            />
            {errors.map_url && (
              <p className="text-sm text-red-600 mt-1">{errors.map_url}</p>
            )}
          </div>
          <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Includes
            </label>
            <textarea
              name="includes"
              value={form.includes}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.includes ? "border-red-500" : "border-gray-300"
              } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
            />
            {errors.includes && (
              <p className="text-sm text-red-600 mt-1">{errors.includes}</p>
            )}
          </div>
          <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Excludes
            </label>
            <textarea
              name="excludes"
              value={form.excludes}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.excludes ? "border-red-500" : "border-gray-300"
              } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
            />
            {errors.excludes && (
              <p className="text-sm text-red-600 mt-1">{errors.excludes}</p>
            )}
          </div>
          <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              FAQs
            </label>
            <textarea
              name="faqs"
              value={form.faqs}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.faqs ? "border-red-500" : "border-gray-300"
              } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
            />
            {errors.faqs && (
              <p className="text-sm text-red-600 mt-1">{errors.faqs}</p>
            )}
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
  );
};

export default AdminTourPackageForm;