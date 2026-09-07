import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const SPOTLIGHT_VIDEOS = [
  {
    id: 'jansley',
    name: 'Jansley',
    role: 'UX Designer',
    flag: '🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'kyle',
    name: 'Kyle Torres',
    role: 'Senior UI/UX Designer',
    flag: '🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    coverImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'viya',
    name: 'Viya',
    role: 'UX/UI Designer',
    flag: '🇨🇦',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    coverImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'sofia',
    name: 'Sofia',
    role: 'UX/UI Designer',
    flag: '🇵🇹',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Product Designer',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'hannah',
    name: 'Hannah Lee',
    role: 'Lead Interaction Designer',
    flag: '🇦🇺',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'david',
    name: 'David Chen',
    role: 'Design System Lead',
    flag: '🇸🇬',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
    coverImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
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

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -310, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 310, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollPos = sliderRef.current.scrollLeft;
      const cardWidth = 310;
      const index = Math.round(scrollPos / cardWidth);
      setActiveDot(Math.min(index, SPOTLIGHT_VIDEOS.length - 1));
    }
  };

  const scrollToIndex = (idx) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: idx * 310, behavior: 'smooth' });
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
    <section className="py-10 sm:py-14 bg-[#f8fafc] border-t border-b border-slate-200/60 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Top Header Row with Navigation Arrows */}
        <div>
          <span className="text-xs font-bold text-[#6400e6] uppercase tracking-wider block mb-1">
            Success stories
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Student spotlight
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1 font-medium">
                Here's what they have to say about Designership.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              {/* Slider Control Buttons */}
              <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={scrollLeft}
                  aria-label="Previous slide"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#6400e6] hover:text-white hover:border-[#6400e6] transition-all flex items-center justify-center shadow-xs active:scale-90 cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={scrollRight}
                  aria-label="Next slide"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#6400e6] hover:text-white hover:border-[#6400e6] transition-all flex items-center justify-center shadow-xs active:scale-90 cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <Link
                to="/testimonial"
                className="bg-[#6400e6] hover:bg-[#530dd3] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-colors shrink-0"
              >
                View testimonials
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Track Container */}
        <div className="relative">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth py-2 px-1 select-none ${
              isMouseDown ? 'cursor-grabbing scroll-auto' : 'cursor-grab'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {SPOTLIGHT_VIDEOS.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveVideo(item)}
                className="snap-start shrink-0 w-[270px] sm:w-[290px] bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between space-y-3"
              >
                {/* Video Thumbnail Container */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={item.coverImage}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  
                  {/* Centered White Play Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Student Footer Meta */}
                <div className="flex items-center gap-3 px-1 pb-1">
                  <div className="relative shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                  </div>
                  <div className="truncate">
                    <h4 className="text-sm font-bold text-slate-900 truncate leading-snug">{item.name}</h4>
                    <p className="text-xs text-slate-500 truncate font-medium">{item.role}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Slider Pagination Dots */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {SPOTLIGHT_VIDEOS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeDot === dotIdx
                    ? 'w-6 bg-[#6400e6]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src={activeVideo.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activeVideo.name}</h4>
                  <p className="text-xs text-slate-500">{activeVideo.role}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-100 font-bold"
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
