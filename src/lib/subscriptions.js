import { getToken, logout } from "./customerAuth";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    logout();
    throw new Error("Session expired — please log in again.");
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.error ?? "Request failed");
  return data;
}

export async function startCheckout({ plan, billingCycle }) {
  return request("/subscriptions/checkout", {
    method: "POST",
    body: JSON.stringify({ plan, billingCycle }),
  });
}

export async function verifyPayment(payload) {
  return request("/subscriptions/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMySubscriptions() {
  const result = await request("/subscriptions/mine");
  return result.items;
}

// Loads the Razorpay checkout script once and reuses it on repeat calls.
let razorpayScriptPromise = null;
export function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve();
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Could not load Razorpay checkout."));
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}
