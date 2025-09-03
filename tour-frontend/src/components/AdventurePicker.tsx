import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface TourPackage {
  id: number
  name: string
  destination: { name: string }
  overview: string | null
  images: { image_path: string; is_main: boolean }[]
}

const AdventurePicker: React.FC = () => {
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTourPackages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tour-packages`)
        const result = await response.json()
        if (result.success) {
          let packages = result.data

          // Check if we have a saved order in localStorage
          const savedOrder = localStorage.getItem('tourPackagesOrder')
          if (savedOrder) {
            // Use saved order
            const order = JSON.parse(savedOrder)
            packages = order
              .map((id: number) => packages.find((p: TourPackage) => p.id === id))
              .filter((p: TourPackage | undefined) => p !== undefined)
              .slice(0, 5) // Limit to 5 packages
          } else {
            // Randomize and save order
            packages = packages
              .sort(() => Math.random() - 0.5)
              .slice(0, 5) // Limit to 5 packages
            localStorage.setItem(
              'tourPackagesOrder',
              JSON.stringify(packages.map((p: TourPackage) => p.id))
            )
          }

          setTourPackages(packages)
        } else {
          setError(result.message)
        }
      } catch (err) {
        setError('Failed to fetch tour packages')
      } finally {
        setLoading(false)
      }
    }

    fetchTourPackages()
  }, [])

  if (loading) {
    return <div className='text-center p-6'>Loading...</div>
  }

  if (error) {
    return <div className='text-center p-6 text-red-600'>{error}</div>
  }

  return (
    <div className='p-6'>
      <h1 className='text-7xl font-bold text-center mt-5 mb-10 text-orange-700'>
        Pick your Adventures
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4'>
        {tourPackages.map((tour, index) => {
          const mainImage =
            tour.images.find((img) => img.is_main)?.image_path ||
            tour.images[0]?.image_path ||
            ''

          return (
            <Link
              key={tour.id} 
              to='/destination'
              className={`relative group overflow-hidden rounded-xl shadow-md cursor-pointer
                ${index === 0 ? 'md:row-span-2 md:col-span-1' : 'aspect-square'}`}
            >
              <img
                src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${mainImage}`}
                alt={tour.name}
                className='w-full h-full object-cover transform group-hover:scale-105 transition duration-300'
              />

              <div className='absolute bottom-4 left-4 text-white text-xl font-semibold z-10'>
                {tour.name}
              </div>

              <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white text-center p-4'>
                <h3 className='text-2xl font-bold mb-2'>{tour.name}</h3>
                <p className='text-sm mb-1'>Destination: {tour.destination.name}</p>
                <p
                  className='text-sm mb-3 line-clamp-4'
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {tour.overview || 'No overview available'}
                </p>

                <button
                  className='text-orange-700 font-bold rounded px-4 py-2 hover:bg-gray-100 transition'
                  onClick={(e) => {
                    e.preventDefault() 
                    e.stopPropagation() 
                    window.location.href = '/destination' 
                  }}
                >
                  VIEW ALL TOURS
                </button>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default AdventurePicker
