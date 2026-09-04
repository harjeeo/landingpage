// Trimmed API client — only the Super Admin-relevant functions from the
// original lib/api.ts (order-dashboard-api backend). Point VITE_API_URL at a
// backend implementing these routes, or rewrite the bodies below to match
// your own backend/API shape — the page components only care about the
// shape each function returns.

import { getToken, logout } from "./useAuth";

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
    window.location.href = "/login/super-admin";
    throw new Error("Session expired");
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.error ?? "Request failed");
  return data;
}

const get = (path) => request(path);
const post = (path, body) => request(path, { method: "POST", body: body !== undefined ? JSON.stringify(body) : undefined });
const patch = (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) });
const del = (path) => request(path, { method: "DELETE" });

function qs(params) {
  const s = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) s.set(k, v);
  const str = s.toString();
  return str ? `?${str}` : "";
}

function toDateInput(d) {
  return d ? new Date(d).toISOString().slice(0, 10) : "";
}

export async function changePassword(currentPassword, newPassword) {
  return post("/auth/change-password", { currentPassword, newPassword });
}

// --- Super Admin: Tenant management -------------------------------------

export const TENANT_PLANS = ["Starter", "Growth"];

function mapTenant(t) {
  return {
    _id: t.id,
    name: t.name,
    slug: t.slug,
    ownerName: t.ownerName,
    phone: t.phone,
    email: t.email,
    address: t.address,
    status: t.status,
    plan: t.plan,
    planExpiry: toDateInput(t.planExpiry),
    totalOrders: t.totalOrders ?? 0,
    totalRevenue: t.totalRevenue ?? 0,
    staffCount: t.staffCount ?? 0,
    createdAt: t.createdAt,
  };
}

export async function getSuperAdminStats() {
  return get("/tenants/stats/summary");
}

export async function getTenants({ search = "", status = "all", page = 1, pageSize = 20 } = {}) {
  const result = await get(
    `/tenants${qs({ search, status: status !== "all" ? status : undefined, page: String(page), pageSize: String(pageSize) })}`,
  );
  return { items: result.items.map(mapTenant), total: result.total, page: result.page, pageSize: result.pageSize };
}

export async function bulkTenantAction(ids, action, plan) {
  return post("/tenants/bulk", { ids, action, plan });
}

export async function impersonateTenant(tenantId) {
  return post(`/tenants/${tenantId}/impersonate`);
}

export async function exportTenantsCsv({ search = "", status = "all" } = {}) {
  const res = await fetch(`${BASE_URL}/api/tenants/export${qs({ search, status: status !== "all" ? status : undefined })}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Could not export tenants");
  return res.blob();
}

export async function createTenant(data) {
  const tenant = await post("/tenants", data);
  return { ...mapTenant(tenant), staffLogin: tenant.staffLogin, emailSent: tenant.emailSent };
}

export async function updateTenant(tenantId, data) {
  const tenant = await patch(`/tenants/${tenantId}`, data);
  return mapTenant(tenant);
}

export async function resetTenantPassword(tenantId) {
  return post(`/tenants/${tenantId}/reset-password`);
}

export async function toggleTenantStatus(tenantId) {
  const tenant = await post(`/tenants/${tenantId}/toggle-status`);
  return mapTenant(tenant);
}

export async function deleteTenant(tenantId) {
  return del(`/tenants/${tenantId}`);
}

export async function getSuperAdminReports({ expiringDays = 30, months = 6 } = {}) {
  const report = await get(`/platform-settings/reports${qs({ expiringDays: String(expiringDays), months: String(months) })}`);
  return {
    ...report,
    topTenants: report.topTenants.map(mapTenant),
    expiringPlans: report.expiringPlans.map(mapTenant),
  };
}

export async function exportSuperAdminReportCsv({ expiringDays = 30, months = 6 } = {}) {
  const res = await fetch(
    `${BASE_URL}/api/platform-settings/reports/export${qs({ expiringDays: String(expiringDays), months: String(months) })}`,
    { headers: { Authorization: `Bearer ${getToken()}` } },
  );
  if (!res.ok) throw new Error("Could not export report");
  return res.blob();
}

export async function getPlatformSettings() {
  return get("/platform-settings");
}

export async function updatePlatformSettings(data) {
  return patch("/platform-settings", data);
}

// --- Email provider (transactional credential emails) ---------------------

export const EMAIL_PROVIDERS = [
  { key: "none", label: "None (copy credentials manually)", fields: [] },
  {
    key: "mailjet",
    label: "Mailjet",
    fields: [
      { key: "apiKey", label: "API Key" },
      { key: "apiSecret", label: "Secret Key" },
    ],
  },
  {
    key: "brevo",
    label: "Brevo",
    fields: [{ key: "apiKey", label: "API Key" }],
  },
];

export async function sendTestEmail(to) {
  return post("/platform-settings/email/test", { to });
}

// --- SMS/WhatsApp provider (order-ready / bill-paid notifications) -------

export const SMS_PROVIDERS = [
  { key: "none", label: "None (no customer notifications)", fields: [] },
  {
    key: "twilio",
    label: "Twilio",
    fields: [
      { key: "accountSid", label: "Account SID" },
      { key: "authToken", label: "Auth Token" },
      { key: "fromNumber", label: "From Number" },
    ],
  },
];

export async function sendTestSms(to) {
  return post("/platform-settings/sms/test", { to });
}

// --- Super Admin: Audit log -----------------------------------------

export async function getAuditLog({ page = 1, pageSize = 30 } = {}) {
  const result = await get(`/tenants/audit-log${qs({ page: String(page), pageSize: String(pageSize) })}`);
  return {
    items: result.items.map((e) => ({
      _id: e.id,
      actorEmail: e.actorEmail,
      actorRole: e.actorRole,
      action: e.action,
      targetType: e.targetType,
      targetId: e.targetId,
      meta: e.meta,
      createdAt: e.createdAt,
    })),
    total: result.total,
    page: result.page,
    pageSize: result.pageSize,
  };
}

// --- Menu icon library (Super-Admin-curated, searchable by cafe staff) --

function mapMenuIcon(i) {
  return { _id: i.id, name: i.name, image: i.image };
}

export async function getMenuIcons(search = "") {
  const icons = await get(`/menu-icons${qs({ search })}`);
  return icons.map(mapMenuIcon);
}

export async function createMenuIcon(data) {
  const icon = await post("/menu-icons", data);
  return mapMenuIcon(icon);
}

export async function deleteMenuIcon(id) {
  return del(`/menu-icons/${id}`);
}

// --- Leads (captured from both the Ojar site and the Designs Clue site) ---

function mapLead(l) {
  return {
    _id: l.id,
    name: l.name,
    contact: l.contact,
    source: l.source, // "dc" | "ojar"
    sourcePage: l.source_page,
    message: l.message,
    status: l.status,
    createdAt: l.created_at,
  };
}

export async function getLeads({ page = 1, pageSize = 20 } = {}) {
  const result = await get(`/leads${qs({ page: String(page), pageSize: String(pageSize) })}`);
  return { items: result.items.map(mapLead), total: result.total, page: result.page, pageSize: result.pageSize };
}
