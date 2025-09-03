import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleUp } from 'react-icons/fa';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Scroll handler
  const handleScroll = (): void => {
    const scrollPosition: number = window.scrollY;
    const documentHeight: number = document.documentElement.scrollHeight;
    const windowHeight: number = window.innerHeight;

    if (scrollPosition > documentHeight * 0.4 - windowHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-5 right-5 z-50 p-4
            bg-gradient-to-r from-orange-400 to-red-500
            text-white rounded-full shadow-xl
            backdrop-blur-sm bg-opacity-90
            transform transition duration-300
            hover:scale-125 hover:rotate-12 hover:shadow-2xl
            animate-bounce-slow
          "
          aria-label="Scroll to top"
        >
          <FaArrowAltCircleUp size={30} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
