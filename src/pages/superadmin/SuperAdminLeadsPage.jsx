import { useState } from "react";
import { InboxIcon, Search01Icon, Mail01Icon, Call02Icon, MoreHorizontalIcon } from "hugeicons-react";

const LEADS = [
  { id: 1, name: "Riya Sharma", contact: "riya@business.com", type: "email", source: "Cafe & Restaurant POS", status: "New", date: "25 Mar" },
  { id: 2, name: "Arjun Mehta", contact: "+91 98765 43210", type: "phone", source: "Contact Page", status: "Contacted", date: "24 Mar" },
  { id: 3, name: "Priya Nair", contact: "priya.nair@cafeplace.in", type: "email", source: "Accounting Software", status: "Converted", date: "22 Mar" },
  { id: 4, name: "Karan Patel", contact: "karan@thekitchenhub.com", type: "email", source: "Book a Demo", status: "New", date: "21 Mar" },
  { id: 5, name: "Sana Iqbal", contact: "+91 90210 11223", type: "phone", source: "Pricing Page", status: "Contacted", date: "19 Mar" },
];

const STATUS_STYLES = {
  New: "bg-(--color-accent)/10 text-(--color-accent)",
  Contacted: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Converted: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
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
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          <InboxIcon size={20} strokeWidth={1.8} />
          Leads
        </h1>
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
            className="w-full rounded-full border border-(--color-border) bg-transparent py-1.5 pl-8 pr-3 text-sm outline-none focus:border-(--color-accent)"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 sm:max-w-md">
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="text-2xl font-semibold tabular-nums">{counts.total}</div>
          <div className="text-xs text-(--color-text-muted)">Total Leads</div>
        </div>
        <div className="rounded-xl border border-(--color-border) bg-(--color-accent)/5 p-4">
          <div className="text-2xl font-semibold tabular-nums text-(--color-accent)">{counts.new}</div>
          <div className="text-xs text-(--color-text-muted)">New</div>
        </div>
        <div className="rounded-xl border border-(--color-border) bg-emerald-500/5 p-4">
          <div className="text-2xl font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{counts.converted}</div>
          <div className="text-xs text-(--color-text-muted)">Converted</div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {filtered.map((lead) => (
          <div
            key={lead.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-(--color-border) px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-accent)/10 text-sm font-semibold text-(--color-accent)">
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <div className="font-semibold">{lead.name}</div>
                <div className="flex items-center gap-1.5 text-sm text-(--color-text-muted)">
                  {lead.type === "email" ? <Mail01Icon size={13} strokeWidth={1.8} /> : <Call02Icon size={13} strokeWidth={1.8} />}
                  {lead.contact}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wide text-(--color-text-muted)">{lead.source}</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[lead.status]}`}>{lead.status}</span>
              <span className="text-sm text-(--color-text-muted)">{lead.date}</span>
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md text-(--color-text-muted) transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              >
                <MoreHorizontalIcon size={16} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="py-8 text-center text-sm text-(--color-text-muted)">No leads found.</p>}
      </div>
    </div>
  );
}
