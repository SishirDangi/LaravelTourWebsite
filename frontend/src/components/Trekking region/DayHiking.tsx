import React from 'react'
import PackageCard from '../PackagesCard'
import { Calendar, Users, Mountain, MapPin, Clock } from 'lucide-react'

const dayHikes = [
  {
    id: 1,
    title: 'Nagarkot Day Hike',
    image: 'https://images.pexels.com/photos/2406395/pexels-photo-2406395.jpeg',
    price: 49,
    badge: 'Easy to Moderate',
    description:
      'Sunrise hike through rural trails with panoramic Himalayan views.',
    rating: { value: 4.7, reviews: 100 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '3–6 hours' },
      { icon: <Mountain className='h-4 w-4' />, label: 'Around 2,175 m' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Kathmandu Valley' }
    ],
    highlights: ['Sunrise', 'Village Trails', 'Panoramic Views']
  },
  {
    id: 2,
    title: 'Shivapuri National Park Hike',
    image: 'https://images.pexels.com/photos/2166714/pexels-photo-2166714.jpeg',
    price: 59,
    badge: 'Moderate',
    description:
      'Hike through jungle trails to Nagi Gompa with views of Ganesh Himal.',
    rating: { value: 4.6, reviews: 80 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '4–7 hours' },
      { icon: <Mountain className='h-4 w-4' />, label: '2,732 m' },
      {
        icon: <MapPin className='h-4 w-4' />,
        label: 'Budhanilkantha / Sundarijal'
      }
    ],
    highlights: ['Forest Trails', 'Wildlife', 'Ganesh Himal View']
  },
  {
    id: 3,
    title: 'Champadevi Hike',
    image: 'https://images.pexels.com/photos/301892/pexels-photo-301892.jpeg',
    price: 45,
    badge: 'Moderate',
    description: 'Hike to spiritual stupa with forest trail and valley views.',
    rating: { value: 4.5, reviews: 60 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '3–5 hours' },
      { icon: <Mountain className='h-4 w-4' />, label: '~2,280 m' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Pharping or Taudaha' }
    ],
    highlights: ['Stupa', 'Forest', 'Valley Views']
  },
  {
    id: 4,
    title: 'Sarangkot Sunrise Hike',
    image: 'https://images.pexels.com/photos/237216/pexels-photo-237216.jpeg',
    price: 39,
    badge: 'Easy',
    description: 'Short hike to view sunrise over Annapurna and Machhapuchhre.',
    rating: { value: 4.8, reviews: 150 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '2–4 hours' },
      { icon: <Mountain className='h-4 w-4' />, label: '1,600 m' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Pokhara' }
    ],
    highlights: ['Sunrise', 'Annapurna Range', 'Short Hike']
  },
  {
    id: 5,
    title: 'Peace Pagoda (Shanti Stupa) Hike',
    image: 'https://images.pexels.com/photos/2671331/pexels-photo-2671331.jpeg',
    price: 35,
    badge: 'Easy',
    description: 'Easy hike with views of Pokhara and Annapurna range.',
    rating: { value: 4.7, reviews: 120 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '2–3 hours' },
      { icon: <Mountain className='h-4 w-4' />, label: '~1,100 m' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Pokhara' }
    ],
    highlights: ['Peace Stupa', 'Lake View', 'Easy Access']
  }
  // Add more hikes here as needed
]

const DayHiking = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {dayHikes.map((pkg, idx) => (
          <PackageCard
            key={pkg.id}
            index={idx}
            image={pkg.image}
            price={pkg.price}
            badge={pkg.badge}
            title={pkg.title}
            description={pkg.description}
            rating={pkg.rating}
            details={pkg.details}
            highlights={pkg.highlights}
            actions={
              <>
                <button className='flex-1 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold'>
                  View Details
                </button>
                <button className='px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200'>
                  <Calendar className='h-5 w-5' />
                </button>
              </>
            }
          />
        ))}
      </div>
    </section>
  )
}

export default DayHiking
