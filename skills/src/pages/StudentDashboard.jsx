import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getCurrentUser } from '../lib/auth';
import { getActiveEnrollments } from '../lib/payments';
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
  Folder01Icon
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

// Purchased Live Courses
const PURCHASED_COURSES = [
  {
    id: 'course-1',
    title: 'UI/UX Design Masterclass',
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
    title: 'Graphic Design & AI Mastery',
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

// Today's Live Class
const TODAY_CLASS = {
  courseTitle: 'UI/UX Design Masterclass',
  topic: 'Mastering Figma Auto Layout, Variables & Component Props',
  batchCode: 'Batch #04 (Evening)',
  mentor: 'Harpreet Singh',
  time: 'Today, 7:00 PM – 8:30 PM IST',
  platform: 'Google Meet',
  meetLink: 'https://meet.google.com/dc-uiux-live'
};

// Upcoming Sessions This Week
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

// Batch Notice Board
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
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [enrollments, setEnrollments] = useState(getActiveEnrollments());
  const isEnrolledSuccess = searchParams.get('enrolled') === 'success';

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setEnrollments(getActiveEnrollments());
  }, []);

  const handleCopyMeetLink = (link) => {
    navigator.clipboard?.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const studentName = currentUser?.name || STUDENT_PROFILE.name;

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
                  {enrollments.length > 0 ? `${enrollments.length + 1} Batches` : '2 Batches'}
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
                to="/resources"
                className="pb-3 text-[#a1a1aa] hover:text-white transition-all relative flex items-center gap-1.5"
              >
                <Folder01Icon className="w-3.5 h-3.5 text-[#71717a] hover:text-[#0bc40e] transition-colors" />
                <span>Resources & Files</span>
              </Link>
            </nav>

            {/* Quick Search */}
            <div className="flex items-center pb-2 sm:pb-0 sm:self-center">
              <div className="relative w-56 sm:w-72 h-8.5 flex items-center">
                <Search01Icon className="w-3.5 h-3.5 text-[#71717a] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search batches, topics, notices..."
                  className="w-full h-full bg-[#181a24] border border-white/10 rounded-full pl-8 pr-3 text-xs text-white placeholder:text-[#71717a] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all leading-none"
                />
              </div>
            </div>

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
                <span className="text-xs text-[#a1a1aa] font-medium">Purchased Courses</span>
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <Book02Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {STUDENT_PROFILE.totalPurchasedCourses}
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
                {STUDENT_PROFILE.upcomingThisWeek}
              </div>
              <p className="text-[11px] text-emerald-400 font-medium">
                Next: Today at 7:00 PM
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
                  {TODAY_CLASS.batchCode}
                </span>
              </div>

              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {TODAY_CLASS.topic}
                </h2>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#a1a1aa] mt-2 font-medium">
                  <span className="text-slate-200 flex items-center gap-1.5">
                    <Clock01Icon className="w-3.5 h-3.5 text-[#a1a1aa]" />
                    {TODAY_CLASS.time}
                  </span>
                  <span>•</span>
                  <span>Mentor: <strong className="text-white">{TODAY_CLASS.mentor}</strong></span>
                  <span>•</span>
                  <span className="text-slate-300 flex items-center gap-1">
                    <Video01Icon className="w-3.5 h-3.5 text-[#a1a1aa]" />
                    {TODAY_CLASS.platform}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setActiveMeetModal(TODAY_CLASS)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Video01Icon className="w-4 h-4 text-slate-950" />
                <span>Join Live Class</span>
              </button>

              <button
                onClick={() => handleCopyMeetLink(TODAY_CLASS.meetLink)}
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

        {/* SECTION 3: My Purchased Courses & Batches */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Book02Icon className="w-5 h-5 text-slate-400" />
                My Purchased Courses & Batches
              </h2>
              <p className="text-xs text-[#71717a] mt-0.5">
                All live courses enrolled under your account
              </p>
            </div>
            
            <Link
              to="/my-learning"
              className="text-xs text-slate-300 hover:text-white font-semibold flex items-center gap-1"
            >
              <span>View Classroom Hub</span>
              <ArrowRight01Icon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {PURCHASED_COURSES.map((course) => (
              <div
                key={course.id}
                className="bg-[#13151f] rounded-2xl border border-white/10 hover:border-white/15 p-5 sm:p-6 transition-all shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3.5">
                  {/* Top Badge & Title */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-[#a1a1aa] border border-white/10">
                          {course.badge}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          {course.access}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-bold text-white pt-1 truncate">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[#71717a]">
                        {course.batchCode} • Mentor: <span className="text-slate-300 font-medium">{course.mentor}</span>
                      </p>
                    </div>

                    <span className="text-xs font-semibold text-slate-300 bg-[#181a24] px-2.5 py-1 rounded-lg border border-white/10 shrink-0">
                      {course.platform}
                    </span>
                  </div>

                  {/* Schedule Info */}
                  <div className="bg-[#0c0e15] border border-white/5 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar03Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{course.schedule}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#a1a1aa] text-[11px]">
                        Attendance: <strong className="text-white">{course.sessionsCompleted} of {course.totalSessions} Sessions</strong>
                      </span>
                      <span className="text-slate-300 font-semibold text-[11px]">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-2 flex items-center gap-2.5 border-t border-white/10">
                  <Link
                    to="/my-learning"
                    className="flex-1 py-2 px-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Mortarboard01Icon className="w-3.5 h-3.5 text-slate-950" />
                    <span>Go to Classroom</span>
                  </Link>

                  <a
                    href={course.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3.5 rounded-xl bg-[#181a24] hover:bg-[#232736] text-[#a1a1aa] hover:text-white border border-white/10 font-medium text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Comment01Icon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Batch Group</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: 2-Column Grid (This Week Schedule & Assignments) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Column (7 cols): This Week Live Schedule */}
          <div className="lg:col-span-7 bg-[#13151f] rounded-2xl border border-white/10 p-5 sm:p-6 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar03Icon className="w-4 h-4 text-slate-400" />
                This Week's Live Classes
              </h3>
              <span className="text-[11px] text-[#71717a] font-medium">
                {WEEK_SESSIONS.length} Scheduled
              </span>
            </div>

            <div className="space-y-2.5">
              {WEEK_SESSIONS.map((sess) => (
                <div
                  key={sess.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    sess.isToday
                      ? 'bg-white/5 border-white/20'
                      : 'bg-[#181a24]/50 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        sess.isToday
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-white/10 text-slate-300'
                      }`}>
                        {sess.day} • {sess.time}
                      </span>
                      <span className="text-[11px] text-[#71717a] truncate">{sess.course}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-semibold text-white truncate pt-0.5">
                      {sess.topic}
                    </h4>
                  </div>

                  <button
                    onClick={() => setActiveMeetModal(sess)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold shrink-0 cursor-pointer ${
                      sess.isToday
                        ? 'bg-white text-slate-950 font-bold hover:bg-slate-100'
                        : 'bg-[#181a24] text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {sess.isToday ? 'Join Now' : 'Link'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Urgent Tasks & Notice Board */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Assignments Action Box */}
            <div className="bg-[#13151f] rounded-2xl border border-white/10 p-5 space-y-3.5 shadow-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileAttachmentIcon className="w-4 h-4 text-slate-400" />
                  Assignments
                </h3>
                <Link to="/my-learning" className="text-[11px] text-slate-400 hover:text-white">
                  View All
                </Link>
              </div>

              <div className="space-y-2.5">
                {ASSIGNMENTS_LIST.map((asg) => (
                  <div key={asg.id} className="p-3 rounded-xl bg-[#181a24]/60 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-300">{asg.tag}</span>
                      <span className="text-[10px] text-[#71717a]">{asg.course}</span>
                    </div>
                    <h5 className="text-xs font-semibold text-white leading-snug">
                      {asg.title}
                    </h5>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-[#71717a]">{asg.due}</span>
                      <Link
                        to="/my-learning"
                        className="text-[11px] font-semibold text-emerald-400 hover:underline"
                      >
                        {asg.status === 'pending' ? 'Submit Link →' : 'View Score →'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Batch Notice Board */}
            <div className="bg-[#13151f] rounded-2xl border border-white/10 p-5 space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Notification01Icon className="w-4 h-4 text-slate-400" />
                  Batch Notice Board
                </h3>
                <span className="text-[10px] text-[#71717a]">Live Updates</span>
              </div>

              <div className="space-y-2.5">
                {NOTICE_BOARD.map((not) => (
                  <div key={not.id} className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-xs">{not.title}</span>
                      <span className="text-[10px] text-[#71717a]">{not.time}</span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                      {not.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

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

    </div>
  );
}
