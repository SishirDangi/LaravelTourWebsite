import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import TourPackages from '../components/Trekking region/TourPackages'

const Tour = () => {
  return (
    <>
      <SectionHeader
        title='Cultural & Wildlife Tours in Nepal'
        description='Discover the rich cultural tapestry, sacred sites, and pristine natural beauty of Nepal through immersive guided tours, heritage walks, jungle safaris, and spiritual circuits.'
        backgroundImage='https://www.tourmyindia.com/packages-tour-india/wildlife-tour-packages/image/wildlife-tour-nepal.webp'
      />

      <div className='bg-orange-50 min-h-screen py-10 px-4 md:px-10'>
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-10'
        >
          <h1 className='text-4xl font-bold text-orange-700 mb-4'>
            Explore Nepal Culturally & Naturally
          </h1>
          <p className='text-gray-700 max-w-2xl mx-auto text-lg'>
            From centuries-old heritage sites and sacred temples to lush jungles
            teeming with wildlife, Nepal is a land of diverse experiences.
            Whether it’s ancient cities like Bhaktapur or safaris in Chitwan,
            this country offers timeless journeys.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mb-10 max-w-6xl mx-auto rounded-xl overflow-hidden shadow-md'
        >
          <img
            src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/ef/5d/cb/pashupatinath-kathmandu.jpg?w=500&h=500&s=1'
            alt='Nepal Cultural Site'
            className='w-full h-[600px] object-cover'
          />
        </motion.div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed space-y-6'
        >
          <p>
            These tours blend history, spirituality, nature, and local
            interaction. Visit UNESCO World Heritage Sites, observe sacred
            rituals, walk through ancient alleys, and unwind in serene natural
            settings. Combine culture with nature for a complete Nepali
            experience.
          </p>
          <p>
            Enjoy sunrise over the Himalayas, witness centuries-old festivals,
            and encounter endangered species on safari. Whether you’re a culture
            enthusiast, spiritual seeker, or nature lover — these journeys offer
            unforgettable perspectives of Nepal.
          </p>
        </motion.div>

        {/* Tour Packages Section */}
        <div className='mt-16'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl font-semibold text-orange-700 mb-6 text-center'
          >
            Featured Tour Packages
          </motion.h2>
          <TourPackages />
        </div>
      </div>
    </>
  )
}

export default Tour
