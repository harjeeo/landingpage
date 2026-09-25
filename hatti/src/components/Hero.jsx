import React from 'react';
import {
  Store01Icon,
  CheckmarkCircle02Icon,
  ArrowUpRight01Icon,
  ArrowDownRight01Icon
} from 'hugeicons-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-28">
      
      {/* Background Ambient Glow Lights (Warm Orange/Peach Gradient) */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] overflow-hidden -z-10 select-none">
        {/* Top Center Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[450px] bg-gradient-to-b from-orange-200/40 via-amber-100/30 to-transparent blur-3xl rounded-full" />
        
        {/* Left Peach Accent */}
        <div className="absolute top-10 -left-20 w-[400px] h-[300px] bg-orange-100/50 blur-[100px] rounded-full" />
        
        {/* Right Peach Accent */}
        <div className="absolute top-10 -right-20 w-[400px] h-[300px] bg-amber-100/50 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Hero Grid: 50% Left Content + 50% Right Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (50%): Left-aligned content */}
          <div className="flex flex-col items-start text-left">
            
            {/* 1. Top Smart Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-orange-300 transition-all cursor-pointer group animate-in fade-in slide-in-from-top-3 duration-500">
              <Store01Icon size={15} className="text-orange-600" />
              <span className="text-xs font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                1000+ Online Store Build
              </span>
            </div>

            {/* 2. Main Hero Headline (2 lines) */}
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[64px] font-extrabold tracking-tight text-slate-950 leading-[1.12] animate-in fade-in slide-in-from-bottom-2 duration-600">
              Har Dukaan,<br />
              Ab Online.
            </h1>

            {/* 3. Sub-headline / Paragraph */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              Your shop is no longer limited to your local market. With Hatti, create your own online store and take your products directly to customers, wherever they are. A simple way to take your local business online.
            </p>

            {/* 4. Value Props / Feature Badges */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-semibold text-slate-700">
              
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Build Your Store</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Sell Online Easily</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Grow Your Business</span>
              </div>

            </div>

            {/* 5. Hero CTA Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              
              {/* Primary Dark Button */}
              <a
                href="#build"
                className="group px-7 py-3.5 rounded-full bg-[#111827] text-white text-sm font-bold hover:bg-black transition-all shadow-md hover:shadow-xl hover:shadow-slate-900/10 flex items-center gap-2 active:scale-95"
              >
                <span>Build Your Store</span>
                <ArrowDownRight01Icon size={16} strokeWidth={2.5} className="text-white group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              {/* Secondary White Ghost Button */}
              <a
                href="#features"
                className="group px-7 py-3.5 rounded-full bg-white text-slate-800 text-sm font-bold border border-slate-200/90 hover:bg-slate-50/80 hover:border-slate-300 transition-all shadow-xs hover:shadow-sm flex items-center gap-2 active:scale-95"
              >
                <span>Explore Features</span>
                <ArrowUpRight01Icon size={16} strokeWidth={2.5} className="text-slate-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

            </div>

          </div>

          {/* Right Column (50%): Store Showcase Illustration */}
          <div className="flex items-center justify-center lg:justify-end w-full">
            <div className="w-full max-w-xl lg:max-w-none">
              <img
                src="/images/store-showcase.jpg"
                alt="GOELFASHIONSTORE.COM - Hatti Retail Storefront"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>

        {/* 6. Social Proof / Client Logos */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-100/80 max-w-5xl mx-auto space-y-6">
          <p className="text-xs sm:text-sm font-medium text-slate-400 text-center">
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
