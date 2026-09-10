import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../lib/auth';

export default function Hero() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const onAuth = () => setCurrentUser(getCurrentUser());
    window.addEventListener('dcskills_auth_changed', onAuth);
    return () => window.removeEventListener('dcskills_auth_changed', onAuth);
  }, []);
  const studentCards = [
    {
      id: 1,
      name: "Angel B.",
      course: "UX Research Course",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Abhishek S.",
      course: "Figma Masterclass",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Miles M.",
      course: "UI Design Course",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Pranavi C.",
      course: "UX Research Course",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      name: "Alyssa D.",
      course: "Figma Masterclass",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      name: "Zohdi R.",
      course: "UX Research Course",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 7,
      name: "Raymond C.",
      course: "UI Design Course",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 8,
      name: "Preston B.",
      course: "UX Research Course",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const marqueeCards = [...studentCards, ...studentCards];

  return (
    <section className="relative bg-[#090A0F] overflow-hidden pt-16 pb-12 text-white font-sans border-b border-white/5">
      
      {/* Background Ambient Glowing Aura */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[#6400e6]/20 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Main Content Container (Centered typography & CTA buttons) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Badge with Icon */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm shadow-sm">
          <svg className="w-3.5 h-3.5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
          <span>BUILD SKILLS. CREATE. GROW.</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-bold tracking-tight text-white leading-[1.15] max-w-4xl mx-auto">
          Learn skills that turn <br />
          creativity into a career.
        </h1>

        {/* Subtitle Description */}
        <p className="text-base sm:text-lg text-[#9ca3af] font-normal leading-relaxed max-w-3xl mx-auto mt-6">
          Master Graphic Design, UI Design, Digital Marketing, Google Ads & Meta Ads through practical, industry-focused online courses designed to help you build real-world skills and unlock new opportunities.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="#courses"
            className="px-8 py-3.5 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#0bc40e]/25"
          >
            Explore Courses
          </a>
          <a
            href="#courses"
            className="px-8 py-3.5 rounded-xl bg-[#141622] hover:bg-[#1f2231] border border-white/10 text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
          >
            Start Learning
          </a>
        </div>

        {/* Social Proof / Trust Cards (2 Side-by-Side Cards) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          
          {/* Card 1: Loved by 15,000+ designers */}
          <div className="p-4 rounded-2xl bg-[#12141e]/90 border border-white/10 backdrop-blur-md flex items-center justify-between gap-4 shadow-xl hover:border-white/20 transition-all">
            <div className="flex -space-x-2.5 overflow-hidden shrink-0">
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#12141e] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Student" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#12141e] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Student" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#12141e] object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" alt="Student" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#12141e] object-cover" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&q=80" alt="Student" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#12141e] object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" alt="Student" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                ★★★★★
              </div>
              <span className="text-xs text-[#9ca3af] font-medium block mt-0.5">Loved by 578+ students</span>
            </div>
          </div>

          {/* Card 2: Practical & Real-World Projects */}
          <div className="p-4 rounded-2xl bg-[#12141e]/90 border border-white/10 backdrop-blur-md flex items-center gap-3.5 shadow-xl hover:border-white/20 transition-all text-left">
            <div className="w-9 h-9 rounded-xl bg-[#0bc40e]/10 border border-[#0bc40e]/20 flex items-center justify-center text-[#0bc40e] shrink-0 text-base">
              ⚡
            </div>
            <div>
              <span className="text-xs font-bold text-white block tracking-tight">100% Practical & Projects</span>
              <span className="text-xs text-[#9ca3af] font-medium block mt-0.5">Learn skills for real-world growth</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Horizontal Card Showcase / Continuous Marquee Row */}
      <div className="mt-12 relative z-10 w-full overflow-hidden">
        
        {/* Left & Right Subtle Fade Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#090A0F] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#090A0F] to-transparent z-20 pointer-events-none" />

        {/* Scrolling Cards Row */}
        <div className="flex gap-4 animate-marquee-horizontal hover:[animation-play-state:paused] py-3 px-4 w-max">
          {marqueeCards.map((st, idx) => (
            <div
              key={`${st.id}-${idx}`}
              className="w-[210px] sm:w-[240px] h-[260px] sm:h-[280px] shrink-0 rounded-[20px] overflow-hidden border border-white/10 relative group shadow-2xl bg-[#0f111a] hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card Background Image with Teal/Cool Lighting Tone */}
              <img
                src={st.photo}
                alt={st.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Image Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a10]/95 via-[#090a10]/20 to-transparent" />

              {/* Purple Checkmark Badge at Top Right */}
              <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-[#7c3aed] text-white flex items-center justify-center text-xs font-bold shadow-md z-10">
                ✓
              </div>

              {/* Bottom Card Information Overlay */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#0d0f17]/90 backdrop-blur-md border border-white/10 space-y-0.5 text-left z-10">
                <div className="flex items-center gap-1.5 font-semibold text-xs text-white">
                  <span className="text-purple-400 text-xs">👤</span>
                  <span>{st.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#9ca3af]">
                  <span className="text-purple-400 text-xs">🎓</span>
                  <span className="truncate">{st.course}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
