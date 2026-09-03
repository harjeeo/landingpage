import { useState } from "react";
import {
  SparklesIcon,
  FlashIcon,
  RocketIcon,
  Building02Icon,
  StarIcon,
  Tick02Icon,
  ArrowRight02Icon,
} from "hugeicons-react";

const plans = [
  {
    key: "starter",
    icon: FlashIcon,
    name: "Starter",
    desc: "Essential tools to manage your daily business operations with ease.",
    price: "399",
    note: "per month, billed annually",
    save: "Save ₹70/yr",
    features: [
      "Cafe/Restaurant POS",
      "Accounting Software",
      "HR Management System",
      "Invoicing & Billing",
      "GST & Tax Management",
      "Expense Management",
      "Cloud Based",
      "Access Anywhere",
      "Multiple Logins",
      "24/7 Support",
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
    desc: "Advanced tools and automation to streamline operations, improve efficiency, and grow your business faster.",
    price: "599",
    note: "per month, billed annually",
    save: "Save ₹140/yr",
    everythingIn: "Everything in Starter, plus:",
    features: [
      "School Management System",
      "Campus ERP",
      "Hotel Management System",
      "Salon Management Software",
      "Invoicing & Billing",
      "GST & Tax Management",
      "Expense Management",
      "Cloud Based",
      "Access Anywhere",
      "Multiple Logins",
      "Advanced Reports",
      "24/7 Support",
    ],
    cta: "Start Free Trial",
    footnote: "No credit card required",
    dark: true,
  },
  {
    key: "enterprise",
    icon: Building02Icon,
    name: "Enterprise",
    desc: "For hotel chains, restaurant groups & franchises. Need a custom ERP or Management System? Get a solution tailored specifically to your unique business requirements.",
    price: "Custom",
    everythingIn: "Everything in Growth, plus:",
    features: [
      "Unlimited Locations & Branches",
      "Centralized Multi-Branch Management",
      "Advanced Business Analytics & Reports",
      "Custom API & Third-Party Integrations",
      "Custom ERP / Management Modules",
      "Dedicated Onboarding & Training",
      "Priority Support & Assistance",
      "Advanced Security & Data Backup",
      "Scalable Cloud Infrastructure",
    ],
    cta: "Contact Sales",
    footnote: "Tailored quote within 24 hours",
    dark: false,
  },
];

const trialItems = [
  {
    title: "Full Premium Access",
    desc: "Every feature unlocked from day one — scheduling, time clocking, payroll, messaging, and more.",
  },
  {
    title: "No Credit Card Required",
    desc: "Start your trial instantly — no payment details needed until you decide to subscribe.",
  },
  {
    title: "Zero Risk, Cancel Anytime",
    desc: "Not the right fit? Cancel from your account settings before the trial ends. No charge.",
  },
  {
    title: "Seamless Transition",
    desc: "If you love it, your chosen plan activates automatically after 7 days at the listed price.",
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState("annual");

  return (
    <>
      <section className="px-4 pb-10 pt-16 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-600">
            <SparklesIcon size={14} strokeWidth={2} />
            <span style={{ fontFamily: "var(--font-hand)", fontSize: "20px" }}>
              Simple &amp; Honest Pricing
            </span>
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
            One subscription.
            <br />
            <span className="italic text-brand-600">Every feature.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-ink-700">
            Start with a <span className="font-semibold text-ink-900">7-day free trial</span> —
            no credit card, no commitment. Cancel any time.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto flex max-w-md items-center justify-center rounded-full bg-ink-900/5 p-1 text-sm font-semibold">
          <button
            onClick={() => setBilling("monthly")}
            className={`flex-1 rounded-full px-5 py-2 ${
              billing === "monthly"
                ? "bg-white text-ink-900 shadow"
                : "text-ink-500"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2 ${
              billing === "annual"
                ? "bg-white text-ink-900 shadow"
                : "text-ink-500"
            }`}
          >
            Annual
            <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[11px] font-bold text-white">
              SAVE 20%
            </span>
          </button>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3 md:items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const cardBg = plan.dark ? "bg-ink-900" : "bg-white";
            const textPrimary = plan.dark ? "text-white" : "text-ink-900";
            const textMuted = plan.dark ? "text-white/60" : "text-ink-500";
            const iconTint = plan.dark
              ? "bg-white/10 text-white"
              : "bg-brand-50 text-brand-600";

            return (
              <div
                key={plan.key}
                className={`relative flex flex-col border p-8 ${cardBg} ${
                  plan.dark ? "border-transparent" : "border-ink-900/5"
                }`}
                style={{ borderRadius: "20px" }}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
                    <StarIcon size={12} strokeWidth={0} fill="currentColor" />
                    {plan.badge}
                  </span>
                )}

                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${iconTint}`}
                >
                  <Icon size={14} strokeWidth={2} />
                  {plan.name}
                </span>
                <p className={`mt-3 text-sm ${textMuted}`}>{plan.desc}</p>

                <div className="mt-6">
                  {plan.price === "Custom" ? (
                    <p className={`text-4xl font-extrabold ${textPrimary}`}>Custom</p>
                  ) : (
                    <p className={`text-4xl font-extrabold ${textPrimary}`}>
                      ₹{billing === "annual" ? plan.price : Math.ceil(plan.price * 1.25)}
                    </p>
                  )}
                  {plan.note && (
                    <p className={`mt-1 text-sm ${textMuted}`}>{plan.note}</p>
                  )}
                  {plan.save && billing === "annual" && (
                    <p className="mt-0.5 text-sm font-semibold text-emerald-500">
                      {plan.save}
                    </p>
                  )}
                </div>

                <div className={`my-6 h-px ${plan.dark ? "bg-white/10" : "bg-ink-900/5"}`} />

                {plan.everythingIn && (
                  <p className={`mb-3 text-xs font-bold uppercase tracking-wide ${textMuted}`}>
                    {plan.everythingIn}
                  </p>
                )}

                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${textPrimary}`}>
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          plan.dark ? "bg-white text-ink-900" : "bg-ink-900 text-white"
                        }`}
                      >
                        <Tick02Icon size={10} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.key === "enterprise" ? "#contact-us" : "#get-started"}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold ${
                    plan.dark
                      ? "bg-white text-ink-900 hover:bg-white/90"
                      : plan.key === "enterprise"
                        ? "bg-ink-900/5 text-ink-900 hover:bg-ink-900/10"
                        : "bg-brand-600 text-white hover:bg-brand-700"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight02Icon size={16} strokeWidth={2.5} />
                </a>
                <p className={`mt-3 text-center text-xs ${textMuted}`}>{plan.footnote}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-24">
        <div
          className="mx-auto max-w-4xl border border-emerald-100 bg-emerald-50/60 p-8 md:p-10"
          style={{ borderRadius: "20px" }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <SparklesIcon size={20} strokeWidth={2} />
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
              Your 7-Day Free Trial
            </h2>
          </div>

          <p className="mt-4 max-w-2xl text-ink-700">
            Experience everything 7shifts has to offer — completely free for
            7 days. No strings attached, no surprises.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {trialItems.map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Tick02Icon size={12} strokeWidth={3} />
                </span>
                <div>
                  <p className="font-semibold text-ink-900">{title}</p>
                  <p className="mt-0.5 text-sm text-ink-700">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-emerald-100 pt-6 text-sm text-ink-700">
            <span className="font-semibold text-ink-900">How it works: </span>
            Sign up, choose a plan, and start scheduling. Subscriptions are
            managed through your account billing settings. Cancel anytime
            before the trial ends and you won't be charged.
          </div>
        </div>
      </section>
    </>
  );
}
