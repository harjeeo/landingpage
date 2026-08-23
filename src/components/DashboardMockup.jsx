import {
  ChartLineData01Icon,
  Search01Icon,
  Notification03Icon,
  Home01Icon,
  ShoppingBag01Icon,
  ShoppingCart01Icon,
  CreditCardIcon,
  Setting07Icon,
  Layers01Icon,
} from "hugeicons-react";

const stats = [
  { label: "Total assets", value: "89,935", change: "+2.4% this week" },
  { label: "Total sales", value: "23,283.5", change: "+1.8% this week" },
  { label: "Total sales", value: "46,827", change: "-0.6% this week" },
  { label: "Total profit", value: "124,854", change: "+3.1% this week" },
];

const navItems = [
  { label: "Overview", icon: Home01Icon, active: true },
  { label: "Product", icon: ShoppingBag01Icon },
  { label: "Orders", icon: ShoppingCart01Icon },
  { label: "Checkout", icon: CreditCardIcon, dot: true },
  { label: "Setting", icon: Setting07Icon },
];

const orders = [
  { id: "01", date: "Jan 12, 2025", customer: "Alex Morgan", location: "New York", amount: "$1,240", status: "Paid" },
  { id: "02", date: "Jan 11, 2025", customer: "Sarah Lee", location: "Chicago", amount: "$860", status: "Pending" },
  { id: "03", date: "Jan 10, 2025", customer: "James Cook", location: "Austin", amount: "$2,015", status: "Paid" },
];

const bars = [40, 55, 35, 70, 50, 65, 45, 80, 60, 90, 55, 72, 48, 66];

function StatusPill({ status }) {
  const styles =
    status === "Paid"
      ? "bg-emerald-50 text-emerald-600"
      : "bg-amber-50 text-amber-600";
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${styles}`}>
      {status}
    </span>
  );
}

export default function DashboardMockup() {
  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-2xl shadow-brand-900/10">
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-ink-900/5 bg-slate-50/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden w-40 shrink-0 flex-col justify-between border-r border-ink-900/5 bg-slate-50/40 px-4 py-5 sm:flex">
          <div>
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-ink-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500 text-white">
                <ChartLineData01Icon size={14} />
              </span>
              Alterx
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map(({ label, icon: Icon, active, dot }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                    active
                      ? "bg-brand-500 text-white shadow-sm"
                      : "text-ink-500"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                  {dot && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-400" />}
                </div>
              ))}
            </nav>
          </div>
          <div className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-500">
            Log out
          </div>
        </aside>

        {/* main */}
        <div className="flex-1 px-5 py-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-ink-400">Welcome Back,</p>
              <p className="text-sm font-semibold text-ink-900">Alex</p>
            </div>
            <div className="flex items-center gap-3 text-ink-400">
              <Search01Icon size={16} />
              <Notification03Icon size={16} />
              <span className="h-6 w-6 rounded-full bg-brand-200" />
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-ink-900/5 bg-slate-50/50 p-3">
                <p className="text-[10px] text-ink-400">{s.label}</p>
                <p className="text-sm font-bold text-ink-900">{s.value}</p>
                <p
                  className={`text-[10px] ${
                    s.change.startsWith("-") ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  {s.change}
                </p>
              </div>
            ))}
          </div>

          {/* chart + earnings */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-xl border border-ink-900/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-ink-900">Orders Analytics</p>
                <p className="text-[10px] text-ink-400">Weekly</p>
              </div>
              <div className="flex h-24 items-end gap-1.5">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-t-sm ${
                      i === 9 ? "bg-brand-500" : "bg-brand-100"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center rounded-xl border border-ink-900/5 p-4 sm:w-32">
              <p className="mb-2 text-xs font-semibold text-ink-900">Earnings</p>
              <div
                className="h-16 w-16 rounded-full"
                style={{
                  background:
                    "conic-gradient(#3466ff 0% 45%, #93c5fd 45% 75%, #c7d2fe 75% 100%)",
                }}
              />
            </div>
          </div>

          {/* order list */}
          <div className="mt-4 overflow-hidden rounded-xl border border-ink-900/5">
            <div className="flex items-center justify-between border-b border-ink-900/5 px-4 py-2.5">
              <p className="text-xs font-semibold text-ink-900 flex items-center gap-1.5">
                <Layers01Icon size={14} className="text-ink-400" /> Order List
              </p>
              <p className="text-[10px] text-brand-500">See all</p>
            </div>
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="text-ink-400">
                  <th className="px-4 py-2 font-medium">#</th>
                  <th className="px-4 py-2 font-medium">Date</th>
                  <th className="hidden px-4 py-2 font-medium sm:table-cell">Customer</th>
                  <th className="px-4 py-2 font-medium">Amount</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-ink-900/5 text-ink-700">
                    <td className="px-4 py-2">{o.id}</td>
                    <td className="px-4 py-2">{o.date}</td>
                    <td className="hidden px-4 py-2 sm:table-cell">{o.customer}</td>
                    <td className="px-4 py-2">{o.amount}</td>
                    <td className="px-4 py-2">
                      <StatusPill status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
