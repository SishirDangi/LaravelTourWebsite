import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import TopBar from './TopBar';
import LiveMessage from './LiveMessage';

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const liveMessageRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [navHeight, setNavHeight] = useState<number>(0);

  // measure navbar height
  useEffect(() => {
    const measure = () => {
      if (navbarRef.current) setNavHeight(navbarRef.current.offsetHeight);
    };
    measure();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && navbarRef.current) {
      ro = new ResizeObserver(measure);
      ro.observe(navbarRef.current);
    } else {
      window.addEventListener('resize', measure);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', measure);
    };
  }, []);

  // observe LiveMessage: make navbar sticky after scrolling past it
  useEffect(() => {
    const liveEl = liveMessageRef.current;
    if (!liveEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsSticky(!entry.isIntersecting); // LiveMessage out of view -> navbar sticky
      },
      { root: null, threshold: 0 }
    );

    observer.observe(liveEl);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="w-full flex flex-col">
      {/* TopBar with higher z-index */}
      <div className="w-full z-[10000] relative">
        <TopBar />
      </div>

      {/* LiveMessage */}
      <div ref={liveMessageRef} className="w-full relative z-[9999]">
        <LiveMessage />
      </div>

      {/* Navbar: below LiveMessage initially, sticks to top after scrolling */}
      <div
        ref={navbarRef}
        className={`w-full transition-all duration-200 ${
          isSticky
            ? 'fixed top-0 left-0 z-[9999] shadow-md bg-white'
            : 'relative z-[9999]'
        }`}
        style={{ willChange: 'transform' }}
      >
        <Navbar />
      </div>

      {/* Spacer to prevent layout jump */}
      {isSticky && <div aria-hidden style={{ height: navHeight }} />}
    </header>
  );
};

export default Header;
