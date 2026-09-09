// Customer / Student auth connected to the shared Laravel backend API

const STORAGE_KEY = "dcskills_student_session";
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

export function getCurrentUser() {
  return getSession()?.user ?? null;
}

export function getToken() {
  return getSession()?.token ?? null;
}

export function isAuthenticated() {
  return !!getToken();
}

export function setSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("dcskills_auth_changed"));
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("dcskills_auth_changed"));
}

export async function login(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? data.error ?? "Login failed");

    setSession({ token: data.token, user: data.user });
    return data.user;
  } catch (err) {
    // If backend is not running or unreachable, provide mock session fallback for dev preview
    if (err.message?.includes("Failed to fetch") || err.name === "TypeError") {
      console.warn("Backend unavailable, using local session:", err);
      const fallbackUser = {
        name: email.split("@")[0] || "Student",
        email,
        phone: "+91 9876543210",
        role: "CUSTOMER"
      };
      setSession({ token: "mock_token_" + Date.now(), user: fallbackUser });
      return fallbackUser;
    }
    throw err;
  }
}

export async function signup({ name, phone, email, password }) {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      const message = data.errors ? Object.values(data.errors)[0][0] : (data.message ?? data.error ?? "Sign up failed");
      throw new Error(message);
    }

    setSession({ token: data.token, user: data.user });
    return data.user;
  } catch (err) {
    // If backend is not running or unreachable, provide mock session fallback for dev preview
    if (err.message?.includes("Failed to fetch") || err.name === "TypeError") {
      console.warn("Backend unavailable, using local session:", err);
      const fallbackUser = {
        name: name || "Student",
        email,
        phone: phone || "+91 9876543210",
        role: "CUSTOMER"
      };
      setSession({ token: "mock_token_" + Date.now(), user: fallbackUser });
      return fallbackUser;
    }
    throw err;
  }
}

export function savePendingEnrollment(enrollmentData) {
  sessionStorage.setItem("dcskills_pending_enrollment", JSON.stringify(enrollmentData));
}

export function getPendingEnrollment() {
  const raw = sessionStorage.getItem("dcskills_pending_enrollment");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearPendingEnrollment() {
  sessionStorage.removeItem("dcskills_pending_enrollment");
}
