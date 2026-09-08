import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HOME_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Harpreet Singh',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UI/UX Design Course',
    outcome: '⚡ Practical Projects',
    content: 'Figma was quite confusing for me initially, but the course made everything much easier to understand. The practical projects were definitely the most useful part.',
    rating: 5,
    helpfulCount: 42
  },
  {
    id: 't-2',
    name: 'Aman Sharma',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '🛍️ Simple Store Setup',
    content: 'Setting up a Shopify store seemed complicated at first, but the step-by-step approach made the whole process much easier to understand.',
    rating: 5,
    helpfulCount: 38
  },
  {
    id: 't-3',
    name: 'Simran Kaur',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '🎨 Design Principles',
    content: "I knew the basics of designing but didn't really understand design principles. The lessons on typography, colours and layouts gave me much more clarity.",
    rating: 5,
    helpfulCount: 29
  }
];

export default function Testimonials() {
  const [votedIds, setVotedIds] = useState(new Set());
  const [helpfulCounts, setHelpfulCounts] = useState(
    HOME_TESTIMONIALS.reduce((acc, item) => ({ ...acc, [item.id]: item.helpfulCount }), {})
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
    <section id="testimonials" className="py-8 sm:py-16 lg:py-24 bg-[#f8fafc] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-[#7c3aed] uppercase tracking-wider bg-purple-50 px-3.5 py-1 rounded-full border border-purple-100">
            Student Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#09090b] tracking-tight leading-[1.15] mt-4">
            Real stories from real designers
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            See how our students advance their UX/UI design careers and land top tech roles.
          </p>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {HOME_TESTIMONIALS.map((t) => {
            const hasVoted = votedIds.has(t.id);
            const count = helpfulCounts[t.id];
            return (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/testimonial"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5"
          >
            Explore all student testimonials →
          </Link>
        </div>

      </div>
    </section>
  );
}
