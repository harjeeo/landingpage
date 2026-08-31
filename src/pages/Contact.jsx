import {
  SparklesIcon,
  Call02Icon,
  Mail01Icon,
  Location01Icon,
  FlashIcon,
  Shield01Icon,
} from "hugeicons-react";
import DemoRequestForm from "../components/DemoRequestForm";

const contactCards = [
  {
    icon: Call02Icon,
    label: "Sales",
    value: "+1 (800) 555-0173",
    note: "Mon–Fri 9am–6pm ET",
  },
  {
    icon: Call02Icon,
    label: "Support",
    value: "+1 (800) 555-0199",
    note: "24/7 for paid plans",
  },
  {
    icon: Mail01Icon,
    label: "Email Sales",
    value: "sales@7shifts.com",
    note: "Reply within 2 hours",
  },
  {
    icon: Location01Icon,
    label: "Head Office",
    value: "Toronto, Canada",
    note: "7shifts Inc.",
  },
];

const messagePerks = [
  {
    icon: FlashIcon,
    title: "7-Day Free Trial Available",
    desc: "Start with full access — no credit card, no commitment.",
  },
  {
    icon: Call02Icon,
    title: "Live Demo Available",
    desc: "Book a 30-minute personalized demo with a product specialist.",
  },
  {
    icon: Shield01Icon,
    title: "Free Setup Assistance",
    desc: "Our onboarding team helps you set up and go live for free.",
  },
];

export default function Contact() {
  return (
    <>
      <section className="px-4 pb-10 pt-16 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-600">
            <SparklesIcon size={14} strokeWidth={2} />
            <span style={{ fontFamily: "var(--font-hand)", fontSize: "20px" }}>
              We'd Love to Hear From You
            </span>
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
            Let's talk about
            <br />
            <span className="italic text-brand-600">your restaurant.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-ink-700">
            Questions about pricing, a demo, or just want to say hi? Our team
            is ready to help.
          </p>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map(({ icon: Icon, label, value, note }) => (
            <div
              key={label}
              className="flex items-start gap-3 border border-ink-900/5 bg-ink-900/[0.02] p-5"
              style={{ borderRadius: "16px" }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Icon size={18} strokeWidth={2} />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wide text-ink-500">
                  {label}
                </span>
                <span className="block text-sm font-semibold text-ink-900">
                  {value}
                </span>
                <span className="mt-0.5 block text-xs text-ink-500">{note}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 pt-10">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
              Send a Message
            </h2>
            <p className="mt-3 max-w-md text-ink-700">
              Fill in the form and our team will get back to you within 2
              business hours with a personalized response.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {messagePerks.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 border border-ink-900/5 bg-ink-900/[0.02] p-4"
                  style={{ borderRadius: "16px" }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink-900">
                      {title}
                    </span>
                    <span className="mt-0.5 block text-sm text-ink-500">
                      {desc}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <DemoRequestForm />
        </div>
      </section>
    </>
  );
}
