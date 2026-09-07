import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PartnerStrip from '../components/PartnerStrip';

// Sample Video Testimonials Data
const VIDEO_TESTIMONIALS = [
  {
    id: 'vid-1',
    name: 'Sarah Jenkins',
    role: 'Senior Product Designer at Shopify',
    country: '🇺🇸 USA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    title: 'From Junior Freelancer to Senior UI Designer in 6 Months',
    duration: '2:45',
    course: 'Ultimate Figma Masterclass 2.0',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    quote: "The auto-layout and component variable architecture taught in this masterclass completely changed how fast I ship production designs."
  },
  {
    id: 'vid-2',
    name: 'Alex Rivera',
    role: 'Lead UX Strategist at Atlassian',
    country: '🇲🇽 Mexico',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    title: 'Scaling Design Systems for Enterprise Applications',
    duration: '3:12',
    course: 'Shipfaster UI: Figma UI Kit & Design System',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    quote: "We reduced our squad's UI bug backlog by 70% after implementing the token structures learned from Designership."
  },
  {
    id: 'vid-3',
    name: 'Chloe Zhang',
    role: 'Product Designer at Canva',
    country: '🇦🇺 Australia',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    title: 'Mastering UX Research & User Testing Frameworks',
    duration: '4:05',
    course: 'Practical UX Research & Strategy',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    quote: "The user testing templates gave me the exact confidence needed to lead end-to-end research sprints independently."
  }
];

// Initial Testimonials Dataset (Exact matches from the real site)
const INITIAL_TESTIMONIALS = [
  {
    id: '1',
    name: 'Doris A',
    flag: '🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UX/UI Design Course',
    outcome: '🚀 Career Switcher',
    content: 'The whole frame work was designed to build confidence for UIUX designers. A great course, packed with the write information, value for your money.',
    rating: 5,
    date: 'August 1, 2024',
    helpfulCount: 42
  },
  {
    id: '2',
    name: 'Lhagvabud Purev',
    flag: '🇲🇳',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Figma Masterclass 2.0',
    outcome: '⚡ Fast Workflow',
    content: '9/10. Thank you! Absolutely loved how structured and practical every lesson was.',
    rating: 5,
    date: 'July 28, 2024',
    helpfulCount: 18
  },
  {
    id: '3',
    name: 'Nuno Silva',
    flag: '🇵🇹',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Figma Masterclass 2.0',
    outcome: '🔥 Mastered Auto-Layout',
    content: 'Absolutely brilliant masterclass, thanks, man! Changed the way our studio handles responsive component variants.',
    rating: 5,
    date: 'July 26, 2024',
    helpfulCount: 34
  },
  {
    id: '4',
    name: 'Shania P',
    flag: '🇨🇦',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UX/UI Design Course',
    outcome: '💼 Landed First UI Role',
    content: 'The course lessons and modules are well made. The attention on details, content and quality of each videos is top tier, really worth the investment if you want to upskill in your UX/UI career and learn new ways to start your projects. Special mention on the user testing module!',
    rating: 5,
    date: 'July 24, 2024',
    helpfulCount: 38
  },
  {
    id: '5',
    name: 'Amukta Ambati',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Figma Masterclass 2.0',
    outcome: '✨ Figma Mastery',
    content: "I loved Mizko's course on Figma. It's exactly what I needed to start my UX design journey.",
    rating: 5,
    date: 'July 23, 2024',
    helpfulCount: 27
  },
  {
    id: '6',
    name: 'Kristen Surujbhan',
    flag: '🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Figma Masterclass 2.0',
    outcome: '🏆 Cross-Functional Lead',
    content: 'This course is a must if you are unsure about how the design world operates cross-functionally. It gives you a strong sense of how to navigate stakeholder meetings.',
    rating: 5,
    date: 'July 23, 2024',
    helpfulCount: 45
  },
  {
    id: '7',
    name: 'Aryna L',
    flag: '🇩🇪',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Practical UX Research & Strategy',
    outcome: '📈 +$28k Salary Bump',
    content: 'This course has been a game-changer, providing the crucial skills to navigate the future of UX/UI design through the ever-evolving industry, now accompanied by the rise of AI.',
    rating: 5,
    date: 'July 22, 2024',
    helpfulCount: 29
  },
  {
    id: '8',
    name: 'Luis Veloz',
    flag: '🇲🇽',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UX/UI Design Course',
    outcome: '⚡ Saved 15+ hrs/week',
    content: 'I loved this course, Mizko explained every detail with ease. The way he teaches is incredibly easy to understand and easy to follow. All the templates provided are incredibly useful.',
    rating: 5,
    date: 'July 22, 2024',
    helpfulCount: 56
  },
  {
    id: '9',
    name: 'Binu P',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Figma Masterclass 2.0',
    outcome: '🎯 System Organized',
    content: 'Love the YouTube channel and course I just recently purchased :) Looking forward to tidying up my Figma skills and especially handover techniques. Kudos!',
    rating: 5,
    date: 'July 15, 2024',
    helpfulCount: 31
  },
  {
    id: '10',
    name: 'Ami Takahashi',
    flag: '🇯🇵',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UX/UI Design Course',
    outcome: '💣🔥 Absolute Bomb',
    content: 'This course answered all my questions. This was just a 💣🔥. I feel super confident with my new knowledge. Thank you 🤩',
    rating: 5,
    date: 'June 18, 2024',
    helpfulCount: 64
  },
  {
    id: '11',
    name: 'Donato Espinosa',
    flag: '🇪🇸',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Figma Masterclass 2.0',
    outcome: '🚀 Scaled Design System',
    content: 'Awesome content! Worth every penny. Mizko makes everything digestible and easy to implement in real production files immediately.',
    rating: 5,
    date: 'June 12, 2024',
    helpfulCount: 22
  },
  {
    id: '12',
    name: 'Priya Sharma',
    flag: '🇸🇬',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Practical UX Research & Strategy',
    outcome: '🌟 Case Studies Mastered',
    content: 'The UX research framework gave me exact scripts for interviewing stakeholders. Landed my first Senior Product Designer job within 3 weeks of completion!',
    rating: 5,
    date: 'June 05, 2024',
    helpfulCount: 48
  }
];

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  
  // Interactive States
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [votedIds, setVotedIds] = useState(new Set());
  const [activeVideo, setActiveVideo] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // New Review Form State
  const [newReview, setNewReview] = useState({
    name: '',
    country: '🇺🇸',
    course: 'Figma Masterclass 2.0',
    outcome: '🚀 Career Accelerator',
    rating: 5,
    content: ''
  });

  // Filtered & Sorted Testimonials
  const filteredTestimonials = useMemo(() => {
    return testimonials
      .filter((t) => {
        // Category Filter
        if (selectedCategory !== 'All' && !t.course.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
        // Rating Filter
        if (selectedRating === '5' && t.rating !== 5) return false;
        if (selectedRating === '4' && t.rating < 4) return false;
        
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = t.name.toLowerCase().includes(q);
          const matchContent = t.content.toLowerCase().includes(q);
          const matchCourse = t.course.toLowerCase().includes(q);
          const matchOutcome = (t.outcome || '').toLowerCase().includes(q);
          return matchName || matchContent || matchCourse || matchOutcome;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'helpful') {
          return b.helpfulCount - a.helpfulCount;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        // Default 'recent'
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [testimonials, selectedCategory, selectedRating, searchQuery, sortBy]);

  // Handle Helpful Vote
  const toggleHelpful = (id) => {
    setTestimonials((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const hasVoted = votedIds.has(id);
          return {
            ...t,
            helpfulCount: hasVoted ? t.helpfulCount - 1 : t.helpfulCount + 1
          };
        }
        return t;
      })
    );

    setVotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Submit Review Handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.content) return;

    const createdItem = {
      id: Date.now().toString(),
      name: newReview.name,
      flag: newReview.country,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150`,
      verified: true,
      course: newReview.course,
      outcome: newReview.outcome,
      content: newReview.content,
      rating: Number(newReview.rating),
      date: 'Just now',
      helpfulCount: 1
    };

    setTestimonials([createdItem, ...testimonials]);
    setShowReviewModal(false);
    setNewReview({
      name: '',
      country: '🇺🇸',
      course: 'Figma Masterclass 2.0',
      outcome: '🚀 Career Accelerator',
      rating: 5,
      content: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans">
      
      {/* Dark Hero Section matching real website header */}
      <div className="bg-[#0c0e15] text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb matching exact screenshot */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#9a7cff] mb-6 font-medium">
            <span className="text-[#9a7cff] text-sm">✦</span>
            <span className="text-[#71717a] text-xs font-normal">›</span>
            <span>Testimonials</span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight mb-4">
              Hear from our students
            </h1>
            <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed">
              From career changes to dream jobs, here's how Designership helped their professional journey.
            </p>
          </div>

        </div>
      </div>

      {/* Main White Content Area matching real site */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Minimal Clean Filter Bar */}
        <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'All', label: 'All Testimonials' },
              { id: 'UX/UI Design Course', label: 'UX/UI Design Course' },
              { id: 'Figma Masterclass', label: 'Figma Masterclass 2.0' },
              { id: 'UX Research', label: 'UX Research & Strategy' },
              { id: 'Shipfaster UI', label: 'Shipfaster UI Kit' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#6400e6] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Write Review Button */}
          <button
            onClick={() => setShowReviewModal(true)}
            className="bg-[#6400e6] hover:bg-[#530dd3] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-md transition-colors shrink-0 flex items-center justify-center gap-1.5"
          >
            <span>✍️</span> Write Review
          </button>

        </div>

        {/* Counter Header */}
        <div className="flex items-center justify-between mb-6 text-sm text-slate-500">
          <span>Showing <strong className="text-slate-900 font-semibold">{filteredTestimonials.length}</strong> student reviews</span>
          {(selectedCategory !== 'All' || searchQuery || selectedRating !== 'All') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSelectedRating('All');
              }}
              className="text-xs text-[#6400e6] hover:underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Testimonials Masonry / Grid (Exact Light Theme matching real website) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mb-16 space-y-6">
          {filteredTestimonials.map((t) => {
            const hasVoted = votedIds.has(t.id);
            return (
              <div
                key={t.id}
                className="break-inside-avoid inline-block w-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Avatar, Name, Verified Badge, Course Tag */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <span className="absolute -bottom-1 -right-1 text-xs">{t.flag}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                        {t.verified && (
                          <svg className="w-4 h-4 text-[#4f46e5] fill-current" viewBox="0 0 20 20" title="Verified Student">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="text-xs text-[#7c3aed] font-medium">{t.course}</div>
                    </div>
                  </div>

                  {/* Outcome Badge */}
                  {t.outcome && (
                    <div className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-md mb-3">
                      {t.outcome}
                    </div>
                  )}

                  {/* Review Text */}
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    "{t.content}"
                  </p>
                </div>

                {/* Stars & Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <button
                    onClick={() => toggleHelpful(t.id)}
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs transition-colors ${
                      hasVoted
                        ? 'bg-purple-100 text-[#6400e6] font-semibold'
                        : 'text-slate-400 hover:text-slate-700 bg-slate-50'
                    }`}
                  >
                    <span>👍</span>
                    <span>{t.helpfulCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partner Strip Section */}
        <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8 border-t border-slate-200 mb-16">
          <PartnerStrip />
        </div>

        {/* Newsletter / CTA Section (White matching real site footer top) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm max-w-4xl mx-auto mb-16">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6400e6] flex items-center justify-center mx-auto mb-4 text-xl">
            🎓
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Ready to start your design journey?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-6">
            Join over 10,000+ designers level up their UI/UX and Figma skills with lifetime access and practical templates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/courses/the-ultimate-figma-masterclass"
              className="w-full sm:w-auto bg-[#6400e6] hover:bg-[#530dd3] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Explore Figma Masterclass 2.0 →
            </Link>
            <button
              onClick={() => setShowReviewModal(true)}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              Write a Review
            </button>
          </div>
        </div>

      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src={activeVideo.avatar} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activeVideo.name}</h4>
                  <p className="text-xs text-slate-500">{activeVideo.role}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-100"
              >
                ✕ Close
              </button>
            </div>
            
            <div className="aspect-video w-full">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>✍️</span> Submit Your Review
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Country Flag</label>
                  <select
                    value={newReview.country}
                    onChange={(e) => setNewReview({ ...newReview, country: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                  >
                    <option value="🇺🇸">🇺🇸 United States</option>
                    <option value="🇬🇧">🇬🇧 United Kingdom</option>
                    <option value="🇨🇦">🇨🇦 Canada</option>
                    <option value="🇩🇪">🇩🇪 Germany</option>
                    <option value="🇦🇺">🇦🇺 Australia</option>
                    <option value="🇮🇳">🇮🇳 India</option>
                    <option value="🇲🇽">🇲🇽 Mexico</option>
                    <option value="🇯🇵">🇯🇵 Japan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Course / Product Taken</label>
                <select
                  value={newReview.course}
                  onChange={(e) => setNewReview({ ...newReview, course: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                >
                  <option value="Figma Masterclass 2.0">Figma Masterclass 2.0</option>
                  <option value="Practical UX Research & Strategy">Practical UX Research & Strategy</option>
                  <option value="UX/UI Design Course">UX/UI Design Course</option>
                  <option value="Shipfaster UI: Figma UI Kit & Design System">Shipfaster UI Kit & Design System</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Outcome Tag</label>
                <input
                  type="text"
                  placeholder="e.g. 🚀 Landed Senior Role at Tech Firm"
                  value={newReview.outcome}
                  onChange={(e) => setNewReview({ ...newReview, outcome: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Your Review *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your experience and how the course helped your design career..."
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#6400e6] text-white font-bold px-4 py-2 rounded-xl hover:bg-[#530dd3]"
                >
                  Post Review Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
