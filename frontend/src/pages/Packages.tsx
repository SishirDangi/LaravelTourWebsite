import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import Annapurna from '../components/Trekking region/Annapurna'
import DayHiking from '../components/Trekking region/DayHiking'
import Everest from '../components/Trekking region/Everest'
import Langtang from '../components/Trekking region/Langtang'
import ShortEasyTrek from '../components/Trekking region/ShortEasyTrek'
import WildernessTrekking from '../components/Trekking region/WildernessTrekking'

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Treks' },
    { id: 'everest', label: 'Everest Region Trekking' },
    { id: 'annapurna', label: 'Annapurna Region Trekking' },
    { id: 'langtang', label: 'Langtang Region Trekking' },
    { id: 'wilderness', label: 'Wilderness Region Trekking' },
    { id: 'shortandeasy', label: 'Short and Easy Trekking' },
    { id: 'dayhiking', label: 'Day Hiking in Nepal' }
  ]

  return (
    <>
      <SectionHeader
        title='Trekking Packages'
        description="Discover Nepal's most spectacular trekking routes with our expertly crafted packages. Each journey is designed to provide unforgettable experiences while ensuring your safety and comfort."
        backgroundImage='https://media.audleytravel.com/-/media/images/home/indian-subcontinent/regional-guides/india-to-nepal-where-to-go-in-the-himalaya/istock_540840250_nepal_himalaya_mt_everest_3000x1000.jpg?q=79&w=1920&h=685'
      />

      {/* Filter Categories */}
      <section className='py-12 bg-orange-50 border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-[#1E293B] mb-6'>
            Browse by Region
          </h2>
          <div className='flex flex-wrap justify-center gap-4'>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                  selectedCategory === category.id
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-white text-[#1E293B] hover:bg-orange-100 border border-orange-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trekking Packages Display */}
      <div className='px-4 md:px-10 pb-16 bg-orange-50'>
        {(selectedCategory === 'all' || selectedCategory === 'everest') && (
          <Everest />
        )}
        {(selectedCategory === 'all' || selectedCategory === 'annapurna') && (
          <Annapurna />
        )}
        {(selectedCategory === 'all' || selectedCategory === 'langtang') && (
          <Langtang />
        )}
        {(selectedCategory === 'all' || selectedCategory === 'wilderness') && (
          <WildernessTrekking />
        )}
        {(selectedCategory === 'all' ||
          selectedCategory === 'shortandeasy') && <ShortEasyTrek />}
        {(selectedCategory === 'all' || selectedCategory === 'dayhiking') && (
          <DayHiking />
        )}
      </div>
    </>
  )
}

export default Packages
