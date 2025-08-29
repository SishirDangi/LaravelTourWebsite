// components/PackageCard.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { Star, User, CalendarDays } from 'lucide-react'

interface PackageCardProps {
  index?: number
  image: string
  price?: number // optional for blog use
  badge?: string // optional for blog use
  title: string
  description: string
  rating?: {
    value: number
    reviews: number
  }
  details?: { icon: JSX.Element; label: string }[]
  highlights?: string[]
  actions?: React.ReactNode
  author: string
  publishedAt: string
}

const PackageCard: React.FC<PackageCardProps> = ({
  index = 0,
  image,
  price,
  badge,
  title,
  description,
  rating,
  details = [],
  highlights = [],
  actions,
  author,
  publishedAt
}) => {
  return (
    <motion.div
      className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      layout
    >
      <div className='relative overflow-hidden'>
        <img
          src={image}
          alt={title}
          className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500'
        />

        {price !== undefined && (
          <div className='absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>
            ${price}
          </div>
        )}

        {badge && (
          <div className='absolute bottom-4 left-4 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold'>
            {badge}
          </div>
        )}
      </div>

      <div className='p-6'>
        <h3 className='text-xl font-bold text-gray-900 mb-1'>{title}</h3>

        <div className='flex items-center gap-4 text-gray-500 text-sm mb-3'>
          <div className='flex items-center gap-1'>
            <User className='w-4 h-4' />
            {author}
          </div>
          <div className='flex items-center gap-1'>
            <CalendarDays className='w-4 h-4' />
            {publishedAt}
          </div>
        </div>

        <p className='text-gray-600 text-sm mb-4 leading-relaxed'>
          {description}
        </p>

        {details.length > 0 && (
          <div className='grid grid-cols-2 gap-4 mb-4 text-sm'>
            {details.map((detail, i) => (
              <div key={i} className='flex items-center text-gray-600'>
                <span className='mr-2'>{detail.icon}</span>
                {detail.label}
              </div>
            ))}
          </div>
        )}

        {highlights.length > 0 && (
          <div className='mb-4'>
            <h4 className='font-semibold text-gray-900 mb-2'>Highlights:</h4>
            <div className='flex flex-wrap gap-1'>
              {highlights.slice(0, 2).map((highlight, idx) => (
                <span
                  key={idx}
                  className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'
                >
                  {highlight}
                </span>
              ))}
              {highlights.length > 2 && (
                <span className='text-xs text-gray-500'>
                  +{highlights.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {rating && (
          <div className='flex items-center mb-4'>
            <Star className='h-4 w-4 text-yellow-400 fill-current' />
            <span className='ml-1 text-sm font-semibold'>{rating.value}</span>
            <span className='ml-1 text-sm text-gray-500'>
              ({rating.reviews})
            </span>
          </div>
        )}

        {actions && <div className='flex gap-2'>{actions}</div>}
      </div>
    </motion.div>
  )
}

export default PackageCard
