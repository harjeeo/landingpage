import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FlashIcon,
  Shield01Icon,
  ChartBarLineIcon,
  ViewIcon,
  ViewOffIcon,
  ArrowRight02Icon,
} from "hugeicons-react";
import Logo from "../components/Logo";

const highlights = [
  {
    icon: FlashIcon,
    title: "Up and running in 30 minutes",
    desc: "Onboarding team gets you live the same day.",
  },
  {
    icon: Shield01Icon,
    title: "Bank-grade security",
    desc: "End-to-end encrypted. SOC-2 ready infrastructure.",
  },
  {
    icon: ChartBarLineIcon,
    title: "Real-time analytics",
    desc: "Schedules, labor cost & team performance — live.",
  },
];

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.85.87-3.04.87-2.34 0-4.32-1.58-5.03-3.7H.95v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.73A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.19.29-1.73V4.94H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.06l3.02-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.94l3.02 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 p-10 md:flex md:flex-col md:justify-between">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative">
          <Logo height={26} className="text-white" />

          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            Restaurant Team Platform
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Run your restaurant
            <br />
            <span className="text-brand-400">from anywhere.</span>
          </h1>

          <p className="mt-4 max-w-sm text-white/60">
            Scheduling, time clocking, payroll & team messaging — one
            platform, any device.
          </p>
        </div>

        <div className="relative mt-10 flex flex-col gap-3">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-3 border border-white/10 bg-white/5 p-4"
              style={{ borderRadius: "16px" }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-400">
                <Icon size={18} strokeWidth={2} />
              </span>
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="text-sm text-white/50">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="h-8 w-8 rounded-full border-2 border-ink-900 bg-white/20"
              />
            ))}
          </div>
          <p className="text-sm text-white/70">
            <span className="font-semibold text-white">500+ restaurants</span>{" "}
            trust 7shifts
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 inline-flex md:hidden">
            <Logo height={26} />
          </Link>

          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">
            Welcome back
          </h1>
          <p className="mt-1 text-ink-500">Sign in to your restaurant dashboard.</p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-8 flex w-full items-center justify-center gap-2 border border-ink-900/10 py-3 text-sm font-semibold text-ink-900 hover:bg-ink-900/5"
            style={{ borderRadius: "9999px" }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-ink-900/10" />
            <span className="text-xs font-bold uppercase tracking-wide text-ink-400">
              Or sign in with email
            </span>
            <div className="h-px flex-1 bg-ink-900/10" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                Work Email
              </span>
              <input
                type="email"
                placeholder="owner@restaurant.com"
                className="border border-ink-900/10 bg-ink-900/[0.02] px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400"
                style={{ borderRadius: "12px" }}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Password
                </span>
                <a href="#forgot-password" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border border-ink-900/10 bg-ink-900/[0.02] px-4 py-3 pr-11 text-sm text-ink-900 placeholder:text-ink-400"
                  style={{ borderRadius: "12px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                >
                  {showPassword ? (
                    <ViewOffIcon size={18} strokeWidth={2} />
                  ) : (
                    <ViewIcon size={18} strokeWidth={2} />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center gap-2 bg-ink-900 py-3.5 text-sm font-semibold text-white hover:bg-ink-900/90"
              style={{ borderRadius: "9999px" }}
            >
              Sign in
              <ArrowRight02Icon size={16} strokeWidth={2.5} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500">
            New to 7shifts?{" "}
            <a href="#signup" className="font-semibold text-ink-900 underline">
              Start your free trial
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
