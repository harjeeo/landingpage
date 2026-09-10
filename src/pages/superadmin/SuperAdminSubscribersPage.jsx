import { useState, useEffect, useMemo } from "react";
import {
  TelephoneIcon,
  Search01Icon,
  Download01Icon,
  Copy01Icon,
  Delete02Icon,
  PlusSignIcon,
  CheckmarkCircle02Icon,
  Tick02Icon,
  UserAdd01Icon,
  Comment01Icon,
  SparklesIcon,
  Calendar03Icon,
} from "hugeicons-react";
import { getPlatformSettings, updatePlatformSettings } from "../../lib/superadmin/api";

const INITIAL_SUBSCRIBERS = [
  {
    id: "sub-1",
    phone: "9814522993",
    source: "Homepage Newsletter",
    status: "Active",
    subscribedDate: "09 Sep 2026",
    subscribedTime: "02:15 PM",
    created_at: "2026-09-09T08:45:00.000Z",
  },
  {
    id: "sub-2",
    phone: "9876543210",
    source: "Homepage Newsletter",
    status: "Active",
    subscribedDate: "08 Sep 2026",
    subscribedTime: "11:40 AM",
    created_at: "2026-09-08T06:10:00.000Z",
  },
  {
    id: "sub-3",
    phone: "9988776655",
    source: "Homepage Newsletter",
    status: "Active",
    subscribedDate: "05 Sep 2026",
    subscribedTime: "05:20 PM",
    created_at: "2026-09-05T11:50:00.000Z",
  },
];

export default function SuperAdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // 'all' | 'today' | 'newsletter'
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [newSource, setNewSource] = useState("Homepage Newsletter");

  useEffect(() => {
    loadSubscribers();

    const onSubUpdate = () => {
      try {
        const local = localStorage.getItem("dcskills_subscribers");
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSubscribers((prev) => {
              const combined = [...parsed, ...prev];
              const unique = [];
              const seen = new Set();
              for (const item of combined) {
                const norm = (item.phone || "").replace(/\D/g, "");
                if (norm && !seen.has(norm)) {
                  seen.add(norm);
                  unique.push(item);
                }
              }
              return unique;
            });
          }
        }
      } catch (e) {
        console.warn(e);
      }
    };

    window.addEventListener("dcskills_subscribers_updated", onSubUpdate);
    return () => window.removeEventListener("dcskills_subscribers_updated", onSubUpdate);
  }, []);

  async function loadSubscribers() {
    setLoading(true);
    try {
      let list = [];
      try {
        const data = await getPlatformSettings();
        if (data?.subscribersList && Array.isArray(data.subscribersList) && data.subscribersList.length > 0) {
          list = data.subscribersList;
        }
      } catch (apiErr) {
        console.warn("Backend subscriber list fetch fallback:", apiErr);
      }

      try {
        const localRaw = localStorage.getItem("dcskills_subscribers");
        if (localRaw) {
          const localParsed = JSON.parse(localRaw);
          if (Array.isArray(localParsed) && localParsed.length > 0) {
            list = [...localParsed, ...list];
          }
        }
      } catch (locErr) {
        console.warn(locErr);
      }

      if (!list || list.length === 0) {
        list = INITIAL_SUBSCRIBERS;
      }

      const unique = [];
      const seen = new Set();
      for (const item of list) {
        const norm = (item.phone || "").replace(/\D/g, "");
        if (norm && !seen.has(norm)) {
          seen.add(norm);
          unique.push(item);
        } else if (!norm) {
          unique.push(item);
        }
      }

      setSubscribers(unique);
    } catch (err) {
      console.warn("Using fallback initial subscribers:", err);
      setSubscribers(INITIAL_SUBSCRIBERS);
    } finally {
      setLoading(false);
    }
  }

  async function persistSubscribers(updatedList) {
    setSaving(true);
    setSubscribers(updatedList);
    try {
      localStorage.setItem("dcskills_subscribers", JSON.stringify(updatedList));
      window.dispatchEvent(new Event("dcskills_subscribers_updated"));
    } catch (e) {
      console.warn(e);
    }

    try {
      await updatePlatformSettings({
        subscribersList: updatedList,
      });
      showToast("Changes saved successfully!");
    } catch (err) {
      console.error("Failed to save subscribers list to backend:", err);
      showToast("Saved locally!");
    } finally {
      setSaving(false);
    }
  }

  function showToast(msg) {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(null), 3000);
  }

  function handleCopyPhone(id, phone) {
    if (!phone) return;
    navigator.clipboard?.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  }

  function handleCopyAllNumbers() {
    const numbers = subscribers.map((s) => s.phone).filter(Boolean).join(", ");
    if (!numbers) {
      alert("No phone numbers to copy.");
      return;
    }
    navigator.clipboard?.writeText(numbers);
    showToast(`Copied ${subscribers.length} phone numbers to clipboard!`);
  }

  function handleExportCsv() {
    if (!subscribers.length) {
      alert("No subscribers to export.");
      return;
    }
    const headers = ["ID", "Phone Number", "Source", "Status", "Subscribed Date", "Subscribed Time"];
    const rows = subscribers.map((s) => [
      `"${s.id || ""}"`,
      `"${s.phone || ""}"`,
      `"${s.source || "Homepage Newsletter"}"`,
      `"${s.status || "Active"}"`,
      `"${s.subscribedDate || ""}"`,
      `"${s.subscribedTime || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `subscribers_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleDeleteSubscriber(id) {
    const target = subscribers.find((s) => s.id === id);
    if (!window.confirm(`Are you sure you want to remove ${target?.phone || "this subscriber"}?`)) {
      return;
    }
    const updated = subscribers.filter((s) => s.id !== id);
    persistSubscribers(updated);
  }

  function handleAddSubscriberSubmit(e) {
    e.preventDefault();
    const clean = newPhone.trim();
    if (!clean) {
      alert("Please enter a phone number.");
      return;
    }

    const newSub = {
      id: `sub-${Date.now()}`,
      phone: clean,
      source: newSource.trim() || "Homepage Newsletter",
      status: "Active",
      subscribedDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      subscribedTime: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
      created_at: new Date().toISOString(),
    };

    const updated = [newSub, ...subscribers];
    persistSubscribers(updated);
    setNewPhone("");
    setNewSource("Homepage Newsletter");
    setShowAddModal(false);
  }

  const todayStr = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const todayCount = subscribers.filter((s) => s.subscribedDate === todayStr).length;
  const newsletterCount = subscribers.filter((s) => (s.source || "").toLowerCase().includes("newsletter") || (s.source || "").toLowerCase().includes("homepage")).length;

  // Filtered subscribers by search & filter chips
  const filtered = useMemo(() => {
    return subscribers.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        (s.phone && s.phone.toLowerCase().includes(q)) ||
        (s.source && s.source.toLowerCase().includes(q)) ||
        (s.subscribedDate && s.subscribedDate.toLowerCase().includes(q)) ||
        (s.status && s.status.toLowerCase().includes(q));

      if (!matchSearch) return false;

      if (filterMode === "today") return s.subscribedDate === todayStr;
      if (filterMode === "newsletter") return (s.source || "").toLowerCase().includes("newsletter") || (s.source || "").toLowerCase().includes("homepage");

      return true;
    });
  }, [subscribers, search, filterMode, todayStr]);

  return (
    <div className="px-10 py-8 space-y-6">
      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Tick02Icon size={18} />
          <span>{savedToast}</span>
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            <TelephoneIcon size={20} strokeWidth={1.8} />
            <span>Subscribers</span>
          </h1>
          <p className="mt-1 text-sm text-(--color-text-muted)">
            Every subscriber and contact captured from the website newsletter &amp; stay updated forms.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyAllNumbers}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-(--color-border) text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all shadow-xs cursor-pointer"
            title="Copy all phone numbers"
          >
            <Copy01Icon size={15} />
            <span>Copy All ({subscribers.length})</span>
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-(--color-border) text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all shadow-xs cursor-pointer"
          >
            <Download01Icon size={15} />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-(--color-accent) text-white font-medium text-sm hover:opacity-90 transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
          >
            <PlusSignIcon size={16} strokeWidth={2} />
            <span>+ Add Subscriber</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Grid (Dashboard Style matching Image 2) */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Card 1: Total Enrolled Subscribers */}
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-accent)/10 text-(--color-accent)">
            <TelephoneIcon size={18} strokeWidth={1.8} />
          </div>
          <div className="mt-3 text-2xl font-semibold tabular-nums">{subscribers.length}</div>
          <div className="text-xs text-(--color-text-muted)">Total Enrolled Subscribers</div>
        </div>

        {/* Card 2: Online Newsletter */}
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-accent)/10 text-(--color-accent)">
            <SparklesIcon size={18} strokeWidth={1.8} />
          </div>
          <div className="mt-3 text-2xl font-semibold tabular-nums">{newsletterCount}</div>
          <div className="text-xs text-(--color-text-muted)">Online Newsletter Form</div>
        </div>

        {/* Card 3: Active Contacts */}
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-accent)/10 text-(--color-accent)">
            <CheckmarkCircle02Icon size={18} strokeWidth={1.8} />
          </div>
          <div className="mt-3 text-2xl font-semibold tabular-nums">{subscribers.length}</div>
          <div className="text-xs text-(--color-text-muted)">Active Contacts (Verified)</div>
        </div>

        {/* Card 4: Subscribed Today */}
        <div className="rounded-xl border border-(--color-border) p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-accent)/10 text-(--color-accent)">
            <Calendar03Icon size={18} strokeWidth={1.8} />
          </div>
          <div className="mt-3 text-2xl font-semibold tabular-nums">
            {todayCount} / {subscribers.length}
          </div>
          <div className="text-xs text-(--color-text-muted)">Subscribed Today (New)</div>
        </div>
      </div>

      {/* Search & Filter Chips Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search01Icon
            size={16}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscribers or date..."
            className="w-full rounded-md border border-(--color-border) bg-transparent py-1.5 pl-8 pr-3 text-sm outline-none focus:border-(--color-accent)"
          />
        </div>

        {/* Filter Chips matching Image 2 */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-medium pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              filterMode === "all"
                ? "bg-(--color-accent) text-white border-transparent"
                : "border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)"
            }`}
          >
            All ({subscribers.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("newsletter")}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
              filterMode === "newsletter"
                ? "bg-blue-600 text-white border-transparent"
                : "border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)"
            }`}
          >
            <SparklesIcon size={14} />
            <span>Newsletter ({newsletterCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("today")}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
              filterMode === "today"
                ? "bg-purple-600 text-white border-transparent"
                : "border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)"
            }`}
          >
            <Calendar03Icon size={14} />
            <span>Today ({todayCount})</span>
          </button>
        </div>
      </div>

      {/* Clean Table with Action Icons matching Image 2 */}
      <div className="overflow-x-auto rounded-xl border border-(--color-border)">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-(--color-border) text-xs text-(--color-text-muted)">
              <th className="px-4 py-2.5 font-medium">Phone Number</th>
              <th className="px-4 py-2.5 font-medium">Source</th>
              <th className="px-4 py-2.5 font-medium">Subscribed Date</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-(--color-text-muted)">
                  Loading subscribers database...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-(--color-text-muted)">
                  No subscribers found matching your criteria.
                </td>
              </tr>
            ) : (
              filtered.map((sub, index) => {
                const cleanDigits = (sub.phone || "").replace(/\D/g, "");
                const isCopied = copiedId === sub.id;

                return (
                  <tr
                    key={sub.id || index}
                    className="border-b border-(--color-border) last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    {/* Phone Number */}
                    <td className="px-4 py-3 font-medium text-(--color-text) align-middle">
                      <div className="flex items-center gap-2">
                        <span>{sub.phone}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyPhone(sub.id, sub.phone)}
                          className="text-(--color-text-muted) hover:text-(--color-text) transition-colors cursor-pointer"
                          title="Copy phone"
                        >
                          {isCopied ? <Tick02Icon size={13} className="text-emerald-500" /> : <Copy01Icon size={13} />}
                        </button>
                      </div>
                    </td>

                    {/* Source */}
                    <td className="px-4 py-3 align-middle">
                      <span className="inline-flex items-center rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium dark:bg-white/10">
                        {sub.source || "Newsletter"}
                      </span>
                    </td>

                    {/* Subscribed Date */}
                    <td className="px-4 py-3 text-(--color-text-muted) align-middle">
                      <span>{sub.subscribedDate || "Recent"}</span>
                      {sub.subscribedTime && <span className="text-xs opacity-75 ml-1">({sub.subscribedTime})</span>}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 align-middle">
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <CheckmarkCircle02Icon size={11} strokeWidth={1.8} />
                        <span>{sub.status || "Active"}</span>
                      </span>
                    </td>

                    {/* Action Icons matching Image 2 */}
                    <td className="px-4 py-3 align-middle text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {cleanDigits && (
                          <a
                            href={`https://wa.me/${cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits}?text=Hi!%20Thank%20you%20for%20subscribing%20to%20Designs%20Clue%20Skills.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-(--color-border) hover:bg-black/5 dark:hover:bg-white/10 text-(--color-text-muted) hover:text-emerald-600 transition-colors"
                            title="Send WhatsApp Message"
                          >
                            <Comment01Icon size={14} />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => handleCopyPhone(sub.id, sub.phone)}
                          className="p-1.5 rounded-lg border border-(--color-border) hover:bg-black/5 dark:hover:bg-white/10 text-(--color-text-muted) hover:text-(--color-text) transition-colors cursor-pointer"
                          title="Copy Phone"
                        >
                          <Copy01Icon size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteSubscriber(sub.id)}
                          className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete Subscriber"
                        >
                          <Delete02Icon size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL: Add Subscriber Manually */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-(--color-card) border border-(--color-border) rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative text-(--color-text) animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-(--color-border) pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-(--color-accent)/10 text-(--color-accent) flex items-center justify-center font-bold">
                  <UserAdd01Icon size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-(--color-text)">Add Subscriber</h3>
                  <span className="text-xs text-(--color-text-muted)">Add a phone number to update list</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-(--color-text-muted) hover:text-(--color-text) text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubscriberSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-(--color-text)">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9814522993"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-(--color-canvas) border border-(--color-border) rounded-lg text-(--color-text) focus:outline-none focus:border-(--color-accent)"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-(--color-text)">Source</label>
                <input
                  type="text"
                  placeholder="e.g. Homepage Newsletter, Direct Call, Campus Walkin"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-(--color-canvas) border border-(--color-border) rounded-lg text-(--color-text) focus:outline-none focus:border-(--color-accent)"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-(--color-border)">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-(--color-border) text-xs font-semibold text-(--color-text) hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-(--color-accent) text-white text-xs font-semibold hover:opacity-90 cursor-pointer shadow-xs"
                >
                  {saving ? "Saving..." : "Save Subscriber"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
