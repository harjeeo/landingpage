import { useState } from "react";
import { HelpCircleIcon, Add01Icon, Remove01Icon } from "hugeicons-react";

const faqs = [
  {
    q: "What software solutions do you offer?",
    a: "We offer Cafe/Restaurant POS, Accounting Software, HR Management System, Hotel Management System, and Salon Management Software designed to simplify and automate daily business operations.",
  },
  {
    q: "Is the software cloud-based?",
    a: "Yes. Our cloud-based solutions can be accessed anytime, anywhere, from any device with an internet connection.",
  },
  {
    q: "Can I manage multiple users or branches?",
    a: "Yes. Depending on your selected plan, you can add multiple users and manage multiple branches or locations from a centralized system.",
  },
  {
    q: "Is my business data secure?",
    a: "Yes. We use security measures such as secure authentication, role-based access, encrypted data transmission, backups, and access controls to help protect your data.",
  },
  {
    q: "Can you customize the software according to my business?",
    a: "Yes. We can develop custom ERP and Management Systems tailored to your specific business requirements, workflows, and integrations.",
  },
  {
    q: "Do you provide support after purchase?",
    a: "Yes. We provide technical support and assistance to help you with software setup, usage, troubleshooting, and other service-related queries.",
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
