import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getCurrentUser, logout } from '../lib/auth';
import { getActiveEnrollments, getPublicConfig } from '../lib/payments';
import {
  DashboardSquare01Icon,
  Mortarboard01Icon,
  Layers01Icon,
  FavouriteIcon,
  Search01Icon,
  Video01Icon,
  Calendar03Icon,
  Clock01Icon,
  Book02Icon,
  Tick02Icon,
  Copy01Icon,
  FileAttachmentIcon,
  AlertCircleIcon,
  Comment01Icon,
  SparklesIcon,
  ArrowRight01Icon,
  Notification01Icon,
  CheckmarkCircle02Icon,
  UserCircleIcon
} from 'hugeicons-react';

// Student Mock Data
const STUDENT_PROFILE = {
  name: 'Harpreet Singh',
  avatar: 'HS',
  email: 'harpreet@example.com',
  totalPurchasedCourses: 2,
  attendancePercentage: 83,
  completedSessions: 20,
  totalSessions: 24,
  upcomingThisWeek: 3,
  pendingAssignments: 1
};

// Purchased Live Courses Fallback
const PURCHASED_COURSES = [
  {
    id: 'course-1',
    courseTitle: 'UI/UX Design Masterclass',
    badge: 'Live Interactive Batch',
    batchCode: 'Batch #04 (Evening)',
    mentor: 'Harpreet Singh',
    mentorRole: 'Lead Product Designer',
    purchaseDate: '15 Aug 2026',
    pricePaid: '₹4,999',
    access: 'Lifetime Access',
    schedule: 'Mon, Wed, Fri • 7:00 PM – 8:30 PM IST',
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/dc-uiux-live',
    whatsappLink: 'https://chat.whatsapp.com/sample-uiux-batch',
    progress: 58,
    sessionsCompleted: 14,
    totalSessions: 24,
    nextClass: 'Today, 7:00 PM',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'course-2',
    courseTitle: 'Graphic Design & AI Mastery',
    badge: 'Weekend Live Batch',
    batchCode: 'Batch #02 (Weekend)',
    mentor: 'Harpreet Singh',
    mentorRole: 'Creative Director',
    purchaseDate: '22 Aug 2026',
    pricePaid: '₹3,999',
    access: 'Lifetime Access',
    schedule: 'Sat & Sun • 11:00 AM – 1:00 PM IST',
    platform: 'Zoom Meeting',
    meetLink: 'https://zoom.us/j/sample-graphic-design',
    whatsappLink: 'https://chat.whatsapp.com/sample-gd-batch',
    progress: 38,
    sessionsCompleted: 6,
    totalSessions: 16,
    nextClass: 'Saturday, 11:00 AM',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80'
  }
];

// Today's Live Class Fallback
const TODAY_CLASS = {
  isLive: true,
  courseTitle: 'UI/UX Design Masterclass',
  topic: 'Mastering Figma Auto Layout, Variables & Component Props',
  batchCode: 'Batch #04 (Evening)',
  mentor: 'Harpreet Singh',
  time: 'Today, 7:00 PM – 8:30 PM IST',
  platform: 'Google Meet',
  meetLink: 'https://meet.google.com/dc-uiux-live'
};

// Upcoming Sessions This Week Fallback
const WEEK_SESSIONS = [
  {
    id: 'sess-1',
    day: 'Today',
    date: '8 Sep',
    time: '7:00 PM',
    course: 'UI/UX Design Masterclass',
    topic: 'Mastering Figma Auto Layout & Component Props',
    isToday: true,
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/dc-uiux-live'
  },
  {
    id: 'sess-2',
    day: 'Wednesday',
    date: '10 Sep',
    time: '7:00 PM',
    course: 'UI/UX Design Masterclass',
    topic: 'UX Research Synthesis, User Personas & Wireflows',
    isToday: false,
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/dc-uiux-live'
  },
  {
    id: 'sess-3',
    day: 'Friday',
    date: '12 Sep',
    time: '7:00 PM',
    course: 'UI/UX Design Masterclass',
    topic: 'Interactive Micro-interactions & Smart Animate',
    isToday: false,
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/dc-uiux-live'
  },
  {
    id: 'sess-4',
    day: 'Saturday',
    date: '13 Sep',
    time: '11:00 AM',
    course: 'Graphic Design & AI Mastery',
    topic: 'Generative Fill & AI Vector Art in Adobe Photoshop',
    isToday: false,
    platform: 'Zoom Meeting',
    meetLink: 'https://zoom.us/j/sample-graphic-design'
  }
];

// Assignments Overview
const ASSIGNMENTS_LIST = [
  {
    id: 'asg-1',
    title: 'Spotify Mobile App Redesign (Auto Layout & Constraints)',
    course: 'UI/UX Design Masterclass',
    due: 'Sunday, 14 Sep (in 2 days)',
    status: 'pending',
    tag: '⏳ Due Soon'
  },
  {
    id: 'asg-2',
    title: 'E-Commerce Checkout Flow & Form Optimization',
    course: 'UI/UX Design Masterclass',
    due: 'Evaluated on 5 Sep',
    status: 'reviewed',
    score: '9.5 / 10 ⭐',
    tag: '✓ Mentor Reviewed'
  }
];

// Batch Notice Board Fallback
const NOTICE_BOARD = [
  {
    id: 'not-1',
    title: 'Figma Starter Kit v2.4 Uploaded',
    desc: 'The updated design system kit for today’s session is available in your My Learning study materials.',
    time: '2 hours ago',
    tag: 'Resource'
  },
  {
    id: 'not-2',
    title: 'Live Q&A at the end of class',
    desc: 'Keep your doubt questions ready for the last 20 minutes of today’s Figma Auto Layout session.',
    time: 'Yesterday',
    tag: 'Announcement'
  }
];

export default function StudentDashboard() {
  const [searchParams] = useSearchParams();
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeMeetModal, setActiveMeetModal] = useState(null);
  const [selectedCertCourse, setSelectedCertCourse] = useState(null);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [enrollments, setEnrollments] = useState(getActiveEnrollments());
  const [liveSettings, setLiveSettings] = useState(null);
  const isEnrolledSuccess = searchParams.get('enrolled') === 'success';

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setEnrollments(getActiveEnrollments());
    
    // Fetch live platform settings (configured by super admin)
    getPublicConfig(true).then((data) => {
      if (data?.liveClassesSettings) {
        setLiveSettings(data.liveClassesSettings);
      }
    });
  }, []);

  const handleCopyMeetLink = (link) => {
    navigator.clipboard?.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const studentName = currentUser?.name || STUDENT_PROFILE.name;
  const todayClass = liveSettings?.todayClass || TODAY_CLASS;
  const weekSessions = liveSettings?.weekSessions?.length > 0 ? liveSettings.weekSessions : WEEK_SESSIONS;
  const batches = liveSettings?.batches?.length > 0 ? liveSettings.batches : PURCHASED_COURSES;
  const noticeBoard = liveSettings?.noticeBoard?.length > 0 ? liveSettings.noticeBoard : NOTICE_BOARD;

  // Student purchased courses list (Combines active enrollments + demo fallback)
  const purchasedList = useMemo(() => {
    if (enrollments && enrollments.length > 0) {
      return enrollments.map((en, idx) => {
        const dt = en.enrolledAt ? new Date(en.enrolledAt) : new Date();
        const dateStr = dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        const timeStr = dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

        return {
          id: en.orderId || en.paymentId || `enr-${idx}`,
          courseTitle: en.courseTitle || 'UI Design Masterclass — Next-Gen UI Design with AI',
          courseSlug: en.courseSlug || 'ui-design-masterclass',
          mode: en.classMode || 'online',
          location: en.location || (en.classMode === 'offline' ? 'Ludhiana Campus' : 'Online / Live'),
          amount: en.amountPaid ? `₹${Number(en.amountPaid).toLocaleString('en-IN')}` : (en.classMode === 'offline' ? '₹4,999' : '₹2,999'),
          date: dateStr,
          time: timeStr,
          status: 'Active',
          certificateId: `DC-CERT-${(en.courseSlug || 'UI').substring(0, 4).toUpperCase()}-${1000 + idx}`,
        };
      });
    }

    // Default fallback demo items matching original purchased courses
    return [
      {
        id: 'dc-pur-1',
        courseTitle: 'UI Design Masterclass — Next-Gen UI Design with AI',
        courseSlug: 'ui-design-masterclass',
        mode: 'online',
        location: 'Online / Live',
        amount: '₹2,999',
        date: '08 Sep 2026',
        time: '04:30 PM',
        status: 'Active',
        certificateId: 'DC-CERT-UID-8821',
      },
      {
        id: 'dc-pur-2',
        courseTitle: 'Graphic Design in 7 Days — Learn, Create & Master AI',
        courseSlug: 'graphic-design-in-7-days',
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

  // Check if current student has access to today's live class course
  const isEnrolledInTodayClass = useMemo(() => {
    if (!todayClass || todayClass.isLive === false) return false;

    const target = (todayClass.targetCourse || 'all').toLowerCase();
    if (target === 'all') return true;

    // 1. Check student's actual active enrollments from localStorage/backend
    if (enrollments && enrollments.length > 0) {
      const hasActive = enrollments.some((e) => {
        if (!e) return false;
        const slug = (e.courseSlug || '').toLowerCase();
        const title = (e.courseTitle || '').toLowerCase();
        const targetTitle = (todayClass.courseTitle || '').toLowerCase();

        return (
          slug === target ||
          slug.includes(target) ||
          target.includes(slug) ||
          (target.includes('ui') && (slug.includes('ui') || title.includes('ui'))) ||
          (target.includes('graphic') && (slug.includes('graphic') || title.includes('graphic'))) ||
          (target.includes('shopify') && (slug.includes('shopify') || title.includes('shopify'))) ||
          (targetTitle && title && (title.includes(targetTitle) || targetTitle.includes(title)))
        );
      });
      return hasActive;
    }

    // 2. Fallback for demo profile based on default enrolled batches
    const batchMatch = batches.some((b) => {
      if (!b) return false;
      const bTitle = (b.courseTitle || b.title || '').toLowerCase();
      const targetTitle = (todayClass.courseTitle || '').toLowerCase();

      return (
        b.id === target ||
        bTitle.includes(target) ||
        (target.includes('ui') && bTitle.includes('ui')) ||
        (target.includes('graphic') && bTitle.includes('graphic')) ||
        (target.includes('shopify') && bTitle.includes('shopify')) ||
        (targetTitle && bTitle.includes(targetTitle))
      );
    });

    return batchMatch;
  }, [todayClass, enrollments, batches]);

  return (
    <div className="min-h-screen bg-[#0c0e15] text-slate-100 font-sans pb-24 selection:bg-[#0bc40e] selection:text-black">
      
      {/* Sub-navigation Header Bar */}
      <div className="border-b border-white/10 bg-[#0f111a]/80 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Sub-nav Links (Single-click React Router Links) */}
            <nav className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none text-xs font-semibold pt-3">
              <Link
                to="/dashboard"
                className="pb-3 text-white font-bold transition-all relative flex items-center gap-1.5"
              >
                <DashboardSquare01Icon className="w-3.5 h-3.5 text-[#0bc40e]" />
                <span>Dashboard</span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0bc40e] rounded-full shadow-xs shadow-[#0bc40e]/40"></div>
              </Link>

              <Link
                to="/my-learning"
                className="pb-3 text-[#a1a1aa] hover:text-white transition-all relative flex items-center gap-1.5"
              >
                <Mortarboard01Icon className="w-3.5 h-3.5 text-[#71717a] hover:text-[#0bc40e] transition-colors" />
                <span>My Learning</span>
                <span className="px-1.5 py-0.2 bg-white/10 text-slate-200 border border-white/10 rounded-full text-[10px] font-bold">
                  {batches.length} Batches
                </span>
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

          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-9">

        {/* Celebratory Banner on Successful Enrollment */}
        {isEnrolledSuccess && (
          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-[#13151f] to-[#13151f] border border-[#0bc40e]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-[#0bc40e]/10 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#0bc40e] text-black flex items-center justify-center font-black text-lg shrink-0 shadow-md shadow-[#0bc40e]/30">
                ✓
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>🎉 Payment &amp; Enrollment Confirmed!</span>
                </h3>
                <p className="text-xs text-[#a1a1aa]">
                  Your learning batch is active. You have full access to live classes, mentor support &amp; lesson files.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#0bc40e] bg-[#0bc40e]/15 border border-[#0bc40e]/30 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
              Active Student
            </span>
          </div>
        )}

        {/* SECTION 1: Welcome Header & 4 Stat Cards */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Welcome back, {studentName} 👋
              </h1>
              <p className="text-xs sm:text-sm text-[#a1a1aa] mt-0.5 font-medium">
                Here is your live classes overview and today's schedule.
              </p>
            </div>

            <Link
              to="/my-learning"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#13151f] hover:bg-[#181a24] border border-white/10 px-3.5 py-2 rounded-xl transition-all self-start sm:self-auto"
            >
              <span>Open Classroom Hub</span>
              <ArrowRight01Icon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            
            {/* Stat 1: Total Courses Purchased */}
            <div className="bg-[#13151f] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-1 hover:border-white/20 transition-all shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a1a1aa] font-medium">Purchased Batches</span>
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <Book02Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {batches.length}
              </div>
              <p className="text-[11px] text-[#71717a] font-medium">
                Lifetime Live Batch Access
              </p>
            </div>

            {/* Stat 2: Attendance Rate */}
            <div className="bg-[#13151f] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-1 hover:border-white/20 transition-all shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a1a1aa] font-medium">Attendance Rate</span>
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <CheckmarkCircle02Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {STUDENT_PROFILE.attendancePercentage}%
              </div>
              <p className="text-[11px] text-[#71717a] font-medium">
                {STUDENT_PROFILE.completedSessions} of {STUDENT_PROFILE.totalSessions} Sessions Attended
              </p>
            </div>

            {/* Stat 3: This Week Classes */}
            <div className="bg-[#13151f] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-1 hover:border-white/20 transition-all shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a1a1aa] font-medium">Classes This Week</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Calendar03Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {weekSessions.length}
              </div>
              <p className="text-[11px] text-emerald-400 font-medium truncate">
                {todayClass?.isLive ? todayClass.time : 'Next session upcoming'}
              </p>
            </div>

            {/* Stat 4: Assignments */}
            <div className="bg-[#13151f] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-1 hover:border-white/20 transition-all shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a1a1aa] font-medium">Pending Tasks</span>
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <FileAttachmentIcon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {STUDENT_PROFILE.pendingAssignments}
              </div>
              <p className="text-[11px] text-amber-400 font-medium">
                1 Assignment Due Sunday
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 2: Today's Live Class Action Launcher */}
        {isEnrolledInTodayClass ? (
          <section className="relative overflow-hidden rounded-2xl bg-[#13151f] border border-white/10 hover:border-white/15 p-5 sm:p-7 shadow-xl shadow-black/30 transition-all">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Info */}
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    TODAY'S LIVE CLASS
                  </span>
                  <span className="text-xs text-[#71717a] font-medium">
                    {todayClass.batchCode}
                  </span>
                  {todayClass.courseTitle && (
                    <span className="text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                      {todayClass.courseTitle}
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {todayClass.topic}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#a1a1aa] mt-2 font-medium">
                    <span className="text-slate-200 flex items-center gap-1.5">
                      <Clock01Icon className="w-3.5 h-3.5 text-[#a1a1aa]" />
                      {todayClass.time}
                    </span>
                    <span>•</span>
                    <span>Mentor: <strong className="text-white">{todayClass.mentor}</strong></span>
                    <span>•</span>
                    <span className="text-slate-300 flex items-center gap-1">
                      <Video01Icon className="w-3.5 h-3.5 text-[#a1a1aa]" />
                      {todayClass.platform || 'Google Meet'}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setActiveMeetModal(todayClass)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Video01Icon className="w-4 h-4 text-slate-950" />
                  <span>Join Live Class</span>
                </button>

                <button
                  onClick={() => handleCopyMeetLink(todayClass.meetLink)}
                  className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-[#181a24] hover:bg-[#232736] text-[#dfdfe2] border border-white/10 hover:border-white/20 font-medium text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Copy Meeting Link"
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
        ) : (
          <section className="rounded-2xl bg-[#13151f] border border-white/10 p-5 sm:p-6 text-center space-y-2">
            <h3 className="text-sm font-semibold text-white">
              {todayClass?.isLive !== false
                ? `Live session scheduled for other cohorts`
                : `No Live Class Scheduled Today`}
            </h3>
            <p className="text-xs text-[#71717a]">
              {todayClass?.isLive !== false
                ? `Today's live class is exclusively for students enrolled in ${todayClass?.courseTitle || 'another course'}. Check your timetable below for your enrolled batch sessions.`
                : `Check your weekly schedule below for your upcoming sessions, or review past recordings.`}
            </p>
          </section>
        )}

        {/* SECTION 3: My Purchased Courses Simple List */}
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
            {purchasedList.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Left: Course Details & Mode */}
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.mode === 'offline' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                        📍 Offline • Ludhiana
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-300 bg-blue-500/15 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                        💻 Online Classes
                      </span>
                    )}
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      ✓ Enrolled &amp; Active
                    </span>
                    <span className="text-[10px] text-[#71717a] font-mono">
                      ID: {item.certificateId}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                    {item.courseTitle}
                  </h3>
                </div>

                {/* Middle: Date, Time & Amount */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#a1a1aa] shrink-0">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#71717a] block uppercase tracking-wider font-semibold">
                      Purchased On
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                      <Calendar03Icon className="w-3.5 h-3.5 text-[#0bc40e]" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#71717a] block uppercase tracking-wider font-semibold">
                      Time
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                      <Clock01Icon className="w-3.5 h-3.5 text-[#a1a1aa]" />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#71717a] block uppercase tracking-wider font-semibold">
                      Amount Paid
                    </span>
                    <div className="text-sm font-bold text-white">
                      {item.amount}
                    </div>
                  </div>
                </div>

                {/* Right: Download Certificate Button */}
                <div className="shrink-0 flex items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                  <button
                    type="button"
                    onClick={() => setSelectedCertCourse(item)}
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



        {/* SECTION 5: Doubt Help Card */}
        <section className="bg-[#13151f] border border-white/10 hover:border-white/15 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Have a Question Before Today's Live Class?
              </h3>
              <p className="text-xs text-[#71717a] mt-0.5">
                Ask your instructor directly on WhatsApp or in the cohort group.
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

      {/* MODAL: Join Live Class Modal */}
      {activeMeetModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#13151f] rounded-3xl border border-white/15 max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl relative text-white animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Live Classroom Link
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {activeMeetModal.topic || activeMeetModal.courseTitle}
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

      {/* MODAL: Certificate of Completion Modal */}
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
