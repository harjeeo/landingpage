import React from 'react';

export default function Newsletter() {
  return (
    <section className="bg-white py-8 sm:py-16 lg:py-24 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-slate-50/60 rounded-3xl p-8 sm:p-12 border border-slate-200/70 shadow-sm text-center space-y-6">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181b] tracking-tight">
              Join our newsletter
            </h2>
            <p className="text-sm text-[#52525b]">
              Get weekly UX/UI tips, Figma tutorials, and free resources delivered directly to your inbox.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#18181b] placeholder-slate-400 focus:outline-none focus:border-[#7c3aed]"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm transition-all shadow-md shrink-0"
            >
              Subscribe
            </button>
          </form>
          <span className="text-[11px] text-[#71717a] block">No spam ever. Unsubscribe at any time.</span>
        </div>

      </div>
    </section>
  );
}
