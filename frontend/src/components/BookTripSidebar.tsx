import React, { useState } from 'react'

const BookTripSidebar: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    guests: 1,
    date: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you can handle form submission (e.g. API call)
    console.log('Booking Data:', formData)
    setSubmitted(true)
  }

  return (
    <div className='w-full md:w-80 bg-white p-6 rounded-md shadow-md sticky top-24'>
      <h3 className='text-xl font-semibold mb-4 text-orange-600'>
        Book the Trip
      </h3>

      {submitted ? (
        <div className='text-green-600 font-medium'>
          Thank you for booking! We will contact you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='fullName' className='block mb-1 font-medium'>
              Full Name
            </label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
              placeholder='Your full name'
            />
          </div>

          <div>
            <label htmlFor='email' className='block mb-1 font-medium'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
              placeholder='you@example.com'
            />
          </div>

          <div>
            <label htmlFor='guests' className='block mb-1 font-medium'>
              Number of Guests
            </label>
            <select
              id='guests'
              name='guests'
              value={formData.guests}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='date' className='block mb-1 font-medium'>
              Preferred Date
            </label>
            <input
              type='date'
              id='date'
              name='date'
              value={formData.date}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition font-semibold'
          >
            Submit Booking
          </button>
        </form>
      )}
    </div>
  )
}

export default BookTripSidebar
