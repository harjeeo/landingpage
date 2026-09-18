import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  GridViewIcon,
  UserIcon,
  CreditCardIcon,
  Logout01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  Cancel01Icon,
  Mail01Icon,
  Call02Icon,
  Building06Icon,
  Location01Icon,
  LockPasswordIcon,
  Download01Icon,
  Invoice01Icon,
  SecurityCheckIcon,
  Tick02Icon,
} from "hugeicons-react";
import * as customerAuth from "../lib/customerAuth";
import { getMySubscriptions } from "../lib/subscriptions";

const sidebarItems = [
  { key: "subscriptions", icon: GridViewIcon, label: "Subscriptions" },
  { key: "profile", icon: UserIcon, label: "Profile" },
  { key: "payment", icon: CreditCardIcon, label: "Payment Details" },
];

const STATUS_META = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-600", icon: CheckmarkCircle02Icon },
  pending: { label: "Pending Payment", className: "bg-amber-50 text-amber-600", icon: Alert02Icon },
  cancelled: { label: "Cancelled", className: "bg-ink-900/5 text-ink-500", icon: Cancel01Icon },
};

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "subscriptions";

  const [session, setSession] = useState(() => customerAuth.getSession());
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    city: "",
    gstin: "",
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }

    setProfileForm({
      name: session.user?.name || "",
      email: session.user?.email || "",
      phone: session.user?.phone || "",
      businessName: session.user?.businessName || "",
      city: session.user?.city || "Ludhiana, Punjab",
      gstin: session.user?.gstin || "03AAAAA0000A1Z5",
    });

    getMySubscriptions()
      .then((items) => {
        const saasOnly = (items || []).filter((s) => {
          const cycle = (s.billingCycle || "").toLowerCase();
          const plan = (s.plan || "").toLowerCase();
          if (cycle.startsWith("course_") || cycle.startsWith("ebook_")) return false;
          if (plan.includes("masterclass") || plan.includes("course") || plan.includes("ebook")) return false;
          return true;
        });
        setSubscriptions(saasOnly);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load subscriptions"))
      .finally(() => setLoading(false));
  }, [session, navigate]);

  function handleTabChange(tab) {
    setSearchParams({ tab });
  }

  function handleLogout() {
    customerAuth.logout();
    navigate("/login");
  }

  function handleProfileSubmit(e) {
    e.preventDefault();
    setProfileSaving(true);
    setTimeout(() => {
      const updatedUser = customerAuth.updateSessionUser(profileForm);
      if (updatedUser) {
        setSession((prev) => ({ ...prev, user: updatedUser }));
      }
      setProfileSaving(false);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    }, 400);
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    setPasswordError("");
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setPasswordSaved(true);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordSaved(false), 3000);
  }

  if (!session) return null;

  const activeCount = subscriptions.filter((s) => s.status === "active").length;
  const pendingCount = subscriptions.filter((s) => s.status === "pending").length;
  const activeSub = subscriptions.find((s) => s.status === "active");

  const initials = (session.user?.name ?? session.user?.businessName ?? "User")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[260px_1fr]">
        {/* Left Sidebar */}
        <aside
          className="h-fit border border-ink-900/5 bg-ink-900/[0.02] p-4"
          style={{ borderRadius: "20px" }}
        >
          <div className="flex items-center gap-3 border-b border-ink-900/5 px-2 pb-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-sm">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-ink-900">
                {session.user?.businessName || session.user?.name}
              </span>
              <span className="block truncate text-xs text-ink-500">{session.user?.email}</span>
            </div>
          </div>

          <nav className="mt-4 flex flex-col gap-1">
            {sidebarItems.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === key
                    ? "bg-brand-50 text-brand-600"
                    : "text-ink-700 hover:bg-ink-900/5"
                }`}
                style={{ borderRadius: "12px" }}
              >
                <Icon size={18} strokeWidth={2} />
                {label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
              style={{ borderRadius: "12px" }}
            >
              <Logout01Icon size={18} strokeWidth={2} />
              Logout
            </button>
          </nav>
        </aside>

        {/* Right Content Area */}
        <section
          className="border border-ink-900/5 bg-white p-6 sm:p-8"
          style={{ borderRadius: "20px" }}
        >
          {/* TAB 1: Subscriptions */}
          {activeTab === "subscriptions" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-ink-900">My Subscriptions</h1>
                  <p className="mt-1 text-sm text-ink-500">
                    Manage your active plans, billing cycles, and renewals.
                  </p>
                </div>
                <Link
                  to="/pricing"
                  className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Add / Upgrade Plan
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="border border-ink-900/5 bg-ink-900/[0.02] px-6 py-4" style={{ borderRadius: "16px" }}>
                  <p className="text-2xl font-extrabold text-ink-900">{subscriptions.length}</p>
                  <p className="mt-0.5 text-xs font-semibold text-ink-500">Total</p>
                </div>
                <div className="bg-emerald-50 px-6 py-4" style={{ borderRadius: "16px" }}>
                  <p className="text-2xl font-extrabold text-emerald-700">{activeCount}</p>
                  <p className="mt-0.5 text-xs font-semibold text-emerald-600">Active</p>
                </div>
                <div className="bg-amber-50 px-6 py-4" style={{ borderRadius: "16px" }}>
                  <p className="text-2xl font-extrabold text-amber-700">{pendingCount}</p>
                  <p className="mt-0.5 text-xs font-semibold text-amber-600">Pending</p>
                </div>
              </div>

              {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

              <div className="mt-8 flex flex-col gap-3">
                {!loading && subscriptions.length === 0 && (
                  <div className="border border-dashed border-ink-900/10 p-10 text-center" style={{ borderRadius: "16px" }}>
                    <p className="font-semibold text-ink-900">No active subscriptions yet</p>
                    <p className="mt-1 text-sm text-ink-500">
                      Explore our flexible plans and activate your business system.
                    </p>
                    <Link
                      to="/pricing"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                      View Plans
                    </Link>
                  </div>
                )}

                {subscriptions.map((sub) => {
                  const meta = STATUS_META[sub.status] ?? STATUS_META.pending;
                  const StatusIcon = meta.icon;
                  return (
                    <div
                      key={sub.id}
                      className="flex flex-col gap-4 border border-ink-900/5 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                      style={{ borderRadius: "16px" }}
                    >
                      <div>
                        <p className="font-bold text-ink-900">{sub.plan} Plan</p>
                        <p className="mt-0.5 text-sm text-ink-500">
                          ₹{sub.amount?.toLocaleString("en-IN") || "—"} •{" "}
                          {sub.billingCycle === "annual" ? "Billed annually" : "Billed monthly"}
                        </p>
                        {sub.status === "active" && (
                          <p className="mt-1 text-xs text-ink-400">
                            {formatDate(sub.startsAt)} → {formatDate(sub.endsAt)}
                          </p>
                        )}
                      </div>
                      <span className={`flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold ${meta.className}`}>
                        <StatusIcon size={13} strokeWidth={2} />
                        {meta.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Profile */}
          {activeTab === "profile" && (
            <div>
              <div className="border-b border-ink-900/5 pb-6">
                <h1 className="text-2xl font-extrabold text-ink-900">Profile Information</h1>
                <p className="mt-1 text-sm text-ink-500">
                  Update your personal, business, and billing contact details.
                </p>
              </div>

              {profileSaved && (
                <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  <CheckmarkCircle02Icon size={18} strokeWidth={2.5} />
                  Profile updated successfully!
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="mt-6 space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                      Full Name
                    </span>
                    <div className="relative">
                      <UserIcon size={16} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full border border-ink-900/10 bg-ink-900/[0.02] px-3.5 py-2.5 pl-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none"
                        style={{ borderRadius: "12px" }}
                        placeholder="Your full name"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                      Email Address
                    </span>
                    <div className="relative">
                      <Mail01Icon size={16} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input
                        type="email"
                        disabled
                        value={profileForm.email}
                        className="w-full cursor-not-allowed border border-ink-900/10 bg-ink-900/5 px-3.5 py-2.5 pl-10 text-sm text-ink-500"
                        style={{ borderRadius: "12px" }}
                        title="Email cannot be changed directly"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                      Business / Store Name
                    </span>
                    <div className="relative">
                      <Building06Icon size={16} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input
                        type="text"
                        value={profileForm.businessName}
                        onChange={(e) => setProfileForm({ ...profileForm, businessName: e.target.value })}
                        className="w-full border border-ink-900/10 bg-ink-900/[0.02] px-3.5 py-2.5 pl-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none"
                        style={{ borderRadius: "12px" }}
                        placeholder="Business name"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                      Mobile Number
                    </span>
                    <div className="relative">
                      <Call02Icon size={16} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full border border-ink-900/10 bg-ink-900/[0.02] px-3.5 py-2.5 pl-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none"
                        style={{ borderRadius: "12px" }}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                      City / Location
                    </span>
                    <div className="relative">
                      <Location01Icon size={16} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input
                        type="text"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                        className="w-full border border-ink-900/10 bg-ink-900/[0.02] px-3.5 py-2.5 pl-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none"
                        style={{ borderRadius: "12px" }}
                        placeholder="e.g. Ludhiana, Punjab"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                      GSTIN (Optional)
                    </span>
                    <div className="relative">
                      <Invoice01Icon size={16} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input
                        type="text"
                        value={profileForm.gstin}
                        onChange={(e) => setProfileForm({ ...profileForm, gstin: e.target.value })}
                        className="w-full border border-ink-900/10 bg-ink-900/[0.02] px-3.5 py-2.5 pl-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none"
                        style={{ borderRadius: "12px" }}
                        placeholder="e.g. 03AAAAA0000A1Z5"
                      />
                    </div>
                  </label>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={profileSaving}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
                  >
                    {profileSaving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </form>

              {/* Password section */}
              <div className="mt-10 border-t border-ink-900/5 pt-8">
                <div className="flex items-center gap-2">
                  <SecurityCheckIcon size={20} strokeWidth={2} className="text-brand-600" />
                  <h2 className="text-lg font-bold text-ink-900">Security & Password</h2>
                </div>
                <p className="mt-1 text-sm text-ink-500">
                  Ensure your account is using a secure password.
                </p>

                {passwordSaved && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    <CheckmarkCircle02Icon size={18} strokeWidth={2.5} />
                    Password changed successfully!
                  </div>
                )}
                {passwordError && (
                  <div className="mt-4 text-xs font-semibold text-red-500">
                    {passwordError}
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="mt-5 max-w-md space-y-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                      Current Password
                    </span>
                    <div className="relative">
                      <LockPasswordIcon size={16} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input
                        type="password"
                        required
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full border border-ink-900/10 bg-ink-900/[0.02] px-3.5 py-2.5 pl-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none"
                        style={{ borderRadius: "12px" }}
                        placeholder="••••••••"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                      New Password
                    </span>
                    <div className="relative">
                      <LockPasswordIcon size={16} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input
                        type="password"
                        required
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full border border-ink-900/10 bg-ink-900/[0.02] px-3.5 py-2.5 pl-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none"
                        style={{ borderRadius: "12px" }}
                        placeholder="Minimum 6 characters"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                      Confirm New Password
                    </span>
                    <div className="relative">
                      <LockPasswordIcon size={16} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input
                        type="password"
                        required
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full border border-ink-900/10 bg-ink-900/[0.02] px-3.5 py-2.5 pl-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none"
                        style={{ borderRadius: "12px" }}
                        placeholder="Re-enter new password"
                      />
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-5 py-2.5 text-sm font-semibold text-ink-900 hover:bg-ink-900/5"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: Payment Details */}
          {activeTab === "payment" && (
            <div>
              <div className="border-b border-ink-900/5 pb-6">
                <h1 className="text-2xl font-extrabold text-ink-900">Payment Details</h1>
                <p className="mt-1 text-sm text-ink-500">
                  Manage billing preferences, payment gateways, and invoice history.
                </p>
              </div>

              {/* Billing Summary Cards */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="border border-ink-900/5 bg-ink-900/[0.02] p-5" style={{ borderRadius: "16px" }}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <CreditCardIcon size={18} strokeWidth={2} />
                  </span>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-500">Payment Method</p>
                  <p className="mt-1 text-base font-bold text-ink-900">
                    Razorpay (UPI / Card / NetBanking)
                  </p>
                  <p className="mt-0.5 text-xs text-ink-500">Secure 256-bit encrypted checkout</p>
                </div>

                <div className="border border-ink-900/5 bg-ink-900/[0.02] p-5" style={{ borderRadius: "16px" }}>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${activeSub ? "bg-emerald-50 text-emerald-600" : "bg-brand-50 text-brand-600"}`}>
                    <Tick02Icon size={18} strokeWidth={2.5} />
                  </span>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-500">Billing Status</p>
                  <p className={`mt-1 text-base font-bold ${activeSub ? "text-emerald-600" : "text-brand-600"}`}>
                    {activeSub ? `${activeSub.plan} Plan Active` : "30-Days Free Trial Active"}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-500">
                    {activeSub
                      ? `Renews on ${formatDate(activeSub.endsAt)}`
                      : "Full access enabled without charges"}
                  </p>
                </div>
              </div>

              {/* Transactions & Invoices Table */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-ink-900">Invoices &amp; Billing History</h2>
                  <span className="text-xs font-semibold text-ink-500">
                    Showing latest invoices
                  </span>
                </div>

                <div className="mt-4 overflow-hidden border border-ink-900/5" style={{ borderRadius: "16px" }}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-ink-900/5 bg-ink-900/[0.02] text-xs font-bold uppercase tracking-wider text-ink-500">
                        <tr>
                          <th className="px-5 py-3.5">Invoice</th>
                          <th className="px-5 py-3.5">Plan / Description</th>
                          <th className="px-5 py-3.5">Date</th>
                          <th className="px-5 py-3.5">Amount</th>
                          <th className="px-5 py-3.5">Status</th>
                          <th className="px-5 py-3.5 text-right">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink-900/5">
                        {subscriptions.length > 0 ? (
                          subscriptions.map((sub, idx) => (
                            <tr key={sub.id} className="hover:bg-ink-900/[0.01]">
                              <td className="whitespace-nowrap px-5 py-4 font-mono text-xs font-semibold text-ink-900">
                                INV-2026-00{idx + 1}
                              </td>
                              <td className="px-5 py-4 font-semibold text-ink-900">
                                {sub.plan} Plan ({sub.billingCycle === "annual" ? "Annual" : "Monthly"})
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-xs text-ink-500">
                                {formatDate(sub.createdAt || sub.startsAt || new Date())}
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 font-bold text-ink-900">
                                ₹{sub.amount?.toLocaleString("en-IN") || "399"}
                              </td>
                              <td className="whitespace-nowrap px-5 py-4">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                  sub.status === "active"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : sub.status === "pending"
                                      ? "bg-amber-50 text-amber-600"
                                      : "bg-ink-900/5 text-ink-500"
                                }`}>
                                  {sub.status === "active" ? "Paid" : sub.status === "pending" ? "Pending" : "Cancelled"}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-right">
                                <button
                                  onClick={() => alert(`Downloading invoice INV-2026-00${idx + 1}...`)}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
                                >
                                  <Download01Icon size={14} strokeWidth={2} />
                                  PDF
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <>
                            <tr className="hover:bg-ink-900/[0.01]">
                              <td className="whitespace-nowrap px-5 py-4 font-mono text-xs font-semibold text-ink-900">
                                INV-2026-001
                              </td>
                              <td className="px-5 py-4 font-semibold text-ink-900">
                                30-Days Free Trial — Full Access
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-xs text-ink-500">
                                {formatDate(new Date())}
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 font-bold text-ink-900">
                                ₹0.00
                              </td>
                              <td className="whitespace-nowrap px-5 py-4">
                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600">
                                  Trial Active
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-right">
                                <button
                                  onClick={() => alert("Downloading receipt INV-2026-001...")}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
                                >
                                  <Download01Icon size={14} strokeWidth={2} />
                                  Receipt
                                </button>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
