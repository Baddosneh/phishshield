
import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Sparkles } from 'lucide-react';
import {useNavigate} from 'react-router-dom';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password-request`, { email });
      setSuccess(response.data.message || 'If your email is registered, you will receive a password reset link shortly.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center py-16">
      <div className="w-full max-w-md bg-white/10 rounded-xl shadow-lg p-8 mx-4">
        <div className="flex flex-col items-center mb-6">
          <Sparkles className="w-10 h-10 text-blue-400 animate-pulse mb-2" />
          <h1 className="text-2xl font-bold text-white mb-1">Forgot Your Password?</h1>
          <p className="text-gray-300 text-center">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-200 mb-2 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                id="email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Request Reset Link'}
          </button>
        </form>
        {success && (
          <div className="mt-6 text-green-300 text-center font-medium">{success}</div>
        )}
        {error && (
          <div className="mt-6 text-red-300 text-center font-medium">{error}</div>
        )}
      </div>
    </div>
  );
};

export default RequestPasswordReset;
