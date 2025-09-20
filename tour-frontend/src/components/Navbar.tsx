import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mountain, Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface NavItem {
  path?: string;
  label: string;
  subpages?: NavItem[];
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
    setActiveSubMenu(null);
  }, [location.pathname]);

  const handleMenuClick = (label: string) => {
    setActiveMenu(prev => (prev === label ? null : label));
    setActiveSubMenu(null);
  };

  const handleSubMenuClick = (label: string) => {
    setActiveSubMenu(prev => (prev === label ? null : label));
  };

  const navItems: NavItem[] = [
    { path: '/', label: 'Home' },
    {
      label: 'Destination',
      subpages: [
        { path: '/destination', label: 'Destination' },
      ],
    },
    {
      label: 'Trekking',
      subpages: [
        {
          label: 'Everest Region Trekking',
          subpages: [
            {
              path: '/trekking/everest-region/ebc',
              label: 'Everest Base Camp Trek (EBC)',
            },
            {
              path: '/trekking/everest-region/gokyo-chola',
              label: 'EBC via Gokyo & Cho La Pass',
            },
            {
              path: '/trekking/everest-region/three-passes',
              label: 'Three Passes Trek',
            },
            {
              path: '/trekking/everest-region/panorama',
              label: 'Everest Panorama Trek',
            },
            {
              path: '/trekking/everest-region/view-trek',
              label: 'Everest View Trek (5 Days)',
            },
            {
              path: '/trekking/everest-region/heli-tour',
              label: 'EBC Heli Tour',
            },
          ],
        },
        {
          label: 'Annapurna Region Trekking',
          subpages: [
            {
              path: '/trekking/annapurna-region/annapurna-circuit',
              label: 'Annapurna Circuit Trek',
            },
            { path: '/trekking/annapurna-region/abc', label: 'ABC Trek' },
            {
              path: '/trekking/annapurna-region/ghorepani-poon-hill',
              label: 'Ghorepani Poon Hill',
            },
            {
              path: '/trekking/annapurna-region/mardi-himal',
              label: 'Mardi Himal Trek',
            },
            {
              path: '/trekking/annapurna-region/khopra-danda',
              label: 'Khopra Ridge Trek',
            },
            {
              path: '/trekking/annapurna-region/tilicho',
              label: 'Tilicho Lake Trek',
            },
            {
              path: '/trekking/annapurna-region/nar-phu-valley',
              label: 'Nar Phu Valley Trek',
            },
            {
              path: '/trekking/annapurna-region/jomsom-muktinath',
              label: 'Jomsom Muktinath',
            },
            {
              path: '/trekking/annapurna-region/upper-mustang',
              label: 'Upper Mustang Trek',
            },
          ],
        },
        {
          label: 'Langtang Region Trek',
          subpages: [
            {
              path: '/trekking/langtang-region/gosaikunda',
              label: 'Gosaikunda Lake Trek',
            },
            {
              path: '/trekking/langtang-region/langtang-valley',
              label: 'Langtang Valley Trek',
            },
            {
              path: '/trekking/langtang-region/helambu',
              label: 'Helambu Trek',
            },
            {
              path: '/trekking/langtang-region/langtang-gosaikunda-helambu',
              label: 'Langtang – Gosaikunda – Helambu Trek',
            },
            {
              path: '/trekking/langtang-region/tamang-heritage',
              label: 'Tamang Heritage Trail',
            },
            {
              path: '/trekking/langtang-region/ganjala-pass',
              label: 'Ganja La Pass Trek',
            },
          ],
        },
        {
          label: 'Wilderness Region Trekking',
          subpages: [
            {
              path: '/trekking/wilderness-region/kanchenjunga-base-camp',
              label: 'Kanchenjunga Base Camp Trek',
            },
            {
              path: '/trekking/wilderness-region/makalu-base-camp',
              label: 'Makalu Base Camp Trek',
            },
            {
              path: '/trekking/wilderness-region/rolwaling-valley',
              label: 'Rolwaling Valley Trek',
            },
            {
              path: '/trekking/wilderness-region/dhaulagiri',
              label: 'Dhaulagiri Circuit Trek',
            },
            {
              path: '/trekking/wilderness-region/upper-dolpo',
              label: 'Upper Dolpo Trek',
            },
            {
              path: '/trekking/wilderness-region/lower-dolpo',
              label: 'Lower Dolpo Trek',
            },
            {
              path: '/trekking/wilderness-region/rara-lake',
              label: 'Rara Lake Trek',
            },
            {
              path: '/trekking/wilderness-region/tsum-valley',
              label: 'Tsum Valley Trek',
            },
            {
              path: '/trekking/wilderness-region/api-himal',
              label: 'Api Himal Base Camp Trek',
            },
            {
              path: '/trekking/wilderness-region/badimalika',
              label: 'Bajura–Badimalika Trek',
            },
          ],
        },
        {
          label: 'Short and Easy Trekking',
          subpages: [
            {
              path: '/trekking/short-easy/ghorepani-poonhill',
              label: 'Ghorepani Poon Hill Trek',
            },
            {
              path: '/trekking/short-easy/dhampus-australian',
              label: 'Dhampus Australian Camp Trek',
            },
            {
              path: '/trekking/short-easy/ghandruk-village',
              label: 'Ghandruk Village Trek',
            },
            { path: '/trekking/short-easy/panchase', label: 'Panchase Trek' },
            { path: '/trekking/short-easy/royal', label: 'Royal Trek' },
            {
              path: '/trekking/short-easy/nagarkot-chisapani',
              label: 'Nagarkot – Chisapani Trek',
            },
            {
              path: '/trekking/short-easy/namobuddha-dhulikhel',
              label: 'Namobuddha – Dhulikhel Trek',
            },
            {
              path: '/trekking/short-easy/sarangkot-naudanda',
              label: 'Sarangkot – Naudanda Hike',
            },
            {
              path: '/trekking/short-easy/balthali-village',
              label: 'Balthali Village Trek',
            },
          ],
        },
        {
          label: 'Day Hiking in Nepal',
          subpages: [
            {
              path: '/trekking/day-hiking/nagarkot',
              label: 'Nagarkot Day Hike',
            },
            {
              path: '/trekking/day-hiking/shivapuri-national-park',
              label: 'Shivapuri National Park Hike',
            },
            {
              path: '/trekking/day-hiking/champadevi',
              label: 'Champadevi Hike',
            },
            {
              path: '/trekking/day-hiking/sarangkot-sunrise',
              label: 'Sarangkot Sunrise Hike',
            },
            {
              path: '/trekking/day-hiking/peace-pagoda',
              label: 'Peace Pagoda (Shanti Stupa) Hike',
            },
          ],
        },
      ],
    },
    {
      label: 'Tour',
      subpages: [
        {
          path: '/tour/kathmandu-valley',
          label: 'Kathmandu Valley Cultural Heritage Tour',
        },
        {
          path: '/tour/bhaktapur-patan-tour',
          label: 'Bhaktapur and Patan Cultural Tour',
        },
        { path: '/tour/lumbini', label: 'Lumbini – Birthplace of Lord Buddha' },
        { path: '/tour/pokhara', label: 'Pokhara Cultural Tour' },
        {
          path: '/tour/janakpur-mithila',
          label: 'Janakpur – Mithila Culture and Ramayana Heritage',
        },
        {
          path: '/tour/bandipur-village',
          label: 'Bandipur Cultural Village Tour',
        },
        {
          path: '/tour/chitwan-national-park',
          label: 'Chitwan National Park Safari & Culture',
        },
        {
          path: '/tour/bardiya-national-park',
          label: 'Bardiya National Park Tour',
        },
      ],
    },
    { path: '/aboutus', label: 'About Us' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav
      className={`relative w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-orange-600 shadow-lg' : 'bg-orange-600/90 backdrop-blur-md'
      }`}
    >
      {/* Desktop Nav Container */}
      <div className="hidden sm:block">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-full">
          <div className="flex justify-between items-center h-16 sm:h-[4.5rem] md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-white sm:h-9 sm:w-9 md:h-10 md:w-10" />
              <span className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                Himalaya Trekking
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              {navItems.map(item =>
                item.subpages ? (
                  <div key={item.label} className="relative group">
                    <button
                      className="px-3 py-2 text-sm font-medium text-white/80 group-hover:text-white cursor-pointer flex items-center gap-1 whitespace-nowrap transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick(item.label);
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
                          className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg z-50 min-w-[12rem] w-48 sm:w-56 md:w-60 lg:w-64"
                        >
                          {item.subpages.map(sub =>
                            sub.subpages ? (
                              <div key={sub.label} className="relative group/sub">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleSubMenuClick(sub.label);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm font-semibold bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors duration-200"
                                >
                                  {sub.label}
                                  <ChevronRight className="w-4 h-4 inline ml-2 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                                </button>
                                <AnimatePresence>
                                  {activeSubMenu === sub.label && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -10 }}
                                      className="absolute left-full top-0 bg-white shadow-lg rounded-lg ml-1 z-50 min-w-[12rem] w-48 sm:w-56 md:w-60 lg:w-64"
                                    >
                                      {sub.subpages.map(nested => (
                                        <Link
                                          key={nested.path}
                                          to={nested.path!}
                                          className="block px-4 py-2 text-sm hover:bg-orange-100 transition-colors duration-200"
                                          onClick={() => {
                                            setActiveMenu(null);
                                            setActiveSubMenu(null);
                                          }}
                                        >
                                          {nested.label}
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ) : (
                              <Link
                                key={sub.path}
                                to={sub.path!}
                                className="block px-4 py-2 text-sm hover:bg-orange-100 transition-colors duration-200"
                                onClick={() => setActiveMenu(null)}
                              >
                                {sub.label}
                              </Link>
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
                      isActive(item.path!)
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* Mobile menu toggle - Hidden on desktop */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 sm:h-7 sm:w-7" />
              ) : (
                <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Nav Container */}
      <div className="sm:hidden">
        <div className="mx-auto px-4 max-w-full">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Mobile Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Mountain className="h-6 w-6 text-white sm:h-7 sm:w-7" />
              <span className="text-sm font-bold text-white sm:text-base">
                Himalaya Trekking
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 sm:h-7 sm:w-7" />
              ) : (
                <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
              )}
            </button>
          </div>

          {/* Mobile/Tablet Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="bg-orange-600 border-t border-orange-700 overflow-y-auto max-h-[80vh] sm:max-h-[85vh]"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-4 py-4 space-y-1 sm:px-6 sm:py-6 sm:space-y-2">
                  {navItems.map(item =>
                    item.subpages ? (
                      <div key={item.label} className="w-full">
                        <button
                          className="w-full px-3 py-3 text-white/90 font-semibold flex justify-between items-center cursor-pointer text-sm sm:text-base rounded-md hover:bg-orange-700/50 transition-all duration-200"
                          onClick={() => handleMenuClick(item.label)}
                        >
                          <span className="truncate">{item.label}</span>
                          <ChevronRight
                            size={16}
                            className={`${
                              activeMenu === item.label ? 'rotate-90' : ''
                            } transition-transform duration-200 sm:size-5`}
                          />
                        </button>
                        
                        {/* Submenu Animation */}
                        <AnimatePresence>
                          {activeMenu === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {item.subpages.map(sub =>
                                sub.subpages ? (
                                  <div key={sub.label} className="ml-4 mt-1">
                                    <button
                                      className="w-full px-4 py-2.5 text-white/80 font-normal cursor-pointer flex justify-between items-center text-sm sm:text-base rounded-md hover:bg-orange-700/30 transition-all duration-200"
                                      onClick={() => handleSubMenuClick(sub.label)}
                                    >
                                      <span className="truncate">{sub.label}</span>
                                      <ChevronRight
                                        size={14}
                                        className={`${
                                          activeSubMenu === sub.label ? 'rotate-90' : ''
                                        } transition-transform duration-200 sm:size-4`}
                                      />
                                    </button>
                                    
                                    {/* Nested Submenu */}
                                    <AnimatePresence>
                                      {activeSubMenu === sub.label && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="ml-4 mt-1 overflow-hidden"
                                        >
                                          {sub.subpages.map(nested => (
                                            <Link
                                              key={nested.path}
                                              to={nested.path!}
                                              className="block px-6 py-2.5 text-white/85 hover:text-white hover:bg-orange-700/40 rounded-md text-sm sm:text-base transition-all duration-200 truncate"
                                              onClick={() => {
                                                setIsOpen(false);
                                                setActiveMenu(null);
                                                setActiveSubMenu(null);
                                              }}
                                            >
                                              {nested.label}
                                            </Link>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ) : (
                                  <Link
                                    key={sub.path}
                                    to={sub.path!}
                                    className="block ml-4 px-4 py-2.5 text-white/85 hover:text-white hover:bg-orange-700/40 rounded-md text-sm sm:text-base transition-all duration-200 truncate"
                                    onClick={() => {
                                      setIsOpen(false);
                                      setActiveMenu(null);
                                    }}
                                  >
                                    {sub.label}
                                  </Link>
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
                          isActive(item.path!) ? 'bg-orange-700/50 font-semibold' : ''
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;