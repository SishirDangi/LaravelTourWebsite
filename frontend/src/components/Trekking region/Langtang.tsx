import PackageCard from '../PackagesCard'
import { Calendar, Users, Mountain, MapPin, Clock } from 'lucide-react'

const langtangPackages = [
  {
    id: 1,
    title: 'Langtang Valley Trek',
    price: 799,
    badge: 'Moderate',
    description:
      'A scenic trek offering Tamang culture, panoramic views from Tserko Ri, and access to Kyanjin Gompa.',
    rating: { value: 4.7, reviews: 150 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '7–10 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '4,984 m (Tserko Ri)' },
      { icon: <Users className='h-4 w-4' />, label: '2–10 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Langtang Region' }
    ],
    highlights: [
      'Langtang Village',
      'Kyanjin Gompa',
      'Tserko Ri',
      'Tamang Culture'
    ],
    image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg'
  },
  {
    id: 2,
    title: 'Gosaikunda Lake Trek',
    price: 699,
    badge: 'Moderate',
    description:
      'A sacred pilgrimage trek to high-altitude lakes with dramatic views and cultural significance.',
    rating: { value: 4.6, reviews: 120 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '6–9 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '4,380 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Gosaikunda Lake' }
    ],
    highlights: [
      'Alpine Lakes',
      'Hindu Pilgrimage',
      'Lauribina La',
      'Mountain Views'
    ],
    image: 'https://images.pexels.com/photos/301892/pexels-photo-301892.jpeg'
  },
  {
    id: 3,
    title: 'Helambu Trek',
    price: 599,
    badge: 'Easy to Moderate',
    description:
      'A close-to-Kathmandu trek through Sherpa and Tamang villages with beautiful forests and monasteries.',
    rating: { value: 4.5, reviews: 95 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '5–8 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,650 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–8 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Helambu Region' }
    ],
    highlights: ['Sherpa & Tamang Villages', 'Forests', 'Monasteries'],
    image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg'
  },
  {
    id: 4,
    title: 'Langtang – Gosaikunda – Helambu Trek',
    price: 1299,
    badge: 'Moderate to Challenging',
    description:
      'An extended trek combining the best of Langtang, Gosaikunda, and Helambu with varied landscapes.',
    rating: { value: 4.8, reviews: 105 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '14–18 Days' },
      {
        icon: <Mountain className='h-4 w-4' />,
        label: '4,610 m (Lauribina Pass)'
      },
      { icon: <Users className='h-4 w-4' />, label: '2–10 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Langtang – Helambu' }
    ],
    highlights: ['High Passes', 'Sacred Lakes', 'Full Region Experience'],
    image: 'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg'
  },
  {
    id: 5,
    title: 'Tamang Heritage Trail',
    price: 649,
    badge: 'Easy to Moderate',
    description:
      'Cultural trek through Tamang villages with traditional homestays and hot springs.',
    rating: { value: 4.6, reviews: 85 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '6–8 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '3,165 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–6 people' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Tamang Heritage Region' }
    ],
    highlights: ['Tamang Culture', 'Local Hot Springs', 'Off-the-Beaten Path'],
    image: 'https://images.pexels.com/photos/2671331/pexels-photo-2671331.jpeg'
  },
  {
    id: 6,
    title: 'Ganja La Pass Trek',
    price: 1399,
    badge: 'Challenging',
    description:
      'A remote and wild trek crossing Ganja La Pass with no teahouses beyond Kyanjin — requires camping.',
    rating: { value: 4.7, reviews: 60 },
    details: [
      { icon: <Clock className='h-4 w-4' />, label: '12–16 Days' },
      { icon: <Mountain className='h-4 w-4' />, label: '5,122 m' },
      { icon: <Users className='h-4 w-4' />, label: '2–6 people (camping)' },
      { icon: <MapPin className='h-4 w-4' />, label: 'Ganja La Pass' }
    ],
    highlights: ['Remote Pass', 'Camping Adventure', 'Stunning Views'],
    image: 'https://images.pexels.com/photos/2166714/pexels-photo-2166714.jpeg'
  }
]

const Langtang = () => {
  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {langtangPackages.map((pkg, idx) => (
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

export default Langtang
export { langtangPackages }
