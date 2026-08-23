import { useState } from "react";
import { PlusSignIcon, MinusSignIcon } from "hugeicons-react";

const faqs = [
  { q: "Is my data safe on Alterx?", a: "Yes. We use industry-standard encryption in transit and at rest, and never share your data with third parties." },
  { q: "How do I get started?", a: "Sign up for a free account, connect your team, and you'll be tracking deals within minutes." },
  { q: "Does it work with my CRM?", a: "Alterx integrates with all the major CRMs and offers a flexible API for custom workflows." },
  { q: "Can I track sales goals?", a: "Yes, set individual and team goals and track progress in real-time from the analytics dashboard." },
];

function FaqItem({ q, a, open, onClick }) {
  return (
    <div className="border-b border-ink-900/10 py-5">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-ink-900">{q}</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-ink-700">
          {open ? <MinusSignIcon size={14} /> : <PlusSignIcon size={14} />}
        </span>
      </button>
      {open && <p className="mt-3 text-xs leading-relaxed text-ink-500">{a}</p>}
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
            ✦ FAQ
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            AI that moves sales forward &amp; faster
          </h2>
          <p className="mt-3 max-w-sm text-sm text-ink-500">
            Businesses choose Alterx because it simplifies the complexity of
            sales management
          </p>
        </div>

        <div>
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
