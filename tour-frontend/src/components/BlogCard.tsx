import React from 'react';

interface Blog {
  id: number;
  title: string;
  writer_name: string;
  content: string;
  image: string | null;
  post_date: string;
}

interface BlogCardProps {
  blog: Blog;
  onClick: (blog: Blog) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const baseUrl = apiUrl.replace('/api', '');

  return (
    <div
      className="border rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(blog)}
    >
      {blog.image && (
        <img
          src={`${baseUrl}/storage/${blog.image}`}
          alt={blog.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = '';
            e.currentTarget.alt = 'Image not available';
          }}
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          ✍️ {blog.writer_name} | 🗓 {new Date(blog.post_date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 line-clamp-3">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogCard;