import React, { useState, ChangeEvent } from 'react'
import Sidebar from '../../components/admin/Sidebar'
import Header from '../../components/admin/Header'
import { Menu, X, Pencil, Trash2, Plus } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  country: string
  rating: number
  text: string
  image: string // will store image URL or blob URL
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    country: 'United States',
    rating: 5,
    text: 'An absolutely incredible experience! The guides were knowledgeable and the views were breathtaking.',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: 2,
    name: 'Marco Rodriguez',
    country: 'Spain',
    rating: 5,
    text: 'Professional service and amazing trekking routes. Highly recommend for anyone visiting Nepal!',
    image:
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: 3,
    name: 'Lisa Chen',
    country: 'Australia',
    rating: 5,
    text: 'The trip of a lifetime! Every detail was perfectly planned and executed.',
    image:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
]

const TestimonialAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(initialTestimonials)

  const [editId, setEditId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formVisible, setFormVisible] = useState(false)

  // Load testimonial data into form for editing
  const handleEdit = (t: Testimonial) => {
    setEditId(t.id)
    setName(t.name)
    setCountry(t.country)
    setRating(t.rating)
    setText(t.text)
    setImage(t.image)
    setImageFile(null) // reset file when editing existing image url
    setFormVisible(true)
  }

  // Handle image upload and preview
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      // Revoke old object url if any
      if (image.startsWith('blob:')) {
        URL.revokeObjectURL(image)
      }

      const objectUrl = URL.createObjectURL(file)
      setImage(objectUrl)
    }
  }

  // Delete testimonial
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(prev => prev.filter(t => t.id !== id))
      if (editId === id) resetForm()
    }
  }

  const resetForm = () => {
    if (image.startsWith('blob:')) {
      URL.revokeObjectURL(image)
    }
    setEditId(null)
    setName('')
    setCountry('')
    setRating(5)
    setText('')
    setImage('')
    setImageFile(null)
    setFormVisible(false)
  }

  const handleAddOrUpdate = () => {
    if (!name.trim() || !country.trim() || !text.trim() || !image.trim()) {
      alert('Please fill in all required fields and upload an image.')
      return
    }

    if (editId) {
      // Update existing
      setTestimonials(prev =>
        prev.map(t =>
          t.id === editId
            ? { id: editId, name, country, rating, text, image }
            : t
        )
      )
    } else {
      // Add new
      setTestimonials(prev => [
        ...prev,
        { id: Date.now(), name, country, rating, text, image }
      ])
    }

    resetForm()
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Mobile menu toggle */}
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

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className='lg:ml-64'>
        <Header />

        <main className='max-w-5xl mx-auto p-6'>
          <h1 className='text-2xl font-bold mb-4'>Manage Testimonials</h1>

          {!formVisible && (
            <button
              onClick={() => setFormVisible(true)}
              className='mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2'
            >
              <Plus size={18} /> Add New Testimonial
            </button>
          )}

          {formVisible && (
            <div className='mb-6 bg-gray-50 p-6 rounded-lg border'>
              <label className='block mb-2 font-semibold'>
                Name (required)
                <input
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Name'
                  className='w-full border rounded p-2 mt-1'
                />
              </label>

              <label className='block mb-2 font-semibold'>
                Country (required)
                <input
                  type='text'
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder='Country'
                  className='w-full border rounded p-2 mt-1'
                />
              </label>

              <label className='block mb-2 font-semibold'>
                Rating (1-5)
                <input
                  type='number'
                  min={1}
                  max={5}
                  value={rating}
                  onChange={e => setRating(Number(e.target.value))}
                  className='w-full border rounded p-2 mt-1'
                />
              </label>

              <label className='block mb-2 font-semibold'>
                Testimonial Text (required)
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder='Testimonial text'
                  rows={4}
                  className='w-full border rounded p-2 mt-1'
                />
              </label>

              <label className='block mb-2 font-semibold'>
                Upload Image (required)
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='w-full border rounded p-2 mt-1'
                />
              </label>

              {image && (
                <div className='mb-4'>
                  <img
                    src={image}
                    alt='Preview'
                    className='w-24 h-24 rounded-full object-cover border-2 border-orange-500'
                  />
                </div>
              )}

              <div className='flex justify-end gap-3'>
                <button
                  onClick={handleAddOrUpdate}
                  className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
                >
                  {editId ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
                <button
                  onClick={resetForm}
                  className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition'
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Testimonials table */}
          <table className='w-full border border-gray-300 text-sm'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border p-2'>Image</th>
                <th className='border p-2'>Name</th>
                <th className='border p-2'>Country</th>
                <th className='border p-2'>Rating</th>
                <th className='border p-2'>Testimonial</th>
                <th className='border p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={6} className='text-center p-4 text-gray-500'>
                    No testimonials yet.
                  </td>
                </tr>
              )}

              {testimonials.map(t => (
                <tr key={t.id}>
                  <td className='border p-2'>
                    <img
                      src={t.image}
                      alt={t.name}
                      className='w-16 h-16 rounded-full object-cover border-2 border-orange-500'
                    />
                  </td>
                  <td className='border p-2 font-semibold'>{t.name}</td>
                  <td className='border p-2'>{t.country}</td>
                  <td className='border p-2'>{t.rating} / 5</td>
                  <td className='border p-2 max-w-xs truncate'>{t.text}</td>
                  <td className='border p-2 flex gap-2'>
                    <button
                      onClick={() => handleEdit(t)}
                      className='bg-yellow-500 p-1 rounded hover:bg-yellow-600 text-white'
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className='bg-red-600 p-1 rounded hover:bg-red-700 text-white'
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className='fixed inset-0 bg-black/50 z-30 lg:hidden'
        />
      )}
    </div>
  )
}

export default TestimonialAdmin
