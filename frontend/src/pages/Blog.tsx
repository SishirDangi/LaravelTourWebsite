import React, { useState } from 'react'
import BlogCard from '../components/BlogCard'
import SectionHeader from '../components/SectionHeader'
import { blogPosts, Blog } from '../data/blogData'

const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

  const handleBack = () => setSelectedBlog(null)

  return (
    <>
      <SectionHeader
        title='Trekking Insights & Travel Tips'
        description='Stay updated with the latest trekking guides, destination highlights, and expert travel tips. Explore real stories, preparation checklists, and hidden gems to make your Himalayan adventure unforgettable.'
        backgroundImage='https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress'
      />

      <div className='max-w-6xl mx-auto px-4 py-10'>
        {!selectedBlog ? (
          <>
            <h2 className='text-3xl font-bold text-center mb-10'>
              Blog Articles
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[...blogPosts].reverse().map(blog => (
                <BlogCard key={blog.id} blog={blog} onClick={setSelectedBlog} />
              ))}
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={handleBack}
              className='mb-6 text-blue-500 hover:underline'
            >
              ← Back to Blogs
            </button>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className='w-full h-64 object-cover rounded-md mb-6'
            />
            <h1 className='text-3xl font-bold mb-2'>{selectedBlog.title}</h1>
            <p className='text-gray-500 mb-4'>
              ✍️ {selectedBlog.author} | 🗓 {selectedBlog.date}
            </p>
            <p className='text-lg text-gray-700'>{selectedBlog.description}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default BlogPage
