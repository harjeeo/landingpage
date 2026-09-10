import React from 'react';
import { Link } from 'react-router-dom';
import dcSkillsLogo from '../assets/dc-skills-logo.svg';

export default function Footer() {
  const coursesList = [
    {
      title: "UI Design Masterclass — Next-Gen UI Design with AI",
      description: "Master modern UI design principles, Figma design systems, component architecture, and AI-accelerated workflows.",
      image: "/images/ui-design-masterclass.jpg",
      link: "/courses/ui-design-masterclass"
    },
    {
      title: "Graphic Design in 7 Days — Learn, Create & Master AI",
      description: "Master graphic design principles, typography, branding, marketing visuals, and generative AI design in 7 days.",
      image: "/images/graphic-design-in-7-days.jpg",
      link: "/courses/graphic-design-in-7-days"
    },
    {
      title: "Shopify 1 Week Master Course",
      description: "Master Shopify store design, custom Liquid themes, e-commerce UX, and conversion optimization in 7 days.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=80",
      link: "/courses/shopify-1-week-master-course"
    }
  ];

  return (
    <footer className="bg-[#0c0e15] border-t border-white/10 text-[#a1a1aa] text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Brand & Info */}
        <div className="lg:col-span-3 space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={dcSkillsLogo}
              alt="Designs Clue Skills"
              className="h-8 w-auto object-contain"
            />
          </Link>

          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            Practical courses to help you master UI Design, Graphic Design & Shopify and build skills for real-world opportunities.
          </p>

          <div className="space-y-1">
            <p className="text-xs text-[#71717a] leading-relaxed">
              We’re happy to help with course enquiries and support.
            </p>
            <p className="text-xs text-[#a1a1aa] font-medium">
              Mon–Fri | 9:00 AM–6:00 PM
            </p>
          </div>
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

        {/* Quick Links & Get in Touch */}
        <div className="md:col-span-2 lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-10">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-[#a1a1aa]">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/ebooks" className="hover:text-white transition-colors">
                  E-Books
                </Link>
              </li>
              <li>
                <Link to="/testimonial" className="hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Get in Touch</h4>
            <ul className="space-y-2.5 text-xs text-[#a1a1aa]">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-8 bg-[#08090d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} Designs Clue Skills. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#a1a1aa]">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/refund-cancellation-policy" className="hover:text-white transition-colors">
              Refund & Cancellation Policy
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
