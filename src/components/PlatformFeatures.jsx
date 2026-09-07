import { Link } from "react-router-dom";
import {
  CreditCardPosIcon,
  RestaurantTableIcon,
  Invoice01Icon,
  ChartBarLineIcon,
  UserGroup03Icon,
  Wallet01Icon,
  Hotel01Icon,
  BedSingle01Icon,
  Calendar01Icon,
  CreditCardIcon,
  PackageIcon,
  LoyaltyCardIcon,
  ArrowRight02Icon,
} from "hugeicons-react";

const colors = {
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  green: { bg: "bg-emerald-50", text: "text-emerald-600" },
  red: { bg: "bg-rose-50", text: "text-rose-600" },
  orange: { bg: "bg-amber-50", text: "text-amber-600" },
  pink: { bg: "bg-pink-50", text: "text-pink-600" },
  purple: { bg: "bg-violet-50", text: "text-violet-600" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600" },
};

const features = [
  {
    icon: CreditCardPosIcon,
    tag: "Core POS",
    color: "blue",
    title: "Billing & Invoicing",
    desc: "Fast billing, GST invoices, UPI, cards, cash & digital payments.",
    to: "/pos/cafe-restaurant",
  },
  {
    icon: RestaurantTableIcon,
    tag: "Restaurant",
    color: "green",
    title: "Orders & Table Management",
    desc: "Manage dine-in, takeaway, KOT, tables and restaurant orders easily.",
    to: "/pos/cafe-restaurant",
  },
  {
    icon: Invoice01Icon,
    tag: "Accounting",
    color: "indigo",
    title: "Invoicing & GST",
    desc: "Create professional invoices, manage GST and track every transaction.",
    to: "/accounting-software",
  },
  {
    icon: ChartBarLineIcon,
    tag: "Finance",
    color: "purple",
    title: "Expenses & Financial Reports",
    desc: "Track income, expenses, purchases and get clear financial insights.",
    to: "/accounting-software",
  },
  {
    icon: UserGroup03Icon,
    tag: "HR & Team",
    color: "pink",
    title: "Employee & Attendance",
    desc: "Manage employee profiles, attendance, shifts and working hours.",
    to: "/apps",
  },
  {
    icon: Wallet01Icon,
    tag: "Payroll",
    color: "orange",
    title: "Payroll & Leave Management",
    desc: "Automate salary processing, payslips, leave tracking and payroll records.",
    to: "/apps",
  },
  {
    icon: Hotel01Icon,
    tag: "Hospitality",
    color: "cyan",
    title: "Reservations & Guest Management",
    desc: "Manage room bookings, guest details, check-ins and check-outs.",
    to: "/apps",
  },
  {
    icon: BedSingle01Icon,
    tag: "Rooms",
    color: "blue",
    title: "Rooms & Billing",
    desc: "Track room availability, room status, services and guest billing.",
    to: "/apps",
  },
  {
    icon: Calendar01Icon,
    tag: "Appointments",
    color: "red",
    title: "Appointments & Customer Management",
    desc: "Manage bookings, customer profiles, services and appointment schedules.",
    to: "/apps",
  },
  {
    icon: CreditCardIcon,
    tag: "Operations",
    color: "green",
    title: "Billing & Staff Management",
    desc: "Handle billing, staff schedules, commissions and daily salon operations.",
    to: "/apps",
  },
  {
    icon: PackageIcon,
    tag: "Services",
    color: "indigo",
    title: "Service & Package Management",
    desc: "Create and manage services, packages, pricing, durations, and special offers with ease.",
    to: "/apps",
  },
  {
    icon: LoyaltyCardIcon,
    tag: "Loyalty",
    color: "pink",
    title: "Membership & Loyalty Management",
    desc: "Manage memberships, loyalty points, rewards, and repeat-customer benefits to increase retention.",
    to: "/apps",
  },
];

export default function PlatformFeatures() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full bg-ink-900/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-700">
          Complete Platform
        </span>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
          Everything Your Business Needs, Built In
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-700">
          Every tool a modern business needs — deeply integrated and ready to
          use from day one.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, tag, color, title, desc, to }) => {
          const c = colors[color];
          return (
            <div
              key={title}
              className="border border-ink-900/5 bg-white p-6"
              style={{ borderRadius: "20px" }}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg} ${c.text}`}
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${c.bg} ${c.text}`}
                >
                  {tag}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-ink-900">{title}</h3>
              <p className="mt-2 text-sm text-ink-500">{desc}</p>

              <Link
                to={to || "#"}
                className={`mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide ${c.text} hover:opacity-80`}
              >
                Learn more
                <ArrowRight02Icon size={14} strokeWidth={2.5} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
