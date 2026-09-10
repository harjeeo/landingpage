import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../lib/auth';
import { getPublicConfig, getActiveEnrollments } from '../lib/payments';
import {
  Video01Icon,
  Calendar03Icon,
  Clock01Icon,
  Book02Icon,
  Mortarboard01Icon,
  DashboardSquare01Icon,
  Layers01Icon,
  Search01Icon,
  Copy01Icon,
  UserCircleIcon,
  SparklesIcon,
  AlertCircleIcon,
  Comment01Icon,
  Tick02Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  Building02Icon,
  LaptopVideoIcon
} from 'hugeicons-react';

export default function MyLearningPage() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [enrollments, setEnrollments] = useState(getActiveEnrollments());
  const [liveSettings, setLiveSettings] = useState(null);
  const [adminStudentsList, setAdminStudentsList] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMeetModal, setActiveMeetModal] = useState(null);
  const [selectedCertCourse, setSelectedCertCourse] = useState(null);
  const [certDownloadedToast, setCertDownloadedToast] = useState(false);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setEnrollments(getActiveEnrollments());
    const onEnrollmentChange = () => setEnrollments(getActiveEnrollments());
    window.addEventListener('dcskills_enrollment_updated', onEnrollmentChange);

    getPublicConfig(true).then((data) => {
      if (data) {
        if (data.liveClassesSettings) {
          setLiveSettings(data.liveClassesSettings);
        }
        if (data.studentsList) {
          setAdminStudentsList(data.studentsList);
        }
      }
    });

    return () => window.removeEventListener('dcskills_enrollment_updated', onEnrollmentChange);
  }, []);

  const studentName = currentUser?.displayName || currentUser?.name || currentUser?.fullName || 'Student';

  // Dynamic list of purchased courses from actual user enrollments
  const purchasedList = useMemo(() => {
    if (enrollments && enrollments.length > 0) {
      return enrollments.map((en, idx) => ({
        id: en.orderId || en.paymentId || `purchased-${idx}`,
        courseSlug: en.courseSlug || 'ui-design-masterclass',
        courseTitle: en.courseTitle || 'UI Design Masterclass — Next-Gen UI Design with AI',
        mode: en.classMode === 'offline' ? 'offline' : 'online',
        location: en.classMode === 'offline' ? 'Ludhiana Campus' : 'Live Interactive Google Meet',
        amount: en.amountPaid ? `₹${Number(en.amountPaid).toLocaleString('en-IN')}` : (en.classMode === 'offline' ? '₹4,999' : '₹2,999'),
        date: en.enrolledAt ? new Date(en.enrolledAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '08 Sep 2026',
        time: en.enrolledAt ? new Date(en.enrolledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '07:30 PM',
        status: 'Active',
        certificateId: `DC-CERT-${(en.courseSlug || 'UI').substring(0, 4).toUpperCase()}-${1000 + idx}`,
      }));
    }

    // Fallback Mock Enrolled Courses for Demo
    return [
      {
        id: 'purchased-1',
        courseSlug: 'ui-design-masterclass',
        courseTitle: 'UI Design Masterclass — Next-Gen UI Design with AI',
        mode: 'online',
        location: 'Live Interactive Google Meet',
        amount: '₹2,999',
        date: '08 Sep 2026',
        time: '07:30 PM',
        status: 'Active',
        certificateId: 'DC-CERT-UID-1000',
      },
      {
        id: 'purchased-2',
        courseSlug: 'graphic-design-mastery',
        courseTitle: 'Graphic Design & AI Mastery',
        mode: 'offline',
        location: 'Ludhiana Campus',
        amount: '₹4,999',
        date: '05 Sep 2026',
        time: '11:15 AM',
        status: 'Active',
        certificateId: 'DC-CERT-GRD-5519',
      }
    ];
  }, [enrollments]);

  // Filtered purchased courses by search
  const filteredPurchasedList = useMemo(() => {
    if (!searchQuery.trim()) return purchasedList;
    const q = searchQuery.toLowerCase();
    return purchasedList.filter((item) =>
      item.courseTitle.toLowerCase().includes(q) ||
      item.certificateId.toLowerCase().includes(q) ||
      item.mode.toLowerCase().includes(q)
    );
  }, [purchasedList, searchQuery]);

  // Live class fallback details
  const nextLiveClass = liveSettings?.todayClass ? {
    courseName: liveSettings.todayClass.courseTitle,
    nextSessionTopic: liveSettings.todayClass.topic,
    batchCode: liveSettings.todayClass.batchCode,
    nextSessionTime: liveSettings.todayClass.time,
    mentorName: liveSettings.todayClass.mentor,
    platform: liveSettings.todayClass.platform,
    meetLink: liveSettings.todayClass.meetLink,
    isLive: liveSettings.todayClass.isLive !== false,
  } : {
    courseName: 'UI/UX Design Masterclass',
    nextSessionTopic: 'Mastering Figma Auto Layout, Variables & Component Props',
    batchCode: 'Batch #04 (Evening)',
    nextSessionTime: 'Today at 7:00 PM',
    mentorName: 'Harpreet Singh',
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/dc-uiux-live',
    isLive: true,
  };

  const handleCopyMeetLink = (link) => {
    navigator.clipboard?.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadCertificate = (item) => {
    // 1. Look for uploaded PDF certificate for this student & course
    const candidateList = adminStudentsList.length > 0 ? adminStudentsList : (liveSettings?.studentsList || []);
    const matched = candidateList.find((s) => {
      if (!s) return false;
      const matchId = s.certificateId && item.certificateId && s.certificateId === item.certificateId;
      const matchEmail = s.email && currentUser?.email && s.email.toLowerCase() === currentUser.email.toLowerCase();
      const matchName = s.name && studentName && s.name.toLowerCase() === studentName.toLowerCase();
      const matchCourse = s.courseSlug && item.courseSlug && s.courseSlug === item.courseSlug;

      return matchId || (matchCourse && (matchEmail || matchName)) || matchCourse;
    });

    if (matched && matched.certificatePdf) {
      // Direct instant download of the PDF certificate uploaded by Super Admin
      const link = document.createElement('a');
      link.href = matched.certificatePdf;
      const safeName = (studentName || 'Student').replace(/[^a-zA-Z0-9_-]/g, '_');
      const safeCourse = (item.courseSlug || 'Course').replace(/[^a-zA-Z0-9_-]/g, '_');
      link.download = matched.certificateFileName || `${safeName}_${safeCourse}_Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setCertDownloadedToast(true);
      setTimeout(() => setCertDownloadedToast(false), 3500);
      return;
    }

    // 2. Fallback: Open Certificate modal to view/print dynamic high-res certificate
    setSelectedCertCourse(item);
  };

  return (
    <div className="min-h-screen bg-[#0c0e15] text-slate-100 font-sans pb-24 selection:bg-[#0bc40e] selection:text-black">
      
      {/* Sub-navigation Header Bar */}
      <div className="border-b border-white/10 bg-[#0f111a]/80 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Sub-nav Links */}
            <nav className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none text-xs font-semibold pt-3">
              <Link
                to="/dashboard"
                className="pb-3 text-[#a1a1aa] hover:text-white transition-all relative flex items-center gap-1.5"
              >
                <DashboardSquare01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/my-learning"
                className="pb-3 text-white font-bold transition-all relative flex items-center gap-1.5"
              >
                <Mortarboard01Icon className="w-3.5 h-3.5 text-[#0bc40e]" />
                <span>My Learning</span>
                <span className="px-1.5 py-0.2 bg-white/10 text-slate-200 border border-white/10 rounded-full text-[10px] font-bold">
                  {purchasedList.length} {purchasedList.length === 1 ? 'Course' : 'Courses'}
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0bc40e] rounded-full shadow-xs shadow-[#0bc40e]/40"></div>
              </Link>

              <Link
                to="/courses"
                className="pb-3 text-[#a1a1aa] hover:text-white transition-all relative flex items-center gap-1.5"
              >
                <Layers01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                <span>Browse Courses</span>
              </Link>

              <Link
                to="/profile"
                className="pb-3 text-[#a1a1aa] hover:text-white transition-all relative flex items-center gap-1.5"
              >
                <UserCircleIcon className="w-3.5 h-3.5 text-[#71717a] hover:text-[#0bc40e] transition-colors" />
                <span>Student Profile</span>
              </Link>
            </nav>

            {/* Quick Search Control */}
            <div className="flex items-center pb-2 sm:pb-0 sm:self-center">
              <div className="relative w-56 sm:w-72 h-8.5 flex items-center">
                <Search01Icon className="w-3.5 h-3.5 text-[#71717a] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search enrolled courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full bg-[#181a24] border border-white/10 rounded-full pl-8 pr-3 text-xs text-white placeholder:text-[#71717a] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all leading-none"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-9">

        {/* Certificate Download Toast */}
        {certDownloadedToast && (
          <div className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-white shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-bold text-sm shrink-0">
              ✓
            </div>
            <div>
              <div className="text-xs font-bold text-white">Certificate PDF Downloaded!</div>
              <div className="text-[11px] text-emerald-200">Your official completion certificate has been saved to your downloads.</div>
            </div>
          </div>
        )}

        {/* SECTION 1: Top Live Class Alert Banner (Clean, Minimalist & Modern) */}
        <section className="relative overflow-hidden rounded-2xl bg-[#13151f] border border-white/10 hover:border-white/15 p-5 sm:p-7 shadow-xl shadow-black/30 transition-all">
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left Info */}
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  TODAY'S LIVE CLASS
                </span>
                <span className="text-xs text-[#71717a] font-medium">
                  {nextLiveClass.batchCode}
                </span>
              </div>

              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {nextLiveClass.nextSessionTopic}
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#a1a1aa] mt-2 font-medium">
                  <span className="text-slate-200 flex items-center gap-1.5">
                    <Clock01Icon className="w-3.5 h-3.5 text-[#a1a1aa]" />
                    {nextLiveClass.nextSessionTime} (IST)
                  </span>
                  <span>•</span>
                  <span>Mentor: <strong className="text-white">{nextLiveClass.mentorName}</strong></span>
                  <span>•</span>
                  <span className="text-slate-300 flex items-center gap-1">
                    <Video01Icon className="w-3.5 h-3.5 text-[#a1a1aa]" />
                    {nextLiveClass.platform}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setActiveMeetModal(nextLiveClass)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Video01Icon className="w-4 h-4 text-slate-950" />
                <span>Join Live Class</span>
              </button>

              <button
                onClick={() => handleCopyMeetLink(nextLiveClass.meetLink)}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-[#181a24] hover:bg-[#232736] text-[#dfdfe2] border border-white/10 hover:border-white/20 font-medium text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Copy Google Meet Link"
              >
                {copiedLink ? (
                  <>
                    <Tick02Icon className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy01Icon className="w-3.5 h-3.5 text-[#a1a1aa]" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </section>

        {/* SECTION 2: My Purchased Courses List (Exact same UI as Image 2) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Book02Icon className="w-5 h-5 text-[#0bc40e]" />
                My Purchased Courses
              </h2>
              <p className="text-xs text-[#71717a] mt-0.5">
                List of all courses enrolled under your account with downloadable verified certificates
              </p>
            </div>
            
            <Link
              to="/courses"
              className="text-xs text-slate-300 hover:text-white font-semibold flex items-center gap-1 self-start sm:self-auto"
            >
              <span>+ Explore More Courses</span>
              <ArrowRight01Icon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Simple List Container */}
          <div className="bg-[#13151f] rounded-2xl border border-white/10 overflow-hidden shadow-xl divide-y divide-white/5">
            {filteredPurchasedList.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Left: Course Details & Mode */}
                <div className="space-y-2.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.mode === 'offline' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-full">
                        <Building02Icon className="w-3.5 h-3.5 text-purple-400" />
                        <span>Offline • Ludhiana</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 bg-blue-500/15 border border-blue-500/30 px-3 py-1 rounded-full">
                        <LaptopVideoIcon className="w-3.5 h-3.5 text-blue-400" />
                        <span>Online Classes</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                      <CheckmarkCircle02Icon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Enrolled &amp; Active</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a1a1aa] bg-white/5 border border-white/10 px-3 py-1 rounded-full font-mono">
                      <span className="text-[#71717a] font-sans font-normal">ID:</span>
                      <span>{item.certificateId}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                    {item.courseTitle}
                  </h3>
                </div>

                {/* Middle: Badges for Date, Time & Amount */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
                  {/* Date Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181a24] border border-white/10 text-xs font-semibold text-slate-200 shadow-xs">
                    <Calendar03Icon className="w-3.5 h-3.5 text-[#0bc40e]" />
                    <span className="text-[#71717a] font-normal">Date:</span>
                    <span className="text-white">{item.date}</span>
                  </div>

                  {/* Time Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181a24] border border-white/10 text-xs font-semibold text-slate-200 shadow-xs">
                    <Clock01Icon className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[#71717a] font-normal">Time:</span>
                    <span className="text-white">{item.time}</span>
                  </div>

                  {/* Amount Paid Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-300 shadow-xs">
                    <span className="text-emerald-400/80 font-normal">Paid:</span>
                    <span className="font-bold text-emerald-300">{item.amount}</span>
                  </div>
                </div>

                {/* Right: Download Certificate Button */}
                <div className="shrink-0 flex items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                  <button
                    type="button"
                    onClick={() => handleDownloadCertificate(item)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download Certificate</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: 1-on-1 Doubt Support Card */}
        <section className="bg-[#13151f] border border-white/10 hover:border-white/15 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Have a Doubt Before Today's Live Class?
              </h3>
              <p className="text-xs text-[#71717a] mt-0.5">
                Reach out to your mentor directly on WhatsApp or ask in the batch group.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919999999999?text=Hi%20Mentor,%20I%20have%20a%20doubt%20regarding%20the%20live%20class"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#181a24] hover:bg-[#232736] text-white border border-white/10 font-semibold text-xs transition-all shrink-0 flex items-center gap-2"
          >
            <Comment01Icon className="w-4 h-4 text-emerald-400" />
            <span>Ask Mentor on WhatsApp</span>
          </a>
        </section>

      </main>

      {/* MODAL 1: Join Live Class Modal */}
      {activeMeetModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#13151f] rounded-3xl border border-white/15 max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl relative text-white animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Live Classroom Link
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {activeMeetModal.topic || activeMeetModal.nextSessionTopic || activeMeetModal.courseName}
                </h3>
              </div>
              <button
                onClick={() => setActiveMeetModal(null)}
                className="text-[#71717a] hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Platform Banner */}
            <div className="bg-[#181a24] rounded-2xl border border-white/10 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#a1a1aa]">Platform:</span>
                <strong className="text-white">{activeMeetModal.platform || 'Google Meet'}</strong>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#a1a1aa]">Meeting Link:</span>
                <span className="text-emerald-400 font-mono text-[11px] truncate max-w-[200px]">
                  {activeMeetModal.meetLink}
                </span>
              </div>
            </div>

            {/* Guidelines */}
            <div className="space-y-1.5 text-xs text-[#a1a1aa] bg-white/5 rounded-xl p-3.5 border border-white/5">
              <h5 className="font-bold text-white flex items-center gap-1.5">
                <AlertCircleIcon className="w-3.5 h-3.5 text-slate-300" />
                Live Class Guidelines:
              </h5>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                <li>Please join 5 minutes before scheduled start time.</li>
                <li>Keep your microphone on mute during explanations.</li>
                <li>Use the chat box or raise hand feature to ask questions.</li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={activeMeetModal.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActiveMeetModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all text-center shadow-md flex items-center justify-center gap-1.5"
              >
                <Video01Icon className="w-4 h-4 text-slate-950" />
                <span>Launch Meeting</span>
              </a>

              <button
                onClick={() => handleCopyMeetLink(activeMeetModal.meetLink)}
                className="py-2.5 px-4 rounded-xl bg-[#181a24] hover:bg-[#232736] text-white border border-white/10 text-xs font-semibold cursor-pointer"
              >
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Certificate of Completion Modal */}
      {selectedCertCourse && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white my-8">
            
            {/* Modal Header Controls */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0bc40e]/20 text-[#0bc40e] flex items-center justify-center font-bold">
                  🎓
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Verified Certificate of Completion</h3>
                  <span className="text-xs text-[#a1a1aa]">Credential ID: {selectedCertCourse.certificateId}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCertCourse(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Printable Certificate Canvas Card */}
            <div className="relative bg-gradient-to-b from-[#0c0e15] to-[#13151f] border-4 border-amber-400/40 rounded-2xl p-6 sm:p-10 text-center space-y-6 shadow-2xl overflow-hidden">
              
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 rounded-tl pointer-events-none" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400/60 rounded-tr pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400/60 rounded-bl pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 rounded-br pointer-events-none" />
              
              {/* Academy Brand Header */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
                  DESIGNS CLUE SKILLS ACADEMY
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide uppercase">
                  Certificate of Completion
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
              </div>

              {/* Recipient */}
              <div className="space-y-2 py-2">
                <p className="text-xs uppercase tracking-widest text-[#a1a1aa] font-medium">
                  This is proudly presented to
                </p>
                <div className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight underline decoration-amber-400/40 underline-offset-8">
                  {studentName}
                </div>
              </div>

              {/* Course Accomplishment Description */}
              <div className="space-y-2 max-w-lg mx-auto">
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  for successfully mastering the curriculum and completing all practical projects in
                </p>
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                  {selectedCertCourse.courseTitle}
                </h4>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    {selectedCertCourse.mode === 'offline' ? '📍 In-Person Studio (Ludhiana)' : '💻 Online Live Masterclass'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Issued: {selectedCertCourse.date}
                  </span>
                </div>
              </div>

              {/* Signatures & Seal */}
              <div className="pt-6 border-t border-white/10 flex items-end justify-between gap-4 text-left">
                <div className="space-y-1">
                  <div className="font-serif italic text-base text-amber-300">Harpreet Singh</div>
                  <div className="text-[10px] text-slate-400 border-t border-slate-700 pt-1 font-semibold uppercase tracking-wider">
                    Lead Mentor &amp; Founder
                  </div>
                </div>

                {/* Verified Golden Badge */}
                <div className="w-14 h-14 rounded-full border-2 border-amber-400/60 bg-amber-500/10 text-amber-400 flex flex-col items-center justify-center text-[8px] font-black uppercase tracking-tighter shrink-0 shadow-lg shadow-amber-500/20">
                  <span>★ VERIFIED ★</span>
                  <span className="text-[7px] text-amber-300">DC SKILLS</span>
                </div>

                <div className="space-y-1 text-right">
                  <div className="font-mono text-xs text-slate-300">{selectedCertCourse.certificateId}</div>
                  <div className="text-[10px] text-slate-400 border-t border-slate-700 pt-1 font-semibold uppercase tracking-wider">
                    Verified Credential ID
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-[#a1a1aa] text-center sm:text-left">
                ✓ Shareable on LinkedIn, Resume &amp; Portfolio
              </span>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-bold text-xs transition-all shadow-md shadow-[#0bc40e]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCertCourse(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
