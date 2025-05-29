import React, { useState } from 'react';
import axios from 'axios';
import { Lock, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();



 const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
        token,
        password,
      });
      setSuccess(response.data.message || 'Password reset successful! Redirecting to login...');
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
          <h1 className="text-2xl font-bold text-white mb-1">Reset Your Password</h1>
          <p className="text-gray-300 text-center">
            Enter your new password below to secure your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-gray-200 mb-2 font-medium">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter new password"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirm" className="block text-gray-200 mb-2 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                id="confirm"
                type="password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition disabled:opacity-60"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;