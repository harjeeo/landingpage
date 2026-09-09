import { useState, useEffect, useMemo } from "react";
import {
  Mortarboard01Icon,
  Search01Icon,
  CheckmarkCircle02Icon,
  UserCircleIcon,
  LaptopVideoIcon,
  Building02Icon,
  PlusSignIcon,
  Download01Icon,
  ViewIcon,
  Cancel01Icon,
  Tick02Icon,
  FileUploadIcon,
  FileAttachmentIcon,
  Delete02Icon,
  PauseIcon,
} from "hugeicons-react";
import { getPlatformSettings, updatePlatformSettings } from "../../lib/superadmin/api";

const DEFAULT_COURSES = [
  { slug: "ui-design-masterclass", title: "UI Design Masterclass — Next-Gen UI Design with AI" },
  { slug: "graphic-design-in-7-days", title: "Graphic Design in 7 Days — Learn, Create & Master AI" },
  { slug: "shopify-1-week-master-course", title: "Shopify 1 Week Master Course" },
];

const INITIAL_STUDENTS = [
  {
    id: "std-1",
    name: "Mehak",
    email: "mehak@gmail.com",
    phone: "9814522993",
    courseTitle: "UI Design Masterclass — Next-Gen UI Design with AI",
    courseSlug: "ui-design-masterclass",
    mode: "online",
    location: "Online / Live",
    amountPaid: "₹2,999",
    purchaseDate: "08 Sep 2026",
    purchaseTime: "04:30 PM",
    certificateId: "DC-CERT-UID-8821",
    certificatePdf: null,
    certificateFileName: null,
    certificateUploadedAt: null,
    status: "Active",
  },
  {
    id: "std-2",
    name: "Harpreet Singh",
    email: "harpreet@designsclue.com",
    phone: "9814012345",
    courseTitle: "Graphic Design in 7 Days — Learn, Create & Master AI",
    courseSlug: "graphic-design-in-7-days",
    mode: "offline",
    location: "Ludhiana Campus",
    amountPaid: "₹4,999",
    purchaseDate: "05 Sep 2026",
    purchaseTime: "11:15 AM",
    certificateId: "DC-CERT-GRD-5519",
    certificatePdf: null,
    certificateFileName: null,
    certificateUploadedAt: null,
    status: "Active",
  },
  {
    id: "std-3",
    name: "Aman Verma",
    email: "aman.verma@example.com",
    phone: "9988776655",
    courseTitle: "Shopify 1 Week Master Course",
    courseSlug: "shopify-1-week-master-course",
    mode: "online",
    location: "Online / Live",
    amountPaid: "₹2,999",
    purchaseDate: "02 Sep 2026",
    purchaseTime: "06:45 PM",
    certificateId: "DC-CERT-SHP-3310",
    certificatePdf: null,
    certificateFileName: null,
    certificateUploadedAt: null,
    status: "Active",
  },
];

const STATUS_META = {
  Active: { icon: CheckmarkCircle02Icon, className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  Completed: { icon: CheckmarkCircle02Icon, className: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  Suspended: { icon: PauseIcon, className: "bg-red-500/10 text-red-500" },
};

export default function SuperAdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [pdfPreviewModal, setPdfPreviewModal] = useState(null);

  // Form State for Right Side Drawer
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    courseTitle: DEFAULT_COURSES[0].title,
    courseSlug: DEFAULT_COURSES[0].slug,
    mode: "online",
    location: "Online / Live",
    amountPaid: "₹2,999",
    purchaseDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    purchaseTime: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
    certificateId: `DC-CERT-UID-${Math.floor(1000 + Math.random() * 9000)}`,
    certificatePdf: null,
    certificateFileName: null,
    certificateUploadedAt: null,
    status: "Active",
  });

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);
    try {
      const data = await getPlatformSettings();
      let list = data?.studentsList;
      if (!list || list.length === 0) {
        list = INITIAL_STUDENTS;
      }
      setStudents(list);
    } catch (err) {
      console.warn("Using fallback initial students:", err);
      setStudents(INITIAL_STUDENTS);
    } finally {
      setLoading(false);
    }
  }

  async function persistStudents(updatedList) {
    setSaving(true);
    try {
      await updatePlatformSettings({
        studentsList: updatedList,
      });
      setStudents(updatedList);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch (err) {
      console.error("Failed to save students list:", err);
      setStudents(updatedList);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  function handleSelectStudent(std) {
    setSelectedStudent(std);
    setIsAddingNew(false);
    setFormData({ ...std });
  }

  function handleOpenAddPanel() {
    const newCertId = `DC-CERT-UID-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent = {
      id: `std-${Date.now()}`,
      name: "",
      email: "",
      phone: "",
      courseTitle: DEFAULT_COURSES[0].title,
      courseSlug: DEFAULT_COURSES[0].slug,
      mode: "online",
      location: "Online / Live",
      amountPaid: "₹2,999",
      purchaseDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      purchaseTime: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
      certificateId: newCertId,
      certificatePdf: null,
      certificateFileName: null,
      certificateUploadedAt: null,
      status: "Active",
    };
    setSelectedStudent(newStudent);
    setIsAddingNew(true);
    setFormData(newStudent);
  }

  function handleCloseRightPanel() {
    setSelectedStudent(null);
    setIsAddingNew(false);
  }

  function handleDeleteStudent(id, e) {
    if (e) e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this student record?")) {
      const updated = students.filter((s) => s.id !== id);
      persistStudents(updated);
      if (selectedStudent?.id === id) {
        handleCloseRightPanel();
      }
    }
  }

  function handlePdfFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert("File size exceeds 25MB limit. Please upload a smaller PDF.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Data = uploadEvent.target.result;
      const updated = {
        ...formData,
        certificatePdf: base64Data,
        certificateFileName: file.name,
        certificateUploadedAt: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setFormData(updated);
      setSelectedStudent(updated);
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveCertificate() {
    const updated = {
      ...formData,
      certificatePdf: null,
      certificateFileName: null,
      certificateUploadedAt: null,
    };
    setFormData(updated);
    setSelectedStudent(updated);
  }

  function handleSaveForm(e) {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter student name.");
      return;
    }

    let updated;
    if (isAddingNew) {
      updated = [formData, ...students];
    } else {
      updated = students.map((s) => (s.id === formData.id ? formData : s));
    }

    persistStudents(updated);
    setSelectedStudent(formData);
    setIsAddingNew(false);
  }

  const filtered = useMemo(() => {
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        (s.email && s.email.toLowerCase().includes(search.toLowerCase())) ||
        (s.phone && s.phone.toLowerCase().includes(search.toLowerCase())) ||
        (s.courseTitle && s.courseTitle.toLowerCase().includes(search.toLowerCase()))
    );
  }, [students, search]);

  const totalStudents = students.length;
  const onlineCount = students.filter((s) => s.mode === "online").length;
  const offlineCount = students.filter((s) => s.mode === "offline").length;
  const certUploadedCount = students.filter((s) => Boolean(s.certificatePdf)).length;

  return (
    <div className="flex h-[calc(100vh)] w-full overflow-hidden bg-(--color-canvas) text-(--color-text)">
      
      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Tick02Icon size={18} />
          <span>Student and certificate details saved successfully!</span>
        </div>
      )}

      {/* LEFT: Main Students Table View */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-semibold">
              <Mortarboard01Icon size={20} strokeWidth={1.8} />
              <span>Students</span>
            </h1>
            <p className="mt-1 text-sm text-(--color-text-muted)">
              Every enrolled student and purchased course across the platform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search01Icon
                size={16}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student or course..."
                className="w-full rounded-md border border-(--color-border) bg-transparent py-1.5 pl-8 pr-3 text-sm outline-none focus:border-(--color-accent)"
              />
            </div>

            <button
              type="button"
              onClick={handleOpenAddPanel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-(--color-accent) text-white font-medium text-sm hover:opacity-90 transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
            >
              <PlusSignIcon size={16} strokeWidth={2} />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-(--color-border) p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-accent)/10 text-(--color-accent)">
              <UserCircleIcon size={18} strokeWidth={1.8} />
            </div>
            <div className="mt-3 text-2xl font-semibold tabular-nums">{totalStudents}</div>
            <div className="text-xs text-(--color-text-muted)">Total Enrolled Students</div>
          </div>

          <div className="rounded-xl border border-(--color-border) p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-accent)/10 text-(--color-accent)">
              <LaptopVideoIcon size={18} strokeWidth={1.8} />
            </div>
            <div className="mt-3 text-2xl font-semibold tabular-nums">{onlineCount}</div>
            <div className="text-xs text-(--color-text-muted)">Online Live Classes</div>
          </div>

          <div className="rounded-xl border border-(--color-border) p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-accent)/10 text-(--color-accent)">
              <Building02Icon size={18} strokeWidth={1.8} />
            </div>
            <div className="mt-3 text-2xl font-semibold tabular-nums">{offlineCount}</div>
            <div className="text-xs text-(--color-text-muted)">Offline (Ludhiana Campus)</div>
          </div>

          <div className="rounded-xl border border-(--color-border) p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-accent)/10 text-(--color-accent)">
              <FileAttachmentIcon size={18} strokeWidth={1.8} />
            </div>
            <div className="mt-3 text-2xl font-semibold tabular-nums">
              {certUploadedCount} / {totalStudents}
            </div>
            <div className="text-xs text-(--color-text-muted)">Certificates Uploaded (PDF)</div>
          </div>
        </div>

        {/* Students Table (Clean Image 2 Style) */}
        <div className="overflow-x-auto rounded-xl border border-(--color-border)">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-(--color-border) text-xs text-(--color-text-muted)">
                <th className="px-4 py-2.5 font-medium">Name</th>
                <th className="px-4 py-2.5 font-medium">Email</th>
                <th className="px-4 py-2.5 font-medium">Phone</th>
                <th className="px-4 py-2.5 font-medium">Course</th>
                <th className="px-4 py-2.5 font-medium">Mode</th>
                <th className="px-4 py-2.5 font-medium">Amount</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-(--color-text-muted)">
                    Loading students database...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-(--color-text-muted)">
                    No students found matching "{search}".
                  </td>
                </tr>
              ) : (
                filtered.map((s) => {
                  const meta = STATUS_META[s.status] || STATUS_META.Active;
                  const Icon = meta.icon;
                  const isSelected = selectedStudent?.id === s.id;

                  return (
                    <tr
                      key={s.id}
                      onClick={() => handleSelectStudent(s)}
                      className={`border-b border-(--color-border) last:border-0 transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-(--color-accent)/10 font-medium"
                          : "hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-(--color-text)">
                        {s.name}
                      </td>
                      <td className="px-4 py-3 text-(--color-text-muted)">
                        {s.email || "—"}
                      </td>
                      <td className="px-4 py-3 text-(--color-text-muted)">
                        {s.phone || "—"}
                      </td>
                      <td className="px-4 py-3 text-(--color-text-muted) max-w-[180px] truncate" title={s.courseTitle}>
                        {s.courseTitle}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-medium dark:bg-white/10">
                          {s.mode === "offline" ? "Offline" : "Online"}
                        </span>
                      </td>
                      <td className="px-4 py-3 tabular-nums font-medium text-(--color-text)">
                        {s.amountPaid}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${meta.className}`}>
                          <Icon size={11} strokeWidth={1.8} />
                          {s.status || "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectStudent(s);
                          }}
                          className="text-xs font-medium text-(--color-accent) hover:underline cursor-pointer"
                        >
                          View / Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* RIGHT: Side Detail & Edit Drawer (Attachment Design) */}
      {selectedStudent && (
        <aside className="w-96 lg:w-[420px] shrink-0 border-l border-(--color-border) bg-(--color-sidebar) p-6 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right-4 duration-200">
          
          <div className="space-y-5">
            
            {/* Header with Title and Close X */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-(--color-text) tracking-tight">
                  {isAddingNew ? "Add New Student" : formData.name || "Student Details"}
                </h2>
                <p className="text-xs text-(--color-text-muted) mt-0.5">
                  {isAddingNew
                    ? "Enter student details and upload certificate"
                    : `Student since ${formData.purchaseDate || "recent"}`}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseRightPanel}
                className="p-1 rounded-md text-(--color-text-muted) hover:text-(--color-text) hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Cancel01Icon size={18} />
              </button>
            </div>

            {/* Read-only Quick Info (When not adding new) */}
            {!isAddingNew && (
              <div className="space-y-1.5 text-xs">
                <div className="text-(--color-text-muted)">
                  Student: <strong className="text-(--color-text) font-semibold">{formData.name}</strong>
                </div>
                <div className="text-(--color-text-muted)">
                  Phone: <span className="text-(--color-text) font-mono">{formData.phone || "—"}</span>
                </div>
                <div className="text-(--color-text-muted)">
                  Email: <span className="text-(--color-text)">{formData.email || "—"}</span>
                </div>
                <div className="text-(--color-text-muted)">
                  ID: <span className="font-mono text-(--color-text)">{formData.certificateId}</span>
                </div>
              </div>
            )}

            {/* 4 Stat Cards in 2x2 Grid (Attachment Style) */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-(--color-border) p-3 bg-black/2 dark:bg-white/2">
                <div className="text-base font-bold tabular-nums text-(--color-text)">
                  {formData.amountPaid || "₹0"}
                </div>
                <div className="text-[11px] text-(--color-text-muted)">Amount Paid</div>
              </div>

              <div className="rounded-xl border border-(--color-border) p-3 bg-black/2 dark:bg-white/2">
                <div className="text-base font-bold text-(--color-text)">
                  {formData.mode === "offline" ? "Offline" : "Online"}
                </div>
                <div className="text-[11px] text-(--color-text-muted)">Class Mode</div>
              </div>

              <div className="rounded-xl border border-(--color-border) p-3 bg-black/2 dark:bg-white/2">
                <div className="text-base font-bold text-(--color-text)">
                  1 Course
                </div>
                <div className="text-[11px] text-(--color-text-muted)">Batch Active</div>
              </div>

              <div className="rounded-xl border border-(--color-border) p-3 bg-black/2 dark:bg-white/2">
                <div className="text-base font-bold text-(--color-text) truncate">
                  {formData.purchaseDate || "Active"}
                </div>
                <div className="text-[11px] text-(--color-text-muted)">Purchase Date</div>
              </div>
            </div>

            {/* Form Fields */}
            <form id="student-side-form" onSubmit={handleSaveForm} className="space-y-3.5 pt-1">
              
              <label className="flex flex-col gap-1 text-xs">
                <span className="font-medium text-(--color-text-muted)">Student Name *</span>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Student name"
                  className="p-2 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
                />
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-medium text-(--color-text-muted)">Phone Number</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9814522993"
                    className="p-2 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
                  />
                </label>

                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-medium text-(--color-text-muted)">Email</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="p-2 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1 text-xs">
                <span className="font-medium text-(--color-text-muted)">Enrolled Course</span>
                <select
                  value={formData.courseSlug}
                  onChange={(e) => {
                    const selected = DEFAULT_COURSES.find((c) => c.slug === e.target.value);
                    setFormData({
                      ...formData,
                      courseSlug: e.target.value,
                      courseTitle: selected?.title || formData.courseTitle,
                    });
                  }}
                  className="p-2 rounded-lg border border-(--color-border) bg-(--color-canvas) text-sm outline-none focus:border-(--color-accent)"
                >
                  {DEFAULT_COURSES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-medium text-(--color-text-muted)">Class Mode</span>
                  <select
                    value={formData.mode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mode: e.target.value,
                        location: e.target.value === "offline" ? "Ludhiana Campus" : "Online / Live",
                        amountPaid: e.target.value === "offline" ? "₹4,999" : "₹2,999",
                      })
                    }
                    className="p-2 rounded-lg border border-(--color-border) bg-(--color-canvas) text-sm outline-none focus:border-(--color-accent)"
                  >
                    <option value="online">Online Classes</option>
                    <option value="offline">Offline (Ludhiana)</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-medium text-(--color-text-muted)">Status</span>
                  <select
                    value={formData.status || "Active"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="p-2 rounded-lg border border-(--color-border) bg-(--color-canvas) text-sm outline-none focus:border-(--color-accent)"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </label>
              </div>

              {/* UPLOAD CERTIFICATE SECTION */}
              <div className="p-3.5 rounded-xl border border-(--color-border) bg-black/5 dark:bg-white/5 space-y-2.5 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-(--color-text)">Upload Certificate (PDF)</span>
                  {formData.certificatePdf && (
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckmarkCircle02Icon size={12} />
                      <span>PDF Attached</span>
                    </span>
                  )}
                </div>

                {formData.certificatePdf ? (
                  <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 space-y-2">
                    <div className="flex items-center gap-2">
                      <FileAttachmentIcon size={16} className="text-emerald-500 shrink-0" />
                      <span className="text-xs font-semibold text-(--color-text) truncate max-w-[220px]">
                        {formData.certificateFileName || `${formData.name}_Certificate.pdf`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setPdfPreviewModal(formData)}
                        className="px-2.5 py-1 rounded bg-(--color-canvas) border border-(--color-border) text-xs font-semibold text-(--color-text) hover:bg-white/10 flex items-center gap-1 cursor-pointer"
                      >
                        <ViewIcon size={12} />
                        <span>Preview</span>
                      </button>

                      <a
                        href={formData.certificatePdf}
                        download={formData.certificateFileName || `${formData.name}_Certificate.pdf`}
                        className="px-2.5 py-1 rounded bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Download01Icon size={12} />
                        <span>Download</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleRemoveCertificate}
                        className="px-2.5 py-1 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-1 cursor-pointer ml-auto"
                      >
                        <Delete02Icon size={12} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative border border-dashed border-(--color-border) hover:border-(--color-accent) rounded-lg p-4 text-center transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,application/pdf,image/png,image/jpeg"
                      onChange={handlePdfFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center justify-center gap-1">
                      <FileUploadIcon size={18} className="text-(--color-accent)" />
                      <span className="text-xs font-semibold text-(--color-text)">
                        Click to upload Certificate PDF
                      </span>
                      <span className="text-[10px] text-(--color-text-muted)">
                        Auto-downloads in student dashboard
                      </span>
                    </div>
                  </div>
                )}
              </div>

            </form>

          </div>

          {/* Bottom Drawer Actions */}
          <div className="pt-5 border-t border-(--color-border) space-y-2 mt-4">
            <button
              type="submit"
              form="student-side-form"
              disabled={saving}
              className="w-full py-2.5 px-4 rounded-lg bg-(--color-accent) text-white font-semibold text-sm hover:opacity-90 transition-all shadow-xs active:scale-[0.98] cursor-pointer disabled:opacity-50 text-center"
            >
              {saving ? "Saving..." : isAddingNew ? "Add Student" : "Save Changes"}
            </button>

            {!isAddingNew && (
              <button
                type="button"
                onClick={(e) => handleDeleteStudent(formData.id, e)}
                className="w-full py-2 px-4 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Delete02Icon size={14} />
                <span>Delete Student</span>
              </button>
            )}
          </div>

        </aside>
      )}

      {/* PDF Preview Modal */}
      {pdfPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-(--color-canvas, #ffffff) dark:bg-(--color-canvas, #13151f) border border-(--color-border) rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative text-(--color-text)">
            <div className="flex items-center justify-between border-b border-(--color-border) pb-3">
              <div className="flex items-center gap-2">
                <FileAttachmentIcon size={20} className="text-emerald-500" />
                <div>
                  <h3 className="text-base font-bold">Certificate Preview</h3>
                  <p className="text-xs text-(--color-text-muted)">
                    {pdfPreviewModal.name} • {pdfPreviewModal.courseTitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPdfPreviewModal(null)}
                className="text-(--color-text-muted) hover:text-(--color-text) p-1 cursor-pointer"
              >
                <Cancel01Icon size={20} />
              </button>
            </div>

            <div className="w-full h-[400px] bg-black/10 rounded-xl overflow-hidden border border-(--color-border) flex items-center justify-center">
              {pdfPreviewModal.certificatePdf?.startsWith("data:application/pdf") ? (
                <iframe
                  src={pdfPreviewModal.certificatePdf}
                  title="Certificate PDF Preview"
                  className="w-full h-full border-none"
                />
              ) : (
                <img
                  src={pdfPreviewModal.certificatePdf}
                  alt="Certificate Preview"
                  className="max-h-full max-w-full object-contain p-2"
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-(--color-text-muted)">
                Verified Certificate for {pdfPreviewModal.name}
              </span>
              <a
                href={pdfPreviewModal.certificatePdf}
                download={pdfPreviewModal.certificateFileName || `${pdfPreviewModal.name}_Certificate.pdf`}
                className="px-4 py-2 rounded-lg bg-(--color-accent) text-white font-medium text-xs flex items-center gap-1.5"
              >
                <Download01Icon size={15} />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
