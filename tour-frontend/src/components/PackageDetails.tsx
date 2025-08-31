import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
}

const sections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "highlights", label: "Highlights" },
  { id: "itinerary", label: "Itinerary" },
  { id: "includes-excludes", label: "Includes/Excludes" },
  { id: "faq", label: "FAQ" },
  { id: "map", label: "Map" },
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

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error || !tourPackage)
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error || "Tour package not found"}
      </div>
    );

  const images = tourPackage.images || [];
  const currentBgUrl =
    images.length > 0
      ? `${baseUrl}/storage/${images[currentIndex].image_path}`
      : "/trekking-bg.jpg";

  return (
    <div className="w-full">
      <div className="relative h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentBgUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold text-white text-center">
          {tourPackage.name}
        </h1>

        {images.length > 1 && currentIndex > 0 && (
          <button
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full text-xl font-bold hover:bg-white/90 transition"
          >
            &lt;
          </button>
        )}

        {images.length > 1 && currentIndex < images.length - 1 && (
          <button
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full text-xl font-bold hover:bg-white/90 transition"
          >
            &gt;
          </button>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition ${
                  idx === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/70"
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>

      <nav className="sticky top-10 sm:top-20 z-40 bg-white border-b shadow px-4 py-3">
        <ul className="flex flex-wrap gap-3 justify-center">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollTo(section.id)}
                className={`text-sm md:text-base font-medium px-4 py-2 rounded-lg transition ${
                  activeSection === section.id
                    ? "bg-orange-600 text-white"
                    : "text-gray-700 hover:bg-orange-100"
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container mx-auto max-w-6xl px-4 py-12 flex flex-col lg:flex-row gap-10">
        <main className="flex-1 space-y-12">
          <section id="overview">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            {tourPackage.overview && (
              <p className="mt-5 mb-5 text-gray-700 text-justify">
                {tourPackage.overview}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <p>
                <strong>Destination:</strong>{" "}
                {tourPackage.destination?.name || "-"}
              </p>
              <p>
                <strong>Tour Type:</strong> {tourPackage.tourType?.name || "-"}
              </p>
              {tourPackage.subcategory && (
                <p>
                  <strong>Subcategory:</strong> {tourPackage.subcategory}
                </p>
              )}
              <p>
                <strong>Level:</strong> {tourPackage.level?.name || "-"}
              </p>
              <p>
                <strong>Price:</strong> {tourPackage.currency}{" "}
                {tourPackage.price}{" "}
                {tourPackage.discount && (
                  <span>({tourPackage.discount}% off)</span>
                )}
              </p>
              <p>
                <strong>Duration:</strong> {tourPackage.duration_days} days
              </p>
              {tourPackage.height_meters && (
                <p>
                  <strong>Max Altitude:</strong> {tourPackage.height_meters} m
                </p>
              )}
              {tourPackage.location && (
                <p>
                  <strong>Location:</strong> {tourPackage.location}
                </p>
              )}
              <p>
                <strong>Group Size:</strong> {tourPackage.min_people} -{" "}
                {tourPackage.max_people}
              </p>
              <p>
                <strong>Status:</strong> {tourPackage.status?.name || "-"}
              </p>
            </div>
          </section>

          {tourPackage.detailed_highlights?.length ? (
            <section id="highlights">
              <h2 className="text-2xl font-bold mb-4">Highlights</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {tourPackage.detailed_highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {tourPackage.itinerary?.length ? (
            <section id="itinerary">
              <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
              <div className="space-y-6">
                {tourPackage.itinerary.map((dayItem, idx) => (
                  <div
                    key={idx}
                    className="p-4 border-l-4 border-orange-600 bg-orange-50 rounded-md"
                  >
                    <h3 className="font-semibold text-lg">
                      Day {dayItem.day}
                      {dayItem.title ? `: ${dayItem.title}` : ""}
                    </h3>
                    <p className="text-gray-600">{dayItem.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {(tourPackage.includes?.length || tourPackage.excludes?.length) && (
            <section id="includes-excludes">
              <h2 className="text-2xl font-bold mb-4">Includes & Excludes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tourPackage.includes?.length ? (
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-green-600">
                      Included:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {tourPackage.includes.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {tourPackage.excludes?.length ? (
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-red-600">
                      Excluded:
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {tourPackage.excludes.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          )}

          {tourPackage.faqs?.length ? (
            <section id="faq">
              <h2 className="text-2xl font-bold mb-4">FAQ</h2>
              <div className="space-y-4">
                {tourPackage.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b pb-3">
                    <p className="font-medium text-gray-800">{faq.question}</p>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </main>

        <aside className="lg:w-[350px] sticky top-28 self-start space-y-6">
          <div className="p-6 border rounded-lg shadow bg-white">
            <h3 className="text-xl font-bold mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Contact us for booking or more information.
            </p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition">
              Book Now
            </button>
          </div>
        </aside>
      </div>

      {tourPackage.map_iframe && (
        <section id="map" className="w-full py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
              Map
            </h2>
            <div className="w-full h-[60vh] overflow-hidden rounded-lg">
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