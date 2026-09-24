import React from 'react';
import {
  SparklesIcon,
  CheckmarkCircle02Icon,
  ArrowUpRight01Icon,
  ArrowDownRight01Icon
} from 'hugeicons-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 sm:pt-16 sm:pb-32">
      
      {/* Background Ambient Glow Lights (Warm Orange/Peach Gradient) */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] overflow-hidden -z-10 select-none">
        {/* Top Center Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[450px] bg-gradient-to-b from-orange-200/40 via-amber-100/30 to-transparent blur-3xl rounded-full" />
        
        {/* Left Peach Accent */}
        <div className="absolute top-10 -left-20 w-[400px] h-[300px] bg-orange-100/50 blur-[100px] rounded-full" />
        
        {/* Right Peach Accent */}
        <div className="absolute top-10 -right-20 w-[400px] h-[300px] bg-amber-100/50 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* 1. Top Smart AI Badge */}
        <div className="inline-flex items-center gap-2 p-1 pl-1.5 pr-3.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-orange-300 transition-all cursor-pointer group animate-in fade-in slide-in-from-top-3 duration-500">
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200/60 text-[11px] font-bold text-slate-800 tracking-wide">
            New
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 group-hover:text-orange-600 transition-colors">
            <SparklesIcon size={14} className="text-orange-500 fill-orange-500/20" />
            <span>Smart AI Features</span>
          </div>
        </div>

        {/* 2. Main Hero Headline */}
        <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-slate-950 leading-[1.12] max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-600">
          Perfect Every Step<br className="hidden sm:inline" />
          {' '}for Extraordinary Growth.<br className="hidden sm:inline" />
          {' '}With Smart Strategies.
        </h1>

        {/* 3. Sub-headline / Paragraph */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Enhance your workflow for superior growth with intelligent targeted strategies.
        </p>

        {/* 4. Value Props / Feature Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-slate-700">
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Customizable</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Peak Performance</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Top Security</span>
          </div>

        </div>

        {/* 5. Hero CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          
          {/* Primary Dark Button */}
          <a
            href="#explore"
            className="group px-7 py-3.5 rounded-full bg-[#111827] text-white text-sm font-bold hover:bg-black transition-all shadow-md hover:shadow-xl hover:shadow-slate-900/10 flex items-center gap-2 active:scale-95"
          >
            <span>Explore Hatti</span>
            <ArrowDownRight01Icon size={16} strokeWidth={2.5} className="text-white group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Secondary White Ghost Button */}
          <a
            href="#demo"
            className="group px-7 py-3.5 rounded-full bg-white text-slate-800 text-sm font-bold border border-slate-200/90 hover:bg-slate-50/80 hover:border-slate-300 transition-all shadow-xs hover:shadow-sm flex items-center gap-2 active:scale-95"
          >
            <span>Request a Demo</span>
            <ArrowUpRight01Icon size={16} strokeWidth={2.5} className="text-slate-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

        </div>

        {/* 6. Social Proof / Client Logos */}
        <div className="mt-20 pt-8 border-t border-slate-100/80 max-w-4xl mx-auto space-y-6">
          <p className="text-xs sm:text-sm font-medium text-slate-400">
            Join 4,000+ companies already grow
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            
            {/* Logo 1: Grapho */}
            <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <div className="flex items-center gap-0.5">
                <span className="w-1 h-3.5 bg-current rounded-full" />
                <span className="w-1 h-5 bg-current rounded-full" />
                <span className="w-1 h-3.5 bg-current rounded-full" />
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight">Grapho</span>
            </div>

            {/* Logo 2: Signum */}
            <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight">Signum.</span>
            </div>

            {/* Logo 3: Vectra */}
            <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <div className="grid grid-cols-2 gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight">Vectra</span>
            </div>

            {/* Logo 4: Optimal */}
            <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <div className="w-4 h-4 rounded-md border-2 border-current flex items-center justify-center">
                <span className="w-2 h-0.5 bg-current rounded-full" />
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight">Optimal</span>
            </div>

            {/* Logo 5: Zenith */}
            <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <div className="w-4 h-4 rounded-full bg-current flex items-center justify-center text-white">
                <span className="text-[10px] font-black">Z</span>
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight">Zenith</span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
