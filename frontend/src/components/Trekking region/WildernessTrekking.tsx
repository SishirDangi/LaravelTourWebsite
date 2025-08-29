import React from 'react'
import PackageCard from '../PackagesCard'
import { Calendar, Users, Mountain, MapPin, Clock } from 'lucide-react'

const wildernessPackages = [
  {
    id: 1,
    title: 'Kanchenjunga Base Camp Trek',
    price: 2199,
    badge: 'Very Challenging',
    description:
      'Remote trek to the base of the world’s third-highest mountain through untouched alpine wilderness.',
    rating: { value: 4.9, reviews: 60 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '20–26 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,143 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–6 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Eastern Nepal' }
    ],
    highlights: [
      'Alpine Wilderness',
      'Rhododendron Forests',
      'Remote Cultures'
    ],
    image: 'https://images.pexels.com/photos/750259/pexels-photo-750259.jpeg'
  },
  {
    id: 2,
    title: 'Makalu Base Camp Trek',
    price: 1999,
    badge: 'Challenging',
    description:
      'Wild and remote trek with dramatic Himalayan views of Everest, Lhotse, and Makalu.',
    rating: { value: 4.7, reviews: 45 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '18–22 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,000 m+' },
      { icon: <Users className='h-4 w-4' />, label: 'Small groups' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Eastern Nepal' }
    ],
    highlights: ['Glaciers', 'Biodiversity', 'Wilderness'],
    image: 'https://images.pexels.com/photos/2406395/pexels-photo-2406395.jpeg'
  },
  {
    id: 3,
    title: 'Rolwaling Valley Trek',
    price: 1899,
    badge: 'Very Challenging',
    description:
      'Cross the Tashi Lapcha Pass into the Everest region with spectacular views and solitude.',
    rating: { value: 4.8, reviews: 50 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '13–20 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,755 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–5 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Central–Eastern Nepal' }
    ],
    highlights: ['Tsho Rolpa Lake', 'Sacred Landscapes', 'Remote Villages'],
    image: 'https://images.pexels.com/photos/237216/pexels-photo-237216.jpeg'
  },
  {
    id: 4,
    title: 'Dhaulagiri Circuit Trek',
    price: 2099,
    badge: 'Very Challenging',
    description:
      'True wilderness camping trek crossing French and Dhampus passes in western Nepal.',
    rating: { value: 4.7, reviews: 40 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '18–22 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,360 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–6 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Western Nepal' }
    ],
    highlights: ['Glaciers', 'Passes', 'Remote Base Camps'],
    image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg'
  },
  {
    id: 5,
    title: 'Upper Dolpo Trek',
    price: 2499,
    badge: 'Very Challenging',
    description:
      'Venture into the remote Buddhist landscapes of Dolpo, with crystal lakes and high passes.',
    rating: { value: 4.9, reviews: 38 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '21–28 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,190 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Small groups only' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Mid-Western Nepal' }
    ],
    highlights: ['Phoksundo Lake', 'Bon Culture', 'Desert Landscapes'],
    image: 'https://images.pexels.com/photos/301892/pexels-photo-301892.jpeg'
  },
  {
    id: 6,
    title: 'Lower Dolpo Trek',
    price: 1799,
    badge: 'Challenging',
    description:
      'A shorter trek into Dolpo, featuring alpine lakes, Gompas, and rare Himalayan wildlife.',
    rating: { value: 4.6, reviews: 33 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '14–18 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,115 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Small groups' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Mid-Western Nepal' }
    ],
    highlights: ['Shey Gompa', 'Wildlife', 'Cultural Sites'],
    image: 'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg'
  },
  {
    id: 7,
    title: 'Rara Lake Trek',
    price: 999,
    badge: 'Moderate',
    description:
      'Trek to Nepal’s largest lake surrounded by pristine forests, alpine meadows, and tranquility.',
    rating: { value: 4.7, reviews: 55 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '9–12 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,710 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Any group size' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Far-Western Nepal' }
    ],
    highlights: ['Rara Lake', 'Forests & Meadows', 'Peaceful Trails'],
    image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg'
  },
  {
    id: 8,
    title: 'Guerrilla Trek',
    price: 849,
    badge: 'Moderate',
    description:
      'Follow historical trails through remote Magar and Kham communities in rugged western Nepal.',
    rating: { value: 4.5, reviews: 28 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '14–18 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '~3,000 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Local guides only' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Rolpa, Rukum' }
    ],
    highlights: ['Rural Nepal', 'Cultural Encounters', 'Historic Routes'],
    image: 'https://images.pexels.com/photos/1171170/pexels-photo-1171170.jpeg'
  },
  {
    id: 9,
    title: 'Tsum Valley Trek',
    price: 1199,
    badge: 'Moderate to Challenging',
    description:
      'Sacred valley filled with Tibetan monasteries, yak herders, and a peaceful spiritual vibe.',
    rating: { value: 4.6, reviews: 35 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '14–18 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,700 m+' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Gorkha (Manaslu)' }
    ],
    highlights: ['Hidden Valley', 'Monasteries', 'Can Combine w/ Manaslu'],
    image: 'https://images.pexels.com/photos/2166714/pexels-photo-2166714.jpeg'
  },
  {
    id: 10,
    title: 'Api Himal Base Camp Trek',
    price: 1299,
    badge: 'Moderate to Challenging',
    description:
      'One of the most untouched and scenic treks in far-west Nepal, with alpine meadows and waterfalls.',
    rating: { value: 4.5, reviews: 30 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '15–18 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '~4,000 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Small group trek' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Darchula District' }
    ],
    highlights: ['Meadows & Waterfalls', 'No Crowds', 'Pristine Scenery'],
    image: 'https://images.pexels.com/photos/2671331/pexels-photo-2671331.jpeg'
  },
  {
    id: 11,
    title: 'Bajura–Badimalika Trek',
    price: 999,
    badge: 'Moderate',
    description:
      'Pilgrimage route through Bajura’s flower-strewn hills and mountain viewpoints.',
    rating: { value: 4.4, reviews: 25 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '10–14 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '~4,200 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Far-Western Nepal' }
    ],
    highlights: ['Badimalika Temple', 'Flower Meadows', 'Cultural Landscape'],
    image: 'https://images.pexels.com/photos/301892/pexels-photo-301892.jpeg'
  }
]

const WildernessTrekking = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {wildernessPackages.map((pkg, idx) => (
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

export default WildernessTrekking
export { wildernessPackages }
