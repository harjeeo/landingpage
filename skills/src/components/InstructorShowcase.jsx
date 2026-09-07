import React from 'react';

export default function InstructorShowcase() {
  return (
    <section className="bg-white py-8 sm:py-16 lg:py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl h-[480px] flex items-end p-8 sm:p-12 text-white group">
          {/* Background Image / Thumbnail */}
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80"
            alt="Michael Wong (Mizko)"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Center Play Button Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-2xl">
            <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          {/* Bottom Left Copy */}
          <div className="relative z-10 space-y-2 max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Helping designers worldwide reach their north star
            </h2>
            <p className="text-base text-slate-300">
              Over 15,000 designers have leveled up their careers with Designership.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
