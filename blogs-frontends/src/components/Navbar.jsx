import React, { useState } from "react";
import { Home, User, LogIn, UserPlus, PenTool, Menu, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-slate-200 sticky top-0 z-50 min-w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <span>BlogSpace</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => navigate('/')}
                className=" bg-white flex items-center px-4 py-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>
              
              <button
                onClick={() => navigate('/login')}
                className="flex items-center px-4 py-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
              
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center px-4 py-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </button>
            </div>
          </div>

          {/* Create Blog Button & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Create Blog Button */}
            <button
              onClick={() => navigate('/create')}
              className="hidden sm:flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Blog
            </button>

            {/* Mobile Create Blog Button */}
            <button
              onClick={() => navigate('/create')}
              className="sm:hidden p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              <Plus className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-slate-200 shadow-lg rounded-b-xl">
              <button
                onClick={() => navigate('/')}
                className="flex items-center w-full px-3 py-2 rounded-lg text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium"
              >
                <Home className="w-4 h-4 mr-3" />
                Home
              </button>
              
              <button
                onClick={() => navigate('/login')}
                className="flex items-center w-full px-3 py-2 rounded-lg text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium"
              >
                <LogIn className="w-4 h-4 mr-3" />
                Login
              </button>
              
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center w-full px-3 py-2 rounded-lg text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium"
              >
                <UserPlus className="w-4 h-4 mr-3" />
                Sign Up
              </button>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/create-blog')}
                  className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Blog
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;