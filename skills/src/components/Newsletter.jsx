import React, { useState } from 'react';

export default function Newsletter() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setPhoneNumber('');
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#f8fafc] rounded-3xl p-8 sm:p-14 border border-slate-200/80 shadow-xs text-center space-y-7">
          <div className="space-y-3.5 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#09090b] tracking-tight leading-tight">
              Keep learning. Keep growing.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Get practical design tips, digital marketing insights, ad strategies, free resources and course updates delivered straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6400e6] focus:ring-2 focus:ring-[#6400e6]/20 transition-all shadow-2xs"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md shrink-0 cursor-pointer active:scale-98"
            >
              {submitted ? 'Subscribed!' : 'Stay Updated'}
            </button>
          </form>

          <span className="text-xs text-slate-400 block font-normal">
            No spam ever. Unsubscribe at any time.
          </span>
        </div>

      </div>
    </section>
  );
}
