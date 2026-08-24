import { ArrowRight01Icon } from "hugeicons-react";

export default function Hero() {
  return (
    <section className="px-4 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-1 text-3xl text-ink-900" style={{ fontFamily: "var(--font-hand)" }}>
          More than just scheduling
        </p>

        <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-ink-900 md:text-7xl">
          The platform behind great
          <br className="hidden md:block" /> restaurant teams
        </h1>

        <svg
          className="mx-auto mt-3 h-4 w-full max-w-xl text-accent-500"
          viewBox="0 0 646 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 12C120 4 300 2 400 6C480 9 560 13 644 8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-ink-700">
          7shifts gives operators clearer answers and faster
          workflows—with less tools.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-700"
          >
            Get Started
            <ArrowRight01Icon size={18} strokeWidth={2.5} />
          </a>
          <a
            href="#contact-us"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-7 py-3.5 text-base font-semibold text-ink-900 hover:bg-ink-900/5"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-5xl">
        <div
          className="flex aspect-video w-full items-center justify-center bg-ink-900/5 text-2xl font-semibold text-ink-500"
          style={{ borderRadius: "20px" }}
        >
          IMAGE
        </div>
      </div>
    </section>
  );
}
