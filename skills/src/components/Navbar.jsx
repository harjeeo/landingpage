import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubpanel, setActiveSubpanel] = useState(null); // null | 'courses'
  const location = useLocation();

  // Close mobile menu & subpanel when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveSubpanel(null);
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
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[#8b5cf6] blur-md opacity-60 group-hover:opacity-90 transition-opacity rounded-full"></div>
            <svg className="w-8 h-8 relative z-10 text-[#a855f7]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C16 9.73199 9.73199 16 2 16C9.73199 16 16 22.268 16 30C16 22.268 22.268 16 30 16C22.268 16 16 9.73199 16 2Z" fill="url(#sparkle_grad)" />
              <defs>
                <linearGradient id="sparkle_grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#d8b4fe" />
                  <stop offset="0.5" stopColor="#a855f7" />
                  <stop offset="1" stopColor="#7e22ce" />
                </linearGradient>
              </defs>
            </svg>
          </div>
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
                  to="/courses/web-design-2-weeks-mastery-course"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <img src="/web-design-course-icon.svg" alt="" className="w-8 h-8 rounded-lg" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-[#9a7cff] transition-colors">Web Design 2 Weeks Mastery Course</span>
                      <span className="text-[10px] font-bold bg-[#6400e6]/20 text-[#a855f7] px-1.5 py-0.5 rounded-full border border-[#6400e6]/30">New</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#a1a1aa] mt-1">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#9a7cff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        1,200+
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
                  <img src="/shopify-course-icon.svg" alt="" className="w-8 h-8 rounded-lg" />
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

                <Link
                  to="/courses/the-ultimate-figma-masterclass"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <img src="https://cdn.prod.website-files.com/65c1ae21fb2191466dd6ce72/6618d01547ca0f467ffc7e5d_Figma%20Course%20Icon.svg" alt="" className="w-8 h-8 rounded-lg" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-[#9a7cff] transition-colors">Ultimate Figma Masterclass 2.0</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#a1a1aa] mt-1">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#9a7cff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        8,500+
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
                        Intermediate
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/courses/ai-designer-graphic-designing"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <img src="https://cdn.prod.website-files.com/65c1ae21fb2191466dd6ce72/6618d4ff39ee67d0818efc30_Navigation%20Icons.svg" alt="" className="w-8 h-8 rounded-lg" />
                  <div>
                    <span className="text-sm font-semibold text-white group-hover:text-[#9a7cff] transition-colors">AI Designer and Graphic Designing Course</span>
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

                <Link
                  to="/courses/ux-ui-design-course"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <img src="https://cdn.prod.website-files.com/65c1ae21fb2191466dd6ce72/6618d50b4ad9d91e8ca0c5a8_UI%20Course%20Icon.svg" alt="" className="w-8 h-8 rounded-lg" />
                  <div>
                    <span className="text-sm font-semibold text-white group-hover:text-[#9a7cff] transition-colors">UX/UI Design Course</span>
                    <div className="flex items-center gap-3 text-xs text-[#a1a1aa] mt-1">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#9a7cff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        800+
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
                        Intermediate
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="pt-2 border-t border-white/10">
                  <div className="text-[11px] font-semibold text-[#71717a] uppercase tracking-wider px-3 py-1">Bundles</div>
                  <Link
                    to="/courses/the-ultimate-figma-masterclass"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#6400e6]/10 hover:bg-[#6400e6]/20 border border-[#6400e6]/30 text-xs text-[#9a7cff] transition-colors"
                  >
                    <span className="font-semibold">Ultimate ALL-IN Bundle (Save $210)</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/courses/the-ultimate-figma-masterclass" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">Figma</Link>
          <a href="/#courses" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">UX Design</a>
          <Link to="/testimonial" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">Testimonials</Link>
          <a href="/#faq" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">FAQ</a>
        </div>

        {/* Action Buttons Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-full bg-[#181a24] hover:bg-[#232736] border border-white/15 text-white/90 font-medium text-xs sm:text-sm transition-all"
          >
            Enter academy
          </Link>
          <Link
            to="/courses"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#9333ea] hover:from-[#6d28d9] hover:to-[#7e22ce] text-white font-semibold text-xs sm:text-sm transition-all"
          >
            Buy courses
          </Link>
        </div>

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
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#8b5cf6] blur-md opacity-60 rounded-full"></div>
                    <svg className="w-8 h-8 relative z-10 text-[#a855f7]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 2C16 9.73199 9.73199 16 2 16C9.73199 16 16 22.268 16 30C16 22.268 22.268 16 30 16C22.268 16 16 9.73199 16 2Z" fill="url(#sparkle_grad_mob1)" />
                      <defs>
                        <linearGradient id="sparkle_grad_mob1" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#d8b4fe" />
                          <stop offset="0.5" stopColor="#a855f7" />
                          <stop offset="1" stopColor="#7e22ce" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
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

                {/* Figma */}
                <Link
                  to="/courses/the-ultimate-figma-masterclass"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3.5 text-xl font-medium text-[#dfdfe2] hover:text-white hover:translate-x-1 transition-all border-b border-white/10"
                >
                  Figma
                </Link>

                {/* UX Design */}
                <a
                  href="/#courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3.5 text-xl font-medium text-[#dfdfe2] hover:text-white hover:translate-x-1 transition-all border-b border-white/10"
                >
                  UX Design
                </a>

                {/* Testimonials */}
                <Link
                  to="/testimonial"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3.5 text-xl font-medium text-[#dfdfe2] hover:text-white hover:translate-x-1 transition-all border-b border-white/10"
                >
                  Testimonials
                </Link>

                {/* FAQ */}
                <a
                  href="/#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3.5 text-xl font-medium text-[#dfdfe2] hover:text-white hover:translate-x-1 transition-all border-b border-white/10"
                >
                  FAQ
                </a>

                {/* Bottom CTA Actions */}
                <div className="pt-6 space-y-3 pb-8">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center block py-3.5 px-4 rounded-xl bg-[#181a24] hover:bg-[#232736] border border-white/15 text-white font-medium text-base transition-all"
                  >
                    Enter academy
                  </Link>
                  <Link
                    to="/courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center block py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#9333ea] hover:from-[#6d28d9] hover:to-[#7e22ce] text-white font-semibold text-base shadow-lg shadow-purple-900/30 transition-all"
                  >
                    Buy courses
                  </Link>
                </div>

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
                  to="/courses/web-design-2-weeks-mastery-course"
                  onClick={() => { setMobileMenuOpen(false); setActiveSubpanel(null); }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131520] hover:bg-[#191c2b] border border-white/10 hover:border-purple-500/40 transition-all group active:scale-[0.99]"
                >
                  <img src="/web-design-course-icon.svg" alt="" className="w-10 h-10 rounded-xl shrink-0 mt-0.5 border border-white/10" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">Web Design 2 Weeks Mastery</span>
                      <span className="text-[9px] font-bold bg-[#6400e6]/20 text-[#a855f7] px-1.5 py-0.5 rounded-full border border-[#6400e6]/30">New</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        1,200+
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
                  <img src="/shopify-course-icon.svg" alt="" className="w-10 h-10 rounded-xl shrink-0 mt-0.5 border border-white/10" />
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

                <Link
                  to="/courses/the-ultimate-figma-masterclass"
                  onClick={() => { setMobileMenuOpen(false); setActiveSubpanel(null); }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131520] hover:bg-[#191c2b] border border-white/10 hover:border-purple-500/40 transition-all group active:scale-[0.99]"
                >
                  <img src="https://cdn.prod.website-files.com/65c1ae21fb2191466dd6ce72/6618d01547ca0f467ffc7e5d_Figma%20Course%20Icon.svg" alt="" className="w-10 h-10 rounded-xl shrink-0 mt-0.5 border border-white/10" />
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">Ultimate Figma Masterclass 2.0</div>
                    <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        8,500+
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
                        Intermediate
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/courses/ai-designer-graphic-designing"
                  onClick={() => { setMobileMenuOpen(false); setActiveSubpanel(null); }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131520] hover:bg-[#191c2b] border border-white/10 hover:border-purple-500/40 transition-all group active:scale-[0.99]"
                >
                  <img src="https://cdn.prod.website-files.com/65c1ae21fb2191466dd6ce72/6618d4ff39ee67d0818efc30_Navigation%20Icons.svg" alt="" className="w-10 h-10 rounded-xl shrink-0 mt-0.5 border border-white/10" />
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">AI Designer & Graphic Course</div>
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

                <Link
                  to="/courses/ux-ui-design-course"
                  onClick={() => { setMobileMenuOpen(false); setActiveSubpanel(null); }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131520] hover:bg-[#191c2b] border border-white/10 hover:border-purple-500/40 transition-all group active:scale-[0.99]"
                >
                  <img src="https://cdn.prod.website-files.com/65c1ae21fb2191466dd6ce72/6618d50b4ad9d91e8ca0c5a8_UI%20Course%20Icon.svg" alt="" className="w-10 h-10 rounded-xl shrink-0 mt-0.5 border border-white/10" />
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">UX/UI Design Course</div>
                    <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                      <span className="bg-white/5 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1">
                        <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        800+
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
                        Intermediate
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Bundle Card */}
                <div className="pt-2">
                  <Link
                    to="/courses/the-ultimate-figma-masterclass"
                    onClick={() => { setMobileMenuOpen(false); setActiveSubpanel(null); }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-violet-900/30 to-indigo-900/40 border border-purple-500/50 hover:border-purple-400 shadow-xl shadow-purple-950/60 transition-all group active:scale-[0.99]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-purple-300">SPECIAL BUNDLE</span>
                        <span className="bg-purple-500 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-full">Save $210</span>
                      </div>
                      <div className="text-sm font-bold text-white mt-1 group-hover:text-purple-200 transition-colors">Ultimate ALL-IN Bundle</div>
                    </div>
                    <span className="text-lg text-purple-300 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>

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



