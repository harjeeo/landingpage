import {
  SparklesIcon,
  ChefHatIcon,
  Hotel01Icon,
  ShoppingCart01Icon,
  Mortarboard01Icon,
  ScissorIcon,
  Briefcase01Icon,
  ArrowRight02Icon,
} from "hugeicons-react";

const colors = {
  orange: { bg: "bg-amber-50", text: "text-amber-600", tag: "bg-amber-50 text-amber-600" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", tag: "bg-blue-50 text-blue-600" },
  green: { bg: "bg-emerald-50", text: "text-emerald-600", tag: "bg-emerald-50 text-emerald-600" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", tag: "bg-indigo-50 text-indigo-600" },
  pink: { bg: "bg-pink-50", text: "text-pink-600", tag: "bg-pink-50 text-pink-600" },
  purple: { bg: "bg-violet-50", text: "text-violet-600", tag: "bg-violet-50 text-violet-600" },
};

const industries = [
  {
    icon: ChefHatIcon,
    color: "orange",
    title: "Cafes & Restaurants",
    subtitle: "FINE DINE, CASUAL, CAFES, BARS",
    desc: "Build schedules around split shifts, table-service surges, and last-minute call-outs — with labor cost tracking built in.",
    tags: ["Fine Dine", "Casual Dine", "Cafes", "Bars"],
  },
  {
    icon: Hotel01Icon,
    color: "blue",
    title: "Hotels & Hospitality",
    subtitle: "FRONT DESK, HOUSEKEEPING, F&B",
    desc: "Coordinate front desk, housekeeping, and food & beverage teams on one schedule, across every shift.",
    tags: ["Front Desk", "Housekeeping", "F&B", "Events"],
  },
  {
    icon: ShoppingCart01Icon,
    color: "green",
    title: "Grocery & Retail",
    subtitle: "SUPERMARKETS, CONVENIENCE",
    desc: "Schedule checkout, stocking, and floor staff around peak footfall, with instant shift swaps.",
    tags: ["Supermarkets", "Convenience", "Bakeries"],
  },
  {
    icon: Mortarboard01Icon,
    color: "indigo",
    title: "Schools & Campus Dining",
    subtitle: "CAFETERIAS, CATERING",
    desc: "Keep cafeteria and catering staff scheduled around term time, events, and seasonal demand.",
    tags: ["Cafeterias", "Catering", "Campus"],
  },
  {
    icon: ScissorIcon,
    color: "pink",
    title: "Salons & Parlor",
    subtitle: "STYLISTS, THERAPISTS",
    desc: "Match stylist and therapist schedules to booked appointments, automatically.",
    tags: ["Salons", "Spas", "Barbershops"],
  },
  {
    icon: Briefcase01Icon,
    color: "purple",
    title: "Agencies",
    subtitle: "STAFFING, EVENTS",
    desc: "Deploy and schedule staff across multiple client sites from a single dashboard.",
    tags: ["Staffing", "Events", "Multi-site"],
  },
];

const trustStats = [
  { label: "Setup Time", value: "Under 30 min" },
  { label: "Availability", value: "Always on" },
  { label: "Support", value: "Phone + chat" },
];

function SectionLabel({ children, hand }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-ink-900/20" />
      <span
        className={hand ? "text-lg text-ink-700" : "text-xs font-bold uppercase tracking-wide text-ink-500"}
        style={hand ? { fontFamily: "var(--font-hand)" } : undefined}
      >
        {children}
      </span>
    </div>
  );
}

export default function AllApps() {
  return (
    <>
      <section className="px-4 pb-10 pt-16 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-600">
            <SparklesIcon size={14} strokeWidth={2} />
            <span style={{ fontFamily: "var(--font-hand)", fontSize: "20px" }}>
              All Apps
            </span>
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
            One team.
            <br />
            <span className="italic text-brand-600">Every tool you need.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-ink-700">
            Scheduling, time clocking, payroll, and more — connected apps,
            one 7shifts account.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionLabel hand>Pick Your Industry</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            Six industries. One unified platform.
          </h2>
          <p className="mt-3 max-w-xl text-ink-700">
            Click into the industry closest to yours — same 7shifts, but
            every default is set for how that business actually operates.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {industries.map(({ icon: Icon, color, title, subtitle, desc, tags }) => {
              const c = colors[color];
              return (
                <a
                  key={title}
                  href="#"
                  className="border border-ink-900/5 bg-white p-6"
                  style={{ borderRadius: "20px" }}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.bg} ${c.text}`}
                    >
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <ArrowRight02Icon size={18} strokeWidth={2} className="text-ink-400" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-ink-900">{title}</h3>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink-500">
                    {subtitle}
                  </p>
                  <p className="mt-3 border-t border-ink-900/5 pt-3 text-sm text-ink-500">
                    {desc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${c.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>What Stays The Same</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            Same 7shifts. Same uptime. Same support team.
          </h2>
          <p className="mt-3 max-w-xl text-ink-700">
            The workflow defaults change per industry, but every customer
            gets the same product underneath — same offline mode, same
            multi-location sync, same human support team.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {trustStats.map(({ label, value }) => (
              <div
                key={label}
                className="border border-ink-900/5 bg-ink-900/[0.02] p-5"
                style={{ borderRadius: "16px" }}
              >
                <p className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  {label}
                </p>
                <p className="mt-1 text-lg font-bold text-ink-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
