import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const coursesList = [
    {
      title: "Web Design 2 Weeks Mastery Course",
      description: "Learn how to design, build, customize, and launch modern, professional, responsive websites in 14 days.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=200&q=80",
      link: "/courses/web-design-2-weeks-mastery-course"
    },
    {
      title: "Shopify 1 Week Master Course",
      description: "Master Shopify store design, custom Liquid themes, e-commerce UX, and conversion optimization in 7 days.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=80",
      link: "/courses/shopify-1-week-master-course"
    },
    {
      title: "Ultimate Figma Masterclass 2.0",
      description: "Master Figma with industry-leading tactics that will help you complete projects with confidence.",
      image: "https://cdn.prod.website-files.com/65c0868c26990d4c1ce3b302/6859ea31e0fe32b922f07293_Course%20Cover_The%20Ultimate%20Figma%20Masterclass%20Course%202.0%20-%20Study%201%20(1)%20(1)%20(1)%201.jpg",
      link: "/courses/the-ultimate-figma-masterclass"
    },
    {
      title: "AI Designer and Graphic Designing Course",
      description: "Master AI design tools, prompt engineering, graphics, and modern design workflows.",
      image: "https://cdn.prod.website-files.com/65c1ae21fb2191466dd6ce72/661f382c9213e7e0719aefb1_Major%20Updates%20Designership_Cover.jpg",
      link: "/courses/ai-designer-graphic-designing"
    },
    {
      title: "UX/UI Design Course",
      description: "Master the end-to-end UX/UI design process with a real-world project.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=200&q=80",
      link: "/courses/ux-ui-design-course"
    }
  ];

  return (
    <footer className="bg-[#0c0e15] border-t border-white/10 text-[#a1a1aa] text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Brand & Info */}
        <div className="lg:col-span-3 space-y-6">
          <a href="#" className="flex items-center gap-2">
            <img
              src="https://cdn.prod.website-files.com/65c0868c26990d4c1ce3b302/65c18969c9ae25e8771777f1_Group.svg"
              alt="Designership Logo"
              className="h-8 w-auto"
            />
          </a>

          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            Dedicated to equipping you with all the skills and resources you need to supercharge your design career, freelance, and agency journey. Reach your north star with Designership!
          </p>

          <p className="text-xs text-[#71717a] leading-relaxed">
            We strive to respond to all enquiries between Mon–Fri (9AM–5PM) AEDT.
          </p>
        </div>

        {/* Courses Cards List */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-sm font-bold text-white">Courses</h4>
          <div className="space-y-3">
            {coursesList.map((c, idx) => (
              <Link
                key={idx}
                to={c.link}
                className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/10"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-16 h-11 rounded-lg object-cover shrink-0 border border-white/10"
                />
                <div className="space-y-0.5">
                  <h5 className="text-xs font-bold text-white group-hover:text-[#9a7cff] transition-colors leading-tight">
                    {c.title}
                  </h5>
                  {c.description && (
                    <p className="text-[11px] text-[#71717a] leading-tight line-clamp-2">
                      {c.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Links (Matching Navbar) */}
        <div className="md:col-span-2 lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-10">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-[#a1a1aa]">
              <li>
                <Link to="/courses/the-ultimate-figma-masterclass" className="hover:text-white transition-colors">
                  Figma
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  UX Design
                </Link>
              </li>
              <li>
                <Link to="/testimonial" className="hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Account</h4>
            <ul className="space-y-2.5 text-xs text-[#a1a1aa]">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Enter Academy
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Buy Courses
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-8 bg-[#08090d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} Designership. A More Cursors venture. All rights reserved.</p>
            <p className="text-[11px] text-[#71717a]">
              Partners: Shipfaster UI · Nidos · AI video editor for social media
            </p>
          </div>

          <div className="flex items-center gap-6 text-[#a1a1aa]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

          {/* Social Icons (Lineicons) */}
          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-base" aria-label="Facebook">
              <i className="lni lni-facebook-filled"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-base" aria-label="Instagram">
              <i className="lni lni-instagram-filled"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-base" aria-label="Twitter">
              <i className="lni lni-twitter-filled"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-base" aria-label="LinkedIn">
              <i className="lni lni-linkedin-filled"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-base" aria-label="YouTube">
              <i className="lni lni-youtube"></i>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
