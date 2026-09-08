import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardSquare01Icon,
  Mortarboard01Icon,
  Layers01Icon,
  FavouriteIcon,
  Search01Icon,
  Folder01Icon,
  LinkSquare01Icon,
  Copy01Icon,
  Tick02Icon,
  SparklesIcon,
  ArrowRight01Icon,
  Download01Icon,
  FileAttachmentIcon,
  Book02Icon
} from 'hugeicons-react';

// Mock Resources Data
const ALL_RESOURCES = [
  {
    id: 'res-1',
    title: 'Figma Design Tokens & Component System v2.4',
    description: 'Complete UI component library containing responsive auto-layout components, color tokens, dark/light variables, and layout grids.',
    course: 'UI/UX Design Masterclass',
    category: 'figma',
    categoryLabel: 'Figma Kits',
    badge: 'Design System',
    fileType: 'FIGMA FILE',
    formatBadge: '.FIG',
    size: '45.2 MB',
    iconBg: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    icon: '🎨',
    actionText: 'Open in Figma',
    link: 'https://figma.com/@designsclue',
    isFavorite: true,
    uploadedOn: 'Updated 2 days ago',
    downloadsCount: 1420
  },
  {
    id: 'res-2',
    title: 'UX Heuristics & 10 Usability Principles Deck',
    description: 'Comprehensive presentation deck breaking down Nielsen Norman Group usability heuristics with real-world mobile app audit examples.',
    course: 'UI/UX Design Masterclass',
    category: 'pdf',
    categoryLabel: 'Slide Decks',
    badge: 'Presentation',
    fileType: 'PDF DOCUMENT',
    formatBadge: '.PDF',
    size: '14.8 MB',
    iconBg: 'bg-red-500/15 text-red-400 border-red-500/20',
    icon: '📄',
    actionText: 'Download PDF',
    link: '#download',
    isFavorite: false,
    uploadedOn: '3 days ago',
    downloadsCount: 980
  },
  {
    id: 'res-3',
    title: 'Batch #04 UI/UX Shared Google Drive Asset Vault',
    description: 'Centralized cloud storage folder containing class session recordings, raw SVG illustrations, font libraries, and project briefs.',
    course: 'UI/UX Design Masterclass',
    category: 'drive',
    categoryLabel: 'Cloud Storage',
    badge: 'Drive Folder',
    fileType: 'GOOGLE DRIVE',
    formatBadge: 'DRIVE',
    size: 'All Assets',
    iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    icon: '📁',
    actionText: 'Open Drive Folder',
    link: 'https://drive.google.com',
    isFavorite: true,
    uploadedOn: 'Updated Daily',
    downloadsCount: 2150
  },
  {
    id: 'res-4',
    title: 'Midjourney & Flux UI Prompt Engineering Cheatsheet',
    description: 'Curated collection of 150+ tested generative AI prompts for creating ultra-realistic 3D icons, UI hero concepts, and marketing banners.',
    course: 'Graphic Design & AI Mastery',
    category: 'ai',
    categoryLabel: 'AI Prompts',
    badge: 'AI Cheatsheet',
    fileType: 'PROMPT VAULT',
    formatBadge: 'PROMPTS',
    size: '8.4 MB',
    iconBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
    icon: '✨',
    actionText: 'View Prompts',
    link: '#view-prompts',
    isFavorite: true,
    uploadedOn: '5 days ago',
    downloadsCount: 3100
  },
  {
    id: 'res-5',
    title: 'Realistic iPhone 16 Pro & MacBook Mockup Pack',
    description: 'High-resolution clay and photo-realistic device presentation mockups with smart objects for presenting portfolio case studies.',
    course: 'UI/UX Design Masterclass',
    category: 'mockup',
    categoryLabel: 'PSD Mockups',
    badge: 'Mockup Pack',
    fileType: 'PHOTOSHOP PSD',
    formatBadge: '.PSD',
    size: '124 MB',
    iconBg: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    icon: '🖼️',
    actionText: 'Download ZIP',
    link: '#download',
    isFavorite: false,
    uploadedOn: '1 week ago',
    downloadsCount: 1840
  },
  {
    id: 'res-6',
    title: 'Wireframing & UX User Flow Kit for Mobile & Web',
    description: 'Lo-fi wireframe UI components, flowchart arrows, gesture indicators, and sitemap connectors for rapid prototyping in FigJam.',
    course: 'UI/UX Design Masterclass',
    category: 'figma',
    categoryLabel: 'Figma Kits',
    badge: 'Wireframes',
    fileType: 'FIGMA FILE',
    formatBadge: '.FIG',
    size: '28.6 MB',
    iconBg: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    icon: '🎨',
    actionText: 'Open in Figma',
    link: 'https://figma.com/@designsclue',
    isFavorite: false,
    uploadedOn: '1 week ago',
    downloadsCount: 1650
  },
  {
    id: 'res-7',
    title: 'Design Tokens, Variables & Mode Switching Guide',
    description: 'Step-by-step PDF manual on structuring color and spacing tokens, aliasing primitives, and publishing multi-brand UI libraries.',
    course: 'UI/UX Design Masterclass',
    category: 'pdf',
    categoryLabel: 'Slide Decks',
    badge: 'Reference Guide',
    fileType: 'PDF DOCUMENT',
    formatBadge: '.PDF',
    size: '6.2 MB',
    iconBg: 'bg-red-500/15 text-red-400 border-red-500/20',
    icon: '📄',
    actionText: 'Download PDF',
    link: '#download',
    isFavorite: false,
    uploadedOn: '10 days ago',
    downloadsCount: 890
  },
  {
    id: 'res-8',
    title: '3D Glassmorphism & Clay Vector Icon Set',
    description: '300+ transparent PNG and customizable vector 3D illustrations for fintech, crypto, e-commerce, and SaaS landing pages.',
    course: 'Graphic Design & AI Mastery',
    category: 'mockup',
    categoryLabel: 'PSD Mockups',
    badge: 'Vector Kit',
    fileType: 'ZIP ARCHIVE',
    formatBadge: '.ZIP',
    size: '76 MB',
    iconBg: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    icon: '💎',
    actionText: 'Download ZIP',
    link: '#download',
    isFavorite: false,
    uploadedOn: '2 weeks ago',
    downloadsCount: 2430
  },
  {
    id: 'res-9',
    title: 'Curated Design Inspiration & Typography Notion Board',
    description: 'Interactive Notion database with font pairing formulas, golden ratio spacing calculators, micro-interaction benchmarks, and UI references.',
    course: 'UI/UX Design Masterclass',
    category: 'drive',
    categoryLabel: 'Cloud Storage',
    badge: 'Notion Wiki',
    fileType: 'NOTION WIKI',
    formatBadge: 'NOTION',
    size: 'Live Database',
    iconBg: 'bg-slate-500/15 text-slate-300 border-slate-500/20',
    icon: '📝',
    actionText: 'Open Notion Page',
    link: 'https://notion.so',
    isFavorite: true,
    uploadedOn: 'Updated Weekly',
    downloadsCount: 1950
  }
];

export default function ResourcesPage() {
  const [resources, setResources] = useState(ALL_RESOURCES);
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'figma', 'pdf', 'mockup', 'ai', 'drive'
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [activePromptModal, setActivePromptModal] = useState(null);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState(null);

  // Toggle bookmark state
  const toggleFavorite = (id) => {
    setResources((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  // Filter logic
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Batch filter
      if (selectedBatch !== 'all' && item.course !== selectedBatch) return false;

      // Favorites only filter
      if (showOnlyFavorites && !item.isFavorite) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.course.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [resources, selectedCategory, selectedBatch, showOnlyFavorites, searchQuery]);

  const sampleAiPrompts = [
    {
      title: 'Modern 3D Glassmorphism FinTech Card',
      prompt: 'Isometric 3D credit card floating in air, glowing dark violet and neon emerald accents, matte glass texture, clean studio lighting, 8k resolution, minimalist UI background, octane render --ar 16:9 --v 6.0'
    },
    {
      title: 'Minimalist SaaS Web App Dashboard Mockup',
      prompt: 'Clean modern web application analytics dashboard on dark obsidian interface, sleek bar charts with emerald gradients, modern typography, dribbble trending, high fidelity UI design --ar 16:9 --v 6.0'
    },
    {
      title: 'Mobile App Clay Icon Set',
      prompt: '3D cute claymorphism wallet and payment coins icon, rounded edges, soft diffuse lighting, clean vibrant colors, isolated on pure black background, 3D render, blender 3D --ar 1:1'
    }
  ];

  const handleCopyPrompt = (text, idx) => {
    navigator.clipboard?.writeText(text);
    setCopiedPromptIndex(idx);
    setTimeout(() => setCopiedPromptIndex(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0c0e15] text-slate-100 font-sans pb-24 selection:bg-[#0bc40e] selection:text-black">
      
      {/* Sub-navigation Header Bar */}
      <div className="border-b border-white/10 bg-[#0f111a]/80 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Sub-nav Links */}
            <nav className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none text-xs font-semibold pt-3">
              <Link
                to="/dashboard"
                className="pb-3 text-[#a1a1aa] hover:text-white transition-all relative flex items-center gap-1.5"
              >
                <DashboardSquare01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/my-learning"
                className="pb-3 text-[#a1a1aa] hover:text-white transition-all relative flex items-center gap-1.5"
              >
                <Mortarboard01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                <span>My Learning</span>
                <span className="px-1.5 py-0.2 bg-white/10 text-slate-200 border border-white/10 rounded-full text-[10px] font-bold">
                  2 Batches
                </span>
              </Link>

              <Link
                to="/courses"
                className="pb-3 text-[#a1a1aa] hover:text-white transition-all relative flex items-center gap-1.5"
              >
                <Layers01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                <span>Browse Courses</span>
              </Link>

              <Link
                to="/resources"
                className="pb-3 text-white font-bold transition-all relative flex items-center gap-1.5"
              >
                <Folder01Icon className="w-3.5 h-3.5 text-[#0bc40e]" />
                <span>Resources & Files</span>
                <span className="px-1.5 py-0.2 bg-[#0bc40e]/15 text-[#0bc40e] border border-[#0bc40e]/30 rounded-full text-[10px] font-bold">
                  {resources.length} Files
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0bc40e] rounded-full shadow-xs shadow-[#0bc40e]/40"></div>
              </Link>
            </nav>

            {/* Quick Search */}
            <div className="flex items-center pb-2 sm:pb-0 sm:self-center">
              <div className="relative w-56 sm:w-72 h-8.5 flex items-center">
                <Search01Icon className="w-3.5 h-3.5 text-[#71717a] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search files, Figma kits, decks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full bg-[#181a24] border border-white/10 rounded-full pl-8 pr-3 text-xs text-white placeholder:text-[#71717a] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all leading-none"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-9">

        {/* SECTION 1: Featured Spotlight Resource Card */}
        <section className="relative overflow-hidden rounded-2xl bg-[#13151f] border border-white/10 hover:border-white/15 p-6 sm:p-7 shadow-xl shadow-black/30 transition-all">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[11px] font-bold tracking-wide">
                  <SparklesIcon className="w-3.5 h-3.5" />
                  FEATURED STARTER KIT
                </span>
                <span className="text-xs text-[#71717a] font-medium">
                  UI/UX Design Masterclass • v2.4
                </span>
              </div>

              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  Figma Design Tokens & Enterprise Component Library
                </h1>
                <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1.5 leading-relaxed">
                  500+ production-ready responsive auto layout components, WCAG accessible color variables, token hierarchies, and interactive variants.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#71717a] pt-1">
                <span>📁 45.2 MB (.FIG)</span>
                <span>•</span>
                <span>📥 1,420+ Student Downloads</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">Free for Enrolled Students</span>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
              <a
                href="https://figma.com/@designsclue"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <LinkSquare01Icon className="w-4 h-4 text-slate-950" />
                <span>Open in Figma</span>
              </a>

              <button
                onClick={() => alert('Figma Starter Kit downloaded to your device!')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#181a24] hover:bg-[#232736] text-[#dfdfe2] border border-white/10 hover:border-white/20 font-medium text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download01Icon className="w-4 h-4 text-[#a1a1aa]" />
                <span>Download .FIG</span>
              </button>
            </div>

          </div>
        </section>

        {/* SECTION 2: Category Filter Bar & Controls */}
        <section className="space-y-5">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => { setSelectedCategory('all'); setShowOnlyFavorites(false); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === 'all' && !showOnlyFavorites
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
                }`}
              >
                All Files
              </button>

              <button
                onClick={() => { setSelectedCategory('figma'); setShowOnlyFavorites(false); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'figma'
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
                }`}
              >
                <span>🎨 Figma Kits</span>
              </button>

              <button
                onClick={() => { setSelectedCategory('pdf'); setShowOnlyFavorites(false); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'pdf'
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
                }`}
              >
                <span>📄 Slide Decks</span>
              </button>

              <button
                onClick={() => { setSelectedCategory('mockup'); setShowOnlyFavorites(false); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'mockup'
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
                }`}
              >
                <span>🖼️ Mockups & Vectors</span>
              </button>

              <button
                onClick={() => { setSelectedCategory('ai'); setShowOnlyFavorites(false); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'ai'
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
                }`}
              >
                <span>✨ AI Prompts</span>
              </button>

              <button
                onClick={() => { setSelectedCategory('drive'); setShowOnlyFavorites(false); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'drive'
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
                }`}
              >
                <span>📁 Cloud Drives & Notion</span>
              </button>

              <button
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  showOnlyFavorites
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                    : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
                }`}
              >
                <FavouriteIcon className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-slate-950' : 'text-amber-400'}`} />
                <span>Saved ({resources.filter(r => r.isFavorite).length})</span>
              </button>
            </div>

            {/* Batch Filter Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-[#71717a] font-medium hidden sm:inline-block">Filter Batch:</span>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="bg-[#181a24] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/30"
              >
                <option value="all">All Enrolled Courses</option>
                <option value="UI/UX Design Masterclass">UI/UX Design Masterclass</option>
                <option value="Graphic Design & AI Mastery">Graphic Design & AI Mastery</option>
              </select>
            </div>

          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-[#13151f] rounded-2xl border border-white/10 hover:border-white/20 p-5 transition-all shadow-md flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  
                  {/* Top Header: Badge + Format + Heart Favorite */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center text-sm shrink-0 ${res.iconBg}`}>
                        {res.icon}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">
                        {res.formatBadge}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFavorite(res.id)}
                      className="p-1.5 rounded-lg text-[#71717a] hover:text-amber-400 transition-colors cursor-pointer"
                      title={res.isFavorite ? 'Remove from Saved' : 'Save to Favorites'}
                    >
                      <FavouriteIcon className={`w-4 h-4 ${res.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-[#71717a]'}`} />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-slate-200 transition-colors leading-snug">
                      {res.title}
                    </h3>
                    <p className="text-xs text-[#a1a1aa] mt-1.5 line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  {/* Course & Size Meta */}
                  <div className="flex items-center justify-between text-[11px] text-[#71717a] pt-1">
                    <span className="truncate max-w-[170px]">{res.course}</span>
                    <span className="font-medium text-slate-400 shrink-0">{res.size}</span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 flex items-center justify-between border-t border-white/10 gap-2">
                  <span className="text-[10px] text-[#71717a]">{res.uploadedOn}</span>

                  {res.category === 'ai' ? (
                    <button
                      onClick={() => setActivePromptModal(res)}
                      className="py-1.5 px-3 rounded-lg bg-[#181a24] hover:bg-white hover:text-slate-950 text-[#dfdfe2] border border-white/10 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <SparklesIcon className="w-3.5 h-3.5" />
                      <span>{res.actionText}</span>
                    </button>
                  ) : (
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 rounded-lg bg-[#181a24] hover:bg-white hover:text-slate-950 text-[#dfdfe2] border border-white/10 text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <LinkSquare01Icon className="w-3.5 h-3.5" />
                      <span>{res.actionText}</span>
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="bg-[#13151f] rounded-2xl border border-white/10 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 text-slate-400 flex items-center justify-center mx-auto text-xl">
                🔍
              </div>
              <h3 className="text-base font-bold text-white">No files or resources found</h3>
              <p className="text-xs text-[#a1a1aa] max-w-sm mx-auto">
                No items match your filter criteria. Try searching with different keywords or resetting filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBatch('all');
                  setShowOnlyFavorites(false);
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-white text-slate-950 text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </section>

      </main>

      {/* MODAL: AI Prompt Viewer Modal */}
      {activePromptModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#13151f] rounded-3xl border border-white/15 max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative text-white animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  AI Prompt Vault
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {activePromptModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActivePromptModal(null)}
                className="text-[#71717a] hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              {sampleAiPrompts.map((item, idx) => (
                <div key={idx} className="bg-[#181a24] rounded-2xl border border-white/10 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white">{item.title}</h5>
                    <button
                      onClick={() => handleCopyPrompt(item.prompt, idx)}
                      className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedPromptIndex === idx ? (
                        <>
                          <Tick02Icon className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 text-[11px]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy01Icon className="w-3.5 h-3.5 text-slate-300" />
                          <span className="text-[11px]">Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[#a1a1aa] font-mono bg-black/40 p-2.5 rounded-xl border border-white/5 leading-relaxed selection:bg-cyan-500 selection:text-black">
                    {item.prompt}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActivePromptModal(null)}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all cursor-pointer"
            >
              Close Vault
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
