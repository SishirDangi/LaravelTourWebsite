import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPinIcon,
  TagIcon,
  ClockIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  CalendarIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export interface TourPackage {
  id: number;
  name: string;
  destination_id: number;
  destination?: { name?: string };
  tour_type_id: number;
  tourType?: { name?: string };
  subcategory?: string | null;
  level_id: number;
  level?: { name?: string };
  price: number;
  discount?: number | null;
  currency: "USD" | "NPR";
  duration_days: number;
  height_meters?: number | null;
  location?: string | null;
  min_people: number;
  max_people: number;
  overview?: string | null;
  card_highlights?: string[] | null;
  detailed_highlights?: string[] | null;
  itinerary?: { day: number; title?: string; description: string }[] | null;
  map_url?: string | null;
  map_iframe?: string | null;
  includes?: string[] | null;
  excludes?: string[] | null;
  faqs?: { question: string; answer: string }[] | null;
  status_id: number;
  status?: { name?: string };
  images?: { id: number; image_path: string; is_main: boolean }[] | null;
}

interface Section {
  id: string;
  label: string;
  icon: React.ComponentType<{ className: string }>;
}

const sections: Section[] = [
  { id: "overview", label: "Overview", icon: InformationCircleIcon },
  { id: "highlights", label: "Highlights", icon: StarIcon },
  { id: "itinerary", label: "Itinerary", icon: CalendarIcon },
  { id: "includes-excludes", label: "Includes/Excludes", icon: CheckCircleIcon },
  { id: "faq", label: "FAQ", icon: QuestionMarkCircleIcon },
  { id: "map", label: "Map", icon: MapPinIcon },
];

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tourPackage, setTourPackage] = useState<TourPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [currentIndex, setCurrentIndex] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = apiUrl.replace("/api", "");

  useEffect(() => {
    const fetchTourPackage = async () => {
      try {
        const res = await fetch(`${apiUrl}/tour-packages/${id}`);
        if (!res.ok) throw new Error("Failed to fetch tour package");
        const { data } = await res.json();
        setTourPackage(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchTourPackage();
  }, [id, apiUrl]);

  useEffect(() => {
    if (tourPackage && tourPackage.images) {
      const mainIdx = tourPackage.images.findIndex((img) => img.is_main);
      if (mainIdx !== -1) {
        setCurrentIndex(mainIdx);
      }
    }
  }, [tourPackage]);

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = section.id;
        }
      });
      setActiveSection(current || "overview");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 140,
        behavior: "smooth",
      });
    }
  };

  if (loading)
    return (
     <div className="flex items-center justify-center h-screen w-screen bg-white">
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

    );
  if (error || !tourPackage)
    return (
      <div className="text-center py-20 text-red-500 flex items-center justify-center gap-2">
        <XCircleIcon className="h-6 w-6" />
        Error: {error || "Tour package not found"}
      </div>
    );

  const images = tourPackage.images || [];
  const currentBgUrl =
    images.length > 0
      ? `${baseUrl}/storage/${images[currentIndex].image_path}`
      : "/trekking-bg.jpg";

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${currentBgUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        <h1 className="relative text-4xl md:text-5xl font-extrabold text-white text-center px-4 drop-shadow-lg">
          {tourPackage.name}
        </h1>

        {images.length > 1 && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full text-gray-800 hover:bg-white transition shadow-md"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            )}
            {currentIndex < images.length - 1 && (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full text-gray-800 hover:bg-white transition shadow-md"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition ${
                    idx === currentIndex
                      ? "bg-orange-500"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="sticky top-16 z-40 bg-white border-b shadow-sm px-4 py-4">
        <ul className="flex flex-wrap gap-3 justify-center">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollTo(section.id)}
                className={`flex items-center gap-2 text-sm md:text-base font-medium px-4 py-2 rounded-lg transition-all ${
                  activeSection === section.id
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-800 hover:bg-orange-100 hover:text-orange-500"
                }`}
              >
                <section.icon className="h-5 w-5" />
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12 flex flex-col lg:flex-row gap-10">
        <main className="flex-1 space-y-12">
          {/* Overview Section */}
          <section id="overview" className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <InformationCircleIcon className="h-7 w-7 text-orange-500" />
              Overview
            </h2>
            {tourPackage.overview && (
              <p className="mt-5 mb-5 text-gray-800 text-justify leading-relaxed">
                {tourPackage.overview}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 bg-white p-6 rounded-lg shadow-sm">
              <p className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-orange-500" />
                <strong>Destination:</strong>{" "}
                {tourPackage.destination?.name || "-"}
              </p>
              <p className="flex items-center gap-2">
                <TagIcon className="h-5 w-5 text-orange-500" />
                <strong>Tour Type:</strong> {tourPackage.tourType?.name || "-"}
              </p>
              {tourPackage.subcategory && (
                <p className="flex items-center gap-2">
                  <TagIcon className="h-5 w-5 text-orange-500" />
                  <strong>Subcategory:</strong> {tourPackage.subcategory}
                </p>
              )}
              <p className="flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5 text-orange-500" />
                <strong>Level:</strong> {tourPackage.level?.name || "-"}
              </p>
              <p className="flex items-center gap-2">
                <CurrencyDollarIcon className="h-5 w-5 text-orange-500" />
                <strong>Price:</strong> {tourPackage.currency}{" "}
                {tourPackage.price}{" "}
                {tourPackage.discount && (
                  <span className="text-green-500">
                    ({tourPackage.discount}% off)
                  </span>
                )}
              </p>
              <p className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-orange-500" />
                <strong>Duration:</strong> {tourPackage.duration_days} days
              </p>
              {tourPackage.height_meters && (
                <p className="flex items-center gap-2">
                  <ChartBarIcon className="h-5 w-5 text-orange-500" />
                  <strong>Max Altitude:</strong> {tourPackage.height_meters} m
                </p>
              )}
              {tourPackage.location && (
                <p className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-orange-500" />
                  <strong>Location:</strong> {tourPackage.location}
                </p>
              )}
              <p className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-orange-500" />
                <strong>Group Size:</strong> {tourPackage.min_people} -{" "}
                {tourPackage.max_people}
              </p>
              <p className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-orange-500" />
                <strong>Status:</strong> {tourPackage.status?.name || "-"}
              </p>
            </div>
          </section>

          {/* Highlights Section */}
          {tourPackage.detailed_highlights?.length ? (
            <section id="highlights" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <StarIcon className="h-7 w-7 text-orange-500" />
                Highlights
              </h2>
              <ul className="list-none space-y-3 text-gray-800">
                {tourPackage.detailed_highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <StarIcon className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Itinerary Section */}
          {tourPackage.itinerary?.length ? (
            <section id="itinerary" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <CalendarIcon className="h-7 w-7 text-orange-500" />
                Itinerary
              </h2>
              <div className="space-y-6">
                {tourPackage.itinerary.map((dayItem, idx) => (
                  <div
                    key={idx}
                    className="p-6 border-l-4 border-orange-500 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-lg text-gray-800">
                      Day {dayItem.day}
                      {dayItem.title ? `: ${dayItem.title}` : ""}
                    </h3>
                    <p className="text-gray-800 mt-2">{dayItem.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Includes/Excludes Section */}
          {(tourPackage.includes?.length || tourPackage.excludes?.length) && (
            <section id="includes-excludes" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <CheckCircleIcon className="h-7 w-7 text-orange-500" />
                Includes & Excludes
              </h2>
              <div className="space-y-6">
                {tourPackage.includes?.length ? (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-3 text-green-500 flex items-center gap-2">
                      <CheckCircleIcon className="h-6 w-6" />
                      Included
                    </h3>
                    <ul className="list-none space-y-2 text-gray-800">
                      {tourPackage.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {tourPackage.excludes?.length ? (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-3 text-red-500 flex items-center gap-2">
                      <XCircleIcon className="h-6 w-6" />
                      Excluded
                    </h3>
                    <ul className="list-none space-y-2 text-gray-800">
                      {tourPackage.excludes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {tourPackage.faqs?.length ? (
            <section id="faq" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <QuestionMarkCircleIcon className="h-7 w-7 text-orange-500" />
                FAQ
              </h2>
              <div className="space-y-4">
                {tourPackage.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-orange-500 bg-white p-6 rounded-lg shadow-sm"
                  >
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <QuestionMarkCircleIcon className="h-5 w-5 text-orange-500" />
                      {faq.question}
                    </p>
                    <p className="text-gray-800 mt-2">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </main>

        {/* Sidebar */}
        <aside className="lg:w-[350px] sticky top-28 self-start space-y-6">
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <QuestionMarkCircleIcon className="h-6 w-6 text-orange-500" />
              Need Help?
            </h3>
            <p className="text-gray-800 mb-4">
              Contact us for booking or more information.
            </p>
            <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition font-semibold">
              Book Now
            </button>
          </div>
        </aside>
      </div>

      {/* Map Section */}
      {tourPackage.map_iframe && (
        <section id="map" className="w-full py-12  scroll-mt-28">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <MapPinIcon className="h-7 w-7 text-orange-500" />
              Location
            </h2>
            <div className="w-full h-[60vh] overflow-hidden rounded-lg shadow-md">
              <iframe
                src={tourPackage.map_iframe.match(/src="([^"]+)"/)?.[1] || ""}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PackageDetails;