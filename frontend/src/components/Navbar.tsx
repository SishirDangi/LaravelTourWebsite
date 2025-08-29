import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mountain, Menu, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveMenu(null)
    setActiveSubMenu(null)
  }, [location.pathname])

  const handleMenuClick = (label: string) => {
    setActiveMenu(prev => (prev === label ? null : label))
    setActiveSubMenu(null)
  }

  const handleSubMenuClick = (label: string) => {
    setActiveSubMenu(prev => (prev === label ? null : label))
  }

  const navItems = [
    { path: '/', label: 'Home' },
    {
      label: 'Destination',
      subpages: [
        { path: '/destination/nepal', label: 'Nepal' },
        { path: '/destination/tibet', label: 'Tibet' },
        { path: '/destination/bhutan', label: 'Bhutan' }
      ]
    },
    {
      label: 'Trekking',
      subpages: [
        {
          label: 'Everest Region Trekking',
          subpages: [
            {
              path: '/trekking/everest-region/ebc',
              label: 'Everest Base Camp Trek (EBC)'
            },
            {
              path: '/trekking/everest-region/gokyo-chola',
              label: 'EBC via Gokyo & Cho La Pass'
            },
            {
              path: '/trekking/everest-region/three-passes',
              label: 'Three Passes Trek'
            },
            {
              path: '/trekking/everest-region/panorama',
              label: 'Everest Panorama Trek'
            },
            {
              path: '/trekking/everest-region/view-trek',
              label: 'Everest View Trek (5 Days)'
            },
            {
              path: '/trekking/everest-region/heli-tour',
              label: 'EBC Heli Tour'
            }
          ]
        },
        {
          label: 'Annapurna Region Trekking',
          subpages: [
            {
              path: '/trekking/annapurna-region/annapurna-circuit',
              label: 'Annapurna Circuit Trek'
            },
            { path: '/trekking/annapurna-region/abc', label: 'ABC Trek' },
            {
              path: '/trekking/annapurna-region/ghorepani-poon-hill',
              label: 'Ghorepani Poon Hill'
            },
            {
              path: '/trekking/annapurna-region/mardi-himal',
              label: 'Mardi Himal Trek'
            },
            {
              path: '/trekking/annapurna-region/khopra-danda',
              label: 'Khopra Ridge Trek'
            },
            {
              path: '/trekking/annapurna-region/tilicho',
              label: 'Tilicho Lake Trek'
            },
            {
              path: '/trekking/annapurna-region/nar-phu-valley',
              label: 'Nar Phu Valley Trek'
            },
            {
              path: '/trekking/annapurna-region/jomsom-muktinath',
              label: 'Jomsom Muktinath'
            },
            {
              path: '/trekking/annapurna-region/upper-mustang',
              label: 'Upper Mustang Trek'
            }
          ]
        },
        {
          label: 'Langtang Region Trek',
          subpages: [
            {
              path: '/trekking/langtang-region/gosaikunda',
              label: 'Gosaikunda Lake Trek'
            },
            {
              path: '/trekking/langtang-region/langtang-valley',
              label: 'Langtang Valley Trek'
            },
            {
              path: '/trekking/langtang-region/helambu',
              label: 'Helambu Trek'
            },
            {
              path: '/trekking/langtang-region/langtang-gosaikunda-helambu',
              label: 'Langtang – Gosaikunda – Helambu Trek'
            },
            {
              path: '/trekking/langtang-region/tamang-heritage',
              label: 'Tamang Heritage Trail'
            },
            {
              path: '/trekking/langtang-region/ganjala-pass',
              label: 'Ganja La Pass Trek'
            }
          ]
        },
        {
          label: 'Wilderness Region Trekking',
          subpages: [
            {
              path: '/trekking/wilderness-region/kanchenjunga-base-camp',
              label: 'Kanchenjunga Base Camp Trek'
            },
            {
              path: '/trekking/wilderness-region/makalu-base-camp',
              label: 'Makalu Base Camp Trek'
            },
            {
              path: '/trekking/wilderness-region/rolwaling-valley',
              label: 'Rolwaling Valley Trek'
            },
            {
              path: '/trekking/wilderness-region/dhaulagiri',
              label: 'Dhaulagiri Circuit Trek'
            },
            {
              path: '/trekking/wilderness-region/upper-dolpo',
              label: 'Upper Dolpo Trek'
            },
            {
              path: '/trekking/wilderness-region/lower-dolpo',
              label: 'Lower Dolpo Trek'
            },
            {
              path: '/trekking/wilderness-region/rara-lake',
              label: 'Rara Lake Trek'
            },
            {
              path: '/trekking/wilderness-region/tsum-valley',
              label: 'Tsum Valley Trek'
            },
            {
              path: '/trekking/wilderness-region/api-himal',
              label: 'Api Himal Base Camp Trek'
            },
            {
              path: '/trekking/wilderness-region/badimalika',
              label: 'Bajura–Badimalika Trek'
            }
          ]
        },
        {
          label: 'Short and Easy Trekking',
          subpages: [
            {
              path: '/trekking/short-easy/ghorepani-poonhill',
              label: 'Ghorepani Poon Hill Trek'
            },
            {
              path: '/trekking/short-easy/dhampus-australian',
              label: 'Dhampus Australian Camp Trek'
            },
            {
              path: '/trekking/short-easy/ghandruk-village',
              label: 'Ghandruk Village Trek'
            },
            { path: '/trekking/short-easy/panchase', label: 'Panchase Trek' },
            { path: '/trekking/short-easy/royal', label: 'Royal Trek' },
            {
              path: '/trekking/short-easy/nagarkot-chisapani',
              label: 'Nagarkot – Chisapani Trek'
            },
            {
              path: '/trekking/short-easy/namobuddha-dhulikhel',
              label: 'Namobuddha – Dhulikhel Trek'
            },
            {
              path: '/trekking/short-easy/sarangkot-naudanda',
              label: 'Sarangkot – Naudanda Hike'
            },
            {
              path: '/trekking/short-easy/balthali-village',
              label: 'Balthali Village Trek'
            }
          ]
        },
        {
          label: 'Day Hiking in Nepal',
          subpages: [
            {
              path: '/trekking/day-hiking/nagarkot',
              label: 'Nagarkot Day Hike'
            },
            {
              path: '/trekking/day-hiking/shivapuri-national-park',
              label: 'Shivapuri National Park Hike'
            },
            {
              path: '/trekking/day-hiking/champadevi',
              label: 'Champadevi Hike'
            },
            {
              path: '/trekking/day-hiking/sarangkot-sunrise',
              label: 'Sarangkot Sunrise Hike'
            },
            {
              path: '/trekking/day-hiking/peace-pagoda',
              label: 'Peace Pagoda (Shanti Stupa) Hike'
            }
          ]
        }
      ]
    },
    {
      label: 'Peak Climbing',
      subpages: [
        { path: '/peakclimbing/island-peak', label: 'Island Peak (Imja Tse)' },
        { path: '/peakclimbing/mera-peak', label: 'Mera Peak Climb' },
        { path: '/peakclimbing/lobuche-east-peak', label: 'Lobuche East Peak' },
        { path: '/peakclimbing/pisang-peak', label: 'Pisang Peak Climb' },
        {
          path: '/peakclimbing/chulu-east-peak',
          label: 'Chulu East Peak Climb'
        },
        { path: '/peakclimbing/yala-peak', label: 'Yala Peak Climb' }
      ]
    },
    {
      label: 'Tour',
      subpages: [
        {
          path: '/tour/kathmandu-valley',
          label: 'Kathmandu Valley Cultural Heritage Tour'
        },
        {
          path: '/tour/bhaktapur-patan-tour',
          label: 'Bhaktapur and Patan Cultural Tour'
        },
        { path: '/tour/lumbini', label: 'Lumbini – Birthplace of Lord Buddha' },
        { path: '/tour/pokhara', label: 'Pokhara Cultural Tour' },
        {
          path: '/tour/janakpur-mithila',
          label: 'Janakpur – Mithila Culture and Ramayana Heritage'
        },
        {
          path: '/tour/bandipur-village',
          label: 'Bandipur Cultural Village Tour'
        },
        {
          path: '/tour/chitwan-national-park',
          label: 'Chitwan National Park Safari & Culture'
        },
        {
          path: '/tour/bardiya-national-park',
          label: 'Bardiya National Park Tour'
        }
      ]
    },
    { path: '/about', label: 'About Us' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-orange-600 shadow-lg'
          : 'bg-orange-600/90 backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Link to='/' className='flex items-center space-x-2'>
            <Mountain className='h-8 w-8 text-white' />
            <span className='text-xl font-bold text-white'>
              Himalaya Trekking
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className='hidden md:flex items-center space-x-8 relative'>
            {navItems.map(item =>
              item.subpages ? (
                <div key={item.label} className='relative group'>
                  <span
                    className='px-3 py-2 text-sm font-medium text-white/80 group-hover:text-white cursor-pointer flex items-center gap-1 whitespace-nowrap'
                    onClick={() => handleMenuClick(item.label)}
                  >
                    {item.label}
                    <ChevronRight className='w-4 h-4' />
                  </span>

                  <AnimatePresence>
                    {activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className='absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-md z-50 whitespace-nowrap'
                      >
                        {item.subpages.map(sub =>
                          sub.subpages ? (
                            <div key={sub.label}>
                              <span
                                onClick={() => handleSubMenuClick(sub.label)}
                                className='block px-4 py-2 text-sm font-semibold bg-orange-50 hover:bg-orange-100 cursor-pointer'
                              >
                                {sub.label}
                              </span>
                              <AnimatePresence>
                                {activeSubMenu === sub.label && (
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className='absolute left-full top-0 bg-white shadow-md rounded ml-1 z-50'
                                  >
                                    {sub.subpages.map(nested => (
                                      <Link
                                        key={nested.path}
                                        to={nested.path}
                                        className='block px-4 py-2 text-sm hover:bg-orange-100'
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
                              to={sub.path}
                              className='block px-4 py-2 text-sm hover:bg-orange-100'
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
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  } whitespace-nowrap`}
                >
                  {item.label}
                </Link>
              )
            )}

            <Link
              to='/contact'
              className='bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ml-4'
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className='md:hidden p-2 text-white'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='md:hidden bg-orange-600 border-t'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className='px-4 py-2 space-y-1'>
              {navItems.map(item =>
                item.subpages ? (
                  <div key={item.label}>
                    <div
                      className='px-3 py-2 text-white/70 font-semibold flex justify-between items-center cursor-pointer'
                      onClick={() => handleMenuClick(item.label)}
                    >
                      {item.label}
                      <ChevronRight
                        size={16}
                        className={`${
                          activeMenu === item.label ? 'rotate-90' : ''
                        } transition-transform`}
                      />
                    </div>
                    {activeMenu === item.label &&
                      item.subpages.map(sub =>
                        sub.subpages ? (
                          <div key={sub.label}>
                            <div
                              className='px-6 py-2 text-white/60 font-normal cursor-pointer flex justify-between items-center'
                              onClick={() => handleSubMenuClick(sub.label)}
                            >
                              {sub.label}
                              <ChevronRight
                                size={14}
                                className={`${
                                  activeSubMenu === sub.label ? 'rotate-90' : ''
                                } transition-transform`}
                              />
                            </div>
                            {activeSubMenu === sub.label &&
                              sub.subpages.map(nested => (
                                <Link
                                  key={nested.path}
                                  to={nested.path}
                                  className='block px-8 py-2 text-white/80 hover:text-white hover:bg-orange-700 rounded-md'
                                  onClick={() => setIsOpen(false)}
                                >
                                  {nested.label}
                                </Link>
                              ))}
                          </div>
                        ) : (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className='block px-6 py-2 text-white/80 hover:text-white hover:bg-orange-700 rounded-md'
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        )
                      )}
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className='block px-3 py-2 text-white/80 hover:text-white hover:bg-orange-700 rounded-md'
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <Link
                to='/contact'
                className='block bg-white text-orange-600 px-3 py-2 rounded-md hover:bg-gray-100 text-center'
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
