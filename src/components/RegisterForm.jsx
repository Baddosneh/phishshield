import React, { useState } from 'react';
import axios from 'axios';
import { Shield, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  if (!terms) {
    setError('You must agree to the terms and privacy policy.');
    return;
  }
  try {
     const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {      username,
      email,
      password,
    });
    // Store JWT token if provided
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } else {
      setError('Registration succeeded but no token was returned.');
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Registration failed. Please try again.');
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl p-8 rounded-xl">
        <div className="flex flex-col items-center">
          <Shield className="w-12 h-12 text-blue-400" />
          <h2 className="mt-6 text-3xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-gray-300">Join PhishShield's AI-powered security</p>
        </div>
        {error && <div className="bg-red-100 text-red-700 rounded-lg p-3 my-3">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 rounded-lg p-3 my-3">{success}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="pl-10 w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  placeholder="Username"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10 w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={terms}
              onChange={e => setTerms(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
              I agree to the <a href="/terms" className="text-blue-400 hover:text-blue-300">Terms</a> and <a href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;