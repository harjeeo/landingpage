import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [usePassword, setUsePassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-[85vh] bg-[#f8fafc] text-slate-900 font-sans flex flex-col justify-between py-12 px-4">
      
      {/* Centered Login Card Container */}
      <div className="w-full max-w-md mx-auto my-auto space-y-6">
        
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Log In
          </h1>
        </div>

        {/* Card Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6400e6] focus:ring-1 focus:ring-[#6400e6] shadow-2xs"
            />
          </div>

          {/* Password Input (if enabled) */}
          {usePassword && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6400e6] focus:ring-1 focus:ring-[#6400e6] shadow-2xs"
              />
            </div>
          )}

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-[#6400e6] rounded border-slate-300 focus:ring-[#6400e6]"
            />
            <label htmlFor="remember" className="text-xs font-medium text-slate-700 cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#564bf6] hover:bg-[#4538e4] text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md mt-2 active:scale-[0.99]"
          >
            {isSubmitted ? 'Sending login link...' : 'Log In'}
          </button>
        </form>

        {/* Notice Box matching exact screenshot */}
        <div className="bg-slate-200/60 p-4 rounded-xl border border-slate-300/60 flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
          <div className="w-5 h-5 rounded-full bg-slate-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
            ?
          </div>
          <div>
            We will email you a code for a password-free log in. Or you can{' '}
            <button
              onClick={() => setUsePassword(!usePassword)}
              className="underline font-semibold text-slate-900 hover:text-[#6400e6]"
            >
              {usePassword ? 'use password-free login' : 'log in with a password'}
            </button>{' '}
            instead.
          </div>
        </div>

      </div>

      {/* Footer Copyright */}
      <div className="max-w-md mx-auto w-full text-center sm:text-left text-xs text-slate-400 font-medium pt-8">
        © Designership 2026
      </div>

    </div>
  );
}
