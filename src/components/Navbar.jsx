import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-black/10 backdrop-blur-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">PhishShield</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
           
            <Link to="/login" className="px-4 py-2 bg-blue-50 hover:bg-blue-600 text-dark rounded-lg transition">Login</Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              Get Started
            </Link>
           
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-4">
             
              <Link 
                to="/login" 
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition inline-block"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition inline-block"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
              <Link 
                to="/pricing" 
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition inline-block"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;