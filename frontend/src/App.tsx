import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'

// Pages
import Home from './pages/Home'
import Packages from './pages/Packages'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Nepal from './pages/sub_pages/Nepal'
import Bhutantrekking from './pages/sub_pages/Bhutantrekking'
import Tibet from './pages/sub_pages/Tibet'
import Tour from './pages/Tour'
import Peak from './pages/Peak'
import EBCtrek from './pages/EBCtrek'
import EBCGokyoCholapass from './pages/EBCGokyoCholapass'
import Threepass from './pages/Threepass'
import EverestView from './pages/EverestView'
import EverestPanorama from './pages/EverestPanorama'
import EBCHeli from './pages/EBCHeli'
import AnnapurnaCircuit from './pages/AnnapurnaCircuit'

// Admin Pages
import AdminLogin from './pages/admin/Adminlogin'
import Dashboard from './pages/admin/Dashboard'
import NavbarAdmin from './pages/admin/NavbarAdmin'
import HeroAdmin from './pages/admin/HeroAdmin'
import AdventureAdmin from './pages/admin/AdventureAdmin'
import CallToActionAdmin from './pages/admin/CallToActionAdmin'
import TestimonialAdmin from './pages/admin/TestimonialAdmin'

function AppContent () {
  const location = useLocation()

  // Hide Navbar/Footer for all admin routes
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className='min-h-screen bg-white'>
      {!isAdminRoute && <Navbar />}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/packages' element={<Packages />} />
          <Route path='/about' element={<About />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/destination/nepal' element={<Nepal />} />
          <Route path='/destination/bhutan' element={<Bhutantrekking />} />
          <Route path='/destination/tibet' element={<Tibet />} />
          <Route path='/tour' element={<Tour />} />
          <Route path='/peakclimbing' element={<Peak />} />
          <Route path='/trekking/everest-region/ebc' element={<EBCtrek />} />
          <Route
            path='/trekking/everest-region/gokyo-chola'
            element={<EBCGokyoCholapass />}
          />
          <Route
            path='/trekking/everest-region/three-passes'
            element={<Threepass />}
          />
          <Route
            path='/trekking/everest-region/view-trek'
            element={<EverestView />}
          />
          <Route
            path='/trekking/everest-region/panorama'
            element={<EverestPanorama />}
          />
          <Route
            path='/trekking/everest-region/heli-tour'
            element={<EBCHeli />}
          />
          <Route
            path='/trekking/annapurna-region/annapurna-circuit'
            element={<AnnapurnaCircuit />}
          />

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/home/navbar' element={<NavbarAdmin />} />
          <Route path='/admin/home/hero' element={<HeroAdmin />} />
          <Route path='/admin/home/adventure' element={<AdventureAdmin />} />
          <Route
            path='/admin/home/call-to-action'
            element={<CallToActionAdmin />}
          />
          <Route
            path='/admin/home/testimonial'
            element={<TestimonialAdmin />}
          />
        </Routes>
      </motion.main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScrollToTopButton />}
    </div>
  )
}

function App () {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
