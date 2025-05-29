import React from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, Link as LinkIcon } from 'lucide-react';

const ScanResults = () => {
  const threatScore = 85; // Example score
  const isClean = threatScore < 30;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                {isClean ? (
                  <CheckCircle className="w-12 h-12 text-green-400" />
                ) : (
                  <AlertTriangle className="w-12 h-12 text-red-400" />
                )}
                <div>
                  <h1 className="text-2xl font-bold text-white">Scan Results</h1>
                  <p className="text-gray-400">Completed on March 15, 2024 at 14:30</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">{threatScore}%</div>
                <p className="text-sm text-gray-400">Threat Score</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-400" />
                  Summary
                </h2>
                <p className="text-gray-300">
                  Our AI analysis has detected potential security risks in the scanned content.
                  Please review the detailed findings below.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <LinkIcon className="w-6 h-6 text-purple-400" />
                  URL Analysis
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Domain Age</span>
                    <span className="text-white">2 days</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">SSL Certificate</span>
                    <span className="text-red-400">Invalid</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Blacklist Status</span>
                    <span className="text-red-400">Listed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-green-400" />
                  Recommendations
                </h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Do not click on any links in the email
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Report this email as phishing to your IT department
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Delete the email from your inbox
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button className="px-6 py-2 bg-transparent border border-gray-600 text-gray-300 hover:bg-white/5 rounded-lg transition">
                Download Report
              </button>
              <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                Share Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanResults;