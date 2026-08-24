import { useState } from "react";
import {
  Menu01Icon,
  Cancel01Icon,
  ArrowDown01Icon,
  Calendar03Icon,
  Clock01Icon,
  Message01Icon,
  Task01Icon,
  Wallet01Icon,
  CoinsDollarIcon,
} from "hugeicons-react";

const links = [
  { label: "Industries", href: "#industries" },
  { label: "Pricing", href: "#pricing" },
  { label: "Help", href: "#help" },
];

const appsMenu = [
  {
    icon: Calendar03Icon,
    title: "Scheduling",
    desc: "Build and publish schedules your team can access anywhere",
  },
  {
    icon: Clock01Icon,
    title: "Time Clocking",
    desc: "Track hours and attendance with an easy-to-use time clock",
  },
  {
    icon: Message01Icon,
    title: "Team Communication",
    desc: "Keep everyone in sync with built-in messaging",
  },
  {
    icon: Task01Icon,
    title: "Task Management",
    desc: "Assign and track tasks across every shift",
  },
  {
    icon: Wallet01Icon,
    title: "Tip Manager",
    desc: "Pool and distribute tips accurately, automatically",
  },
  {
    icon: CoinsDollarIcon,
    title: "Payroll",
    desc: "Turn approved hours into paychecks without the busywork",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-ink-900/5 px-6 py-3 shadow-[0_2px_20px_rgba(11,13,23,0.06)]">
        <a href="#" className="text-xl font-extrabold text-ink-900">
          7shifts
        </a>

        <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium text-ink-900">
          <li
            className="relative"
            onMouseEnter={() => setAppsOpen(true)}
            onMouseLeave={() => setAppsOpen(false)}
          >
            <button
              onClick={() => setAppsOpen((o) => !o)}
              className="flex items-center gap-1 hover:text-brand-600"
              aria-expanded={appsOpen}
            >
              Apps
              <ArrowDown01Icon size={16} strokeWidth={2} />
            </button>

            {appsOpen && (
              <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4">
                <div
                  className="grid grid-cols-2 gap-x-8 gap-y-6 border border-ink-900/5 bg-white p-6 shadow-[0_16px_40px_rgba(11,13,23,0.12)]"
                  style={{ borderRadius: "20px" }}
                >
                  {appsMenu.map(({ icon: Icon, title, desc }) => (
                    <a
                      key={title}
                      href="#"
                      className="flex items-start gap-3 rounded-2xl p-2 hover:bg-ink-900/5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900/5 text-accent-500">
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <span>
                        <span className="block font-semibold text-ink-900">
                          {title}
                        </span>
                        <span className="mt-0.5 block text-sm text-ink-500">
                          {desc}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </li>

          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="hover:text-brand-600">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#login"
            className="rounded-full px-5 py-2.5 text-[15px] font-semibold text-ink-900 hover:bg-ink-900/5"
          >
            Login
          </a>
          <a
            href="#signup"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-brand-700"
          >
            Signup
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="md:hidden"
        >
          {open ? <Cancel01Icon size={24} /> : <Menu01Icon size={24} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-ink-900/5 bg-white p-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-3 text-[15px] font-medium text-ink-900">
            <li>
              <span className="mb-2 block text-ink-500">Apps</span>
              <ul className="flex flex-col gap-2 pl-2">
                {appsMenu.map(({ title }) => (
                  <li key={title}>
                    <a href="#" onClick={() => setOpen(false)}>
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="#login"
              className="rounded-full px-5 py-2.5 text-center text-[15px] font-semibold text-ink-900 hover:bg-ink-900/5"
            >
              Login
            </a>
            <a
              href="#signup"
              className="rounded-full bg-brand-600 px-5 py-2.5 text-center text-[15px] font-semibold text-white hover:bg-brand-700"
            >
              Signup
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
