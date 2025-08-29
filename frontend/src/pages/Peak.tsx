import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import PeakClimbing from '../components/Trekking region/PeakClimbing'

const Peak = () => {
  return (
    <>
      <SectionHeader
        title='Peak Climbing Adventures in Nepal'
        description='Test your limits and summit Nepal’s most iconic trekking peaks — from Mera to Island Peak — with expert guides and breathtaking Himalayan backdrops.'
        backgroundImage='https://media.audleytravel.com/-/media/images/home/indian-subcontinent/regional-guides/india-to-nepal-where-to-go-in-the-himalaya/istock_540840250_nepal_himalaya_mt_everest_3000x1000.jpg?q=79&w=1920&h=685'
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
            Conquer Nepal’s Iconic Peaks
          </h1>
          <p className='text-gray-700 max-w-2xl mx-auto text-lg'>
            Nepal offers thrilling opportunities for climbers seeking technical
            challenges and scenic rewards. These peaks — ideal for beginners to
            experienced alpinists — lie amidst the world’s most spectacular
            mountains.
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
            src='https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg'
            alt='Mera Peak Climb'
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
            Peak climbing in Nepal blends high-altitude trekking with alpine
            mountaineering. Popular peaks like Island Peak, Mera Peak, and
            Lobuche East provide stepping stones into the world of Himalayan
            climbing.
          </p>
          <p>
            These expeditions often include acclimatization treks through Sherpa
            villages, high passes, and pristine valleys. Whether in the Everest,
            Annapurna, Langtang, or Dhaulagiri regions, climbers are rewarded
            with unparalleled views and life-changing achievements.
          </p>
          <p>
            Our licensed guides, quality equipment, and well-planned itineraries
            ensure your journey is both safe and unforgettable. Embark on your
            climbing dream — stand atop Nepal’s most beautiful peaks!
          </p>
        </motion.div>

        {/* Peak Climbing Packages Section */}
        <div className='mt-16'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl font-semibold text-orange-700 mb-6 text-center'
          >
            Popular Peak Climbing Packages
          </motion.h2>
          <PeakClimbing />
        </div>
      </div>
    </>
  )
}

export default Peak
