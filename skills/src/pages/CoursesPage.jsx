import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Custom Graphic Covers matching original light theme
const CoverFigma = () => (
  <div className="w-full h-full bg-[#f4f5f8] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded bg-[#6400e6] flex items-center justify-center text-white text-[9px] font-bold">d</div>
      <span className="text-[10px] font-bold text-slate-700">Designership</span>
    </div>
    <div className="my-auto">
      <div className="text-[11px] font-bold text-slate-800 leading-tight">The Ultimate Figma</div>
      <div className="text-xs font-black text-[#6400e6] flex items-center gap-1">
        Masterclass <span className="text-[8px] bg-[#6400e6] text-white px-1 rounded font-bold">2.0</span>
      </div>
    </div>
    <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-500 flex-wrap">
      <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">❖ Components</span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">↳ Auto Layout</span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">❖ Variables</span>
    </div>
  </div>
);

const CoverResearch = () => (
  <div className="w-full h-full bg-[#eef7ff] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded bg-sky-600 flex items-center justify-center text-white text-[9px] font-bold">d</div>
      <span className="text-[10px] font-bold text-slate-700">Designership</span>
    </div>
    <div className="my-auto">
      <div className="text-[11px] font-bold text-slate-800 leading-tight">Practical UX</div>
      <div className="text-xs font-black text-sky-700">Research & Strategy</div>
    </div>
    <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-600 flex-wrap">
      <span className="bg-white px-1.5 py-0.5 rounded border border-sky-100 shadow-2xs">📋 Problem Framing</span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-sky-100 shadow-2xs">📊 Data Analysis</span>
    </div>
  </div>
);

const CoverFigmaResearchBundle = () => (
  <div className="w-full h-full bg-[#fdf2f8] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-pink-600 flex items-center justify-center text-white text-[9px] font-bold">d</div>
        <span className="text-[10px] font-bold text-slate-700">Designership</span>
      </div>
      <span className="text-[9px] font-bold bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded">Save $60</span>
    </div>
    <div className="my-auto">
      <div className="text-[11px] font-bold text-slate-800 leading-tight">Figma & UX Research</div>
      <div className="text-xs font-black text-pink-700">Course Bundle</div>
    </div>
    <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-600 flex-wrap">
      <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 shadow-2xs">Figma Masterclass</span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 shadow-2xs">UX Research</span>
    </div>
  </div>
);

const CoverUXUI = () => (
  <div className="w-full h-full bg-[#f5f3ff] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded bg-[#6400e6] flex items-center justify-center text-white text-[9px] font-bold">d</div>
      <span className="text-[10px] font-bold text-slate-700">Designership</span>
    </div>
    <div className="my-auto">
      <div className="text-[11px] font-bold text-slate-800 leading-tight">UX/UI Design</div>
      <div className="text-xs font-black text-[#6400e6]">Masterclass</div>
    </div>
    <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-600 flex-wrap">
      <span className="bg-white px-1.5 py-0.5 rounded border border-purple-100 shadow-2xs">UX Strategy</span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-purple-100 shadow-2xs">UI Design</span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-purple-100 shadow-2xs">Handoff</span>
    </div>
  </div>
);

const CoverAllInBundle = () => (
  <div className="w-full h-full bg-[#f0fdf4] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-emerald-600 flex items-center justify-center text-white text-[9px] font-bold">d</div>
        <span className="text-[10px] font-bold text-slate-700">Designership</span>
      </div>
      <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Save $210</span>
    </div>
    <div className="my-auto">
      <div className="text-[11px] font-bold text-slate-800 leading-tight">Ultimate</div>
      <div className="text-xs font-black text-emerald-700">All-in Bundle</div>
    </div>
    <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-600 flex-wrap">
      <span className="bg-white px-1.5 py-0.5 rounded border border-emerald-100 shadow-2xs">All Courses</span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-emerald-100 shadow-2xs">All Design Kits</span>
    </div>
  </div>
);

const COURSES_DATA = [
  {
    id: 'ui-design-masterclass',
    title: 'UI Design Masterclass — Next-Gen UI Design with AI',
    type: 'Individual',
    category: 'UI/UX Design',
    level: 'All Levels',
    students: '2,400+',
    rating: '5.0',
    duration: '1 Month Comprehensive',
    image: '/images/ui-design-masterclass.jpg',
    description: 'Master modern UI design principles, Figma design systems, component architecture, and AI-accelerated workflows.',
    price: 2999,
    popularIndex: 0,
    isNew: true,
    badge: 'New',
    link: '/courses/ui-design-masterclass'
  },
  {
    id: 'graphic-design-in-7-days',
    title: 'Graphic Design in 7 Days — Learn, Create & Master AI',
    type: 'Individual',
    category: 'Graphic Design',
    level: 'All Levels',
    students: '1,500+',
    rating: '5.0',
    duration: '7 Days Sprint',
    image: '/images/graphic-design-in-7-days.jpg',
    description: 'Master graphic design principles, visual hierarchy, branding, social media creatives, and cutting-edge AI design tools in 7 days.',
    price: 2999,
    popularIndex: 1,
    isNew: true,
    badge: 'New',
    link: '/courses/graphic-design-in-7-days'
  },
  {
    id: 'shopify-1-week-master-course',
    title: 'Shopify 1 Week Master Course',
    type: 'Individual',
    category: 'Shopify',
    level: 'All Levels',
    students: '650+',
    rating: '4.9',
    duration: '7 Days Sprint',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Master Shopify store design, custom Liquid themes, e-commerce UX, and conversion optimization in just 7 days.',
    price: 2999,
    popularIndex: 2,
    isNew: true,
    badge: 'New',
    link: '/courses/shopify-1-week-master-course'
  }
];

export default function CoursesPage() {
  const [courseType, setCourseType] = useState('All');
  const [selectedCategories, setSelectedCategories] = useState(['All Categories']);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);
  const [suggestionData, setSuggestionData] = useState({ topic: '', details: '', email: '' });

  const handleCategoryToggle = (category) => {
    if (category === 'All Categories') {
      setSelectedCategories(['All Categories']);
      return;
    }

    let updated = selectedCategories.filter((c) => c !== 'All Categories');
    if (updated.includes(category)) {
      updated = updated.filter((c) => c !== category);
    } else {
      updated.push(category);
    }

    if (updated.length === 0) {
      setSelectedCategories(['All Categories']);
    } else {
      setSelectedCategories(updated);
    }
  };

  const handleLevelToggle = (level) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter((l) => l !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      if (courseType === 'Individual' && course.type !== 'Individual') return false;
      if (courseType === 'Bundles' && course.type !== 'Bundles') return false;

      if (!selectedCategories.includes('All Categories')) {
        const matchesCategory = selectedCategories.some((cat) => course.category.includes(cat));
        if (!matchesCategory) return false;
      }

      if (selectedLevels.length > 0) {
        if (!selectedLevels.includes(course.level)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
      return a.popularIndex - b.popularIndex;
    });
  }, [courseType, selectedCategories, selectedLevels, sortBy]);

  const handleSuggestSubmit = (e) => {
    e.preventDefault();
    setSuggestionSubmitted(true);
    setTimeout(() => {
      setShowSuggestModal(false);
      setSuggestionSubmitted(false);
      setSuggestionData({ topic: '', details: '', email: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans pb-24">
      
      {/* Main Content Container directly below Sticky Navbar matching exact screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          
          {/* Left Sidebar Filters */}
          <aside className="space-y-7">
            
            {/* Courses Filter Group */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#09090b] text-sm">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span>Courses</span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm pl-0.5">
                {[
                  { id: 'All', label: 'All courses' },
                  { id: 'Individual', label: 'Individual' },
                  { id: 'Bundles', label: 'Bundles', badge: 'Save more' }
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${courseType === item.id ? 'border-[#7c47ff] bg-white' : 'border-slate-300 bg-white group-hover:border-slate-400'}`}>
                        {courseType === item.id && (
                          <div className="w-2 h-2 rounded-full bg-[#7c47ff]" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="courseType"
                        checked={courseType === item.id}
                        onChange={() => setCourseType(item.id)}
                        className="sr-only"
                      />
                      <span className={`font-medium transition-colors ${courseType === item.id ? 'text-[#7c47ff] font-semibold' : 'text-[#52525b] group-hover:text-slate-900'}`}>
                        {item.label}
                      </span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-semibold bg-purple-100 text-[#7c3aed] px-2 py-0.5 rounded-full border border-purple-200">
                        {item.badge}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200/70 pt-5"></div>

            {/* Categories Filter Group */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#09090b] text-sm">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Categories</span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm pl-0.5">
                {[
                  'All Categories',
                  'UI/UX Design',
                  'Graphic Design',
                  'Shopify'
                ].map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#7c47ff] border-[#7c47ff] text-white' : 'bg-white border-slate-300 group-hover:border-slate-400'}`}>
                        {isChecked && (
                          <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryToggle(cat)}
                        className="sr-only"
                      />
                      <span className={`font-medium transition-colors ${isChecked ? 'text-[#7c47ff] font-semibold' : 'text-[#52525b] group-hover:text-slate-900'}`}>
                        {cat}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-200/70 pt-5"></div>

            {/* Level Filter Group */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#09090b] text-sm">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Level</span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm pl-0.5">
                {['Beginner', 'Intermediate', 'Advance'].map((lvl) => {
                  const isChecked = selectedLevels.includes(lvl);
                  return (
                    <label key={lvl} className="flex items-center gap-2.5 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#7c47ff] border-[#7c47ff] text-white' : 'bg-white border-slate-300 group-hover:border-slate-400'}`}>
                        {isChecked && (
                          <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleLevelToggle(lvl)}
                        className="sr-only"
                      />
                      <span className={`font-medium transition-colors ${isChecked ? 'text-[#7c47ff] font-semibold' : 'text-[#52525b] group-hover:text-slate-900'}`}>
                        {lvl}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Suggest a Course Card Container */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-1.5">
              <h4 className="text-sm font-bold text-[#09090b]">Suggest a course</h4>
              <p className="text-xs text-[#71717a]">What would you like to learn next?</p>
              <button
                onClick={() => setShowSuggestModal(true)}
                className="text-xs font-semibold text-[#7c3aed] hover:underline pt-1 block mx-auto"
              >
                Submit your suggestion.
              </button>
            </div>

          </aside>

          {/* Main Course Catalog (Right Side) */}
          <main className="lg:col-span-3">
            
            {/* Header Title & Sort Selector */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-[#09090b] tracking-tight">
                All Courses
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-0 font-medium text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="popular">Popular ∨</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>
            </div>

            {/* 2-Column Course Grid matching exact Card UI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
              {filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  to={course.link}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
                >
                  <div>
                    {/* Course Thumbnail Image with Duration Badge */}
                    <div className="h-52 sm:h-56 overflow-hidden bg-slate-50 border-b border-slate-100 relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3.5 left-3.5 bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/10">
                        {course.duration}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Title & New Badge */}
                      <div className="flex items-start justify-between gap-2.5">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#0bc40e] transition-colors leading-snug">
                          {course.title}
                        </h3>
                        {course.isNew && (
                          <span className="text-[10px] font-bold bg-[#0bc40e]/10 text-[#0bc40e] px-2 py-0.5 rounded-full border border-[#0bc40e]/20 shrink-0">
                            New
                          </span>
                        )}
                      </div>

                      {/* 3 Meta Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Badge 1: Students */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 text-slate-700 text-[11px] font-semibold border border-slate-200/70">
                          <svg className="w-3.5 h-3.5 text-[#0bc40e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{course.students}</span>
                        </span>

                        {/* Badge 2: Rating */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200/70">
                          <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span>{course.rating}</span>
                        </span>

                        {/* Badge 3: Level */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200/70">
                          <svg className="w-3.5 h-3.5 text-[#0bc40e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span>{course.level}</span>
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Price & View Course CTA */}
                  <div className="p-6 pt-0 mt-2 flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-bold text-slate-900">
                      ₹{typeof course.price === 'number' ? course.price.toLocaleString('en-IN') : course.price}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0bc40e] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View Course →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 mb-16">
                <p className="text-base font-medium">No courses match your selected filter criteria.</p>
                <button
                  onClick={() => {
                    setCourseType('All');
                    setSelectedCategories(['All Categories']);
                    setSelectedLevels([]);
                  }}
                  className="mt-3 text-xs text-[#7c47ff] font-bold hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Suggest a Course Modal */}
      {showSuggestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Suggest a Course</h3>
              <button
                onClick={() => setShowSuggestModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {suggestionSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="text-3xl">🎉</div>
                <h4 className="text-base font-bold text-slate-900">Thank you!</h4>
                <p className="text-xs text-slate-600">Your suggestion has been received by Mizko and the team.</p>
              </div>
            ) : (
              <form onSubmit={handleSuggestSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Course Topic / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Advanced Design System Tokens & Variables"
                    value={suggestionData.topic}
                    onChange={(e) => setSuggestionData({ ...suggestionData, topic: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#7c47ff]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">What would you like to learn?</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what specific skills or tools you'd love to see covered..."
                    value={suggestionData.details}
                    onChange={(e) => setSuggestionData({ ...suggestionData, details: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#7c47ff]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Your Email (optional)</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={suggestionData.email}
                    onChange={(e) => setSuggestionData({ ...suggestionData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#7c47ff]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSuggestModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#0bc40e] text-white font-bold px-4 py-2 rounded-xl hover:bg-[#0aa30c] shadow-md shadow-[#0bc40e]/20"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
