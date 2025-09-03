import React from 'react';
import {
  Mountain,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">
          
   {/* Company Info */}
<div className="flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
  <div className="flex items-center justify-center sm:justify-start space-x-2">
    <Mountain className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
    <span className="text-lg sm:text-xl font-bold">Himalaya Trekking</span>
  </div>
<p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xs sm:max-w-none text-justify sm:text-left">

    Experience the majestic beauty of Nepal's Himalayas with our expert
    guides and carefully crafted trekking packages.
  </p>
  <div className="flex space-x-4 justify-center sm:justify-start">
    <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
    <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
    <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
  </div>
</div>


          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/packages" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">Trekking Packages</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">About Us</a></li>
              <li><a href="/gallery" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">Gallery</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">Blog</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Popular Treks */}
          <div className="flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Popular Treks</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">Everest Base Camp</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">Annapurna Circuit</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">Manaslu Circuit</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">Langtang Valley</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">Upper Mustang</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-xs sm:text-sm">Thamel, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-xs sm:text-sm">+977-1-4123456</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-xs sm:text-sm">info@himalayatrekking.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2025 Himalaya Trekking. All rights reserved. | Designed and developed by Amit
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
