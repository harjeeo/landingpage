import { CreditCardIcon, CheckmarkCircle02Icon, Alert02Icon, Download04Icon } from "hugeicons-react";

const PAYMENTS = [
  { id: "INV-1042", client: "The Kitchen Hub", amount: "₹2,499", method: "UPI", status: "Paid", date: "12 Mar 2026" },
  { id: "INV-1041", client: "Bierplatz Chandigarh", amount: "₹1,199", method: "Card", status: "Paid", date: "03 Mar 2026" },
  { id: "INV-1040", client: "Cafe Place", amount: "₹2,499", method: "Card", status: "Failed", date: "28 Feb 2026" },
  { id: "INV-1039", client: "Spice Route", amount: "₹1,199", method: "UPI", status: "Refunded", date: "20 Feb 2026" },
  { id: "INV-1038", client: "The Kitchen Hub", amount: "₹2,499", method: "UPI", status: "Paid", date: "12 Feb 2026" },
];

const STATUS_STYLES = {
  Paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Failed: "bg-red-500/10 text-red-500",
  Refunded: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export default function SuperAdminPaymentsPage() {
  const totalCollected = PAYMENTS.filter((p) => p.status === "Paid").length;
  const failed = PAYMENTS.filter((p) => p.status === "Failed").length;

  return (
    <div className="px-10 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            <CreditCardIcon size={20} strokeWidth={1.8} />
            Payments
          </h1>
          <p className="mt-1 text-sm text-(--color-text-muted)">Invoices and transactions across every client.</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-(--color-border) px-3 py-1.5 text-sm font-medium text-(--color-text) transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        >
          <Download04Icon size={14} strokeWidth={1.8} />
          Export CSV
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="text-2xl font-semibold tabular-nums">₹7,395</div>
          <div className="text-xs text-(--color-text-muted)">Collected This Month</div>
        </div>
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="text-2xl font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{totalCollected}</div>
          <div className="text-xs text-(--color-text-muted)">Paid Invoices</div>
        </div>
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <div className="text-2xl font-semibold tabular-nums text-red-500">{failed}</div>
          <div className="text-xs text-(--color-text-muted)">Failed Payments</div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-(--color-border)">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-(--color-border) text-xs text-(--color-text-muted)">
              <th className="px-4 py-2.5 font-medium">Invoice</th>
              <th className="px-4 py-2.5 font-medium">Client</th>
              <th className="px-4 py-2.5 font-medium">Amount</th>
              <th className="px-4 py-2.5 font-medium">Method</th>
              <th className="px-4 py-2.5 font-medium">Date</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {PAYMENTS.map((p) => (
              <tr key={p.id} className="border-b border-(--color-border) last:border-0">
                <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                <td className="px-4 py-3 font-medium">{p.client}</td>
                <td className="px-4 py-3 tabular-nums">{p.amount}</td>
                <td className="px-4 py-3 text-(--color-text-muted)">{p.method}</td>
                <td className="px-4 py-3 text-(--color-text-muted)">{p.date}</td>
                <td className="px-4 py-3">
                  <span className={`flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[p.status]}`}>
                    {p.status === "Paid" ? (
                      <CheckmarkCircle02Icon size={11} strokeWidth={1.8} />
                    ) : (
                      <Alert02Icon size={11} strokeWidth={1.8} />
                    )}
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
