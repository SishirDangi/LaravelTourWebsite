import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../../components/SectionHeader'
import TibetTrekking from '../../components/Trekking region/TibetTrekking'

const Tibet = () => {
  return (
    <>
      <SectionHeader
        title='About Tibet Trekking'
        description='Experience the mystical landscapes and deep-rooted spirituality of Tibet through overland adventures, sacred pilgrimages, and high-altitude treks.'
        backgroundImage='https://www.planholidays.com/wp-content/uploads/2025/06/Potala-Palace-against-a-mountainous-backdrop-Lhasa.webp'
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
            Explore Tibet
          </h1>
          <p className='text-gray-700 max-w-2xl mx-auto text-lg'>
            Tibet, the “Roof of the World,” offers travelers a rare opportunity
            to explore sacred mountains, ancient monasteries, and the vast
            high-altitude plateau that has preserved its unique culture and
            spiritual identity.
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
            src='https://www.aljazeera.com/wp-content/uploads/2021/06/AP21169460729108.jpg?resize=1170%2C780&quality=80'
            alt='Tibet Landscape'
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
            Trekking in Tibet blends adventure with spirituality. From sacred
            lakes and Mt. Kailash pilgrimages to Everest Base Camp on the
            Tibetan side, the region offers some of the world’s most
            extraordinary journeys.
          </p>
          <p>
            The overland route from Kathmandu to Lhasa introduces travelers to
            stunning landscapes and historic monasteries, while fly-in tours to
            Lhasa provide quick access to the heart of Tibetan culture.
          </p>
          <p>
            Whether you’re drawn to the mystical aura of Potala Palace or the
            raw majesty of Everest North Face, Tibet’s trails and traditions
            will leave a lasting impression on your soul.
          </p>
        </motion.div>

        {/* Tibet Packages Section */}
        <div className='mt-16'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl font-semibold text-orange-700 mb-6 text-center'
          >
            Popular Treks & Tours in Tibet
          </motion.h2>
          <TibetTrekking />
        </div>
      </div>
    </>
  )
}

export default Tibet
