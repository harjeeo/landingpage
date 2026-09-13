import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Book02Icon,
  StarIcon,
  ShoppingBag01Icon,
  Download01Icon,
  EyeIcon,
  CheckmarkCircle02Icon,
  SparklesIcon,
  Cancel01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  Tag01Icon,
  Shield01Icon,
  Layers01Icon,
  Clock01Icon,
  Share01Icon
} from 'hugeicons-react';
import { EBOOKS_DATA } from '../data/ebooksData';

export default function SingleEbookPage() {
  const { ebookSlug } = useParams();
  const navigate = useNavigate();

  // Find book by slug or id, fallback to first book
  const book = useMemo(() => {
    if (!ebookSlug) return EBOOKS_DATA[0];
    const found = EBOOKS_DATA.find(
      (b) => b.slug === ebookSlug || b.id === ebookSlug
    );
    return found || EBOOKS_DATA[0];
  }, [ebookSlug]);

  const [activeTab, setActiveTab] = useState('overview');
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [buyerForm, setBuyerForm] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsSuccess(false);
  }, [ebookSlug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBuySubmit = (e) => {
    e.preventDefault();
    if (!buyerForm.name || !buyerForm.email || !buyerForm.phone) {
      alert('Please fill in all details');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const isUIUX = book.badge === 'UI/UX';

  return (
    <div className="min-h-screen bg-[#0c0e15] text-slate-100 font-sans pb-32 selection:bg-[#6400e6] selection:text-white">
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-purple-600/35 rounded-full blur-[140px]" />
        <div className="absolute -top-30 right-1/4 w-[450px] h-[450px] bg-indigo-600/25 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-10">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/ebooks" className="hover:text-white transition-colors">E-Books</Link>
            <span>/</span>
            <span className="text-purple-300 font-medium truncate max-w-[200px] sm:max-w-xs">{book.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
              title="Copy link to clipboard"
            >
              <Share01Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <Link
              to="/ebooks"
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft01Icon className="w-4 h-4" />
              <span>All E-Books</span>
            </Link>
          </div>
        </div>

        {/* Hero Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Book 3D Cover Display */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[3/4] bg-gradient-to-b from-[#181a27] to-[#0d0f17] rounded-3xl p-6 sm:p-8 flex items-center justify-center border border-white/10 shadow-2xl shadow-purple-950/30 overflow-hidden group">
              
              {/* Background ambient lighting */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 via-transparent to-transparent opacity-60" />

              {/* Badges on Top */}
              <div className="absolute top-5 left-5 z-20">
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-md backdrop-blur-md">
                  {book.discount}
                </span>
              </div>

              <div className="absolute top-5 right-5 z-20">
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md border ${
                  isUIUX
                    ? 'bg-purple-600/90 text-purple-100 border-purple-400/40 shadow-purple-950/50'
                    : 'bg-amber-600/90 text-amber-100 border-amber-400/40 shadow-amber-950/50'
                }`}>
                  <Tag01Icon className="w-3.5 h-3.5" />
                  {book.badge}
                </span>
              </div>

              {/* Book Cover Image with 3D drop shadow */}
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
              />

              {/* Bottom Quick Look Button */}
              <button
                onClick={() => setShowSampleModal(true)}
                className="absolute bottom-5 inset-x-8 py-2.5 rounded-xl bg-black/80 hover:bg-black/95 text-white border border-white/20 text-xs font-bold flex items-center justify-center gap-2 backdrop-blur-md transition-all shadow-xl active:scale-98 cursor-pointer opacity-90 hover:opacity-100"
              >
                <EyeIcon className="w-4 h-4 text-purple-400" />
                <span>Look Inside / Sample Preview</span>
              </button>
            </div>

            {/* Quick Format & Specs Pill Strip */}
            <div className="mt-5 w-full max-w-md grid grid-cols-3 gap-2.5 text-center">
              <div className="p-3 rounded-2xl bg-[#131520] border border-white/5 space-y-0.5">
                <div className="text-[10px] text-slate-400 font-medium">Pages</div>
                <div className="text-xs font-bold text-white">{book.pages}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#131520] border border-white/5 space-y-0.5">
                <div className="text-[10px] text-slate-400 font-medium">Format</div>
                <div className="text-xs font-bold text-white">PDF + EPUB</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#131520] border border-white/5 space-y-0.5">
                <div className="text-[10px] text-slate-400 font-medium">Read Time</div>
                <div className="text-xs font-bold text-white">{book.readTime}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Book Details & Pricing Buy Box */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Rating & Author Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                  <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{book.rating} Rating</span>
                  <span className="text-slate-400 font-normal">({book.reviewsCount} Reader Reviews)</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckmarkCircle02Icon className="w-3.5 h-3.5" /> Instant Delivery
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {book.title}
              </h1>

              <p className="text-sm sm:text-base text-purple-300/90 font-medium leading-relaxed">
                {book.subtitle}
              </p>
            </div>

            {/* Author Card */}
            <div className="p-3.5 rounded-2xl bg-[#13151f] border border-white/10 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold text-sm shrink-0">
                {book.author.charAt(0)}
              </div>
              <div className="space-y-0.5">
                <div className="text-xs text-slate-400">Written by</div>
                <div className="text-sm font-bold text-white">{book.author}</div>
              </div>
              <div className="ml-auto hidden sm:block text-right">
                <div className="text-[11px] text-slate-400">{book.authorRole}</div>
              </div>
            </div>

            {/* 1-Line Description */}
            <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
              {book.description}
            </p>

            {/* Pricing & Buy Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#181a2a] to-[#121420] border border-purple-500/30 shadow-2xl shadow-purple-950/50 space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Flat Price Special</div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">₹{book.price}</span>
                    <span className="text-base text-slate-500 line-through font-medium">₹{book.originalPrice}</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Save ₹{book.originalPrice - book.price} ({book.discount})
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 sm:text-right space-y-0.5">
                  <div className="text-white font-semibold">One-time payment</div>
                  <div>Lifetime access & free updates</div>
                </div>
              </div>

              {/* Buy Button */}
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setShowBuyModal(true);
                }}
                className="w-full py-4 px-6 rounded-2xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-xl shadow-[#0bc40e]/25 hover:shadow-[#0bc40e]/40 transition-all active:scale-98 cursor-pointer"
              >
                <ShoppingBag01Icon className="w-5 h-5" />
                <span>Buy E-Book Now • Flat ₹{book.price}</span>
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield01Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download01Icon className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Instant PDF & EPUB</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckmarkCircle02Icon className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>WhatsApp & Email Copy</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Content Navigation Tabs */}
        <div className="pt-6">
          <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto scrollbar-none pb-px">
            {[
              { id: 'overview', label: 'Book Overview' },
              { id: 'curriculum', label: 'Table of Contents' },
              { id: 'author', label: 'About Author' },
              { id: 'reviews', label: `Reader Reviews (${book.reviewsCount})` }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'border-purple-500 text-purple-300 bg-purple-500/10 rounded-t-xl'
                      : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="space-y-12">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Detailed Synopsis */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#13151f] border border-white/10 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Book02Icon className="w-5 h-5 text-purple-400" />
                  <span>About this E-Book</span>
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {book.fullOverview}
                </p>
              </div>

              {/* What You Will Learn (Module Cards) */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5 text-purple-400" />
                  <span>Key Principles & Takeaways Covered</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {book.whatYouWillLearn.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#131520] border border-white/5 hover:border-purple-500/30 transition-all space-y-2 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 font-bold text-xs border border-purple-500/20 group-hover:scale-110 transition-transform">
                          0{idx + 1}
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pl-10">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: TABLE OF CONTENTS */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers01Icon className="w-5 h-5 text-purple-400" />
                  <span>Table of Contents ({book.tableOfContents.length} Chapters)</span>
                </h3>
                <span className="text-xs text-slate-400">{book.pages}</span>
              </div>

              <div className="space-y-3">
                {book.tableOfContents.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#131520] border border-white/10 hover:border-purple-500/40 transition-all flex items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 shrink-0">
                        {ch.chapter}
                      </span>
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-white">{ch.title}</h4>
                        <p className="text-xs text-slate-400">{ch.subtitle}</p>
                      </div>
                    </div>
                    <CheckmarkCircle02Icon className="w-5 h-5 text-emerald-400 shrink-0 hidden sm:block" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ABOUT AUTHOR */}
          {activeTab === 'author' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#13151f] border border-white/10 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-2xl font-black text-purple-300">
                  {book.author.charAt(0)}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">{book.author}</h3>
                  <p className="text-xs text-purple-400 font-semibold">{book.authorRole}</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {book.authorBio}
              </p>
            </div>
          )}

          {/* TAB: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span>Reader Reviews & Ratings</span>
                </h3>
                <div className="text-sm font-bold text-amber-400">
                  ⭐ {book.rating} / 5.0 ({book.reviewsCount} reviews)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {book.readerReviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#131520] border border-white/10 flex flex-col justify-between space-y-4 hover:border-purple-500/30 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-500">{rev.date}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{rev.review}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-9 h-9 rounded-full object-cover border border-purple-500/30"
                      />
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <span>{rev.name}</span>
                          <CheckmarkCircle02Icon className="w-3 h-3 text-emerald-400" />
                        </div>
                        <div className="text-[10px] text-slate-400">{rev.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Sticky Bottom Bar for Mobile Conversion */}
      <div className="fixed bottom-0 inset-x-0 z-40 p-3 bg-[#0c0e15]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between gap-4 lg:hidden">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-white truncate">{book.title}</div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-white">₹{book.price}</span>
            <span className="text-xs text-slate-500 line-through">₹{book.originalPrice}</span>
          </div>
        </div>
        <button
          onClick={() => {
            setIsSuccess(false);
            setShowBuyModal(true);
          }}
          className="py-2.5 px-5 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white text-xs font-extrabold flex items-center gap-2 shrink-0 shadow-lg shadow-[#0bc40e]/30 active:scale-98 cursor-pointer"
        >
          <ShoppingBag01Icon className="w-4 h-4" />
          <span>Buy • ₹{book.price}</span>
        </button>
      </div>

      {/* Instant Checkout / Buy Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#131520] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/40 p-6 sm:p-7 space-y-5">
            
            <button
              onClick={() => setShowBuyModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Cancel01Icon className="w-4 h-4" />
            </button>

            {!isSuccess ? (
              <>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Instant Checkout</span>
                  <h3 className="text-lg font-bold text-white">Get {book.title}</h3>
                  <p className="text-xs text-slate-400">Fill your details to receive instant PDF download link.</p>
                </div>

                {/* Selected Book Summary Card */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-12 h-16 object-contain rounded-lg shrink-0 drop-shadow-md"
                  />
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h4 className="text-xs font-bold text-white truncate">{book.title}</h4>
                    <p className="text-[11px] text-purple-400">by {book.author}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">₹{book.price}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded font-semibold">
                        {book.discount}
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleBuySubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aman Sharma"
                      value={buyerForm.name}
                      onChange={(e) => setBuyerForm({ ...buyerForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Email Address (For PDF Delivery)</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aman@gmail.com"
                      value={buyerForm.email}
                      onChange={(e) => setBuyerForm({ ...buyerForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">WhatsApp Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={buyerForm.phone}
                      onChange={(e) => setBuyerForm({ ...buyerForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer transition-all disabled:opacity-50 active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Processing Payment (₹{book.price})...</span>
                    ) : (
                      <>
                        <ShoppingBag01Icon className="w-4 h-4" />
                        <span>Pay Flat ₹{book.price} & Download</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    🔒 256-Bit SSL Encrypted • Instant Access Guaranteed
                  </p>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/40">
                  <CheckmarkCircle02Icon className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white">Payment Successful!</h3>
                  <p className="text-xs text-slate-300">
                    Thank you, <strong className="text-white">{buyerForm.name}</strong>! Your copy of <strong className="text-purple-300">{book.title}</strong> is ready.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    A copy has also been sent to {buyerForm.email}.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <a
                    href={book.image}
                    download={`${book.id}-ebook.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 transition-all"
                  >
                    <Download01Icon className="w-4 h-4" />
                    <span>Download E-Book (PDF + EPUB)</span>
                  </a>

                  <a
                    href={`https://wa.me/919876543210?text=Hi!%20I%20just%20purchased%20the%20ebook%20${encodeURIComponent(book.title)}%20for%20₹${book.price}.%20My%20email%20is%20${encodeURIComponent(buyerForm.email)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Receive on WhatsApp Directly</span>
                    <ArrowRight01Icon className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={() => setShowBuyModal(false)}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Close & Continue Reading
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Look Inside / Sample Preview Modal */}
      {showSampleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#131520] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/40 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setShowSampleModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Cancel01Icon className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Look Inside • Preview</span>
              <h3 className="text-xl font-bold text-white">{book.title}</h3>
              <p className="text-xs text-slate-400">Chapter 1 Preview & Summary Highlights</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#090b10] border border-white/10 space-y-4">
              <div className="text-xs font-bold text-purple-300 uppercase tracking-wide">
                From Chapter 1: {book.tableOfContents[0]?.title}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "{book.fullOverview}"
              </p>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                💡 <strong>Core Takeaway:</strong> {book.whatYouWillLearn[0]?.desc}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Full Table of Contents Sample</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {book.tableOfContents.slice(0, 4).map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                    <span className="font-bold text-purple-300">{c.chapter}: </span>
                    <span className="text-slate-300">{c.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-black text-white">₹{book.price}</span>
                <span className="text-xs text-slate-500 line-through ml-2">₹{book.originalPrice}</span>
              </div>
              <button
                onClick={() => {
                  setShowSampleModal(false);
                  setShowBuyModal(true);
                }}
                className="py-2.5 px-6 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#0bc40e]/30 active:scale-98 cursor-pointer"
              >
                <ShoppingBag01Icon className="w-4 h-4" />
                <span>Buy Full E-Book</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
