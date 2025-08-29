import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const VisitOffice: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className='bg-orange-50 rounded-xl shadow-md overflow-hidden h-full max-w-lg mx-auto'
  >
    <div className='h-64 bg-orange-100 relative'>
      <img
        src='https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
        alt='Office location in Kathmandu'
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-orange-600/30 flex items-center justify-center'>
        <div className='text-center text-white'>
          <MapPin className='h-12 w-12 mx-auto mb-2' />
          <h3 className='text-xl font-bold'>Visit Our Office</h3>
          <p>Hattigauda, Jathmadu, Nepal</p>
        </div>
      </div>
    </div>

    <div className='p-8'>
      <h3 className='text-2xl font-bold text-[#1E293B] mb-6'>Visit Us</h3>
      <div className='space-y-6 text-[#334155]'>
        <div>
          <h4 className='font-semibold text-[#1E293B] mb-2'>Office Address</h4>
          <p>
            Himalaya Trekking Pvt. Ltd.
            <br />
            Hattigauda, Jathmadu
            <br />
            Kathmandu 44600, Nepal
          </p>
        </div>

        <div>
          <h4 className='font-semibold text-[#1E293B] mb-2'>Business Hours</h4>
          <div className='space-y-1'>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <div>
          <h4 className='font-semibold text-[#1E293B] mb-2'>
            Emergency Contact
          </h4>
          <p>
            24/7 Emergency Hotline:
            <br />
            <span className='font-semibold text-orange-600'>
              +977-9841234567
            </span>
          </p>
        </div>

        <div className='bg-orange-100 p-4 rounded-lg'>
          <h4 className='font-semibold text-orange-700 mb-2'>
            Free Consultation
          </h4>
          <p className='text-orange-600 text-sm'>
            Drop by our office for a free consultation about your trekking
            plans. Our experts are always happy to help you choose the perfect
            adventure.
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default VisitOffice;