import { Link } from "react-router-dom";
import {
  ChartLineData01Icon,
  Call02Icon,
  Mail01Icon,
  Location01Icon,
  ArrowRight02Icon,
} from "hugeicons-react";

const columns = [
  {
    title: "Solutions",
    links: [
      "Cafes & Restaurants",
      "Schools",
      "Grocery",
      "Hotels",
      "Salons & Parlor",
      "Agencies",
    ],
  },
  {
    title: "Apps",
    links: [
      { label: "Cafe & Restaurant POS", to: "/pos/cafe-restaurant" },
      { label: "Accounting Software", to: "/accounting-software" },
      "Team Communication",
      "Task Management",
      "Tip Manager",
      "Payroll",
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", to: "/pricing" },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

const contacts = [
  { icon: Call02Icon, label: "Sales", value: "+1 (800) 555-0173" },
  { icon: Mail01Icon, label: "Support", value: "support@7shifts.com" },
  { icon: Location01Icon, label: "HQ", value: "Toronto, Canada" },
];

const legalLinks = ["Privacy", "Terms", "Security", "GDPR"];

export default function Footer() {
  return (
    <footer className="bg-ink-900 px-4 pb-8 pt-20">
      <div className="mx-auto max-w-6xl">
        <div
          className="flex flex-col gap-6 border border-white/10 bg-white/5 p-8 md:flex-row md:items-center md:justify-between"
          style={{ borderRadius: "20px" }}
        >
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              Ready to upgrade your restaurant?
            </h2>
            <p className="mt-1 text-white/60">
              Join 500+ restaurants running on 7shifts today.
            </p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-3">
            <a
              href="#get-started"
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Start Free Trial
            </a>
            <a
              href="#contact-us"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5"
            >
              Talk to Sales
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <ChartLineData01Icon size={16} strokeWidth={2} />
              </span>
              7shifts
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              The platform behind great restaurant teams. Scheduling, time
              tracking, and payroll, built for the way restaurants work.
            </p>

            <p className="mt-8 text-sm font-semibold text-white">
              Subscribe to Industry Insights
            </p>
            <form className="mt-2 flex max-w-xs items-center gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
                style={{ borderRadius: "12px" }}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700"
              >
                <ArrowRight02Icon size={18} strokeWidth={2.5} />
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-white">{col.title}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((l) => {
                    const label = typeof l === "string" ? l : l.label;
                    const to = typeof l === "string" ? null : l.to;
                    return (
                      <li key={label}>
                        {to ? (
                          <Link to={to} className="text-sm text-white/60 hover:text-white">
                            {label}
                          </Link>
                        ) : (
                          <a href="#" className="text-sm text-white/60 hover:text-white">
                            {label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          {contacts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-white">
                <Icon size={18} strokeWidth={2} />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-white/40">
                  {label}
                </span>
                <span className="block text-sm font-medium text-white">{value}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row">
          <p>&copy; 2026 7shifts. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {legalLinks.map((l) => (
              <a key={l} href="#" className="hover:text-white">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
