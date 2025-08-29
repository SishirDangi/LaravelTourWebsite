import React from 'react'
import { Link } from 'react-router-dom'

interface Adventure {
  id: number
  title: string
  image: string
  slug: string
  subtitle?: string
}

const adventures: Adventure[] = [
  {
    id: 1,
    title: 'International Tour Packages',
    subtitle: 'Tibet & Bhutan Treks and Cross-Border Adventures',
    image:
      'https://media.nepaltourstravel.com/uploads/package/13-days-nepal-tibet-bhutan-tour01.webp',
    slug: 'destination/tibet'
  },
  {
    id: 2,
    title: 'Trekking in Nepal',
    subtitle: 'Explore Iconic Trails in the Himalayas',
    image:
      'https://www.himalayanst.com/uploads/media/Blogs/trek-in-nepal-cost/annapurna-trekking-in-nepal.jpg',
    slug: 'destination/nepal'
  },
  {
    id: 3,
    title: 'Day Hiking in Nepal',
    subtitle: 'Nepal One-Day Hikes for All Adventure Levels',
    image:
      'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=450,height=450,dpr=2/tour_img/63c3bd8372b0e.jpeg',
    slug: 'destination/nepal'
  },
  {
    id: 4,
    title: 'Cultural and Heritage Tours in Nepal',
    subtitle: 'Experience Nepal’s Ancient Cities and Living Traditions',
    image:
      'https://thewondernepal.com/media/posts/boudhanath-Cultural-heritage-of-Nepal.jpg',
    slug: 'tour'
  },
  {
    id: 5,
    title: 'Peak Climbing in Nepal',
    subtitle: 'Conquer Nepal’s Majestic Peaks with Expert Guides',
    image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
    slug: 'peakclimbing'
  }
]

const AdventurePicker: React.FC = () => {
  return (
    <div className='p-6'>
      <h2 className='text-3xl font-bold text-center mb-6 text-orange-700'>
        Pick your Adventures
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4'>
        {adventures.map((adventure, index) => (
          <div
            key={adventure.id}
            className={`relative group overflow-hidden rounded-xl shadow-md cursor-pointer
              ${index === 0 ? 'md:row-span-2 md:col-span-1' : 'aspect-square'}`}
          >
            <img
              src={adventure.image}
              alt={adventure.title}
              className='w-full h-full object-cover transform group-hover:scale-105 transition duration-300'
            />

            <div className='absolute bottom-4 left-4 text-white text-xl font-semibold z-10'>
              {adventure.title}
            </div>

            <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white text-center p-4'>
              <h3 className='text-2xl font-bold mb-2'>{adventure.title}</h3>
              <p className='text-sm mb-3'>{adventure.subtitle}</p>
              <Link
                to={`${adventure.slug}`}
                className=' text-orange-700 font-bold rounded '
              >
                VIEW ALL TOURS
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdventurePicker
