import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu01Icon,
  Cancel01Icon,
  ArrowDown01Icon,
  SparklesIcon,
  ChefHatIcon,
  Mortarboard01Icon,
  ShoppingCart01Icon,
  Hotel01Icon,
  ScissorIcon,
  Briefcase01Icon,
  Restaurant01Icon,
  Clock01Icon,
  Message01Icon,
  Task01Icon,
  Wallet01Icon,
  CoinsDollarIcon,
} from "hugeicons-react";

const links = [
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const allAppsItem = {
  icon: SparklesIcon,
  title: "All Apps",
  desc: "Overview of every app",
};

const solutionsMenu = [
  { icon: ChefHatIcon, title: "Cafes & Restaurants" },
  { icon: Mortarboard01Icon, title: "Schools" },
  { icon: ShoppingCart01Icon, title: "Grocery" },
  { icon: Hotel01Icon, title: "Hotels" },
  { icon: ScissorIcon, title: "Salons & Parlor" },
  { icon: Briefcase01Icon, title: "Agencies" },
];

const appsMenu = [
  {
    icon: Restaurant01Icon,
    title: "Cafe & Restaurant POS",
    desc: "Billing, QR ordering, and kitchen display in one system",
    to: "/pos/cafe-restaurant",
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
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-ink-900/5 bg-white/70 backdrop-blur-md px-6 py-3 shadow-[0_2px_20px_rgba(11,13,23,0.06)]">
        <Link to="/" className="text-xl font-extrabold text-ink-900">
          7shifts
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium text-ink-900">
          <li
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              onClick={() => setSolutionsOpen((o) => !o)}
              className="flex items-center gap-1 hover:text-brand-600"
              aria-expanded={solutionsOpen}
            >
              Solutions
              <ArrowDown01Icon size={16} strokeWidth={2} />
            </button>

            {solutionsOpen && (
              <div className="absolute left-0 top-full w-[280px] pt-4">
                <div
                  className="flex flex-col gap-1 border border-ink-900/5 bg-white p-3 shadow-[0_16px_40px_rgba(11,13,23,0.12)]"
                  style={{ borderRadius: "20px" }}
                >
                  {solutionsMenu.map(({ icon: Icon, title }) => (
                    <a
                      key={title}
                      href="#"
                      className="flex items-center gap-3 p-3 hover:bg-ink-900/5"
                      style={{ borderRadius: "14px" }}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <span className="font-semibold text-ink-900">{title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </li>

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
              <div className="absolute left-0 top-full w-[340px] pt-4">
                <div
                  className="flex flex-col gap-1 border border-ink-900/5 bg-white p-3 shadow-[0_16px_40px_rgba(11,13,23,0.12)]"
                  style={{ borderRadius: "20px" }}
                >
                  <Link
                    to="/apps"
                    className="flex items-start gap-3 p-3 hover:bg-ink-900/5"
                    style={{ borderRadius: "14px" }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <allAppsItem.icon size={18} strokeWidth={2} />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink-900">
                        {allAppsItem.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink-500">
                        {allAppsItem.desc}
                      </span>
                    </span>
                  </Link>

                  <div className="my-1 h-px bg-ink-900/5" />

                  {appsMenu.map(({ icon: Icon, title, desc, to }) => {
                    const ItemTag = to ? Link : "a";
                    const itemProps = to ? { to } : { href: "#" };
                    return (
                      <ItemTag
                        key={title}
                        {...itemProps}
                        className="flex items-start gap-3 p-3 hover:bg-ink-900/5"
                        style={{ borderRadius: "14px" }}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
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
                      </ItemTag>
                    );
                  })}
                </div>
              </div>
            )}
          </li>

          {links.map((link) =>
            link.to ? (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-brand-600">
                  {link.label}
                </Link>
              </li>
            ) : (
              <li key={link.label}>
                <a href={link.href} className="hover:text-brand-600">
                  {link.label}
                </a>
              </li>
            ),
          )}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#signup"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-brand-700"
          >
            Start 30-Days Free Trial
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
              <span className="mb-2 block text-ink-500">Solutions</span>
              <ul className="flex flex-col gap-2 pl-2">
                {solutionsMenu.map(({ title }) => (
                  <li key={title}>
                    <a href="#" onClick={() => setOpen(false)}>
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <span className="mb-2 block text-ink-500">Apps</span>
              <ul className="flex flex-col gap-2 pl-2">
                {appsMenu.map(({ title, to }) => (
                  <li key={title}>
                    {to ? (
                      <Link to={to} onClick={() => setOpen(false)}>
                        {title}
                      </Link>
                    ) : (
                      <a href="#" onClick={() => setOpen(false)}>
                        {title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </li>
            {links.map((link) =>
              link.to ? (
                <li key={link.label}>
                  <Link to={link.to} onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.label}>
                  <a href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="#signup"
              className="rounded-full bg-brand-600 px-5 py-2.5 text-center text-[15px] font-semibold text-white hover:bg-brand-700"
            >
              Start 30-Days Free Trial
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
