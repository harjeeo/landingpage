import React from 'react';

export default function BlogSection() {
  const posts = [
    {
      title: "New website, course and product updates - April 2024",
      excerpt: "A lot happened this month. Take a look at what's coming to Designership academy.",
      date: "May 6, 2024",
      readTime: "7 min read",
      image: "https://cdn.prod.website-files.com/65c1ae21fb2191466dd6ce72/661f382c9213e7e0719aefb1_Major%20Updates%20Designership_Cover.jpg"
    },
    {
      title: "Figma Auto-Layout 5.0 Complete Guide & Best Practices",
      excerpt: "Master responsive constraints, wrap layouts, and component properties in Figma.",
      date: "Apr 28, 2024",
      readTime: "5 min read",
      image: "https://cdn.prod.website-files.com/65c0868c26990d4c1ce3b302/6859ea31e0fe32b922f07293_Course%20Cover_The%20Ultimate%20Figma%20Masterclass%20Course%202.0%20-%20Study%201%20(1)%20(1)%20(1)%201.jpg"
    },
    {
      title: "How to Build a High-Converting UX Designer Portfolio",
      excerpt: "Step-by-step case study framework that gets you noticed by hiring managers at top tech companies.",
      date: "Apr 15, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="bg-white py-8 sm:py-16 lg:py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#09090b] tracking-tight leading-[1.15]">
              Learn. Create. Grow.
            </h2>
          </div>

          <a
            href="#blog"
            className="px-6 py-3 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-sm transition-all shadow-md shrink-0 self-start md:self-auto"
          >
            View all
          </a>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div>
                <div className="h-48 overflow-hidden bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#71717a] font-medium">
                    <span>{p.date}</span>
                    <span>•</span>
                    <span>{p.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#18181b] group-hover:text-[#0bc40e] transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs text-[#52525b] leading-relaxed">
                    {p.excerpt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
