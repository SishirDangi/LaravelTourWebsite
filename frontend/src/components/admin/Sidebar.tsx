import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  FileText,
  Images,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Home,
  ChevronDown,
  ChevronRight,
  Mountain,
  MapPin
} from 'lucide-react' // 👈 make sure all icons are imported

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [homeOpen, setHomeOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    navigate('/admin') // Redirect to login
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='p-6 border-b'>
        <h1 className='text-xl font-bold text-gray-900'>Admin Dashboard</h1>
        <p className='text-sm text-gray-600'>Himalaya Trekking</p>
      </div>

      <nav className='p-4'>
        <ul className='space-y-2'>
          {/* Overview */}
          <li>
            <Link
              to='/admin/dashboard'
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/admin/dashboard')
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <LayoutDashboard className='h-5 w-5' />
              <span>Overview</span>
            </Link>
          </li>

          {/* Home Section with submenu */}
          <li>
            <button
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                location.pathname.startsWith('/admin/home')
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setHomeOpen(!homeOpen)}
            >
              <span className='flex items-center space-x-3'>
                <Home className='h-5 w-5' />
                <span>Home</span>
              </span>
              {homeOpen ? (
                <ChevronDown className='h-4 w-4' />
              ) : (
                <ChevronRight className='h-4 w-4' />
              )}
            </button>

            {homeOpen && (
              <ul className='ml-8 mt-2 space-y-1'>
                <li>
                  <Link
                    to='/admin/home/navbar'
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm transition-colors ${
                      isActive('/admin/home/navbar')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <LayoutDashboard className='h-4 w-4' />
                    <span>Navbar</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to='/admin/home/hero'
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm transition-colors ${
                      isActive('/admin/home/hero')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Mountain className='h-4 w-4' />
                    <span>Hero Section</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to='/admin/home/adventure'
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm transition-colors ${
                      isActive('/admin/home/adventure')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <MapPin className='h-4 w-4' />
                    <span>Adventure Picker</span>
                  </Link>
                </li>

                {/* New submenu items */}
                <li>
                  <Link
                    to='/admin/home/testimonial'
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm transition-colors ${
                      isActive('/admin/home/testimonial')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <MessageSquare className='h-4 w-4' />
                    <span>Testimonial</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to='/admin/home/call-to-action'
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm transition-colors ${
                      isActive('/admin/home/call-to-action')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Package className='h-4 w-4' />
                    <span>Call To Action</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Other Menu Items */}
          {[
            {
              path: '/admin/packages',
              icon: <Package className='h-5 w-5' />,
              label: 'Packages'
            },
            {
              path: '/admin/blog',
              icon: <FileText className='h-5 w-5' />,
              label: 'Blog'
            },
            {
              path: '/admin/gallery',
              icon: <Images className='h-5 w-5' />,
              label: 'Gallery'
            },
            {
              path: '/admin/messages',
              icon: <MessageSquare className='h-5 w-5' />,
              label: 'Messages'
            },
            {
              path: '/admin/users',
              icon: <Users className='h-5 w-5' />,
              label: 'Users'
            },
            {
              path: '/admin/settings',
              icon: <Settings className='h-5 w-5' />,
              label: 'Settings'
            }
          ].map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className='absolute bottom-4 left-4 right-4'>
        <button
          className='flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg w-full transition-colors'
          onClick={handleLogout}
        >
          <LogOut className='h-5 w-5' />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
