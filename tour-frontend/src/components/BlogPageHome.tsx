import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "./Footer";

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
  const [currentPage, setCurrentPage] = useState(0); // pagination page

  const apiUrl = import.meta.env.VITE_API_URL as string;
  const baseUrl = apiUrl.replace("/api", "");

  const postsPerPage = 3;

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
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (apiUrl) {
      fetchBlogs();
    } else {
      setError("API URL is not configured");
      setLoading(false);
    }
  }, [apiUrl]);

  // pagination logic
 // Always sort blogs by post_date (newest first)
const sortedBlogs = [...blogs].sort(
  (a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime()
);

  const totalPages = Math.ceil(sortedBlogs.length / postsPerPage);
  const paginatedBlogs = sortedBlogs.slice(
    currentPage * postsPerPage,
    currentPage * postsPerPage + postsPerPage
  );

  // slide animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  return (
    <div className="pt-2 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <motion.div
            className="flex items-center justify-center min-h-[250px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="animate-spin h-14 w-14 text-orange-500"
              viewBox="0 0 24 24"
            >
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
            {/* Section Heading */}
            <motion.h2
              className='text-5xl font-bold text-center mt-0 mb-10 text-orange-700'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Blog Articles
            </motion.h2>

            {/* Blog Pagination with Slide */}
            <div className="relative">
              <div className="overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentPage}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {paginatedBlogs.length > 0 ? (
                      paginatedBlogs.map((blog) => (
                        <div
                          key={blog.id}
                          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden group cursor-pointer"
                          onClick={() => setSelectedBlog(blog)}
                        >
                          {blog.image && (
                            <div className="overflow-hidden">
                              <img
                                src={`${baseUrl}/storage/${blog.image}`}
                                alt={blog.title}
                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2 flex gap-2 items-center">
                              ✍️ {blog.writer_name} | 🗓{" "}
                              {new Date(blog.post_date).toLocaleDateString()}
                            </p>
                            <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                              {blog.content}
                            </p>
                            <span className="inline-block mt-4 text-orange-600 font-semibold group-hover:underline">
                              Read More →
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-lg text-gray-600 col-span-full">
                        No blogs found.
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-8">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                    className={`p-3 rounded-full border ${
                      currentPage === 0
                        ? "text-gray-400 border-gray-300"
                        : "text-orange-600 border-orange-400 hover:bg-orange-50"
                    }`}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="font-medium text-gray-700">
                    {currentPage + 1} / {totalPages}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                    className={`p-3 rounded-full border ${
                      currentPage === totalPages - 1
                        ? "text-gray-400 border-gray-300"
                        : "text-orange-600 border-orange-400 hover:bg-orange-50"
                    }`}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Blog Details Page */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <button
              onClick={() => setSelectedBlog(null)}
              className="group flex items-center gap-2 mb-6 px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Blogs</span>
            </button>

            {selectedBlog.image && (
              <img
                src={`${baseUrl}/storage/${selectedBlog.image}`}
                alt={selectedBlog.title}
                className="w-full max-h-[450px] object-cover rounded-xl mb-8 shadow-md"
              />
            )}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              {selectedBlog.title}
            </h1>
            <p className="text-gray-500 mb-6 flex flex-wrap gap-2 text-sm sm:text-base">
              <span>✍️ {selectedBlog.writer_name}</span>
              <span>|</span>
              <span>
                🗓 {new Date(selectedBlog.post_date).toLocaleDateString()}
              </span>
            </p>
            <div className="prose prose-lg text-gray-700 max-w-none leading-relaxed">
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
