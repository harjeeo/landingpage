import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [activeTab, setActiveTab] = useState('courses');

  const courseList = [
    {
      id: 0,
      slug: "web-design-2-weeks-mastery-course",
      title: "Web Design 2 Weeks Mastery Course",
      students: "1200+",
      rating: "5.0",
      level: "All Levels",
      description: "Learn how to design, build, customize, and launch modern, professional, responsive websites from scratch in 14 days.",
      price: "$300",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
      isNew: true
    },
    {
      id: 1,
      slug: "shopify-1-week-master-course",
      title: "Shopify 1 Week Master Course",
      students: "650+",
      rating: "4.9",
      level: "All Levels",
      description: "Master Shopify store design, custom Liquid themes, e-commerce UX, and conversion optimization in just 7 days.",
      price: "$300",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      isNew: true
    },
    {
      id: 1,
      slug: "the-ultimate-figma-masterclass",
      title: "Ultimate Figma Masterclass 2.0",
      students: "8500+",
      rating: "4.9",
      level: "Intermediate",
      description: "Master Figma with industry-leading tactics that will help you complete projects with confidence.",
      price: "$300",
      image: "https://cdn.prod.website-files.com/65c0868c26990d4c1ce3b302/6859ea31e0fe32b922f07293_Course%20Cover_The%20Ultimate%20Figma%20Masterclass%20Course%202.0%20-%20Study%201%20(1)%20(1)%20(1)%201.jpg",
      isNew: true
    },
    {
      id: 2,
      slug: "ai-designer-graphic-designing",
      title: "AI Designer and Graphic Designing Course",
      students: "1500+",
      rating: "4.9",
      level: "All Levels",
      description: "Master AI design tools, prompt engineering, graphics, and modern design workflows.",
      price: "$300",
      image: "https://cdn.prod.website-files.com/65c1ae21fb2191466dd6ce72/661f382c9213e7e0719aefb1_Major%20Updates%20Designership_Cover.jpg"
    },
    {
      id: 3,
      slug: "ux-ui-design-course",
      title: "UX/UI Design Course",
      students: "800+",
      rating: "4.9",
      level: "Intermediate",
      description: "Master the end-to-end UX/UI design process with a real-world project.",
      price: "$300",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="courses" className="bg-white text-[#18181b] font-sans py-8 sm:py-16 lg:py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="space-y-6 mb-12">
          
          {/* Filter Pills */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200/60">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'courses'
                  ? 'bg-white text-[#18181b] shadow-sm'
                  : 'text-[#71717a] hover:text-[#18181b]'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'products'
                  ? 'bg-white text-[#18181b] shadow-sm'
                  : 'text-[#71717a] hover:text-[#18181b]'
              }`}
            >
              Products
            </button>
          </div>

          {/* Title & View More Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#09090b] tracking-tight leading-[1.15]">
                Master highly-demanded<br />
                skills in hours not weeks
              </h2>
              <p className="text-base text-[#52525b] font-normal">
                Self-paced Figma courses and UX Design courses to help you learn faster and smarter.
              </p>
            </div>

            <Link
              to="/courses/the-ultimate-figma-masterclass"
              className="px-6 py-3 rounded-xl bg-[#6400e6] hover:bg-[#530dd3] text-white font-semibold text-sm transition-all shadow-md shrink-0 self-start md:self-auto"
            >
              View more courses
            </Link>
          </div>

        </div>

        {/* 3-Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courseList.map(course => (
            <Link
              to={`/courses/${course.slug}`}
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="h-56 overflow-hidden bg-slate-50 border-b border-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[19px] font-semibold text-[#09090b] tracking-tight group-hover:text-[#6400e6] transition-colors">
                      {course.title}
                    </h3>
                    {course.isNew && (
                      <span className="text-[10px] font-bold bg-[#6400e6]/10 text-[#6400e6] px-2 py-0.5 rounded-full border border-[#6400e6]/20 shrink-0">
                        New
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#71717a] font-medium">
                    <span className="flex items-center gap-1.5">
                      <i className="lni lni-users text-sm text-[#7c3aed]"></i> {course.students}
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
                      <i className="lni lni-star-filled text-sm"></i> {course.rating}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="lni lni-bar-chart text-sm text-[#7c3aed]"></i> {course.level}
                    </span>
                  </div>

                  <p className="text-sm text-[#52525b] leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-2">
                <span className="text-2xl font-semibold text-[#09090b]">
                  {course.price}
                </span>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
