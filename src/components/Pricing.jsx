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
    <section id="pricing">
      <div>
        <div>
          <h2>
            Our simple pricing plan
          </h2>
          <p>
            Choose the plan that fits your workflow and scale at your pace
          </p>
        </div>

        <div>
          <div>
            <button
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
            >
              Yearly
            </button>
          </div>
        </div>

        <div>
          {plans.map((plan) => (
            <div
              key={plan.name}
            >
              <h3>{plan.name}</h3>
              <p>{plan.desc}</p>

              <p>
                $ {(yearly ? plan.yearly : plan.monthly).toFixed(2)}
                <span> USD</span>
              </p>
              <p>
                {yearly ? "Yearly" : "Monthly"}
              </p>

              <a
                href="#"
              >
                {plan.cta}
                <ArrowRight02Icon size={16} />
              </a>

              <p>
                Added Features
              </p>
              <ul>
                {plan.features.map((f) => (
                  <li
                    key={f}
                  >
                    <CheckmarkCircle02Icon
                      size={16}
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
