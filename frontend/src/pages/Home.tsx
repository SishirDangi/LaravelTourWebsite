import HeroSection from '../components/HomeSection/HeroSection'
import FeaturesSection from '../components/HomeSection/FeaturesSection'
import TestimonialsSection from '../components/HomeSection/TestimonialsSection'
import CallToAction from '../components/HomeSection/CallToAction'
import ServicesSection from '../components/HomeSection/ServicesSection'
import PopularTreks from '../components/Trekking region/PopularTreks'
import AdventurePicker from '../components/HomeSection/AdventurePicker'

import BlogCard from '../components/BlogCard'
import { blogPosts } from '../data/blogData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  const latestBlogs = [...blogPosts].reverse().slice(0, 3)

  return (
    <>
      <HeroSection />
      <AdventurePicker />
      <ServicesSection />
      <PopularTreks />
      <FeaturesSection />
      <CallToAction />
      <TestimonialsSection />

      {/* 🚀 Latest Blog Section */}
      <section className='py-16 bg-orange-50' id='latest-blogs'>
        <div className='container mx-auto px-4'>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-3xl md:text-4xl font-bold text-center text-[#1E293B] mb-12'
          >
            Blog
          </motion.h2>

          <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            {latestBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 hover:scale-105 overflow-hidden'
              >
                <BlogCard blog={blog} onClick={() => {}} />
              </motion.div>
            ))}
          </div>

          <div className='text-center mt-10'>
            <Link
              to='/blog'
              className='inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 group'
            >
              View All Blogs →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
