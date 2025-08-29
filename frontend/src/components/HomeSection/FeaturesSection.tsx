import { motion } from 'framer-motion'
import {
  Users,
  Shield,
  Trophy,
  CalendarCheck,
  Star,
  HeartHandshake
} from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: <Users className='h-6 w-6' />,
    title: 'Expert Guides',
    description: 'Local Sherpa guides with decades of mountain experience'
  },
  {
    icon: <Shield className='h-6 w-6' />,
    title: 'High Standard of Safety',
    description: 'Strict safety protocols for every trek, every time'
  },
  {
    icon: <Trophy className='h-6 w-6' />,
    title: 'Top-Notch Service',
    description: 'From gear to guides, expect excellence throughout'
  },
  {
    icon: <CalendarCheck className='h-6 w-6' />,
    title: 'Guaranteed Departures',
    description: 'Your trip happens once booked, no last-minute cancellations'
  },
  {
    icon: <Star className='h-6 w-6' />,
    title: 'Best Routes',
    description:
      "Carefully selected trails showcasing Nepal's finest landscapes"
  },
  {
    icon: <HeartHandshake className='h-6 w-6' />,
    title: 'Socially Responsible',
    description: 'We support local communities and protect natural heritage'
  }
]

const FeaturesSection = () => {
  return (
    <section className='py-24 bg-[url("/trekking-bg.jpg")] bg-cover bg-center bg-no-repeat relative z-10'>
      <div className='absolute inset-0 bg-black bg-opacity-60 z-0' />
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className='text-4xl font-bold text-white mb-4'>Why Choose Us</h2>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
            We provide exceptional trekking experiences with unmatched safety,
            expertise, and heart
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className='text-center p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='bg-orange-100 text-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-md'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                {feature.title}
              </h3>
              <p className='text-gray-700'>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className='mt-12 flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            to='/about'
            className='bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center group'
          >
            Find Out More
            <motion.div
              whileHover={{ x: 4 }}
              className='ml-2 transition-transform'
            >
              <svg
                className='h-5 w-5 group-hover:translate-x-1'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
