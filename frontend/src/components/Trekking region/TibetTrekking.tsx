import React from 'react'
import PackageCard from '../PackagesCard'
import { Calendar, Clock, Users, Mountain, MapPin } from 'lucide-react'

const tibetPackages = [
  {
    id: 1,
    title: 'Kailash Mansarovar Yatra',
    image: 'https://images.pexels.com/photos/6261677/pexels-photo-6261677.jpeg',
    price: 2500,
    badge: 'Spiritual & Adventurous',
    description:
      'A sacred pilgrimage to Mount Kailash and Lake Mansarovar, featuring either overland or helicopter routes.',
    rating: { value: 4.9, reviews: 180 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '12–18 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '6,638 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Group & Private' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Mansarovar, Kailash' }
    ],
    highlights: [
      'Holy dip in Lake Mansarovar',
      'Kailash Parikrama (3 days)',
      'Visit Rakshastal',
      'Choose Overland or Helicopter route'
    ]
  },
  {
    id: 2,
    title: 'Kathmandu to Lhasa Overland Tour',
    image: 'https://images.pexels.com/photos/7565821/pexels-photo-7565821.jpeg',
    price: 1899,
    badge: 'Cultural Journey',
    description:
      'A scenic drive from Kathmandu to Lhasa with stops at monasteries and iconic Tibetan landmarks.',
    rating: { value: 4.8, reviews: 140 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '7–10 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,650 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–15 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Kyirong, Lhasa' }
    ],
    highlights: [
      'Potala Palace & Jokhang Temple',
      'Yamdrok Lake',
      'Optional Everest Base Camp',
      'Tashilhunpo Monastery'
    ]
  },
  {
    id: 3,
    title: 'Lhasa Fly-In Fly-Out Tour',
    image: 'https://images.pexels.com/photos/3960053/pexels-photo-3960053.jpeg',
    price: 1599,
    badge: 'Time Efficient',
    description:
      'Quick and convenient cultural tour to explore the spiritual heart of Tibet – Lhasa.',
    rating: { value: 4.7, reviews: 100 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '4–6 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,650 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Any group size' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Lhasa' }
    ],
    highlights: [
      'Lhasa city tour',
      'Potala Palace',
      'Jokhang Temple',
      'Barkhor Street'
    ]
  },
  {
    id: 4,
    title: 'Lhasa to Everest Base Camp Tour (Tibet Side)',
    image: 'https://images.pexels.com/photos/6308532/pexels-photo-6308532.jpeg',
    price: 2099,
    badge: 'Adventurous',
    description:
      'Travel from Lhasa to the Tibetan side of Everest Base Camp, experiencing majestic views and heritage.',
    rating: { value: 4.9, reviews: 160 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '8–12 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,150 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Small to Medium Group' },
      { icon: <MapPin className='h-4 w-4' />, label: 'EBC North, Tibet' }
    ],
    highlights: [
      'Rongbuk Monastery',
      'Everest North Base Camp',
      'Tibetan Countryside',
      'Panoramic Himalayan Views'
    ]
  }
]

const TibetTrekking = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {tibetPackages.map((pkg, idx) => (
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

export default TibetTrekking
export { tibetPackages }
