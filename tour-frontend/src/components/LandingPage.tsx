import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <section className='relative h-screen flex items-center justify-center overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      >
        <div className='absolute inset-0 bg-black/40' />
      </div>

      <motion.div
        className='relative z-10 text-center text-white max-w-4xl px-4'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className='text-5xl md:text-7xl font-bold mb-6 leading-tight'>
          Discover the
          <span className='text-orange-400 block'>Himalayas</span>
        </h1>
        <p className='text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed'>
          Experience Nepal's breathtaking mountain trails with expert local
          guides and unforgettable adventures
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            to='/destination'
            className='bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center group'
          >
            Explore Packages
            <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
          </Link>
          <Link
            to='/contact'
            className='border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300'
          >
            Plan Your Trek
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

export default LandingPage