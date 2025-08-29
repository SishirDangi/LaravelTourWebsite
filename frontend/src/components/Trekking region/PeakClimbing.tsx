import React from 'react'
import PackageCard from '../PackagesCard'
import { Calendar, Users, Mountain, MapPin, Clock } from 'lucide-react'

const peakClimbingPackages = [
  {
    id: 1,
    title: 'Island Peak (Imja Tse)',
    image: 'https://images.pexels.com/photos/929382/pexels-photo-929382.jpeg',
    price: 1899,
    badge: 'Moderate to Challenging',
    description:
      'Close views of Lhotse, Everest, and Ama Dablam from the summit of Island Peak.',
    rating: { value: 4.8, reviews: 130 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '15–18 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '6,189 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–10 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Everest Region' }
    ],
    highlights: ['Lhotse Views', 'Everest Proximity', 'Ama Dablam']
  },
  {
    id: 2,
    title: 'Mera Peak Climb',
    image: 'https://images.pexels.com/photos/2611692/pexels-photo-2611692.jpeg',
    price: 1999,
    badge: 'Moderate',
    description:
      'Highest trekking peak in Nepal with panoramic views of 5 world’s 8000m giants.',
    rating: { value: 4.9, reviews: 145 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '18–20 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '6,476 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–12 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Everest (Hinku Valley)' }
    ],
    highlights: ['Panoramic Views', 'Highest Trekking Peak']
  },
  {
    id: 3,
    title: 'Lobuche East Peak',
    image: 'https://images.pexels.com/photos/3929282/pexels-photo-3929282.jpeg',
    price: 1799,
    badge: 'Challenging',
    description:
      'Technical climb with stunning views of Everest and other towering peaks.',
    rating: { value: 4.7, reviews: 95 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '16–18 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '6,119 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Everest Region' }
    ],
    highlights: ['Technical Route', 'Close to Everest']
  },
  {
    id: 4,
    title: 'Pisang Peak Climb',
    image: 'https://images.pexels.com/photos/213975/pexels-photo-213975.jpeg',
    price: 1699,
    badge: 'Moderate to Difficult',
    description:
      'Combine your Annapurna Circuit with a thrilling Pisang Peak ascent.',
    rating: { value: 4.6, reviews: 88 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '17–20 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '6,091 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–10 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Annapurna Region' }
    ],
    highlights: ['Annapurna Circuit', 'Beautiful Ascent']
  },
  {
    id: 5,
    title: 'Chulu East Peak Climb',
    image: 'https://images.pexels.com/photos/1391166/pexels-photo-1391166.jpeg',
    price: 1899,
    badge: 'Challenging',
    description:
      'Climb above Manang valley for stunning views of Annapurna II, III, IV.',
    rating: { value: 4.6, reviews: 78 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '18–21 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '6,584 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–10 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Annapurna Region' }
    ],
    highlights: ['Manang Valley', 'Panoramic Views']
  },
  {
    id: 6,
    title: 'Yala Peak Climb',
    image: 'https://images.pexels.com/photos/5217579/pexels-photo-5217579.jpeg',
    price: 999,
    badge: 'Easy to Moderate',
    description:
      'Beginner-friendly climb in Langtang region with rewarding Himalayan views.',
    rating: { value: 4.5, reviews: 60 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '10–12 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,520 m' },
      { icon: <Users className='h-4 w-4' />, label: 'Any group size' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Langtang Region' }
    ],
    highlights: ['Great for Beginners', 'Close to Kathmandu']
  }
]

const PeakClimbing = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {peakClimbingPackages.map((pkg, idx) => (
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

export default PeakClimbing
export { peakClimbingPackages }
