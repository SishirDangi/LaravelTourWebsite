import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';

interface Blog {
  id: number;
  title: string;
  writer_name: string;
  content: string;
  image: string | null;
  post_date: string;
}

const BlogPageHome: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL as string;
  const baseUrl = apiUrl.replace('/api', '');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiUrl}/blogs`);
        if (!response.ok) throw new Error(`Failed to fetch blogs`);
        const data = await response.json();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (apiUrl) {
      fetchBlogs();
    } else {
      setError('API URL is not configured');
      setLoading(false);
    }
  }, [apiUrl]);

  return (
    <div className="pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <motion.div
            className="flex items-center justify-center min-h-[250px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="animate-spin h-14 w-14 text-orange-500" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
              />
            </svg>
          </motion.div>
        ) : error ? (
          <motion.p
            className="text-center text-lg text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        ) : !selectedBlog ? (
          <>
            <motion.h2
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-center mb-10 text-orange-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Blog Articles
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {blogs.length > 0 ? (
  [...blogs].reverse().slice(0, 3).map((blog, index) => (
    <motion.div
      key={blog.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <BlogCard blog={blog} onClick={setSelectedBlog} />
    </motion.div>
  ))
) : (
  <motion.p
    className="text-center text-lg text-gray-600 col-span-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    No blogs found.
  </motion.p>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => setSelectedBlog(null)}
              className="group flex items-center gap-2 mb-6 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Blogs</span>
            </button>
            {selectedBlog.image && (
              <img
                src={`${baseUrl}/storage/${selectedBlog.image}`}
                alt={selectedBlog.title}
                className="w-full max-h-64 md:max-h-96 object-contain rounded-xl mb-6 shadow-md"
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.alt = 'Image not available';
                }}
              />
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
              {selectedBlog.title}
            </h1>
            <p className="text-gray-500 mb-4 flex flex-wrap gap-2 text-sm sm:text-base">
              <span>✍️ {selectedBlog.writer_name}</span>
              <span>|</span>
              <span>🗓 {new Date(selectedBlog.post_date).toLocaleDateString()}</span>
            </p>
            <div className="prose prose-lg text-gray-700 max-w-none text-justify">
              {selectedBlog.content}
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPageHome;
