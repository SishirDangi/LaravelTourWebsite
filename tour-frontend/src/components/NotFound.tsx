import React from 'react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 p-4">
      {/* Animated SVG Icon */}
      <motion.svg
        className="w-40 h-40 mb-6 text-orange-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L14.25 12L9.75 7"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </motion.svg>

      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 text-orange-500 drop-shadow-lg">
        404
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-700 text-center max-w-md">
        Oops! The page you are looking for does not exist.
      </p>

      <motion.a
        href="/"
        className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition transform hover:scale-105"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Go Back Home
      </motion.a>
    </div>
  );
};

export default NotFound;
