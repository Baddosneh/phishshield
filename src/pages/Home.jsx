import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Mail, Link as LinkIcon, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';


const features = [
  {
    icon: <Mail className="w-8 h-8 text-blue-400" />,
    title: "AI Email Phishing Detection",
    desc: "Paste suspicious emails and let our advanced AI analyze them for phishing indicators, malicious links, and social engineering tactics. Stay ahead of evolving threats with real-time analysis.",
    color: "from-blue-500 to-blue-700"
  },
  {
    icon: <LinkIcon className="w-8 h-8 text-purple-400" />,
    title: "AI URL Phishing Detection",
    desc: "Enter any link to instantly check if it’s a phishing URL or a safe destination. Our AI scans for deceptive domains, redirects, and hidden traps before you click.",
    color: "from-purple-500 to-purple-700"
  },
  {
    icon: <Mail className="w-8 h-8 text-purple-400" />,
    title: "Safe Gmail integration",
    desc: "scan mails in your gmail accounts with ease.fell secure and spot phishing even before you open a mail",
    color: "from-purple-500 to-purple-700"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950">
      <Navbar />

      {/* HERO SECTION */}
      <main className="container mx-auto px-4 pt-40 pb-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-0">
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Outsmart Phishing with AI
            </span>
            <br />
            <span className="text-blue-200">Instant Email & URL Protection</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8 font-medium max-w-xl">
            Scan emails and links for phishing threats in seconds. Let AI keep you, your team, and your business safe from scams, malware, and social engineering—effortlessly and securely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <a
              href="/register"
              className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-semibold text-lg transition shadow-lg"
            >
              Get Started Free
            </a>
            <a
              href="/register"
              className="flex-1 px-8 py-4 bg-white/10 hover:bg-white/20 text-blue-200 rounded-lg font-semibold text-lg transition shadow-lg"
            >
              Learn More
            </a>
          </div>
        </div>
        {/* Image Section - Only on Large Screens */}
        <div className="flex-1 hidden lg:flex justify-center items-center animate-fade-in-up">
          <img
            src="https://i.pinimg.com/736x/f3/e3/3f/f3e33f67c1b529f0ebf960caadee1c01.jpg"
            alt="AI Cybersecurity Illustration"
            className="rounded-3xl shadow-2xl max-w-md w-full object-cover border-4 border-blue-700/30"
            loading="lazy"
          />
        </div>
      </main>

      {/* Animated Email/URL Emphasis - moved below hero */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row gap-8 mt-0 items-center justify-center w-full">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700/80 rounded-xl p-8 shadow-lg max-w-sm text-center border border-blue-700 animate-fade-in-up">
            <Mail className="w-12 h-12 mx-auto text-blue-400 mb-3 animate-bounce" />
            <h2 className="text-2xl font-bold text-blue-200 mb-2">Scan Emails</h2>
            <p className="text-gray-200 mb-4">
              Paste suspicious emails and let our AI analyze them for phishing, scams, and more.
            </p>
            <a
              href="/register"
              className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
            >
              Scan Email
            </a>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-purple-700/80 rounded-xl p-8 shadow-lg max-w-sm text-center border border-purple-700 animate-fade-in-up">
            <LinkIcon className="w-12 h-12 mx-auto text-purple-400 mb-3 animate-bounce" />
            <h2 className="text-2xl font-bold text-purple-200 mb-2">Scan URLs</h2>
            <p className="text-gray-200 mb-4">
              Enter any link to check if it’s a phishing URL or a safe destination.
            </p>
            <a
              href="/register"
              className="inline-block px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition"
            >
              Scan URL
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            What Can PhishShield AI Do?
          </span>
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex-1 bg-gradient-to-br ${feature.color} rounded-2xl p-8 shadow-lg text-white text-center border border-white/10 hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-100">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE AI SECURITY - Redesigned */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
          <span className="bg-gradient-to-r from-yellow-300 to-green-400 bg-clip-text text-transparent">
            Why Choose PhishShield AI?
          </span>
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          <div className="flex-1 bg-gradient-to-br from-yellow-100/10 via-yellow-300/10 to-yellow-500/10 rounded-2xl p-8 shadow-lg text-white text-center border border-yellow-400/20 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-3">
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-yellow-200">AI That Never Sleeps</h3>
            <p className="text-gray-100 mb-2">
              Our AI is always learning from the latest threats, adapting in real time to keep you protected from even the newest phishing tactics.
            </p>
          </div>
          <div className="flex-1 bg-gradient-to-br from-green-100/10 via-green-300/10 to-green-500/10 rounded-2xl p-8 shadow-lg text-white text-center border border-green-400/20 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-10 h-10 text-green-400 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-200">Instant, Reliable Results</h3>
            <p className="text-gray-100 mb-2">
              Scan emails and URLs in seconds. No more guessing—just clear, actionable results so you can act with confidence.
            </p>
          </div>
          <div className="flex-1 bg-gradient-to-br from-red-100/10 via-red-300/10 to-red-500/10 rounded-2xl p-8 shadow-lg text-white text-center border border-red-400/20 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-3">
              <AlertTriangle className="w-10 h-10 text-red-400 animate-shake" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-red-200">Proactive, Not Reactive</h3>
            <p className="text-gray-100 mb-2">
              Detects even the most subtle signs of phishing—before you click, reply, or share. Stay one step ahead of cybercriminals, always.
            </p>
          </div>
        </div>
      </section>

      {/* EXTRA SECTION - Redesigned */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          <div className="flex-1 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-10 shadow-2xl text-white text-center border border-blue-700/30 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-blue-400 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold mb-3">One Click, Total Peace of Mind</h3>
            <p className="text-gray-100 mb-4">
              No more second-guessing suspicious emails or links. With PhishShield AI, you’re just one click away from knowing what’s safe and what’s not.
            </p>
            <ul className="text-left text-gray-200 text-base space-y-2 mx-auto max-w-xs">
              <li>• Effortless scanning for everyone</li>
              <li>• No technical skills required</li>
              <li>• Designed for individuals & teams</li>
            </ul>
          </div>
          <div className="flex-1 bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 rounded-2xl p-10 shadow-2xl text-white text-center border border-green-700/30 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Your Data, Your Privacy</h3>
            <p className="text-gray-100 mb-4">
              We never store your scanned emails or URLs. Your privacy and security are our top priorities—always.
            </p>
            <ul className="text-left text-gray-200 text-base space-y-2 mx-auto max-w-xs">
              <li>• Zero data retention</li>
              <li>• End-to-end encrypted scans</li>
              <li>• 100% privacy-first approach</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION - Redesigned */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 rounded-3xl shadow-2xl p-12 md:p-16 flex flex-col items-center justify-center border border-white/10 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Ready to Outsmart Every Phish?
          </h2>
          <p className="text-lg md:text-2xl text-blue-100 mb-8 max-w-2xl">
            Don’t let cyber threats catch you off guard. Join thousands of users who trust PhishShield AI for instant, reliable, and private phishing detection. Your digital safety is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-lg justify-center">
            <a
              href="/register"
              className="flex-1 px-10 py-4 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-pink-500 text-white rounded-lg font-bold text-xl transition shadow-lg"
            >
              Start Free Now
            </a>
            <a
              href="/pricing"
              className="flex-1 px-10 py-4 bg-white/10 hover:bg-white/20 text-blue-200 rounded-lg font-bold text-xl transition shadow-lg"
            >
              See Pricing
            </a>
          </div>
          <div className="text-blue-200 text-base font-medium">
            <span className="inline-block mr-2">✓ No credit card required</span>
            <span className="inline-block mr-2">✓ Instant access</span>
            <span className="inline-block">✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
