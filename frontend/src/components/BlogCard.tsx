import { motion } from 'framer-motion'

interface Blog {
  id: string
  image: string
  title: string
  author: string
  date: string
  description: string
}

interface BlogCardProps {
  blog: Blog
  onClick: (blog: Blog) => void
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  return (
    <motion.div
      className='bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer mx-2'
      whileHover={{
        scale: 1.05,
        boxShadow: '0px 10px 20px rgba(0,0,0,0.2)'
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(blog)}
    >
      <motion.img
        src={blog.image}
        alt={blog.title}
        className='w-full h-48 object-cover'
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />

      <div className='p-4'>
        <h3 className='text-xl font-semibold mb-1 text-gray-800'>
          {blog.title}
        </h3>

        <p className='text-sm text-gray-500'>
          ✍️ {blog.author} &nbsp; | &nbsp; 🗓 {blog.date}
        </p>

        <p className='text-gray-700 mt-3'>
          {blog.description.split(' ').length > 15
            ? blog.description.split(' ').slice(0, 15).join(' ') + '...'
            : blog.description}
        </p>

        <motion.button
          className='text-blue-500 hover:text-blue-700 mt-4 inline-flex items-center font-medium'
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          Read More →
        </motion.button>
      </div>
    </motion.div>
  )
}

export default BlogCard
