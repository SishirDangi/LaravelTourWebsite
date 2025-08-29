import React from 'react'
import PackageCard from '../PackagesCard'
import { Calendar, Users, Mountain, MapPin, Clock } from 'lucide-react'

const shortEasyTreks = [
  {
    id: 1,
    title: 'Ghorepani Poon Hill Trek',
    image: 'https://images.pexels.com/photos/2406395/pexels-photo-2406395.jpeg',
    price: 299,
    badge: 'Easy to Moderate',
    description:
      'Short scenic trek to Poon Hill with sunrise over the Annapurna and Dhaulagiri ranges.',
    rating: { value: 4.8, reviews: 210 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '3–5 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,210 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Any group size' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Annapurna (Pokhara)' }
    ],
    highlights: [
      'Poon Hill Sunrise',
      'Gurung & Magar Villages',
      'Spring Blooms'
    ]
  },
  {
    id: 2,
    title: 'Dhampus Australian Camp Trek',
    image: 'https://images.pexels.com/photos/2166714/pexels-photo-2166714.jpeg',
    price: 199,
    badge: 'Easy',
    description:
      'Quick escape near Pokhara with amazing views and beginner-friendly trails.',
    rating: { value: 4.7, reviews: 130 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '2–3 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '2,100 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Beginner-friendly' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Annapurna Foothills' }
    ],
    highlights: ['Australian Camp', 'Sunrise Views', 'Short & Easy']
  },
  {
    id: 3,
    title: 'Ghandruk Village Trek',
    image: 'https://images.pexels.com/photos/1171170/pexels-photo-1171170.jpeg',
    price: 249,
    badge: 'Easy',
    description:
      'Cultural trek to one of the most beautiful Gurung villages with mountain backdrops.',
    rating: { value: 4.6, reviews: 160 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '2–4 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '2,012 m' },
      { icon: <Users className='h-4 w-4' />, label: 'All age groups' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Annapurna (Pokhara)' }
    ],
    highlights: ['Gurung Culture', 'Traditional Houses', 'Mountain Views']
  },
  {
    id: 4,
    title: 'Panchase Trek',
    image: 'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg',
    price: 259,
    badge: 'Easy',
    description:
      'Peaceful trek through forests and villages with panoramic Himalayan views.',
    rating: { value: 4.5, reviews: 90 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '3–5 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '2,500 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Solo or group' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Annapurna (Pokhara)' }
    ],
    highlights: ['Quiet Trails', 'Village Life', 'Annapurna Views']
  },
  {
    id: 5,
    title: 'Royal Trek',
    image: 'https://images.pexels.com/photos/301892/pexels-photo-301892.jpeg',
    price: 229,
    badge: 'Easy',
    description:
      'Follow in the footsteps of royalty on this low-altitude cultural trek.',
    rating: { value: 4.4, reviews: 70 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '3–4 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '1,730 m' },
      { icon: <Users className='h-4 w-4' />, label: 'All levels' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Annapurna (Pokhara)' }
    ],
    highlights: ['Village Culture', 'Low Altitude', 'Royal Route']
  },
  {
    id: 6,
    title: 'Nagarkot – Chisapani Trek',
    image: 'https://images.pexels.com/photos/2671331/pexels-photo-2671331.jpeg',
    price: 219,
    badge: 'Easy',
    description:
      'Valley rim trek with beautiful sunrise and distant views of Everest and Langtang.',
    rating: { value: 4.6, reviews: 88 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '2–4 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '2,200 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Any group size' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Kathmandu Valley' }
    ],
    highlights: ['Valley Views', 'Near Kathmandu', 'Easy Access']
  },
  {
    id: 7,
    title: 'Shivapuri Hike',
    image: 'https://images.pexels.com/photos/750259/pexels-photo-750259.jpeg',
    price: 99,
    badge: 'Easy to Moderate',
    description:
      'National park day hike with wildlife and Himalayan vistas from Shivapuri Peak.',
    rating: { value: 4.7, reviews: 110 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '1–2 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '2,732 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Solo or guided' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Kathmandu' }
    ],
    highlights: ['Wildlife', 'Temple Start', 'National Park']
  },
  {
    id: 8,
    title: 'Namobuddha – Dhulikhel Trek',
    image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg',
    price: 129,
    badge: 'Easy',
    description:
      'Spiritual walk through rural hills and sacred Buddhist sites near Kathmandu.',
    rating: { value: 4.5, reviews: 95 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '1–3 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '1,800 m' },
      { icon: <Users className='h-4 w-4' />, label: 'All types' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Kathmandu Valley' }
    ],
    highlights: ['Peaceful Walk', 'Pilgrimage Site', 'Spiritual Vibes']
  },
  {
    id: 9,
    title: 'Sarangkot – Naudanda Hike',
    image: 'https://images.pexels.com/photos/237216/pexels-photo-237216.jpeg',
    price: 69,
    badge: 'Very Easy',
    description:
      'Short day hike from Pokhara to enjoy sunrise and sweeping Annapurna views.',
    rating: { value: 4.6, reviews: 85 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '1 Day' },
      { icon: <Mountain className='h-4 w-4' />, label: '1,600 m' },
      { icon: <Users className='h-4 w-4' />, label: 'All levels' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Pokhara' }
    ],
    highlights: ['Sunrise Point', 'Mountain Views', 'Short Trip']
  },
  {
    id: 10,
    title: 'Balthali Village Trek',
    image: 'https://images.pexels.com/photos/1171170/pexels-photo-1171170.jpeg',
    price: 149,
    badge: 'Easy',
    description:
      'Tranquil cultural trek through farming villages near Namobuddha and Panauti.',
    rating: { value: 4.5, reviews: 78 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '2–3 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '1,730 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Any group size' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Kathmandu Valley' }
    ],
    highlights: ['Village Culture', 'Terraced Farms', 'Peaceful Atmosphere']
  }
]

const ShortEasyTrek = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {shortEasyTreks.map((pkg, idx) => (
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

export default ShortEasyTrek
