import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { FaPlus, FaTrash, FaEdit, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

interface Blog {
  id: number;
  title: string;
  writer_name: string;
  content: string;
  image: string | null;
  post_date: string;
  created_at: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const MAX_FILE_SIZE_KB = 512;

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
  </div>
);

const ConfirmModal = ({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) => (
  <div className="fixed inset-0 backdrop-blur-[2px] bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={onCancel}>
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl border border-gray-200"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-lg mb-6 text-center font-medium text-gray-800">{message}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition shadow"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow"
        >
          Delete
        </button>
      </div>
    </motion.div>
  </div>
);

const BlogDetailModal = ({ blog, onClose }: { blog: Blog; onClose: () => void }) => {
  const imageUrl = blog.image
    ? `${API_BASE_URL.replace('/api', '')}/storage/${blog.image}`
    : null;
  return (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-black bg-opacity-40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
          >
            <FaTimes className="text-gray-800 text-xl" />
          </button>
          <div className="p-8 overflow-y-auto max-h-[90vh] bg-gradient-to-b from-gray-50 to-white">
            <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden mb-6">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '';
                    e.currentTarget.alt = 'Image not available';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                  No Image Available
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">{blog.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Writer</h3>
                <p className="text-xl text-gray-800">{blog.writer_name || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Post Date</h3>
                <p className="text-xl text-gray-800">{new Date(blog.post_date).toLocaleDateString() || 'N/A'}</p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-4 text-2xl">Content</h3>
              <p className="text-gray-700 whitespace-pre-line text-justify leading-relaxed">{blog.content || 'No content available'}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState({
    title: '',
    writer_name: '',
    content: '',
    image: null as File | null,
    post_date: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fileError, setFileError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(12);
  const today = new Date().toISOString().split('T')[0];

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs`);
      if (Array.isArray(response.data)) {
        setBlogs(response.data);
      } else {
        setBlogs([]);
        toast.error('Unexpected response from server');
      }
    } catch (err: any) {
      setBlogs([]);
      toast.error(err.response?.data?.error || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/webp': ['.webp'], 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    multiple: false,
    maxSize: MAX_FILE_SIZE_KB * 1024,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setFileError('File too large (max 512KB) or invalid format');
        toast.error('File too large (max 512KB) or invalid format');
      } else {
        setFileError('');
        setForm((prev) => ({ ...prev, image: acceptedFiles[0] }));
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const err: { [key: string]: string } = {};
    if (!form.title) err.title = 'Title is required';
    if (form.title.length > 100) err.title = 'Title must not exceed 100 characters';
    if (!form.writer_name) err.writer_name = 'Writer name is required';
    if (!form.content) err.content = 'Content is required';
    if (form.content.split(/\s+/).filter(word => word.length > 0).length > 500) {
      err.content = 'Content must not exceed 500 words';
    }
    if (!form.post_date) err.post_date = 'Post date is required';
    if (form.post_date > today) err.post_date = 'Post date cannot be in the future';
    if (!form.image && !isEditing) err.image = 'Image is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        formData.append(key, val);
      }
    });
    try {
      let res;
      if (isEditing && editingId) {
        formData.append('_method', 'PUT');
        res = await axios.post(`${API_BASE_URL}/blogs/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await axios.post(`${API_BASE_URL}/blogs`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      if (isEditing) {
        setBlogs((prev) => prev.map((blog) => (blog.id === editingId ? res.data.blog : blog)));
        toast.success('Blog updated successfully');
      } else {
        setBlogs((prev) => [...prev, res.data.blog]);
        toast.success('Blog created successfully');
      }
      setShowForm(false);
      resetForm();
    } catch (err: any) {
      if (err.response?.status === 422 && err.response.data?.errors) {
        setErrors(err.response.data.errors);
        toast.error('Please fix the errors');
      } else {
        toast.error(err.response?.data?.error || 'Failed to save blog');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      writer_name: '',
      content: '',
      image: null,
      post_date: '',
    });
    setErrors({});
    setFileError('');
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (blog: Blog) => {
    setForm({
      title: blog.title,
      writer_name: blog.writer_name,
      content: blog.content,
      image: null,
      post_date: blog.post_date.split('T')[0],
    });
    setIsEditing(true);
    setEditingId(blog.id);
    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 200);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${deleteId}`);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to delete blog');
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const paginate = (page: number) => setCurrentPage(page);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold font-['Winky_Rough',sans-serif] text-orange-500">
          Admin Blogs
        </h1>
        <button
          onClick={() => { setShowForm(true); resetForm(); }}
          className="flex items-center gap-2 text-white bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-full shadow"
        >
          <FaPlus /> Add Blog
        </button>
      </div>
      {loading && <Loader />}
      <AnimatePresence>
        {showForm && !loading && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white shadow-xl p-8 rounded-3xl border border-gray-300 mb-10"
          >
            <form onSubmit={handleSubmit} className="grid gap-6">
              <h2 className="text-2xl font-semibold text-orange-500 mb-2">Blog Details</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Blog title"
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                    maxLength={100}
                  />
                  {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                </div>
                <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Writer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="writer_name"
                    value={form.writer_name}
                    onChange={handleChange}
                    placeholder="Writer name"
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.writer_name ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                  />
                  {errors.writer_name && <p className="text-sm text-red-500 mt-1">{errors.writer_name}</p>}
                </div>
                <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Post Date (today or earlier) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="post_date"
                    value={form.post_date}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.post_date ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                    max={today}
                  />
                  {errors.post_date && <p className="text-sm text-red-500 mt-1">{errors.post_date}</p>}
                </div>
                <div className="md:col-span-2 border border-gray-300 rounded-lg p-4 shadow-sm">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.content ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
                  />
                  {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content}</p>}
                </div>
              </div>
              <div className="mt-6 border border-gray-300 rounded-lg p-5 shadow-sm">
                <h2 className="text-xl font-semibold text-orange-500 mb-3">
                  Blog Image <span className="text-red-500">*</span>
                </h2>
                {isEditing && form.image === null && (
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Existing Image</h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="relative">
                        <img
                          src={`${API_BASE_URL.replace('/api', '')}/storage/${
                            blogs.find((blog) => blog.id === editingId)?.image
                          }`}
                          alt="Existing blog"
                          className="w-24 h-24 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = '';
                            e.currentTarget.alt = 'Image not available';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                    fileError || errors.image ? 'border-red-500' : 'border-gray-400 hover:border-orange-500'
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="text-orange-500 font-medium">Drop image here...</p>
                  ) : (
                    <div>
                      <p className="text-gray-500">Click or drag an image to upload (Max 512KB)</p>
                      {form.image && (
                        <div className="mt-4">
                          <img
                            src={URL.createObjectURL(form.image)}
                            alt="Selected blog"
                            className="w-24 h-24 object-cover rounded mx-auto"
                          />
                          <p className="mt-2 text-gray-700 font-medium">{form.image.name}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {(fileError || errors.image) && (
                    <p className="text-sm text-red-500 mt-1">{fileError || errors.image}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-8 gap-4">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-8 py-3 rounded-full shadow hover:bg-orange-600 transition"
                >
                  {isEditing ? 'Update Blog' : 'Create Blog'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 px-8 py-3 rounded-full hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentBlogs.map((blog) => {
          const imageUrl = blog.image
            ? `${API_BASE_URL.replace('/api', '')}/storage/${blog.image}`
            : null;
          return (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 relative cursor-pointer overflow-hidden transform transition duration-300 hover:bg-gray-50"
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-orange-600"></div>
              <div className="flex justify-between items-start mt-4">
                <div>
                  <h2 className="text-xl font-bold text-orange-500 mb-1 tracking-tight">{blog.title}</h2>
                  <p className="text-sm text-gray-600 font-medium">
                    Writer: {blog.writer_name || 'N/A'}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(blog);
                    }}
                    className="text-orange-500 hover:text-orange-600 transform hover:scale-110 transition"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(blog.id);
                    }}
                    className="text-red-500 hover:text-red-600 transform hover:scale-110 transition"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </div>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover mt-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '';
                    e.currentTarget.alt = 'Image not available';
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg mt-3 flex items-center justify-center text-gray-500 font-medium">
                  No Image Available
                </div>
              )}
              <div className="mt-4">
                <p className="text-gray-600 mt-2 line-clamp-2 text-sm italic">{blog.content}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Posted on: {new Date(blog.post_date).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      {blogs.length === 0 && !loading && (
        <div className="text-center text-gray-600 my-4">
          No blogs found. Create a new blog to get started.
        </div>
      )}
      {blogs.length > blogsPerPage && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full ${
              currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            <FaChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`w-10 h-10 rounded-full ${
                currentPage === number ? 'bg-orange-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full ${
              currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
      <AnimatePresence>
        {deleteId && (
          <ConfirmModal
            message="Are you sure you want to delete this blog?"
            onConfirm={handleDelete}
            onCancel={() => setDeleteId(null)}
          />
        )}
        {selectedBlog && (
          <BlogDetailModal
            blog={selectedBlog}
            onClose={() => setSelectedBlog(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBlogs;