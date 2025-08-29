import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL as string;
  const baseUrl = apiUrl.replace('/api', '');

  // Fetch all blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiUrl}/blogs`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.statusText}`);
        }
        const data = await response.json();
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
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

  const handleBack = () => setSelectedBlog(null);

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="w-full font-sans">
        <div className="relative w-full h-[300px] md:h-[400px]">
          <img
            src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress"
            alt="Blog Header"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 text-white text-center space-y-3">
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              Trekking Insights & Travel Tips
            </h1>
            <nav className="text-base md:text-lg flex gap-2">
              <Link to="/" className="hover:text-yellow-300 font-semibold">
                Home
              </Link>
              <span>&gt;</span>
              <span className="font-semibold">Blogs</span>
            </nav>
            <p className="text-base md:text-lg text-white/90 max-w-2xl">
              Stay updated with the latest trekking guides, destination highlights, and expert travel tips.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <motion.p
            className="text-center text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.p>
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
              className="text-3xl md:text-4xl font-bold text-center text-[#1E293B] mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Blog Articles
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.length > 0 ? (
                [...blogs].reverse().map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
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
              onClick={handleBack}
              className="group flex items-center gap-2 mb-8 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Blogs</span>
            </button>
            {selectedBlog.image && (
              <img
                src={`${baseUrl}/storage/${selectedBlog.image}`}
                alt={selectedBlog.title}
                className="w-full max-h-64 md:max-h-96 object-contain rounded-xl mb-8 shadow-md"
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.alt = 'Image not available';
                }}
              />
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
              {selectedBlog.title}
            </h1>
            <p className="text-gray-500 mb-6 flex items-center gap-2">
              <span>✍️ {selectedBlog.writer_name}</span>
              <span>|</span>
              <span>🗓 {new Date(selectedBlog.post_date).toLocaleDateString()}</span>
            </p>
            <div className="prose prose-lg text-gray-700 max-w-none">
              {selectedBlog.content}
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;