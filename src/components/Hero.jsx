import { Tick02Icon, ArrowRight02Icon, StarIcon } from "hugeicons-react";
import DemoRequestForm from "./DemoRequestForm";

const checklist = [
  "Smart billing & business management",
  "Accounting, expenses & financial tracking",
  "HR, attendance & payroll management",
  "Inventory, customers & daily operations",
  "Real-time reports & business insights",
  "Cloud-based access from anywhere",
];

export default function Hero() {
  return (
    <section className="px-4 pt-16 pb-20 md:pt-20 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            Built for Modern Businesses
          </span>

          <p
            className="mt-4 text-3xl text-ink-900"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            More than just billing
          </p>

          <h1 className="mt-1 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink-900 md:text-6xl">
            Everything your business needs, all in{" "}
            <span className="text-brand-600">one powerful platform</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg font-medium text-ink-700">
            Manage your business with smarter tools for seamless operations,
            automated workflows, and better business insights — all in one
            powerful platform.
          </p>

          <ul className="mt-6 grid max-w-lg grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-2 text-ink-900">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Tick02Icon size={12} strokeWidth={3} />
                </span>
                <span className="text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-700"
            >
              Get Started
              <ArrowRight02Icon size={18} strokeWidth={2.5} />
            </a>
            <a
              href="#contact-us"
              className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-7 py-3.5 text-base font-semibold text-ink-900 hover:bg-ink-900/5"
            >
              Contact Us
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white bg-ink-900/10"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-900">
                500+ businesses trust Ojar
              </p>
              <div className="flex items-center gap-0.5 text-accent-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} size={14} strokeWidth={0} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <DemoRequestForm />
      </div>
    </section>
  );
}
