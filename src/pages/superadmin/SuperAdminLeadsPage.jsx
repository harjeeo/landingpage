import { useEffect, useState } from "react";
import { InboxIcon, Search01Icon, CheckmarkCircle02Icon, RepeatIcon, Alert02Icon } from "hugeicons-react";
import { getLeads } from "../../lib/superadmin/api";
import Pagination from "../../components/superadmin/Pagination";

const PAGE_SIZE = 20;

const STATUS_META = {
  new: { label: "New", icon: RepeatIcon, className: "bg-(--color-accent)/10 text-(--color-accent)" },
  contacted: { label: "Contacted", icon: Alert02Icon, className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  converted: { label: "Converted", icon: CheckmarkCircle02Icon, className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
};

const SOURCE_META = {
  dc: { label: "DC", title: "Designs Clue", className: "bg-black/5 text-(--color-text) dark:bg-white/10" },
  ojar: { label: "OJAR", title: "Ojar", className: "border border-(--color-accent)/30 text-(--color-accent)" },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function SuperAdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getLeads({ page, pageSize: PAGE_SIZE })
      .then((result) => {
        setLeads(result.items);
        setTotal(result.total);
        setError("");
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load leads"))
      .finally(() => setLoading(false));
  }, [page]);

  const filtered = leads.filter(
    (l) => l.name.toLowerCase().includes(search.toLowerCase()) || l.contact.toLowerCase().includes(search.toLowerCase()),
  );
  const newCount = leads.filter((l) => l.status === "new").length;
  const convertedCount = leads.filter((l) => l.status === "converted").length;

  return (
    <div className="px-10 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            <InboxIcon size={20} strokeWidth={1.8} />
            Leads
          </h1>
          <p className="mt-1 text-sm text-(--color-text-muted)">
            Every inbound lead from Ojar and Designs Clue, in one place.
          </p>
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
          <div className="text-2xl font-semibold tabular-nums">{total}</div>
          <div className="text-xs text-(--color-text-muted)">Total Leads</div>
        </div>
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="text-2xl font-semibold tabular-nums">{newCount}</div>
          <div className="text-xs text-(--color-text-muted)">New (this page)</div>
        </div>
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="text-2xl font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{convertedCount}</div>
          <div className="text-xs text-(--color-text-muted)">Converted (this page)</div>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-xl border border-(--color-border)">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-(--color-border) text-xs text-(--color-text-muted)">
              <th className="px-4 py-2.5 font-medium">Lead</th>
              <th className="px-4 py-2.5 font-medium">Contact</th>
              <th className="px-4 py-2.5 font-medium">Source</th>
              <th className="px-4 py-2.5 font-medium">Page</th>
              <th className="px-4 py-2.5 font-medium">Date</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => {
              const statusMeta = STATUS_META[lead.status] ?? STATUS_META.new;
              const StatusIcon = statusMeta.icon;
              const sourceMeta = SOURCE_META[lead.source] ?? SOURCE_META.ojar;
              return (
                <tr key={lead._id} className="border-b border-(--color-border) last:border-0">
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3 text-(--color-text-muted)">{lead.contact}</td>
                  <td className="px-4 py-3">
                    <span
                      title={sourceMeta.title}
                      className={`w-fit rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wide ${sourceMeta.className}`}
                    >
                      {sourceMeta.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-(--color-text-muted)">{lead.sourcePage ?? "—"}</td>
                  <td className="px-4 py-3 text-(--color-text-muted)">{formatDate(lead.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusMeta.className}`}>
                      <StatusIcon size={11} strokeWidth={1.8} />
                      {statusMeta.label}
                    </span>
                  </td>
                </tr>
              );
            })}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-(--color-text-muted)">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
    </div>
  );
}
