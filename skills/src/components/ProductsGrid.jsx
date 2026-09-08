import React from 'react';

export default function ProductsGrid() {
  const products = [
    {
      title: "Graphic Design Mastery",
      description: "Master the fundamentals of visual design, branding, layouts, typography and professional creative workflows.",
      iconBg: "bg-purple-50 text-[#6400e6]",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: "UI Design Toolkit",
      description: "Learn to create modern, user-friendly interfaces with practical UI principles, Figma workflows and real projects.",
      iconBg: "bg-blue-50 text-blue-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 4v16M4 9h16" />
        </svg>
      )
    },
    {
      title: "Digital Marketing Playbook",
      description: "Understand the complete digital marketing process — from strategy and content to campaigns and conversions.",
      iconBg: "bg-emerald-50 text-emerald-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    {
      title: "Google Ads Mastery",
      description: "Learn how to plan, launch and optimize Google Ads campaigns with practical strategies focused on real results.",
      iconBg: "bg-amber-50 text-amber-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 8v6M8 11h6" />
        </svg>
      )
    },
    {
      title: "Meta Ads Blueprint",
      description: "Master Facebook & Instagram advertising, from campaign setup and audience targeting to optimization.",
      iconBg: "bg-indigo-50 text-indigo-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Creative Resource Hub",
      description: "Get useful templates, design resources, checklists and practical tools to speed up your creative workflow.",
      iconBg: "bg-pink-50 text-pink-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Real-World Projects",
      description: "Practice what you learn through projects designed around real business scenarios and industry requirements.",
      iconBg: "bg-cyan-50 text-cyan-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "Career Growth Guide",
      description: "Build your portfolio, improve your skills and learn how to turn your knowledge into freelance or career opportunities.",
      iconBg: "bg-rose-50 text-rose-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <section id="ecosystem" className="bg-white py-12 sm:py-16 lg:py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#852ef7] block">
              OUR LEARNING ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#09090b] tracking-tight leading-[1.15]">
              Everything you need to grow.
            </h2>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Courses, practical resources, templates and learning tools — all designed to help you learn faster, practice better and build real-world skills.
            </p>
          </div>

          <a
            href="#courses"
            className="px-6 py-3.5 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md shrink-0 self-start md:self-auto"
          >
            Explore All
          </a>
        </div>

        {/* 4x2 Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {products.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Icon */}
                <div className={`w-11 h-11 rounded-2xl ${p.iconBg} flex items-center justify-center mb-5 transition-transform group-hover:scale-105 duration-200`}>
                  {p.icon}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-[#6400e6] transition-colors">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-6 mt-2">
                <a
                  href="#courses"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#6400e6] hover:text-[#530dd3] transition-all"
                >
                  Learn More
                  <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
