import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Linkedin, Github } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-lg py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">PhishShield</span>
            </div>
            <p className="text-gray-400 mb-4">
              Protecting your digital world with advanced AI security.
            </p>
            <div className="flex gap-4">
              <button  className="text-gray-400 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition">
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/about-scan" className="text-gray-400 hover:text-white transition">Email Scan</Link></li>
              <li><Link to="/about-scan" className="text-gray-400 hover:text-white transition">Url Scan</Link></li>
              <li><Link to="/about-scan" className="text-gray-400 hover:text-white transition">Threat Intelligence</Link></li>
              <li><Link to="/about-scan" className="text-gray-400 hover:text-white transition">Gmail Access</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link className="text-gray-400 hover:text-white transition" to='/about-scan'>About</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition">Careers</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link className="text-gray-400 hover:text-white transition" to="/privacy">Privacy Policy</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" to="/terms">Terms of Service</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" to="/cookies">Cookie Policy</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" to="/security">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} PhishShield AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;