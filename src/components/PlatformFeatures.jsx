import {
  ComputerIcon,
  QrCodeIcon,
  ChefHatIcon,
  PackageIcon,
  UserGroupIcon,
  ChartBarLineIcon,
  Sofa01Icon,
  GlobeIcon,
  Megaphone01Icon,
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
    icon: ComputerIcon,
    tag: "Core POS",
    color: "blue",
    title: "Billing & Invoicing",
    desc: "GST-compliant billing in under 3 seconds. UPI, cards, wallets, cash — all in one flow.",
  },
  {
    icon: QrCodeIcon,
    tag: "Self-Ordering",
    color: "green",
    title: "QR Menu & Ordering",
    desc: "Each table gets a unique QR. Customers scan, browse, order and pay — zero app install.",
  },
  {
    icon: ChefHatIcon,
    tag: "Kitchen",
    color: "red",
    title: "Kitchen Display (KDS)",
    desc: "Live KOT streaming to your kitchen screen. Eliminate paper tickets and missed orders.",
  },
  {
    icon: PackageIcon,
    tag: "Operations",
    color: "orange",
    title: "Inventory Management",
    desc: "Real-time stock, low-stock alerts, batch expiry tracking, multi-warehouse control.",
  },
  {
    icon: UserGroupIcon,
    tag: "Marketing",
    color: "pink",
    title: "CRM & Loyalty",
    desc: "Reward points, customer profiles, and visit tracking — automated. Bring customers back.",
  },
  {
    icon: ChartBarLineIcon,
    tag: "Reports",
    color: "purple",
    title: "Cloud Analytics",
    desc: "Sales trends, top dishes, staff performance, multi-outlet view — on any device.",
  },
  {
    icon: Sofa01Icon,
    tag: "Dine-In",
    color: "indigo",
    title: "Table Seating & Layouts",
    desc: "Design interactive layouts, track real-time occupancy status, reservations, and coordinate waitstaff.",
  },
  {
    icon: GlobeIcon,
    tag: "Online",
    color: "cyan",
    title: "eStore & Online Orders",
    desc: "Your branded online store. Accept from your website, or integrate aggregators via webhooks.",
  },
  {
    icon: Megaphone01Icon,
    tag: "Marketing",
    color: "green",
    title: "Native Promotions",
    desc: "Digital loyalty wallets, internal push offers, and targeted customer segmentation.",
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

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
        {features.map(({ icon: Icon, tag, color, title, desc }) => {
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

              <a
                href="#"
                className={`mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide ${c.text} hover:opacity-80`}
              >
                Learn more
                <ArrowRight02Icon size={14} strokeWidth={2.5} />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
