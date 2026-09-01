import { Link } from "react-router-dom";
import {
  Calculator01Icon,
  ComputerIcon,
  QrCodeIcon,
  ChefHatIcon,
  UserGroupIcon,
  ChartBarLineIcon,
  CreditCardIcon,
  PackageIcon,
  Megaphone01Icon,
  QuoteUpIcon,
} from "hugeicons-react";

const heroStats = [
  { value: "+30%", label: "Table Turns" },
  { value: "-40%", label: "Kitchen Errors" },
  { value: "0", label: "Paper Tickets" },
  { value: "7 days", label: "Free Trial" },
];

const barStats = [
  { value: "500+", label: "Active Merchants" },
  { value: "30 min", label: "Average Setup Time" },
  { value: "100%", label: "Offline-Ready" },
  { value: "7 days", label: "Free Trial" },
];

const features = [
  {
    icon: ComputerIcon,
    title: "Smart Billing",
    desc: "Fast, accurate, tax-compliant bills. Print or share digitally in one tap.",
  },
  {
    icon: QrCodeIcon,
    title: "QR Table Ordering",
    desc: "Customers scan, order, and pay from their phone. No app needed.",
  },
  {
    icon: ChefHatIcon,
    title: "Kitchen Display (KDS)",
    desc: "Real-time order streaming to kitchen. Zero paper tickets, zero confusion.",
  },
  {
    icon: UserGroupIcon,
    title: "Customer Loyalty",
    desc: "Auto-reward with points. Digital promotions. Birthday offers.",
  },
  {
    icon: ChartBarLineIcon,
    title: "Live Analytics",
    desc: "Revenue, top dishes, peak hours — all tracked live on any device.",
  },
  {
    icon: CreditCardIcon,
    title: "All Payments",
    desc: "Cards, wallets, and every major payment processor — accepted.",
  },
  {
    icon: PackageIcon,
    title: "Inventory Control",
    desc: "Track ingredients, set low-stock alerts, reduce food waste.",
  },
  {
    icon: Megaphone01Icon,
    title: "Native Promotions",
    desc: "Build loyalty, send win-back offers, and run digital campaigns — all from your dashboard.",
  },
];

const steps = [
  {
    n: "01",
    title: "Sign Up Free",
    desc: "Create your account in 2 minutes. No credit card, no hardware purchase needed to start.",
  },
  {
    n: "02",
    title: "Add Your Menu",
    desc: "Upload your menu with photos, prices, and category tabs using our simple editor.",
  },
  {
    n: "03",
    title: "Set Up Tables & QR",
    desc: "Name your tables and print QR codes. Customers can order immediately from day one.",
  },
  {
    n: "04",
    title: "Go Live & Grow",
    desc: "Start billing, track live orders, and monitor revenue from the dashboard — anywhere, anytime.",
  },
];

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-ink-900/20" />
      <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
        {children}
      </span>
    </div>
  );
}

export default function AccountingSoftware() {
  return (
    <>
      <section className="px-4 pb-16 pt-16 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-600">
              <Calculator01Icon size={14} strokeWidth={2} />
              <span style={{ fontFamily: "var(--font-hand)", fontSize: "20px" }}>
                Restaurants & Cafe
              </span>
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
              The Complete POS
              <br />
              for <span className="text-brand-600">Restaurants & Cafes</span>
            </h1>

            <p className="mt-5 max-w-lg text-ink-700">
              From a standalone diner to a 50-table fine dining restaurant —
              7shifts POS handles billing, QR ordering, kitchen display,
              customer loyalty, and live analytics in one integrated
              platform.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <a
                href="#get-started"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Start 30-Days Free Trial
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-6 py-3.5 text-sm font-semibold text-ink-900 hover:bg-ink-900/5"
              >
                Book a Demo
              </a>
            </div>

            <Link
              to="/accounting-software/pricing"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              View Accounting Software pricing →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {heroStats.map(({ value, label }) => (
              <div
                key={label}
                className="border border-ink-900/5 bg-ink-900/[0.02] p-6"
                style={{ borderRadius: "20px" }}
              >
                <p className="text-3xl font-extrabold tracking-tight text-accent-500">
                  {value}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-ink-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div
          className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-8 bg-ink-900 px-10 py-10"
          style={{ borderRadius: "24px" }}
        >
          {barStats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-white">{value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/40">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Everything In One Platform</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            Built around the way your business actually runs.
          </h2>
          <p className="mt-3 max-w-xl text-ink-700">
            Every plan includes every feature — no upsell wall between you
            and the tools you need.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="border border-ink-900/5 bg-white p-6"
                style={{ borderRadius: "20px" }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{title}</h3>
                <p className="mt-2 text-sm text-ink-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-16">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-start">
          <div>
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
              Live in under thirty minutes.
            </h2>
            <p className="mt-3 text-ink-700">
              Our onboarding team walks you through it. You bill your first
              customer the same day.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {steps.map(({ n, title, desc }) => (
                <div key={n} className="flex items-start gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-50 text-sm font-bold text-brand-600"
                    style={{ borderRadius: "12px" }}
                  >
                    {n}
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{title}</p>
                    <p className="mt-0.5 text-sm text-ink-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="border border-ink-900/5 bg-white p-8"
            style={{ borderRadius: "20px" }}
          >
            <QuoteUpIcon size={24} strokeWidth={2} className="text-brand-600" />
            <p className="mt-4 text-lg font-semibold leading-snug text-ink-900">
              "We replaced our old POS and three separate systems with
              7shifts POS. Our kitchen errors dropped significantly and the
              QR ordering is a huge time-saver during rush hours."
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                R.
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink-900">
                  R.I.
                </span>
                <span className="block text-xs font-bold uppercase tracking-wide text-ink-500">
                  Restaurant Owner, Toronto
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
