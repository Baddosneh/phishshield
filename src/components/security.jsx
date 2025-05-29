import React from "react";

const Security = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl text-gray-800 bg-white rounded-xl shadow">
    <h1 className="text-3xl font-bold mb-6">Security</h1>
    <p className="mb-4">
      <b>PhishShield AI</b> is committed to protecting your data. All communications are encrypted using HTTPS. We do not store your scanned emails or URLs.
    </p>
    <p className="mb-4">
      Our infrastructure is regularly updated and monitored for vulnerabilities. Access to user data is strictly controlled and limited to essential personnel only.
    </p>
    <p className="mb-4">
      If you discover a security issue, please report it immediately to <a href="mailto:security@phishshield.ai" className="text-blue-600 underline">security@phishshield.ai</a>.
    </p>
    <p className="text-sm text-gray-500">Last updated: May 2025</p>
  </div>
);

export default Security;