import React, { useState, useEffect } from 'react';

export default function DiscountPopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if the popup was closed during this browser tab session
    const hasClosed = sessionStorage.getItem('has_closed_discount_popup');
    if (!hasClosed) {
      // Reveal popup automatically when opening the website
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Set flag in sessionStorage so it doesn't show again in this tab session
    sessionStorage.setItem('has_closed_discount_popup', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* Backdrop Click */}
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
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors text-lg font-semibold"
          title="Close modal"
        >
          ✕
        </button>

        {/* Purple Pill Sparkle Badge Icon */}
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#7c3aed] to-[#9333ea] text-white flex items-center justify-center shadow-lg shadow-purple-500/30 mx-auto mb-4 text-2xl">
          <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 tracking-tight leading-snug">
          Get 10% off on your first purchase
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto mb-5 font-medium">
          By subscribing to our newsletter you will be the first to hear about early access periods, discounts and more.
        </p>

        {/* Success or Form */}
        {isSubmitted ? (
          <div className="py-5 px-4 space-y-1.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 my-2">
            <div className="text-2xl">🎉</div>
            <div className="text-sm font-bold">10% Discount Code Sent!</div>
            <p className="text-xs text-emerald-600">Check your inbox for your exclusive code.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto">
            <div>
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all shadow-2xs text-center sm:text-left"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7c3aed] to-[#9333ea] hover:from-[#6d28d9] hover:to-[#7e22ce] text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-purple-500/20 transition-all active:scale-[0.99]"
            >
              Get discount code
            </button>
          </form>
        )}

        {/* Legal Disclaimer */}
        <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto mt-4">
          By subscribing you agree to with our Privacy Policy and provide consent to receive updates from the Designership.
        </p>

      </div>
    </div>
  );
}
