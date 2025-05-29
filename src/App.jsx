import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Scan from './pages/Scan';
import History from './pages/History';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import ScanResults from './components/ScanResults';
import AboutScan from './components/aboutScan';
import ResetPassword from './pages/resetPassword';
import ResetPasswordRequest from './pages/resetPasswordRequest';
import ResultsModal from './components/ResultsModal';
import Pricing from './pages/price';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/termsOfService';
import CookiePolicy from './components/cookiePolicy';
import Security from './components/security';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/results-modal" element={<ResultsModal />} />
        <Route path="/reset-password-request" element={<ResetPasswordRequest />} />
        <Route path="/about-scan" element={<AboutScan />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scan-results" element={<ScanResults />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </Router>
  );
}

export default App;