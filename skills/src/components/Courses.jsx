import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [activeTab, setActiveTab] = useState('1-month');

  const allCourses = [
    {
      id: 0,
      slug: "ui-design-masterclass",
      category: "1-month",
      title: "UI Design Masterclass — Next-Gen UI Design with AI",
      students: "2,400+",
      rating: "5.0",
      level: "All Levels",
      duration: "1 Month Comprehensive",
      description: "Master modern UI design principles, Figma design systems, component architecture, and AI-accelerated workflows.",
      price: "₹2,999",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
      isNew: true
    },
    {
      id: 1,
      slug: "graphic-design-in-7-days",
      category: "1-week",
      title: "Graphic Design in 7 Days — Learn, Create & Master AI",
      students: "1,500+",
      rating: "5.0",
      level: "All Levels",
      duration: "7 Days Sprint",
      description: "Master graphic design principles, visual composition, branding, and cutting-edge generative AI design tools in 7 days.",
      price: "₹2,999",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
      isNew: true
    },
    {
      id: 2,
      slug: "shopify-1-week-master-course",
      category: "1-week",
      title: "Shopify 1 Week Master Course",
      students: "650+",
      rating: "4.9",
      level: "All Levels",
      duration: "7 Days Sprint",
      description: "Master Shopify store design, custom Liquid themes, e-commerce UX, and conversion optimization in just 7 days.",
      price: "₹2,999",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      isNew: true
    }
  ];

  const filteredCourses = allCourses.filter(course => course.category === activeTab);

  return (
    <section id="courses" className="bg-white text-[#18181b] font-sans py-12 sm:py-16 lg:py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="space-y-6 mb-12 lg:mb-16">
          
          {/* Tabs: 1 Month Course / 1 Week Course */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-2xs">
            <button
              onClick={() => setActiveTab('1-month')}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === '1-month'
                  ? 'bg-white text-[#09090b] shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              1 Month Course
            </button>
            <button
              onClick={() => setActiveTab('1-week')}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === '1-week'
                  ? 'bg-white text-[#09090b] shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              1 Week Course
            </button>
          </div>

          {/* Title & Explore Courses Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#09090b] tracking-tight leading-[1.15]">
                Learn skills that create opportunities.
              </h2>
              <p className="text-base text-slate-600 font-normal leading-relaxed">
                From creative design to digital marketing and paid advertising, master the skills businesses are looking for — with practical learning that takes you from beginner to confident.
              </p>
            </div>

            <Link
              to="/courses"
              className="px-6 py-3.5 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md shrink-0 self-start md:self-auto cursor-pointer"
            >
              Explore Courses
            </Link>
          </div>

        </div>

        {/* 3-Column Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.map(course => (
            <Link
              to={`/courses/${course.slug}`}
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
            >
              <div>
                <div className="h-52 sm:h-56 overflow-hidden bg-slate-50 border-b border-slate-100 relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10">
                    {course.duration}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 tracking-tight group-hover:text-[#0bc40e] transition-colors leading-snug">
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

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-2 flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-bold text-slate-900">
                  {course.price}
                </span>
                <span className="text-xs font-bold text-[#0bc40e] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  View Course →
                </span>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
