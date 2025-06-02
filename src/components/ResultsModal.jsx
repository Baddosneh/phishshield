import React from 'react';
import { CheckCircle, AlertTriangle, Mail, Shield, Smartphone, X } from 'lucide-react';

// probability as percentage
const toPercent = (value) => {
  if (typeof value !== 'number' || isNaN(value)) return '0.00%';
  return (value * 100).toFixed(2) + '%';
};

// confidence visualization
const ConfidenceDonut = ({ confidence }) => {
  const size = 64;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(confidence || 0, 1));
  const offset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} className="mx-auto mb-2">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#334155"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={progress > 0.6 ? "#38bdf8" : "#fbbf24"}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(.4,2,.6,1)' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.35em"
        fontSize="1.1em"
        fill="#fff"
        fontWeight="bold"
      >
        {toPercent(progress)}
      </text>
    </svg>
  );
};

// Bar component for probability visualization
const ProbabilityBar = ({ label, value, color }) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-200">{label}</span>
      <span className="text-sm font-semibold text-white">{toPercent(value)}</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-3">
      <div
        className={`h-3 rounded-full transition-all`}
        style={{
          width: `${Math.min((value || 0) * 100, 100)}%`,
          background: color,
        }}
      />
    </div>
  </div>
);

const ResultsModal = ({ open, onClose, results, scanType }) => {
  if (!open || !results) return null;

  // Support both direct and nested result objects
  const data = results.data ? results.data : results;

  // Determine scan type (email, url, sms)
  let type = scanType;
  if (!type) {
    if (
      data?.all_probabilities?.benign !== undefined ||
      data?.all_probabilities?.malware !== undefined
    ) {
      type = 'url';
    } else if (
      data?.all_probabilities?.spam !== undefined ||
      data?.all_probabilities?.ham !== undefined
    ) {
      type = 'sms';
    } else {
      type = 'email';
    }
  }

  // Extract relevant info based on scan type
  let legitimateProb = 0, phishingProb = 0, confidence = 0, prediction = '';
  let icon = <Mail className="w-12 h-12 text-blue-400 mb-2" />;
  let statusIcon = null;
  let statusText = '';
  let title = '';
  let legitimateLabel = '';
  let phishingLabel = '';
  let insightText = null;
  let isPhishing = false;

  if (type === 'url') {
    legitimateProb = data?.all_probabilities?.benign ?? 0;
    phishingProb = data?.all_probabilities?.malware ?? 0;
    confidence = data?.confidence ?? 0;
    prediction = data?.prediction ?? '';
    icon = <Shield className="w-12 h-12 text-blue-400 mb-2" />;
    title = "URL Threat Analysis";
    legitimateLabel = "Legitimate URL Probability";
    phishingLabel = "Malicious URL Probability";
    isPhishing = prediction === 'malware';

    statusIcon = isPhishing
      ? <AlertTriangle className="w-10 h-10 text-yellow-400" />
      : <CheckCircle className="w-10 h-10 text-green-400" />;
    statusText = isPhishing
      ? "⚠️ This URL is highly likely to be malicious or a phishing attempt. Do not click or visit this link."
      : "✅ This URL appears to be legitimate. However, always exercise caution with unknown links.";

    insightText = isPhishing
      ? (
        <>
          <span className="block mb-1">• The URL shows strong characteristics of malware or phishing, such as suspicious domains, misspellings, or unusual patterns.</span>
          <span className="block mb-1">• Avoid entering any credentials or personal information on this site.</span>
          <span className="block mb-1">• If you received this link unexpectedly, verify its authenticity with the sender through a trusted channel.</span>
          <span className="block">• Report this URL to your IT/security team if you believe it is malicious.</span>
        </>
      ) : (
        <>
          <span className="block mb-1">• The URL does not match common malware or phishing patterns and appears safe.</span>
          <span className="block mb-1">• Still, be cautious if you were not expecting this link or if it was sent by an unknown party.</span>
          <span className="block mb-1">• Always check for HTTPS and look for subtle misspellings in the domain.</span>
          <span className="block">• If in doubt, verify the link with the sender or your IT/security team.</span>
        </>
      );
  } else if (type === 'sms') {
    // SMS scan
    legitimateProb = data?.all_probabilities?.ham ?? 0;
    phishingProb = data?.all_probabilities?.spam ?? 0;
    confidence = data?.confidence ?? 0;
    prediction = data?.prediction ?? '';
    icon = <Smartphone className="w-12 h-12 text-green-400 mb-2" />;
    title = "SMS Spam Analysis";
    legitimateLabel = "Legitimate SMS Probability";
    phishingLabel = "Spam Probability";
    isPhishing = prediction === 'spam';

    statusIcon = isPhishing
      ? <AlertTriangle className="w-10 h-10 text-yellow-400" />
      : <CheckCircle className="w-10 h-10 text-green-400" />;
    statusText = isPhishing
      ? "⚠️ This SMS is likely SPAM. Do not click any links or reply with personal information."
      : "✅ This SMS appears to be legitimate. However, always be cautious with unexpected messages.";

    insightText = isPhishing
      ? (
        <>
          <span className="block mb-1">• The SMS contains indicators of spam, such as suspicious links, urgent requests, or unknown senders.</span>
          <span className="block mb-1">• Do not reply, click links, or provide personal information in response to this SMS.</span>
          <span className="block mb-1">• If the SMS claims to be from a trusted organization, contact them directly using official channels to verify.</span>
          <span className="block">• Report this SMS to your mobile provider or IT/security team if you believe it is malicious.</span>
        </>
      ) : (
        <>
          <span className="block mb-1">• The SMS does not exhibit typical spam characteristics.</span>
          <span className="block mb-1">• Still, be wary of unexpected requests for sensitive information or urgent actions.</span>
          <span className="block mb-1">• When in doubt, verify the sender's identity and check for subtle signs of fraud.</span>
          <span className="block">• If you are unsure, consult your mobile provider or IT/security team before responding.</span>
        </>
      );
  } else {
    // Email scan (default)
    legitimateProb = data?.all_probabilities?.legitimate ?? 0;
    phishingProb = data?.all_probabilities?.phishing ?? 0;
    confidence = data?.confidence ?? 0;
    prediction = data?.prediction ?? '';
    icon = <Mail className="w-12 h-12 text-blue-400 mb-2" />;
    title = "Email Threat Analysis";
    legitimateLabel = "Legitimate Email Probability";
    phishingLabel = "Phishing Probability";
    isPhishing = prediction === 'phishing';

    statusIcon = isPhishing
      ? <AlertTriangle className="w-10 h-10 text-yellow-400" />
      : <CheckCircle className="w-10 h-10 text-green-400" />;
    statusText = isPhishing
      ? "⚠️ This email is highly likely to be a phishing attempt. Please do not click any links or provide personal information."
      : "✅ This email appears to be legitimate. However, always exercise caution with unexpected messages.";

    insightText = isPhishing
      ? (
        <>
          <span className="block mb-1">• The email contains indicators of phishing, such as urgent requests, suspicious links, or unfamiliar senders.</span>
          <span className="block mb-1">• Do not reply, click links, or download attachments from this email.</span>
          <span className="block mb-1">• If the email claims to be from a trusted organization, contact them directly using official channels to verify.</span>
          <span className="block">• Report this email to your IT/security team if you believe it is malicious.</span>
        </>
      ) : (
        <>
          <span className="block mb-1">• The email does not exhibit typical phishing characteristics.</span>
          <span className="block mb-1">• Still, be wary of unexpected requests for sensitive information or urgent actions.</span>
          <span className="block mb-1">• When in doubt, verify the sender's identity and check for subtle signs of fraud.</span>
          <span className="block">• If you are unsure, consult your IT/security team before responding.</span>
        </>
      );
  }

  const statusLabel =
    type === 'url'
      ? isPhishing
        ? 'Malicious URL Detected'
        : 'Legitimate URL'
      : type === 'sms'
      ? isPhishing
        ? 'Spam SMS Detected'
        : 'Legitimate SMS'
      : isPhishing
      ? 'Phishing Detected'
      : 'Legitimate Email';

  const statusColor = isPhishing ? 'text-yellow-300' : 'text-green-300';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-0 animate-fade-in overflow-y-auto max-h-[90vh]">
        <button
          className="sticky top-4 right-4 float-right text-gray-300 hover:text-white transition z-10"
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'absolute', top: 16, right: 16 }}
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center text-center px-6 py-8">
          {icon}
          <h2 className="text-2xl font-bold text-white mb-1">
            {title}
          </h2>
          <div className="flex items-center gap-2 mb-2">
            {statusIcon}
            <span className={`font-semibold text-lg ${statusColor}`}>
              {statusLabel}
            </span>
          </div>
          <p className="text-gray-200 mb-4">{statusText}</p>

          <ConfidenceDonut confidence={confidence} />

          <div className="w-full bg-white/10 rounded-lg p-4 mb-4 text-left">
            <h3 className="text-white font-semibold mb-3 text-base">Detection Probabilities</h3>
            <ProbabilityBar
              label={legitimateLabel}
              value={legitimateProb}
              color="#38bdf8"
            />
            <ProbabilityBar
              label={phishingLabel}
              value={phishingProb}
              color="#fbbf24"
            />
            <div className="mt-4 flex items-center gap-2">
              <span className="text-gray-300 text-sm">Overall Confidence:</span>
              <span className="text-white font-bold text-base">{toPercent(confidence)}</span>
            </div>
          </div>

          <div className="w-full bg-white/5 rounded-lg p-4 mb-4 text-left">
            <h4 className="text-indigo-200 font-semibold mb-2 text-sm">Insights & Recommendations</h4>
            <div className="text-xs text-gray-200 leading-relaxed">
              {insightText}
            </div>
          </div>

          <div className="text-xs text-gray-400 mt-2">
            <span>
              Powered by AI. Results are for informational purposes. Always verify suspicious {type === 'url' ? 'URLs' : type === 'sms' ? 'SMS messages' : 'emails'} independently.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;