import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  country: string
  rating: number
  text: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    country: 'United States',
    rating: 5,
    text: 'An absolutely incredible experience! The guides were knowledgeable and the views were breathtaking.',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Marco Rodriguez',
    country: 'Spain',
    rating: 5,
    text: 'Professional service and amazing trekking routes. Highly recommend for anyone visiting Nepal!',
    image:
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Lisa Chen',
    country: 'Australia',
    rating: 5,
    text: 'The trip of a lifetime! Every detail was perfectly planned and executed.',
    image:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
]

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-7 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 relative z-10">

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className='text-5xl font-bold text-white mb-4'>What Our Trekkers Say</h2>
          <p className='text-xl text-gray-200 max-w-2xl mx-auto'>
            Real experiences from adventurers who explored Nepal’s mountains with us
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className='bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-gray-800'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='flex items-center mb-6'>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className='w-12 h-12 rounded-full object-cover mr-4 border-2 border-orange-500'
                />
                <div>
                  <h4 className='font-semibold text-lg'>{testimonial.name}</h4>
                  <p className='text-sm text-gray-500'>{testimonial.country}</p>
                </div>
              </div>
              <div className='flex mb-4'>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className='h-5 w-5 text-yellow-400 fill-yellow-400'
                  />
                ))}
              </div>
              <p className='text-gray-700 leading-relaxed italic'>
                “{testimonial.text}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
