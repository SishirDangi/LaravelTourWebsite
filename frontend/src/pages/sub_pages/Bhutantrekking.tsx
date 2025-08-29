import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../../components/SectionHeader'
import Bhutan from '../../components/Trekking region/Bhutan'

const Bhutantrekking = () => {
  return (
    <>
      <SectionHeader
        title='About Bhutan Trekking'
        description='Discover the spiritual kingdom of Bhutan through immersive treks across pristine landscapes, alpine lakes, and remote Himalayan villages.'
        backgroundImage='https://snowcattravel.wordpress.com/wp-content/uploads/2021/12/trekking-in-bhutan33.jpg?w=1024'
      />

      <div className='bg-orange-50 min-h-screen py-10 px-4 md:px-10'>
        {/* {Intro Section} */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-10'
        >
          <h1 className='text-4xl font-bold text-orange-700 mb-4'>
            Explore Bhutan
          </h1>
          <p className='text-gray-700 max-w-2xl mx-auto text-lg'>
            Bhutan offers a rare blend of natural beauty, spiritual culture, and
            rugged trekking trails. From short scenic walks to the legendary
            Snowman Trek, Bhutan is a hidden gem for adventurous travelers.
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
            src='https://bhutantourisms.wordpress.com/wp-content/uploads/2016/11/bhutan-1.jpg?w=975&h=461'
            alt='Bhutan Mountains'
            className='w-full h-[600px] object-cover'
          />
        </motion.div>
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed space-y-6'
        >
          <p>
            Trekking in Bhutan is a deeply spiritual experience. Unlike crowded
            trails elsewhere, Bhutan’s treks take you through untouched
            wilderness, isolated yak herder villages, and sacred monasteries
            perched on cliff edges.
          </p>
          <p>
            Popular treks like the Druk Path, Jomolhari Trek, and Laya Gasa Trek
            offer dramatic views and cultural encounters. The legendary Snowman
            Trek challenges even the most seasoned hikers, traversing remote
            passes above 4,500m.
          </p>
          <p>
            Whether you're seeking an easy nature walk or an epic journey
            through the Himalayas, Bhutan welcomes you with pristine beauty,
            peace, and unique cultural richness.
          </p>
        </motion.div>
        {/* Bhutan Packages Section */}
        <div className='mt-16'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-3xl font-semibold text-orange-700 mb-6 text-center'
          >
            Popular Treks in Bhutan
          </motion.h2>
          <Bhutan />
        </div>
      </div>
    </>
  )
}

export default Bhutantrekking
