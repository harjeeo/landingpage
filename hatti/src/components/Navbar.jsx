import React, { useState } from 'react';
import {
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  Menu01Icon,
  Cancel01Icon,
  SparklesIcon
} from 'hugeicons-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  return (
    <header className="relative z-50 w-full pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center">
          <a href="#" className="flex items-center group">
            <img
              src="/hatti-logo.png"
              alt="Hatti Logo"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a
            href="#features"
            className="hover:text-slate-900 transition-colors"
          >
            Features
          </a>
          <a
            href="#benefits"
            className="hover:text-slate-900 transition-colors"
          >
            Benefits
          </a>
          <a
            href="#pricing"
            className="hover:text-slate-900 transition-colors"
          >
            Pricing
          </a>

          {/* Dropdown Menu */}
          <div
            className="relative"
            onMouseEnter={() => setPagesDropdownOpen(true)}
            onMouseLeave={() => setPagesDropdownOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer py-1"
            >
              <span>Pages</span>
              <ArrowDown01Icon size={14} strokeWidth={2} className={`transition-transform duration-200 ${pagesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {pagesDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 animate-in fade-in zoom-in-95 duration-150">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-900/5 p-2 space-y-1">
                  <a
                    href="#about"
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-colors"
                  >
                    About Hatti
                  </a>
                  <a
                    href="#integrations"
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-colors"
                  >
                    Integrations
                  </a>
                  <a
                    href="#contact"
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#get-started"
            className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-slate-900 bg-gradient-to-r from-orange-100/90 via-amber-50/90 to-orange-100/90 hover:from-orange-200/90 hover:to-amber-100/90 border border-orange-200/80 shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <span>Get Hatti</span>
            <ArrowUpRight01Icon size={14} strokeWidth={2.2} className="text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <Cancel01Icon size={22} /> : <Menu01Icon size={22} />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-700">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-600 py-1">Features</a>
            <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-600 py-1">Benefits</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-600 py-1">Pricing</a>
            <a href="#pages" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-600 py-1">Pages</a>
          </nav>
          <div className="pt-2 border-t border-slate-100">
            <a
              href="#get-started"
              className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs font-bold text-slate-900 bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 shadow-xs"
            >
              <span>Get Hatti</span>
              <ArrowUpRight01Icon size={14} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
