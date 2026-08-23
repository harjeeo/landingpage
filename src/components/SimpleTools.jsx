import { CheckmarkCircle02Icon, Target02Icon, UserGroupIcon } from "hugeicons-react";
import DashboardMockup from "./DashboardMockup";

const tabs = [
  { label: "Track & Schedule", icon: CheckmarkCircle02Icon, active: true },
  { label: "Territory Management", icon: Target02Icon },
  { label: "Lead Enrichment", icon: UserGroupIcon },
];

export default function SimpleTools() {
  return (
    <section>
      <div>
        <h2>
          Simple Tools. Powerful Results
        </h2>
        <p>
          We are dedicated to harnessing the power of artificial intelligence to
          revolutionize sales
        </p>
      </div>

      <div>
        {tabs.map(({ label, icon: Icon }) => (
          <button
            key={label}
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
