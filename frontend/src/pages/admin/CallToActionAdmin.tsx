import React, { useState, ChangeEvent } from 'react'
import Sidebar from '../../components/admin/Sidebar'
import Header from '../../components/admin/Header'
import { Menu, X, Pencil, Trash2, Plus } from 'lucide-react'

interface CallToActionContent {
  id: number
  backgroundImage: string // This will store the image URL or object URL
  heading: string
  paragraph: string
  buttonText: string
  buttonLink: string
}

const initialData: CallToActionContent[] = [
  {
    id: 1,
    backgroundImage:
      'https://www.muchbetteradventures.com/magazine/content/images/2024/04/Piuquenes15_Argentina_AndesVertical.jpg',
    heading: 'Ready for Your Adventure?',
    paragraph:
      'Join one of our guided treks and explore the beauty of Nepal with experts.',
    buttonText: 'Book a Trek',
    buttonLink: '/contact'
  }
]

const CallToActionAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [contents, setContents] = useState<CallToActionContent[]>(initialData)

  const [editId, setEditId] = useState<number | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<string>('')
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null) // store file to revoke later
  const [heading, setHeading] = useState('')
  const [paragraph, setParagraph] = useState('')
  const [buttonText, setButtonText] = useState('')
  const [buttonLink, setButtonLink] = useState('')
  const [formVisible, setFormVisible] = useState(false)

  // Load data into form for editing
  const handleEdit = (content: CallToActionContent) => {
    setEditId(content.id)
    setBackgroundImage(content.backgroundImage)
    setBackgroundFile(null) // Reset file when editing existing image URL
    setHeading(content.heading)
    setParagraph(content.paragraph)
    setButtonText(content.buttonText)
    setButtonLink(content.buttonLink)
    setFormVisible(true)
  }

  // Handle image file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setBackgroundFile(file)

      // Revoke previous object URL if any
      if (backgroundImage.startsWith('blob:')) {
        URL.revokeObjectURL(backgroundImage)
      }

      // Create new object URL for preview
      const objectUrl = URL.createObjectURL(file)
      setBackgroundImage(objectUrl)
    }
  }

  // Delete content
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContents(prev => prev.filter(c => c.id !== id))
      if (editId === id) resetForm()
    }
  }

  const resetForm = () => {
    if (backgroundImage.startsWith('blob:')) {
      URL.revokeObjectURL(backgroundImage)
    }
    setEditId(null)
    setBackgroundImage('')
    setBackgroundFile(null)
    setHeading('')
    setParagraph('')
    setButtonText('')
    setButtonLink('')
    setFormVisible(false)
  }

  const handleAddOrUpdate = () => {
    if (!backgroundImage.trim() || !heading.trim() || !paragraph.trim()) {
      alert('Background image, heading, and paragraph are required.')
      return
    }

    // For demo: we use the backgroundImage as is (could be blob url or remote url)
    if (editId) {
      // Update existing
      setContents(prev =>
        prev.map(c =>
          c.id === editId
            ? {
                id: editId,
                backgroundImage,
                heading,
                paragraph,
                buttonText,
                buttonLink
              }
            : c
        )
      )
    } else {
      // Add new
      setContents(prev => [
        ...prev,
        {
          id: Date.now(),
          backgroundImage,
          heading,
          paragraph,
          buttonText,
          buttonLink
        }
      ])
    }
    resetForm()
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

      {/* Main Content */}
      <div className='lg:ml-64'>
        <Header />

        <main className='p-6 max-w-5xl mx-auto'>
          <h1 className='text-2xl font-bold mb-4'>
            Manage Call To Action Section
          </h1>

          {!formVisible && (
            <button
              onClick={() => setFormVisible(true)}
              className='mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2'
            >
              <Plus size={18} /> Add New CTA Content
            </button>
          )}

          {formVisible && (
            <div className='mb-6 border rounded-lg bg-gray-50 p-6'>
              <label className='block mb-2 font-semibold'>
                Background Image (upload from device)
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='w-full border rounded p-2 mt-1'
                />
              </label>

              {backgroundImage && (
                <div className='mb-4'>
                  <img
                    src={backgroundImage}
                    alt='Background preview'
                    className='w-full max-h-48 object-cover rounded'
                  />
                </div>
              )}

              <label className='block mb-2 font-semibold'>
                Heading Text (required)
                <input
                  type='text'
                  value={heading}
                  onChange={e => setHeading(e.target.value)}
                  placeholder='Enter heading text'
                  className='w-full border rounded p-2 mt-1'
                />
              </label>

              <label className='block mb-2 font-semibold'>
                Paragraph Text (required)
                <textarea
                  value={paragraph}
                  onChange={e => setParagraph(e.target.value)}
                  placeholder='Enter paragraph text'
                  className='w-full border rounded p-2 mt-1'
                  rows={4}
                />
              </label>

              <label className='block mb-2 font-semibold'>
                Button Text
                <input
                  type='text'
                  value={buttonText}
                  onChange={e => setButtonText(e.target.value)}
                  placeholder='Button text (e.g. Book a Trek)'
                  className='w-full border rounded p-2 mt-1'
                />
              </label>

              <label className='block mb-4 font-semibold'>
                Button Link
                <input
                  type='text'
                  value={buttonLink}
                  onChange={e => setButtonLink(e.target.value)}
                  placeholder='Button link (e.g. /contact)'
                  className='w-full border rounded p-2 mt-1'
                />
              </label>

              <div className='flex gap-3 justify-end'>
                <button
                  onClick={handleAddOrUpdate}
                  className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
                >
                  {editId ? 'Update Content' : 'Add Content'}
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

          {/* Existing content list */}
          <table className='w-full border border-gray-300 text-sm'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border p-2'>Background Image</th>
                <th className='border p-2'>Heading</th>
                <th className='border p-2'>Paragraph</th>
                <th className='border p-2'>Button Text</th>
                <th className='border p-2'>Button Link</th>
                <th className='border p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contents.length === 0 && (
                <tr>
                  <td colSpan={6} className='text-center p-4 text-gray-500'>
                    No call-to-action content yet.
                  </td>
                </tr>
              )}

              {contents.map(c => (
                <tr key={c.id}>
                  <td className='border p-2'>
                    <img
                      src={c.backgroundImage}
                      alt='Background'
                      className='w-48 h-24 object-cover rounded'
                    />
                  </td>
                  <td className='border p-2 font-semibold'>{c.heading}</td>
                  <td className='border p-2 max-w-xs truncate'>
                    {c.paragraph}
                  </td>
                  <td className='border p-2'>{c.buttonText}</td>
                  <td className='border p-2'>{c.buttonLink}</td>
                  <td className='border p-2 flex gap-2'>
                    <button
                      onClick={() => handleEdit(c)}
                      className='bg-yellow-500 p-1 rounded hover:bg-yellow-600 text-white'
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
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

export default CallToActionAdmin
