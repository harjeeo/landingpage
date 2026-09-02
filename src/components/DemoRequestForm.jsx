import { useState } from "react";
import { Tick02Icon, ArrowRight02Icon, CheckmarkCircle02Icon } from "hugeicons-react";
import { Link, useLocation } from "react-router-dom";
import { submitLead } from "../lib/leads";

export default function DemoRequestForm() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !city.trim()) {
      setError("Please fill in your restaurant name, mobile number, and city.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await submitLead({
        name: name.trim(),
        contact: `+91 ${phone.trim()}`,
        sourcePage: location.pathname,
        message: `City: ${city.trim()}${locations ? `; ${locations}` : ""}`,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

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

      {submitted ? (
        <div className="flex flex-col items-center gap-3 px-8 py-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <CheckmarkCircle02Icon size={26} strokeWidth={2} />
          </span>
          <h3 className="text-lg font-bold text-ink-900">Thank you!</h3>
          <p className="max-w-xs text-sm text-ink-500">
            Your request has been received. Our team will reach out shortly to get you live.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8 py-6">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
              Restaurant Name *
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
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

          {error && <p className="text-xs font-semibold text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Request Free Demo"}
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
      )}

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
