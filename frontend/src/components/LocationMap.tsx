import React from 'react'
import { motion } from 'framer-motion'

const LocationMap: React.FC = () => {
  return (
    <section className='py-16 bg-orange-50' id='location'>
      <div className='container mx-auto px-4 max-w-full'>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-3xl md:text-4xl font-bold text-center text-[#1E293B] mb-10'
        >
          📍 Visit Our Office in Hattigauda, Kathmandu
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='rounded-none shadow-lg overflow-hidden w-full mx-auto'
        >
          <iframe
            title='Office Location - Hattigauda Kathmandu'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.784108508725!2d85.32699391528662!3d27.720616476104505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199fc4e47b4f%3A0x74bf4f1fa46d0906!2sHattigauda%20Rd%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1686524220117!5m2!1sen!2snp'
            width='100%'
            height='600'
            loading='lazy'
            allowFullScreen
            referrerPolicy='no-referrer-when-downgrade'
            className='w-full h-[600px] border-0'
          ></iframe>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className='text-center text-gray-700 mt-6 text-lg max-w-3xl mx-auto'
        >
          Our office is located at Hattigauda, Kathmandu – your gateway to
          unforgettable Himalayan trekking experiences. Visit us for expert
          guidance and friendly service.
        </motion.p>
      </div>
    </section>
  )
}

export default LocationMap
