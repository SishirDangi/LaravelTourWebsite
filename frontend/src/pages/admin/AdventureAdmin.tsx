import React, { useState, ChangeEvent } from 'react'
import { Pencil, Trash2, Plus, Menu, X } from 'lucide-react'
import Sidebar from '../../components/admin/Sidebar'
import Header from '../../components/admin/Header'

interface Adventure {
  id: number
  title: string
  subtitle: string
  image: string
  slug: string
}

const AdventureAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [adventures, setAdventures] = useState<Adventure[]>([
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
    }
  ])

  const [newTitle, setNewTitle] = useState('')
  const [newSubtitle, setNewSubtitle] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [newFile, setNewFile] = useState<File | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [formVisible, setFormVisible] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFile(e.target.files[0])
    }
  }

  const handleAdd = () => {
    if (!newFile || !newTitle.trim() || !newSlug.trim()) return

    const imageUrl = newFile ? URL.createObjectURL(newFile) : ''

    if (editId) {
      setAdventures(prev =>
        prev.map(item =>
          item.id === editId
            ? {
                ...item,
                title: newTitle,
                subtitle: newSubtitle,
                slug: newSlug,
                image: imageUrl
              }
            : item
        )
      )
      setEditId(null)
    } else {
      setAdventures(prev => [
        ...prev,
        {
          id: Date.now(),
          title: newTitle,
          subtitle: newSubtitle,
          slug: newSlug,
          image: imageUrl
        }
      ])
    }

    resetForm()
  }

  const handleEdit = (adv: Adventure) => {
    setEditId(adv.id)
    setNewTitle(adv.title)
    setNewSubtitle(adv.subtitle)
    setNewSlug(adv.slug)
    setNewFile(null)
    setFormVisible(true)
  }

  const handleDelete = (id: number) => {
    setAdventures(prev => prev.filter(item => item.id !== id))
  }

  const resetForm = () => {
    setNewTitle('')
    setNewSubtitle('')
    setNewSlug('')
    setNewFile(null)
    setFormVisible(false)
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
          <h1 className='text-2xl font-bold mb-4'>Manage Adventures</h1>

          <button
            onClick={() => setFormVisible(prev => !prev)}
            className='mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
          >
            {formVisible ? 'Close Form' : 'Add New Adventure'}
          </button>

          {formVisible && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border p-4 rounded-lg bg-gray-50'>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='border border-gray-300 rounded-lg p-2'
              />
              <input
                type='text'
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder='Title'
                className='border border-gray-300 rounded-lg p-2'
              />
              <input
                type='text'
                value={newSubtitle}
                onChange={e => setNewSubtitle(e.target.value)}
                placeholder='Subtitle'
                className='border border-gray-300 rounded-lg p-2'
              />
              <input
                type='text'
                value={newSlug}
                onChange={e => setNewSlug(e.target.value)}
                placeholder='Slug (link to page)'
                className='border border-gray-300 rounded-lg p-2'
              />

              <button
                onClick={handleAdd}
                className='bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-700 transition md:col-span-2 justify-center'
              >
                {editId ? 'Update Adventure' : 'Add Adventure'}
                {!editId && <Plus size={18} />}
              </button>
            </div>
          )}

          <table className='w-full border border-gray-300 text-sm'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border p-2'>Image</th>
                <th className='border p-2'>Title</th>
                <th className='border p-2'>Subtitle</th>
                <th className='border p-2'>Slug</th>
                <th className='border p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adventures.map(adv => (
                <tr key={adv.id}>
                  <td className='border p-2'>
                    <img
                      src={adv.image}
                      alt={adv.title}
                      className='w-32 h-20 object-cover rounded'
                    />
                  </td>
                  <td className='border p-2'>{adv.title}</td>
                  <td className='border p-2'>{adv.subtitle}</td>
                  <td className='border p-2'>{adv.slug}</td>
                  <td className='border p-2 flex gap-2'>
                    <button
                      onClick={() => handleEdit(adv)}
                      className='bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600'
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(adv.id)}
                      className='bg-red-500 text-white p-1 rounded hover:bg-red-600'
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {adventures.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className='border p-4 text-center text-gray-500'
                  >
                    No adventures added yet.
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

export default AdventureAdmin
