import { useState } from "react";
import { CheckmarkCircle02Icon, ArrowRight02Icon } from "hugeicons-react";

const plans = [
  {
    name: "Free Plan",
    desc: "For developers getting started",
    monthly: 0,
    yearly: 0,
    cta: "Get Started Now",
    features: [
      "Transparent Pricing Structure",
      "Customization and Add-Ons",
      "Flexible Plans for Every Team Size",
    ],
  },
  {
    name: "Starter Plan",
    desc: "For developers getting started",
    monthly: 29,
    yearly: 290,
    cta: "Get Started Now",
    highlight: true,
    features: [
      "Transparent Pricing Structure",
      "Customization and Add-Ons",
      "Flexible Plans for Every Team Size",
      "Dedicated Support and Training",
      "Money-Back Guarantee",
    ],
  },
  {
    name: "Organization Plan",
    desc: "For developers getting started",
    monthly: 59,
    yearly: 590,
    cta: "Get Started Now",
    features: [
      "Transparent Pricing Structure",
      "Customization and Add-Ons",
      "Flexible Plans for Every Team Size",
      "Dedicated Support and Training",
      "Free Trial Option",
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Our simple pricing plan
          </h2>
          <p className="mt-3 text-sm text-ink-500">
            Choose the plan that fits your workflow and scale at your pace
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-ink-900/10 bg-white p-1 text-xs font-medium">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-2 transition ${
                !yearly ? "bg-brand-500 text-white" : "text-ink-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-4 py-2 transition ${
                yearly ? "bg-brand-500 text-white" : "text-ink-500"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-7 ${
                plan.highlight
                  ? "border-brand-500 bg-white shadow-xl shadow-brand-500/10"
                  : "border-ink-900/5 bg-white"
              }`}
            >
              <h3 className="text-sm font-semibold text-ink-900">{plan.name}</h3>
              <p className="mt-1 text-xs text-ink-500">{plan.desc}</p>

              <p className="mt-6 text-3xl font-bold text-ink-900">
                $ {(yearly ? plan.yearly : plan.monthly).toFixed(2)}
                <span className="text-sm font-medium text-ink-400"> USD</span>
              </p>
              <p className="text-xs text-ink-400">
                {yearly ? "Yearly" : "Monthly"}
              </p>

              <a
                href="#"
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.highlight
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/30 hover:bg-brand-600"
                    : "border border-ink-900/10 text-ink-900 hover:border-brand-300"
                }`}
              >
                {plan.cta}
                <ArrowRight02Icon size={16} />
              </a>

              <p className="mt-7 mb-3 text-xs font-semibold text-ink-900">
                Added Features
              </p>
              <ul className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs text-ink-500"
                  >
                    <CheckmarkCircle02Icon
                      size={16}
                      className="mt-0.5 shrink-0 text-brand-500"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
