import React from 'react'
import PackageCard from '../PackagesCard'
import { Calendar, Users, MapPin, Clock } from 'lucide-react'

const culturalTourPackages = [
  {
    id: 1,
    title: 'Kathmandu Valley Cultural Heritage Tour',
    image: 'https://images.pexels.com/photos/804519/pexels-photo-804519.jpeg',
    price: 199,
    badge: 'UNESCO Sites',
    description:
      'Explore all 7 UNESCO heritage sites in the Kathmandu Valley with art, temples, and vibrant culture.',
    rating: { value: 4.7, reviews: 180 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '1–4 Days' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Kathmandu Valley' },
      { icon: <Users className='h-4 w-4' />, label: 'Private & Group' }
    ],
    highlights: [
      'Kathmandu, Patan, Bhaktapur Squares',
      'Swayambhu, Boudhanath, Pashupatinath',
      'Changunarayan, Local Cuisine & Culture'
    ]
  },
  {
    id: 2,
    title: 'Bhaktapur and Patan Cultural Tour',
    image:
      'https://images.pexels.com/photos/12057598/pexels-photo-12057598.jpeg',
    price: 99,
    badge: 'Half-Day to Full-Day',
    description:
      'Dive deep into Newari art, lifestyle, and Malla-era temples of Bhaktapur and Patan.',
    rating: { value: 4.6, reviews: 95 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: 'Half to 1 Day' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Bhaktapur & Patan' }
    ],
    highlights: [
      'Nyatapola, Krishna Mandir, Golden Temple',
      'Patan Museum, Newari Architecture'
    ]
  },
  {
    id: 3,
    title: 'Lumbini – Birthplace of Lord Buddha',
    image: 'https://images.pexels.com/photos/128775/pexels-photo-128775.jpeg',
    price: 299,
    badge: 'UNESCO Site',
    description:
      'Visit Maya Devi Temple, Ashoka Pillar, and international monasteries in the birthplace of Buddha.',
    rating: { value: 4.8, reviews: 120 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '2–3 Days' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Lumbini, Rupandehi' }
    ],
    highlights: [
      'Sacred Garden, Ashoka Pillar',
      'Optional: Kapilvastu, Gotihawa'
    ]
  },
  {
    id: 4,
    title: 'Pokhara Cultural Tour',
    image: 'https://images.pexels.com/photos/1591377/pexels-photo-1591377.jpeg',
    price: 249,
    badge: 'City & Culture',
    description:
      'Experience temples, museums, and stunning lake views in Nepal’s most beautiful city.',
    rating: { value: 4.7, reviews: 100 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '2–3 Days' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Pokhara' }
    ],
    highlights: [
      'World Peace Pagoda, Bindhyabasini, Barahi Temple',
      'Cultural Combo: Sunrise + Boating + Museums'
    ]
  },
  {
    id: 5,
    title: 'Janakpur – Mithila Culture and Ramayana Heritage',
    image: 'https://images.pexels.com/photos/618048/pexels-photo-618048.jpeg',
    price: 199,
    badge: 'Cultural Pilgrimage',
    description:
      'Explore Janaki Temple and immerse in the vibrant Maithili lifestyle and art.',
    rating: { value: 4.5, reviews: 70 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '2 Days' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Janakpur, Terai' }
    ],
    highlights: [
      'Janaki Temple, Ram-Janaki Bibaha Mandap',
      'Mithila Art & Lifestyle'
    ]
  },
  {
    id: 6,
    title: 'Bandipur Cultural Village Tour',
    image: 'https://images.pexels.com/photos/545812/pexels-photo-545812.jpeg',
    price: 129,
    badge: 'Scenic Village',
    description:
      'Enjoy a quiet escape in a preserved Newari village between Kathmandu and Pokhara.',
    rating: { value: 4.6, reviews: 85 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '1–2 Days' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Bandipur' }
    ],
    highlights: ['Stone Streets', 'Mountain Views', 'Newari Temples & Culture']
  },
  {
    id: 7,
    title: 'Chitwan National Park Safari & Culture',
    image: 'https://images.pexels.com/photos/1860356/pexels-photo-1860356.jpeg',
    price: 349,
    badge: 'Jungle & Culture',
    description:
      'Safari adventures, Tharu dance, and rare wildlife in Nepal’s most famous national park.',
    rating: { value: 4.9, reviews: 160 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '2–3 Days' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Sauraha, Chitwan' }
    ],
    highlights: [
      'Elephant Safari, Bird Watching, Jungle Walk',
      'Tharu Dance & Canoeing'
    ]
  },
  {
    id: 8,
    title: 'Bardiya National Park Tour',
    image: 'https://images.pexels.com/photos/2603676/pexels-photo-2603676.jpeg',
    price: 399,
    badge: 'Wild & Remote',
    description:
      'Explore Nepal’s wild west with jeep safaris, dolphins, and cultural village experiences.',
    rating: { value: 4.8, reviews: 100 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '3–4 Days' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Bardiya, Western Terai' }
    ],
    highlights: ['Tiger Tracking', 'Dolphin Spotting', 'Tharu Homestays']
  },
  {
    id: 9,
    title: 'Kathmandu + Chitwan + Pokhara Tour',
    image: 'https://images.pexels.com/photos/1567069/pexels-photo-1567069.jpeg',
    price: 649,
    badge: 'Multi-City Classic',
    description:
      'Experience cultural Kathmandu, safari in Chitwan, and serene Pokhara in one trip.',
    rating: { value: 4.9, reviews: 220 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '7–9 Days' },
      {
        icon: <MapPin className='h-4 w-4' />,
        label: 'Kathmandu, Chitwan, Pokhara'
      }
    ],
    highlights: ['Heritage Sites, Safari, Lakes, Temples']
  }
]

const TourPackages = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {culturalTourPackages.map((pkg, idx) => (
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

export default TourPackages
export { culturalTourPackages }
