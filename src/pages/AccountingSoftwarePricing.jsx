import { FlashIcon, RocketIcon, Building02Icon } from "hugeicons-react";
import PricingSections from "../components/PricingSections";

const plans = [
  {
    key: "starter",
    icon: FlashIcon,
    name: "Starter",
    desc: "For sole proprietors and small businesses tracking the basics.",
    price: "19",
    note: "per month, billed annually",
    save: "Save ₹45/yr",
    features: [
      "1 business profile",
      "Invoicing & billing",
      "Expense tracking",
      "Bank account sync",
      "Up to 3 concurrent devices",
      "Email & chat support",
    ],
    cta: "Start Free Trial",
    footnote: "No credit card required",
    dark: false,
  },
  {
    key: "growth",
    icon: RocketIcon,
    name: "Growth",
    badge: "Most Popular",
    desc: "For growing businesses that need full financial visibility.",
    price: "45",
    note: "per month, billed annually",
    save: "Save ₹108/yr",
    everythingIn: "Everything in Starter, plus:",
    features: [
      "Up to 5 business profiles",
      "Tax reports & filing prep",
      "Payroll sync",
      "Multi-currency support",
      "Custom financial dashboards",
      "Unlimited devices",
      "Priority 24/7 support",
    ],
    cta: "Start Free Trial",
    footnote: "No credit card required",
    dark: true,
  },
  {
    key: "enterprise",
    icon: Building02Icon,
    name: "Enterprise",
    desc: "For accounting firms and multi-entity organizations.",
    price: "Custom",
    everythingIn: "Everything in Growth, plus:",
    features: [
      "Unlimited business profiles",
      "Consolidated multi-entity reporting",
      "Custom API & integrations",
      "White-label client portal",
      "Dedicated onboarding & training",
      "99.9% uptime SLA",
    ],
    cta: "Contact Sales",
    footnote: "Tailored quote within 24 hours",
    dark: false,
  },
];

export default function AccountingSoftwarePricing() {
  return (
    <PricingSections
      badge="Accounting Software"
      heading1="Accounting pricing that"
      heading2="stays out of your way."
      subtitle={
        <>
          Start with a <span className="font-semibold text-ink-900">7-day free trial</span> —
          no credit card, no commitment. Cancel any time.
        </>
      }
      plans={plans}
      trialTitle="Your 7-Day Free Trial"
      trialDesc="Experience the full Accounting Software — invoicing, expense tracking, tax reports, and more — completely free for 7 days."
    />
  );
}
