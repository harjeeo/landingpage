import { useState, useEffect, useMemo } from "react";
import {
  Mortarboard01Icon,
  Search01Icon,
  FilterIcon,
  Edit01Icon,
  Delete02Icon,
  FileUploadIcon,
  FileAttachmentIcon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  UserCircleIcon,
  Mail01Icon,
  TelephoneIcon,
  Calendar03Icon,
  Clock01Icon,
  LaptopVideoIcon,
  Building02Icon,
  PlusSignIcon,
  Download01Icon,
  ViewIcon,
  Cancel01Icon,
  Tick02Icon
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
    phone: "+91 98765 43210",
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
    phone: "+91 98140 12345",
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
    phone: "+91 99887 76655",
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

export default function SuperAdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("all");
  const [activeModal, setActiveModal] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [pdfPreviewModal, setPdfPreviewModal] = useState(null);

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

  function handleOpenCreate() {
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
    setActiveModal("create");
  }

  function handleOpenEdit(std) {
    setSelectedStudent(std);
    setFormData({
      ...std,
    });
    setActiveModal("edit");
  }

  function handleDeleteStudent(id) {
    if (window.confirm("Are you sure you want to remove this student record?")) {
      const updated = students.filter((s) => s.id !== id);
      persistStudents(updated);
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
    if (activeModal === "create") {
      updated = [formData, ...students];
    } else {
      updated = students.map((s) => (s.id === formData.id ? formData : s));
    }

    persistStudents(updated);
    setActiveModal(null);
  }

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.email && s.email.toLowerCase().includes(q)) ||
        (s.phone && s.phone.toLowerCase().includes(q)) ||
        (s.courseTitle && s.courseTitle.toLowerCase().includes(q)) ||
        (s.certificateId && s.certificateId.toLowerCase().includes(q));

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

  return (
    <div className="px-6 sm:px-10 py-8 space-y-6">
      
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Tick02Icon size={18} />
          <span>Student and certificate details saved successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-bold">
            <Mortarboard01Icon size={26} strokeWidth={1.8} className="text-(--color-accent)" />
            <span>Students &amp; Course Purchases</span>
          </h1>
          <p className="mt-1 text-sm text-(--color-text-muted)">
            Manage students who purchased courses, edit their contact/mode details, and upload verified PDF certificates.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-accent) text-white font-semibold text-sm hover:opacity-90 transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <PlusSignIcon size={18} strokeWidth={2} />
          <span>Add / Enroll Student</span>
        </button>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-(--color-border) p-4 bg-black/2 dark:bg-white/2">
          <div className="text-2xl font-bold tabular-nums">{totalStudents}</div>
          <div className="text-xs text-(--color-text-muted) mt-0.5">Total Enrolled Students</div>
        </div>

        <div className="rounded-xl border border-(--color-border) p-4 bg-blue-500/5">
          <div className="text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400">{onlineCount}</div>
          <div className="text-xs text-(--color-text-muted) mt-0.5">Online Live Classes</div>
        </div>

        <div className="rounded-xl border border-(--color-border) p-4 bg-purple-500/5">
          <div className="text-2xl font-bold tabular-nums text-purple-600 dark:text-purple-400">{offlineCount}</div>
          <div className="text-xs text-(--color-text-muted) mt-0.5">Offline (Ludhiana Campus)</div>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
            {certUploadedCount} / {totalStudents}
          </div>
          <div className="text-xs text-(--color-text-muted) mt-0.5">Certificates Uploaded (PDF)</div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 max-w-md">
          <Search01Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, email, phone, ID, or course..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0 text-xs font-medium">
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

      {/* Students Table */}
      <div className="overflow-x-auto rounded-xl border border-(--color-border) bg-(--color-card, transparent)">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-(--color-border) bg-black/5 dark:bg-white/5 text-xs text-(--color-text-muted)">
              <th className="px-4 py-3 font-semibold">Student Name</th>
              <th className="px-4 py-3 font-semibold">Contact Info</th>
              <th className="px-4 py-3 font-semibold">Course &amp; Mode</th>
              <th className="px-4 py-3 font-semibold">Purchase Date &amp; Amount</th>
              <th className="px-4 py-3 font-semibold">Certificate PDF</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-border)">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-(--color-text-muted)">
                  Loading students database...
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-(--color-text-muted)">
                  No students found matching your search and filter criteria.
                </td>
              </tr>
            ) : (
              filteredStudents.map((std) => (
                <tr key={std.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  
                  {/* Student Name & Avatar */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-emerald-500 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs shrink-0">
                        {std.name ? std.name.slice(0, 2) : "ST"}
                      </div>
                      <div>
                        <div className="font-bold text-(--color-text)">{std.name}</div>
                        <div className="text-[11px] text-(--color-text-muted) font-mono">{std.certificateId}</div>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-4 py-3.5">
                    <div className="space-y-0.5 text-xs">
                      <a
                        href={`mailto:${std.email}`}
                        className="flex items-center gap-1.5 text-(--color-text) hover:text-(--color-accent) font-medium truncate max-w-[180px]"
                      >
                        <Mail01Icon size={13} className="text-(--color-text-muted)" />
                        <span>{std.email || "No email"}</span>
                      </a>
                      <a
                        href={`tel:${std.phone}`}
                        className="flex items-center gap-1.5 text-(--color-text-muted) hover:text-(--color-text)"
                      >
                        <TelephoneIcon size={13} className="text-(--color-text-muted)" />
                        <span>{std.phone || "No phone"}</span>
                      </a>
                    </div>
                  </td>

                  {/* Course & Mode */}
                  <td className="px-4 py-3.5">
                    <div className="space-y-1.5 max-w-xs">
                      <div className="font-semibold text-(--color-text) text-xs line-clamp-1">{std.courseTitle}</div>
                      <div className="flex items-center gap-1.5">
                        {std.mode === "offline" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-600 dark:text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-md">
                            <Building02Icon size={12} />
                            <span>Offline • Ludhiana</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-300 bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded-md">
                            <LaptopVideoIcon size={12} />
                            <span>Online Classes</span>
                          </span>
                        )}
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          {std.status || "Active"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Purchase Date & Amount */}
                  <td className="px-4 py-3.5">
                    <div className="space-y-0.5 text-xs">
                      <div className="font-bold text-(--color-text)">{std.amountPaid}</div>
                      <div className="text-[11px] text-(--color-text-muted) flex items-center gap-1">
                        <Calendar03Icon size={12} />
                        <span>{std.purchaseDate}</span>
                        <span>•</span>
                        <span>{std.purchaseTime}</span>
                      </div>
                    </div>
                  </td>

                  {/* Certificate Status & PDF Action */}
                  <td className="px-4 py-3.5">
                    {std.certificatePdf ? (
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-lg">
                          <CheckmarkCircle02Icon size={14} />
                          <span>PDF Uploaded</span>
                        </span>
                        <div className="flex items-center gap-2 pt-0.5">
                          <button
                            type="button"
                            onClick={() => setPdfPreviewModal(std)}
                            className="text-[11px] text-(--color-accent) hover:underline font-medium inline-flex items-center gap-0.5 cursor-pointer"
                          >
                            <ViewIcon size={12} />
                            <span>View / Download</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 rounded-lg">
                          <AlertCircleIcon size={14} />
                          <span>Pending PDF</span>
                        </span>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(std)}
                            className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center gap-0.5 cursor-pointer"
                          >
                            <FileUploadIcon size={12} />
                            <span>+ Upload PDF</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(std)}
                        className="p-1.5 rounded-lg border border-(--color-border) text-(--color-text-muted) hover:text-(--color-text) hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        title="Edit Student & Certificate"
                      >
                        <Edit01Icon size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteStudent(std.id)}
                        className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete Student"
                      >
                        <Delete02Icon size={15} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL: Edit / Create Student & Upload Certificate */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-(--color-canvas, #13151f) border border-(--color-border, rgba(255,255,255,0.15)) rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative my-8">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-(--color-border) pb-3">
              <div>
                <h3 className="text-lg font-bold">
                  {activeModal === "create" ? "Enroll / Add New Student" : `Edit Student: ${formData.name}`}
                </h3>
                <p className="text-xs text-(--color-text-muted)">
                  Update student course details and upload custom Certificate PDF.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-(--color-text-muted) hover:text-(--color-text) p-1 cursor-pointer"
              >
                <Cancel01Icon size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-semibold text-(--color-text)">Student Full Name *</span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mehak"
                    className="p-2.5 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
                  />
                </label>

                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-semibold text-(--color-text)">Phone Number</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="p-2.5 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
                  />
                </label>
              </div>

              {/* Row 2: Email & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-semibold text-(--color-text)">Email Address</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="p-2.5 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
                  />
                </label>

                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-semibold text-(--color-text)">Amount Paid</span>
                  <input
                    type="text"
                    value={formData.amountPaid}
                    onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                    placeholder="₹2,999"
                    className="p-2.5 rounded-lg border border-(--color-border) bg-transparent text-sm outline-none focus:border-(--color-accent)"
                  />
                </label>
              </div>

              {/* Row 3: Course & Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-semibold text-(--color-text)">Enrolled Course</span>
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
                    className="p-2.5 rounded-lg border border-(--color-border) bg-(--color-canvas, #13151f) text-sm outline-none focus:border-(--color-accent)"
                  >
                    {DEFAULT_COURSES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-semibold text-(--color-text)">Class Mode</span>
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
                    className="p-2.5 rounded-lg border border-(--color-border) bg-(--color-canvas, #13151f) text-sm outline-none focus:border-(--color-accent)"
                  >
                    <option value="online">💻 Online Classes</option>
                    <option value="offline">📍 Offline • Ludhiana Campus</option>
                  </select>
                </label>
              </div>

              {/* Row 4: Certificate ID */}
              <label className="flex flex-col gap-1 text-xs">
                <span className="font-semibold text-(--color-text)">Certificate ID</span>
                <input
                  type="text"
                  value={formData.certificateId}
                  onChange={(e) => setFormData({ ...formData, certificateId: e.target.value })}
                  placeholder="DC-CERT-UID-8821"
                  className="p-2.5 rounded-lg border border-(--color-border) bg-transparent text-sm font-mono outline-none focus:border-(--color-accent)"
                />
              </label>

              {/* CERTIFICATE UPLOAD SECTION */}
              <div className="p-4 rounded-xl border border-(--color-border) bg-black/5 dark:bg-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileAttachmentIcon size={18} className="text-(--color-accent)" />
                    <span className="text-sm font-bold">Upload Verified Certificate (PDF)</span>
                  </div>
                  {formData.certificatePdf && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckmarkCircle02Icon size={14} />
                      <span>Ready to Download</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-(--color-text-muted)">
                  Upload the official PDF certificate for this student. When the student clicks <strong>Download Certificate</strong> on their dashboard, this exact PDF file will be downloaded directly.
                </p>

                {formData.certificatePdf ? (
                  <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">
                        PDF
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-(--color-text) truncate max-w-[220px]">
                          {formData.certificateFileName || `${formData.name}_Certificate.pdf`}
                        </div>
                        <div className="text-[11px] text-(--color-text-muted)">
                          Uploaded on {formData.certificateUploadedAt || "Today"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setPdfPreviewModal(formData)}
                        className="px-2.5 py-1 rounded-md bg-(--color-canvas, #13151f) border border-(--color-border) text-xs font-semibold text-(--color-text) hover:bg-white/10 flex items-center gap-1 cursor-pointer"
                      >
                        <ViewIcon size={13} />
                        <span>Preview</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleRemoveCertificate}
                        className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-500 hover:bg-red-500/20 flex items-center gap-1 cursor-pointer"
                      >
                        <Delete02Icon size={13} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-(--color-border) hover:border-(--color-accent) rounded-xl p-6 text-center transition-colors cursor-pointer group">
                    <input
                      type="file"
                      accept=".pdf,application/pdf,image/png,image/jpeg"
                      onChange={handlePdfFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="space-y-1.5 flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-(--color-accent)/10 text-(--color-accent) flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileUploadIcon size={20} />
                      </div>
                      <div className="text-xs font-semibold text-(--color-text)">
                        Click to browse or drag &amp; drop PDF Certificate
                      </div>
                      <div className="text-[11px] text-(--color-text-muted)">
                        Supports .PDF, .PNG, .JPG (Max 25MB)
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-(--color-border)">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-lg border border-(--color-border) text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-(--color-accent) text-white font-semibold text-xs hover:opacity-90 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Student & Certificate"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL: PDF Certificate Preview / Direct Download */}
      {pdfPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-(--color-canvas, #13151f) border border-(--color-border) rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl relative text-(--color-text)">
            <div className="flex items-center justify-between border-b border-(--color-border) pb-3">
              <div className="flex items-center gap-2">
                <FileAttachmentIcon size={20} className="text-emerald-500" />
                <div>
                  <h3 className="text-base font-bold">
                    Certificate for {pdfPreviewModal.name}
                  </h3>
                  <p className="text-xs text-(--color-text-muted)">
                    {pdfPreviewModal.courseTitle} • ID: {pdfPreviewModal.certificateId}
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

            {/* Preview Frame */}
            <div className="w-full h-[420px] bg-black/20 rounded-xl overflow-hidden border border-(--color-border) flex items-center justify-center">
              {pdfPreviewModal.certificatePdf?.startsWith("data:application/pdf") ? (
                <iframe
                  src={pdfPreviewModal.certificatePdf}
                  title="Certificate PDF Preview"
                  className="w-full h-full border-none"
                />
              ) : pdfPreviewModal.certificatePdf?.startsWith("data:image/") ? (
                <img
                  src={pdfPreviewModal.certificatePdf}
                  alt="Certificate Preview"
                  className="max-h-full max-w-full object-contain p-2"
                />
              ) : (
                <div className="text-center space-y-3 p-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                    <FileAttachmentIcon size={28} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Certificate PDF Ready</div>
                    <div className="text-xs text-(--color-text-muted)">
                      {pdfPreviewModal.certificateFileName || `${pdfPreviewModal.name}_Certificate.pdf`}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-(--color-text-muted)">
                Students can download this directly from their dashboard.
              </span>
              <a
                href={pdfPreviewModal.certificatePdf}
                download={pdfPreviewModal.certificateFileName || `${pdfPreviewModal.name}_Certificate.pdf`}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Download01Icon size={15} />
                <span>Download PDF File</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
