import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    // Disable browser's native scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Scroll to top on route change or page load
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Immediate scroll to avoid jumps
      });
    } catch (error) {
      console.error("Error scrolling to top:", error);
    }
  }, [location.pathname]);
};

// Simple throttle helper (retained for potential future use, though not used here)
function throttle(fn, wait) {
  let timeout = null;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        fn.apply(this, args);
        timeout = null;
      }, wait);
    }
  };
}

export default useScrollRestoration;
