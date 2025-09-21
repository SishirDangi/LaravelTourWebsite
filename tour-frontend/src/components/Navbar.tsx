import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mountain, Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface NavItem {
  path?: string;
  label: string;
  subpages?: NavItem[];
}

interface TourPackage {
  id: number;
  name: string;
  destination_id: number;
  tour_type_id: number;
  subcategory?: string;
  price: number;
  currency: string;
  duration_days: number;
  status_id?: number;
  status?: { id: number; name: string };
}

interface Destination {
  id: number;
  name: string;
  tourPackages: TourPackage[];
}

interface TourType {
  id: number;
  name: string;
  tourPackages: TourPackage[];
}

interface ApiResponse {
  data: Destination[] | TourType[];
  message?: string;
  success?: boolean;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [tourTypes, setTourTypes] = useState<TourType[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState<boolean>(true);
  const [loadingTourTypes, setLoadingTourTypes] = useState<boolean>(true);
  const [destinationError, setDestinationError] = useState<string | null>(null);
  const [tourTypeError, setTourTypeError] = useState<string | null>(null);
  const location = useLocation();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  // Function to create slug from name
  const createSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Fetch destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoadingDestinations(true);
        setDestinationError(null);

        const response = await fetch(`${API_URL}/destinations`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();
        const data = result.data;

        if (data && Array.isArray(data)) {
          setDestinations(data as Destination[]);
        } else {
          setDestinations([]);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setDestinationError(
          error instanceof Error ? error.message : "Failed to fetch destinations"
        );
        setDestinations([]);
      } finally {
        setLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, [API_URL]);

  // Fetch tour types
  useEffect(() => {
    const fetchTourTypes = async () => {
      try {
        setLoadingTourTypes(true);
        setTourTypeError(null);

        const response = await fetch(`${API_URL}/tour-types`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();
        const data = result.data;

        if (data && Array.isArray(data)) {
          const mappedTourTypes: TourType[] = (data as any[]).map((t: any) => ({
            id: t.id,
            name: t.name,
            tourPackages: (t.tour_packages || [])
              .filter(
                (pkg: any) =>
                  pkg.status_id === 4 || (pkg.status && pkg.status.id === 4)
              )
              .map((pkg: any) => ({
                id: pkg.id,
                name: pkg.name,
              })),
          }));

          const tourTypesWithPackages = mappedTourTypes.filter(
            (tourType: TourType) => tourType.tourPackages.length > 0
          );

          setTourTypes(tourTypesWithPackages);
        } else {
          setTourTypes([]);
        }
      } catch (error) {
        console.error("Error fetching tour types:", error);
        setTourTypeError(
          error instanceof Error ? error.message : "Failed to fetch tour types"
        );
        setTourTypes([]);
      } finally {
        setLoadingTourTypes(false);
      }
    };

    fetchTourTypes();
  }, [API_URL]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
    setActiveSubMenu(null);
  }, [location.pathname]);

  const handleMenuClick = (label: string) => {
    setActiveMenu((prev) => (prev === label ? null : label));
    setActiveSubMenu(null);
  };

  const handleSubMenuClick = (label: string) => {
    setActiveSubMenu((prev) => (prev === label ? null : label));
  };

  // Build nav items
  const buildNavItems = (): NavItem[] => {
    const baseNavItems: NavItem[] = [{ path: "/", label: "Home" }];

    const destinationNavItem: NavItem = {
      label: "Destination",
      subpages: loadingDestinations
        ? [{ label: "Loading destinations...", path: undefined }]
        : destinationError
        ? [{ label: `Error: ${destinationError}`, path: undefined }]
        : destinations.length > 0
        ? destinations.map((destination) => {
            const slug = createSlug(destination.name);
            return {
              path: `/destination/${slug}`,
              label: destination.name,
            };
          })
        : [{ label: "No destinations available", path: undefined }],
    };

    baseNavItems.push(destinationNavItem);

    const tourTypesNavItem: NavItem = {
      label: "Tours",
      subpages: loadingTourTypes
        ? [{ label: "Loading tour types...", path: undefined }]
        : tourTypeError
        ? [{ label: `Error: ${tourTypeError}`, path: undefined }]
        : tourTypes.length > 0
        ? tourTypes.map((tourType) => ({
            label: tourType.name,
            subpages:
              tourType.tourPackages && tourType.tourPackages.length > 0
                ? tourType.tourPackages
                    .slice(0, 8)
                    .map((pkg) => ({
                      path: `/packages/${pkg.id}`,
                      label: pkg.name,
                    }))
                : [{ label: "No packages available", path: undefined }],
          }))
        : [{ label: "No tour types available", path: undefined }],
    };

    baseNavItems.push(tourTypesNavItem);

    baseNavItems.push(
      { path: "/aboutus", label: "About Us" },
      { path: "/blog", label: "Blog" },
      { path: "/contact", label: "Contact Us" }
    );

    return baseNavItems;
  };

  const navItems = buildNavItems();
  const isActive = (path: string): boolean => location.pathname === path;

  // Desktop nav render
  const renderDesktopNavItem = (item: NavItem, index: number) => {
    return item.subpages ? (
      <div key={item.label || index} className="relative group">
        <button
          className="px-3 py-2 text-sm font-medium text-white/80 group-hover:text-white cursor-pointer flex items-center gap-1 whitespace-nowrap transition-colors duration-200"
          onClick={(e) => {
            e.preventDefault();
            handleMenuClick(item.label!);
          }}
        >
          {item.label}
          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>

        <AnimatePresence>
          {activeMenu === item.label && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg z-50 min-w-[14rem] w-72 max-h-96 overflow-y-auto p-2"
            >
              {item.subpages!.map((sub, subIndex) =>
                sub.path ? (
                  <Link
                    key={sub.path || subIndex}
                    to={sub.path}
                    className="block px-4 py-2 text-sm rounded-md hover:bg-orange-100 transition-colors duration-200"
                    onClick={() => setActiveMenu(null)}
                  >
                    {sub.label}
                  </Link>
                ) : sub.subpages ? (
                  <div key={sub.label} className="w-full">
                    <button
                      className="w-full px-4 py-2 text-sm text-left font-medium hover:bg-orange-100 transition-colors duration-200 rounded-md flex justify-between items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSubMenuClick(sub.label);
                      }}
                    >
                      {sub.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeSubMenu === sub.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeSubMenu === sub.label && sub.subpages.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 flex flex-col bg-gray-50 divide-y divide-gray-200 rounded-md overflow-hidden"
                        >
                          {sub.subpages.slice(0, 10).map((pkg, pkgIndex) =>
                            pkg.path ? (
                              <Link
                                key={pkg.path || pkgIndex}
                                to={pkg.path}
                                className="px-4 py-2 text-sm hover:bg-orange-100 transition-colors duration-200"
                                onClick={() => {
                                  setActiveMenu(null);
                                  setActiveSubMenu(null);
                                }}
                              >
                                {pkg.label}
                              </Link>
                            ) : (
                              <div
                                key={pkg.label}
                                className="px-4 py-2 text-sm text-gray-500 bg-gray-100 cursor-not-allowed"
                              >
                                {pkg.label}
                              </div>
                            )
                          )}
                          {sub.subpages.length > 10 && (
                            <div className="px-4 py-2 text-sm text-gray-500 bg-gray-100">
                              +{sub.subpages.length - 10} more
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div
                    key={sub.label}
                    className="px-4 py-2 text-sm text-gray-500 bg-gray-50 cursor-not-allowed rounded-md"
                  >
                    {sub.label}
                  </div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ) : (
      <Link
        key={item.path}
        to={item.path!}
        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
          isActive(item.path!) ? "text-white" : "text-white/80 hover:text-white"
        }`}
      >
        {item.label}
      </Link>
    );
  };

  // Mobile nav render
  const renderMobileNavItem = (item: NavItem, index: number) => {
    return item.subpages ? (
      <div key={item.label || index} className="w-full">
        <button
          className="w-full px-3 py-3 text-white/90 font-semibold flex justify-between items-center cursor-pointer text-sm sm:text-base rounded-md hover:bg-orange-700/50 transition-all duration-200"
          onClick={() => handleMenuClick(item.label)}
        >
          <span className="truncate">{item.label}</span>
          <ChevronRight
            size={16}
            className={`${
              activeMenu === item.label ? "rotate-90" : ""
            } transition-transform duration-200`}
          />
        </button>

        <AnimatePresence>
          {activeMenu === item.label && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {item.subpages!.map((sub, subIndex) =>
                sub.path ? (
                  <Link
                    key={sub.path || subIndex}
                    to={sub.path}
                    className="block ml-4 px-4 py-2.5 text-white/85 hover:text-white hover:bg-orange-700/40 rounded-md text-sm sm:text-base transition-all duration-200 truncate"
                    onClick={() => {
                      setIsOpen(false);
                      setActiveMenu(null);
                    }}
                  >
                    {sub.label}
                  </Link>
                ) : sub.subpages ? (
                  <div key={sub.label} className="ml-4">
                    <button
                      className="w-full px-4 py-2.5 text-white/85 font-medium flex justify-between items-center hover:text-white hover:bg-orange-700/40 rounded-md text-sm sm:text-base transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubMenuClick(sub.label);
                      }}
                    >
                      <span className="truncate">{sub.label}</span>
                      <ChevronRight
                        size={14}
                        className={`${
                          activeSubMenu === sub.label ? "rotate-90" : ""
                        } transition-transform duration-200`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeSubMenu === sub.label &&
                        sub.subpages &&
                        sub.subpages.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden ml-6 flex flex-col bg-orange-700/10 rounded-md"
                          >
                            {sub.subpages.slice(0, 10).map((pkg, pkgIndex) =>
                              pkg.path ? (
                                <Link
                                  key={pkg.path || pkgIndex}
                                  to={pkg.path}
                                  className="block px-4 py-2 text-white/80 hover:text-white hover:bg-orange-700/30 rounded-md text-sm transition-all duration-200 truncate"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setActiveMenu(null);
                                    setActiveSubMenu(null);
                                  }}
                                >
                                  {pkg.label}
                                </Link>
                              ) : (
                                <div
                                  key={pkg.label}
                                  className="px-4 py-2 text-sm text-white/50 bg-orange-700/20 cursor-not-allowed rounded-md"
                                >
                                  {pkg.label}
                                </div>
                              )
                            )}
                            {sub.subpages.length > 10 && (
                              <div className="px-4 py-2 text-sm text-white/50 bg-orange-700/20 rounded-md cursor-not-allowed">
                                +{sub.subpages.length - 10} more
                              </div>
                            )}
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div
                    key={sub.label}
                    className="block ml-4 px-4 py-2.5 text-white/60 text-sm sm:text-base bg-orange-700/20 rounded-md cursor-not-allowed"
                  >
                    {sub.label}
                  </div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ) : (
      <Link
        key={item.path}
        to={item.path!}
        className={`block px-3 py-3 text-white/85 hover:text-white hover:bg-orange-700/40 rounded-md text-sm sm:text-base transition-all duration-200 ${
          isActive(item.path!) ? "bg-orange-700/50 font-semibold" : ""
        }`}
        onClick={() => setIsOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <nav
      className={`relative w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-orange-600 shadow-lg" : "bg-orange-600/90 backdrop-blur-md"
      }`}
    >
      {/* Desktop */}
      <div className="hidden sm:block">
        <div className="mx-auto px-4 max-w-full">
          <div className="flex justify-between items-center h-16 sm:h-[4.5rem] md:h-20">
            <Link to="/" className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-white" />
              <span className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                Himalaya Trekking
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item, index) => renderDesktopNavItem(item, index))}
            </div>

            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <div className="flex justify-between items-center px-4 py-3">
          <Link to="/" className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-white" />
            <span className="text-lg font-bold text-white">Himalaya Trekking</span>
          </Link>
          <button className="p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-orange-600/95 px-2 pt-2 pb-3 space-y-1 shadow-lg rounded-b-lg"
            >
              {navItems.map((item, index) => renderMobileNavItem(item, index))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
