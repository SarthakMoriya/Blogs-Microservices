import React, { useEffect, useState } from "react";
// import { getBlogs } from "../api/api";
import BlogCard from "../components/BlogCard";
import { 
  Search,
  Grid,
  List
} from "lucide-react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  // Mock API call - replace with your actual getBlogs function
  const getBlogs = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            body: {
              blogs: [
                {
                  _id: '1',
                  name: 'Getting Started with React Hooks',
                  desc: 'Learn how to use React Hooks effectively in your applications. This comprehensive guide covers useState, useEffect, and custom hooks.',
                  image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
                  category: 'technology',
                  tags: ['react', 'javascript', 'hooks'],
                  likes: 42,
                  views: 1250,
                  commentCount: 8,
                  readTime: 8,
                  featured: true,
                  status: 'published',
                  createdAt: '2024-01-15T10:30:00Z',
                  author: { name: 'John Doe' }
                },
                {
                  _id: '2',
                  name: 'The Future of Web Development',
                  desc: 'Exploring emerging trends and technologies that will shape the future of web development in the coming years.',
                  image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
                  category: 'technology',
                  tags: ['webdev', 'future', 'trends'],
                  likes: 28,
                  views: 890,
                  commentCount: 5,
                  readTime: 12,
                  featured: false,
                  status: 'published',
                  createdAt: '2024-01-10T14:20:00Z',
                  author: { name: 'Jane Smith' }
                },
                {
                  _id: '3',
                  name: 'Healthy Lifestyle Tips',
                  desc: 'Simple and practical tips for maintaining a healthy lifestyle in our busy modern world.',
                  image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
                  category: 'health',
                  tags: ['health', 'lifestyle', 'wellness'],
                  likes: 35,
                  views: 567,
                  commentCount: 12,
                  readTime: 6,
                  featured: false,
                  status: 'published',
                  createdAt: '2024-01-08T09:15:00Z',
                  author: { name: 'Dr. Wilson' }
                }
              ]
            }
          }
        });
      }, 1000);
    });
  };

  useEffect(() => {
    getBlogs()
      .then((res) => {
        console.log(res.data.body);
        setBlogs(res.data.body.blogs);
        setFilteredBlogs(res.data.body.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...blogs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.likes + b.views) - (a.likes + a.views));
        break;
      case 'mostViewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory, sortBy]);

  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-w-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Discover Amazing Stories
            </h1>
            <p className="text-slate-600 text-lg">Explore our collection of insightful articles and tutorials</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-400 w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className=" text-gray-400 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="text-gray-400">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className=" text-gray-400 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="mostViewed">Most Viewed</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center bg-white border-2 border-slate-200 rounded-tl-xl rounded-bl-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-indigo-100 text-indigo-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-indigo-100 text-indigo-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Info */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;