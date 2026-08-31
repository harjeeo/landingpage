import { Tick02Icon, ArrowRight02Icon, StarIcon } from "hugeicons-react";

const checklist = [
  "Schedule your team in minutes",
  "Track hours from any device",
  "Message your whole team instantly",
  "Works online and offline",
];

export default function Hero() {
  return (
    <section className="px-4 pt-16 pb-20 md:pt-20 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            Built for Restaurant Teams
          </span>

          <p
            className="mt-4 text-3xl text-ink-900"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            More than just scheduling
          </p>

          <h1 className="mt-1 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink-900 md:text-6xl">
            The platform behind
            <br />
            great <span className="text-brand-600">restaurant teams</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg font-medium text-ink-700">
            7shifts gives operators clearer answers and faster
            workflows—with less tools.
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
                500+ restaurants trust 7shifts
              </p>
              <div className="flex items-center gap-0.5 text-accent-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} size={14} strokeWidth={0} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="border border-ink-900/5 bg-white shadow-[0_20px_60px_rgba(11,13,23,0.08)]"
          style={{ borderRadius: "20px" }}
        >
          <div className="border-b border-ink-900/5 px-8 py-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-600">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
              7-Day Free Trial
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900">
              Book Your Free Demo
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Our team gets you live in under 2 hours.
            </p>
          </div>

          <form className="flex flex-col gap-4 px-8 py-6">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                Restaurant Name *
              </span>
              <input
                type="text"
                placeholder="e.g. Bierplatz"
                className="border border-ink-900/10 bg-ink-900/[0.02] px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400"
                style={{ borderRadius: "12px" }}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                Mobile Number *
              </span>
              <div className="flex gap-2">
                <span
                  className="flex items-center border border-ink-900/10 bg-ink-900/[0.02] px-4 py-3 text-sm text-ink-900"
                  style={{ borderRadius: "12px" }}
                >
                  +1
                </span>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  className="w-full border border-ink-900/10 bg-ink-900/[0.02] px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400"
                  style={{ borderRadius: "12px" }}
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                City *
              </span>
              <input
                type="text"
                placeholder="e.g. Toronto, New York"
                className="border border-ink-900/10 bg-ink-900/[0.02] px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400"
                style={{ borderRadius: "12px" }}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                Number of Locations
              </span>
              <select
                defaultValue=""
                className="border border-ink-900/10 bg-ink-900/[0.02] px-4 py-3 text-sm text-ink-900"
                style={{ borderRadius: "12px" }}
              >
                <option value="" disabled>
                  Select business size
                </option>
                <option>1 location</option>
                <option>2–5 locations</option>
                <option>6+ locations</option>
              </select>
            </label>

            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-brand-700"
            >
              Request Free Demo
              <ArrowRight02Icon size={18} strokeWidth={2.5} />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ink-500">
              {["Setup in 30 min", "No credit card", "Free onboarding"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-1">
                    <Tick02Icon size={12} strokeWidth={3} className="text-brand-600" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </form>

          <div className="flex items-center justify-center gap-3 border-t border-ink-900/5 px-8 py-4 text-sm font-semibold text-ink-900">
            <a href="#pricing" className="hover:text-brand-600">
              View Pricing →
            </a>
            <span className="text-ink-900/10">|</span>
            <a href="#features" className="hover:text-brand-600">
              See Features →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
