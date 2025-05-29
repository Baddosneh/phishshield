

import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  History,
  Mail,
  Link as LinkIcon,
  Loader2,
  PlusCircle,
  
} from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// Helper: Icon for scan type
const scanTypeIcon = (type) => {
  if (type === 'email') return <Mail className="w-6 h-6 text-blue-400" title="Email" />;
  if (type === 'url') return <LinkIcon className="w-6 h-6 text-purple-400" title="URL" />;
  return <Shield className="w-6 h-6 text-gray-400" />;
};

// Helper: Icon for result status
const statusIcon = (type, prediction, confidence) => {
  if (type === 'url') {
    if (prediction === 'malware') {
      return <AlertTriangle className="w-6 h-6 text-yellow-400" title="Phishing" />;
    }
    if (prediction === 'benign') {
      return <CheckCircle className="w-6 h-6 text-green-400" title="Legitimate" />;
    }
    if (prediction && prediction.includes('phishing')) {
      return <AlertTriangle className="w-6 h-6 text-yellow-400" title="Phishing" />;
    }
    if (confidence < 0.6) return <AlertTriangle className="w-6 h-6 text-yellow-400" title="Phishing" />;
    return <CheckCircle className="w-6 h-6 text-green-400" title="Legitimate" />;
  }
  if (prediction === 'phishing') {
    return <AlertTriangle className="w-6 h-6 text-yellow-400" title="Phishing" />;
  }
  return <CheckCircle className="w-6 h-6 text-green-400" title="Legitimate" />;
};

// Helper: Format date string
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString();
};

// Helper: Get result label
const getResultLabel = (type, prediction, confidence) => {
  if (type === 'url') {
    if (prediction === 'malware') return 'Phishing';
    if (prediction === 'benign') return 'Legitimate';
    if (prediction && prediction.includes('phishing')) return 'Phishing';
    if (confidence < 0.6) return 'Phishing';
    return 'Legitimate';
  }
  return prediction === 'phishing' ? 'Phishing' : 'Legitimate';
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState('');
  const [historyError, setHistoryError] = useState('');
  const [activeSection, setActiveSection] = useState('history'); 
  const [connectingGmail, setConnectingGmail] = useState(false);
  const [gmailSuccess, setGmailSuccess] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);

  // Gmail emails state
  const [rawGmailEmails, setRawGmailEmails] = useState([]);
  const [analyzedGmailEmails, setAnalyzedGmailEmails] = useState([]); 
  const [loadingGmailEmails, setLoadingGmailEmails] = useState(false);
  const [gmailEmailsError, setGmailEmailsError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          navigate('/login');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.user) setUser(data.user);
        else setError('Failed to load user data.');
      })
      .catch(() => setError('Failed to load user data.'))
      .finally(() => setLoadingUser(false));
  }, [navigate]);

 

  const fetchHistory = useCallback(async () => {
    setLoadingHistory(true);
    setHistoryError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.REACT_APP_API_URL}/history/userhistory`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          navigate('/login');
          return;
        }
        let errMsg = 'Error loading scan history';
        try {
          const errData = await res.json();
          errMsg = errData.message || errMsg;
        } catch {
          const errText = await res.text();
          errMsg = errText || errMsg;
        }
        throw new Error(errMsg);
      }
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setHistory(data.scanHistory || []);
      } else {
        const text = await res.text();
        throw new Error('Unexpected response: ' + text.slice(0, 100));
      }
    } catch (err) {
      setHistoryError(err.message || 'Error loading scan history');
    }
    setLoadingHistory(false);
  }, [navigate]);

  useEffect(() => {
    if (activeSection === 'history') {
      fetchHistory();
    }
  }, [activeSection, fetchHistory]);
  
  //  Gmail connection success via URL query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('gmail') === 'success') {
      setGmailSuccess(true);
      setConnectingGmail(false);
      setGmailConnected(true);
      setActiveSection('gmail');
      
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  // Check if Gmail is already connected when component mounts
  useEffect(() => {
    const checkGmailConnection = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_URL}/gmail/status`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setGmailConnected(data.connected || false);
      } catch (err) {
        console.error('Failed to check Gmail connection status:', err);
      }
    };
    checkGmailConnection();
  }, []);

  // Fetch Gmail emails 
  useEffect(() => {
    if (activeSection === 'gmail' && gmailConnected) {
      setLoadingGmailEmails(true);
      setGmailEmailsError('');
      const token = localStorage.getItem('token');
      fetch(`${process.env.REACT_APP_API_URL}/gmail/emails`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch Gmail emails');
          return res.json();
        })
        .then(data => setRawGmailEmails(data))
        .catch(() => setGmailEmailsError('Failed to fetch Gmail emails.'))
        .finally(() => setLoadingGmailEmails(false));
    }
  }, [activeSection, gmailConnected]);

  // Analyze emails ONCE after fetching raw emails
  useEffect(() => {
    if (gmailConnected && rawGmailEmails.length > 0) {
      setLoadingGmailEmails(true);
      fetch(`${process.env.REACT_APP_API_URL}/gmail/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emails: rawGmailEmails })
      })
        .then(res => res.json())
        .then(analyzedEmails => {
          // Ensure analyzedEmails is an array
          if (Array.isArray(analyzedEmails)) {
            setAnalyzedGmailEmails(analyzedEmails);
          } else if (analyzedEmails && Array.isArray(analyzedEmails.emails)) {
            setAnalyzedGmailEmails(analyzedEmails.emails);
          } else if (analyzedEmails && Array.isArray(analyzedEmails.data)) {
            setAnalyzedGmailEmails(analyzedEmails.data);
          } else {
            setAnalyzedGmailEmails([]);
            setGmailEmailsError('Unexpected response from analysis API.');
          }
        })
        .catch(() => {
          setAnalyzedGmailEmails([]);
          setGmailEmailsError('Failed to analyze Gmail emails.');
        })
        .finally(() => setLoadingGmailEmails(false));
    }
  }, [gmailConnected, rawGmailEmails]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNewScan = () => {
    navigate('/scan');
  };

  

  const handleConnectGmail = async () => {
    setConnectingGmail(true);
    setGmailSuccess(false);
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/gmail/auth-url`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  // Responsive summary stats
  const totalScans = history.length;
  const phishingCount = history.filter(item => {
    const type = item.scanType;
    const prediction = item.results?.prediction;
    const confidence = item.results?.confidence;
    return getResultLabel(type, prediction, confidence) === 'Phishing';
  }).length;
  const legitCount = totalScans - phishingCount;

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <span className="text-white text-xl">Loading...</span>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="bg-red-100 text-red-700 rounded-lg p-6">{error || 'User not found.'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-6">
      <div className="container mx-auto px-2 sm:px-4 max-w-5xl">
        {/* User Profile Card */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
            <img
              src="https://avatars.githubusercontent.com/u/137281646?s=200&v=4"
              alt="PhishShield AI"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-blue-500 shadow-lg"
            />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">{user.username}</h2>
              <p className="text-gray-300 text-sm md:text-base">{user.email}</p>
              <p className="text-xs text-gray-400">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3 mt-6 md:mt-0 w-full md:w-auto md:justify-end">
            <button
              onClick={handleNewScan}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition w-full md:w-auto justify-center"
            >
              <PlusCircle className="w-5 h-5" /> Start New Scan
            </button>
            <Link to="/pricing" className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition w-full md:w-auto justify-center">Buy Plan</Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition w-full md:w-auto justify-center"
            >
              <Shield className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>

        {/* Section Toggle */}
        <div className="flex justify-center mb-6 gap-4">
          <button
            onClick={() => setActiveSection('history')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-lg shadow transition ${
              activeSection === 'history'
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-purple-200 hover:bg-purple-700 hover:text-white'
            }`}
          >
            <History className="w-6 h-6" /> Scan History
          </button>
          <button
            onClick={() => setActiveSection('gmail')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-lg shadow transition ${
              activeSection === 'gmail'
                ? 'bg-green-600 text-white'
                : 'bg-white/10 text-green-200 hover:bg-green-700 hover:text-white'
            }`}
          >
            <Mail className="w-6 h-6" /> Gmail Integration
          </button>
        </div>

        {/* Scan History Section */}
        {activeSection === 'history' && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 rounded-xl p-5 flex flex-col items-center text-center">
                <History className="w-7 h-7 text-purple-300 mb-2" />
                <div className="text-2xl font-bold text-white">{totalScans}</div>
                <div className="text-gray-300 text-sm">Total Scans</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 flex flex-col items-center text-center">
                <CheckCircle className="w-7 h-7 text-green-400 mb-2" />
                <div className="text-2xl font-bold text-green-300">{legitCount}</div>
                <div className="text-gray-300 text-sm">Legitimate</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 flex flex-col items-center text-center">
                <AlertTriangle className="w-7 h-7 text-yellow-400 mb-2" />
                <div className="text-2xl font-bold text-yellow-300">{phishingCount}</div>
                <div className="text-gray-300 text-sm">Phishing</div>
              </div>
            </div>
            {/* User Scan History */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 mb-10">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <History className="w-6 h-6 text-purple-300" /> Scan History
              </h2>
              {loadingHistory ? (
                <div className="flex items-center gap-2 text-blue-200">
                  <Loader2 className="animate-spin w-5 h-5" /> Loading scan history...
                </div>
              ) : historyError ? (
                <div className="text-red-400">{historyError}</div>
              ) : history.length === 0 ? (
                <div className="text-gray-400">No scans yet. Start scanning emails or URLs to see your history here.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white/5 rounded-xl shadow border border-white/10 text-sm">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-gray-300 font-semibold w-32">Type</th>
                        <th className="px-6 py-3 text-left text-gray-300 font-semibold w-40">Result</th>
                        <th className="px-6 py-3 text-left text-gray-300 font-semibold w-48">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((item, idx) => {
                        const type = item.scanType;
                        const prediction = item.results?.prediction;
                        const confidence = item.results?.confidence;
                        const resultLabel = getResultLabel(type, prediction, confidence);
                        return (
                          <tr key={item._id || idx} className="border-b border-white/10 hover:bg-white/10 transition">
                            <td className="px-6 py-3  items-center gap-2">
                              {scanTypeIcon(type)}
                              <span className="capitalize text-white">{type}</span>
                            </td>
                            <td className="px-6 py-3 flex items-center gap-2">
                              {statusIcon(type, prediction, confidence)}
                              <span className={resultLabel === 'Phishing' ? 'text-yellow-300 font-semibold' : 'text-green-300 font-semibold'}>
                                {resultLabel}
                              </span>
                            </td>
                            <td className="px-6 py-3 text-gray-300">
                              {formatDate(item.createdAt || item.results?.createdAt || item.date)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* Gmail Section */}
        {activeSection === 'gmail' && (
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 mb-10 flex flex-col items-center">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-green-300" /> Gmail Integration
            </h2>
            
            {connectingGmail ? (
              <div className="flex flex-col items-center gap-2 mb-6">
                <Loader2 className="animate-spin w-6 h-6 text-green-400" />
                <span className="text-green-200 font-semibold">Connecting to Gmail...</span>
              </div>
            ) : gmailSuccess ? (
              <div className="flex flex-col items-center gap-2 mb-6">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-green-200 font-semibold">Gmail connected successfully!</span>
              </div>
            ) : gmailConnected ? (
              <div className="flex flex-col items-center gap-2 mb-6">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-green-200 font-semibold">Gmail is connected!</span>
                <p className="text-gray-300 text-sm mt-1">Your emails are protected by PhishShield AI</p>
              </div>
            ) : (
             <button
             onClick={() => {
              if (!user?.plan) {
              alert("Gmail integration is available for premium users only. Please buy a plan.");
             navigate("/pricing");
            return;
              }
             handleConnectGmail();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-lg shadow transition mb-6"
            >
              <Mail className="w-6 h-6" /> Connect Gmail
            </button>
            )}

            <div className="w-full flex flex-col items-center justify-center min-h-[200px] p-4 border border-white/10 rounded-lg">
              {gmailConnected ? (
                loadingGmailEmails ? (
                  <div className="flex items-center gap-2 text-green-200">
                    <Loader2 className="animate-spin w-5 h-5" /> Loading Gmail emails...
                  </div>
                ) : gmailEmailsError ? (
                  <div className="text-red-400">{gmailEmailsError}</div>
                ) : !Array.isArray(analyzedGmailEmails) || analyzedGmailEmails.length === 0 ? (
                  <div className="text-gray-400">No emails found in your Gmail inbox.</div>
                ) : (
                  <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white/5 rounded-xl shadow border border-white/10 text-sm">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-gray-300 font-semibold w-32">Analysis</th>
                          <th className="px-6 py-3 text-left text-gray-300 font-semibold w-48">From</th>
                          <th className="px-6 py-3 text-left text-gray-300 font-semibold w-48">Subject</th>
                          <th className="px-6 py-3 text-left text-gray-300 font-semibold w-48">Snippet</th>
                          <th className="px-6 py-3 text-left text-gray-300 font-semibold w-32">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(analyzedGmailEmails) && analyzedGmailEmails.map((email, idx) => {
                          const headers = email.payload?.headers || [];
                          const getHeader = (name) =>
                            headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value || '';
                          const from = getHeader('From');
                          const subject = getHeader('Subject');
                          const date = getHeader('Date');
                          return (
                            <tr key={email.id || idx} className="border-b border-white/10 hover:bg-white/10 transition">
                              <td className="px-6 py-3">
                                {email.analysis ? (
                                  email.analysis.prediction === 'phishing' ? (
                                    <span className="text-yellow-400 font-bold">Phishing</span>
                                  ) : (
                                    <span className="text-green-400 font-bold">Legitimate</span>
                                  )
                                ) : (
                                  <span className="text-gray-400">Not analyzed</span>
                                )}
                              </td>
                              <td className="px-6 py-3 text-white">{from}</td>
                              <td className="px-6 py-3 text-white">{subject}</td>
                              <td className="px-6 py-3 text-gray-200">{email.snippet}</td>
                              <td className="px-6 py-3 text-gray-300">{formatDate(date)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                <div className="text-gray-400 text-center">
                  <Mail className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
                  <p className="mb-2">Connect your Gmail account to enable automatic phishing protection.</p>
                  <p className="text-sm text-gray-500">PhishShield AI will scan incoming emails for phishing attempts.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
