import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  GridViewIcon,
  UserIcon,
  CreditCardIcon,
  Logout01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  Cancel01Icon,
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
  const [activeTab, setActiveTab] = useState("subscriptions");
  const [session, setSession] = useState(() => customerAuth.getSession());
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }
    getMySubscriptions()
      .then(setSubscriptions)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load subscriptions"))
      .finally(() => setLoading(false));
  }, [session, navigate]);

  function handleLogout() {
    customerAuth.logout();
    navigate("/login");
  }

  if (!session) return null;

  const activeCount = subscriptions.filter((s) => s.status === "active").length;
  const pendingCount = subscriptions.filter((s) => s.status === "pending").length;

  return (
    <div className="bg-white px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[260px_1fr]">
        <aside
          className="h-fit border border-ink-900/5 bg-ink-900/[0.02] p-4"
          style={{ borderRadius: "20px" }}
        >
          <div className="flex items-center gap-3 border-b border-ink-900/5 px-2 pb-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
              {(session.user?.name ?? "U").slice(0, 2).toUpperCase()}
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink-900">
                {session.user?.businessName || session.user?.name}
              </span>
              <span className="block text-xs text-ink-500">{session.user?.email}</span>
            </span>
          </div>

          <nav className="mt-4 flex flex-col gap-1">
            {sidebarItems.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold ${
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
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-900/5"
              style={{ borderRadius: "12px" }}
            >
              <Logout01Icon size={18} strokeWidth={2} />
              Logout
            </button>
          </nav>
        </aside>

        <section
          className="border border-ink-900/5 bg-white p-6 sm:p-8"
          style={{ borderRadius: "20px" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-extrabold text-ink-900">My Subscriptions</h1>
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
              <div className="border border-dashed border-ink-900/10 p-8 text-center" style={{ borderRadius: "16px" }}>
                <p className="font-semibold text-ink-900">No subscriptions yet</p>
                <p className="mt-1 text-sm text-ink-500">
                  Pick a plan to get started.
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
                      ₹{sub.amount.toLocaleString("en-IN")} •{" "}
                      {sub.billingCycle === "annual" ? "Billed annually" : "Billed monthly"}
                    </p>
                    {sub.status === "active" && (
                      <p className="mt-0.5 text-xs text-ink-400">
                        {formatDate(sub.startsAt)} → {formatDate(sub.endsAt)}
                      </p>
                    )}
                  </div>
                  <span className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${meta.className}`}>
                    <StatusIcon size={13} strokeWidth={2} />
                    {meta.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
