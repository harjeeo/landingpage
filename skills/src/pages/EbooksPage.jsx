import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Book02Icon,
  Search01Icon,
  StarIcon,
  ShoppingBag01Icon,
  Download01Icon,
  EyeIcon,
  CheckmarkCircle02Icon,
  SparklesIcon,
  Cancel01Icon,
  ArrowRight01Icon,
  Tag01Icon
} from 'hugeicons-react';

const EBOOKS_DATA = [
  {
    id: 'dont-make-me-think',
    title: "Don't Make Me Think — Revisited",
    author: "Steve Krug",
    badge: "UI/UX",
    rating: "5.0",
    reviewsCount: "420+",
    price: 199,
    originalPrice: 999,
    discount: "80% OFF",
    pages: "216 Pages",
    format: "PDF + EPUB",
    image: "/images/ebooks/dont-make-me-think.png",
    description: "A common sense approach to intuitive web and mobile usability design.",
    highlights: [
      "Core laws of intuitive interface navigation",
      "Designing for scanning rather than reading",
      "Mobile usability and touch-first ergonomics",
      "User testing with zero budget"
    ]
  },
  {
    id: 'rocket-surgery-made-easy',
    title: "Rocket Surgery Made Easy",
    author: "Steve Krug",
    badge: "UI/UX",
    rating: "4.9",
    reviewsCount: "310+",
    price: 199,
    originalPrice: 899,
    discount: "78% OFF",
    pages: "168 Pages",
    format: "PDF + Checklists",
    image: "/images/ebooks/rocket-surgery-made-easy.png",
    description: "The do-it-yourself actionable guide to finding and fixing usability problems fast.",
    highlights: [
      "Running monthly 1-hour DIY usability tests",
      "Identifying the most severe UX bottlenecks",
      "Making high-impact tweaks with minimal effort",
      "Ready-to-use usability testing scripts & checklists"
    ]
  },
  {
    id: 'creativity-inc',
    title: "Creativity, Inc.",
    author: "Ed Catmull",
    badge: "Graphic Design",
    rating: "5.0",
    reviewsCount: "580+",
    price: 199,
    originalPrice: 1299,
    discount: "85% OFF",
    pages: "340 Pages",
    format: "PDF + Summary Guide",
    image: "/images/ebooks/creativity-inc.png",
    description: "Overcoming the unseen forces that stand in the way of true inspiration and creativity.",
    highlights: [
      "Building world-class creative team dynamics",
      "The Braintrust philosophy for candid feedback",
      "Navigating artistic failure and iterative craft",
      "Storytelling and visual balance principles"
    ]
  },
  {
    id: 'design-of-everyday-things',
    title: "The Design of Everyday Things",
    author: "Don Norman",
    badge: "UI/UX",
    rating: "5.0",
    reviewsCount: "890+",
    price: 199,
    originalPrice: 999,
    discount: "80% OFF",
    pages: "368 Pages",
    format: "PDF + EPUB",
    image: "/images/ebooks/dont-make-me-think.png",
    description: "Fundamental principles of human-centered design, cognitive affordance, and UX.",
    highlights: [
      "Affordances, signifiers, and mapping concepts",
      "The 7 stages of user action and execution gaps",
      "Error prevention and forgiving design systems",
      "Human-centered design thinking framework"
    ]
  },
  {
    id: 'graphic-design-rules',
    title: "Graphic Design Rules & Visual Balance",
    author: "Sean Adams",
    badge: "Graphic Design",
    rating: "4.9",
    reviewsCount: "270+",
    price: 199,
    originalPrice: 799,
    discount: "75% OFF",
    pages: "220 Pages",
    format: "PDF + Cheatsheet",
    image: "/images/ebooks/creativity-inc.png",
    description: "365 essential design laws for typography, color theory, spacing, and grids.",
    highlights: [
      "Golden ratio and dynamic grid layouts",
      "Color psychology and contrast ratios",
      "Visual hierarchy that directs the viewer's eye",
      "When to follow design rules and when to break them"
    ]
  },
  {
    id: 'thinking-with-type',
    title: "Thinking with Type — Typography Mastery",
    author: "Ellen Lupton",
    badge: "Graphic Design",
    rating: "5.0",
    reviewsCount: "340+",
    price: 199,
    originalPrice: 899,
    discount: "78% OFF",
    pages: "240 Pages",
    format: "PDF + Font Pairings",
    image: "/images/ebooks/rocket-surgery-made-easy.png",
    description: "Essential visual guide for designers on letterforms, grid systems, and hierarchy.",
    highlights: [
      "Type anatomy, kerning, leading, and tracking",
      "Harmonious font pairings for modern web and print",
      "Modular grid systems and baseline grids",
      "Expressive editorial and digital typography"
    ]
  },
  {
    id: 'microcopy-ux-writing',
    title: "Microcopy & UX Writing Playbook",
    author: "Kinneret Yifrah",
    badge: "UI/UX",
    rating: "4.9",
    reviewsCount: "190+",
    price: 199,
    originalPrice: 699,
    discount: "72% OFF",
    pages: "175 Pages",
    format: "PDF + Copy Templates",
    image: "/images/ebooks/dont-make-me-think.png",
    description: "Practical framework to write clear, high-converting buttons, error messages, and flows.",
    highlights: [
      "Crafting frictionless CTA copy and micro-interactions",
      "Humanizing empty states and error recovery messages",
      "Tone of voice matrix for brand personalities",
      "Onboarding flows that retain new users"
    ]
  },
  {
    id: 'logo-design-love',
    title: "Logo Design Love & Brand Identity",
    author: "David Airey",
    badge: "Graphic Design",
    rating: "5.0",
    reviewsCount: "460+",
    price: 199,
    originalPrice: 1199,
    discount: "83% OFF",
    pages: "230 Pages",
    format: "PDF + Brand Guide",
    image: "/images/ebooks/creativity-inc.png",
    description: "Guide to creating iconic, timeless brand identities, logos, and client presentations.",
    highlights: [
      "Developing unforgettable logo concepts",
      "Conducting discovery calls & client briefs",
      "Crafting brand guideline manuals",
      "Presenting concepts without endless revision rounds"
    ]
  }
];

export default function EbooksPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewBook, setPreviewBook] = useState(null);
  const [purchaseBook, setPurchaseBook] = useState(null);
  const [buyerForm, setBuyerForm] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return EBOOKS_DATA.filter((book) => {
      // Category filter
      if (activeCategory === 'UI/UX' && book.badge !== 'UI/UX') return false;
      if (activeCategory === 'Graphic Design' && book.badge !== 'Graphic Design') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = book.title.toLowerCase().includes(q);
        const matchesAuthor = book.author.toLowerCase().includes(q);
        const matchesDesc = book.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuthor && !matchesDesc) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  const handleBuyClick = (book) => {
    setPurchaseBook(book);
    setIsSuccess(false);
    setBuyerForm({ name: '', email: '', phone: '' });
  };

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    if (!buyerForm.name || !buyerForm.email || !buyerForm.phone) {
      alert('Please fill in all contact fields');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0c0e15] text-slate-100 font-sans pb-24 selection:bg-[#6400e6] selection:text-white">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[130px]" />
        <div className="absolute -top-30 right-1/4 w-[450px] h-[450px] bg-indigo-600/25 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10 sm:space-y-12">
        
        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wide shadow-xs">
            <SparklesIcon className="w-4 h-4 text-purple-400" />
            <span>Digital Library & E-Books</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Master UI/UX & Graphic Design with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400">Curated E-Books</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Instant digital downloads packed with industry-tested design frameworks, usability laws, and creative thinking guides. All e-books at flat <strong className="text-white font-semibold">₹199</strong>.
          </p>
        </div>

        {/* Filter and Search Bar Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2.5 sm:p-3 rounded-2xl bg-[#13151f] border border-white/10 shadow-xl shadow-black/40 backdrop-blur-xl">
          
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'All', label: 'All E-Books', count: EBOOKS_DATA.length },
              { id: 'UI/UX', label: 'UI/UX', count: EBOOKS_DATA.filter(b => b.badge === 'UI/UX').length },
              { id: 'Graphic Design', label: 'Graphic Design', count: EBOOKS_DATA.filter(b => b.badge === 'Graphic Design').length },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#6400e6] text-white shadow-md shadow-purple-900/40 border border-purple-400/40'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search01Icon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search e-books or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <Cancel01Icon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* 4 Books per Row Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-[#13151f]/60 rounded-3xl border border-white/10 space-y-3">
            <Book02Icon className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No E-books found</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              No e-books matched your search query "{searchQuery}". Try selecting another category or clear your search.
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => {
              const isUIUX = book.badge === 'UI/UX';
              return (
                <div
                  key={book.id}
                  className="group relative flex flex-col justify-between bg-[#131520] hover:bg-[#181a27] border border-white/10 hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-purple-950/20 hover:-translate-y-1.5"
                >
                  {/* Top Cover Image Container */}
                  <div className="relative w-full aspect-[3/4] bg-[#090b10] overflow-hidden flex items-center justify-center p-3 border-b border-white/10">
                    
                    {/* Top Right Badge (Exact requirement: UI/UX or Graphic Design on top right) */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md border ${
                        isUIUX
                          ? 'bg-purple-600/90 text-purple-100 border-purple-400/40 shadow-purple-950/50'
                          : 'bg-amber-600/90 text-amber-100 border-amber-400/40 shadow-amber-950/50'
                      }`}>
                        <Tag01Icon className="w-3 h-3" />
                        {book.badge}
                      </span>
                    </div>

                    {/* Left corner discount badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {book.discount}
                      </span>
                    </div>

                    {/* Book Cover Image with 3D shadow style */}
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-contain rounded-lg drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Quick Preview Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4 z-10">
                      <button
                        onClick={() => setPreviewBook(book)}
                        className="px-3.5 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-slate-100 transition-all active:scale-95"
                      >
                        <EyeIcon className="w-4 h-4 text-purple-700" />
                        <span>Quick Look</span>
                      </button>
                    </div>
                  </div>

                  {/* Book Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-2">
                      {/* Rating & Pages Meta */}
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <StarIcon className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{book.rating}</span>
                          <span className="text-slate-500 font-normal">({book.reviewsCount})</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{book.pages}</span>
                      </div>

                      {/* E-book Title */}
                      <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                        {book.title}
                      </h3>

                      {/* Author */}
                      <p className="text-[12px] font-medium text-purple-400/90 -mt-1">
                        by {book.author}
                      </p>

                      {/* 1 Line Description (Exact requirement: 1 line description) */}
                      <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed" title={book.description}>
                        {book.description}
                      </p>
                    </div>

                    {/* Bottom Price & CTA Area */}
                    <div className="pt-3 border-t border-white/10 space-y-3">
                      
                      {/* Price Section */}
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-white tracking-tight">₹{book.price}</span>
                          <span className="text-xs text-slate-500 line-through">₹{book.originalPrice}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          {book.format}
                        </span>
                      </div>

                      {/* Buy Action Button */}
                      <button
                        onClick={() => handleBuyClick(book)}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-950/50 hover:shadow-purple-900/60 transition-all active:scale-98 cursor-pointer"
                      >
                        <ShoppingBag01Icon className="w-4 h-4" />
                        <span>Get E-Book • ₹{book.price}</span>
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
          <div className="p-6 rounded-2xl bg-[#13151f] border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Download01Icon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Instant Digital Delivery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive instant PDF, EPUB, and reading notes on your email & WhatsApp immediately upon purchase.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#13151f] border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <CheckmarkCircle02Icon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Lifetime Access & Updates</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Read offline on any phone, tablet, iPad, or Kindle with free future revised editions.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#13151f] border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Curated by Industry Mentors</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Handpicked practical design books recommended by senior product designers and art directors.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Preview Modal */}
      {previewBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#131520] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/40 p-6 sm:p-8 space-y-6">
            
            <button
              onClick={() => setPreviewBook(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Cancel01Icon className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
              <div className="w-full aspect-[3/4] bg-[#090b10] rounded-2xl overflow-hidden border border-white/10 p-2 flex items-center justify-center">
                <img
                  src={previewBook.image}
                  alt={previewBook.title}
                  className="w-full h-full object-contain rounded-lg drop-shadow-xl"
                />
              </div>

              <div className="sm:col-span-2 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      previewBook.badge === 'UI/UX' ? 'bg-purple-500/20 text-purple-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {previewBook.badge}
                    </span>
                    <span className="text-xs text-slate-400">{previewBook.pages}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{previewBook.title}</h3>
                  <p className="text-xs text-purple-400 font-semibold">by {previewBook.author}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {previewBook.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Key Highlights Covered</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {previewBook.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckmarkCircle02Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <div>
                    <span className="text-2xl font-black text-white">₹{previewBook.price}</span>
                    <span className="text-xs text-slate-500 line-through ml-2">₹{previewBook.originalPrice}</span>
                  </div>
                  <button
                    onClick={() => {
                      const b = previewBook;
                      setPreviewBook(null);
                      handleBuyClick(b);
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40"
                  >
                    <ShoppingBag01Icon className="w-4 h-4" />
                    <span>Get E-Book Now</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Buy / Instant Checkout Modal */}
      {purchaseBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#131520] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/40 p-6 sm:p-7 space-y-5">
            
            <button
              onClick={() => setPurchaseBook(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Cancel01Icon className="w-4 h-4" />
            </button>

            {!isSuccess ? (
              <>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Instant Checkout</span>
                  <h3 className="text-lg font-bold text-white">Get {purchaseBook.title}</h3>
                  <p className="text-xs text-slate-400">Fill your details to receive instant PDF download link.</p>
                </div>

                {/* Selected Book Summary Card */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <img
                    src={purchaseBook.image}
                    alt={purchaseBook.title}
                    className="w-12 h-16 object-contain rounded-lg shrink-0 drop-shadow-md"
                  />
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h4 className="text-xs font-bold text-white truncate">{purchaseBook.title}</h4>
                    <p className="text-[11px] text-purple-400">by {purchaseBook.author}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">₹{purchaseBook.price}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded font-semibold">
                        {purchaseBook.discount}
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePurchaseSubmit} className="space-y-3.5">
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
                      <span>Processing Payment (₹{purchaseBook.price})...</span>
                    ) : (
                      <>
                        <ShoppingBag01Icon className="w-4 h-4" />
                        <span>Pay Flat ₹{purchaseBook.price} & Download</span>
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
                    Thank you, <strong className="text-white">{buyerForm.name}</strong>! Your copy of <strong className="text-purple-300">{purchaseBook.title}</strong> is ready.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    A copy has also been sent to {buyerForm.email}.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <a
                    href={purchaseBook.image}
                    download={`${purchaseBook.id}-ebook.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 transition-all"
                  >
                    <Download01Icon className="w-4 h-4" />
                    <span>Download E-Book (PDF + EPUB)</span>
                  </a>

                  <a
                    href={`https://wa.me/919876543210?text=Hi!%20I%20just%20purchased%20the%20ebook%20${encodeURIComponent(purchaseBook.title)}%20for%20₹${purchaseBook.price}.%20My%20email%20is%20${encodeURIComponent(buyerForm.email)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Receive on WhatsApp Directly</span>
                    <ArrowRight01Icon className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={() => setPurchaseBook(null)}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Close & Browse More Books
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
