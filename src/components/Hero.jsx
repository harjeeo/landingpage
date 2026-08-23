import { SparklesIcon, ArrowRight02Icon, PlayIcon } from "hugeicons-react";
import DashboardMockup from "./DashboardMockup";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(52,102,255,0.35) 0%, rgba(52,102,255,0.08) 45%, rgba(255,255,255,0) 75%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="mx-auto mb-5 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-medium text-brand-600 shadow-sm">
          <SparklesIcon size={14} />
          Join 5000+ growing businesses
        </span>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
          Smarter Solutions for
          <br className="hidden sm:block" /> Better Sales Outcomes
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base text-ink-500">
          The smarter way to manage sales starts with using tools that
          streamline every step of the process.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
          >
            Get Started For Free
            <ArrowRight02Icon size={16} />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition hover:border-brand-300"
          >
            <PlayIcon size={16} />
            Book A Free Demo
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-5xl px-4">
        <DashboardMockup />
      </div>
    </section>
  );
}
