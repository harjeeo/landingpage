import { useState } from "react";
import {
  DashboardSquare01Icon,
  InboxIcon,
  GridViewIcon,
  UserGroup03Icon,
  Settings01Icon,
  Logout01Icon,
  Search01Icon,
  MoreHorizontalIcon,
  Mail01Icon,
  Call02Icon,
  ChefHatIcon,
  Calculator01Icon,
} from "hugeicons-react";

const sidebarItems = [
  { key: "overview", icon: DashboardSquare01Icon, label: "Overview" },
  { key: "leads", icon: InboxIcon, label: "Leads" },
  { key: "subscriptions", icon: GridViewIcon, label: "Subscriptions" },
  { key: "users", icon: UserGroup03Icon, label: "Users" },
  { key: "settings", icon: Settings01Icon, label: "Settings" },
  { key: "logout", icon: Logout01Icon, label: "Logout" },
];

const leads = [
  {
    name: "Riya Sharma",
    contact: "riya@business.com",
    source: "Cafe & Restaurant POS",
    status: "New",
    statusTone: "bg-blue-50 text-blue-600",
    date: "25 Mar",
  },
  {
    name: "Arjun Mehta",
    contact: "+91 98765 43210",
    source: "Contact Page",
    status: "Contacted",
    statusTone: "bg-amber-50 text-amber-600",
    date: "24 Mar",
  },
  {
    name: "Priya Nair",
    contact: "priya.nair@cafeplace.in",
    source: "Accounting Software",
    status: "Converted",
    statusTone: "bg-emerald-50 text-emerald-600",
    date: "22 Mar",
  },
  {
    name: "Karan Patel",
    contact: "karan@thekitchenhub.com",
    source: "Book a Demo",
    status: "New",
    statusTone: "bg-blue-50 text-blue-600",
    date: "21 Mar",
  },
  {
    name: "Sana Iqbal",
    contact: "+91 90210 11223",
    source: "Pricing Page",
    status: "Contacted",
    statusTone: "bg-amber-50 text-amber-600",
    date: "19 Mar",
  },
];

const subscriptions = [
  {
    icon: ChefHatIcon,
    name: "Bierplatz Cafe",
    plan: "Growth",
    product: "Cafe & Restaurant POS",
    status: "Active",
    statusTone: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Calculator01Icon,
    name: "The Kitchen Hub",
    plan: "Starter",
    product: "Accounting Software",
    status: "Trial",
    statusTone: "bg-brand-50 text-brand-600",
  },
  {
    icon: ChefHatIcon,
    name: "Spice Route Diner",
    plan: "Enterprise",
    product: "Cafe & Restaurant POS",
    status: "Active",
    statusTone: "bg-emerald-50 text-emerald-600",
  },
];

function StatCard({ value, label, tone }) {
  return (
    <div
      className={`px-6 py-4 ${tone || "border border-ink-900/5 bg-ink-900/[0.02]"}`}
      style={{ borderRadius: "16px" }}
    >
      <p className="text-2xl font-extrabold text-ink-900">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-ink-500">{label}</p>
    </div>
  );
}

function LeadsView() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-ink-900">Leads</h1>
        <div
          className="flex w-full items-center gap-2 border border-ink-900/10 bg-ink-900/[0.02] px-4 py-2.5 sm:w-64"
          style={{ borderRadius: "9999px" }}
        >
          <Search01Icon size={16} strokeWidth={2} className="text-ink-400" />
          <input
            type="text"
            placeholder="Search leads"
            className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <StatCard value="5" label="Total Leads" />
        <StatCard value="2" label="New" tone="bg-blue-50" />
        <StatCard value="1" label="Converted" tone="bg-emerald-50" />
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {leads.map((lead) => (
          <div
            key={lead.contact}
            className="flex flex-wrap items-center justify-between gap-4 border border-ink-900/5 bg-white p-5"
            style={{ borderRadius: "16px" }}
          >
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                {lead.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div>
                <p className="font-bold text-ink-900">{lead.name}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-500">
                  {lead.contact.includes("@") ? (
                    <Mail01Icon size={14} strokeWidth={2} />
                  ) : (
                    <Call02Icon size={14} strokeWidth={2} />
                  )}
                  {lead.contact}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                {lead.source}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${lead.statusTone}`}>
                {lead.status}
              </span>
              <span className="text-xs font-semibold text-ink-400">{lead.date}</span>
              <button
                aria-label="More options"
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 hover:bg-ink-900/5"
              >
                <MoreHorizontalIcon size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SubscriptionsView() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-ink-900">Subscriptions</h1>
        <div
          className="flex w-full items-center gap-2 border border-ink-900/10 bg-ink-900/[0.02] px-4 py-2.5 sm:w-64"
          style={{ borderRadius: "9999px" }}
        >
          <Search01Icon size={16} strokeWidth={2} className="text-ink-400" />
          <input
            type="text"
            placeholder="Search subscriptions"
            className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <StatCard value="128" label="Total Subscriptions" />
        <StatCard value="104" label="Active" tone="bg-emerald-50" />
        <StatCard value="24" label="On Trial" tone="bg-brand-50" />
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {subscriptions.map((sub) => {
          const Icon = sub.icon;
          return (
            <div
              key={sub.name}
              className="flex flex-wrap items-center justify-between gap-4 border border-ink-900/5 bg-white p-5"
              style={{ borderRadius: "16px" }}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <div>
                  <p className="font-bold text-ink-900">{sub.name}</p>
                  <p className="mt-0.5 text-sm text-ink-500">{sub.product}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  {sub.plan}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${sub.statusTone}`}>
                  {sub.status}
                </span>
                <button
                  aria-label="More options"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 hover:bg-ink-900/5"
                >
                  <MoreHorizontalIcon size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function PlaceholderView({ label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
      <p className="text-lg font-bold text-ink-900">{label}</p>
      <p className="text-sm text-ink-500">Coming soon.</p>
    </div>
  );
}

export default function SuperAdmin() {
  const [activeTab, setActiveTab] = useState("leads");

  return (
    <div className="bg-white px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[260px_1fr]">
        <aside
          className="h-fit border border-ink-900/5 bg-ink-900/[0.02] p-4"
          style={{ borderRadius: "20px" }}
        >
          <div className="flex items-center gap-3 border-b border-ink-900/5 px-2 pb-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white">
              SA
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink-900">
                Super Admin
              </span>
              <span className="block text-xs text-ink-500">
                admin@designsclue.com
              </span>
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
          </nav>
        </aside>

        <section
          className="border border-ink-900/5 bg-white p-6 sm:p-8"
          style={{ borderRadius: "20px" }}
        >
          {activeTab === "leads" && <LeadsView />}
          {activeTab === "subscriptions" && <SubscriptionsView />}
          {activeTab === "overview" && <PlaceholderView label="Overview" />}
          {activeTab === "users" && <PlaceholderView label="Users" />}
          {activeTab === "settings" && <PlaceholderView label="Settings" />}
          {activeTab === "logout" && <PlaceholderView label="Logout" />}
        </section>
      </div>
    </div>
  );
}
