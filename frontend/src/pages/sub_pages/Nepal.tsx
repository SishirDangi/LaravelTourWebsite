import React from 'react'
import { motion } from 'framer-motion'
import Everest from '../../components/Trekking region/Everest'
import Annapurna from '../../components/Trekking region/Annapurna'
import Langtang from '../../components/Trekking region/Langtang'
import WildernessTrekking from '../../components/Trekking region/WildernessTrekking'
import ShortEasyTrek from '../../components/Trekking region/ShortEasyTrek'
import DayHiking from '../../components/Trekking region/DayHiking'
import SectionHeader from '../../components/SectionHeader'
import PeakClimbing from '../../components/Trekking region/PeakClimbing'

const Nepal = () => {
  return (
    <>
      {/* Header Section */}
      <SectionHeader
        title='About Himalaya Trekking'
        description="For over 15 years, we've been sharing the magic of Nepal's mountains with adventurers from around the world. Our passion for the Himalayas and commitment to authentic experiences sets us apart."
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
            Explore Nepal
          </h1>
          <p className='text-gray-700 max-w-2xl mx-auto text-lg'>
            Nepal is a country of natural beauty, rich culture, and adventure.
            Home to the world’s highest peaks, including Mount Everest, it
            offers trekkers unforgettable journeys through diverse landscapes,
            remote villages, and spiritual heritage.
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
            alt='Nepal Mountains'
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
            Trekking in Nepal is more than just walking through mountains — it’s
            a deep dive into the spirit of the Himalayas. With trails passing
            through Sherpa villages, Buddhist monasteries, and glacial rivers,
            Nepal offers a unique combination of natural grandeur and cultural
            depth.
          </p>
          <p>
            The most famous trekking regions include Everest, Annapurna, and
            Langtang, each offering unique terrain, flora, fauna, and ethnic
            experiences. Whether you're a beginner looking for a short and easy
            hike, or a seasoned trekker seeking challenging high-altitude
            adventures, Nepal has something for everyone.
          </p>
          <p>
            Beyond trekking, Nepal invites you to discover ancient temples in
            Kathmandu, safari adventures in Chitwan, and tranquil lakeside
            escapes in Pokhara. With warm hospitality and breathtaking vistas at
            every turn, your journey in Nepal will leave lifelong memories.
          </p>
        </motion.div>

        {/* Everest Packages Section */}
        <div className='mt-16'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl font-semibold text-orange-700 mb-6 text-center'
          >
            Popular Treks in the Everest Region
          </motion.h2>
          <Everest />
        </div>

        {/* Annapurna Packages Section */}
        <div className='mt-16'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl font-semibold text-orange-700 mb-6 text-center'
          >
            Popular Treks in the Annapurna Region
          </motion.h2>
          <Annapurna />
        </div>

        {/* Langtang Packages Section */}
        <div className='mt-16'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl font-semibold text-orange-700 mb-6 text-center'
          >
            Popular Treks in the Langtang Region
          </motion.h2>
          <Langtang />
        </div>

        {/* Wilderness Trekking Section */}
        <div className='mt-16'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl font-semibold text-orange-700 mb-6 text-center'
          >
            Popular Treks in the Wilderness Trekking
          </motion.h2>
          <WildernessTrekking />
        </div>

        {/* Short & Easy Trek Section */}
        <div className='mt-16'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl font-semibold text-orange-700 mb-6 text-center'
          >
            Popular Short & Easy Trekking
          </motion.h2>
          <ShortEasyTrek />
        </div>

        {/* Peak Climbing Section */}
        <div className='mt-16'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl font-semibold text-orange-700 mb-6 text-center'
          >
            Peak Climbing in Nepal
          </motion.h2>
          <PeakClimbing />
        </div>

        {/* Day Hiking Section */}
        <div className='mt-16'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl font-semibold text-orange-700 mb-6 text-center'
          >
            Popular Day Hiking
          </motion.h2>
          <DayHiking />
        </div>
      </div>
    </>
  )
}

export default Nepal
