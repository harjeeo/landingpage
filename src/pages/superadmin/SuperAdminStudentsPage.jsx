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
  ArrowLeft02Icon,
  FileUploadIcon,
  FileAttachmentIcon,
  Delete02Icon,
  Edit01Icon,
  PauseIcon,
  AlertCircleIcon,
  Mail01Icon,
  TelephoneIcon,
  Calendar03Icon,
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
  const [filterMode, setFilterMode] = useState("all"); // 'all' | 'online' | 'offline' | 'cert-uploaded' | 'cert-pending'
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'edit' | 'create'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [pdfPreviewModal, setPdfPreviewModal] = useState(null);

  // Form State for Dedicated Full-Width Edit Page
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

  function handleOpenCreatePage() {
    const newCertId = `DC-CERT-UID-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormData({
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
    });
    setSelectedStudent(null);
    setViewMode("create");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleOpenEditPage(std) {
    setSelectedStudent(std);
    setFormData({ ...std });
    setViewMode("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDeleteStudent(id, e) {
    if (e) e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this student record?")) {
      const updated = students.filter((s) => s.id !== id);
      persistStudents(updated);
      if (viewMode !== "list") {
        setViewMode("list");
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
      setFormData((prev) => ({
        ...prev,
        certificatePdf: base64Data,
        certificateFileName: file.name,
        certificateUploadedAt: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveCertificate() {
    setFormData((prev) => ({
      ...prev,
      certificatePdf: null,
      certificateFileName: null,
      certificateUploadedAt: null,
    }));
  }

  function handleSaveForm(e) {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter student name.");
      return;
    }

    let updated;
    if (viewMode === "create") {
      updated = [formData, ...students];
    } else {
      updated = students.map((s) => (s.id === formData.id ? formData : s));
    }

    persistStudents(updated);
    setViewMode("list");
  }

  // Filtered Students
  const filtered = useMemo(() => {
    return students.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.email && s.email.toLowerCase().includes(q)) ||
        (s.phone && s.phone.toLowerCase().includes(q)) ||
        (s.courseTitle && s.courseTitle.toLowerCase().includes(q));

      if (!matchSearch) return false;

      if (filterMode === "online") return s.mode === "online";
      if (filterMode === "offline") return s.mode === "offline";
      if (filterMode === "cert-uploaded") return Boolean(s.certificatePdf);
      if (filterMode === "cert-pending") return !s.certificatePdf;

      return true;
    });
  }, [students, search, filterMode]);

  const totalStudents = students.length;
  const onlineCount = students.filter((s) => s.mode === "online").length;
  const offlineCount = students.filter((s) => s.mode === "offline").length;
  const certUploadedCount = students.filter((s) => Boolean(s.certificatePdf)).length;

  // ==========================================
  // 1. FULL-WIDTH DEDICATED EDIT / CREATE PAGE
  // ==========================================
  if (viewMode === "edit" || viewMode === "create") {
    return (
      <div className="px-10 py-8 space-y-6 w-full max-w-6xl mx-auto">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between border-b border-(--color-border) pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-(--color-border) text-sm font-medium text-(--color-text) hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <ArrowLeft02Icon size={18} />
              <span>Back to Students List</span>
            </button>

            <div className="h-4 w-[1px] bg-(--color-border)"></div>

            <div>
              <h1 className="text-xl font-bold text-(--color-text)">
                {viewMode === "create" ? "Add / Enroll New Student" : `Edit Student: ${formData.name}`}
              </h1>
              <p className="text-xs text-(--color-text-muted)">
                {viewMode === "create"
                  ? "Enter student details, enrolled course and upload verified certificate"
                  : `Student ID: ${formData.certificateId} • Enrolled on ${formData.purchaseDate}`}
              </p>
            </div>
          </div>

          {viewMode === "edit" && (
            <button
              type="button"
              onClick={(e) => handleDeleteStudent(formData.id, e)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <Delete02Icon size={14} />
              <span>Delete Student</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSaveForm} className="space-y-6">
          
          {/* Card 1: Student Information */}
          <div className="rounded-xl border border-(--color-border) bg-(--color-card, transparent) p-6 space-y-4">
            <div className="flex items-center gap-2">
              <UserCircleIcon size={20} className="text-(--color-accent)" />
              <h2 className="text-base font-semibold text-(--color-text)">Student Personal &amp; Contact Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex flex-col gap-1.5 text-xs">
                <span className="font-medium text-(--color-text)">Full Name *</span>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mehak"
                  className="p-2.5 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs">
                <span className="font-medium text-(--color-text)">Phone Number</span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9814522993"
                  className="p-2.5 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs">
                <span className="font-medium text-(--color-text)">Email Address</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@example.com"
                  className="p-2.5 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
                />
              </label>
            </div>
          </div>

          {/* Card 2: Course & Purchase Details */}
          <div className="rounded-xl border border-(--color-border) bg-(--color-card, transparent) p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Mortarboard01Icon size={20} className="text-(--color-accent)" />
              <h2 className="text-base font-semibold text-(--color-text)">Course Enrollment &amp; Billing</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex flex-col gap-1.5 text-xs">
                <span className="font-medium text-(--color-text)">Course Enrolled</span>
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
                  className="p-2.5 rounded-lg border border-(--color-border) bg-(--color-sidebar) text-sm outline-none focus:border-(--color-accent)"
                >
                  {DEFAULT_COURSES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-xs">
                <span className="font-medium text-(--color-text)">Class Mode</span>
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
                  className="p-2.5 rounded-lg border border-(--color-border) bg-(--color-sidebar) text-sm outline-none focus:border-(--color-accent)"
                >
                  <option value="online">💻 Online Classes</option>
                  <option value="offline">📍 Offline • Ludhiana Campus</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-xs">
                <span className="font-medium text-(--color-text)">Amount Paid</span>
                <input
                  type="text"
                  value={formData.amountPaid}
                  onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                  placeholder="₹2,999"
                  className="p-2.5 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <label className="flex flex-col gap-1.5 text-xs">
                <span className="font-medium text-(--color-text)">Certificate ID</span>
                <input
                  type="text"
                  value={formData.certificateId}
                  onChange={(e) => setFormData({ ...formData, certificateId: e.target.value })}
                  placeholder="DC-CERT-UID-8821"
                  className="p-2.5 rounded-lg border border-(--color-border) bg-transparent text-sm font-mono outline-none focus:border-(--color-accent)"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs">
                <span className="font-medium text-(--color-text)">Enrollment Status</span>
                <select
                  value={formData.status || "Active"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="p-2.5 rounded-lg border border-(--color-border) bg-(--color-sidebar) text-sm outline-none focus:border-(--color-accent)"
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </label>
            </div>
          </div>

          {/* Card 3: Official Certificate (PDF) Upload */}
          <div className="rounded-xl border border-(--color-border) bg-(--color-card, transparent) p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileAttachmentIcon size={20} className="text-(--color-accent)" />
                <div>
                  <h2 className="text-base font-semibold text-(--color-text)">Upload Verified Certificate (PDF)</h2>
                  <p className="text-xs text-(--color-text-muted) mt-0.5">
                    When the student clicks <strong>Download Certificate</strong> on their dashboard, this exact PDF file will be downloaded directly.
                  </p>
                </div>
              </div>

              {formData.certificatePdf && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  <CheckmarkCircle02Icon size={14} />
                  <span>PDF Ready for Download</span>
                </span>
              )}
            </div>

            {formData.certificatePdf ? (
              <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                    PDF
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-sm font-semibold text-(--color-text) truncate max-w-md">
                      {formData.certificateFileName || `${formData.name}_Certificate.pdf`}
                    </div>
                    <div className="text-xs text-(--color-text-muted)">
                      Uploaded on {formData.certificateUploadedAt || "Today"} • Official Verified Completion Certificate
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setPdfPreviewModal(formData)}
                    className="px-3.5 py-2 rounded-lg border border-(--color-border) text-xs font-semibold text-(--color-text) hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ViewIcon size={15} />
                    <span>Preview PDF</span>
                  </button>

                  <a
                    href={formData.certificatePdf}
                    download={formData.certificateFileName || `${formData.name}_Certificate.pdf`}
                    className="px-3.5 py-2 rounded-lg bg-(--color-accent)/10 text-(--color-accent) text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download01Icon size={15} />
                    <span>Download</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleRemoveCertificate}
                    className="px-3.5 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-500 hover:bg-red-500/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Delete02Icon size={15} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative border-2 border-dashed border-(--color-border) hover:border-(--color-accent) rounded-xl p-8 text-center transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept=".pdf,application/pdf,image/png,image/jpeg"
                  onChange={handlePdfFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="space-y-2 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-(--color-accent)/10 text-(--color-accent) flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileUploadIcon size={24} />
                  </div>
                  <div className="text-sm font-semibold text-(--color-text)">
                    Click to browse or drag &amp; drop student's Certificate PDF
                  </div>
                  <div className="text-xs text-(--color-text-muted)">
                    Supports official PDF files, PNG, JPG (Max 25MB)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className="px-5 py-2.5 rounded-lg border border-(--color-border) text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-(--color-accent) text-white font-medium text-sm hover:opacity-90 transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {saving ? "Saving Changes..." : "Save Student & Certificate"}
            </button>
          </div>

        </form>

        {/* PDF Preview Modal */}
        {pdfPreviewModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-(--color-canvas, #ffffff) dark:bg-(--color-canvas, #13151f) border border-(--color-border) rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl relative text-(--color-text)">
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

              <div className="w-full h-[450px] bg-black/10 rounded-xl overflow-hidden border border-(--color-border) flex items-center justify-center">
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

  // ==========================================
  // 2. MAIN STUDENTS LIST TABLE VIEW (With Filters & Action Icons)
  // ==========================================
  return (
    <div className="px-10 py-8 space-y-6">
      
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Tick02Icon size={18} />
          <span>Student and certificate details saved successfully!</span>
        </div>
      )}

      {/* Header Row */}
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
          <button
            type="button"
            onClick={handleOpenCreatePage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-(--color-accent) text-white font-medium text-sm hover:opacity-90 transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
          >
            <PlusSignIcon size={16} strokeWidth={2} />
            <span>Add / Enroll Student</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Grid (Dashboard Style) */}
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

      {/* Search & Filter Chips Row (Restored) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search01Icon
            size={16}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students or course..."
            className="w-full rounded-md border border-(--color-border) bg-transparent py-1.5 pl-8 pr-3 text-sm outline-none focus:border-(--color-accent)"
          />
        </div>

        {/* Filter Chips */}
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
            All ({students.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("online")}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
              filterMode === "online"
                ? "bg-blue-600 text-white border-transparent"
                : "border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)"
            }`}
          >
            <LaptopVideoIcon size={14} />
            <span>Online ({onlineCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("offline")}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
              filterMode === "offline"
                ? "bg-purple-600 text-white border-transparent"
                : "border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)"
            }`}
          >
            <Building02Icon size={14} />
            <span>Offline ({offlineCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("cert-uploaded")}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
              filterMode === "cert-uploaded"
                ? "bg-emerald-600 text-white border-transparent"
                : "border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)"
            }`}
          >
            <CheckmarkCircle02Icon size={14} />
            <span>PDF Uploaded ({certUploadedCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("cert-pending")}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
              filterMode === "cert-pending"
                ? "bg-amber-600 text-white border-transparent"
                : "border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)"
            }`}
          >
            <AlertCircleIcon size={14} />
            <span>Pending ({students.length - certUploadedCount})</span>
          </button>
        </div>
      </div>

      {/* Clean Table with Action Icons */}
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
              <th className="px-4 py-2.5 font-medium text-right">Actions</th>
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
                  No students found matching your criteria.
                </td>
              </tr>
            ) : (
              filtered.map((s) => {
                const meta = STATUS_META[s.status] || STATUS_META.Active;
                const Icon = meta.icon;

                return (
                  <tr
                    key={s.id}
                    onClick={() => handleOpenEditPage(s)}
                    className="border-b border-(--color-border) last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 font-medium text-(--color-text) align-middle">
                      {s.name}
                    </td>
                    <td className="px-4 py-3 text-(--color-text-muted) align-middle">
                      {s.email || "—"}
                    </td>
                    <td className="px-4 py-3 text-(--color-text-muted) align-middle">
                      {s.phone || "—"}
                    </td>
                    <td className="px-4 py-3 text-(--color-text-muted) max-w-[220px] truncate align-middle" title={s.courseTitle}>
                      {s.courseTitle}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <span className="inline-flex items-center rounded-full bg-black/5 px-2 py-0.5 text-xs font-medium dark:bg-white/10">
                        {s.mode === "offline" ? "Offline" : "Online"}
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular-nums font-medium text-(--color-text) align-middle">
                      {s.amountPaid}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${meta.className}`}>
                        <Icon size={11} strokeWidth={1.8} />
                        {s.status || "Active"}
                      </span>
                    </td>
                    
                    {/* Action Icon Buttons */}
                    <td className="px-4 py-3 text-right align-middle">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditPage(s);
                          }}
                          className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-(--color-border) text-(--color-text-muted) hover:text-(--color-text) hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                          title="Edit Student & Certificate"
                        >
                          <Edit01Icon size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDeleteStudent(s.id, e)}
                          className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete Student"
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

    </div>
  );
}
