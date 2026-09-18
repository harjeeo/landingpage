import { Link } from "react-router-dom";
import {
  Calculator01Icon,
  ComputerIcon,
  Invoice01Icon,
  PackageIcon,
  PrinterIcon,
  UserGroupIcon,
  ChartBarLineIcon,
  Building02Icon,
  Shield01Icon,
  QuoteUpIcon,
} from "hugeicons-react";

const barStats = [
  { value: "500+", label: "Active Merchants" },
  { value: "30 min", label: "Average Setup Time" },
  { value: "100%", label: "Offline-Ready" },
  { value: "30 days", label: "Free Trial" },
];

const features = [
  {
    icon: ComputerIcon,
    title: "Smart Billing",
    desc: "Barcode scan se instant billing, sab payment modes support. Cash, Card, UPI ya Credit — har tarah se bill banao.",
  },
  {
    icon: Invoice01Icon,
    title: "GST-Ready Invoices",
    desc: "Professional invoices with your logo aur custom branding. Estimates, Sales Orders, Delivery Challans bhi ek click mein.",
  },
  {
    icon: PackageIcon,
    title: "Inventory Control",
    desc: "Real-time stock tracking, low-stock alerts automatically milein. Multi-warehouse aur multi-branch support ek hi dashboard se.",
  },
  {
    icon: PrinterIcon,
    title: "Thermal Receipt Printing",
    desc: "58mm aur 80mm dono printer sizes fully supported. Fast checkout, clean aur professional receipts har baar.",
  },
  {
    icon: UserGroupIcon,
    title: "Customer Ledger",
    desc: "Udhaar/credit tracking apne customers ka easily manage karo. Purchase history aur loyalty points bhi track ho jaye.",
  },
  {
    icon: Calculator01Icon,
    title: "Automated Accounting",
    desc: "Ledgers automatically update, bank reconciliation ho jaye smooth. GST reports aur payables/receivables ek jagah dikhein.",
  },
  {
    icon: ChartBarLineIcon,
    title: "Business Insights",
    desc: "Sales aur stock reports real-time dashboard pe milte hain. Aging reports se receivables/payables ka status clear rahe.",
  },
  {
    icon: Building02Icon,
    title: "Multi-Branch Management",
    desc: "Cloud-based system — kahin se bhi access karo, kabhi bhi. Multiple branches ek hi account se control karo easily.",
  },
  {
    icon: Shield01Icon,
    title: "Role-Based Access",
    desc: "Admin, Manager, Staff ke liye alag-alag permissions set karo. Data secure rahe, har user apna kaam hi dekhe.",
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
    title: "Add Your Products",
    desc: "Upload your inventory with photos, prices, and categories using our simple editor.",
  },
  {
    n: "03",
    title: "Set Up Billing & GST",
    desc: "Add your business details, GST number, and printer. Start billing from day one.",
  },
  {
    n: "04",
    title: "Go Live & Grow",
    desc: "Start billing, track stock live, and monitor sales from the dashboard — anywhere, anytime.",
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
                Counter POS
              </span>
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
              Aapki Dukaan,
              <br />
              <span className="text-brand-600">Ab Aur Smart.</span>
            </h1>

            <p className="mt-5 max-w-lg text-ink-700">
              Fast billing, real-time inventory, and customer management — all in one smart POS. Make your business digital, organised, and easy to manage with Counter POS.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Start 30-Days Free Trial
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-6 py-3.5 text-sm font-semibold text-ink-900 hover:bg-ink-900/5"
              >
                Book a Demo
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <img
              src="/images/counter-pos.png"
              alt="Counter POS System for Grocery, Retail and Clothing Stores"
              className="w-full h-auto max-h-[520px] object-contain"
            />
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
              Our setup team walks you through it. Bill your first
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
              "We replaced our old khata system and manual billing with Counter POS. GST invoicing ho gaya bilkul hassle-free, aur stock tracking ne humara bahut time bacha diya during peak hours."
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                R.
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink-900">
                  R. Sharma
                </span>
                <span className="block text-xs font-bold uppercase tracking-wide text-ink-500">
                  Rama Supermart
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
