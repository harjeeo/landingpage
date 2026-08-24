import { useState } from "react";
import {
  UserAdd01Icon,
  HelpCircleIcon,
  Calendar03Icon,
  Wallet01Icon,
  RepeatIcon,
  ArrowRight02Icon,
  Tick02Icon,
} from "hugeicons-react";

const tabs = [
  {
    key: "hire",
    label: "Hire",
    icon: UserAdd01Icon,
    heading: "Train",
    title: "Build consistent skills across roles",
    desc: "Standardize training across your team, from onboarding to ongoing development.",
    bullets: [
      "Turn existing docs into courses in seconds",
      "Auto-generate quizzes and acknowledgements",
      "Assign, track progress, remind automatically",
    ],
    cta: "Explore Training",
  },
  {
    key: "train",
    label: "Train",
    icon: HelpCircleIcon,
    heading: "Train",
    title: "Build consistent skills across roles",
    desc: "Standardize training across your team, from onboarding to ongoing development.",
    bullets: [
      "Turn existing docs into courses in seconds",
      "Auto-generate quizzes and acknowledgements",
      "Assign, track progress, remind automatically",
    ],
    cta: "Explore Training",
  },
  {
    key: "schedule",
    label: "Schedule",
    icon: Calendar03Icon,
    heading: "Train",
    title: "Build consistent skills across roles",
    desc: "Standardize training across your team, from onboarding to ongoing development.",
    bullets: [
      "Turn existing docs into courses in seconds",
      "Auto-generate quizzes and acknowledgements",
      "Assign, track progress, remind automatically",
    ],
    cta: "Explore Training",
  },
  {
    key: "pay",
    label: "Pay",
    icon: Wallet01Icon,
    heading: "Train",
    title: "Build consistent skills across roles",
    desc: "Standardize training across your team, from onboarding to ongoing development.",
    bullets: [
      "Turn existing docs into courses in seconds",
      "Auto-generate quizzes and acknowledgements",
      "Assign, track progress, remind automatically",
    ],
    cta: "Explore Training",
  },
  {
    key: "retain",
    label: "Retain",
    icon: RepeatIcon,
    heading: "Train",
    title: "Build consistent skills across roles",
    desc: "Standardize training across your team, from onboarding to ongoing development.",
    bullets: [
      "Turn existing docs into courses in seconds",
      "Auto-generate quizzes and acknowledgements",
      "Assign, track progress, remind automatically",
    ],
    cta: "Explore Training",
  },
];

export default function WorkSmarter() {
  const [activeKey, setActiveKey] = useState("train");
  const active = tabs.find((tab) => tab.key === activeKey);

  return (
    <section id="features" className="bg-[#eeece4] px-4 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
          Everything your team relies on, working together
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-ink-700">
          7shifts acts as the hub for the workflows behind your team, keeping
          key tasks connected in one place.
        </p>

        <a
          href="#get-started"
          className="mt-8 inline-flex items-center rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white hover:bg-brand-700"
        >
          Get my free trial
        </a>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-b border-ink-900/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.key === activeKey;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveKey(tab.key)}
                className={`flex items-center gap-2 border-b-2 pb-4 text-base font-semibold ${
                  isActive
                    ? "border-accent-500 text-ink-900"
                    : "border-transparent text-ink-500 hover:text-ink-900"
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="mx-auto mt-8 flex max-w-5xl flex-col overflow-hidden bg-white text-left md:flex-row"
        style={{ borderRadius: "20px" }}
      >
        <div className="flex aspect-square w-full items-center justify-center bg-ink-900/5 text-2xl font-semibold text-ink-500 md:w-1/2">
          IMAGE
        </div>

        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
          <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/5">
            <active.icon size={20} strokeWidth={2} className="text-accent-500" />
          </span>
          <p
            className="text-2xl text-ink-900"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            {active.heading}
          </p>
          <h3 className="mt-1 text-3xl font-extrabold tracking-tight text-ink-900">
            {active.title}
          </h3>
          <p className="mt-3 text-ink-700">{active.desc}</p>

          <ul className="mt-5 flex flex-col gap-3">
            {active.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-ink-900">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-900 text-white">
                  <Tick02Icon size={14} strokeWidth={3} />
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <a
            href="#explore"
            className="mt-6 inline-flex items-center gap-1 font-semibold text-ink-900 hover:text-brand-600"
          >
            {active.cta}
            <ArrowRight02Icon size={16} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
