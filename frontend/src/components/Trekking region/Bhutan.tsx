import React from 'react'
import PackageCard from '../PackagesCard'
import { Calendar, Users, Mountain, MapPin, Clock } from 'lucide-react'

const bhutanPackages = [
  {
    id: 1,
    title: 'Druk Path Trek 🇷🇹🔥 (Most Popular Short Trek)',
    image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
    price: 1199,
    badge: 'Moderate',
    description:
      'Scenic trek through alpine meadows, lakes, and Himalayan vistas from Paro to Thimphu.',
    rating: { value: 4.8, reviews: 210 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '5–6 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: 'Moderate Level' },
      { icon: <Users className='h-4 w-4' />, label: 'Ideal for Beginners' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Paro – Thimphu' }
    ],
    highlights: [
      'Lakes',
      'Alpine Meadows',
      'Mt. Gangkar Puensum',
      'Scenic Campsites'
    ]
  },
  {
    id: 2,
    title: 'Jomolhari Trek 🏔️',
    image: 'https://images.pexels.com/photos/804413/pexels-photo-804413.jpeg',
    price: 1499,
    badge: 'Moderate to Challenging',
    description:
      'Reach the base of Mt. Jomolhari through yak herder villages and high passes.',
    rating: { value: 4.9, reviews: 180 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '8–12 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '7,326 m Base Camp' },
      {
        icon: <Users className='h-4 w-4' />,
        label: 'Moderate to Fit Trekkers'
      },
      {
        icon: <MapPin className='h-4 w-4' />,
        label: 'Paro – Jangothang – Paro'
      }
    ],
    highlights: ['Jomolhari Base Camp', 'Yak Villages', 'Mountain Passes']
  },
  {
    id: 3,
    title: 'Laya Gasa Trek 🐾',
    image: 'https://images.pexels.com/photos/248771/pexels-photo-248771.jpeg',
    price: 1899,
    badge: 'Strenuous',
    description:
      'Experience remote culture and wilderness with hot springs and stunning views.',
    rating: { value: 4.7, reviews: 135 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '13–16 Days' },
      {
        icon: <Mountain className='h-4 w-4' />,
        label: 'High Mountain Terrain'
      },
      { icon: <Users className='h-4 w-4' />, label: 'For Adventurers' },
      {
        icon: <MapPin className='h-4 w-4' />,
        label: 'Paro – Laya – Gasa – Punakha'
      }
    ],
    highlights: [
      'Laya Village',
      'Gasa Hot Springs',
      'Wildlife',
      'Remote Trails'
    ]
  },
  {
    id: 4,
    title: 'Snowman Trek ❄️👑 (Bhutan’s Toughest Trek)',
    image: 'https://images.pexels.com/photos/35600/pexels-photo.jpg',
    price: 3499,
    badge: 'Extremely Challenging',
    description:
      'Cross 11+ high passes above 4,500m through Lunana in Bhutan’s most remote trek.',
    rating: { value: 4.9, reviews: 90 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '25–30 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '11+ High Passes' },
      { icon: <Users className='h-4 w-4' />, label: 'Experienced Only' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Paro to Bumthang' }
    ],
    highlights: [
      'Lunana Region',
      'High Altitude',
      'Isolation',
      'Unmatched Scenery'
    ]
  },
  {
    id: 5,
    title: 'Bumthang Owl Trek 🦉',
    image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg',
    price: 499,
    badge: 'Easy',
    description:
      'Short and peaceful trek through Bumthang forests with cultural immersion.',
    rating: { value: 4.6, reviews: 70 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '2–3 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: 'Forest Trail' },
      { icon: <Users className='h-4 w-4' />, label: 'Cultural Explorers' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Bumthang Region' }
    ],
    highlights: ['Monasteries', 'Birdlife', 'Local Villages']
  },
  {
    id: 6,
    title: 'Dagala Thousand Lakes Trek 🛗️',
    image: 'https://images.pexels.com/photos/2893959/pexels-photo-2893959.jpeg',
    price: 1099,
    badge: 'Moderate',
    description:
      'Hike through a pristine landscape dotted with high-altitude lakes and peaks.',
    rating: { value: 4.7, reviews: 88 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '5–6 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: 'High Altitude Lakes' },
      {
        icon: <Users className='h-4 w-4' />,
        label: 'Photographers & Nature Lovers'
      },
      { icon: <MapPin className='h-4 w-4' />, label: 'Near Thimphu' }
    ],
    highlights: ['Lake Views', 'Peaceful Trails', 'Himalayan Scenery']
  },
  {
    id: 7,
    title: 'Merak Sakteng Trek 🐐 (Eastern Bhutan Cultural Trek)',
    image: 'https://images.pexels.com/photos/19670/pexels-photo.jpg',
    price: 999,
    badge: 'Moderate',
    description:
      'Journey into Eastern Bhutan to discover the semi-nomadic Brokpa culture.',
    rating: { value: 4.8, reviews: 95 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '6–8 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: 'Unspoiled Nature' },
      { icon: <Users className='h-4 w-4' />, label: 'Culture Seekers' },
      {
        icon: <MapPin className='h-4 w-4' />,
        label: 'Trashigang, Eastern Bhutan'
      }
    ],
    highlights: ['Brokpa Villages', 'Red Pandas', 'Wilderness Experience']
  }
]

const Bhutan = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {bhutanPackages.map((pkg, idx) => (
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

export default Bhutan
export { bhutanPackages }
