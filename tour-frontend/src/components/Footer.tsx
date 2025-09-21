import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaRegCopyright,
  FaAngleRight,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import SubscribeForm from "./SubscribeForm";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

interface PopularTour {
  id: number;
  tour_package?: {
    id: number;
    name: string;
  };
}

const Footer: React.FC = () => {
  const [popularTours, setPopularTours] = useState<PopularTour[]>([]);

  useEffect(() => {
    const cached = sessionStorage.getItem("popularTours");

    if (cached) {
      const parsedTours = JSON.parse(cached);
      console.log("Cached Tours:", parsedTours);
      const validTours = parsedTours.filter(
        (tour: PopularTour) => tour.tour_package && tour.tour_package.id && tour.tour_package.name
      );
      setPopularTours(validTours);
      if (validTours.length !== parsedTours.length) {
        console.warn("Invalid cached tours detected, refetching data");
        sessionStorage.removeItem("popularTours");
        fetchPopularTours();
      }
    } else {
      fetchPopularTours();
    }
  }, []);

  const fetchPopularTours = async () => {
    try {
      const response = await axios.get(`${API_BASE}/popular-tours`);
      console.log("API Response:", response.data);
      if (response.data.success) {
        const filtered = response.data.data
          .filter((tour: PopularTour) => tour.tour_package && tour.tour_package.id && tour.tour_package.name)
          .slice(0, 5);
        console.log("Filtered Tours:", filtered);
        setPopularTours(filtered);
        sessionStorage.setItem("popularTours", JSON.stringify(filtered));
      }
    } catch (error) {
      console.error("Error fetching popular tours:", error);
    }
  };

  return (
    <footer className="font-sans bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6 md:px-16 lg:px-24 py-16 shadow-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Useful Links */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-orange-500">
            Useful Links
          </h2>
          <ul className="space-y-3 text-gray-300">
            {[
              { label: "Home", to: "/" },
              { label: "Destination", to: "/destination" },
              { label: "About Us", to: "/aboutus" },
              { label: "Blog", to: "/blog" },
              { label: "Contact Us", to: "/contact" },
              { label: "Popular Tours", to: "/populartours" },
            ].map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group flex items-center gap-2 text-base font-medium hover:text-orange-500 transition-all duration-300 ease-in-out transform hover:translate-x-2"
                >
                  <FaAngleRight className="text-orange-500 group-hover:text-orange-400 transition-colors duration-300" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Popular Tours */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-orange-500">
            Popular Tours
          </h2>
          <ul className="space-y-3 text-gray-300">
            {popularTours.length > 0 ? (
              popularTours.map((tour) => {
                if (!tour.tour_package?.id || !tour.tour_package?.name) {
                  console.warn("Invalid tour package:", tour);
                  return null;
                }
                return (
                  <li key={tour.id}>
                    <Link
                      to={`/packages/${tour.tour_package.id}`}
                      className="group flex items-center gap-2 text-base font-medium hover:text-orange-500 transition-all duration-300 ease-in-out transform hover:translate-x-2"
                    >
                      <FaAngleRight className="text-orange-500 group-hover:text-orange-400 transition-colors duration-300" />
                      {tour.tour_package.name}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="text-gray-500 italic">No packages found</li>
            )}
          </ul>
        </div>

        {/* Column 3: Logo and Contact Info */}
        <div className="flex flex-col items-center text-center space-y-1">
          <img
            src="Logo.png"
            alt="Himalaya Trekking Logo"
            className="w-34 h-auto transition-transform duration-300 hover:scale-105"
          />
          <div className="leading-tight">
            <h2 className="text-4xl font-extrabold tracking-wider text-white font-['Winky_Rough',sans-serif]">
              HIMALAYA
            </h2>
            <p className="text-2xl tracking-wider font-medium text-orange-500 font-['Winky_Rough',sans-serif]">
              TREKKING
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-orange-500 tracking-tight">
              Location
            </p>
            <p className="text-base text-gray-300">Thamel, Kathmandu, Nepal</p>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-orange-500 tracking-tight">
              Get in Touch
            </p>
            <p className="text-base text-gray-300">
              <a href="tel:+97714123456" className="hover:text-orange-500 transition-colors duration-300">
                +977-1-4123456
              </a>
            </p>
            <a
              href="mailto:info@himalayatrekking.com"
              className="text-base text-gray-300 hover:text-orange-500 transition-colors duration-300"
            >
              info@himalayatrekking.com
            </a>
          </div>
        </div>

        {/* Column 4: Subscribe and Socials */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-orange-500">
            Stay Connected
          </h2>
          <p className="text-base text-gray-300">
            Subscribe for exclusive offers and updates
          </p>
          <div className="w-full max-w-sm">
            <SubscribeForm />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-orange-500 tracking-tight">
              Follow Us
            </h3>
            <div className="flex space-x-6 text-2xl justify-center md:justify-start">
              <a
                href="https://www.facebook.com/himalayatrekking"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:text-orange-500 hover:scale-110"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/himalayatrekking"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:text-orange-500 hover:scale-110"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.tiktok.com/@himalayatrekking"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:text-orange-500 hover:scale-110"
              >
                <SiTiktok />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-6 border-t border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p className="flex items-center gap-2">
            <FaRegCopyright />
            {new Date().getFullYear()} Himalaya Trekking. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/terms"
              className="hover:text-orange-500 transition-all duration-300"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacypolicy"
              className="hover:text-orange-500 transition-all duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/faqs"
              className="hover:text-orange-500 transition-all duration-300"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;