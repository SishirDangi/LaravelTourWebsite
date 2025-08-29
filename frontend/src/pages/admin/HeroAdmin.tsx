import React, { useState, ChangeEvent } from 'react'
import { Pencil, Trash2, Plus, X, Menu } from 'lucide-react'
import Sidebar from '../../components/admin/Sidebar'
import Header from '../../components/admin/Header'

interface HeroImage {
  id: number
  url: string
  title: string
  highlight: string
  description: string
}

const HeroAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [images, setImages] = useState<HeroImage[]>([
    {
      id: 1,
      url: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Discover the',
      highlight: 'Himalayas',
      description:
        "Experience Nepal's breathtaking mountain trails with expert local guides and unforgettable adventures"
    }
  ])

  const [newFile, setNewFile] = useState<File | null>(null)
  const [newTitle, setNewTitle] = useState<string>('')
  const [newHighlight, setNewHighlight] = useState<string>('')
  const [newDescription, setNewDescription] = useState<string>('')
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState<boolean>(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFile(e.target.files[0])
    }
  }

  const handleAdd = () => {
    if (
      !newFile ||
      !newTitle.trim() ||
      !newHighlight.trim() ||
      !newDescription.trim()
    )
      return

    const imageUrl = URL.createObjectURL(newFile) // Preview only (no backend)

    if (editId) {
      setImages(prev =>
        prev.map(img =>
          img.id === editId
            ? {
                ...img,
                url: imageUrl,
                title: newTitle,
                highlight: newHighlight,
                description: newDescription
              }
            : img
        )
      )
      setEditId(null)
    } else {
      setImages(prev => [
        ...prev,
        {
          id: Date.now(),
          url: imageUrl,
          title: newTitle,
          highlight: newHighlight,
          description: newDescription
        }
      ])
    }

    resetForm()
  }

  const handleEdit = (img: HeroImage) => {
    setEditId(img.id)
    setNewFile(null) // force user to re-upload if needed
    setNewTitle(img.title)
    setNewHighlight(img.highlight)
    setNewDescription(img.description)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const resetForm = () => {
    setNewFile(null)
    setNewTitle('')
    setNewHighlight('')
    setNewDescription('')
    setShowForm(false)
    setEditId(null)
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

        <main className='p-6 max-w-6xl mx-auto'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-bold'>Manage Hero Section</h1>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className='bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-700 transition'
              >
                <Plus size={18} /> Add New
              </button>
            )}
          </div>

          {showForm && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border p-4 rounded-lg bg-gray-50'>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='border border-gray-300 rounded-lg p-2 md:col-span-2'
              />
              <input
                type='text'
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder='Main Title'
                className='border border-gray-300 rounded-lg p-2'
              />
              <input
                type='text'
                value={newHighlight}
                onChange={e => setNewHighlight(e.target.value)}
                placeholder='Highlighted Text'
                className='border border-gray-300 rounded-lg p-2'
              />
              <textarea
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                placeholder='Description'
                className='border border-gray-300 rounded-lg p-2 md:col-span-2'
              />
              <div className='flex gap-2 md:col-span-2 justify-end'>
                <button
                  onClick={handleAdd}
                  className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition'
                >
                  {editId ? 'Update' : 'Add'} Hero Item
                </button>
                <button
                  onClick={resetForm}
                  className='bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition flex items-center gap-1'
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <table className='w-full border border-gray-300 text-sm'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border p-2'>Image</th>
                <th className='border p-2'>Title</th>
                <th className='border p-2'>Highlight</th>
                <th className='border p-2'>Description</th>
                <th className='border p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map(img => (
                <tr key={img.id}>
                  <td className='border p-2'>
                    <img
                      src={img.url}
                      alt='Hero'
                      className='w-32 h-20 object-cover rounded'
                    />
                  </td>
                  <td className='border p-2'>{img.title}</td>
                  <td className='border p-2 text-orange-500 font-bold'>
                    {img.highlight}
                  </td>
                  <td className='border p-2'>{img.description}</td>
                  <td className='border p-2 flex gap-2'>
                    <button
                      onClick={() => handleEdit(img)}
                      className='bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600'
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className='bg-red-500 text-white p-1 rounded hover:bg-red-600'
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {images.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className='border p-4 text-center text-gray-500'
                  >
                    No hero section items yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

export default HeroAdmin
