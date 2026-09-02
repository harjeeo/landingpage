import { useState } from "react";
import { InboxIcon, Search01Icon, CheckmarkCircle02Icon, RepeatIcon, Alert02Icon } from "hugeicons-react";

const LEADS = [
  { id: 1, name: "Riya Sharma", contact: "riya@business.com", source: "Cafe & Restaurant POS", status: "New", date: "25 Mar 2026" },
  { id: 2, name: "Arjun Mehta", contact: "+91 98765 43210", source: "Contact Page", status: "Contacted", date: "24 Mar 2026" },
  { id: 3, name: "Priya Nair", contact: "priya.nair@cafeplace.in", source: "Accounting Software", status: "Converted", date: "22 Mar 2026" },
  { id: 4, name: "Karan Patel", contact: "karan@thekitchenhub.com", source: "Book a Demo", status: "New", date: "21 Mar 2026" },
  { id: 5, name: "Sana Iqbal", contact: "+91 90210 11223", source: "Pricing Page", status: "Contacted", date: "19 Mar 2026" },
];

const STATUS_META = {
  New: { icon: RepeatIcon, className: "bg-(--color-accent)/10 text-(--color-accent)" },
  Contacted: { icon: Alert02Icon, className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  Converted: { icon: CheckmarkCircle02Icon, className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
};

export default function SuperAdminLeadsPage() {
  const [search, setSearch] = useState("");

  const filtered = LEADS.filter(
    (l) => l.name.toLowerCase().includes(search.toLowerCase()) || l.contact.toLowerCase().includes(search.toLowerCase()),
  );
  const counts = {
    total: LEADS.length,
    new: LEADS.filter((l) => l.status === "New").length,
    converted: LEADS.filter((l) => l.status === "Converted").length,
  };

  return (
    <div className="px-10 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            <InboxIcon size={20} strokeWidth={1.8} />
            Leads
          </h1>
          <p className="mt-1 text-sm text-(--color-text-muted)">Every inbound lead from the marketing site.</p>
        </div>
        <div className="relative w-64">
          <Search01Icon
            size={16}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads"
            className="w-full rounded-md border border-(--color-border) bg-transparent py-1.5 pl-8 pr-3 text-sm outline-none focus:border-(--color-accent)"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="text-2xl font-semibold tabular-nums">{counts.total}</div>
          <div className="text-xs text-(--color-text-muted)">Total Leads</div>
        </div>
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="text-2xl font-semibold tabular-nums">{counts.new}</div>
          <div className="text-xs text-(--color-text-muted)">New</div>
        </div>
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="text-2xl font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{counts.converted}</div>
          <div className="text-xs text-(--color-text-muted)">Converted</div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-(--color-border)">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-(--color-border) text-xs text-(--color-text-muted)">
              <th className="px-4 py-2.5 font-medium">Lead</th>
              <th className="px-4 py-2.5 font-medium">Contact</th>
              <th className="px-4 py-2.5 font-medium">Source</th>
              <th className="px-4 py-2.5 font-medium">Date</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => {
              const meta = STATUS_META[lead.status];
              const Icon = meta.icon;
              return (
                <tr key={lead.id} className="border-b border-(--color-border) last:border-0">
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3 text-(--color-text-muted)">{lead.contact}</td>
                  <td className="px-4 py-3 text-(--color-text-muted)">{lead.source}</td>
                  <td className="px-4 py-3 text-(--color-text-muted)">{lead.date}</td>
                  <td className="px-4 py-3">
                    <span className={`flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${meta.className}`}>
                      <Icon size={11} strokeWidth={1.8} />
                      {lead.status}
                    </span>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-(--color-text-muted)">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
