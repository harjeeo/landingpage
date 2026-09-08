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

const CoverUXUIResearchBundle = () => (
  <div className="w-full h-full bg-[#f0f9ff] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-indigo-600 flex items-center justify-center text-white text-[9px] font-bold">d</div>
        <span className="text-[10px] font-bold text-slate-700">Designership</span>
      </div>
      <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">Save $60</span>
    </div>
    <div className="my-auto">
      <div className="text-[11px] font-bold text-slate-800 leading-tight">UX/UI Design</div>
      <div className="text-xs font-black text-indigo-700">& Research Bundle</div>
    </div>
    <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-600 flex-wrap">
      <span className="bg-white px-1.5 py-0.5 rounded border border-indigo-100 shadow-2xs">UI Masterclass</span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-indigo-100 shadow-2xs">UX Research</span>
    </div>
  </div>
);

const CoverShopify = () => (
  <div className="w-full h-full bg-[#f0fdf4] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-[#10b981] flex items-center justify-center text-white text-[9px] font-bold">s</div>
        <span className="text-[10px] font-bold text-slate-700">Designership</span>
      </div>
      <span className="text-[9px] font-bold bg-[#10b981]/20 text-[#047857] px-1.5 py-0.5 rounded">New</span>
    </div>
    <div className="my-auto">
      <div className="text-[11px] font-bold text-slate-800 leading-tight">Shopify 1 Week</div>
      <div className="text-xs font-black text-[#047857]">Master Course</div>
    </div>
    <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-600 flex-wrap">
      <span className="bg-white px-1.5 py-0.5 rounded border border-emerald-100 shadow-2xs">🛍️ Store Design</span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-emerald-100 shadow-2xs">⚡ E-commerce UX</span>
    </div>
  </div>
);

const CoverWebDesign = () => (
  <div className="w-full h-full bg-[#f5f3ff] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-[#6400e6] flex items-center justify-center text-white text-[9px] font-bold">w</div>
        <span className="text-[10px] font-bold text-slate-700">Designership</span>
      </div>
      <span className="text-[9px] font-bold bg-[#6400e6]/20 text-[#6400e6] px-1.5 py-0.5 rounded">New</span>
    </div>
    <div className="my-auto">
      <div className="text-[11px] font-bold text-slate-800 leading-tight">Web Design 2 Weeks</div>
      <div className="text-xs font-black text-[#6400e6]">Mastery Course</div>
    </div>
    <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-600 flex-wrap">
      <span className="bg-white px-1.5 py-0.5 rounded border border-purple-100 shadow-2xs">🌐 Design & Build</span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-purple-100 shadow-2xs">🚀 Launch Websites</span>
    </div>
  </div>
);

const COURSES_DATA = [
  {
    id: 'web-design-2-weeks-mastery-course',
    title: 'Web Design 2 Weeks Mastery Course',
    type: 'Individual',
    category: 'Web Design',
    level: 'All Levels',
    students: '1,200+',
    rating: '5.0',
    CoverComponent: CoverWebDesign,
    description: 'Learn how to design, build, customize, and launch modern, professional, responsive websites from scratch in just 14 days.',
    price: 300,
    popularIndex: 0,
    isNew: true,
    badge: 'New',
    link: '/courses/web-design-2-weeks-mastery-course'
  },
  {
    id: 'figma-masterclass',
    title: 'Ultimate Figma Masterclass Course',
    type: 'Individual',
    category: 'Figma',
    level: 'Intermediate',
    students: '8,500+',
    rating: '4.9',
    CoverComponent: CoverFigma,
    description: 'Learn advanced Figma workflows, Auto-Layout 5.0, variables, design tokens, interactive prototyping, building component libraries, and developer handoff.',
    price: 300,
    popularIndex: 1,
    isNew: true,
    link: '/courses/the-ultimate-figma-masterclass'
  },
  {
    id: 'ux-research-strategy',
    title: 'Practical UX Research & Strategy',
    type: 'Individual',
    category: 'UX Research',
    level: 'Beginner',
    students: '1,500+',
    rating: '4.9',
    CoverComponent: CoverResearch,
    description: 'Master user interviews, usability testing, journey mapping, quantitative metrics, problem framing, and strategic insights for real-world products.',
    price: 250,
    popularIndex: 2,
    link: '/courses/practical-ux-research-strategy'
  },
  {
    id: 'figma-research-bundle',
    title: 'Figma & UX Research Course Bundle',
    type: 'Bundles',
    category: 'Figma',
    level: 'Intermediate',
    students: '3,200+',
    rating: '4.9',
    CoverComponent: CoverFigmaResearchBundle,
    description: 'Get both the Ultimate Figma Masterclass 2.0 and Practical UX Research & Strategy course. Save $60 on the bundle.',
    price: 490,
    popularIndex: 3,
    link: '/courses/figma-research-bundle'
  },
  {
    id: 'ux-ui-masterclass',
    title: 'UX/UI Design Course',
    type: 'Individual',
    category: 'UI/UX Design',
    level: 'Intermediate',
    students: '800+',
    rating: '4.9',
    CoverComponent: CoverUXUI,
    description: 'Comprehensive end-to-end UX/UI design masterclass covering product strategy, wireframing, UI execution, accessibility, and design handoff.',
    price: 280,
    popularIndex: 4,
    link: '/courses/ux-ui-design-course'
  },
  {
    id: 'all-in-bundle',
    title: 'Ultimate ALL-IN Bundle',
    type: 'Bundles',
    category: 'UI/UX Design',
    level: 'Advance',
    students: '5,000+',
    rating: '5.0',
    CoverComponent: CoverAllInBundle,
    description: 'Complete access to all current and future courses, plus all design kits, UI systems, and design templates. Maximum savings ($210 off).',
    price: 790,
    popularIndex: 5,
    link: '/courses/all-in-bundle'
  },
  {
    id: 'ux-ui-research-bundle',
    title: 'UX/UI Design & Research Bundle',
    type: 'Bundles',
    category: 'UI/UX Design',
    level: 'Intermediate',
    students: '1,900+',
    rating: '4.9',
    CoverComponent: CoverUXUIResearchBundle,
    description: 'Master both UI design execution and UX research strategy in a single bundled pass. Includes all project files and case studies.',
    price: 470,
    popularIndex: 6,
    link: '/courses/ux-ui-research-bundle'
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
                  'Web Design',
                  'Figma',
                  'Shopify',
                  'UX Research',
                  'UI/UX Design'
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

            {/* 3-Column Course Grid matching exact Webflow design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredCourses.map((course) => {
                const Cover = course.CoverComponent;
                return (
                  <Link
                    key={course.id}
                    to={course.link}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Course Cover Graphic Container */}
                      <div className="relative h-44 border-b border-slate-100">
                        <Cover />
                      </div>

                      <div className="p-5 space-y-3">
                        {/* Title */}
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base font-bold text-[#09090b] group-hover:text-[#7c47ff] transition-colors leading-snug">
                            {course.title}
                          </h3>
                          {course.isNew && (
                            <span className="text-[10px] font-bold bg-[#7c3aed]/10 text-[#7c3aed] px-1.5 py-0.5 rounded border border-[#7c3aed]/20 shrink-0">
                              New
                            </span>
                          )}
                        </div>

                        {/* Meta Badges: Students, Rating, Level */}
                        <div className="flex items-center gap-3 text-xs text-[#71717a] font-medium">
                          <span className="flex items-center gap-1">
                            👥 {course.students}
                          </span>
                          <span className="flex items-center gap-1 text-amber-500 font-semibold">
                            ★ {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            📊 {course.level}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[#52525b] leading-relaxed line-clamp-3">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="p-5 pt-0">
                      <div className="text-xl font-bold text-[#09090b]">
                        ${course.price}
                      </div>
                    </div>
                  </Link>
                );
              })}
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
