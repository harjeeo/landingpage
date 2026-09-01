import { Tick02Icon, ArrowRight02Icon } from "hugeicons-react";
import { Link } from "react-router-dom";

export default function DemoRequestForm() {
  return (
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
              +91
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
            placeholder="e.g. Chandigarh"
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
        <Link to="/pricing" className="hover:text-brand-600">
          View Pricing →
        </Link>
        <span className="text-ink-900/10">|</span>
        <a href="#features" className="hover:text-brand-600">
          See Features →
        </a>
      </div>
    </div>
  );
}
