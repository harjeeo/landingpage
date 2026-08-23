import { Rocket01Icon, ArrowRight02Icon, PlayIcon } from "hugeicons-react";

export default function Cta() {
  return (
    <section className="relative overflow-hidden py-24">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[480px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 100%, rgba(52,102,255,0.35) 0%, rgba(52,102,255,0.08) 45%, rgba(255,255,255,0) 75%)",
        }}
      />
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="mx-auto mb-5 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-medium text-brand-600 shadow-sm">
          <Rocket01Icon size={14} />
          Free trial
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          Get up and running in just a few minutes
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-ink-500">
          Integrating with our API is quick and easy. Explore our
          documentation, use our SDKs and libraries, and start developing in
          just 5 minutes.
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
    </section>
  );
}
