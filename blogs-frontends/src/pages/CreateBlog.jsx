import React, { useState } from 'react';
import { Save, Eye, ImagePlus, Tag, FileText, Calendar, User, Hash, Globe, Settings } from 'lucide-react';
import { createBlog } from '../api/api';

const BlogCreateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: '',
    desc: '',
    content: '',
    category: 'general',
    tags: [],
    status: 'draft',
    featured: false,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    author: '' // You would typically get this from auth context
  });

  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [errors, setErrors] = useState({});

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addKeyword = (e) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      if (!formData.metaKeywords.includes(keywordInput.trim())) {
        setFormData(prev => ({
          ...prev,
          metaKeywords: [...prev.metaKeywords, keywordInput.trim()]
        }));
      }
      setKeywordInput('');
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setFormData(prev => ({
      ...prev,
      metaKeywords: prev.metaKeywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Title is required';
    if (!formData.desc.trim()) newErrors.desc = 'Description is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response=await createBlog(JSON.stringify(formData))
      console.log(response)
      if (response.ok) {
        const result = await response.json();
        console.log('Blog created successfully:', result);
        // Reset form or redirect
        alert('Blog created successfully!');
      } else {
        throw new Error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    setFormData(prev => ({ ...prev, status: 'draft' }));
    handleSubmit({ preventDefault: () => {} });
  };

  const handlePublish = () => {
    setFormData(prev => ({ ...prev, status: 'published' }));
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 w-screen">
      <div className="w-[80vw] mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Create New Blog Post
          </h1>
          <p className="text-slate-600 text-lg">Share your thoughts with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="flex border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'content'
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Content
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'settings'
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Settings
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'seo'
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Globe className="w-4 h-4 inline mr-2" />
                SEO
              </button>
            </div>

            <div className="p-8">
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <FileText className="w-4 h-4 inline mr-1" />
                      Blog Title *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={` text-gray-700 w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 text-lg font-medium ${
                        errors.name 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                      } focus:outline-none focus:ring-4`}
                      placeholder="Enter your blog title..."
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Hash className="w-4 h-4 inline mr-1" />
                      URL Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className=" text-gray-700 w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="blog-url-slug"
                    />
                    <p className="text-xs text-slate-500 mt-1">Auto-generated from title, but you can customize it</p>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <ImagePlus className="w-4 h-4 inline mr-1" />
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="text-gray-700 w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Blog Description *
                    </label>
                    <textarea
                      name="desc"
                      value={formData.desc}
                      onChange={handleInputChange}
                      rows={4}
                      className={`text-gray-700 w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                        errors.desc 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                      } focus:outline-none focus:ring-4`}
                      placeholder="Write a compelling description for your blog post..."
                    />
                    {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc}</p>}
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Blog Content *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={12}
                      className={`text-gray-700 w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                        errors.content 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                      } focus:outline-none focus:ring-4`}
                      placeholder="Start writing your blog content here..."
                    />
                    {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Author */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Author ID *
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className={`text-gray-700 w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                          errors.author 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
                        } focus:outline-none focus:ring-4`}
                        placeholder="Author MongoDB ObjectId"
                      />
                      {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 bg-white"
                      >
                        <option value="general">General</option>
                        <option value="technology">Technology</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="travel">Travel</option>
                        <option value="food">Food</option>
                        <option value="health">Health</option>
                        <option value="business">Business</option>
                        <option value="education">Education</option>
                      </select>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Tag className="w-4 h-4 inline mr-1" />
                      Tags
                    </label>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={addTag}
                      className="text-gray-700 w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="Type a tag and press Enter"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status and Featured */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 bg-white"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-indigo-600 border-2 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2"
                        />
                        <span className="text-sm font-semibold text-slate-700">Featured Post</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  {/* Meta Title */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                      className="text-gray-700 w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="SEO optimized title (60 chars max)"
                      maxLength={60}
                    />
                    <p className="text-xs text-slate-500 mt-1">{formData.metaTitle.length}/60 characters</p>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="SEO meta description (160 chars max)"
                      maxLength={160}
                    />
                    <p className="text-xs text-slate-500 mt-1">{formData.metaDescription.length}/160 characters</p>
                  </div>

                  {/* Meta Keywords */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={addKeyword}
                      className=" text-gray-700 w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="Type a keyword and press Enter"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.metaKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeKeyword(keyword)}
                            className="ml-2 text-purple-600 hover:text-purple-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="px-8 py-3 bg-slate-600 text-white rounded-xl font-semibold hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Draft
            </button>
            
            <button
              type="button"
              onClick={handlePublish}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              <Eye className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Publishing...' : 'Publish Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogCreateForm;