import React from "react";

const APP_GRADIENT = "bg-gradient-to-br from-indigo-600 via-blue-400 to-purple-300";

const USD_TO_GHS = 15; // Example: $1 = 15 GHS

const plans = [
  {
    name: "Weekly",
    priceUSD: 1,
    priceGHS: 1 * USD_TO_GHS,
    ghsAmount: 1 * USD_TO_GHS * 100, // pesewas
    period: "/week",
    features: [
      "Unlimited scans",
      "Gmail integration",
      "Priority support",
    ],
    highlight: false,
  },
  {
    name: "Monthly",
    priceUSD: 3,
    priceGHS: 3 * USD_TO_GHS,
    ghsAmount: 3 * USD_TO_GHS * 100,
    period: "/month",
    features: [
      "Unlimited scans",
      "Gmail integration",
      "Priority support",
    ],
    highlight: false,
  },
  {
    name: "Yearly",
    priceUSD: 30,
    priceGHS: 30 * USD_TO_GHS,
    ghsAmount: 30 * USD_TO_GHS * 100,
    period: "/year",
    features: [
      "Unlimited scans",
      "Gmail integration",
      "Priority support",
      "Best Value",
    ],
    highlight: true,
  },
];

const getUserEmail = () => {

  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user && user.email) {
        return user.email;
      }
    } catch (e) {
    }
  }
  // Fallback: try a separate email key or return a placeholder
  return localStorage.getItem("user_email") || "user@example.com";
};

const handlePaystackInit = async (plan) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: plan.ghsAmount / 100, // send amount in GHS
        email: getUserEmail(),
        plan: plan.name,
      }),
    });
    const data = await res.json();
    if (data.data && data.data.authorization_url) {
      window.location.href = data.data.authorization_url;
    } else {
      alert(data.error || "Failed to initialize payment.");
    }
  } catch (err) {
    alert("Payment initialization failed.");
  }
};

const Pricing = () => {
  return (
    <div className={`min-h-screen ${APP_GRADIENT} flex flex-col items-center py-12 px-4`}>
      <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Go Premium</h1>
      <p className="text-lg text-blue-100 mb-10 drop-shadow">
        Unlock unlimited scans and Gmail integration. Choose your plan.
      </p>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center items-center">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`
              group relative flex flex-col items-center bg-white/90 rounded-3xl shadow-xl transition-all duration-300
              hover:scale-105 hover:shadow-2xl
              ${plan.highlight ? "border-4 border-indigo-500 z-10 scale-105" : "border border-gray-200"}
              px-8 py-10 w-full max-w-xs
            `}
          >
            {plan.highlight && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                Best Value
              </div>
            )}
            <div className="mb-4">
              <span className="text-2xl font-semibold text-indigo-600">{plan.name}</span>
            </div>
            <div className="flex items-end mb-2">
              <span className="text-3xl font-extrabold text-gray-900">${plan.priceUSD}</span>
              <span className="text-lg text-gray-500 ml-1">{plan.period}</span>
            </div>
            <div className="mb-4 text-sm text-gray-500">
              (~₵{plan.priceGHS} GHS)
            </div>
            <ul className="mb-8 space-y-3 w-full">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`
                w-full py-3 rounded-xl font-semibold transition
                ${plan.highlight
                  ? "bg-gradient-to-r from-indigo-600 to-purple-500 text-white hover:from-indigo-700 hover:to-purple-600 shadow-lg"
                  : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"}
                group-hover:scale-105
              `}
              onClick={() => handlePaystackInit(plan)}
            >
              {plan.highlight ? "Choose Yearly" : `Choose ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center text-blue-100 text-sm">
        <span>
          All premium plans include unlimited scans, Gmail integration, and priority support.
        </span>
      </div>
    </div>
  );
};

export default Pricing;