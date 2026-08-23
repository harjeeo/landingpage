import { CheckmarkCircle02Icon, Target02Icon, UserGroupIcon } from "hugeicons-react";
import DashboardMockup from "./DashboardMockup";

const tabs = [
  { label: "Track & Schedule", icon: CheckmarkCircle02Icon, active: true },
  { label: "Territory Management", icon: Target02Icon },
  { label: "Lead Enrichment", icon: UserGroupIcon },
];

export default function SimpleTools() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto mb-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          Simple Tools. Powerful Results
        </h2>
        <p className="mt-3 text-sm text-ink-500">
          We are dedicated to harnessing the power of artificial intelligence to
          revolutionize sales
        </p>
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        {tabs.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition ${
              active
                ? "bg-brand-500 text-white shadow-sm shadow-brand-500/30"
                : "border border-ink-900/10 text-ink-700 hover:border-brand-300"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <DashboardMockup />
    </section>
  );
}
