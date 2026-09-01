import { Link } from "react-router-dom";
import {
  DashboardSquare01Icon,
  UserGroup03Icon,
  CreditCardIcon,
  InboxIcon,
  GridViewIcon,
  ArrowDown01Icon,
  Search01Icon,
  MoreHorizontalIcon,
  Cancel01Icon,
  Tick02Icon,
  PlayIcon,
  SquareLock02Icon,
  PinIcon,
  Invoice01Icon,
  ChefHatIcon,
  Calculator01Icon,
  Message01Icon,
} from "hugeicons-react";
import Logo from "../components/Logo";

const navTabs = [
  { icon: DashboardSquare01Icon, label: "Dashboard", active: true },
  { icon: UserGroup03Icon },
  { icon: CreditCardIcon },
  { icon: InboxIcon },
  { icon: GridViewIcon },
];

const subscriptions = [
  {
    kind: "simple",
    icon: ChefHatIcon,
    iconTone: "bg-emerald-500 text-white",
    title: "Cafe & Restaurant POS",
    desc: "Billing, QR ordering, kitchen display, and more.",
    status: "Active",
    statusTone: "bg-emerald-50 text-emerald-600",
  },
  {
    kind: "promo",
    icon: Calculator01Icon,
    iconTone: "bg-white text-brand-600",
    title: "Accounting Software",
    desc: "Invoicing, expense tracking, and tax reports.",
    status: "Trial • 5 days left",
    members: 3,
  },
  {
    kind: "locked",
    icon: SquareLock02Icon,
    iconTone: "bg-ink-900/10 text-ink-500",
    title: "Payroll",
    desc: "Turn approved hours into paychecks automatically.",
    status: "Not Subscribed",
    statusTone: "bg-ink-900/5 text-ink-500",
  },
  {
    kind: "simple",
    icon: Message01Icon,
    iconTone: "bg-emerald-500 text-white",
    title: "Team Communication",
    desc: "Keep everyone in sync with built-in messaging.",
    status: "Active",
    statusTone: "bg-emerald-50 text-emerald-600",
  },
  {
    kind: "simple",
    icon: SquareLock02Icon,
    iconTone: "bg-ink-900/10 text-ink-500",
    title: "Task Management",
    desc: "Assign and track tasks across every shift.",
    status: "Upcoming",
    statusTone: "bg-amber-50 text-amber-600",
  },
];

const activity = [
  {
    tone: "bg-violet-100 text-violet-700",
    label: "Invoice",
    date: "Tu, 25.03",
    title: "March invoice ready",
    desc: "Your Growth plan invoice for March is ready to view.",
    cta: "View Invoice",
  },
  {
    tone: "bg-pink-100 text-pink-700",
    label: "Renewal",
    date: "We, 26.03",
    title: "Cafe & Restaurant POS",
    desc: "Renews automatically on this date at ₹35/mo.",
  },
  {
    tone: "bg-amber-100 text-amber-700",
    label: "Reminder",
    date: "Th, 27.03",
    title: "Update payment method",
    desc: "Update your card before your next billing cycle.",
    pin: true,
  },
];

function StatusPill({ children, tone }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${tone}`}>
      {children}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-ink-900">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/">
          <Logo height={26} className="text-white" />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-white/5 p-1 md:flex">
          {navTabs.map(({ icon: Icon, label, active }, i) => (
            <button
              key={i}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                active ? "bg-white text-ink-900" : "text-white/60 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 rounded-full bg-white/5 py-1.5 pl-1.5 pr-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
            RS
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-semibold text-white">
              Riya Sharma
            </span>
            <span className="block text-xs text-white/50">
              riya@business.com
            </span>
          </span>
          <ArrowDown01Icon size={16} strokeWidth={2} className="text-white/50" />
        </button>
      </header>

      <main
        className="mx-auto max-w-7xl bg-[#f4f4f2] px-6 py-10 sm:px-10"
        style={{ borderTopLeftRadius: "32px", borderTopRightRadius: "32px" }}
      >
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-2xl font-extrabold text-ink-900">
                My Subscriptions 📦
              </h1>
              <div className="flex w-full items-center gap-2 rounded-full border border-ink-900/10 bg-white px-4 py-2.5 sm:w-64">
                <Search01Icon size={16} strokeWidth={2} className="text-ink-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="border border-ink-900/5 bg-white px-6 py-4" style={{ borderRadius: "16px" }}>
                <p className="text-2xl font-extrabold text-ink-900">5</p>
                <p className="mt-0.5 text-xs font-semibold text-ink-500">Total</p>
              </div>
              <div className="bg-emerald-50 px-6 py-4" style={{ borderRadius: "16px" }}>
                <p className="text-2xl font-extrabold text-emerald-700">2 🎉</p>
                <p className="mt-0.5 text-xs font-semibold text-emerald-600">Active</p>
              </div>
              <div className="border border-ink-900/5 bg-white px-6 py-4" style={{ borderRadius: "16px" }}>
                <p className="text-2xl font-extrabold text-ink-900">3</p>
                <p className="mt-0.5 text-xs font-semibold text-ink-500">Upcoming</p>
              </div>
            </div>

            <div className="relative mt-8 pl-14">
              <div className="absolute bottom-6 left-[27px] top-6 border-l-2 border-dashed border-emerald-200" />

              {subscriptions.map((sub, i) => {
                const Icon = sub.icon;
                return (
                  <div key={i} className="relative mb-6 last:mb-0">
                    <span
                      className={`absolute -left-14 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full ring-4 ring-[#f4f4f2] ${sub.iconTone}`}
                    >
                      <Icon size={16} strokeWidth={2} />
                    </span>

                    {sub.kind === "promo" ? (
                      <div
                        className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-6 text-white"
                        style={{ borderRadius: "20px" }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xl font-extrabold">{sub.title}</p>
                            <p className="mt-1 text-sm text-white/80">{sub.desc}</p>
                          </div>
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20">
                            <PlayIcon size={18} strokeWidth={2} />
                          </span>
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                            {sub.status}
                          </span>
                          <div className="flex -space-x-2">
                            {Array.from({ length: sub.members }).map((_, m) => (
                              <span
                                key={m}
                                className="h-7 w-7 rounded-full border-2 border-fuchsia-400 bg-white/30"
                              />
                            ))}
                          </div>
                        </div>
                        <button className="mt-5 w-full rounded-full bg-white py-2.5 text-sm font-bold text-fuchsia-600">
                          Manage Plan
                        </button>
                      </div>
                    ) : (
                      <div
                        className="flex items-center justify-between gap-4 border border-ink-900/5 bg-white p-5"
                        style={{ borderRadius: "20px" }}
                      >
                        <div>
                          <p className="font-bold text-ink-900">{sub.title}</p>
                          <p className="mt-0.5 text-sm text-ink-500">{sub.desc}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <StatusPill tone={sub.statusTone}>{sub.status}</StatusPill>
                          {sub.kind === "simple" && sub.status === "Active" ? (
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div
              className="border border-ink-900/5 bg-white p-5"
              style={{ borderRadius: "20px" }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-base font-bold text-white">
                  RS
                </span>
                <div>
                  <p className="font-bold text-ink-900">Riya Sharma</p>
                  <p className="text-sm text-ink-500">riya@business.com</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-ink-900/5 pt-4 text-sm">
                <span className="text-ink-500">Current Plan</span>
                <span className="font-semibold text-ink-900">Growth</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-ink-500">Member Since</span>
                <span className="font-semibold text-ink-900">Jan 2026</span>
              </div>
              <Link
                to="#"
                className="mt-4 block rounded-full border border-ink-900/10 py-2 text-center text-sm font-semibold text-ink-900 hover:bg-ink-900/5"
              >
                Edit Profile
              </Link>
            </div>

            <h2 className="mt-8 text-xl font-extrabold text-ink-900">
              Billing & Activity 🔔
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              {activity.map((item, i) => (
                <div
                  key={i}
                  className={`p-5 ${item.tone}`}
                  style={{ borderRadius: "20px" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm font-bold">
                      {item.pin && <PinIcon size={14} strokeWidth={2} />}
                      {!item.pin && <Invoice01Icon size={14} strokeWidth={2} />}
                      {item.label}
                    </span>
                    <span className="text-xs font-semibold opacity-70">
                      {item.date}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm opacity-80">{item.desc}</p>
                  {item.cta && (
                    <button className="mt-4 w-full rounded-full bg-white/60 py-2 text-sm font-bold hover:bg-white/80">
                      {item.cta}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
