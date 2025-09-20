import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CallToAction: React.FC = () => {
  return (
    <section
      className='relative h-[80vh] bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage:
          "url('https://www.muchbetteradventures.com/magazine/content/images/2024/04/Piuquenes15_Argentina_AndesVertical.jpg')"
      }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black bg-opacity-60'></div>

      {/* Content */}
      <motion.div
        className='relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className='text-5xl sm:text-5xl font-bold mb-4'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Ready for Your Adventure?
        </motion.h2>
        <motion.p
          className='text-lg sm:text-xl mb-6 max-w-2xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Join one of our guided treks and explore the beauty of Nepal with
          experts.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Link
            to='/contact'
            className='inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 group'
          >
            Book a Trek
            <svg
              className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CallToAction
