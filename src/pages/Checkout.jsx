import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import {
  Mail01Icon,
  LockPasswordIcon,
  UserIcon,
  Call02Icon,
  Building06Icon,
  ViewIcon,
  ViewOffIcon,
  CheckmarkCircle02Icon,
  ArrowRight02Icon,
} from "hugeicons-react";
import * as customerAuth from "../lib/customerAuth";
import { startCheckout, verifyPayment, loadRazorpayScript } from "../lib/subscriptions";

const PLAN_LABELS = { Starter: "Starter", Growth: "Growth" };
const PLAN_BASE_PRICE = { Starter: 399, Growth: 599 };

function planPrice(plan, billingCycle) {
  const base = PLAN_BASE_PRICE[plan] ?? 0;
  return billingCycle === "annual" ? base : Math.ceil(base / 0.6);
}

const inputClass =
  "w-full border border-ink-900/10 bg-ink-900/[0.02] px-4 py-3 pl-11 text-sm text-ink-900 placeholder:text-ink-400";

export default function Checkout() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const plan = PLAN_LABELS[params.get("plan")] ? params.get("plan") : "Starter";
  const billingCycle = params.get("billing") === "monthly" ? "monthly" : "annual";

  const [session, setSession] = useState(() => customerAuth.getSession());
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const [form, setForm] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    password: "",
  });

  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleAuthSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user =
        mode === "login"
          ? await customerAuth.login(form.email, form.password)
          : await customerAuth.signup(form);
      setSession({ user });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePay() {
    setError("");
    setPaying(true);
    try {
      await loadRazorpayScript();
      const order = await startCheckout({ plan, billingCycle });

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Ojar",
        description: `${plan} plan — ${billingCycle === "annual" ? "billed annually" : "billed monthly"}`,
        prefill: {
          name: session?.user?.name,
          email: session?.user?.email,
          contact: session?.user?.phone,
        },
        theme: { color: "#4147e0" },
        handler: async (response) => {
          try {
            await verifyPayment({
              subscriptionId: order.subscriptionId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setPaid(true);
            setTimeout(() => navigate("/dashboard"), 1200);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Payment verification failed.");
          } finally {
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });

      razorpay.on("payment.failed", () => {
        setError("Payment failed. Please try again.");
        setPaying(false);
      });

      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
      setPaying(false);
    }
  }

  useEffect(() => {
    setSession(customerAuth.getSession());
  }, []);

  const price = planPrice(plan, billingCycle);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900/[0.02] px-4 py-16">
      <div
        className="w-full max-w-md border border-ink-900/5 bg-white p-8 shadow-[0_20px_60px_rgba(11,13,23,0.08)]"
        style={{ borderRadius: "20px" }}
      >
        <div className="border-b border-ink-900/5 pb-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-600">
            {PLAN_LABELS[plan]} Plan
          </span>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900">
            ₹{price}
            <span className="text-base font-semibold text-ink-500">
              /mo, {billingCycle === "annual" ? "billed annually" : "billed monthly"}
            </span>
          </p>
        </div>

        {paid ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckmarkCircle02Icon size={26} strokeWidth={2} />
            </span>
            <h2 className="text-lg font-bold text-ink-900">Payment successful!</h2>
            <p className="text-sm text-ink-500">Taking you to your dashboard…</p>
          </div>
        ) : !session ? (
          <div className="pt-6">
            <div className="mb-6 flex items-center rounded-full bg-ink-900/5 p-1 text-sm font-semibold">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full py-2 ${mode === "login" ? "bg-white text-ink-900 shadow" : "text-ink-500"}`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-full py-2 ${mode === "signup" ? "bg-white text-ink-900 shadow" : "text-ink-500"}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
              {mode === "signup" && (
                <>
                  <div className="relative">
                    <UserIcon size={16} strokeWidth={2} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Your Name"
                      className={inputClass}
                      style={{ borderRadius: "12px" }}
                    />
                  </div>
                  <div className="relative">
                    <Building06Icon size={16} strokeWidth={2} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                    <input
                      value={form.businessName}
                      onChange={(e) => setField("businessName", e.target.value)}
                      placeholder="Business Name"
                      className={inputClass}
                      style={{ borderRadius: "12px" }}
                    />
                  </div>
                  <div className="relative">
                    <Call02Icon size={16} strokeWidth={2} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                    <input
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      placeholder="Mobile Number"
                      className={inputClass}
                      style={{ borderRadius: "12px" }}
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <Mail01Icon size={16} strokeWidth={2} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="Email"
                  className={inputClass}
                  style={{ borderRadius: "12px" }}
                />
              </div>

              <div className="relative">
                <LockPasswordIcon size={16} strokeWidth={2} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  placeholder="Password"
                  className={`${inputClass} pr-11`}
                  style={{ borderRadius: "12px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400"
                >
                  {showPassword ? <ViewOffIcon size={16} strokeWidth={2} /> : <ViewIcon size={16} strokeWidth={2} />}
                </button>
              </div>

              {error && <p className="text-xs font-semibold text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 py-3.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
              >
                {submitting ? "Please wait…" : mode === "login" ? "Login & Continue" : "Sign Up & Continue"}
                <ArrowRight02Icon size={16} strokeWidth={2.5} />
              </button>
            </form>
          </div>
        ) : (
          <div className="pt-6">
            <p className="text-sm text-ink-500">Signed in as</p>
            <p className="font-semibold text-ink-900">{session.user?.email}</p>

            {error && <p className="mt-4 text-xs font-semibold text-red-500">{error}</p>}

            <button
              onClick={handlePay}
              disabled={paying}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-3.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {paying ? "Opening payment…" : `Pay ₹${billingCycle === "annual" ? price * 12 : price}`}
              <ArrowRight02Icon size={16} strokeWidth={2.5} />
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-ink-500">
          <Link to="/pricing" className="hover:text-brand-600">
            ← Back to Pricing
          </Link>
        </p>
      </div>
    </div>
  );
}
