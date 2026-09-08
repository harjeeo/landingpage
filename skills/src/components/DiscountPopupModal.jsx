import React, { useState, useEffect } from 'react';

export default function DiscountPopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if the popup was ever dismissed/closed permanently
    const hasClosed = localStorage.getItem('has_closed_skills_popup');
    if (!hasClosed) {
      // Reveal popup after a slight delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Persist in localStorage so it never shows again once dismissed
    localStorage.setItem('has_closed_skills_popup', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* Backdrop Click to close */}
      <div 
        className="absolute inset-0" 
        onClick={handleClose} 
        aria-hidden="true"
      />

      {/* Centered Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button (✕) */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors text-lg font-semibold cursor-pointer"
          title="Close modal"
        >
          ✕
        </button>

        {/* Green Sparkle Badge Icon */}
        <div className="w-13 h-13 rounded-2xl bg-[#0bc40e] text-white flex items-center justify-center shadow-lg shadow-[#0bc40e]/30 mx-auto mb-3.5 text-2xl">
          <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>

        {/* Eyebrow */}
        <span className="text-[11px] font-bold text-[#0bc40e] uppercase tracking-wider block mb-1">
          YOUR SKILLS. YOUR FUTURE.
        </span>

        {/* Title */}
        <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 mb-2 tracking-tight leading-snug">
          What do you want to learn?
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto mb-5 font-normal">
          Turn your interest into a real skill. Choose from Graphic Design, UI Design, Digital Marketing, Google Ads & Meta Ads and start learning with practical, hands-on training.
        </p>

        {/* Success or Form */}
        {isSubmitted ? (
          <div className="py-5 px-4 space-y-1.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 my-2">
            <div className="text-2xl">🎉</div>
            <div className="text-sm font-bold">Details Received!</div>
            <p className="text-xs text-emerald-600">We will connect with you on WhatsApp shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto">
            <div>
              <input
                type="tel"
                required
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0bc40e] focus:ring-2 focus:ring-[#0bc40e]/20 transition-all shadow-2xs text-center sm:text-left"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-bold text-sm py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]"
            >
              Let’s Get Started
            </button>
          </form>
        )}

        {/* Footer Note */}
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto mt-4 font-normal">
          Get course details, guidance and upcoming batch information on WhatsApp.
        </p>

      </div>
    </div>
  );
}
