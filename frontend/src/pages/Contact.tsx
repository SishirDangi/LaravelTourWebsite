import React from 'react'
import { motion } from 'framer-motion'
import BookingForm from '../components/BookingForm'
import VisitOffice from '../components/VisitOffice'
import FAQSection from '../components/FAQSecttion'
import SectionHeader from '../components/SectionHeader'

import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const contactInfo = [
  {
    icon: <Phone className='h-6 w-6 text-orange-600' />,
    title: 'Phone',
    details: ['+977-1-4123456', '+977-9841234567'],
    description: 'Call us anytime for immediate assistance'
  },
  {
    icon: <Mail className='h-6 w-6 text-orange-600' />,
    title: 'Email',
    details: ['info@himalayatrekking.com', 'booking@himalayatrekking.com'],
    description: 'Send us your questions and inquiries'
  },
  {
    icon: <MapPin className='h-6 w-6 text-orange-600' />,
    title: 'Office',
    details: ['Thamel, Kathmandu', 'Nepal'],
    description: 'Visit our office for in-person consultation'
  },
  {
    icon: <Clock className='h-6 w-6 text-orange-600' />,
    title: 'Hours',
    details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat-Sun: 10:00 AM - 4:00 PM'],
    description: "We're here when you need us"
  }
]

const Contact: React.FC = () => (
  <div className='pt-16'>
    {/* Header */}
    <SectionHeader
      title='Contact Us'
      description='Ready to embark on your Himalayan adventure? Get in touch with our expert team to plan your perfect trek.'
      backgroundImage='https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress'
    />

    {/* Contact Info Cards */}
    <section className='py-16 bg-orange-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='bg-orange-100 text-orange-600 rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                {info.icon}
              </div>
              <h3 className='text-lg font-semibold text-[#1E293B] mb-2'>
                {info.title}
              </h3>
              <div className='space-y-1 mb-3'>
                {info.details.map((detail, idx) => (
                  <p key={idx} className='text-[#334155] font-medium'>
                    {detail}
                  </p>
                ))}
              </div>
              <p className='text-[#64748B] text-sm'>{info.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Booking Form & Visit Office */}
    <section className='py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12'>
          <BookingForm />
          <VisitOffice />
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <FAQSection />
  </div>
)

export default Contact
