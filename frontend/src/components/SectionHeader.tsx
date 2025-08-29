import React from 'react'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  description: string
  backgroundImage: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  backgroundImage
}) => {
  return (
    <section
      className='text-white pt-32 pb-20 bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='py-12'>
        {' '}
        {/* Removed bg-black/60 */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className='text-5xl font-bold mb-6'>{title}</h1>
            <p className='text-xl max-w-3xl mx-auto leading-relaxed'>
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SectionHeader
