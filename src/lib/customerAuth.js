// Customer-facing auth (separate from the Super Admin session in
// lib/superadmin/useAuth.js) — used by the Pricing → Checkout → Dashboard
// flow for restaurant/business owners signing up for a plan.

const STORAGE_KEY = "ojar-customer-session";
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export function getSession() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getToken() {
  return getSession()?.token ?? null;
}

function setSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? data.error ?? "Login failed");

  setSession({ token: data.token, user: data.user });
  return data.user;
}

export async function signup({ name, businessName, phone, email, password }) {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, businessName, phone, email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    const message = data.errors ? Object.values(data.errors)[0][0] : (data.message ?? data.error ?? "Sign up failed");
    throw new Error(message);
  }

  setSession({ token: data.token, user: data.user });
  return data.user;
}
