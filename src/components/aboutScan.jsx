
import React from 'react';
import { Mail, Shield, Upload, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Mail className="w-8 h-8 text-blue-400" />,
    title: "Email Scan",
    desc: "Paste suspicious email content and let our AI instantly analyze for phishing, scams, and malicious intent.",
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-400" />,
    title: "URL Scan",
    desc: "Submit any link and our AI will check for unsafe redirects, malware, and phishing attempts in real time.",
  },
  {
    icon: <Upload className="w-8 h-8 text-blue-400" />,
    title: "File Scan",
    desc: "Upload files to detect hidden threats, malware, or malicious scripts using advanced AI-powered analysis.",
  },
];

const AboutScan = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-20 flex items-center">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Sparkles className="w-12 h-12 text-blue-400 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">How Our AI Scans Protect You</h1>
        <p className="text-lg text-gray-300">
          Experience next-gen security with instant, AI-driven threat detection for emails, URLs, and files.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-white/10 rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform"
          >
            <div className="mb-3">{icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-300">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white/10 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-400" />
          Why Choose AI Security?
        </h2>
        <p className="text-gray-200 text-lg mb-2">
          Our AI doesn't sleep. It learns from millions of threats, adapting in real time to catch even the newest scams and malware.
        </p>
        <p className="text-gray-300">
          With lightning-fast analysis and zero guesswork, you get peace of mind—whether you're scanning an email, a link, or a file. 
          <span className="block mt-2 text-blue-300 font-semibold">Stay one step ahead with AI-powered protection.</span>
        </p>
      </div>
    </div>
  </div>
);

export default AboutScan;
