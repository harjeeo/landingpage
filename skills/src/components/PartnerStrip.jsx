import React from 'react';

export default function PartnerStrip() {
  const logos = [
    "medibank",
    "KPMG",
    "Service NSW",
    "SAMSUNG",
    "Square",
    "shopify",
    "ATLASSIAN",
    "Typeform",
    "Telstra",
    "ANZ"
  ];

  return (
    <div className="py-10 border-b border-slate-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
        <p className="text-xs font-semibold text-[#71717a] tracking-wider uppercase">
          Teaching brilliant designers worldwide
        </p>

        {/* Horizontal Infinite Marquee Wrapper */}
        <div className="relative overflow-hidden w-full max-w-5xl mx-auto">
          {/* Gradient Edge Overlays for Smooth Fade */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Marquee Container */}
          <div className="flex w-max animate-marquee-horizontal gap-12 sm:gap-16 opacity-50 grayscale font-semibold text-sm sm:text-base text-slate-700 select-none">
            {/* Duplicated list for seamless looping */}
            {[...logos, ...logos].map((logo, idx) => (
              <span key={idx} className="shrink-0 tracking-tight hover:opacity-100 transition-opacity">
                {logo}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
