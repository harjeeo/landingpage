import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const SPOTLIGHT_VIDEOS = [
  {
    id: 'abhishek',
    name: 'Abhishek S.',
    course: 'Figma Masterclass',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'miles',
    name: 'Miles M.',
    course: 'UI Design Course',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'pranavi',
    name: 'Pranavi C.',
    course: 'UX Research Course',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'angel',
    name: 'Angel B.',
    course: 'UX Research Course',
    coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'kyle',
    name: 'Kyle Torres',
    course: 'Graphic & UI Mastery',
    coverImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'viya',
    name: 'Viya Sharma',
    course: 'Digital Marketing & Ads',
    coverImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'alyssa',
    name: 'Alyssa D.',
    course: 'Figma Masterclass',
    coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    course: 'Meta & Google Ads',
    coverImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  }
];

export default function StudentSpotlight() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const sliderRef = useRef(null);

  const CARD_SCROLL_WIDTH = 280;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -CARD_SCROLL_WIDTH, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: CARD_SCROLL_WIDTH, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollPos = sliderRef.current.scrollLeft;
      const index = Math.round(scrollPos / CARD_SCROLL_WIDTH);
      setActiveDot(Math.min(index, SPOTLIGHT_VIDEOS.length - 1));
    }
  };

  const scrollToIndex = (idx) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: idx * CARD_SCROLL_WIDTH, behavior: 'smooth' });
      setActiveDot(idx);
    }
  };

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftPos(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftPos - walk;
  };

  return (
    <section className="py-14 sm:py-20 bg-[#0a0c13] text-white font-sans border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Row with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#852ef7] uppercase tracking-wider block">
              STUDENT SPOTLIGHT
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight">
              Student spotlight
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-normal">
              Here's what they have to say about learning with us.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Slider Control Buttons */}
            <div className="flex items-center gap-2 mr-2">
              <button
                onClick={scrollLeft}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#6400e6] text-white border border-white/10 transition-all flex items-center justify-center backdrop-blur-sm active:scale-95 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                aria-label="Next slide"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#6400e6] text-white border border-white/10 transition-all flex items-center justify-center backdrop-blur-sm active:scale-95 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <Link
              to="/testimonial"
              className="bg-[#0bc40e] hover:bg-[#0aa30c] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-colors shrink-0"
            >
              View testimonials
            </Link>
          </div>
        </div>

        {/* Reel Slider Container */}
        <div className="relative">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth py-2 px-1 select-none ${
              isMouseDown ? 'cursor-grabbing scroll-auto' : 'cursor-grab'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {SPOTLIGHT_VIDEOS.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveVideo(item)}
                className="snap-start shrink-0 w-[240px] sm:w-[260px] md:w-[275px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer border border-white/10 bg-[#12151e] shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-300"
              >
                {/* Reel Thumbnail Image (Full Reel Height) */}
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambient Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30 group-hover:via-transparent transition-colors" />

                {/* Center Play Button with Blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#6400e6] group-hover:border-[#6400e6] transition-all duration-300">
                  <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Bottom Overlay Card (Image 2 style with User Icon and Course Info) */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#111420]/85 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-3 shadow-lg flex flex-col justify-center space-y-1 text-left transition-transform group-hover:-translate-y-0.5 duration-200">
                  <div className="flex items-center gap-1.5 text-white font-bold text-xs sm:text-sm tracking-tight truncate">
                    <svg className="w-3.5 h-3.5 text-[#852ef7] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">{item.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300 font-medium truncate">
                    <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <span className="truncate">{item.course}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Slider Pagination Dots */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {SPOTLIGHT_VIDEOS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDot === dotIdx
                    ? 'w-6 bg-[#6400e6]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-[#111420] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6400e6] flex items-center justify-center text-white font-bold text-xs">
                  {activeVideo.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{activeVideo.name}</h4>
                  <p className="text-xs text-slate-400">{activeVideo.course}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-white/10 text-xs font-bold transition-colors cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            
            <div className="aspect-video w-full">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.name}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
