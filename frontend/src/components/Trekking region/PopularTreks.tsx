import React from 'react'
import { Link } from 'react-router-dom'
import PackageCard from '../PackagesCard'
import { Calendar } from 'lucide-react'

// Import one package from each region's package array
import { everestPackages } from './Everest'
import { annapurnaPackages } from './Annapurna'
import { langtangPackages } from './Langtang'
import { wildernessPackages } from './WildernessTrekking'

const popularTreks = [
  everestPackages[2], // Everest Base Camp Trek
  annapurnaPackages[2], // Annapurna Circuit Trek
  langtangPackages[2], // Langtang Valley Trek
  wildernessPackages[2] // Kanchenjunga Base Camp Trek
]

const PopularTreks = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl font-bold text-orange-700'>
          Popular Treks in Nepal
        </h2>
        <p className='text-gray-600 mt-2'>
          Top trekking experiences across the Himalayas
        </p>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {popularTreks.map((pkg, idx) => (
          <PackageCard
            key={pkg.id}
            index={idx}
            image={pkg.image}
            price={pkg.price}
            badge={pkg.badge}
            title={pkg.title}
            description={pkg.description}
            rating={pkg.rating}
            details={pkg.details}
            highlights={pkg.highlights}
            actions={
              <button className='flex-1 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold'>
                View Details
              </button>
            }
          />
        ))}
      </div>
    </section>
  )
}

export default PopularTreks
