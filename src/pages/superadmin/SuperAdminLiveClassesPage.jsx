import { useEffect, useState } from "react";
import {
  Video01Icon,
  Calendar03Icon,
  UserGroup03Icon,
  Notification01Icon,
  CheckmarkCircle02Icon,
  PlusSignIcon,
  Delete02Icon,
  Link01Icon,
} from "hugeicons-react";
import { getPlatformSettings, updatePlatformSettings } from "../../lib/superadmin/api";

const TABS = [
  { key: "today", label: "Today's Live Class", icon: Video01Icon },
  { key: "schedule", label: "Weekly Schedule", icon: Calendar03Icon },
  { key: "batches", label: "Batches & WhatsApp", icon: UserGroup03Icon },
  { key: "notices", label: "Notice Board", icon: Notification01Icon },
];

const AVAILABLE_COURSES = [
  { slug: "all", title: "🌐 All Enrolled Students (Show to Everyone)" },
  { slug: "ui-design-masterclass", title: "UI/UX Design Masterclass" },
  { slug: "graphic-design-in-7-days", title: "Graphic Design in 7 Days / AI Mastery" },
  { slug: "shopify-1-week-master-course", title: "Shopify 1 Week Master Course" },
];

const inputClass =
  "rounded-md border border-(--color-border) bg-transparent p-2 text-sm outline-none focus:border-(--color-accent) w-full";

function Field({ label, children, hint }) {
  return (
    <label className="flex flex-col gap-1 w-full">
      <span className="text-xs text-(--color-text-muted) font-medium">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-(--color-text-muted)">{hint}</span>}
    </label>
  );
}

export default function SuperAdminLiveClassesPage() {
  const [tab, setTab] = useState("today");
  const [settings, setSettings] = useState(null);
  const [liveData, setLiveData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getPlatformSettings().then((data) => {
      setSettings(data);
      setLiveData(data.liveClassesSettings || {
        todayClass: {
          isLive: true,
          targetCourse: "ui-design-masterclass",
          courseTitle: "UI/UX Design Masterclass",
          topic: "Mastering Figma Auto Layout, Variables & Component Props",
          batchCode: "Batch #04 (Evening)",
          mentor: "Harpreet Singh",
          time: "Today, 7:00 PM – 8:30 PM IST",
          platform: "Google Meet",
          meetLink: "https://meet.google.com/dc-uiux-live",
        },
        weekSessions: [],
        batches: [],
        noticeBoard: [],
      });
    });
  }, []);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 2500);
    return () => clearTimeout(t);
  }, [saved]);

  // --- Today's Live Class Handlers ---
  function updateTodayClass(field, value) {
    setLiveData((prev) => ({
      ...prev,
      todayClass: {
        ...prev.todayClass,
        [field]: value,
      },
    }));
  }

  // --- Week Sessions Handlers ---
  function updateSession(idx, field, value) {
    setLiveData((prev) => {
      const updated = [...prev.weekSessions];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, weekSessions: updated };
    });
  }

  function addSession() {
    setLiveData((prev) => ({
      ...prev,
      weekSessions: [
        ...prev.weekSessions,
        {
          id: "sess-" + Date.now(),
          day: "Monday",
          date: "New Date",
          time: "7:00 PM",
          course: "UI/UX Design Masterclass",
          topic: "New Live Class Topic",
          isToday: false,
          platform: "Google Meet",
          meetLink: "https://meet.google.com/",
        },
      ],
    }));
  }

  function deleteSession(idx) {
    setLiveData((prev) => ({
      ...prev,
      weekSessions: prev.weekSessions.filter((_, i) => i !== idx),
    }));
  }

  // --- Batches Handlers ---
  function updateBatch(idx, field, value) {
    setLiveData((prev) => {
      const updated = [...prev.batches];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, batches: updated };
    });
  }

  function addBatch() {
    setLiveData((prev) => ({
      ...prev,
      batches: [
        ...prev.batches,
        {
          id: "batch-" + Date.now(),
          courseTitle: "New Course Masterclass",
          badge: "Live Interactive Batch",
          batchCode: "Batch #01",
          mentor: "Harpreet Singh",
          mentorRole: "Mentor",
          schedule: "Mon, Wed, Fri • 7:00 PM – 8:30 PM IST",
          platform: "Google Meet",
          meetLink: "https://meet.google.com/",
          whatsappLink: "https://chat.whatsapp.com/",
          totalSessions: 24,
          completedSessions: 0,
        },
      ],
    }));
  }

  function deleteBatch(idx) {
    setLiveData((prev) => ({
      ...prev,
      batches: prev.batches.filter((_, i) => i !== idx),
    }));
  }

  // --- Notice Board Handlers ---
  function updateNotice(idx, field, value) {
    setLiveData((prev) => {
      const updated = [...prev.noticeBoard];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, noticeBoard: updated };
    });
  }

  function addNotice() {
    setLiveData((prev) => ({
      ...prev,
      noticeBoard: [
        {
          id: "not-" + Date.now(),
          title: "New Announcement",
          desc: "Announcement description or study resource details.",
          time: "Just now",
          tag: "Announcement",
        },
        ...prev.noticeBoard,
      ],
    }));
  }

  function deleteNotice(idx) {
    setLiveData((prev) => ({
      ...prev,
      noticeBoard: prev.noticeBoard.filter((_, i) => i !== idx),
    }));
  }

  // --- Save All Settings ---
  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        ...settings,
        liveClassesSettings: liveData,
      };
      const updated = await updatePlatformSettings(payload);
      setSettings(updated);
      setSaved(true);
    } catch (err) {
      alert(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  if (!liveData) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-(--color-text-muted)">
        Loading Live Classes configuration...
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Left Sub-nav */}
      <div className="w-64 shrink-0 border-r border-(--color-border) px-3 py-6">
        <h1 className="px-2 text-lg font-semibold flex items-center gap-2">
          <Video01Icon size={20} strokeWidth={1.8} className="text-(--color-accent)" />
          Live Classes
        </h1>
        <p className="px-2 text-xs text-(--color-text-muted) mt-1">
          Manage Google Meet links, schedules, and student dashboard cohort data.
        </p>

        <nav className="mt-6 flex flex-col gap-0.5">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors cursor-pointer ${
                tab === key
                  ? "bg-black/5 font-medium text-(--color-text) dark:bg-white/10"
                  : "text-(--color-text-muted) hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Global Save Button in Sidebar */}
        <div className="mt-8 px-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-(--color-accent) px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-xs"
          >
            {saving ? (
              <span>Saving...</span>
            ) : saved ? (
              <>
                <CheckmarkCircle02Icon size={16} strokeWidth={2} />
                <span>Changes Saved!</span>
              </>
            ) : (
              <span>Save All Changes</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-3xl space-y-6">
          
          {/* TAB 1: TODAY'S LIVE CLASS */}
          {tab === "today" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold">Today's Live Class (Top Banner)</h2>
                <p className="text-xs text-(--color-text-muted) mt-0.5">
                  This banner is shown prominently at the top of the Student Dashboard with the "Join Live Class" and "Copy Link" buttons.
                </p>
              </div>

              {/* Status Toggle */}
              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-(--color-border) bg-black/[0.02] dark:bg-white/[0.02] cursor-pointer">
                <input
                  type="checkbox"
                  checked={liveData.todayClass?.isLive ?? true}
                  onChange={(e) => updateTodayClass("isLive", e.target.checked)}
                  className="w-4 h-4 rounded text-(--color-accent) accent-(--color-accent)"
                />
                <div>
                  <span className="text-sm font-medium">Show Live Class Banner Today</span>
                  <p className="text-xs text-(--color-text-muted)">
                    When unchecked, the dashboard shows "No live class scheduled for today".
                  </p>
                </div>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Select Course for Today's Live Class"
                  hint="Only students enrolled in this course will see this live class banner & Google Meet link"
                >
                  <select
                    value={liveData.todayClass?.targetCourse ?? "ui-design-masterclass"}
                    onChange={(e) => {
                      const selectedSlug = e.target.value;
                      const matched = AVAILABLE_COURSES.find((c) => c.slug === selectedSlug);
                      setLiveData((prev) => ({
                        ...prev,
                        todayClass: {
                          ...prev.todayClass,
                          targetCourse: selectedSlug,
                          courseTitle:
                            selectedSlug === "all"
                              ? "Live Masterclass"
                              : matched
                              ? matched.title
                              : prev.todayClass?.courseTitle,
                        },
                      }));
                    }}
                    className={inputClass}
                  >
                    {AVAILABLE_COURSES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Course Display Title">
                  <input
                    value={liveData.todayClass?.courseTitle ?? ""}
                    onChange={(e) => updateTodayClass("courseTitle", e.target.value)}
                    placeholder="e.g. UI/UX Design Masterclass"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <span>🎯</span>
                <span>
                  <strong>Audience Access Rule:</strong> Only students who have purchased{" "}
                  <strong>
                    {liveData.todayClass?.targetCourse === "all"
                      ? "any course (All Enrolled Students)"
                      : liveData.todayClass?.courseTitle || liveData.todayClass?.targetCourse}
                  </strong>{" "}
                  will see this live class banner on their dashboard.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Batch Code / Time slot">
                  <input
                    value={liveData.todayClass?.batchCode ?? ""}
                    onChange={(e) => updateTodayClass("batchCode", e.target.value)}
                    placeholder="e.g. Batch #04 (Evening)"
                    className={inputClass}
                  />
                </Field>

                <Field label="Mentor Name">
                  <input
                    value={liveData.todayClass?.mentor ?? ""}
                    onChange={(e) => updateTodayClass("mentor", e.target.value)}
                    placeholder="e.g. Harpreet Singh"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Class Topic / Lesson Name" hint="What will be taught in today's live session">
                <input
                  value={liveData.todayClass?.topic ?? ""}
                  onChange={(e) => updateTodayClass("topic", e.target.value)}
                  placeholder="e.g. Mastering Figma Auto Layout, Variables & Component Props"
                  className={inputClass}
                />
              </Field>

              <Field label="Date & Timing Display Text">
                <input
                  value={liveData.todayClass?.time ?? ""}
                  onChange={(e) => updateTodayClass("time", e.target.value)}
                  placeholder="e.g. Today, 7:00 PM – 8:30 PM IST"
                  className={inputClass}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Platform">
                  <select
                    value={liveData.todayClass?.platform ?? "Google Meet"}
                    onChange={(e) => updateTodayClass("platform", e.target.value)}
                    className={inputClass}
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom Meeting">Zoom Meeting</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                    <option value="YouTube Live">YouTube Live</option>
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Meeting URL (Google Meet Link)" hint="Students will be redirected here when clicking 'Join Live Class'">
                    <div className="flex gap-2">
                      <input
                        value={liveData.todayClass?.meetLink ?? ""}
                        onChange={(e) => updateTodayClass("meetLink", e.target.value)}
                        placeholder="https://meet.google.com/xxx-yyyy-zzz"
                        className={inputClass}
                      />
                      {liveData.todayClass?.meetLink && (
                        <a
                          href={liveData.todayClass.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2 rounded-md border border-(--color-border) hover:bg-black/5 text-xs flex items-center gap-1 shrink-0"
                        >
                          <Link01Icon size={14} /> Test
                        </a>
                      )}
                    </div>
                  </Field>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                  Student Dashboard Preview
                </span>
                <div className="text-sm font-bold">{liveData.todayClass?.topic || "Untitled Class"}</div>
                <div className="text-xs text-(--color-text-muted) flex items-center gap-3">
                  <span>🕒 {liveData.todayClass?.time}</span>
                  <span>👨‍🏫 {liveData.todayClass?.mentor}</span>
                  <span>📹 {liveData.todayClass?.platform}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEEKLY SCHEDULE */}
          {tab === "schedule" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">This Week's Live Classes</h2>
                  <p className="text-xs text-(--color-text-muted) mt-0.5">
                    Schedule of sessions shown under the "This Week's Live Classes" list on the student dashboard.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSession}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-(--color-accent) text-white text-xs font-semibold hover:opacity-90 cursor-pointer"
                >
                  <PlusSignIcon size={14} /> Add Class
                </button>
              </div>

              <div className="space-y-4">
                {liveData.weekSessions?.map((sess, idx) => (
                  <div key={sess.id || idx} className="p-4 rounded-xl border border-(--color-border) space-y-3 relative bg-black/[0.01] dark:bg-white/[0.01]">
                    <div className="flex items-center justify-between gap-2 border-b border-(--color-border) pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-(--color-accent)/10 text-(--color-accent)">
                          Session #{idx + 1}
                        </span>
                        <label className="flex items-center gap-1.5 text-xs text-(--color-text-muted) cursor-pointer">
                          <input
                            type="checkbox"
                            checked={sess.isToday ?? false}
                            onChange={(e) => updateSession(idx, "isToday", e.target.checked)}
                            className="accent-(--color-accent)"
                          />
                          <span>Highlight as 'Today'</span>
                        </label>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteSession(idx)}
                        className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 p-1"
                      >
                        <Delete02Icon size={14} /> Delete
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Field label="Day (e.g. Wednesday)">
                        <input
                          value={sess.day}
                          onChange={(e) => updateSession(idx, "day", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Date (e.g. 10 Sep)">
                        <input
                          value={sess.date}
                          onChange={(e) => updateSession(idx, "date", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Time (e.g. 7:00 PM)">
                        <input
                          value={sess.time}
                          onChange={(e) => updateSession(idx, "time", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Course Name">
                        <input
                          value={sess.course}
                          onChange={(e) => updateSession(idx, "course", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Lesson / Topic Title">
                        <input
                          value={sess.topic}
                          onChange={(e) => updateSession(idx, "topic", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Field label="Platform">
                        <select
                          value={sess.platform || "Google Meet"}
                          onChange={(e) => updateSession(idx, "platform", e.target.value)}
                          className={inputClass}
                        >
                          <option value="Google Meet">Google Meet</option>
                          <option value="Zoom Meeting">Zoom Meeting</option>
                          <option value="Microsoft Teams">Microsoft Teams</option>
                        </select>
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Meeting Link">
                          <input
                            value={sess.meetLink}
                            onChange={(e) => updateSession(idx, "meetLink", e.target.value)}
                            placeholder="https://meet.google.com/..."
                            className={inputClass}
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BATCHES & WHATSAPP */}
          {tab === "batches" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Course Batches & Community Groups</h2>
                  <p className="text-xs text-(--color-text-muted) mt-0.5">
                    Configure batch schedules, live classroom meet links, and WhatsApp group invite URLs for each cohort.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addBatch}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-(--color-accent) text-white text-xs font-semibold hover:opacity-90 cursor-pointer"
                >
                  <PlusSignIcon size={14} /> Add Batch
                </button>
              </div>

              <div className="space-y-4">
                {liveData.batches?.map((batch, idx) => (
                  <div key={batch.id || idx} className="p-4 rounded-xl border border-(--color-border) space-y-3 bg-black/[0.01] dark:bg-white/[0.01]">
                    <div className="flex items-center justify-between border-b border-(--color-border) pb-2">
                      <span className="text-xs font-bold text-(--color-accent)">
                        Batch #{idx + 1}: {batch.courseTitle}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteBatch(idx)}
                        className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 p-1"
                      >
                        <Delete02Icon size={14} /> Delete
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Course Title">
                        <input
                          value={batch.courseTitle}
                          onChange={(e) => updateBatch(idx, "courseTitle", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Batch Name / Code">
                        <input
                          value={batch.batchCode}
                          onChange={(e) => updateBatch(idx, "batchCode", e.target.value)}
                          placeholder="e.g. Batch #04 (Evening)"
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Schedule Display Text">
                        <input
                          value={batch.schedule}
                          onChange={(e) => updateBatch(idx, "schedule", e.target.value)}
                          placeholder="e.g. Mon, Wed, Fri • 7:00 PM – 8:30 PM IST"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Mentor Name">
                        <input
                          value={batch.mentor}
                          onChange={(e) => updateBatch(idx, "mentor", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Google Meet / Classroom URL" hint="Opened when student clicks 'Go to Classroom'">
                        <input
                          value={batch.meetLink}
                          onChange={(e) => updateBatch(idx, "meetLink", e.target.value)}
                          placeholder="https://meet.google.com/..."
                          className={inputClass}
                        />
                      </Field>
                      <Field label="WhatsApp Batch Group Invite Link" hint="Opened when student clicks 'Batch Group'">
                        <input
                          value={batch.whatsappLink}
                          onChange={(e) => updateBatch(idx, "whatsappLink", e.target.value)}
                          placeholder="https://chat.whatsapp.com/..."
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: NOTICE BOARD */}
          {tab === "notices" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Batch Notice Board Announcements</h2>
                  <p className="text-xs text-(--color-text-muted) mt-0.5">
                    Post updates, study material alerts, and Q&A notices that appear directly on the student dashboard notice board.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addNotice}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-(--color-accent) text-white text-xs font-semibold hover:opacity-90 cursor-pointer"
                >
                  <PlusSignIcon size={14} /> Add Notice
                </button>
              </div>

              <div className="space-y-4">
                {liveData.noticeBoard?.map((not, idx) => (
                  <div key={not.id || idx} className="p-4 rounded-xl border border-(--color-border) space-y-3 bg-black/[0.01] dark:bg-white/[0.01]">
                    <div className="flex items-center justify-between border-b border-(--color-border) pb-2">
                      <span className="text-xs font-bold text-(--color-accent)">Notice #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => deleteNotice(idx)}
                        className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 p-1"
                      >
                        <Delete02Icon size={14} /> Delete
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <Field label="Notice Title">
                          <input
                            value={not.title}
                            onChange={(e) => updateNotice(idx, "title", e.target.value)}
                            placeholder="e.g. Figma Starter Kit v2.4 Uploaded"
                            className={inputClass}
                          />
                        </Field>
                      </div>
                      <Field label="Tag (e.g. Resource / Announcement)">
                        <input
                          value={not.tag}
                          onChange={(e) => updateNotice(idx, "tag", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <Field label="Description Message">
                      <textarea
                        rows={2}
                        value={not.desc}
                        onChange={(e) => updateNotice(idx, "desc", e.target.value)}
                        placeholder="Notice description details for students..."
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Time Label">
                      <input
                        value={not.time}
                        onChange={(e) => updateNotice(idx, "time", e.target.value)}
                        placeholder="e.g. 2 hours ago / Today"
                        className={`${inputClass} w-48`}
                      />
                    </Field>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Save Bar */}
          <div className="pt-4 border-t border-(--color-border) flex items-center justify-between">
            <span className="text-xs text-(--color-text-muted)">
              Changes saved here update the student dashboard live in real time.
            </span>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-md bg-(--color-accent) px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {saving ? (
                <span>Saving...</span>
              ) : saved ? (
                <>
                  <CheckmarkCircle02Icon size={16} strokeWidth={2} />
                  <span>Saved & Published!</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
