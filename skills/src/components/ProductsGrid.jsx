import React from 'react';

export default function ProductsGrid() {
  const products = [
    {
      title: "ShipFaster UI 2.0",
      description: "Our flagship Figma design system with 6,000+ components and 150+ screens.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Ultimate Figma Kit",
      description: "Pre-built component library built with Figma Auto-Layout 5.0 and variables.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: "UX Research Playbook",
      description: "Step-by-step UX research frameworks, interview scripts, and survey templates.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Portfolio System",
      description: "High-converting UX designer portfolio templates to get hired fast.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
      )
    },
    {
      title: "Design System Tokens",
      description: "Master variable modes, light/dark theme tokens, and accessibility palettes.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 12L2 9l4-6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3l-4 6 5 12 5-12-4-6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20" />
        </svg>
      )
    },
    {
      title: "UI Component Library",
      description: "Clean web and mobile responsive UI patterns for SaaS and e-commerce.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <rect x="5" y="2" width="14" height="20" rx="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
        </svg>
      )
    },
    {
      title: "Wireframe Kit",
      description: "Rapid low-fidelity and high-fidelity wireframing components.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 9h16M4 15h16M9 4v16M15 4v16" />
        </svg>
      )
    },
    {
      title: "Design Career Roadmap",
      description: "Comprehensive guide to landing high-paying UX/UI designer roles.",
      icon: (
        <svg className="w-6 h-6 text-[#6400e6] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m15 -6l-7.5 7.428l-7.5 -7.428" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17" />
        </svg>
      )
    }
  ];

  return (
    <section id="products" className="bg-white py-8 sm:py-16 lg:py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#09090b] tracking-tight leading-[1.15]">
              Our Ecosystem
            </h2>
            <p className="text-base text-[#52525b]">
              UI Kits, Figma templates, and design system resources to speed up your workflow.
            </p>
          </div>

          <a
            href="#all-products"
            className="px-6 py-3 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm transition-all shadow-md shrink-0 self-start md:self-auto"
          >
            View all
          </a>
        </div>

        {/* 4x2 Grid of Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#7c3aed]/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#6400e6]/10 border border-[#6400e6]/20 flex items-center justify-center transition-all">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-[#18181b] group-hover:text-[#7c3aed] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-[#52525b] leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#7c3aed]">
                <span>Learn more →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
