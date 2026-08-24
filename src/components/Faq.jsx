import { useState } from "react";
import { HelpCircleIcon, Add01Icon, Remove01Icon } from "hugeicons-react";

const faqs = [
  {
    q: "What is 7shifts?",
    a: "7shifts is a team management platform built for restaurants, covering scheduling, time tracking, payroll, and communication in one place.",
  },
  {
    q: "Is 7shifts free?",
    a: "7shifts offers a free plan for small teams, plus paid plans with more advanced features as your team grows.",
  },
  {
    q: "Does 7shifts work for independent restaurants? How about franchisees?",
    a: "Yes. 7shifts is built to work for single-location independents as well as multi-unit franchise groups.",
  },
  {
    q: "Will I be locked into a contract?",
    a: "No, most 7shifts plans are month-to-month with no long-term contract required.",
  },
  {
    q: "Can I trial 7shifts?",
    a: "Yes, you can start a free trial to explore the platform before committing to a paid plan.",
  },
  {
    q: "Will it be easy for team members to use?",
    a: "Yes, employees can view schedules, swap shifts, and clock in from the 7shifts mobile app with a simple, intuitive interface.",
  },
  {
    q: "What can managers and employees do with the free restaurant scheduling app?",
    a: "Managers can build and publish schedules, while employees can view shifts, request time off, and swap shifts—all from the free app.",
  },
];

function FaqItem({ q, a, open, onClick }) {
  return (
    <div className="bg-ink-900/5" style={{ borderRadius: "16px" }}>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-lg font-semibold text-ink-900">{q}</span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center text-ink-900">
          {open ? <Remove01Icon size={20} strokeWidth={2} /> : <Add01Icon size={20} strokeWidth={2} />}
        </span>
      </button>
      {open && <p className="px-6 pb-5 text-ink-700">{a}</p>}
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq" className="px-4 py-20">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-accent-500">
            <HelpCircleIcon size={22} strokeWidth={2} />
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              open={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
