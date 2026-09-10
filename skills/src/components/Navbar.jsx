import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PaintBoardIcon } from 'hugeicons-react';
import dcSkillsLogo from '../assets/dc-skills-logo.svg';
import { getCurrentUser, isAuthenticated, logout } from '../lib/auth';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubpanel, setActiveSubpanel] = useState(null); // null | 'courses'
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const location = useLocation();

  useEffect(() => {
    const updateAuth = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener('dcskills_auth_changed', updateAuth);
    return () => window.removeEventListener('dcskills_auth_changed', updateAuth);
  }, []);

  // Close mobile menu & subpanel when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveSubpanel(null);
    setCurrentUser(getCurrentUser());
  }, [location]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setActiveSubpanel(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-[#0c0e15]/95 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={dcSkillsLogo}
            alt="Designs Clue Skills"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          
          {/* Courses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('courses')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link to="/courses" className="flex items-center gap-1.5 text-sm font-medium text-[#a1a1aa] hover:text-white py-2 transition-colors">
              Courses
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'courses' ? 'rotate-180 text-purple-400' : 'text-[#71717a]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {/* Courses Dropdown Box */}
            {activeDropdown === 'courses' && (
              <div className="absolute top-full left-0 w-[420px] p-3 rounded-2xl bg-[#13151f] border border-white/10 shadow-2xl shadow-purple-950/40 space-y-1.5 z-50 animate-in fade-in duration-200">
                <div className="text-[11px] font-semibold text-[#71717a] uppercase tracking-wider px-3 py-1">
                  Courses
                </div>
                
                <Link
                  to="/courses/ui-design-masterclass"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#8b5cf6] flex items-center justify-center shrink-0 border border-purple-100/60 shadow-xs transition-transform group-hover:scale-105 mt-0.5">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-[#9a7cff] transition-colors">UI Design Masterclass — Next-Gen UI Design with AI</span>
                      <span className="text-[10px] font-bold bg-[#6400e6]/20 text-[#a855f7] px-1.5 py-0.5 rounded-full border border-[#6400e6]/30">Hot</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#a1a1aa] mt-1">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#9a7cff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        2,400+
                      </span>
                      <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                        <svg className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        5.0
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#9a7cff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        All Levels
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/courses/graphic-design-in-7-days"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-xs transition-transform group-hover:scale-105 mt-0.5">
                    <PaintBoardIcon className="w-4.5 h-4.5" size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-[#9a7cff] transition-colors">Graphic Design in 7 Days — Learn, Create & Master AI</span>
                      <span className="text-[10px] font-bold bg-[#6400e6]/20 text-[#a855f7] px-1.5 py-0.5 rounded-full border border-[#6400e6]/30">New</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#a1a1aa] mt-1">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#9a7cff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        1,500+
                      </span>
                      <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                        <svg className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        5.0
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#9a7cff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        All Levels
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/courses/shopify-1-week-master-course"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/60 shadow-xs transition-transform group-hover:scale-105 mt-0.5">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-[#9a7cff] transition-colors">Shopify 1 Week Master Course</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#a1a1aa] mt-1">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#9a7cff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        650+
                      </span>
                      <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                        <svg className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        4.9
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#9a7cff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        All Levels
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link to="/courses" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">All Courses</Link>
          <Link to="/ebooks" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">Ebooks</Link>
          <Link to="/testimonial" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">Testimonials</Link>
          <Link to="/faq" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">FAQ</Link>
        </div>

        {/* Action Buttons Desktop */}
        {currentUser || location.pathname.startsWith('/dashboard') || location.pathname === '/my-learning' || location.pathname.startsWith('/resources') || location.pathname.startsWith('/profile') || location.pathname === '/student-dashboard' ? (
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-sm text-[#9ca3af] hover:text-white font-normal transition-colors cursor-pointer flex items-center gap-1.5"
              title="Click to open Dashboard"
            >
              <span>Signed in as</span>
              <strong className="text-white hover:text-purple-300 font-semibold transition-colors underline underline-offset-4 decoration-purple-500/30 hover:decoration-purple-400">
                {currentUser?.name || 'Mehak'}
              </strong>
            </Link>
            <Link
              to="/dashboard"
              className="px-3.5 py-1.5 rounded-full bg-[#181a24] hover:bg-[#232736] border border-white/15 text-white hover:text-[#0bc40e] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                logout();
                window.location.href = '/';
              }}
              title="Logout"
              className="px-4 py-1.5 rounded-full bg-[#3b1219]/70 hover:bg-[#4c1620] border border-rose-500/30 hover:border-rose-500/50 text-rose-300 hover:text-rose-200 text-sm font-medium flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <svg className="w-4 h-4 text-rose-400 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full bg-[#181a24] hover:bg-[#232736] border border-white/15 text-white/90 font-medium text-xs sm:text-sm transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-full bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#0bc40e]/20"
            >
              Sign up
            </Link>
          </div>
        )}

        {/* Mobile menu toggle icon */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2.5 rounded-xl text-[#a1a1aa] hover:text-white bg-[#13151f] border border-white/10 hover:border-white/25 transition-all active:scale-95"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>

      {/* Full Screen Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-[#0c0e15] flex flex-col h-screen w-full overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          
          <div className="relative w-full h-full flex flex-col overflow-hidden">
            
            {/* 1. Main Mobile Menu Panel */}
            <div className={`absolute inset-0 flex flex-col w-full h-full bg-[#0c0e15] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeSubpanel ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}>
              
              {/* Top Header */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-white/10 shrink-0 bg-[#0c0e15]/95 backdrop-blur-xl">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                  <img
                    src={dcSkillsLogo}
                    alt="Designs Clue Skills"
                    className="h-8 w-auto object-contain"
                  />
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl text-[#a1a1aa] hover:text-white bg-[#13151f] border border-white/10 hover:border-white/20 transition-all active:scale-95"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Main Menu Body */}
              <div className="px-6 py-6 flex-1 overflow-y-auto space-y-2">
                
                {/* Courses Row: Text opens /courses page, Arrow opens next subpanel */}
                <div className="flex items-center justify-between py-3.5 border-b border-white/10 group">
                  <Link
                    to="/courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl font-medium text-white hover:text-purple-400 transition-all hover:translate-x-1 flex-1"
                  >
                    Courses
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSubpanel('courses');
                    }}
                    className="p-2 -mr-2 rounded-xl text-[#71717a] hover:text-purple-400 hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center"
                    aria-label="Open courses menu"
                  >
                    <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* All Courses */}
                <Link
                  to="/courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3.5 text-xl font-medium text-[#dfdfe2] hover:text-white hover:translate-x-1 transition-all border-b border-white/10"
                >
                  All Courses
                </Link>

                {/* Ebooks */}
                <Link
                  to="/ebooks"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3.5 text-xl font-medium text-[#dfdfe2] hover:text-white hover:translate-x-1 transition-all border-b border-white/10"
                >
                  Ebooks
                </Link>

                {/* Testimonials */}
                <Link
                  to="/testimonial"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3.5 text-xl font-medium text-[#dfdfe2] hover:text-white hover:translate-x-1 transition-all border-b border-white/10"
                >
                  Testimonials
                </Link>

                {/* FAQ */}
                <Link
                  to="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3.5 text-xl font-medium text-[#dfdfe2] hover:text-white hover:translate-x-1 transition-all border-b border-white/10"
                >
                  FAQ
                </Link>

                {/* Bottom CTA Actions */}
                {currentUser || location.pathname.startsWith('/dashboard') || location.pathname === '/my-learning' || location.pathname.startsWith('/resources') || location.pathname.startsWith('/profile') || location.pathname === '/student-dashboard' ? (
                  <div className="pt-6 space-y-3 pb-8">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#13151f] border border-white/10">
                      <span className="text-sm text-[#9ca3af]">
                        Signed in as <strong className="text-white font-semibold">{currentUser?.name || 'Mehak'}</strong>
                      </span>
                      <button
                        onClick={() => {
                          logout();
                          window.location.href = '/';
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-[#3b1219]/70 hover:bg-[#4c1620] border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 text-rose-400 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center block py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                ) : (
                  <div className="pt-6 space-y-3 pb-8">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center block py-3.5 px-4 rounded-xl bg-[#181a24] hover:bg-[#232736] border border-white/15 text-white font-medium text-base transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center block py-3.5 px-4 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-base shadow-lg shadow-[#0bc40e]/30 transition-all"
                    >
                      Sign up
                    </Link>
                  </div>
                )}

              </div>

            </div>

            {/* 2. Courses Subpanel (Slides left-to-right on open, right-to-left on close) */}
            <div className={`absolute inset-0 flex flex-col w-full h-full bg-[#0c0e15] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeSubpanel === 'courses' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}>
              
              {/* Subpanel Header with Back button */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-white/10 shrink-0 bg-[#0c0e15]/95 backdrop-blur-xl">
                <button
                  onClick={() => setActiveSubpanel(null)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131520] border border-white/15 text-sm font-bold text-white hover:bg-white/10 hover:border-purple-500/40 transition-all active:scale-95 shadow-md shadow-purple-950/30"
                >
                  <svg className="w-4.5 h-4.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back</span>
                </button>

                <button
                  onClick={() => { setMobileMenuOpen(false); setActiveSubpanel(null); }}
                  className="p-2.5 rounded-xl text-[#a1a1aa] hover:text-white bg-[#13151f] border border-white/10 hover:border-white/20 transition-all active:scale-95"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Subpanel Courses List */}
              <div className="px-5 py-6 flex-1 overflow-y-auto space-y-3.5">
                <div className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider px-1">
                  Available Masterclasses
                </div>

                <Link
                  to="/courses/ui-design-masterclass"
                  onClick={() => { setMobileMenuOpen(false); setActiveSubpanel(null); }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131520] hover:bg-[#191c2b] border border-white/10 hover:border-purple-500/40 transition-all group active:scale-[0.99]"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#8b5cf6] flex items-center justify-center shrink-0 border border-purple-100/60 shadow-xs mt-0.5">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">UI Design Masterclass — Next-Gen UI with AI</span>
                      <span className="text-[9px] font-bold bg-[#6400e6]/20 text-[#a855f7] px-1.5 py-0.5 rounded-full border border-[#6400e6]/30">Hot</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        2,400+
                      </span>
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1 text-amber-400 font-semibold">
                        <svg className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        5.0
                      </span>
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        All Levels
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/courses/graphic-design-in-7-days"
                  onClick={() => { setMobileMenuOpen(false); setActiveSubpanel(null); }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131520] hover:bg-[#191c2b] border border-white/10 hover:border-purple-500/40 transition-all group active:scale-[0.99]"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-xs mt-0.5">
                    <PaintBoardIcon className="w-5 h-5" size={20} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">Graphic Design in 7 Days — Learn, Create & Master AI</span>
                      <span className="text-[9px] font-bold bg-[#6400e6]/20 text-[#a855f7] px-1.5 py-0.5 rounded-full border border-[#6400e6]/30">New</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        1,500+
                      </span>
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1 text-amber-400 font-semibold">
                        <svg className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        5.0
                      </span>
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        All Levels
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/courses/shopify-1-week-master-course"
                  onClick={() => { setMobileMenuOpen(false); setActiveSubpanel(null); }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131520] hover:bg-[#191c2b] border border-white/10 hover:border-purple-500/40 transition-all group active:scale-[0.99]"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/60 shadow-xs mt-0.5">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">Shopify 1 Week Master Course</div>
                    <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        650+
                      </span>
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1 text-amber-400 font-semibold">
                        <svg className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        4.9
                      </span>
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        All Levels
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="pt-4 text-center pb-8">
                  <Link
                    to="/courses"
                    onClick={() => { setMobileMenuOpen(false); setActiveSubpanel(null); }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span>Browse All Courses Catalog</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </nav>
  );
}



