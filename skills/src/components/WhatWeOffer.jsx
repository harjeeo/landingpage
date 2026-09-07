import React from 'react';

export default function WhatWeOffer() {
  const features = [
    {
      title: "ESYR Learning",
      description: "Explain, show, you and review. Our innovative approach makes learning fun and immersive.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Industry Expert-Led",
      description: "Our products and courses have been crafted by experienced industry experts.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
        </svg>
      )
    },
    {
      title: "Active Support",
      description: "Got questions? Get your questions answered directly via our email channels.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "Accessible Learning",
      description: "All of our courses have subtitles enabled so you don't miss out on any important details.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    {
      title: "Practical & Hands-on",
      description: "Develop your skills from theory and applied learning exercises to set you up for success.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Proven Track Record",
      description: "Our students have landed dream jobs and secured higher freelance rates.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Highly Rated",
      description: "With an impressive 4.9/5 rating, the impact of our courses and products is clear.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      title: "Flexible Learning",
      description: "Our courses allow you to start whenever you're ready and learn at your own pace.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white py-8 sm:py-16 lg:py-20 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs sm:text-sm font-semibold text-[#852ef7] block">
              What we offer
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#09090b] tracking-tight leading-[1.15]">
              Skill up, stand out
            </h2>
            <p className="text-base text-[#52525b] font-normal leading-relaxed">
              We equip designers with creative skills and a strong business mindset.<br />
              Here's how we do it:
            </p>
          </div>

          <a
            href="#courses"
            className="px-6 py-3 rounded-xl bg-[#6400e6] hover:bg-[#530dd3] text-white font-semibold text-sm transition-all shadow-md shrink-0 self-start md:self-auto"
          >
            View courses
          </a>
        </div>

        {/* 4x2 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-[#e4e4e7] hover:border-[#852ef7]/50 transition-all space-y-4 shadow-sm hover:shadow-md group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#6400e6]/10 border border-[#6400e6]/20 flex items-center justify-center transition-all">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#18181b] group-hover:text-[#6400e6] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
