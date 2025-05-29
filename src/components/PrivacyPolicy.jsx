import React from "react";

const PrivacyPolicy = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl text-gray-800 bg-blue-300 rounded-xl shadow">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <p className="mb-4">
      <b>PhishShield AI</b> respects your privacy. We do not store your scanned emails or URLs. All scans are processed securely and are not retained on our servers.
    </p>
    <p className="mb-4">
      We collect only the information necessary to provide our services, such as your email for account creation and payment processing. We do not sell or share your personal data with third parties except as required by law or to provide our core services.
    </p>
    <p className="mb-4">
      For questions about your privacy, please contact us at <a href="mailto:support@phishshield.ai" className="text-blue-600 underline">support@phishshield.ai</a>.
    </p>
    <p className="text-sm text-gray-500">Last updated: May 2025</p>
  </div>
);

export default PrivacyPolicy;