import React from 'react'
import PackageCard from '../PackagesCard'
import { Calendar, Users, Mountain, MapPin, Clock } from 'lucide-react'

const everestPackages = [
  {
    id: 1,
    title: 'Everest Base Camp Trek (EBC)',
    image: 'https://images.pexels.com/photos/1171170/pexels-photo-1171170.jpeg',
    price: 1399,
    badge: 'Moderate to Challenging',
    description:
      'Trek to the base of the world’s highest mountain with iconic views and Sherpa hospitality.',
    rating: { value: 4.9, reviews: 320 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '12–14 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,550 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–12 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Everest Region' }
    ],
    highlights: [
      'Tengboche Monastery',
      'Namche Bazaar',
      'Kala Patthar view',
      'EBC'
    ]
  },
  {
    id: 2,
    title: 'Everest Base Camp via Gokyo & Cho La Pass',
    image: 'https://images.pexels.com/photos/2406395/pexels-photo-2406395.jpeg',
    price: 1599,
    badge: 'Challenging',
    description:
      'A scenic and adventurous route combining Gokyo Lakes, Cho La Pass, and Everest Base Camp.',
    rating: { value: 4.8, reviews: 220 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '16–18 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,550 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–10 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Gokyo, Cho La, EBC' }
    ],
    highlights: ['Gokyo Ri', 'Lakes', 'Cho La Pass', 'EBC']
  },
  {
    id: 3,
    title: 'Three Passes Trek',
    image: 'https://images.pexels.com/photos/237216/pexels-photo-237216.jpeg',
    price: 1699,
    badge: 'Very Challenging',
    description:
      'Conquer all three major passes of the Everest region with incredible views and less-trodden trails.',
    rating: { value: 4.9, reviews: 175 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '18–21 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,535 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      {
        icon: <MapPin className='h-4 w-4' />,
        label: 'Kongma La, Cho La, Renjo La'
      }
    ],
    highlights: ['All Three Passes', 'EBC', 'Panoramic Views', 'Remote Trails']
  },
  {
    id: 4,
    title: 'Everest Panorama Trek (Short Trek)',
    image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
    price: 799,
    badge: 'Easy to Moderate',
    description:
      'Short trek with incredible views of Everest, ideal for beginners or time-limited trekkers.',
    rating: { value: 4.6, reviews: 90 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '7–10 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,860 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Tengboche' }
    ],
    highlights: ['Easy Trek', 'Great Views', 'Sherpa Culture']
  },
  {
    id: 5,
    title: 'Everest View Trek (5 Days)',
    image: 'https://images.pexels.com/photos/2671331/pexels-photo-2671331.jpeg',
    price: 699,
    badge: 'Short & Easy',
    description:
      'A compact trek offering fantastic views of Mt. Everest and cultural immersion in Sherpa villages.',
    rating: { value: 4.5, reviews: 65 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '5 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,800 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Any group size' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Namche, Syangboche' }
    ],
    highlights: ['Short Timeframe', 'Namche', 'Scenic Flights']
  },
  {
    id: 6,
    title: 'Everest Base Camp Heli Tour',
    image: 'https://images.pexels.com/photos/2166714/pexels-photo-2166714.jpeg',
    price: 999,
    badge: 'Heli Tour',
    description:
      'A luxury helicopter flight to the Everest region for breathtaking views without trekking.',
    rating: { value: 4.7, reviews: 110 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '1 Day' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,545 m (flyover)' },
      { icon: <Users className='h-4 w-4' />, label: '1–5 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Kala Patthar, Lukla' }
    ],
    highlights: ['Luxury View', 'No Trekking', 'Fastest Everest Experience']
  }
]

const Everest = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {everestPackages.map((pkg, idx) => (
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

export default Everest
export { everestPackages }
