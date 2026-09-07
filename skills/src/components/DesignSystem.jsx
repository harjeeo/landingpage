import React from 'react';

export default function DesignSystem() {
  const stats = [
    { number: '6,000+', label: 'Components & Variants' },
    { number: '150+', label: 'Pre-built Web & Mobile Screens' },
    { number: '2,800+', label: 'Icons & Design Tokens' },
    { number: '100%', label: 'Figma Auto-Layout 5.0 Ready' }
  ];

  return (
    <section id="figma" className="py-20 lg:py-28 bg-[#0c0e15] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Figma Design Kits & Resources
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Design & Prototype <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">10x Faster</span>
            </h2>

            <p className="text-[#a1a1aa] text-base sm:text-lg leading-relaxed">
              ShipFaster UI is our flagship Figma design system built for professional UX/UI designers, agencies, and product teams. Fast-track client projects without starting from scratch.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Variables & Modes (Light, Dark, Brand themes)',
                'WCAG AAA Compliant Color Palettes & Accessibility',
                'Comprehensive UI Kit (Inputs, Buttons, Cards, Modals, Navbars)',
                'Lifetime Free Updates & Dedicated Figma Support'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                  <div className="h-5 w-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-xs">
                    ✓
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#courses"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-base shadow-xl shadow-cyan-600/25 transition-all"
              >
                Explore Figma Kit
              </a>
              <span className="text-xs text-[#a1a1aa] font-medium">Over 25,000+ downloads worldwide</span>
            </div>
          </div>

          {/* Right Product Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#13151f] border border-white/10 p-6 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((st, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#0c0e15] border border-white/10">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">{st.number}</div>
                    <div className="text-xs text-[#a1a1aa] mt-1 font-medium">{st.label}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[#a1a1aa] border-b border-white/10 pb-2">
                  <span>ShipFaster_UI_v2.0.fig</span>
                  <span className="text-emerald-400 font-semibold">● Live Sync</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1.5 rounded-lg bg-[#7c3aed] text-white font-sans font-semibold text-xs">Primary Button</span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#191c2b] text-slate-300 font-sans font-medium text-xs">Secondary Button</span>
                  <span className="px-3 py-1.5 rounded-lg border border-purple-500/50 text-purple-300 font-sans font-medium text-xs">Outline Badge</span>
                </div>

                <div className="h-2 w-full bg-[#191c2b] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 w-3/4" />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
