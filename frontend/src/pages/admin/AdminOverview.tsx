import React from 'react'
import CountUp from 'react-countup'

const AdminOverview: React.FC = () => {
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-6'>Dashboard Overview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Total Bookings */}
        <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300'>
          <h3 className='text-lg font-semibold mb-2'>Total Bookings</h3>
          <p className='text-3xl font-bold text-blue-600'>
            <CountUp end={156} duration={2} />
          </p>
        </div>

        {/* Active Treks */}
        <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300'>
          <h3 className='text-lg font-semibold mb-2'>Active Treks</h3>
          <p className='text-3xl font-bold text-green-600'>
            <CountUp end={23} duration={2} />
          </p>
        </div>

        {/* Website Visits */}
        <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300'>
          <h3 className='text-lg font-semibold mb-2'>Website Visits</h3>
          <p className='text-3xl font-bold text-purple-600'>
            <CountUp end={1243} duration={2.5} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminOverview
