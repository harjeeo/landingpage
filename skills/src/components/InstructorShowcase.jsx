import React from 'react';

export default function InstructorShowcase() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#090b12] border border-slate-800 shadow-2xl min-h-[480px] sm:min-h-[540px] flex items-center justify-center p-8 sm:p-14 lg:p-20 text-white text-center group">
          
          {/* Background Image / Creative Visual with High-End Lighting */}
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80"
            alt="Real Skills"
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
          
          {/* Subtle Glow Aura & Gradient Overlays */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#0bc40e]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-[#090b12]/80 to-[#090b12]/60 pointer-events-none" />

          {/* Centered Content Stack */}
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0bc40e]/10 border border-[#0bc40e]/30 text-[#0bc40e] text-[11px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0bc40e] animate-pulse" />
              <span>REAL SKILLS. REAL RESULTS.</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-white leading-[1.15] max-w-2xl mx-auto">
              Turn learning into <br className="hidden sm:inline" />
              real-world skills.
            </h2>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base md:text-[17px] text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto mt-5">
              Go beyond theory with practical training in Graphic Design, UI Design, Digital Marketing, Google Ads & Meta Ads. Learn through real projects and build the confidence to create, launch and grow.
            </p>

            {/* Play Button & Bottom Note */}
            <div className="pt-8 sm:pt-10 flex flex-col items-center gap-4">
              <a
                href="#courses"
                className="inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-bold text-base shadow-xl shadow-[#0bc40e]/30 hover:shadow-2xl hover:shadow-[#0bc40e]/40 transition-all hover:-translate-y-1 active:scale-95 group/btn cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0 group-hover/btn:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="tracking-wide">Start Learning</span>
              </a>

              <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300/80 font-medium">
                <svg className="w-4 h-4 text-[#0bc40e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Learn by doing. Build skills that work in the real world.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

