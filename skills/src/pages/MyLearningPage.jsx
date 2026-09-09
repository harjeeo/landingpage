import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublicConfig } from '../lib/payments';
import {
  Video01Icon,
  Calendar03Icon,
  Clock01Icon,
  Book02Icon,
  Mortarboard01Icon,
  DashboardSquare01Icon,
  Layers01Icon,
  FavouriteIcon,
  Search01Icon,
  Copy01Icon,
  LinkSquare01Icon,
  FileAttachmentIcon,
  Folder01Icon,
  UserCircleIcon,
  SparklesIcon,
  AlertCircleIcon,
  Comment01Icon,
  Tick02Icon,
  PlayCircle02Icon
} from 'hugeicons-react';

// Mock Enrolled Live Batches
const ENROLLED_BATCHES = [
  {
    id: 'batch-1',
    courseName: 'UI/UX Design Masterclass',
    badge: 'Live Interactive Cohort',
    batchCode: 'Batch #04 (Evening)',
    mentorName: 'Harpreet Singh',
    mentorRole: 'Lead Product Designer',
    schedule: 'Mon, Wed, Fri • 7:00 PM – 8:30 PM IST',
    platform: 'Google Meet',
    platformType: 'meet',
    meetLink: 'https://meet.google.com/dc-uiux-live',
    whatsappGroupLink: 'https://chat.whatsapp.com/sample-uiux-batch',
    totalSessions: 24,
    completedSessions: 14,
    nextSessionTime: 'Today at 7:00 PM',
    nextSessionTopic: 'Mastering Figma Auto Layout, Variables & Component Props',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
    isLiveToday: true
  },
  {
    id: 'batch-2',
    courseName: 'Graphic Design & AI Mastery',
    badge: 'Weekend Live Batch',
    batchCode: 'Batch #02 (Weekend)',
    mentorName: 'Harpreet Singh',
    mentorRole: 'Creative Director',
    schedule: 'Sat & Sun • 11:00 AM – 1:00 PM IST',
    platform: 'Zoom Meeting',
    platformType: 'zoom',
    meetLink: 'https://zoom.us/j/sample-graphic-design',
    whatsappGroupLink: 'https://chat.whatsapp.com/sample-gd-batch',
    totalSessions: 16,
    completedSessions: 6,
    nextSessionTime: 'Saturday at 11:00 AM',
    nextSessionTopic: 'Generative Fill & AI Vector Art in Adobe Photoshop',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
    isLiveToday: false
  }
];

// Mock Upcoming Schedule
const UPCOMING_SCHEDULE = [
  {
    id: 'sch-1',
    batchId: 'batch-1',
    courseTitle: 'UI/UX Design Masterclass',
    topic: 'Mastering Figma Auto Layout, Variables & Component Props',
    dateLabel: 'Today, 8 Sep',
    time: '7:00 PM – 8:30 PM IST',
    mentor: 'Harpreet Singh',
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/dc-uiux-live',
    status: 'live-today',
    sessionNumber: 'Session 15'
  },
  {
    id: 'sch-2',
    batchId: 'batch-1',
    courseTitle: 'UI/UX Design Masterclass',
    topic: 'UX Research Synthesis, User Personas & Wireframing',
    dateLabel: 'Wednesday, 10 Sep',
    time: '7:00 PM – 8:30 PM IST',
    mentor: 'Harpreet Singh',
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/dc-uiux-live',
    status: 'scheduled',
    sessionNumber: 'Session 16'
  },
  {
    id: 'sch-3',
    batchId: 'batch-1',
    courseTitle: 'UI/UX Design Masterclass',
    topic: 'Interactive Micro-interactions & Smart Animate in Figma',
    dateLabel: 'Friday, 12 Sep',
    time: '7:00 PM – 8:30 PM IST',
    mentor: 'Harpreet Singh',
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/dc-uiux-live',
    status: 'scheduled',
    sessionNumber: 'Session 17'
  },
  {
    id: 'sch-4',
    batchId: 'batch-2',
    courseTitle: 'Graphic Design & AI Mastery',
    topic: 'Generative Fill & AI Vector Art in Adobe Photoshop',
    dateLabel: 'Saturday, 13 Sep',
    time: '11:00 AM – 1:00 PM IST',
    mentor: 'Harpreet Singh',
    platform: 'Zoom Meeting',
    meetLink: 'https://zoom.us/j/sample-graphic-design',
    status: 'scheduled',
    sessionNumber: 'Session 07'
  }
];

// Mock Class Resources
const CLASS_RESOURCES = [
  {
    id: 'res-1',
    title: 'Figma Starter Kit & UI Design Tokens v2.4',
    course: 'UI/UX Design Masterclass',
    category: 'Figma System',
    badge: 'Design Kit',
    size: '45 MB',
    icon: '🎨',
    actionText: 'Open in Figma',
    link: 'https://figma.com/@designsclue',
    uploadedOn: 'Yesterday'
  },
  {
    id: 'res-2',
    title: 'UX Heuristics & Wireframe Guidelines Deck',
    course: 'UI/UX Design Masterclass',
    category: 'Presentation',
    badge: 'Slide Deck',
    size: '14.8 MB',
    icon: '📄',
    actionText: 'Download PDF',
    link: '#download',
    uploadedOn: '3 days ago'
  },
  {
    id: 'res-3',
    title: 'Batch #04 Shared Google Drive Resource Hub',
    course: 'UI/UX Design Masterclass',
    category: 'Cloud Storage',
    badge: 'Drive Folder',
    size: 'All Assets',
    icon: '📁',
    actionText: 'Open Drive',
    link: 'https://drive.google.com',
    uploadedOn: 'Updated Daily'
  },
  {
    id: 'res-4',
    title: 'Midjourney Prompt Engineering Cheatsheet for Designers',
    course: 'Graphic Design & AI Mastery',
    category: 'Cheat Sheet',
    badge: 'AI Prompts',
    size: '8.2 MB',
    icon: '✨',
    actionText: 'Download PDF',
    link: '#download',
    uploadedOn: '5 days ago'
  }
];

// Mock Assignments
const INITIAL_ASSIGNMENTS = [
  {
    id: 'asg-1',
    title: 'Spotify Mobile App Redesign (Auto Layout & Micro-interactions)',
    course: 'UI/UX Design Masterclass',
    deadline: 'Sunday, 14 Sep • 11:59 PM',
    status: 'pending',
    score: null,
    mentorFeedback: null,
    submittedLink: '',
    brief: 'Create a responsive 3-screen prototype for a modern music player app incorporating auto layout, variant properties, and component tokens.'
  },
  {
    id: 'asg-2',
    title: 'E-Commerce Checkout Flow & Form Optimization Case Study',
    course: 'UI/UX Design Masterclass',
    deadline: 'Submitted on 5 Sep',
    status: 'reviewed',
    score: '9.5 / 10',
    mentorFeedback: 'Outstanding work on visual hierarchy and spacing! The input field validation states were very well thought out.',
    submittedLink: 'https://figma.com/file/sample-checkout-casestudy',
    brief: 'Design a high-converting 2-step checkout flow for a D2C fashion store.'
  },
  {
    id: 'asg-3',
    title: 'Typography Pairing & Visual Hierarchy Challenge',
    course: 'Graphic Design & AI Mastery',
    deadline: 'Submitted on 6 Sep',
    status: 'submitted',
    score: null,
    mentorFeedback: null,
    submittedLink: 'https://drive.google.com/file/sample-typography-board',
    brief: 'Create 3 poster layouts demonstrating high-contrast editorial typography and modern layout grids.'
  }
];

// Mock Past Class Recaps
const PAST_CLASS_RECAPS = [
  {
    id: 'past-1',
    sessionNumber: 'Session 14',
    topic: 'Design Tokens, Dark Mode Variables & Typography Hierarchy',
    course: 'UI/UX Design Masterclass',
    date: '6 Sep 2026',
    duration: '1 hr 35 mins',
    summary: 'Learned how to set up color and spacing variables in Figma, configure dark/light theme switching, and apply scalable typography systems.',
    driveRecordingLink: 'https://drive.google.com/rec-session-14'
  },
  {
    id: 'past-2',
    sessionNumber: 'Session 13',
    topic: 'Component Architecture & Interactive Component States',
    course: 'UI/UX Design Masterclass',
    date: '4 Sep 2026',
    duration: '1 hr 40 mins',
    summary: 'Covered nested variants, hover/active/disabled states, Boolean and instance swap properties for building enterprise Figma kits.',
    driveRecordingLink: 'https://drive.google.com/rec-session-13'
  },
  {
    id: 'past-3',
    sessionNumber: 'Session 12',
    topic: 'Information Architecture & User Flow Mapping in FigJam',
    course: 'UI/UX Design Masterclass',
    date: '1 Sep 2026',
    duration: '1 hr 25 mins',
    summary: 'Hands-on practice on user journey mapping, wireflow structures, and card sorting methods before starting UI screens.',
    driveRecordingLink: 'https://drive.google.com/rec-session-12'
  }
];

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule', 'resources', 'assignments', 'recaps'
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveSettings, setLiveSettings] = useState(null);

  useEffect(() => {
    getPublicConfig(true).then((data) => {
      if (data?.liveClassesSettings) {
        setLiveSettings(data.liveClassesSettings);
      }
    });
  }, []);

  // Modals
  const [activeMeetModal, setActiveMeetModal] = useState(null);
  const [activeSubmitModal, setActiveSubmitModal] = useState(null);
  const [activeFeedbackModal, setActiveFeedbackModal] = useState(null);
  const [submissionLinkInput, setSubmissionLinkInput] = useState('');
  const [submissionNoteInput, setSubmissionNoteInput] = useState('');

  // Enrolled Batches dynamic list
  const batchesList = useMemo(() => {
    if (liveSettings?.batches?.length > 0) {
      return liveSettings.batches.map(b => ({
        id: b.id,
        courseName: b.courseTitle || b.title,
        badge: b.badge || 'Live Interactive Cohort',
        batchCode: b.batchCode,
        mentorName: b.mentor,
        mentorRole: b.mentorRole || 'Mentor',
        schedule: b.schedule,
        platform: b.platform || 'Google Meet',
        platformType: (b.platform || '').toLowerCase().includes('zoom') ? 'zoom' : 'meet',
        meetLink: b.meetLink,
        whatsappGroupLink: b.whatsappLink,
        totalSessions: b.totalSessions || 24,
        completedSessions: b.completedSessions || 14,
        nextSessionTime: 'Today at 7:00 PM',
        nextSessionTopic: liveSettings?.todayClass?.topic || 'Live Interactive Class',
        isLiveToday: true
      }));
    }
    return ENROLLED_BATCHES;
  }, [liveSettings]);

  // Next upcoming class for top alert banner
  const todayClass = liveSettings?.todayClass || {
    courseName: ENROLLED_BATCHES[0].courseName,
    nextSessionTopic: ENROLLED_BATCHES[0].nextSessionTopic,
    batchCode: ENROLLED_BATCHES[0].batchCode,
    nextSessionTime: ENROLLED_BATCHES[0].nextSessionTime,
    mentorName: ENROLLED_BATCHES[0].mentorName,
    platform: ENROLLED_BATCHES[0].platform,
    meetLink: ENROLLED_BATCHES[0].meetLink,
    isLive: true,
  };

  const nextLiveClass = liveSettings?.todayClass ? {
    courseName: liveSettings.todayClass.courseTitle,
    nextSessionTopic: liveSettings.todayClass.topic,
    batchCode: liveSettings.todayClass.batchCode,
    nextSessionTime: liveSettings.todayClass.time,
    mentorName: liveSettings.todayClass.mentor,
    platform: liveSettings.todayClass.platform,
    meetLink: liveSettings.todayClass.meetLink,
    isLive: liveSettings.todayClass.isLive !== false,
  } : ENROLLED_BATCHES[0];

  const handleCopyMeetLink = (link) => {
    navigator.clipboard?.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!submissionLinkInput.trim()) {
      alert('Please enter your project Figma or Drive link');
      return;
    }

    setAssignments((prev) =>
      prev.map((asg) =>
        asg.id === activeSubmitModal.id
          ? {
              ...asg,
              status: 'submitted',
              submittedLink: submissionLinkInput,
              deadline: 'Submitted Just Now'
            }
          : asg
      )
    );

    setActiveSubmitModal(null);
    setSubmissionLinkInput('');
    setSubmissionNoteInput('');
    alert('🎉 Assignment submitted successfully for mentor review!');
  };

  // Filtered upcoming schedule
  const filteredSchedule = useMemo(() => {
    return UPCOMING_SCHEDULE.filter((item) => {
      if (selectedBatch !== 'all' && item.batchId !== selectedBatch) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.topic.toLowerCase().includes(q) ||
          item.courseTitle.toLowerCase().includes(q) ||
          item.mentor.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedBatch, searchQuery]);

  // Filtered resources
  const filteredResources = useMemo(() => {
    if (!searchQuery.trim()) return CLASS_RESOURCES;
    const q = searchQuery.toLowerCase();
    return CLASS_RESOURCES.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.course.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

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
                  2 Batches
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
                  placeholder="Search classes, notes, files..."
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

        {/* SECTION 2: Enrolled Batches Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Book02Icon className="w-5 h-5 text-slate-400" />
              Enrolled Cohorts & Batches
            </h2>
            <span className="text-xs text-[#71717a] font-medium hidden sm:inline-block">
              {batchesList.length} Active Batches
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {batchesList.map((batch) => {
              const progressPercentage = Math.round((batch.completedSessions / batch.totalSessions) * 100);
              return (
                <div
                  key={batch.id}
                  className="bg-[#13151f] rounded-2xl border border-white/10 hover:border-white/15 p-5 sm:p-6 transition-all shadow-lg flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3.5">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-[#a1a1aa] border border-white/10">
                          {batch.badge}
                        </span>
                        <h3 className="text-base font-bold text-white pt-1 truncate">
                          {batch.courseName}
                        </h3>
                        <p className="text-xs text-[#71717a]">
                          {batch.batchCode} • Mentor: <span className="text-slate-300 font-medium">{batch.mentorName}</span>
                        </p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border shrink-0 ${
                        batch.platformType === 'zoom'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {batch.platform}
                      </span>
                    </div>

                    {/* Schedule & Timing */}
                    <div className="bg-[#0c0e15] border border-white/5 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar03Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{batch.schedule}</span>
                      </div>
                    </div>

                    {/* Progress Bar & Attendance */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#a1a1aa] text-[11px]">
                          Attendance: <strong className="text-white">{batch.completedSessions} of {batch.totalSessions} Sessions</strong>
                        </span>
                        <span className="text-slate-300 font-semibold text-[11px]">{progressPercentage}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Batch Action Buttons */}
                  <div className="pt-2 flex items-center gap-2.5 border-t border-white/10">
                    <button
                      onClick={() => setActiveMeetModal(batch)}
                      className="flex-1 py-2 px-3.5 rounded-xl bg-[#181a24] hover:bg-white hover:text-slate-950 text-white border border-white/10 font-bold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <Video01Icon className="w-3.5 h-3.5" />
                      <span>Class Link</span>
                    </button>

                    <a
                      href={batch.whatsappGroupLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3.5 rounded-xl bg-[#181a24] hover:bg-[#232736] text-[#a1a1aa] hover:text-white border border-white/10 font-medium text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Comment01Icon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Group</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: Content Hub Navigation Tabs */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            
            {/* Filter Tabs (Clean Neutral Pills with White Active state) */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'schedule'
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
                }`}
              >
                <Calendar03Icon className="w-3.5 h-3.5" />
                <span>Class Schedule</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'schedule' ? 'bg-slate-200 text-slate-900 font-bold' : 'bg-black/40 text-[#71717a]'}`}>
                  {UPCOMING_SCHEDULE.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'resources'
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
                }`}
              >
                <Folder01Icon className="w-3.5 h-3.5" />
                <span>Study Materials & Files</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'resources' ? 'bg-slate-200 text-slate-900 font-bold' : 'bg-black/40 text-[#71717a]'}`}>
                  {CLASS_RESOURCES.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('assignments')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'assignments'
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
                }`}
              >
                <FileAttachmentIcon className="w-3.5 h-3.5" />
                <span>Assignments</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'assignments' ? 'bg-slate-200 text-slate-900 font-bold' : 'bg-black/40 text-[#71717a]'}`}>
                  {assignments.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('recaps')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'recaps'
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
                }`}
              >
                <PlayCircle02Icon className="w-3.5 h-3.5" />
                <span>Class Recaps</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'recaps' ? 'bg-slate-200 text-slate-900 font-bold' : 'bg-black/40 text-[#71717a]'}`}>
                  {PAST_CLASS_RECAPS.length}
                </span>
              </button>
            </div>

            {/* Batch Dropdown Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#71717a] font-medium hidden sm:inline-block">Filter:</span>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="bg-[#181a24] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/30"
              >
                <option value="all">All Enrolled Batches</option>
                <option value="batch-1">UI/UX Design Masterclass</option>
                <option value="batch-2">Graphic Design & AI Mastery</option>
              </select>
            </div>

          </div>

          {/* TAB 1: Class Schedule / Timetable */}
          {activeTab === 'schedule' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSchedule.map((session) => (
                  <div
                    key={session.id}
                    className="bg-[#13151f] rounded-2xl border border-white/10 hover:border-white/20 p-5 transition-all shadow-md flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-[#a1a1aa] border border-white/10">
                          {session.sessionNumber} • {session.courseTitle}
                        </span>
                        {session.status === 'live-today' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            Live Today
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-[#71717a]">
                            Scheduled
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {session.topic}
                      </h4>

                      <div className="text-xs text-[#a1a1aa] space-y-1">
                        <div className="flex items-center gap-2 text-slate-300 font-medium">
                          <Calendar03Icon className="w-3.5 h-3.5 text-slate-400" />
                          <span>{session.dateLabel}</span>
                          <span>•</span>
                          <Clock01Icon className="w-3.5 h-3.5 text-slate-400" />
                          <span>{session.time}</span>
                        </div>
                        <p className="text-[11px] text-[#71717a]">
                          Mentor: {session.mentor} • Platform: {session.platform}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
                      <button
                        onClick={() => setActiveMeetModal(session)}
                        className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          session.status === 'live-today'
                            ? 'bg-white hover:bg-slate-100 text-slate-950 shadow-md active:scale-95'
                            : 'bg-[#181a24] hover:bg-[#232736] text-[#dfdfe2] border border-white/10'
                        }`}
                      >
                        <Video01Icon className="w-3.5 h-3.5" />
                        <span>{session.status === 'live-today' ? 'Join Class' : 'Class Link'}</span>
                      </button>

                      <a
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(session.topic)}&details=${encodeURIComponent('Join Live Class via Google Meet')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#71717a] hover:text-white font-medium flex items-center gap-1 transition-colors"
                      >
                        <Calendar03Icon className="w-3.5 h-3.5" />
                        <span>Add to Calendar</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Study Materials & Files */}
          {activeTab === 'resources' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredResources.map((res) => (
                  <div
                    key={res.id}
                    className="bg-[#13151f] rounded-2xl border border-white/10 hover:border-white/20 p-5 transition-all shadow-md flex flex-col justify-between space-y-4 group"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#181a24] border border-white/10 flex items-center justify-center shrink-0 text-lg group-hover:border-white/25 transition-colors">
                        {res.icon}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-[#dfdfe2] border border-white/10">
                            {res.badge}
                          </span>
                          <span className="text-[11px] text-[#71717a]">{res.size}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-slate-200 transition-colors leading-snug">
                          {res.title}
                        </h4>
                        <p className="text-xs text-[#71717a] truncate">
                          {res.course} • {res.uploadedOn}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-white/10">
                      <span className="text-[11px] text-[#71717a] font-medium">{res.category}</span>
                      <a
                        href={res.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3 rounded-lg bg-[#181a24] hover:bg-white hover:text-slate-950 text-[#dfdfe2] border border-white/10 text-xs font-semibold transition-all flex items-center gap-1.5"
                      >
                        <LinkSquare01Icon className="w-3.5 h-3.5" />
                        <span>{res.actionText}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Assignments & Projects */}
          {activeTab === 'assignments' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3.5">
                {assignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="bg-[#13151f] rounded-2xl border border-white/10 hover:border-white/20 p-5 sm:p-6 transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-[#a1a1aa] border border-white/10">
                          {asg.course}
                        </span>

                        {asg.status === 'pending' && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            ⏳ Pending Submission
                          </span>
                        )}
                        {asg.status === 'submitted' && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            📤 Submitted (Under Review)
                          </span>
                        )}
                        {asg.status === 'reviewed' && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            ✓ Reviewed • Score: {asg.score}
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white">
                        {asg.title}
                      </h4>
                      <p className="text-xs text-[#a1a1aa] leading-relaxed">
                        {asg.brief}
                      </p>

                      <p className="text-[11px] text-[#71717a] font-medium pt-0.5">
                        Due / Submitted: <span className="text-slate-300">{asg.deadline}</span>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 shrink-0">
                      {asg.status === 'pending' && (
                        <button
                          onClick={() => setActiveSubmitModal(asg)}
                          className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <FileAttachmentIcon className="w-3.5 h-3.5 text-slate-950" />
                          <span>Submit Figma Link</span>
                        </button>
                      )}

                      {asg.status === 'submitted' && (
                        <a
                          href={asg.submittedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#181a24] hover:bg-[#232736] text-[#dfdfe2] border border-white/10 font-medium text-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          <LinkSquare01Icon className="w-3.5 h-3.5" />
                          <span>View Submission</span>
                        </a>
                      )}

                      {asg.status === 'reviewed' && (
                        <button
                          onClick={() => setActiveFeedbackModal(asg)}
                          className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#181a24] hover:bg-white hover:text-slate-950 text-white border border-white/10 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Comment01Icon className="w-3.5 h-3.5" />
                          <span>View Review & Score</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Past Live Class Recaps */}
          {activeTab === 'recaps' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PAST_CLASS_RECAPS.map((recap) => (
                  <div
                    key={recap.id}
                    className="bg-[#13151f] rounded-2xl border border-white/10 hover:border-white/20 p-5 transition-all shadow-md flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">
                          {recap.sessionNumber}
                        </span>
                        <span className="text-[11px] text-[#71717a]">{recap.date}</span>
                      </div>

                      <h4 className="text-sm font-bold text-white leading-snug">
                        {recap.topic}
                      </h4>

                      <p className="text-xs text-[#a1a1aa] leading-relaxed">
                        {recap.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-[#71717a]">⏱️ {recap.duration}</span>
                      <a
                        href={recap.driveRecordingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3 rounded-lg bg-[#181a24] hover:bg-white hover:text-slate-950 text-slate-200 border border-white/10 text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <PlayCircle02Icon className="w-3.5 h-3.5" />
                        <span>Watch Recording</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>

        {/* SECTION 4: 1-on-1 Doubt Support Card */}
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

      {/* MODAL 2: Submit Assignment Modal */}
      {activeSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#13151f] rounded-3xl border border-white/15 max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl relative text-white animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Submit Project Work
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {activeSubmitModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveSubmitModal(null)}
                className="text-[#71717a] hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAssignmentSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#dfdfe2]">
                  Figma File / Google Drive URL <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://figma.com/file/... or https://drive.google.com/..."
                  value={submissionLinkInput}
                  onChange={(e) => setSubmissionLinkInput(e.target.value)}
                  className="w-full bg-[#181a24] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-[#71717a] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20"
                />
                <p className="text-[10px] text-[#71717a]">
                  Make sure link sharing permission is set to "Anyone with the link can view".
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#dfdfe2]">
                  Notes for Mentor (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Any context or questions you want to share with the instructor..."
                  value={submissionNoteInput}
                  onChange={(e) => setSubmissionNoteInput(e.target.value)}
                  className="w-full bg-[#181a24] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-[#71717a] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSubmitModal(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#181a24] hover:bg-[#232736] text-[#a1a1aa] text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer"
                >
                  Submit for Review
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 3: View Feedback Modal */}
      {activeFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#13151f] rounded-3xl border border-white/15 max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl relative text-white animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Mentor Review & Evaluation
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {activeFeedbackModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveFeedbackModal(null)}
                className="text-[#71717a] hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#181a24] rounded-2xl border border-white/10 p-4 space-y-1">
              <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider">
                Score Awarded
              </span>
              <div className="text-2xl font-black text-white">
                {activeFeedbackModal.score} <span className="text-xs text-slate-400 font-normal">⭐</span>
              </div>
            </div>

            <div className="space-y-1.5 bg-white/5 rounded-2xl border border-white/5 p-4">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Comment01Icon className="w-3.5 h-3.5 text-slate-300" />
                Instructor Feedback:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{activeFeedbackModal.mentorFeedback}"
              </p>
            </div>

            <button
              onClick={() => setActiveFeedbackModal(null)}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all cursor-pointer"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
