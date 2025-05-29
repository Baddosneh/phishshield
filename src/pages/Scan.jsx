
import React, { useState } from 'react';
import { Shield, Mail, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResultsModal from '../components/ResultsModal';

const Scan = () => {
  const [emailInput, setEmailInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);

  // Separate loading states
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [modalScanType, setModalScanType] = useState('email');

  // Email scan
  const handleEmailScan = async (e) => {
    e.preventDefault();
    setLoadingEmail(true);
    setError(null);
    setResults(null);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/scan/email`,
        { input: emailInput },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setResults(response.data);
      setModalScanType('email');
      setModalOpen(true);
    } catch (err) {

      if (err.response && err.response.status === 403) {
         
        navigate('/pricing');
      }
      if (err.response) {
        setError(
          err.response.data?.error ||
          JSON.stringify(err.response.data) ||
          'An error occurred while scanning the email.'
        );
      } else if (err.request) {
        setError('No response received from server.');
      } else {
        setError('An unexpected error occurred: ' + err.message);
      }
    } finally {
      setLoadingEmail(false);
    }
  };

  // URL scan
  const handleUrlScan = async (e) => {
    e.preventDefault();
    setLoadingUrl(true);
    setError(null);
    setResults(null);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/scan/url`,
        { input: urlInput },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setResults(response.data);
      setModalScanType('url');
      setModalOpen(true);
    } catch (err) {
      if (err.response && err.response.status === 403) {
         
        navigate('/pricing');
      }
      if (err.response) {
        setError(
          err.response.data?.error ||
          JSON.stringify(err.response.data) ||
          'An error occurred while scanning the url.'
        );
      } else if (err.request) {
        setError('No response received from server.');
      } else {
        setError('An unexpected error occurred: ' + err.message);
      }
    } finally {
      setLoadingUrl(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">AI-Powered Scan</h1>
          <p className="text-xl text-gray-300">Scan emails or URLs for instant threat analysis</p>
        </div>

        {/* Email Scan Section */}
        <form onSubmit={handleEmailScan} className="bg-white/10 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-400" />
            Email Scan
          </h3>
          <div className="flex gap-2">
            <textarea
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              placeholder="Paste suspicious email content here..."
              className="flex-1 bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-y min-h-[100px]"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
              disabled={loadingEmail}
            >
              {loadingEmail ? 'Scanning...' : 'Scan'}
            </button>
          </div>
        </form>

        {/* URL Scan Section */}
        <form onSubmit={handleUrlScan} className="bg-white/10 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-400" />
            URL Scan
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              placeholder="Paste a suspicious URL here..."
              className="flex-1 bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
              disabled={loadingUrl}
            >
              {loadingUrl ? 'Scanning...' : 'Scan'}
            </button>
          </div>
        </form>

        {/* Results Modal */}
        <ResultsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          results={results}
          scanType={modalScanType}
        />

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 rounded-lg p-4 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan;
