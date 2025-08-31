import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookTripSidebar from './BookTripSidebar';

interface Section {
  id: string;
  label: string;
}

interface TourPackage {
  id: number;
  name: string;
  destination_id: number;
  destination: { name: string };
  tour_type_id: number;
  tourType: { name: string };
  subcategory: string | null;
  level_id: number;
  level: { name: string };
  price: number;
  discount: number | null;
  currency: 'USD' | 'NPR';
  duration_days: number;
  height_meters: number | null;
  location: string | null;
  min_people: number;
  max_people: number;
  overview: string | null;
  card_highlights: string[] | null;
  detailed_highlights: string[] | null;
  itinerary: { day: number; title: string; description: string }[] | null;
  map_url: string | null;
  map_iframe: string | null;
  includes: string[] | null;
  excludes: string[] | null;
  faqs: { question: string; answer: string }[] | null;
  status_id: number;
  status: { name: string };
  images: { id: number; image_path: string; is_main: boolean }[] | null;
}

const sections: Section[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'map', label: 'Map' },
  { id: 'includes-excludes', label: 'Includes/Excludes' },
  { id: 'faq', label: 'FAQ' },
];

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [tourPackage, setTourPackage] = useState<TourPackage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTourPackage = async () => {
      try {
        const response = await fetch(`/api/tour-packages/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tour package');
        }
        const { data } = await response.json();
        setTourPackage(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchTourPackage();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      let current: string = '';
      for (let section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const offsetTop = el.offsetTop;
          if (window.scrollY >= offsetTop - 150) {
            current = section.id;
          }
        }
      }
      setActiveSection(current || 'overview');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 144, // Adjusted offset: 64px (navbar) + 80px (this nav)
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !tourPackage) {
    return <div>Error: {error || 'Tour package not found'}</div>;
  }

  const mainImage = tourPackage.images?.find((img) => img.is_main)?.image_path || '';

  return (
    <>
      {/* Fixed Navigation Below Main Navbar */}
      <nav className="fixed top-16 left-0 right-0 z-40 bg-white shadow-md px-4 py-2 border-b">
        <ul className="flex flex-wrap gap-4 justify-center md:justify-start overflow-x-auto">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollTo(section.id)}
                className={`text-sm font-medium px-3 py-1 rounded-md transition ${
                  activeSection === section.id
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 hover:bg-orange-100'
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Spacer for navbar + this nav (64 + 56 = 120px approx) */}
      <div className="h-[120px]"></div>

      {/* Main container with details on left and booking sidebar on right */}
      <div className="flex flex-col md:flex-row gap-8 px-4 py-8 max-w-7xl mx-auto">
        {/* Details content on left */}
        <main className="flex-1 space-y-8">
          <section id="overview">
            <h2 className="text-2xl font-bold mb-4">{tourPackage.name}</h2>
            <div className="text-gray-700 mb-6">
              <p><strong>Destination:</strong> {tourPackage.destination.name}</p>
              <p><strong>Tour Type:</strong> {tourPackage.tourType.name}</p>
              {tourPackage.subcategory && (
                <p><strong>Subcategory:</strong> {tourPackage.subcategory}</p>
              )}
              <p><strong>Level:</strong> {tourPackage.level.name}</p>
              <p>
                <strong>Price:</strong> {tourPackage.currency} {tourPackage.price}
                {tourPackage.discount && (
                  <span> ({tourPackage.discount}% off)</span>
                )}
              </p>
              <p><strong>Duration:</strong> {tourPackage.duration_days} days</p>
              {tourPackage.height_meters && (
                <p><strong>Max Altitude:</strong> {tourPackage.height_meters} meters</p>
              )}
              {tourPackage.location && (
                <p><strong>Location:</strong> {tourPackage.location}</p>
              )}
              <p>
                <strong>Group Size:</strong> {tourPackage.min_people} - {tourPackage.max_people} people
              </p>
              <p><strong>Status:</strong> {tourPackage.status.name}</p>
              {tourPackage.overview && <p className="mt-4">{tourPackage.overview}</p>}
            </div>

            {/* Main image below overview */}
            {mainImage && (
              <img
                src={`/storage/${mainImage}`}
                alt={tourPackage.name}
                className="w-full max-w-4xl mx-auto rounded-lg shadow-md"
              />
            )}
          </section>

          {tourPackage.detailed_highlights && (
            <section id="highlights">
              <h2 className="text-2xl font-bold mb-4">Highlights</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {tourPackage.detailed_highlights.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {tourPackage.itinerary && (
            <section id="itinerary">
              <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
              <div className="space-y-4">
                {tourPackage.itinerary.map(
                  (
                    dayItem: { day: number; title: string; description: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="border-l-4 border-orange-500 pl-4"
                    >
                      <h3 className="font-semibold">
                        Day {dayItem.day}: {dayItem.title}
                      </h3>
                      <p className="text-gray-600">{dayItem.description}</p>
                    </div>
                  )
                )}
              </div>
            </section>
          )}

          {tourPackage.map_iframe && (
            <section id="map">
              <h2 className="text-2xl font-bold mb-4">Map</h2>
              <div className="w-full h-[500px]">
                <iframe
                  src={tourPackage.map_iframe}
                  title={`${tourPackage.name} Map`}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  className="rounded-md border"
                ></iframe>
              </div>
            </section>
          )}

          {(tourPackage.includes || tourPackage.excludes) && (
            <section id="includes-excludes">
              <h2 className="text-2xl font-bold mb-4">Includes & Excludes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tourPackage.includes && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Included:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {tourPackage.includes.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {tourPackage.excludes && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Not Included:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {tourPackage.excludes.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {tourPackage.faqs && (
            <section id="faq">
              <h2 className="text-2xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {tourPackage.faqs.map(
                  (faq: { question: string; answer: string }, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-md shadow-sm"
                    >
                      <h4 className="font-semibold text-lg text-orange-700">
                        Q: {faq.question}
                      </h4>
                      <p className="text-gray-700 mt-1">A: {faq.answer}</p>
                    </div>
                  )
                )}
              </div>
            </section>
          )}
        </main>

        {/* Booking sidebar on right */}
        <aside className="w-full md:w-1/3">
          <BookTripSidebar
            price={tourPackage.price}
            currency={tourPackage.currency}
            minPeople={tourPackage.min_people}
            maxPeople={tourPackage.max_people}
            durationDays={tourPackage.duration_days}
            discount={tourPackage.discount}
          />
        </aside>
      </div>
    </>
  );
};

export default PackageDetails;