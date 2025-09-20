import React from 'react'
import {
  Mountain,
  Users,
  Flag,
  Sunrise,
  Sunset,
  Globe,
  Globe2,
  HelpCircle
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Service {
  title: string
  description: string
  icon: React.ReactNode 
}

const services: Service[] = [
  {
    title: 'Group Trek',
    description: 'Join a group and explore the Himalayas together.',
    icon: <Users className='w-8 h-8 text-orange-600' />
  },
  {
    title: 'Peak Climbing',
    description: 'Conquer Nepal’s majestic peaks with expert support.',
    icon: <Mountain className='w-8 h-8 text-orange-600' />
  },
  {
    title: 'Tour',
    description: 'Explore Nepal’s cities, heritage, and culture.',
    icon: <Flag className='w-8 h-8 text-orange-600' />
  },
  {
    title: 'One Day Trek',
    description: 'Short treks for quick Himalayan experiences.',
    icon: <Sunrise className='w-8 h-8 text-orange-600' />
  },
  {
    title: 'One Day Tour',
    description: 'Local guided day tours in Kathmandu and beyond.',
    icon: <Sunset className='w-8 h-8 text-orange-600' />
  },
  {
    title: 'Tibet Tour',
    description: 'Spiritual and cultural journeys across Tibet.',
    icon: <Globe className='w-8 h-8 text-orange-600' />
  },
  {
    title: 'Bhutan Tour',
    description: 'Discover the kingdom of Bhutan with ease.',
    icon: <Globe2 className='w-8 h-8 text-orange-600' />
  },
  {
    title: 'On Demand Trip',
    description: 'Fully customized trips based on your interests.',
    icon: <HelpCircle className='w-8 h-8 text-orange-600' />
  }
]

const ServicesSection: React.FC = () => {
  return (
    <section className='py-7 bg-orange-50' id='services'>
      <div className='container mx-auto px-4'>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-5xl font-bold text-center mb-10 text-orange-700'
        >
          Our Trekking Services
        </motion.h2>

        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className='bg-white rounded-xl p-6 shadow-md text-center hover:shadow-xl transition duration-300 hover:scale-105'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='flex justify-center mb-4'>{service.icon}</div>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                {service.title}
              </h3>
              <p className='text-sm text-gray-600'>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
