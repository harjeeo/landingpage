const STORAGE_KEY = "order-dashboard-session";
const IMPERSONATION_KEY = "order-dashboard-impersonation";

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

export function setSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(IMPERSONATION_KEY);
}

export function homePathForRole(role) {
  return role === "super-admin" ? "/super-admin" : "/cafe";
}

export function loginPathForRole(role) {
  return role === "super-admin" ? "/login/super-admin" : "/login/cafe";
}

// Super Admin "login as tenant" support. The Super Admin's own session is
// stashed under a separate key so it can be restored on exit; the current
// session is swapped for the impersonated tenant admin's.
export function startImpersonation(impersonated, tenantName) {
  const original = getSession();
  if (!original) throw new Error("No active session to impersonate from");

  const state = { originalSession: original, tenantName };
  localStorage.setItem(IMPERSONATION_KEY, JSON.stringify(state));

  setSession({
    name: impersonated.user.name,
    email: impersonated.user.email,
    role: backendRoleToAppRole(impersonated.user.role),
    token: impersonated.token,
    tenantId: impersonated.user.tenantId,
  });
}

export function getImpersonation() {
  const raw = localStorage.getItem(IMPERSONATION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function exitImpersonation() {
  const state = getImpersonation();
  if (!state) return null;
  setSession(state.originalSession);
  localStorage.removeItem(IMPERSONATION_KEY);
  return state.originalSession;
}

function backendRoleToAppRole(role) {
  return role === "SUPER_ADMIN" ? "super-admin" : "cafe";
}

// Calls the real backend. Throws with the server's error message on failure.
export async function login(email, password) {
  const base = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
  const res = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Login failed");

  if (data.requires2FA) return { requires2FA: true, mfaToken: data.mfaToken };

  const session = {
    name: data.user.name,
    email: data.user.email,
    role: backendRoleToAppRole(data.user.role),
    token: data.token,
    tenantId: data.user.tenantId,
  };
  setSession(session);
  return session;
}
