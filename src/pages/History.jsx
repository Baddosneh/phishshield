import React, { useEffect, useState } from 'react';
import { Clock, Shield, Mail, Upload, AlertTriangle, CheckCircle } from 'lucide-react';

const ICONS = {
  email: { icon: Mail, color: 'text-blue-400' },
  url: { icon: Shield, color: 'text-green-400' },
  file: { icon: Upload, color: 'text-purple-400' },
  safe: { icon: CheckCircle, color: 'text-green-500' },
  threat: { icon: AlertTriangle, color: 'text-red-500' },
};

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/history/userhistory`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <span className="text-white text-xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="bg-red-100 text-red-700 rounded-lg p-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Scan History</h1>
          </div>

          <div className="bg-white/5 rounded-xl backdrop-blur-xl p-6">
            {history.length === 0 ? (
              <div className="text-center text-gray-300 py-12">
                <Shield className="w-10 h-10 mx-auto mb-2" />
                No scan history found.
              </div>
            ) : (
              history.map((item) => {
                const scanIcon = ICONS[item.type] || ICONS.url;
                const resultIcon = item.result === 'Safe' ? ICONS.safe : ICONS.threat;
                return (
                  <div key={item.id || item._id} className="border-b border-gray-700 last:border-0 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <scanIcon.icon className={`w-6 h-6 ${scanIcon.color}`} />
                        <div>
                          <h3 className="text-white font-semibold capitalize">{item.type} Scan</h3>
                          <p className="text-gray-400 text-sm">{new Date(item.date).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-right">
                        <resultIcon.icon className={`w-5 h-5 ${resultIcon.color}`} />
                        <div>
                          <p className="text-white font-medium">{item.result}</p>
                          <p className="text-gray-400 text-sm">{item.threat || ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;