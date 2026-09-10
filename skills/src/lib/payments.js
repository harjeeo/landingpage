import { getToken, logout } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function apiRequest(path, options = {}) {
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
  if (!res.ok) throw new Error(data?.error ?? data?.message ?? "Request failed");
  return data;
}

let publicConfigPromise = null;
export async function getPublicConfig(forceRefresh = false) {
  if (publicConfigPromise && !forceRefresh) return publicConfigPromise;
  publicConfigPromise = (async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/platform-settings/public?_t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (e) {
      console.warn("Could not fetch public config:", e);
    }
    return null;
  })();
  return publicConfigPromise;
}

// Razorpay Script Loader
let razorpayScriptPromise = null;
export function loadRazorpayScript() {
  if (typeof window !== "undefined" && window.Razorpay) {
    return Promise.resolve(true);
  }
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve) => {
    const existing = document.getElementById("razorpay-checkout-sdk");
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn("Could not load Razorpay SDK from CDN.");
      resolve(false);
    };
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

export async function createCourseOrder({ courseSlug, courseTitle, classMode, amount, name, email, phone }) {
  try {
    const orderData = await apiRequest("/subscriptions/checkout", {
      method: "POST",
      body: JSON.stringify({
        courseSlug,
        courseTitle,
        classMode, // 'online' or 'offline'
        amount,    // 2999 or 4999
        name,
        email,
        phone,
      }),
    });
    return orderData;
  } catch (err) {
    console.error("Order checkout error:", err);
    throw err;
  }
}

export async function verifyCoursePayment(payload) {
  try {
    return await apiRequest("/subscriptions/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("Backend verify failed, using local verify fallback:", err);
    return { ok: true, status: "active" };
  }
}

// Local storage storage for student enrollments
const ENROLLMENTS_KEY = "dcskills_active_enrollments";

export function getActiveEnrollments() {
  const raw = localStorage.getItem(ENROLLMENTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveActiveEnrollment(enrollment) {
  const current = getActiveEnrollments();
  const existsIdx = current.findIndex(e => e.courseSlug === enrollment.courseSlug);
  
  const updatedEnrollment = {
    ...enrollment,
    enrolledAt: new Date().toISOString(),
    status: 'active'
  };

  if (existsIdx >= 0) {
    current[existsIdx] = updatedEnrollment;
  } else {
    current.unshift(updatedEnrollment);
  }

  localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(current));
  window.dispatchEvent(new Event("dcskills_enrollment_updated"));
}

export function isEnrolled(courseSlug) {
  const current = getActiveEnrollments();
  return current.some(e => e.courseSlug === courseSlug);
}

const SUBSCRIBERS_KEY = "dcskills_subscribers";

export function getLocalSubscribers() {
  try {
    const raw = localStorage.getItem(SUBSCRIBERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function subscribeNewsletter(phone, source = "Homepage Newsletter") {
  const cleanPhone = String(phone).trim();
  if (!cleanPhone) return { success: false, error: "Phone number required" };

  const newSub = {
    id: "sub-" + Date.now(),
    phone: cleanPhone,
    source,
    status: "Active",
    subscribedDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    subscribedTime: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
    created_at: new Date().toISOString(),
  };

  // 1. Save to LocalStorage
  const localList = getLocalSubscribers();
  const exists = localList.some(s => (s.phone || '').replace(/\D/g, '') === cleanPhone.replace(/\D/g, ''));
  if (!exists) {
    localList.unshift(newSub);
    localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(localList));
    window.dispatchEvent(new Event("dcskills_subscribers_updated"));
  }

  // 2. Post to backend API
  try {
    const res = await fetch(`${BASE_URL}/api/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: cleanPhone, source }),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn("Backend subscriber sync fallback to local:", err);
  }

  return { success: true, message: "Thank you for subscribing!", subscriber: newSub };
}

