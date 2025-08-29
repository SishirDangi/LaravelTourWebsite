import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Sidebar from '../../components/admin/Sidebar'
import Header from '../../components/admin/Header'
import AdminOverview from './AdminOverview'
import NavbarAdmin from './NavbarAdmin'
import HeroAdmin from './HeroAdmin'
import AdventureAdmin from './AdventureAdmin'
import CallToActionAdmin from './CallToActionAdmin'
import TestimonialAdmin from './TestimonialAdmin'

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Mobile menu button */}
      <div className='lg:hidden fixed top-4 left-4 z-50'>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='bg-white p-2 rounded-lg shadow-lg'
        >
          {sidebarOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className='lg:ml-64'>
        <Header />
        <main className='min-h-screen bg-gray-50'>
          <Routes>
            <Route path='/' element={<AdminOverview />} />
            <Route path='/home/navbar' element={<NavbarAdmin />} />
            <Route path='/home/hero' element={<HeroAdmin />} />
            <Route path='/home/adventure' element={<AdventureAdmin />} />
            <Route
              path='/admin/home/call-to-action'
              element={<CallToActionAdmin />}
            />
            <Route
              path='/admin/home/testimonial'
              element={<TestimonialAdmin />}
            />
            {/* <Route path='/packages' element={<AdminPackages />} /
            <Route path='/settings' element={<AdminSettings />} /> */}
          </Routes>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-30 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Dashboard
