import { useState } from "react";
import { UserGroup03Icon, Search01Icon, Delete02Icon } from "hugeicons-react";

const USERS = [
  { id: 1, name: "Riya Sharma", email: "riya@thekitchenhub.com", role: "Owner", client: "The Kitchen Hub", status: "Active" },
  { id: 2, name: "Arjun Mehta", email: "arjun@bierplatz.in", role: "Manager", client: "Bierplatz Chandigarh", status: "Active" },
  { id: 3, name: "Priya Nair", email: "priya.nair@cafeplace.in", role: "Owner", client: "Cafe Place", status: "Suspended" },
  { id: 4, name: "Karan Patel", email: "karan@thekitchenhub.com", role: "Staff", client: "The Kitchen Hub", status: "Active" },
  { id: 5, name: "Sana Iqbal", email: "sana@spiceroute.in", role: "Owner", client: "Spice Route", status: "Active" },
];

export default function SuperAdminUsersPage() {
  const [search, setSearch] = useState("");

  const filtered = USERS.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="px-10 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          <UserGroup03Icon size={20} strokeWidth={1.8} />
          Users
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
            placeholder="Search users"
            className="w-full rounded-full border border-(--color-border) bg-transparent py-1.5 pl-8 pr-3 text-sm outline-none focus:border-(--color-accent)"
          />
        </div>
      </div>
      <p className="mt-1 text-sm text-(--color-text-muted)">Every owner and staff login across all clients.</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-(--color-border)">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-(--color-border) text-xs text-(--color-text-muted)">
              <th className="px-4 py-2.5 font-medium">Name</th>
              <th className="px-4 py-2.5 font-medium">Email</th>
              <th className="px-4 py-2.5 font-medium">Role</th>
              <th className="px-4 py-2.5 font-medium">Client</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-(--color-border) last:border-0">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-(--color-text-muted)">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-medium dark:bg-white/10">{u.role}</span>
                </td>
                <td className="px-4 py-3 text-(--color-text-muted)">{u.client}</td>
                <td className="px-4 py-3">
                  <span
                    className={`flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                      u.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-(--color-text-muted) transition-colors hover:bg-red-500/10 hover:text-red-500"
                  >
                    <Delete02Icon size={14} strokeWidth={1.8} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-(--color-text-muted)">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
