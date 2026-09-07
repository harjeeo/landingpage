import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const REVIEWS_DATA = [
  {
    id: '1',
    name: 'Doris A',
    flag: '🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UX/UI Design Course',
    outcome: '🚀 Career Switcher',
    content: 'The whole frame work was designed to build confidence for UIUX designers. A great course, packed with the write information, value for your money.',
    rating: 5,
    date: 'August 1, 2024',
    helpfulCount: 42
  },
  {
    id: '2',
    name: 'Lhagvabud Purev',
    flag: '🇲🇳',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Figma Masterclass 2.0',
    outcome: '⚡ Fast Workflow',
    content: '9/10. Thank you! Absolutely loved how structured and practical every lesson was.',
    rating: 5,
    date: 'July 28, 2024',
    helpfulCount: 18
  },
  {
    id: '3',
    name: 'Nuno Silva',
    flag: '🇵🇹',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Figma Masterclass 2.0',
    outcome: '🔥 Mastered Auto-Layout',
    content: 'Absolutely brilliant masterclass, thanks, man! Changed the way our studio handles responsive component variants.',
    rating: 5,
    date: 'July 26, 2024',
    helpfulCount: 34
  },
  {
    id: '4',
    name: 'Shania P',
    flag: '🇨🇦',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UX/UI Design Course',
    outcome: '💼 Landed First UI Role',
    content: 'The course lessons and modules are well made. The attention on details, content and quality of each videos is top tier, really worth the investment.',
    rating: 5,
    date: 'July 24, 2024',
    helpfulCount: 38
  },
  {
    id: '5',
    name: 'Amukta Ambati',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Figma Masterclass 2.0',
    outcome: '✨ Figma Mastery',
    content: "I loved Mizko's course on Figma. It's exactly what I needed to start my UX design journey.",
    rating: 5,
    date: 'July 23, 2024',
    helpfulCount: 27
  },
  {
    id: '6',
    name: 'Kristen Surujbhan',
    flag: '🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Figma Masterclass 2.0',
    outcome: '🏆 Cross-Functional Lead',
    content: 'This course is a must if you are unsure about how the design world operates cross-functionally. It gives you a strong sense of how to navigate stakeholder meetings.',
    rating: 5,
    date: 'July 23, 2024',
    helpfulCount: 45
  },
  {
    id: '7',
    name: 'Aryna L',
    flag: '🇩🇪',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Practical UX Research & Strategy',
    outcome: '📈 +$28k Salary Bump',
    content: 'This course has been a game-changer, providing the crucial skills to navigate the future of UX/UI design through the ever-evolving industry.',
    rating: 5,
    date: 'July 22, 2024',
    helpfulCount: 29
  },
  {
    id: '8',
    name: 'Luis Veloz',
    flag: '🇲🇽',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UX/UI Design Course',
    outcome: '⚡ Saved 15+ hrs/week',
    content: 'I loved this course, Mizko explained every detail with ease. All the templates provided are incredibly useful.',
    rating: 5,
    date: 'July 22, 2024',
    helpfulCount: 56
  },
  {
    id: '9',
    name: 'Binu P',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Figma Masterclass 2.0',
    outcome: '🎯 System Organized',
    content: 'Love the YouTube channel and course I just recently purchased :) Looking forward to tidying up my Figma skills!',
    rating: 5,
    date: 'July 15, 2024',
    helpfulCount: 31
  }
];

export default function WallOfLove() {
  const [votedIds, setVotedIds] = useState(new Set());
  const [helpfulCounts, setHelpfulCounts] = useState(
    REVIEWS_DATA.reduce((acc, item) => ({ ...acc, [item.id]: item.helpfulCount }), {})
  );

  const toggleHelpful = (id) => {
    const hasVoted = votedIds.has(id);
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: hasVoted ? prev[id] - 1 : prev[id] + 1
    }));
    setVotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="bg-[#f8fafc] py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-semibold text-[#7c3aed] uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              Student Wall of Love
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#09090b] tracking-tight leading-[1.15] mt-3">
              Loved by 10,000+ designers
            </h2>
          </div>

          <Link
            to="/testimonial"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6400e6] hover:bg-[#530dd3] text-white font-semibold text-xs sm:text-sm shadow-md transition-all shrink-0 self-start sm:self-auto"
          >
            View all testimonials →
          </Link>
        </div>

        {/* 3-Column Masonry Reviews Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {REVIEWS_DATA.map((t) => {
            const hasVoted = votedIds.has(t.id);
            const count = helpfulCounts[t.id];
            return (
              <div
                key={t.id}
                className="break-inside-avoid inline-block w-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Avatar, Name, Verified Badge, Course Tag */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <span className="absolute -bottom-1 -right-1 text-xs">{t.flag}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                        {t.verified && (
                          <svg className="w-4 h-4 text-[#4f46e5] fill-current" viewBox="0 0 20 20" title="Verified Student">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="text-xs text-[#7c3aed] font-medium">{t.course}</div>
                    </div>
                  </div>

                  {/* Outcome Badge */}
                  {t.outcome && (
                    <div className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-md mb-3">
                      {t.outcome}
                    </div>
                  )}

                  {/* Review Text */}
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    "{t.content}"
                  </p>
                </div>

                {/* Stars & Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <button
                    onClick={() => toggleHelpful(t.id)}
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs transition-colors ${
                      hasVoted
                        ? 'bg-purple-100 text-[#6400e6] font-semibold'
                        : 'text-slate-400 hover:text-slate-700 bg-slate-50'
                    }`}
                  >
                    <span>👍</span>
                    <span>{count}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
