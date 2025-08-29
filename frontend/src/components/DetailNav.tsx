import React, { useEffect, useState } from 'react'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'map', label: 'Map' },
  { id: 'includes-excludes', label: 'Includes/Excludes' },
  { id: 'faq', label: 'FAQ' }
]

const DetailNav = () => {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const handleScroll = () => {
      let current = ''
      for (let section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const offsetTop = el.offsetTop
          if (window.scrollY >= offsetTop - 150) {
            current = section.id
          }
        }
      }
      setActiveSection(current || 'overview')
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 144, // Adjusted offset: 64px (navbar) + 80px (this nav)
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      {/* Fixed Navigation Below Main Navbar */}
      <nav className='fixed top-16 left-0 right-0 z-40 bg-white shadow-md px-4 py-2 border-b'>
        <ul className='flex flex-wrap gap-4 justify-center md:justify-start overflow-x-auto'>
          {sections.map(section => (
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
      <div className='h-[120px]'></div>
    </>
  )
}

export default DetailNav
