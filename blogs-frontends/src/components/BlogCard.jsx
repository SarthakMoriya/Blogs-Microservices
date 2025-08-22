import {
  Calendar,
  Star,
  Tag,
  Clock,
  Heart,
  Eye,
  MessageCircle,
  User,
  ArrowRight,
  Filter,
} from "lucide-react";

// BlogCard Component
const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-2xl font-bold">
                  {blog.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-slate-500 text-sm">No Image</p>
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {blog.featured && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-700 backdrop-blur-sm">
            {blog.category || "General"}
          </span>
        </div>

        {/* Status Badge */}
        {blog.status !== "published" && (
          <div className="absolute bottom-4 left-4">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                blog.status === "draft"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
          {blog.name}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {blog.desc}
        </p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="text-xs text-slate-500 px-2 py-1">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(blog.createdAt)}
            </div>
            {blog.readTime > 0 && (
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {blog.readTime} min read
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-xs text-slate-500">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {blog.likes || 0}
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {blog.views || 0}
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {blog.commentCount || 0}
            </div>
          </div>
        </div>

        {/* Author */}
        {blog.author && (
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">
                {blog.author.name || "Anonymous"}
              </p>
              <p className="text-xs text-slate-500">Author</p>
            </div>
          </div>
        )}

        {/* Read More Button */}
        <button
          onClick={() => window.open(`/blogs/${blog._id}`, "_blank")}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center group shadow-lg hover:shadow-xl"
        >
          Read Full Article
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
