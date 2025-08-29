import React from 'react'
import DetailNav from '../components/DetailNav'
import BookTripSidebar from '../components/BookTripSidebar'
import annapurnaCircuitData from '../data/annapurnaCircuitData'

const AnnapurnaCircuit = ({ pageTitle }: { pageTitle: string }) => {
  const {
    description,
    image,
    overview,
    highlights,
    itinerary,
    mapEmbedUrl,
    includes,
    excludes,
    faqs
  } = annapurnaCircuitData

  return (
    <>
      <DetailNav />
      <div className='pt-36'>
        <div className='flex flex-col md:flex-row gap-8 px-4 py-8 max-w-7xl mx-auto'>
          <main className='flex-1 space-y-8'>
            <section id='overview'>
              <h2 className='text-2xl font-bold mb-4'>{pageTitle} Overview</h2>
              <p className='text-gray-700 mb-6'>{overview}</p>
              <img
                src={image}
                alt={pageTitle}
                className='w-full max-w-4xl mx-auto rounded-lg shadow-md'
              />
            </section>

            <section id='highlights'>
              <h2 className='text-2xl font-bold mb-4'>Highlights</h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                {highlights.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section id='itinerary'>
              <h2 className='text-2xl font-bold mb-4'>Itinerary</h2>
              <div className='space-y-4'>
                {itinerary.map((dayItem, index) => (
                  <div
                    key={index}
                    className='border-l-4 border-orange-500 pl-4'
                  >
                    <h3 className='font-semibold'>
                      Day {dayItem.day}: {dayItem.title}
                    </h3>
                    <p className='text-gray-600'>{dayItem.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id='map'>
              <h2 className='text-2xl font-bold mb-4'>Map</h2>
              <div className='w-full h-[500px]'>
                <iframe
                  src={mapEmbedUrl}
                  title={`${pageTitle} Map`}
                  width='100%'
                  height='100%'
                  allowFullScreen
                  loading='lazy'
                  className='rounded-md border'
                ></iframe>
              </div>
            </section>

            <section id='includes-excludes'>
              <h2 className='text-2xl font-bold mb-4'>Includes & Excludes</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h3 className='font-semibold text-lg mb-2'>Included:</h3>
                  <ul className='list-disc list-inside space-y-2 text-gray-700'>
                    {includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className='font-semibold text-lg mb-2'>Not Included:</h3>
                  <ul className='list-disc list-inside space-y-2 text-gray-700'>
                    {excludes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section id='faq'>
              <h2 className='text-2xl font-bold mb-4'>
                Frequently Asked Questions
              </h2>
              <div className='space-y-6'>
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 p-4 rounded-md shadow-sm'
                  >
                    <h4 className='font-semibold text-lg text-orange-700'>
                      Q: {faq.question}
                    </h4>
                    <p className='text-gray-700 mt-1'>A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <aside className='w-full md:w-1/3'>
            <BookTripSidebar />
          </aside>
        </div>
      </div>
    </>
  )
}

export default AnnapurnaCircuit
