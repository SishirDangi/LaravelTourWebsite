import React from 'react'
import PackageCard from '../PackagesCard'
import { Calendar, Users, Mountain, MapPin, Clock } from 'lucide-react'

const annapurnaPackages = [
  {
    id: 1,
    title: 'Annapurna Circuit Trek',
    price: 1499,
    badge: 'Moderate to Challenging',
    description:
      "World's classic trek through Marsyangdi Valley and Thorong La Pass with stunning diverse landscapes.",
    rating: { value: 4.8, reviews: 280 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '14–20 Days' },
      {
        icon: <Mountain className='h-4 w-4' />,
        label: '5,416 m (Thorong La Pass)'
      },
      { icon: <Users className='h-4 w-4' />, label: '2–12 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Annapurna Region' }
    ],
    highlights: [
      'Marsyangdi Valley',
      'Thorong La Pass',
      'Muktinath',
      'Kali Gandaki Gorge'
    ],
    image: 'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg'
  },
  {
    id: 2,
    title: 'Annapurna Base Camp Trek (ABC Trek)',
    price: 1099,
    badge: 'Moderate',
    description:
      'Panoramic views of Annapurna massif, Machapuchare and Hiunchuli with cultural village stops.',
    rating: { value: 4.7, reviews: 190 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '7–12 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '4,130 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–10 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Annapurna Sanctuary' }
    ],
    highlights: [
      'Annapurna Sanctuary',
      'Panoramic Views',
      'Machapuchare',
      'Hiunchuli'
    ],
    image: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg'
  },
  {
    id: 3,
    title: 'Ghorepani Poon Hill Trek',
    price: 599,
    badge: 'Easy to Moderate',
    description:
      'Famous for sunrise views over Annapurna and Dhaulagiri ranges with rich Gurung & Magar culture.',
    rating: { value: 4.6, reviews: 140 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '3–6 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,210 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Poon Hill' }
    ],
    highlights: [
      'Sunrise Views',
      'Annapurna & Dhaulagiri',
      'Gurung & Magar Culture'
    ],
    image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg'
  },
  {
    id: 4,
    title: 'Mardi Himal Trek',
    price: 799,
    badge: 'Moderate',
    description:
      'A hidden gem trek with fewer trekkers and amazing views of Machapuchare and Annapurna South.',
    rating: { value: 4.7, reviews: 115 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '5–7 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '4,500 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Mardi Himal Base Camp' }
    ],
    highlights: ['Hidden Gem', 'Machapuchare Views', 'Fewer Trekkers'],
    image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg'
  },
  {
    id: 5,
    title: 'Khopra Ridge Trek (Khopra Danda Trek)',
    price: 699,
    badge: 'Moderate',
    description:
      'Off-the-beaten path trek with panoramic views and sacred Khayar Lake side trip.',
    rating: { value: 4.5, reviews: 80 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '7–10 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,660 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      {
        icon: <MapPin className='h-4 w-4' />,
        label: 'Khopra Danda & Khayar Lake'
      }
    ],
    highlights: ['Panoramic Views', 'Sacred Khayar Lake', 'Less Crowded'],
    image: 'https://images.pexels.com/photos/301892/pexels-photo-301892.jpeg'
  },
  {
    id: 6,
    title: 'Tilicho Lake Trek',
    price: 1299,
    badge: 'Moderate to Challenging',
    description:
      'One of the highest lakes in the world surrounded by stunning glaciers and snow-capped peaks.',
    rating: { value: 4.8, reviews: 95 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '14–18 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '4,919 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–12 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Tilicho Lake' }
    ],
    highlights: ['High Altitude Lake', 'Glacier Scenery', 'Stunning Views'],
    image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg'
  },
  {
    id: 7,
    title: 'Nar Phu Valley Trek',
    price: 1599,
    badge: 'Challenging',
    description:
      'Explore remote Tibetan-style villages and rugged landscapes with permit requirements.',
    rating: { value: 4.7, reviews: 70 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '12–16 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,320 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–10 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Nar Phu Valley' }
    ],
    highlights: ['Remote Villages', 'Tibetan Culture', 'Rugged Landscapes'],
    image: 'https://images.pexels.com/photos/237216/pexels-photo-237216.jpeg'
  },
  {
    id: 8,
    title: 'Jomsom Muktinath Trek',
    price: 799,
    badge: 'Easy to Moderate',
    description:
      'Visit sacred Hindu & Buddhist pilgrimage sites and experience Mustang culture.',
    rating: { value: 4.5, reviews: 110 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '5–10 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,800 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Mustang Region' }
    ],
    highlights: ['Pilgrimage Sites', 'Mustang Culture', 'Kali Gandaki Valley'],
    image: 'https://images.pexels.com/photos/301892/pexels-photo-301892.jpeg'
  },
  {
    id: 9,
    title: 'Upper Mustang Trek',
    price: 1599,
    badge: 'Moderate',
    description:
      'Forbidden Kingdom of Lo with Tibetan Buddhist culture, cave monasteries, and desert landscapes.',
    rating: { value: 4.6, reviews: 85 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '12–16 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,900 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Lo Manthang' }
    ],
    highlights: [
      'Forbidden Kingdom',
      'Tibetan Culture',
      'Cave Monasteries',
      'Desert Landscape'
    ],
    image: 'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg'
  },
  {
    id: 10,
    title: 'Panchase Trek',
    price: 399,
    badge: 'Easy',
    description:
      'Less crowded, beginner-friendly trek with great views of Annapurna and Pokhara Valley.',
    rating: { value: 4.4, reviews: 60 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '3–5 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '2,500 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–6 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Panchase' }
    ],
    highlights: ['Less Crowded', 'Great Views', 'Beginner Friendly'],
    image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg'
  },
  {
    id: 11,
    title: 'Royal Trek',
    price: 349,
    badge: 'Easy',
    description:
      "Named after Prince Charles' trek in the 1980s, this trek covers cultural villages with easy terrain.",
    rating: { value: 4.3, reviews: 45 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '3–5 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '1,730 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–6 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Royal Trek Route' }
    ],
    highlights: ['Cultural Villages', 'Easy Terrain', 'Short Trek'],
    image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg'
  },
  {
    id: 12,
    title: 'Sikles Trek',
    price: 499,
    badge: 'Easy to Moderate',
    description:
      'Explore traditional Gurung villages with stunning views of Lamjung Himal and off-the-beaten path trails.',
    rating: { value: 4.5, reviews: 50 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '4–7 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '2,000+ m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Sikles Village' }
    ],
    highlights: [
      'Traditional Gurung Village',
      'Lamjung Himal Views',
      'Off-the-Beaten Path'
    ],
    image: 'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg'
  }
]

const Annapurna = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {annapurnaPackages.map((pkg, idx) => (
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

export default Annapurna
export { annapurnaPackages }
