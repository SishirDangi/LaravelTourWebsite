import React from 'react'
import { motion } from 'framer-motion'
import { Award, Users, Mountain, Heart, Shield, Globe } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import ServicesSection from '../components/HomeSection/ServicesSection'
import LocationMap from '../components/LocationMap'

const About = () => {
  const stats = [
    {
      number: '2000+',
      label: 'Happy Trekkers',
      icon: <Users className='h-6 w-6 text-orange-600' />
    },
    {
      number: '15+',
      label: 'Years Experience',
      icon: <Award className='h-6 w-6 text-orange-600' />
    },
    {
      number: '50+',
      label: 'Trekking Routes',
      icon: <Mountain className='h-6 w-6 text-orange-600' />
    },
    {
      number: '25+',
      label: 'Expert Guides',
      icon: <Heart className='h-6 w-6 text-orange-600' />
    }
  ]

  const values = [
    {
      icon: <Shield className='h-8 w-8 text-orange-600' />,
      title: 'Safety First',
      description:
        'We prioritize your safety with comprehensive protocols, experienced guides, and emergency preparedness on every trek.'
    },
    {
      icon: <Heart className='h-8 w-8 text-orange-600' />,
      title: 'Local Community',
      description:
        'Supporting local Sherpa communities through fair employment and sustainable tourism practices that benefit everyone.'
    },
    {
      icon: <Globe className='h-8 w-8 text-orange-600' />,
      title: 'Environmental Care',
      description:
        "Committed to preserving Nepal's pristine mountain environment through responsible trekking and Leave No Trace principles."
    }
  ]

  const team = [
    {
      name: 'Pemba Sherpa',
      role: 'Lead Guide & Founder',
      experience: '20+ years',
      image:
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description:
        'Born in the Everest region, Pemba has summited Everest 8 times and led over 500 successful treks.'
    },
    {
      name: 'Mingma Sherpa',
      role: 'Senior Guide',
      experience: '15+ years',
      image:
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description:
        'Expert in Annapurna and Langtang regions with extensive knowledge of local culture and wildlife.'
    },
    {
      name: 'Dawa Sherpa',
      role: 'Mountain Guide',
      experience: '12+ years',
      image:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description:
        'Specialist in high-altitude trekking with certifications in wilderness first aid and rescue operations.'
    }
  ]

  return (
    <div className='pt-16'>
      <SectionHeader
        title='About Himalaya Trekking'
        description="For over 15 years, we've been sharing the magic of Nepal's mountains with adventurers from around the world. Our passion for the Himalayas and commitment to authentic experiences sets us apart."
        backgroundImage='https://media.audleytravel.com/-/media/images/home/indian-subcontinent/regional-guides/india-to-nepal-where-to-go-in-the-himalaya/istock_540840250_nepal_himalaya_mt_everest_3000x1000.jpg?q=79&w=1920&h=685'
      />

      {/* Stats Section */}
      <section className='py-16 bg-orange-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className='text-center'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='bg-white shadow-md rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                  {stat.icon}
                </div>
                <div className='text-3xl font-bold text-gray-800 mb-2'>
                  {stat.number}
                </div>
                <div className='text-gray-600 font-medium'>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className='text-4xl font-bold text-gray-800 mb-6'>
                Our Story
              </h2>
              <div className='space-y-6 text-gray-600 leading-relaxed'>
                <p>
                  Founded in 2009 by Pemba Sherpa, Himalaya Trekking began as a
                  dream to share the incredible beauty and culture of Nepal's
                  mountains with the world.
                </p>
                <p>
                  What started as a small operation with just two guides has
                  grown into one of Nepal's most trusted trekking companies.
                </p>
                <p>
                  Today, our team of certified guides continues to create
                  life-changing experiences combining safety, knowledge, and
                  hospitality.
                </p>
              </div>
            </motion.div>
            <motion.div
              className='relative'
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src='https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                alt='Mountain landscape'
                className='rounded-xl shadow-2xl'
              />
              <div className='absolute -bottom-6 -left-6 bg-orange-600 text-white p-6 rounded-xl shadow-lg'>
                <div className='text-2xl font-bold'>15+</div>
                <div className='text-sm'>Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Team Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-4xl font-bold text-gray-800 mb-4'>
              Meet Our Expert Team
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Our experienced guides bring decades of mountain expertise and
              deep cultural knowledge to every trek.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-3 gap-8'>
            {team.map((member, index) => (
              <motion.div
                key={index}
                className='text-center group'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='relative mb-6'>
                  <img
                    src={member.image}
                    alt={member.name}
                    className='w-48 h-48 rounded-full object-cover mx-auto shadow-md group-hover:shadow-xl transition-shadow duration-300'
                  />
                  <div className='absolute bottom-4 right-1/2 transform translate-x-1/2 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                    {member.experience}
                  </div>
                </div>
                <h3 className='text-xl font-bold text-gray-800 mb-2'>
                  {member.name}
                </h3>
                <p className='text-orange-600 font-semibold mb-4'>
                  {member.role}
                </p>
                <p className='text-gray-600 leading-relaxed'>
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-4xl font-bold mb-6'>Our Mission</h2>
            <p className='text-xl leading-relaxed text-orange-100 mb-8'>
              To provide transformative mountain experiences that connect people
              with Nepal's natural beauty and rich culture, while supporting
              local communities and preserving the pristine environment for
              future generations.
            </p>
            <div className='grid md:grid-cols-3 gap-8 text-center'>
              <div>
                <div className='text-3xl font-bold text-white mb-2'>100%</div>
                <div>Local Guides</div>
              </div>
              <div>
                <div className='text-3xl font-bold text-white mb-2'>0</div>
                <div>Accidents Record</div>
              </div>
              <div>
                <div className='text-3xl font-bold text-white mb-2'>24/7</div>
                <div>Support Available</div>
              </div>
            </div>
          </motion.div>
        </div>
        <LocationMap />
      </section>
    </div>
  )
}

export default About
