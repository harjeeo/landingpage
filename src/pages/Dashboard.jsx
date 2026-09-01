import { useState } from "react";
import {
  GridViewIcon,
  UserIcon,
  CreditCardIcon,
  Logout01Icon,
  Search01Icon,
  MoreHorizontalIcon,
  Cancel01Icon,
  Tick02Icon,
  PlayIcon,
  SquareLock02Icon,
  ChefHatIcon,
  Calculator01Icon,
  Message01Icon,
} from "hugeicons-react";

const sidebarItems = [
  { key: "subscriptions", icon: GridViewIcon, label: "Subscriptions" },
  { key: "profile", icon: UserIcon, label: "Profile" },
  { key: "payment", icon: CreditCardIcon, label: "Payment Details" },
  { key: "logout", icon: Logout01Icon, label: "Logout" },
];

const subscriptions = [
  {
    kind: "simple",
    icon: ChefHatIcon,
    iconTone: "bg-brand-50 text-brand-600",
    title: "Cafe & Restaurant POS",
    desc: "Billing, QR ordering, kitchen display, and more.",
    status: "Active",
    statusTone: "bg-emerald-50 text-emerald-600",
  },
  {
    kind: "promo",
    icon: Calculator01Icon,
    title: "Accounting Software",
    desc: "Invoicing, expense tracking, and tax reports.",
    status: "Trial • 5 days left",
    members: 3,
  },
  {
    kind: "simple",
    icon: SquareLock02Icon,
    iconTone: "bg-ink-900/5 text-ink-500",
    title: "Payroll",
    desc: "Turn approved hours into paychecks automatically.",
    status: "Not Subscribed",
    statusTone: "bg-ink-900/5 text-ink-500",
  },
  {
    kind: "simple",
    icon: Message01Icon,
    iconTone: "bg-brand-50 text-brand-600",
    title: "Team Communication",
    desc: "Keep everyone in sync with built-in messaging.",
    status: "Active",
    statusTone: "bg-emerald-50 text-emerald-600",
  },
  {
    kind: "simple",
    icon: SquareLock02Icon,
    iconTone: "bg-ink-900/5 text-ink-500",
    title: "Task Management",
    desc: "Assign and track tasks across every shift.",
    status: "Upcoming",
    statusTone: "bg-amber-50 text-amber-600",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("subscriptions");

  return (
    <div className="bg-white px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[260px_1fr]">
        <aside
          className="h-fit border border-ink-900/5 bg-ink-900/[0.02] p-4"
          style={{ borderRadius: "20px" }}
        >
          <div className="flex items-center gap-3 border-b border-ink-900/5 px-2 pb-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
              RS
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink-900">
                Riya Sharma
              </span>
              <span className="block text-xs text-ink-500">
                riya@business.com
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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-extrabold text-ink-900">
              My Subscriptions
            </h1>
            <div className="flex w-full items-center gap-2 border border-ink-900/10 bg-ink-900/[0.02] px-4 py-2.5 sm:w-64" style={{ borderRadius: "9999px" }}>
              <Search01Icon size={16} strokeWidth={2} className="text-ink-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="border border-ink-900/5 bg-ink-900/[0.02] px-6 py-4" style={{ borderRadius: "16px" }}>
              <p className="text-2xl font-extrabold text-ink-900">5</p>
              <p className="mt-0.5 text-xs font-semibold text-ink-500">Total</p>
            </div>
            <div className="bg-emerald-50 px-6 py-4" style={{ borderRadius: "16px" }}>
              <p className="text-2xl font-extrabold text-emerald-700">2</p>
              <p className="mt-0.5 text-xs font-semibold text-emerald-600">Active</p>
            </div>
            <div className="border border-ink-900/5 bg-ink-900/[0.02] px-6 py-4" style={{ borderRadius: "16px" }}>
              <p className="text-2xl font-extrabold text-ink-900">3</p>
              <p className="mt-0.5 text-xs font-semibold text-ink-500">Upcoming</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {subscriptions.map((sub, i) => {
              const Icon = sub.icon;
              return sub.kind === "promo" ? (
                <div
                  key={i}
                  className="flex flex-col gap-4 border border-ink-900/5 bg-brand-50 p-5 sm:flex-row sm:items-center sm:justify-between"
                  style={{ borderRadius: "16px" }}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-600">
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <div>
                      <p className="font-bold text-ink-900">{sub.title}</p>
                      <p className="mt-0.5 text-sm text-ink-500">{sub.desc}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="flex -space-x-2">
                      {Array.from({ length: sub.members }).map((_, m) => (
                        <span
                          key={m}
                          className="h-7 w-7 rounded-full border-2 border-brand-50 bg-white"
                        />
                      ))}
                    </div>
                    <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
                      {sub.status}
                    </span>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700">
                      <PlayIcon size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 border border-ink-900/5 bg-white p-5"
                  style={{ borderRadius: "16px" }}
                >
                  <div className="flex items-center gap-4">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${sub.iconTone}`}>
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <div>
                      <p className="font-bold text-ink-900">{sub.title}</p>
                      <p className="mt-0.5 text-sm text-ink-500">{sub.desc}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${sub.statusTone}`}>
                      {sub.status}
                    </span>
                    {sub.status === "Active" ? (
                      <>
                        <button
                          aria-label="More options"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 hover:bg-ink-900/5"
                        >
                          <MoreHorizontalIcon size={16} strokeWidth={2} />
                        </button>
                        <button
                          aria-label="Cancel subscription"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 hover:bg-ink-900/5"
                        >
                          <Cancel01Icon size={14} strokeWidth={2} />
                        </button>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-white">
                          <Tick02Icon size={14} strokeWidth={3} />
                        </span>
                      </>
                    ) : (
                      <button
                        aria-label="More options"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 hover:bg-ink-900/5"
                      >
                        <MoreHorizontalIcon size={16} strokeWidth={2} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
