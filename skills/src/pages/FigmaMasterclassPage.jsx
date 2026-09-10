import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { LaptopVideoIcon, Building02Icon } from 'hugeicons-react';
import ClassModeSelectionModal from '../components/ClassModeSelectionModal';
import { isAuthenticated, savePendingEnrollment } from '../lib/auth';

const MODULE_ICONS = [
  {
    bg: "bg-blue-50 text-blue-600 border-blue-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    bg: "bg-purple-50 text-purple-600 border-purple-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )
  },
  {
    bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    bg: "bg-amber-50 text-amber-600 border-amber-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    bg: "bg-rose-50 text-rose-600 border-rose-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 5v14m0 0H7m2 0h2M15 11h6m-3 0v8m0 0h-1.5m1.5 0h1.5" />
      </svg>
    )
  },
  {
    bg: "bg-cyan-50 text-cyan-600 border-cyan-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    bg: "bg-indigo-50 text-indigo-600 border-indigo-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    bg: "bg-violet-50 text-violet-600 border-violet-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    bg: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    bg: "bg-teal-50 text-teal-600 border-teal-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    bg: "bg-orange-50 text-orange-600 border-orange-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    bg: "bg-emerald-50 text-[#0bc40e] border-emerald-100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  }
];

const COURSE_DATA = {
  'ui-design-masterclass': {
    slug: 'ui-design-masterclass',
    title: 'UI Design Masterclass — Next-Gen UI Design with AI',
    heroTagline: 'Design High-Converting, Production-Ready Digital Interfaces Powered by AI',
    categoryBadge: '✨ Next-Gen UI & AI Masterclass',
    description: 'Learn how to create world-class UI designs, build scalable design systems in Figma, and accelerate your creative workflow using cutting-edge AI design tools.',
    coverImage: '/images/ui-design-masterclass.jpg',
    price: '₹2,999',
    students: '2,400+ Students',
    rating: '5.0 Rating (340+ Reviews)',
    duration: '16+ Hours HD Video',
    level: 'All Levels',
    pricingPoints: [
      'Getting Started with Google Stitch',
      'Creating Wireframes with AI',
      'Stitch to Figma Conversion',
      'Master UI Design with AI',
      'Figma Basics',
      'Customized UI Design',
      'Development-Ready UI with AI'
    ],
    whatYouWillLearn: [
      {
        title: "1. Next-Gen UI Foundations & Visual Design",
        description: "Master typography scales, spacing grids, modern color theory, contrast ratios, and visual hierarchy principles for stunning UI.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )
      },
      {
        title: "2. AI Tools for UI Designers",
        description: "Leverage AI for rapid wireframing, moodboard generation, copywriting, automated component creation, and visual asset generation.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      },
      {
        title: "3. Advanced Figma Design Systems & Tokens",
        description: "Build scalable design systems with variables, auto-layout 5.0, responsive components, interactive states, and design tokens.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 4v16M4 9h16" />
          </svg>
        )
      },
      {
        title: "4. Web & Mobile App Interface Design",
        description: "Design pixel-perfect SaaS dashboards, mobile apps (iOS & Android), landing pages, and interactive high-fidelity prototypes.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        title: "5. Micro-Interactions & Prototyping",
        description: "Create smooth animations, smart animate micro-interactions, page transitions, and interactive user flows.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: "6. Developer Handoff & Client Delivery",
        description: "Prepare clean specs, export production-ready assets, organize Figma files, and pitch your designs with confidence.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )
      }
    ],
    modules: [
      {
        title: "Module 1 — Getting Started with Google Stitch",
        lessonsCount: "4 lessons • 45 min",
        lessons: [
          "Understanding Google Stitch and its capabilities",
          "Stitch interface and core workflow",
          "Creating your first AI-generated interface",
          "Understanding prompts and design instructions"
        ]
      },
      {
        title: "Module 2 — Creating Wireframes with AI",
        lessonsCount: "5 lessons • 1 hour",
        lessons: [
          "Understanding Wireframes & User Flow",
          "Turning Ideas into AI-Generated Wireframes",
          "Creating Wireframes with Google Stitch",
          "Refining Layouts & Screen Structures with AI",
          "From Wireframe to Final UI Concept"
        ]
      },
      {
        title: "Module 3 — Stitch to Figma Conversion",
        lessonsCount: "5 lessons • 1 hour 10 min",
        lessons: [
          "Preparing Stitch Designs for Figma",
          "Converting AI-Generated Screens into Editable UI",
          "Rebuilding & Organizing Layers in Figma",
          "Creating Components from Stitch Designs",
          "Cleaning & Structuring the Final Figma File"
        ]
      },
      {
        title: "Module 4 — Master UI Design with AI",
        lessonsCount: "5 lessons • 1 hour 15 min",
        lessons: [
          "Understanding Modern UI Design Principles",
          "Using AI for UI Ideas & Design Exploration",
          "Creating Professional Web & Mobile Interfaces",
          "Improving Visual Hierarchy, Spacing & Typography",
          "Designing Better UI with AI-Assisted Workflows"
        ]
      },
      {
        title: "Module 5 — Figma Basics",
        lessonsCount: "5 lessons • 1 hour 20 min",
        lessons: [
          "Getting Started with Figma",
          "Frames, Layers, Shapes & Essential Tools",
          "Typography, Colors, Grids & Spacing",
          "Auto Layout & Responsive Design Basics",
          "Components, Variants & Basic Prototyping"
        ]
      },
      {
        title: "Module 6 — Customized UI Design",
        lessonsCount: "5 lessons • 1 hour 15 min",
        lessons: [
          "Transforming AI Concepts into Custom Designs",
          "Customizing Colors, Typography & Visual Style",
          "Designing Custom Components & Interactions",
          "Creating Responsive Web & Mobile UI",
          "Polishing UI for a Professional Final Look"
        ]
      },
      {
        title: "Module 7 — Development-Ready UI with AI",
        lessonsCount: "4 lessons • 1 hour",
        lessons: [
          "Preparing Figma Designs for Development",
          "Building UI with Claude",
          "Building & Refining UI with Antigravity",
          "Using Codex to Turn Designs into Functional UI"
        ]
      }
    ]
  },
  'shopify-1-week-master-course': {
    slug: 'shopify-1-week-master-course',
    title: 'Shopify 1 Week Master Course',
    heroTagline: 'Build & Launch High-Converting E-Commerce Stores In 7 Days',
    categoryBadge: '🛍️ Shopify Masterclass',
    description: 'Learn how to build, design, customize, and launch a complete professional Shopify store from scratch in just 7 days.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    price: '₹2,999',
    students: '650+ Students',
    rating: '4.9 Rating (120+ Reviews)',
    duration: '8+ Hours HD Video',
    level: 'All Levels',
    whatYouWillLearn: [
      {
        title: "1. Build Your Shopify Store",
        description: "Learn how to create your Shopify store. Set up the basic store structure. Get everything ready for customization.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
          </svg>
        )
      },
      {
        title: "2. Design a Professional Store",
        description: "Choose and customize the right theme. Create a clean, modern store layout. Make your store mobile-friendly.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )
      },
      {
        title: "3. Add Products & Collections",
        description: "Add products with images, prices & details. Create variants and organize inventory. Build smart product collections.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        )
      },
      {
        title: "4. Setup Payments & Shipping",
        description: "Configure payment gateways securely. Set up shipping rates and delivery options. Understand taxes and checkout settings.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <rect x="2" y="5" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="2" y1="10" x2="22" y2="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      },
      {
        title: "5. Learn Shopify Marketing",
        description: "Learn basic Shopify SEO strategies. Connect Meta & Google marketing tools. Create offers to attract more customers.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      },
      {
        title: "6. Launch & Start Selling",
        description: "Test your complete store before launch. Optimize your store for better conversions. Launch confidently and start selling.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m-.12-8.54a6 6 0 00-7.38 5.84h4.8m2.58-5.84a14.926 14.926 0 00-2.58 5.84M15 9a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      }
    ],
    modules: [
      {
        title: "Module 1: Shopify Fundamentals & Store Setup",
        lessonsCount: "7 lessons • 50 min",
        lessons: [
          "Welcome to the Shopify 1 Week Master Course",
          "Understanding Shopify & E-Commerce",
          "Creating Your Shopify Account & Store",
          "Understanding Shopify Dashboard",
          "Store Settings & Basic Configuration",
          "Setting Up Store Currency, Time Zone & Preferences",
          "Module 1 Practical Exercise"
        ]
      },
      {
        title: "Module 2: Store Design & Theme Customization",
        lessonsCount: "8 lessons • 1 hour 15 min",
        lessons: [
          "Understanding Shopify Themes",
          "Choosing the Right Theme for Your Business",
          "Installing & Managing Themes",
          "Customizing Homepage Layout",
          "Sections, Blocks & Theme Settings",
          "Adding Banners, Images & Promotional Sections",
          "Mobile Responsive Store Design",
          "Module 2 Practical Exercise"
        ]
      },
      {
        title: "Module 3: Products, Collections & Inventory",
        lessonsCount: "8 lessons • 1 hour 10 min",
        lessons: [
          "Adding Your First Product",
          "Product Title, Description & Pricing",
          "Product Images & Media",
          "Creating Product Variants",
          "Managing Inventory & Stock",
          "Creating Collections",
          "Product Tags & Organization",
          "Module 3 Practical Exercise"
        ]
      },
      {
        title: "Module 4: Pages, Navigation & Store Content",
        lessonsCount: "7 lessons • 55 min",
        lessons: [
          "Creating Essential Store Pages",
          "About Us & Contact Us Pages",
          "Privacy Policy & Terms & Conditions",
          "Shipping & Refund Policies",
          "Creating Menus & Navigation",
          "Footer & Header Customization",
          "Building a Professional Store Structure"
        ]
      },
      {
        title: "Module 5: Payments, Shipping & Taxes",
        lessonsCount: "8 lessons • 1 hour 05 min",
        lessons: [
          "Understanding Shopify Checkout",
          "Setting Up Payment Methods",
          "Connecting Payment Gateway",
          "Understanding Cash on Delivery",
          "Configuring Shipping Rates",
          "Shipping Zones & Delivery Settings",
          "Understanding Taxes & GST",
          "Testing Checkout & Orders"
        ]
      },
      {
        title: "Module 6: Shopify Apps, SEO & Marketing",
        lessonsCount: "8 lessons • 1 hour 20 min",
        lessons: [
          "Understanding Shopify Apps",
          "Installing Essential Shopify Apps",
          "Shopify SEO Fundamentals",
          "Product SEO & Meta Titles",
          "Connecting Google & Meta",
          "Creating Promotional Offers & Discounts",
          "Email & Customer Marketing Basics",
          "Building a Basic Marketing Strategy"
        ]
      },
      {
        title: "Module 7: Store Launch, Sales & Growth",
        lessonsCount: "9 lessons • 1 hour 30 min",
        lessons: [
          "Complete Store Testing",
          "Mobile & Desktop Store Testing",
          "Testing Products & Checkout",
          "Understanding Shopify Analytics",
          "Tracking Orders & Customers",
          "Conversion Rate Optimization Basics",
          "Improving Product Pages for Sales",
          "Shopify Launch Checklist",
          "Final Project: Build & Launch a Complete Shopify Store"
        ]
      }
    ],
    faqs: [
      {
        question: "Do I need any prior Shopify or coding experience?",
        answer: "No prior experience is needed! This course covers everything from account setup and theme customization to payments, shipping, and marketing in 7 easy days."
      },
      {
        question: "Will I have a fully functioning Shopify store after 7 days?",
        answer: "Yes! By following the daily modules, you will build, customize, and launch a live, high-converting Shopify store ready to accept real payments."
      }
    ]
  },
  'graphic-design-in-7-days': {
    slug: 'graphic-design-in-7-days',
    title: 'Graphic Design in 7 Days — Learn, Create & Master AI',
    heroTagline: 'Learn. Create. Master AI.',
    categoryBadge: '🎨 Graphic Design & AI Masterclass',
    description: 'Master graphic design fundamentals, typography, branding, visual hierarchy, marketing visuals, and cutting-edge generative AI design workflows in just 7 days.',
    coverImage: '/images/graphic-design-in-7-days.jpg',
    price: '₹2,999',
    students: '1,500+ Students',
    rating: '5.0 Rating (Loved by creators, designers & marketing professionals)',
    duration: '7 Days • 10+ Hours HD Video',
    level: 'All Levels',
    trustedBy: ['Adobe', 'Midjourney', 'Figma', 'Canva', 'Google'],
    whatYouWillLearn: [
      {
        title: "1. Graphic Design Fundamentals",
        description: "Master the core principles of design: balance, contrast, alignment, repetition, proximity, visual hierarchy, and composition rules.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.006-.62l3.087-7.006A2.25 2.25 0 0112.983 5.4h.01a2.25 2.25 0 012.062 1.348l3.088 7.006m-9.155.62l9.155 0m-9.155 0L12.5 13.5" />
          </svg>
        )
      },
      {
        title: "2. Typography & Color Theory",
        description: "Learn font pairing, kerning, leading, typographic scale, color psychology, and how to create cohesive, emotion-driven color palettes.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.5" />
          </svg>
        )
      },
      {
        title: "3. Brand Identity & Logo Systems",
        description: "Design memorable logos, brand identity guidelines, style tiles, mockups, and complete visual assets for brands.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
          </svg>
        )
      },
      {
        title: "4. Social Media & Marketing Creatives",
        description: "Create scroll-stopping Instagram posts, carousel carousels, YouTube thumbnails, ad banners, and promotional campaign materials.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        )
      },
      {
        title: "5. Generative AI Tools & Prompt Engineering",
        description: "Harness Midjourney, ChatGPT/DALL-E, Adobe Firefly, and Stable Diffusion to generate photorealistic images, textures, patterns, and creative concepts 10x faster.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        )
      },
      {
        title: "6. Professional Portfolio & Freelance Career",
        description: "Package your 7-day projects into a stunning Behance/Dribbble portfolio, write proposals, price your design work, and land high-paying clients.",
        icon: (
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m-.12-8.54a6 6 0 00-7.38 5.84h4.8m2.58-5.84a14.926 14.926 0 00-2.58 5.84M15 9a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      }
    ],
    modules: [
      {
        title: "Day 1: Graphic Design Fundamentals & Composition Masterclass",
        lessonsCount: "6 Lessons · 1 hour 15 min",
        lessons: [
          "Welcome to Graphic Design in 7 Days",
          "The 7 Core Principles of Visual Design",
          "Mastering Visual Hierarchy & Negative Space",
          "Grid Systems & Alignment Rules",
          "Understanding File Formats (SVG, PNG, JPG, PDF)",
          "Day 1 Hands-on Composition Challenge"
        ]
      },
      {
        title: "Day 2: Typography, Hierarchy & Color Psychology",
        lessonsCount: "7 Lessons · 1 hour 25 min",
        lessons: [
          "Typography Basics: Serif, Sans-Serif & Display Fonts",
          "The Golden Rules of Font Pairing & Hierarchy",
          "Leading, Kerning & Tracking Best Practices",
          "Color Theory & Understanding Color Harmonies",
          "Psychology of Color in Branding & Marketing",
          "Building Cohesive Color Palettes",
          "Day 2 Typographic Poster Challenge"
        ]
      },
      {
        title: "Day 3: Brand Identity, Logo Design & Style Guides",
        lessonsCount: "8 Lessons · 1 hour 40 min",
        lessons: [
          "Introduction to Brand Identity Design",
          "Logo Styles: Wordmarks, Monograms, Badges & Emblems",
          "The Logo Design Process: Sketching to Vector",
          "Creating Brand Style Guides & Brand Kits",
          "Designing Business Cards & Stationery",
          "Real-World Mockup Presentation Techniques",
          "Exporting Brand Assets for Print and Digital",
          "Day 3 Brand Identity Capstone"
        ]
      },
      {
        title: "Day 4: High-Converting Social Media & Ad Creatives",
        lessonsCount: "8 Lessons · 1 hour 30 min",
        lessons: [
          "Anatomy of High-Converting Social Media Graphics",
          "Designing Multi-Slide Instagram Carousels",
          "Creating Click-Worthy YouTube Thumbnails",
          "Facebook & Google Display Ad Banners",
          "Motion Graphics & GIF Basics for Social Media",
          "Batch Creating Social Content with Templates",
          "Day 4 Social Media Campaign Challenge"
        ]
      },
      {
        title: "Day 5: Generative AI for Designers (Midjourney, ChatGPT & Firefly)",
        lessonsCount: "9 Lessons · 1 hour 45 min",
        lessons: [
          "The AI Design Revolution: Tools Overview",
          "Midjourney Prompt Engineering for Graphic Designers",
          "Style Modifiers, Lighting, Aspect Ratios & Parameters",
          "Using ChatGPT for Creative Direction & Copywriting",
          "Adobe Firefly Generative Fill & Expand Workflows",
          "Generating Vector Graphics & Icons with AI",
          "Combining AI Assets with Photoshop & Illustrator",
          "Day 5 AI-Powered Poster & Art Creation"
        ]
      },
      {
        title: "Day 6: Advanced AI Workflows, Inpainting & Photo Editing",
        lessonsCount: "7 Lessons · 1 hour 20 min",
        lessons: [
          "Image Upscaling & Quality Enhancement with AI",
          "Background Removal & Clean Cutout Techniques",
          "AI Inpainting & Object Replacement",
          "Creating AI-Generated Textures & Patterns",
          "Consistent Character & Style Generation in Midjourney",
          "Ethical Guidelines & Copyright with AI Art",
          "Day 6 Commercial Campaign Production"
        ]
      },
      {
        title: "Day 7: Portfolio Showcase, Pricing & Landing Design Clients",
        lessonsCount: "8 Lessons · 1 hour 30 min",
        lessons: [
          "Assembling a Standout Design Portfolio",
          "Case Study Writing for Behance & Dribbble",
          "How to Price Graphic Design & AI Services",
          "Writing Winning Freelance Proposals & Contracts",
          "Finding High-Paying Clients (Upwork, LinkedIn, Cold Outreach)",
          "Client Communication & Revision Handling",
          "Final Certification Project & Review",
          "Next Steps for Your Design Career"
        ]
      }
    ],
    outcomes: [
      "Master the fundamental principles of graphic design",
      "Confidently choose typography, hierarchy, and color palettes",
      "Design complete brand identity kits and logos",
      "Create high-converting social media creatives and ad banners",
      "Supercharge your workflow with Midjourney, ChatGPT, and Adobe Firefly",
      "Upscale, enhance, and edit AI-generated graphics professionally",
      "Build a showstopping portfolio of 7 real-world projects",
      "Learn freelance pricing, proposal writing, and client acquisition"
    ],
    faqs: [
      {
        question: "Do I need prior graphic design experience or drawing skills?",
        answer: "No prior experience or drawing skills are needed! This course is designed from scratch to guide complete beginners to professional-level proficiency in just 7 days."
      },
      {
        question: "Which AI tools will be taught in this course?",
        answer: "You will master Midjourney, ChatGPT/DALL-E, Adobe Firefly, and specialized AI upscaling and enhancement tools integrated into standard design workflows."
      },
      {
        question: "Will I receive a verified certificate upon completion?",
        answer: "Yes! Once you finish all 7 daily modules and complete the capstone projects, you will receive a verifiable Certificate of Completion."
      }
    ]
  },
  'web-design-2-weeks-mastery-course': {
    get slug() { return COURSE_DATA['graphic-design-in-7-days'].slug; }
  },
  'web-design-mastery-course': {
    get slug() { return COURSE_DATA['graphic-design-in-7-days'].slug; }
  },
  'the-ultimate-figma-masterclass': {
    slug: 'the-ultimate-figma-masterclass',
    title: 'The Ultimate Figma Masterclass 2.0',
    heroTagline: 'Master Figma 2.0 & Design Systems Like A Pro',
    categoryBadge: '⚡ Figma Masterclass',
    description: 'Learn advanced Figma workflows, Auto-Layout 5.0, variables, design tokens, interactive prototyping, building component libraries, and developer handoff.',
    coverImage: 'https://cdn.prod.website-files.com/65c0868c26990d4c1ce3b302/6859ea31e0fe32b922f07293_Course%20Cover_The%20Ultimate%20Figma%20Masterclass%20Course%202.0%20-%20Study%201%20(1)%20(1)%20(1)%201.jpg',
    price: '₹2,999',
    students: '8,500+ Students',
    rating: '4.9 Rating (500+ Reviews)',
    duration: '10+ Hours HD Video',
    level: 'Intermediate',
    whatYouWillLearn: [
      {
        title: "Mastering Figma Auto-Layout 5.0",
        description: "Master responsive constraints, flexbox-like wrap layouts, auto-layout 5.0, and nested frames with confidence.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      },
      {
        title: "Variables & Design Tokens",
        description: "Learn light/dark mode variables, primitive & semantic tokens, string/boolean modes, and design token management.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 12L2 9l4-6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3l-4 6 5 12 5-12-4-6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20" />
          </svg>
        )
      },
      {
        title: "Advanced Interactive Prototyping",
        description: "Smart-animate, component variant states, variable logic state machines, and micro-interactions for realistic user testing.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )
      },
      {
        title: "Building Enterprise Design Systems",
        description: "Create scalable component libraries, component properties, variant sets, and accessibility standards.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 9h16M4 15h16M9 4v16M15 4v16" />
          </svg>
        )
      },
      {
        title: "Design-to-Code Handoff & Branching",
        description: "Token export, developer inspection, redlining specs, component documentation, and Git/Figma branching strategies.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m-.12-8.54a6 6 0 00-7.38 5.84h4.8m2.58-5.84a14.926 14.926 0 00-2.58 5.84" />
          </svg>
        )
      },
      {
        title: "Real-World Portfolio Capstone Project",
        description: "Complete a full SaaS application UI kit from scratch to showcase in your designer portfolio.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
          </svg>
        )
      }
    ],
    modules: [
      {
        title: "Module 1: Figma Essentials & Workspace Setup",
        lessonsCount: "6 lessons • 45 min",
        lessons: [
          "Welcome to the Ultimate Figma Masterclass",
          "Understanding Figma Interface & Canvas Shortcuts",
          "Mastering Frames vs Groups & Vector Networks",
          "Color Styles, Gradients & Typography Libraries",
          "Grid Systems & Responsive Layout Grids",
          "Module 1 Practical Exercise & Quiz"
        ]
      },
      {
        title: "Module 2: Auto-Layout 5.0 Deep-Dive & Responsive Layouts",
        lessonsCount: "8 lessons • 1 hour 20 min",
        lessons: [
          "Auto-Layout 5.0 Fundamentals: Direction & Spacing",
          "Fixed vs Hug Content vs Fill Container Demystified",
          "Wrap Layouts & Min/Max Width Constraints",
          "Absolute Positioning Inside Auto-Layout Frames",
          "Building Complex Responsive Navigation Bars",
          "Building Responsive Card Grids & Lists",
          "Auto-Layout Keyboard Shortcuts & Workflow Speed",
          "Module 2 Project Challenge"
        ]
      },
      {
        title: "Module 3: Component Libraries & Variant Properties",
        lessonsCount: "10 lessons • 1 hour 45 min",
        lessons: [
          "Main Components vs Instances Architecture",
          "Creating Component Sets & Variant States",
          "Boolean, Text & Instance Swap Properties",
          "Exposing Nested Instance Properties",
          "Mastering Button Component Sets (Primary, Secondary, Icon)",
          "Building Form Input Fields & Validation States",
          "Modal Dialogs & Dropdown Menu Component Architecture",
          "Icon Libraries & SVGs Management Best Practices",
          "Component Documentation & Usage Guidelines",
          "Module 3 Design System Challenge"
        ]
      },
      {
        title: "Module 4: Variables, Design Tokens & Dark Mode",
        lessonsCount: "7 lessons • 1 hour 15 min",
        lessons: [
          "Introduction to Figma Variables & Tokens",
          "Color Variables: Primitives vs Semantic Tokens",
          "Creating Light Mode & Dark Mode Modes",
          "Number Variables: Spacing, Radii & Typography Tokens",
          "Boolean Variables & Component Mode Switching",
          "Variable Aliasing & Multi-Brand Token Systems",
          "Exporting Tokens for Developers (JSON & CSS)"
        ]
      },
      {
        title: "Module 5: Interactive Prototyping & Smart Animate",
        lessonsCount: "9 lessons • 1 hour 30 min",
        lessons: [
          "Trigger Types: On Click, While Hovering, Drag & Key Press",
          "Smart Animate Physics & Easing Curves",
          "Interactive Components: Hover States & Toggle Switches",
          "Variable-Driven Prototypes: Dynamic Counters & Forms",
          "Nested Screen Flow Navigation & Overlay Positioning",
          "Creating Mobile App Gestures & Slide Drawers",
          "Micro-Interactions & Lottie Animation Integration",
          "User Testing & Presenting Interactive Prototypes",
          "Module 5 Prototyping Challenge"
        ]
      },
      {
        title: "Module 6: Building Enterprise Design Systems",
        lessonsCount: "12 lessons • 2 hours 10 min",
        lessons: [
          "Design System Foundations & Token Architecture",
          "Building Foundational Tokens: Color, Type, Elevation",
          "Base Components: Buttons, Inputs, Badges, Avatars",
          "Composite Components: Tables, Cards, Header Navbars",
          "Page Templates & Dashboard Layout Screens",
          "Multi-Platform Components (Desktop, Tablet, Mobile)",
          "System Maintenance & Component Versioning",
          "Module 6 Capstone Design System"
        ]
      }
    ],
    faqs: [
      {
        question: "Do I need prior Figma experience before taking this course?",
        answer: "No prior experience is required! We start from fundamental concepts and rapidly build up to advanced topics like Auto-Layout 5.0, variables, design tokens, and building enterprise design systems."
      },
      {
        question: "How long do I get access to the course content?",
        answer: "You get lifetime access to all video lessons, project files, exercises, community forums, and future course updates!"
      },
      {
        question: "Is there a 30-day money-back guarantee?",
        answer: "Yes! If you're not completely satisfied with the masterclass within 30 days of purchase, send us an email for a 100% full refund—no questions asked."
      },
      {
        question: "Do I get a certificate of completion?",
        answer: "Yes! Upon finishing all course modules and exercises, you will receive an official verifiable Designership certificate of completion to add to your LinkedIn and portfolio."
      }
    ]
  },
  'ai-designer-graphic-designing': {
    slug: 'ai-designer-graphic-designing',
    title: 'AI Designer and Graphic Designing Course',
    heroTagline: 'Master AI Design Tools, Prompt Engineering & Visual Branding',
    categoryBadge: '🤖 AI & Graphic Design',
    description: 'Master Adobe Photoshop, Illustrator, Affinity, and AI Design Tools through live practical training, real-world projects, portfolio development.',
    coverImage: 'https://cdn.prod.website-files.com/65c1ae21fb2191466dd6ce72/661f382c9213e7e0719aefb1_Major%20Updates%20Designership_Cover.jpg',
    price: '₹2,999',
    students: '1,500+ Students',
    rating: '4.9 Rating (240+ Reviews)',
    duration: '12+ Hours HD Video',
    level: 'All Levels',
    whatYouWillLearn: [
      {
        title: "AI Image Generation Masterclass",
        description: "Master Midjourney v6, DALL-E 3, and Stable Diffusion to generate photorealistic imagery and artwork in seconds.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <rect x="3" y="11" width="18" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="5" r="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v4M8 15h.01M16 15h.01" />
          </svg>
        )
      },
      {
        title: "Prompt Engineering Frameworks",
        description: "Learn precise parameter controls, aspect ratios, style references (--sref), lighting, camera angles, and art styles.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1" />
          </svg>
        )
      },
      {
        title: "Photoshop AI & Generative Fill Workflows",
        description: "Combine AI generation with Adobe Photoshop Firefly, Generative Expand, object removal, and retouching.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )
      },
      {
        title: "Graphic Design Fundamentals & Typography",
        description: "Master grid composition, visual hierarchy, color psychology, pairing fonts, and layout rules.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 9h16M4 15h16M9 4v16M15 4v16" />
          </svg>
        )
      },
      {
        title: "Brand Identity & Logo Design Systems",
        description: "Build complete brand guidelines, logo variants, brand collateral, and AI-driven mockup presentations.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 12L2 9l4-6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3l-4 6 5 12 5-12-4-6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20" />
          </svg>
        )
      },
      {
        title: "Marketing Graphics & AI Asset Creation",
        description: "Create high-converting social media templates, ad banners, 3D assets, and marketing graphics at scale.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m-.12-8.54a6 6 0 00-7.38 5.84h4.8m2.58-5.84a14.926 14.926 0 00-2.58 5.84" />
          </svg>
        )
      }
    ],
    modules: [
      {
        title: "Module 1 — Design Fundamentals & Theory",
        lessonsCount: "8 lessons • 1 hour",
        lessons: [
          "Design principles & elements",
          "Balance, alignment, contrast, hierarchy",
          "Typography fundamentals",
          "Color theory & psychology",
          "Composition & visual hierarchy",
          "Grids, spacing & proportions",
          "Visual communication",
          "Design mistakes to avoid"
        ]
      },
      {
        title: "Module 2 — Typography",
        lessonsCount: "7 lessons • 55 min",
        lessons: [
          "Font families & classifications",
          "Serif vs Sans Serif",
          "Font pairing",
          "Typography hierarchy",
          "Letter spacing & line height",
          "Fonts for branding, social media & advertising",
          "Creating professional type layouts"
        ]
      },
      {
        title: "Module 3 — Color Theory",
        lessonsCount: "8 lessons • 1 hour",
        lessons: [
          "RGB, CMYK, HEX",
          "Primary, secondary & tertiary colors",
          "Color harmony",
          "Complementary & analogous colors",
          "Color psychology",
          "Creating color palettes",
          "Brand color systems",
          "Dark & light theme design"
        ]
      },
      {
        title: "Module 4 — Adobe Photoshop",
        lessonsCount: "10 lessons • 1 hour 30 min",
        lessons: [
          "Photoshop interface & workspace",
          "Layers & layer management",
          "Selection tools",
          "Masks",
          "Smart Objects",
          "Pen Tool",
          "Lighting & color correction",
          "Blending modes",
          "Effects & compositing",
          "Professional poster design"
        ]
      },
      {
        title: "Module 5 — Adobe Illustrator",
        lessonsCount: "10 lessons • 1 hour 25 min",
        lessons: [
          "Vector graphics fundamentals",
          "Shapes & Pathfinder",
          "Pen Tool",
          "Typography & text effects",
          "Logo creation",
          "Icon design",
          "Illustrations",
          "Patterns",
          "Vector tracing",
          "Print-ready artwork"
        ]
      },
      {
        title: "Module 6 — Canva Professional Design",
        lessonsCount: "9 lessons • 1 hour 15 min",
        lessons: [
          "Canva interface",
          "Templates vs custom designs",
          "Brand Kit",
          "Social media designs",
          "Presentations",
          "Marketing creatives",
          "Reels & story designs",
          "Canva AI features",
          "Professional workflow"
        ]
      },
      {
        title: "Module 7 — Branding & Visual Identity",
        lessonsCount: "11 lessons • 1 hour 40 min",
        lessons: [
          "Brand strategy basics",
          "Logo design process",
          "Logo variations",
          "Typography system",
          "Color system",
          "Brand guidelines",
          "Business cards",
          "Letterheads",
          "Social media branding",
          "Packaging basics",
          "Complete brand identity project"
        ]
      },
      {
        title: "Module 8 — Social Media Design",
        lessonsCount: "8 lessons • 1 hour 10 min",
        lessons: [
          "Instagram post design",
          "Instagram carousel",
          "Reel thumbnails",
          "Story creatives",
          "Facebook creatives",
          "LinkedIn creatives",
          "YouTube thumbnails",
          "Ad creatives"
        ]
      },
      {
        title: "Module 9 — AI Prompt Engineering for Designers",
        lessonsCount: "10 lessons • 1 hour 30 min",
        lessons: [
          "Prompt fundamentals",
          "Subject + action + environment",
          "Style prompts",
          "Lighting prompts",
          "Camera & composition prompts",
          "Negative prompts",
          "Reference-image prompting",
          "Consistent character prompting",
          "Product photography prompts",
          "Commercial advertising prompts"
        ]
      },
      {
        title: "Module 10 — AI for Social Media Content",
        lessonsCount: "12 lessons • 1 hour 45 min",
        lessons: [
          "AI post concepts",
          "Reel thumbnail generation",
          "Carousel concepts",
          "Ad creative variations",
          "Social media backgrounds",
          "Character/avatar-based content",
          "News/social media creatives",
          "Batch content creation",
          "AI + Canva workflow",
          "AI video generation basics",
          "Image-to-video",
          "Text-to-video"
        ]
      },
      {
        title: "Module 11 — Freelancing & Client Acquisition",
        lessonsCount: "4 lessons • 45 min",
        lessons: [
          "Pricing your design services & invoice templates",
          "Behance & Dribbble portfolio optimization",
          "Client communication, briefs & feedback management",
          "Upwork, Fiverr & direct client outreach playbooks"
        ]
      },
      {
        title: "Module 12 — Portfolio Capstone & Placement Support",
        lessonsCount: "4 lessons • 50 min",
        lessons: [
          "Structuring 12+ real-world portfolio case studies",
          "Personal branding & resume optimization for designers",
          "Mock design interviews & technical test prep",
          "Direct agency placement support & job portal access"
        ]
      }
    ],
    faqs: [
      {
        question: "Do I need subscription access to Midjourney or Photoshop?",
        answer: "We cover free and open-source tools (like Stable Diffusion and DALL-E) as well as Midjourney and Adobe Firefly. We provide step-by-step setup guides for all tools."
      },
      {
        question: "Can I use AI-generated graphics for commercial client work?",
        answer: "Yes! You will learn how to refine, vectorize, and format AI-generated assets into copyright-compliant, high-resolution commercial graphic deliverables."
      },
      {
        question: "Is this course beginner-friendly?",
        answer: "Absolutely! We cover both zero-code AI prompt engineering and foundational graphic design principles step by step."
      }
    ]
  },
  'ux-ui-design-course': {
    slug: 'ux-ui-design-course',
    title: 'UX/UI Design Course',
    heroTagline: 'Master End-to-End User Experience & Visual Product Design',
    categoryBadge: '🎨 UX/UI Design',
    description: 'Master the complete product design lifecycle: user research, personas, wireframing, high-fidelity UI visual design, interactive usability testing, and client handoff.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    price: '₹2,999',
    students: '800+ Students',
    rating: '4.9 Rating (180+ Reviews)',
    duration: '14+ Hours HD Video',
    level: 'Intermediate',
    whatYouWillLearn: [
      {
        title: "User Research & Empathy Mapping",
        description: "Conduct user interviews, analyze qualitative/quantitative data, and create actionable user personas.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )
      },
      {
        title: "Information Architecture & User Flows",
        description: "Map complex app navigation, sitemaps, decision trees, and seamless user interaction journeys.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        )
      },
      {
        title: "Wireframing & Low-Fidelity Prototyping",
        description: "Rapidly translate research insights into wireframes to test layout concepts before high-fidelity visual design.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        )
      },
      {
        title: "High-Fidelity UI Visual Design Systems",
        description: "Master modern typography scale, visual contrast, spacing systems, iconography, and UI design patterns.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )
      },
      {
        title: "Usability Testing & Iterative Design",
        description: "Run unmoderated & moderated user tests, measure task completion rates, and iterate based on real feedback.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      },
      {
        title: "Client Case Study & Handoff Strategy",
        description: "Format a complete end-to-end UX/UI case study for your portfolio and hand off pixel-perfect specs to developers.",
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
          </svg>
        )
      }
    ],
    modules: [
      {
        title: "Module 1: Foundations of User Experience (UX)",
        lessonsCount: "6 lessons • 1 hour",
        lessons: [
          "Understanding UX vs UI Design Principles",
          "The Double Diamond Design Thinking Framework",
          "Planning User Research & Interview Protocols",
          "Creating Empathy Maps & User Personas",
          "Module 1 Research Challenge"
        ]
      },
      {
        title: "Module 2: Information Architecture & Wireframing",
        lessonsCount: "7 lessons • 1 hour 25 min",
        lessons: [
          "Card Sorting & Sitemaps Architecture",
          "Creating User Task Flows & User Journeys",
          "Sketching Low-Fidelity Wireframes",
          "Digital Wireframing Best Practices",
          "Interactive Wireframe Testing",
          "Module 2 Wireframing Exercise"
        ]
      },
      {
        title: "Module 3: UI Visual Design & Interface Design Systems",
        lessonsCount: "9 lessons • 2 hours",
        lessons: [
          "Visual Hierarchy, Contrast & Focal Points",
          "Typography Scales & Reading Patterns (F-Pattern, Z-Pattern)",
          "8pt Spacing Grid Systems & Container Math",
          "Color Psychology & Accessible Color Contrast (WCAG)",
          "Iconography, Imagery & Micro-Graphics",
          "Designing Mobile App UI vs Desktop SaaS Web App UI",
          "Module 3 UI Design Challenge"
        ]
      },
      {
        title: "Module 4: Usability Testing & Iterative Refinement",
        lessonsCount: "5 lessons • 55 min",
        lessons: [
          "Setting Up Usability Testing Scripts & Tasks",
          "Conducting Moderated User Testing Sessions",
          "Analyzing Usability Test Metrics & System Usability Scale (SUS)",
          "Iterating Wireframes & UI Based on User Feedback",
          "Module 4 Testing Challenge"
        ]
      },
      {
        title: "Module 5: Portfolio Presentation & Developer Handoff",
        lessonsCount: "5 lessons • 1 hour 10 min",
        lessons: [
          "Structuring a Winning UX/UI Case Study",
          "Writing Problem Statements & Impact Metrics",
          "Exporting Specifications & Design Specs for Developers",
          "Presenting Design Work to Clients & Hiring Managers"
        ]
      }
    ],
    faqs: [
      {
        question: "Is this UX/UI course focused on mobile apps or web design?",
        answer: "Both! You will build responsive web application interfaces as well as mobile iOS/Android app UI designs."
      },
      {
        question: "Will I have a complete portfolio case study by the end of the course?",
        answer: "Yes! You will complete a real-world end-to-end product design project that includes user research, wireframes, high-fidelity screens, and usability test results."
      }
    ]
  }
};

function getCourseData(rawSlug) {
  if (rawSlug && COURSE_DATA[rawSlug]) {
    return COURSE_DATA[rawSlug];
  }
  if (!rawSlug && COURSE_DATA['ui-design-masterclass']) {
    return COURSE_DATA['ui-design-masterclass'];
  }
  
  // Format slug into clean human-readable title
  const formattedTitle = rawSlug
    ? rawSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Ultimate Design Masterclass';

  return {
    slug: rawSlug || 'custom-course',
    title: formattedTitle,
    heroTagline: `Master ${formattedTitle} Like A Pro`,
    categoryBadge: `🎓 ${formattedTitle}`,
    description: `Learn highly demanded skills through practical online lessons in ${formattedTitle}, created by trusted industry professionals.`,
    coverImage: 'https://cdn.prod.website-files.com/65c0868c26990d4c1ce3b302/6859ea31e0fe32b922f07293_Course%20Cover_The%20Ultimate%20Figma%20Masterclass%20Course%202.0%20-%20Study%201%20(1)%20(1)%20(1)%201.jpg',
    price: '₹2,999',
    students: '1,200+ Students',
    rating: '4.9 Rating (300+ Reviews)',
    duration: '10+ Hours HD Video',
    level: 'Intermediate',
    whatYouWillLearn: [
      {
        title: `${formattedTitle} Fundamentals`,
        description: `Master the core foundations and essential tools in ${formattedTitle}.`,
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      },
      {
        title: "Advanced Workflows & Best Practices",
        description: `Learn industry-standard workflows and techniques for real-world projects.`,
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 12L2 9l4-6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3l-4 6 5 12 5-12-4-6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20" />
          </svg>
        )
      },
      {
        title: "Interactive Exercises & Real-World Projects",
        description: `Build practical hands-on projects to solidify your understanding.`,
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )
      },
      {
        title: "Scalable Systems & Production Architecture",
        description: `Structure your files, assets, and components for scale.`,
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 9h16M4 15h16M9 4v16M15 4v16" />
          </svg>
        )
      },
      {
        title: "Client Handoff & Collaboration",
        description: `Learn how to present your work and collaborate with team members.`,
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m-.12-8.54a6 6 0 00-7.38 5.84h4.8m2.58-5.84a14.926 14.926 0 00-2.58 5.84" />
          </svg>
        )
      },
      {
        title: "Portfolio Capstone Project",
        description: `Complete a real-world portfolio capstone project from scratch.`,
        icon: (
          <svg className="w-6 h-6 text-[#6400e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
          </svg>
        )
      }
    ],
    modules: [
      {
        title: `Module 1: ${formattedTitle} Introduction & Setup`,
        lessonsCount: "5 lessons • 45 min",
        lessons: [
          `Welcome to ${formattedTitle}`,
          "Interface Navigation & Workspace Shortcuts",
          "Core Tools & Setup Guide",
          "Practical Exercises & Fundamentals"
        ]
      },
      {
        title: `Module 2: Advanced Techniques in ${formattedTitle}`,
        lessonsCount: "6 lessons • 1 hour 15 min",
        lessons: [
          "Deep Dive into Advanced Workflows",
          "Speeding Up Your Design Process",
          "Building Systems & Libraries",
          "Module 2 Challenge"
        ]
      },
      {
        title: `Module 3: Portfolio Capstone Project`,
        lessonsCount: "4 lessons • 1 hour",
        lessons: [
          "Capstone Brief & Requirements",
          "Designing & Building Your Capstone",
          "Presenting Your Final Project"
        ]
      }
    ],
    faqs: [
      {
        question: `Do I need prior experience before taking ${formattedTitle}?`,
        answer: "No prior experience is required! We start from fundamental concepts and build up to advanced production workflows."
      },
      {
        question: "How long do I get access to the course content?",
        answer: "You get lifetime access to all video lessons, exercise files, and future updates!"
      }
    ]
  };
}

export default function FigmaMasterclassPage() {
  const { courseSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openModule, setOpenModule] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('online');

  // Extract slug from URL path if not present in params
  let currentSlug = courseSlug;
  if (!currentSlug && location.pathname.includes('/courses/')) {
    currentSlug = location.pathname.split('/courses/')[1];
  }

  const course = getCourseData(currentSlug);

  // Auto-open modal if redirected with ?enroll=open
  useEffect(() => {
    if (searchParams.get('enroll') === 'open') {
      const mode = searchParams.get('mode') || 'online';
      setModalMode(mode);
      setIsModalOpen(true);
    }
  }, [searchParams]);

  // Scroll to top when page mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSlug]);

  const handleOpenEnroll = (mode = 'online') => {
    setModalMode(mode);
    if (!isAuthenticated()) {
      savePendingEnrollment({
        courseSlug: course.slug,
        courseTitle: course.title,
        classMode: mode,
        amount: mode === 'offline' ? 4999 : 2999,
      });
      navigate(`/signup?redirect=enroll&course=${course.slug}&mode=${mode}`);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#18181b] font-sans">
      
      {/* Hero Section (BLACK THEME) */}
      <section className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#13151f] via-[#0c0e15] to-[#0c0e15] text-white">
        <div className="absolute top-10 left-1/4 w-[500px] h-[300px] bg-[#6400e6]/20 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Copy Container */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6400e6]/20 border border-[#6400e6]/40 text-[#9a7cff] text-xs font-semibold">
                <span>⚡</span>
                <span>{course.categoryBadge}</span>
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.08]">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-xl font-normal">
                {course.description}
              </p>

              {/* Loved by 578+ Students Badge Pill */}
              <div className="p-3 px-4 rounded-2xl bg-[#181b2a]/90 border border-white/10 backdrop-blur-md inline-flex items-center gap-3.5 shadow-xl hover:border-white/20 transition-all">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181b2a] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181b2a] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Student" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181b2a] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181b2a] object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Student" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181b2a] object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Student" />
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-amber-400 ml-1">5.0</span>
                  </div>
                  <span className="text-xs text-[#a1a1aa] font-medium block mt-0.5">Loved by 578+ students</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => handleOpenEnroll('online')}
                  className="px-7 py-3.5 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-sm transition-all shadow-lg shadow-[#0bc40e]/30 cursor-pointer"
                >
                  Enroll now for {course.price}
                </button>
                <a
                  href="#curriculum"
                  className="px-7 py-3.5 rounded-xl bg-[#181a24] hover:bg-[#232736] border border-white/15 text-white font-semibold text-sm transition-all"
                >
                  View curriculum
                </a>
              </div>

              {/* Course Features Badges */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                {/* Badge 1: Certificate */}
                <div className="inline-flex items-center gap-3 py-2 pl-2.5 pr-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-xl bg-[#0bc40e]/15 border border-[#0bc40e]/30 text-[#0bc40e] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white tracking-wide block">
                      Course Completion Certificate
                    </span>
                    <span className="text-[11px] text-[#9ca3af] block">
                      Official verifiable certificate included
                    </span>
                  </div>
                </div>

                {/* Badge 2: Online & Offline */}
                <div className="inline-flex items-center gap-3 py-2 pl-2.5 pr-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white tracking-wide block">
                      Online and Offline
                    </span>
                    <span className="text-[11px] text-[#9ca3af] block">
                      Live interactive & classroom modes
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Floating White Registration Card matching screenshot */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xl space-y-5">
                
                {/* Heading & Subtitle */}
                <div className="text-center space-y-1.5">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Start learning today!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Maximize Figma's features and apply it in your design workflow end-to-end.
                  </p>
                </div>

                {/* Inclusion Grid */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Inclusion
                  </span>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs sm:text-sm text-slate-800 font-medium">
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6400e6] flex items-center justify-center shrink-0 border border-purple-100/60">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="truncate">{course.duration ? course.duration : '20+ hours of content'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/60">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
                        </svg>
                      </div>
                      <span className="truncate">Certificate of Completion</span>
                    </div>
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <span className="truncate">{course.slug === 'graphic-design-in-7-days' ? '53+ lessons' : (course.slug === 'shopify-1-week-master-course' ? '54+ lessons' : (course.slug === 'ui-design-masterclass' ? '80+ lessons' : '110+ lessons'))}</span>
                    </div>
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100/60">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </div>
                      <span className="truncate">Subtitles: English</span>
                    </div>
                    <div className="flex items-center gap-2.5 truncate col-span-2">
                      <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-100/60">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <span className="truncate">10+ file resources</span>
                    </div>
                  </div>
                </div>

                {/* Lead Form */}
                <form onSubmit={(e) => e.preventDefault()} className="space-y-3 pt-1">
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6400e6] focus:ring-1 focus:ring-[#6400e6]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6400e6] focus:ring-1 focus:ring-[#6400e6]"
                  />

                  <p className="text-[11px] text-slate-400 text-center font-normal pt-0.5">
                    By registering here, I agree to <a href="#" className="underline hover:text-slate-600">Terms & Conditions</a>
                  </p>

                  <button
                    type="submit"
                    className="w-full bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-bold text-sm py-3.5 rounded-xl shadow-md shadow-[#0bc40e]/20 transition-all block text-center"
                  >
                    Submit
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Career-First Edge / Key Points Grid (LIGHT THEME) */}
      <section className="py-24 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#09090b] tracking-tight">
              {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 ? '6 Key Points' : 'The career-first edge that sets us apart'}
            </h2>
            <p className="text-base text-slate-600">
              {course.whatYouWillLearn && course.whatYouWillLearn.length > 0
                ? (course.description || 'Master everything you need to build, design, customize, and launch modern professional websites.')
                : "We've built 10,000+ careers because our system is engineered around outcomes — not lectures."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(course.whatYouWillLearn && course.whatYouWillLearn.length > 0 ? course.whatYouWillLearn : [
              {
                title: "Hands-On Studio Practice",
                description: "Daily design exercises in our equipped design lab — not just theory.",
                icon: (
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                )
              },
              {
                title: "Portfolio Building",
                description: "Create a portfolio of 12+ live design projects to showcase to employers.",
                icon: (
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Industry Mentors",
                description: "Learn from senior designers working at top design studios.",
                icon: (
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Freelancing Skills",
                description: "Behance, Dribbble & Fiverr playbooks to start earning while you learn.",
                icon: (
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18" />
                  </svg>
                )
              },
              {
                title: "Placement Support",
                description: "Direct placement assistance with design studios, agencies and brands.",
                icon: (
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 9l6 6m0 0l-6 6m6-6H4" />
                  </svg>
                )
              },
              {
                title: "Lifetime Access",
                description: "Lifetime LMS access, free updates and unlimited backup classes.",
                icon: (
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.178 8c5.096 0 5.096 8 0 8-3.045 0-4.605-2.023-6.178-4-1.573 1.977-3.133 4-6.178 4-5.096 0-5.096-8 0-8 3.045 0 4.605 2.023 6.178 4 1.573-1.977 3.133-4 6.178-4z" />
                  </svg>
                )
              }
            ]).map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[24px] bg-slate-50/60 border border-slate-200/80 hover:border-purple-300 hover:bg-white transition-all space-y-4 text-left flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6400e6] flex items-center justify-center shrink-0 text-xl font-bold">
                  {typeof item.icon === 'string' ? item.icon : item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#09090b] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Course Curriculum Accordion (LIGHT THEME) */}
      <section id="curriculum" className="py-24 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#09090b] tracking-tight">
              {(course.modules && course.modules.length > 0) ? `${course.modules.length}-module industry-aligned syllabus` : 'Industry-aligned syllabus'}
            </h2>
            <p className="text-base text-slate-600">
              {course.curriculumSubtitle || (course.slug === 'ui-design-masterclass'
                ? 'Designed for AI-first UI workflows. Learn Google Stitch, master Figma, customize interfaces, and turn your designs into development-ready products.'
                : 'Designed in partnership with hiring managers. Continuously updated for AI-first workflows.')}
            </p>
          </div>

          <div className="space-y-4">
            {(course.modules || []).map((mod, idx) => {
              const iconData = MODULE_ICONS[idx % MODULE_ICONS.length];
              const isOpen = openModule === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-2xs hover:border-slate-300 transition-all"
                >
                  <button
                    onClick={() => setOpenModule(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      {/* Module Topic Icon Container */}
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 border shadow-2xs transition-transform group-hover:scale-105 ${iconData.bg}`}>
                        {iconData.icon}
                      </div>

                      <div className="space-y-0.5 sm:space-y-1 min-w-0">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#0bc40e] transition-colors">
                          {mod.title}
                        </h3>
                        <span className="text-xs text-slate-500 block font-medium">
                          {mod.lessonsCount}
                        </span>
                      </div>
                    </div>

                    <span className={`text-xl font-bold shrink-0 ml-2 transition-colors ${isOpen ? 'text-[#0bc40e]' : 'text-slate-400 group-hover:text-[#0bc40e]'}`}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-100 space-y-2.5 bg-slate-50/40 animate-in fade-in duration-200">
                      {(mod.lessons || []).map((lesson, lIdx) => (
                        <div key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 py-0.5">
                          <span className="text-[#0bc40e] font-bold leading-relaxed shrink-0">•</span>
                          <span className="leading-relaxed font-normal">{lesson}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Course Outcome Section */}
      {course.outcomes && course.outcomes.length > 0 && (
        <section className="py-20 border-b border-slate-100 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs font-semibold text-[#6400e6] uppercase tracking-wider bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200">
                Transformational Skills
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#09090b] tracking-tight">
                Course Outcome
              </h2>
              <p className="text-base text-slate-600">
                By the end of this masterclass, you will be able to:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.outcomes.map((outcome, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-3.5 hover:border-purple-300 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-[#6400e6]/10 text-[#6400e6] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-slate-800 leading-snug">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing / Enrollment Section (LIGHT THEME) */}
      <section id="pricing" className="py-24 border-b border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          <div className="flex flex-col items-center gap-4 text-center pb-2">
            <span className="inline-block text-xs font-semibold text-[#6400e6] uppercase tracking-wider bg-purple-100 px-4 py-1.5 rounded-full border border-purple-200 shadow-2xs">
              Instant Lifetime Access
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#09090b] tracking-tight leading-tight max-w-3xl mx-auto pt-1">
              {course.slug === 'ui-design-masterclass'
                ? 'Ready to Become a Next-Gen UI Designer?'
                : course.slug === 'graphic-design-in-7-days'
                ? 'Ready to Become a Professional Graphic Designer?'
                : course.slug === 'shopify-1-week-master-course'
                ? 'Ready to Master Shopify in 7 Days?'
                : 'Ready to Become a Next-Gen UI Designer?'}
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto">
              Join thousands of designers building real-world skills and advancing their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Online Pricing Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-left flex flex-col justify-between hover:border-purple-300 transition-all">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
                      <LaptopVideoIcon className="w-3.5 h-3.5" />
                      Online
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
                    <span className="text-xs text-slate-500">Full Course Pass</span>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-3xl font-extrabold text-slate-900">₹2,999</div>
                    <span className="inline-block mt-1.5 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      One Time Payment
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-sm text-slate-700 border-t border-slate-100">
                  {(course.pricingPoints || [
                    "Learn Figma with Real-World Projects",
                    "Design Modern & Conversion-Focused Interfaces",
                    "Use AI to Design Faster & Smarter",
                    "Build Portfolio-Ready UI Projects",
                    "Certificate of Course Completion"
                  ]).map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2.5">
                      <span className="text-emerald-600 font-bold">✓</span> {point}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenEnroll('online')}
                className="w-full py-3.5 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-sm transition-all shadow-md text-center block cursor-pointer"
              >
                Enroll Now for ₹2,999
              </button>
            </div>

            {/* Offline Pricing Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-left flex flex-col justify-between hover:border-purple-300 transition-all">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full mb-3">
                      <Building02Icon className="w-3.5 h-3.5" />
                      Offline
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
                    <span className="text-xs text-slate-500">Full Course Pass</span>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-3xl font-extrabold text-slate-900">₹4,999</div>
                    <span className="inline-block mt-1.5 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      One Time Payment
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-sm text-slate-700 border-t border-slate-100">
                  {(course.pricingPoints || [
                    "Learn Figma with Real-World Projects",
                    "Design Modern & Conversion-Focused Interfaces",
                    "Use AI to Design Faster & Smarter",
                    "Build Portfolio-Ready UI Projects",
                    "Certificate of Course Completion"
                  ]).map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2.5">
                      <span className="text-emerald-600 font-bold">✓</span> {point}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenEnroll('offline')}
                className="w-full py-3.5 rounded-xl bg-[#0bc40e] hover:bg-[#0aa30c] text-white font-semibold text-sm transition-all shadow-md text-center block cursor-pointer"
              >
                Enroll Now for ₹4,999
              </button>
            </div>
          </div>

        </div>
      </section>



      {/* FAQ Section matching exact user screenshot */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090b] tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                category: "Courses & Syllabus",
                question: "What courses do you offer?",
                answer: "We offer practical courses in Graphic Design, UI Design, Digital Marketing, Google Ads and Meta Ads."
              },
              {
                category: "Beginners & Learning",
                question: "Are the courses suitable for beginners?",
                answer: "Yes. Our courses are designed step-by-step, making them suitable for beginners as well as those looking to upgrade their skills."
              },
              {
                category: "Courses & Syllabus",
                question: "Are the courses online or offline?",
                answer: "Our courses are available online, so you can learn from anywhere at your own pace."
              },
              {
                category: "Projects & Practical",
                question: "Will I work on real-world projects?",
                answer: "Yes. You'll work on practical projects and exercises to understand how these skills are used in real-world situations."
              },
              {
                category: "Support & Mentorship",
                question: "Do I get support while learning?",
                answer: "Yes. You'll receive guidance and support to help you understand concepts, complete projects and improve your skills."
              },
              {
                category: "Career & Freelancing",
                question: "Can these courses help me start freelancing?",
                answer: "Yes. You'll develop practical skills and build projects that can help you create a portfolio and explore freelancing opportunities."
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg transition-colors cursor-pointer ${
                      isOpen ? 'text-[#0bc40e]' : 'text-[#18181b] hover:text-[#0bc40e]'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                        {faq.category}
                      </span>
                      <span>{faq.question}</span>
                    </div>

                    <div
                      className={`p-1.5 rounded-lg bg-slate-100 border border-slate-200 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#0bc40e]' : 'text-[#71717a]'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-[#52525b] leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Class Mode Selection & Razorpay Modal */}
      <ClassModeSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={course}
        defaultMode={modalMode}
      />

    </div>
  );
}
