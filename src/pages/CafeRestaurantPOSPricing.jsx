import { FlashIcon, RocketIcon, Building02Icon } from "hugeicons-react";
import PricingSections from "../components/PricingSections";

const plans = [
  {
    key: "starter",
    icon: FlashIcon,
    name: "Starter",
    desc: "For a single counter or a small cafe just getting set up.",
    price: "15",
    note: "per month, billed annually",
    save: "Save ₹36/yr",
    features: [
      "1 outlet maximum",
      "Billing & invoicing",
      "QR table ordering",
      "Basic inventory tracking",
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
    desc: "For restaurants and cafes ready to run everything from one system.",
    price: "35",
    note: "per month, billed annually",
    save: "Save ₹84/yr",
    everythingIn: "Everything in Starter, plus:",
    features: [
      "Up to 5 outlets",
      "Kitchen Display (KDS)",
      "Customer loyalty & promotions",
      "Live sales analytics",
      "All payment methods accepted",
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
    desc: "For multi-location restaurant groups and franchises.",
    price: "Custom",
    everythingIn: "Everything in Growth, plus:",
    features: [
      "Unlimited outlets",
      "Centralized multi-outlet analytics",
      "Custom API & integrations",
      "White-label branding",
      "Dedicated onboarding & training",
      "99.9% uptime SLA",
    ],
    cta: "Contact Sales",
    footnote: "Tailored quote within 24 hours",
    dark: false,
  },
];

export default function CafeRestaurantPOSPricing() {
  return (
    <PricingSections
      badge="Restaurants & Cafe"
      heading1="POS pricing that"
      heading2="scales with your outlets."
      subtitle={
        <>
          Start with a <span className="font-semibold text-ink-900">7-day free trial</span> —
          no credit card, no commitment. Cancel any time.
        </>
      }
      plans={plans}
      trialTitle="Your 7-Day Free Trial"
      trialDesc="Experience the full Cafe & Restaurant POS — billing, QR ordering, kitchen display, and more — completely free for 7 days."
    />
  );
}
