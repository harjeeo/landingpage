import React from 'react';

export default function WhatWeOffer() {
  const features = [
    {
      badge: "Hands-On",
      title: "Learn by Doing",
      description: "Build real-world designs, campaigns and projects while developing skills you can actually use in your career.",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
      iconBg: "bg-blue-50 text-blue-600",
      linkColor: "text-blue-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      badge: "Mentorship",
      title: "Industry Expert-Led",
      description: "Learn modern design and digital marketing techniques based on real industry practices and workflows.",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      iconBg: "bg-emerald-50 text-emerald-600",
      linkColor: "text-emerald-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
        </svg>
      )
    },
    {
      badge: "Support",
      title: "Active Support",
      description: "Got a question? Get guidance and feedback to help you understand concepts and improve your practical skills.",
      badgeColor: "bg-purple-50 text-purple-600 border-purple-100",
      iconBg: "bg-purple-50 text-purple-600",
      linkColor: "text-purple-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      badge: "Beginner",
      title: "Easy to Learn",
      description: "Our courses are structured step-by-step, making it easy for beginners to learn design and digital marketing from scratch.",
      badgeColor: "bg-violet-50 text-violet-600 border-violet-100",
      iconBg: "bg-violet-50 text-violet-600",
      linkColor: "text-violet-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      badge: "Projects",
      title: "Practical & Hands-on",
      description: "Work on real-world projects across Graphic Design, UI Design, Google Ads, Meta Ads and Digital Marketing.",
      badgeColor: "bg-pink-50 text-pink-600 border-pink-100",
      iconBg: "bg-pink-50 text-pink-600",
      linkColor: "text-pink-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      badge: "Career",
      title: "Career-Focused Skills",
      description: "Build a strong portfolio and develop practical skills that can help you pursue jobs, freelancing or your own projects.",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
      iconBg: "bg-amber-50 text-amber-600",
      linkColor: "text-amber-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      badge: "Trends",
      title: "Latest Industry Trends",
      description: "Learn current tools, strategies and techniques to stay updated with the fast-changing digital industry.",
      badgeColor: "bg-cyan-50 text-cyan-600 border-cyan-100",
      iconBg: "bg-cyan-50 text-cyan-600",
      linkColor: "text-cyan-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      badge: "Flexible",
      title: "Flexible Learning",
      description: "Learn at your own pace with structured lessons designed to fit around your schedule.",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100",
      iconBg: "bg-rose-50 text-rose-600",
      linkColor: "text-rose-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#fcfcfd] py-12 sm:py-16 lg:py-24 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#852ef7] block">
              WHAT WE OFFER
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#09090b] tracking-tight leading-[1.15]">
              Learn skills. Build your future.
            </h2>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              We help you master creative design and digital marketing skills through practical, industry-focused courses. From Graphic & UI Design to Google Ads, Meta Ads and Digital Marketing — learn the skills that turn knowledge into real opportunities.
            </p>
          </div>

          <a
            href="#courses"
            className="px-6 py-3.5 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md shrink-0 self-start md:self-auto"
          >
            Explore Courses
          </a>
        </div>

        {/* 4x2 Cards Grid Styled as Image 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Top Row: Icon on left, Badge on right */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center transition-transform group-hover:scale-105 duration-200`}>
                    {item.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-[#09090b] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Bottom Learn More Action */}
              <div className="pt-6 mt-2">
                <a
                  href="#courses"
                  className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider ${item.linkColor} hover:opacity-80 transition-all`}
                >
                  LEARN MORE
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
