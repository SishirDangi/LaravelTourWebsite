import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar from '../../components/admin/Sidebar'
import Header from '../../components/admin/Header'

type NavItem = {
  label: string
  path?: string
  subpages?: NavItem[]
}

const initialNavItems: NavItem[] = [
  { path: '/', label: 'Home' },
  {
    label: 'Destination',
    subpages: [
      { path: '/destination/nepal', label: 'Nepal' },
      { path: '/destination/tibet', label: 'Tibet' },
      { path: '/destination/bhutan', label: 'Bhutan' }
    ]
  }
  // ... rest of initial data (add your full nav items here)
]

const NavbarAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navItems, setNavItems] = useState<NavItem[]>(initialNavItems)
  const [newItemLabel, setNewItemLabel] = useState('')
  const [newItemPath, setNewItemPath] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  // Edit state
  const [editKey, setEditKey] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState('')
  const [editPath, setEditPath] = useState('')

  // Helper to update item in nested navItems recursively
  const updateNavItem = (
    items: NavItem[],
    key: string,
    newLabel: string,
    newPath?: string
  ): NavItem[] => {
    return items.map(item => {
      const itemKey = item.label + (item.path ?? '')
      if (itemKey === key) {
        return { ...item, label: newLabel, path: newPath }
      }
      if (item.subpages) {
        return {
          ...item,
          subpages: updateNavItem(item.subpages, key, newLabel, newPath)
        }
      }
      return item
    })
  }

  // Helper to delete item in nested navItems recursively
  const deleteNavItem = (items: NavItem[], key: string): NavItem[] => {
    return items
      .filter(item => item.label + (item.path ?? '') !== key)
      .map(item => {
        if (item.subpages) {
          return { ...item, subpages: deleteNavItem(item.subpages, key) }
        }
        return item
      })
  }

  // Render nav items recursively
  const renderNavItems = (items: NavItem[], level = 0) => (
    <ul className={`ml-${level * 6} mt-2`}>
      {items.map(item => {
        const key = item.label + (item.path ?? '')
        const isEditing = editKey === key

        return (
          <li key={key} className='mb-2'>
            {isEditing ? (
              <div className='flex space-x-2 items-center'>
                <input
                  className='border p-1 rounded w-40'
                  value={editLabel}
                  onChange={e => setEditLabel(e.target.value)}
                  placeholder='Label'
                />
                <input
                  className='border p-1 rounded w-48'
                  value={editPath ?? ''}
                  onChange={e => setEditPath(e.target.value)}
                  placeholder='Path (optional)'
                />
                <button
                  className='bg-green-500 text-white px-2 rounded'
                  onClick={() => {
                    if (!editLabel.trim()) {
                      alert('Title is required')
                      return
                    }
                    setNavItems(
                      updateNavItem(navItems, key, editLabel, editPath)
                    )
                    setEditKey(null)
                  }}
                >
                  Save
                </button>
                <button
                  className='bg-gray-300 px-2 rounded'
                  onClick={() => setEditKey(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className='flex justify-between items-center'>
                <div>
                  <strong>{item.label}</strong>{' '}
                  {item.path && (
                    <span className='text-gray-600'>({item.path})</span>
                  )}
                </div>
                <div>
                  <button
                    className='text-blue-600 mr-2'
                    onClick={() => {
                      setEditKey(key)
                      setEditLabel(item.label)
                      setEditPath(item.path ?? '')
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className='text-red-600'
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete "${item.label}"?`
                        )
                      ) {
                        setNavItems(deleteNavItem(navItems, key))
                        if (editKey === key) setEditKey(null)
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            {item.subpages && renderNavItems(item.subpages, level + 1)}
          </li>
        )
      })}
    </ul>
  )

  // Add new nav item handler
  const addNewNavItem = () => {
    if (!newItemLabel.trim()) {
      alert('Title is required')
      return
    }
    setNavItems([
      {
        label: newItemLabel.trim(),
        path: newItemPath.trim() || undefined
      },
      ...navItems
    ])
    setNewItemLabel('')
    setNewItemPath('')
    setShowAddForm(false)
  }

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

      {/* Main content */}
      <div className='lg:ml-64'>
        <Header />
        <main className='p-6 max-w-5xl mx-auto'>
          <h1 className='text-2xl font-bold mb-6'>Navbar Admin Panel</h1>

          {/* Add new nav item button */}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition mb-6'
            >
              Add New Navbar Item
            </button>
          )}

          {/* Add form */}
          {showAddForm && (
            <div className='flex flex-col space-y-3 max-w-md mb-6'>
              <input
                type='text'
                placeholder='Title (required)'
                value={newItemLabel}
                onChange={e => setNewItemLabel(e.target.value)}
                className='border p-2 rounded'
              />
              <input
                type='text'
                placeholder='Path (optional)'
                value={newItemPath}
                onChange={e => setNewItemPath(e.target.value)}
                className='border p-2 rounded'
              />
              <div className='flex space-x-2'>
                <button
                  onClick={addNewNavItem}
                  className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition'
                >
                  Add Navbar Item
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className='bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 transition'
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Nav Items */}
          <div>{renderNavItems(navItems)}</div>
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

export default NavbarAdmin
