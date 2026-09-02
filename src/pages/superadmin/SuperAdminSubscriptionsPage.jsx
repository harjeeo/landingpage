import { RepeatIcon, CheckmarkCircle02Icon, PauseIcon, Alert02Icon } from "hugeicons-react";

const SUBSCRIPTIONS = [
  { id: 1, name: "The Kitchen Hub", app: "Cafe & Restaurant POS", plan: "Pro", status: "Active", renews: "12 Apr 2026", amount: "₹2,499/mo" },
  { id: 2, name: "Bierplatz Chandigarh", app: "Cafe & Restaurant POS", plan: "Basic", status: "Active", renews: "03 Apr 2026", amount: "₹1,199/mo" },
  { id: 3, name: "Cafe Place", app: "Accounting Software", plan: "Pro", status: "Past Due", renews: "28 Feb 2026", amount: "₹2,499/mo" },
  { id: 4, name: "Ludhiana Diner", app: "Cafe & Restaurant POS", plan: "Free", status: "Trial", renews: "18 Mar 2026", amount: "₹0" },
  { id: 5, name: "Spice Route", app: "Accounting Software", plan: "Basic", status: "Cancelled", renews: "—", amount: "₹1,199/mo" },
];

const STATUS_META = {
  Active: { icon: CheckmarkCircle02Icon, className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  Trial: { icon: RepeatIcon, className: "bg-(--color-accent)/10 text-(--color-accent)" },
  "Past Due": { icon: Alert02Icon, className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  Cancelled: { icon: PauseIcon, className: "bg-red-500/10 text-red-500" },
};

export default function SuperAdminSubscriptionsPage() {
  const active = SUBSCRIPTIONS.filter((s) => s.status === "Active").length;
  const pastDue = SUBSCRIPTIONS.filter((s) => s.status === "Past Due").length;

  return (
    <div className="px-10 py-8">
      <h1 className="flex items-center gap-2 text-2xl font-semibold">
        <RepeatIcon size={20} strokeWidth={1.8} />
        Subscriptions
      </h1>
      <p className="mt-1 text-sm text-(--color-text-muted)">Every client's plan, renewal date and billing status.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="text-2xl font-semibold tabular-nums">{SUBSCRIPTIONS.length}</div>
          <div className="text-xs text-(--color-text-muted)">Total Subscriptions</div>
        </div>
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="text-2xl font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{active}</div>
          <div className="text-xs text-(--color-text-muted)">Active</div>
        </div>
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <div className="text-2xl font-semibold tabular-nums text-red-500">{pastDue}</div>
          <div className="text-xs text-(--color-text-muted)">Past Due</div>
        </div>
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="text-2xl font-semibold tabular-nums">₹6,897</div>
          <div className="text-xs text-(--color-text-muted)">MRR (est.)</div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-(--color-border)">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-(--color-border) text-xs text-(--color-text-muted)">
              <th className="px-4 py-2.5 font-medium">Client</th>
              <th className="px-4 py-2.5 font-medium">App</th>
              <th className="px-4 py-2.5 font-medium">Plan</th>
              <th className="px-4 py-2.5 font-medium">Amount</th>
              <th className="px-4 py-2.5 font-medium">Renews</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {SUBSCRIPTIONS.map((s) => {
              const meta = STATUS_META[s.status];
              const Icon = meta.icon;
              return (
                <tr key={s.id} className="border-b border-(--color-border) last:border-0">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-(--color-text-muted)">{s.app}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-medium dark:bg-white/10">{s.plan}</span>
                  </td>
                  <td className="px-4 py-3 tabular-nums">{s.amount}</td>
                  <td className="px-4 py-3 text-(--color-text-muted)">{s.renews}</td>
                  <td className="px-4 py-3">
                    <span className={`flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${meta.className}`}>
                      <Icon size={11} strokeWidth={1.8} />
                      {s.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
