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
    <div>
      <button
        onClick={onClick}
      >
        <span>{q}</span>
        <span>
          {open ? <MinusSignIcon size={14} /> : <PlusSignIcon size={14} />}
        </span>
      </button>
      {open && <p>{a}</p>}
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq">
      <div>
        <div>
          <span>
            ✦ FAQ
          </span>
          <h2>
            AI that moves sales forward &amp; faster
          </h2>
          <p>
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
