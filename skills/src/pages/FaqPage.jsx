import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChatQuestion01Icon } from 'hugeicons-react';

const FAQ_DATA = [
  {
    id: 1,
    category: 'Courses & Syllabus',
    question: 'What courses do you offer?',
    answer: 'We offer practical, industry-focused courses in Graphic Design, UI Design, Digital Marketing, Google Ads, and Meta Ads. Each course is tailored to help you build real-world skills from scratch to advanced mastery.'
  },
  {
    id: 2,
    category: 'Beginners & Learning',
    question: 'Are the courses suitable for beginners?',
    answer: 'Yes. Our courses are structured step-by-step with practical examples, making them suitable for complete beginners as well as experienced professionals looking to upgrade their skills and workflows.'
  },
  {
    id: 3,
    category: 'Courses & Syllabus',
    question: 'Are the courses online or offline?',
    answer: 'Our courses are available online, so you can learn flexibly from anywhere at your own pace with lifetime access to lessons and resources.'
  },
  {
    id: 4,
    category: 'Projects & Practical',
    question: 'Will I work on real-world projects?',
    answer: 'Yes. You will work on real-world practical projects, live client briefs, exercises, and case studies to understand how modern skills are applied in the industry.'
  },
  {
    id: 5,
    category: 'Support & Mentorship',
    question: 'Do I get support while learning?',
    answer: 'Yes. You will receive active guidance, dedicated feedback on your assignments, and support to help you understand concepts, complete projects, and continuously improve.'
  },
  {
    id: 6,
    category: 'Career & Freelancing',
    question: 'Can these courses help me start freelancing?',
    answer: 'Yes. You will develop practical skills and build high-quality portfolio projects that will help you attract clients, pitch your services, and explore freelance or remote career opportunities.'
  },
  {
    id: 7,
    category: 'Beginners & Learning',
    question: 'What software or tools will I need?',
    answer: 'Depending on the course you choose, you will learn industry-standard tools like Figma for UI Design, Photoshop & Illustrator for Graphic Design, and Meta Ads Manager & Google Ads Console for Digital Marketing.'
  },
  {
    id: 8,
    category: 'Courses & Syllabus',
    question: 'What is the duration of the courses?',
    answer: 'We offer both 1-Month Comprehensive Masterclasses and 1-Week Focused Fast-Track Bootcamps designed to fit your learning schedule.'
  },
  {
    id: 9,
    category: 'Projects & Practical',
    question: 'Do I get a certificate upon completion?',
    answer: 'Yes. Upon completing all lessons and submitting your course projects, you will receive a verified Certificate of Completion that you can add to your LinkedIn profile and resume.'
  },
  {
    id: 10,
    category: 'Support & Mentorship',
    question: 'How do I get my doubts resolved?',
    answer: 'You can ask questions directly inside the private learning group, participate in Q&A sessions, and get WhatsApp support from our mentorship team.'
  },
  {
    id: 11,
    category: 'Courses & Syllabus',
    question: 'Do I get lifetime access to course materials?',
    answer: 'Yes. Once enrolled, you receive lifetime access to course videos, updates, downloadable assets, templates, and project source files.'
  },
  {
    id: 12,
    category: 'Career & Freelancing',
    question: 'How will these courses help my career?',
    answer: 'Our courses focus on practical application rather than pure theory. You will build a portfolio of proof-of-work that hiring managers and clients look for.'
  }
];

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState({});
  const [showAskModal, setShowAskModal] = useState(false);
  const [askSubmitted, setAskSubmitted] = useState(false);
  const [askFormData, setAskFormData] = useState({ name: '', phone: '', question: '' });
  const categoryScrollRef = useRef(null);

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'All', label: 'All Questions' },
    { id: 'Courses & Syllabus', label: 'Courses & Batches' },
    { id: 'Beginners & Learning', label: 'Beginners & Learning' },
    { id: 'Projects & Practical', label: 'Projects & Practical' },
    { id: 'Support & Mentorship', label: 'Support & Mentorship' },
    { id: 'Career & Freelancing', label: 'Career & Freelancing' }
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      if (selectedCategory !== 'All' && faq.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          faq.category.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFaq = (id) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen = {};
    filteredFaqs.forEach((faq) => {
      allOpen[faq.id] = true;
    });
    setOpenFaqs(allOpen);
  };

  const collapseAll = () => {
    setOpenFaqs({});
  };

  const handleAskSubmit = (e) => {
    e.preventDefault();
    if (askFormData.name && askFormData.phone) {
      setAskSubmitted(true);
      setTimeout(() => {
        setShowAskModal(false);
        setAskSubmitted(false);
        setAskFormData({ name: '', phone: '', question: '' });
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans">
      
      {/* Dark Hero Section matching TestimonialsPage header */}
      <div className="bg-[#0c0e15] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0bc40e]/15 border border-[#0bc40e]/30 text-[#0bc40e] text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <span>FAQ'S</span>
          </div>

          {/* Hero Content */}
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-tight mb-4">
              Frequently asked questions
            </h1>
            <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-2xl mx-auto mb-8">
              Everything you need to know about our practical courses, batches, mentorship, and career support.
            </p>

            {/* Search Bar inside Hero */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search questions (e.g. beginner, online, freelancing)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141622]/90 border border-white/15 focus:border-[#0bc40e] focus:ring-2 focus:ring-[#0bc40e]/20 rounded-2xl px-5 py-4 pl-12 text-sm text-white placeholder:text-slate-400 backdrop-blur-md outline-none transition-all shadow-xl text-left"
              />
              <svg
                className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-white/10 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Main White Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Filter Pills Container with Arrows & Smooth Scrolling */}
          <div className="relative flex items-center min-w-0 flex-1 group">
            {/* Scroll Left Button */}
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              className="hidden sm:flex shrink-0 w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 items-center justify-center mr-1 shadow-xs cursor-pointer z-10 transition-all active:scale-95"
              aria-label="Scroll categories left"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Scrollable Pills List */}
            <div
              ref={categoryScrollRef}
              onWheel={(e) => {
                if (e.deltaY !== 0 && categoryScrollRef.current) {
                  categoryScrollRef.current.scrollLeft += e.deltaY;
                }
              }}
              className="flex items-center gap-2 overflow-x-auto scroll-smooth py-1 px-1 w-full scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 select-none ${
                    selectedCategory === cat.id
                      ? 'bg-[#0bc40e] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Scroll Right Button */}
            <button
              type="button"
              onClick={() => scrollCategories('right')}
              className="hidden sm:flex shrink-0 w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 items-center justify-center ml-1 shadow-xs cursor-pointer z-10 transition-all active:scale-95"
              aria-label="Scroll categories right"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Ask Question Button */}
          <button
            onClick={() => setShowAskModal(true)}
            className="bg-[#0bc40e] hover:bg-[#0aa30c] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-md transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <ChatQuestion01Icon size={18} strokeWidth={2.5} className="shrink-0" />
            <span>Ask a Question</span>
          </button>

        </div>

        {/* Counter & Expand / Collapse Controls */}
        <div className="flex items-center justify-between mb-6 text-sm text-slate-500">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{filteredFaqs.length}</strong> questions
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={expandAll}
              className="text-xs text-slate-600 hover:text-[#0bc40e] font-medium cursor-pointer"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={collapseAll}
              className="text-xs text-slate-600 hover:text-[#0bc40e] font-medium cursor-pointer"
            >
              Collapse All
            </button>
            {(selectedCategory !== 'All' || searchQuery) && (
              <>
                <span>•</span>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#0bc40e] hover:underline font-medium cursor-pointer"
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>

        {/* FAQs Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 my-6 shadow-xs">
            <div className="text-3xl">🔍</div>
            <h3 className="text-base font-bold text-slate-900">No questions found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              We couldn't find any questions matching "{searchQuery}". Try searching with different keywords or ask us directly.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 text-xs font-semibold text-[#0bc40e] hover:underline cursor-pointer"
            >
              View all questions
            </button>
          </div>
        ) : (
          <div className="space-y-4 mb-16">
            {filteredFaqs.map((faq) => {
              const isOpen = !!openFaqs[faq.id];
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg transition-colors cursor-pointer ${
                      isOpen ? 'text-[#0bc40e]' : 'text-[#18181b] hover:text-[#0bc40e]'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                        {faq.category}
                      </span>
                      <span>{faq.question}</span>
                    </div>

                    <div
                      className={`p-1.5 rounded-lg bg-slate-100 border border-slate-200 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#0bc40e]' : 'text-[#71717a]'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-[#52525b] leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Support Banner matching TestimonialsPage footer style */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm max-w-4xl mx-auto mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0bc40e] border border-emerald-100 flex items-center justify-center mx-auto mb-4">
            <ChatQuestion01Icon size={24} strokeWidth={2.5} className="text-[#0bc40e]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            Still have questions?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
            Can't find the answer you're looking for? Our team and mentors are ready to guide you on WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowAskModal(true)}
              className="px-6 py-3 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-bold text-sm shadow-md transition-all cursor-pointer hover:-translate-y-0.5"
            >
              Get WhatsApp Guidance
            </button>
            <Link
              to="/courses"
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all"
            >
              Explore Courses
            </Link>
          </div>
        </div>

      </div>

      {/* Ask Question / WhatsApp Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAskModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>

            {askSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="text-4xl">🎉</div>
                <h3 className="text-xl font-bold text-slate-900">Question Received!</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Thank you, <strong>{askFormData.name}</strong>. Our team will reach out to your WhatsApp number shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAskSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#0bc40e] uppercase tracking-wider block mb-1">
                    HAVE A QUESTION?
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">Ask our team</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Get answers about courses, batches, schedules, and career guidance.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={askFormData.name}
                    onChange={(e) => setAskFormData({ ...askFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0bc40e] focus:ring-2 focus:ring-[#0bc40e]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={askFormData.phone}
                    onChange={(e) => setAskFormData({ ...askFormData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0bc40e] focus:ring-2 focus:ring-[#0bc40e]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Question (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="What would you like to know about our courses?"
                    value={askFormData.question}
                    onChange={(e) => setAskFormData({ ...askFormData, question: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0bc40e] focus:ring-2 focus:ring-[#0bc40e]/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Submit Question
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
