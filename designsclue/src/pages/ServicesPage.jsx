import { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Form from '../components/Form.jsx';
import { 
  ArrowRight, 
  ArrowDown,
  ArrowUp,
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus, 
  Star, 
  Users, 
  Code, 
  Monitor, 
  ThumbsUp
} from 'lucide-react';

// Canonical mapping for all service URL slugs
const canonicalSlugMap = {
  'branding': 'branding',
  'brand-identity': 'branding',
  'ui-ux': 'ui-ux-design',
  'ui-ux-design': 'ui-ux-design',
  'graphic-design': 'graphic-design',
  'motion-graphics': 'motion-graphics',
  'motion-design': 'motion-graphics',
  'software-development': 'software-development',
  'web-development': 'web-development',
  'website-development': 'web-development',
  'mobile-apps': 'mobile-apps',
  'mobile-app-development': 'mobile-apps',
  'shopify': 'shopify',
  'webflow': 'webflow',
  'seo': 'seo',
  'digital-marketing': 'digital-marketing',
  'google-ads': 'google-ads',
  'meta-ads': 'meta-ads'
};

// Complete Service Data Dictionary for all 13 service categories
const serviceDataMap = {
  'branding': {
    heroTitle: 'Branding',
    heroDesc: "Your brand is more than just a logo—it's the identity, personality, and promise your business makes to its customers. Strong branding helps you stand out in a competitive market, build trust, and create meaningful connections with your audience. We develop strategic branding solutions that communicate your values, strengthen your market presence, and position your business for long-term success.",
    whyTitle: 'What You Get',
    whySubtitle: 'Our branding services provide everything you need to establish a powerful and memorable brand.',
    whyCards: [
      { title: 'Brand Strategy', content: 'Develop a clear brand vision, positioning, messaging, and value proposition that aligns with your business goals.' },
      { title: 'Brand Identity Design', content: 'Create a unique visual identity, including logos, typography, color palettes, icons, and design elements that represent your brand.' },
      { title: 'Brand Messaging', content: 'Craft compelling messaging, taglines, tone of voice, and communication guidelines that resonate with your target audience.' },
      { title: 'Marketing Collateral', content: 'Design professional business cards, brochures, presentations, packaging, social media assets, and promotional materials.' },
      { title: 'Digital Brand Presence', content: 'Maintain a consistent brand identity across websites, mobile applications, digital campaigns, and social media platforms.' },
      { title: 'Brand Guidelines', content: 'Develop comprehensive brand guidelines to ensure consistency across every customer touchpoint.' }
    ],
    capabilitiesTitle: 'Proper Strategic Branding',
    capabilitiesSubtitle: "Successful brands don't happen by chance—they are built through strategy.",
    capabilities: [
      { id: '01', title: 'Define Your Unique Brand Identity', desc: 'Create a distinct visual style and message that reflects your business values and personality.' },
      { id: '02', title: 'Differentiate Your Business from Competitors', desc: 'Stand out in the market by highlighting what makes your brand unique and valuable.' },
      { id: '03', title: 'Build Customer Trust and Credibility', desc: 'A professional and consistent brand helps customers feel confident in your business.' },
      { id: '04', title: 'Create Consistent Brand Experiences', desc: 'Deliver the same look, message, and quality across all customer touchpoints.' },
      { id: '05', title: 'Increase Brand Recognition and Recall', desc: 'Use consistent branding so customers can easily recognize and remember your business.' },
      { id: '06', title: 'Strengthen Customer Loyalty', desc: 'Build lasting relationships that encourage repeat purchases and customer referrals.' }
    ],
    processTitle: 'Our Branding Process',
    processDesc: "We provide strategic branding solutions from discovery to market release, ensuring your brand stands out and drives growth.",
    processSteps: [
      { id: '01', title: 'Discovery & Research', icon: Users, desc: "We learn about your business, target audience, competitors, industry, and goals." },
      { id: '02', title: 'Brand Strategy', icon: Code, desc: "We define your positioning, mission, vision, personality, messaging, and unique value proposition." },
      { id: '03', title: 'Brand Identity Design', icon: Monitor, desc: "We craft logos, color palettes, typography, visual styles, and design systems that reflect your brand’s personality." },
      { id: '04', title: 'Brand Guidelines', icon: ThumbsUp, desc: "We develop comprehensive brand guidelines to ensure consistency across all customer touchpoints." },
      { id: '05', title: 'Marketing Collateral', icon: Star, desc: "We design business cards, brochures, presentations, packaging, social media assets, and other promotional materials." }
    ]
  },

  'ui-ux-design': {
    heroTitle: 'UI/UX Design Services',
    heroDesc: 'Design engaging, user-friendly digital experiences that turn visitors into loyal customers. We craft intuitive interfaces backed by user research, interaction design principles, and conversion optimization.',
    whyTitle: 'What You Get',
    whySubtitle: 'Everything you need to deliver an outstanding user experience across web and mobile platforms.',
    whyCards: [
      { title: 'User Research & Personas', content: 'Deep user research, behavioral mapping, and customer personas to ground design decisions in empirical evidence.' },
      { title: 'Wireframing & UX Architecture', content: 'Intuitive structural blueprints and user flow diagrams that simplify complex product navigation.' },
      { title: 'High-Fidelity UI Design', content: 'Modern, pixel-perfect user interface design tailored to your visual brand guidelines.' },
      { title: 'Design Systems & Libraries', content: 'Scalable UI component libraries, design tokens, and style guides for seamless product iteration.' },
      { title: 'Interactive Prototypes', content: 'Animated prototypes to test tap and click journeys with stakeholders before development.' },
      { title: 'Usability Testing & Audits', content: 'Empirical user testing sessions to uncover friction points and maximize conversion rates.' }
    ],
    capabilitiesTitle: 'Empower Your Digital Product',
    capabilitiesSubtitle: 'Intuitive designs engineered for maximum engagement and seamless usability.',
    capabilities: [
      { id: '01', title: 'Frictionless Navigation', desc: 'Guide users toward their goals with clear visual hierarchy and minimal effort.' },
      { id: '02', title: 'Conversion-Focused Layouts', desc: 'Strategic CTA placements and user flows optimized for lead capture and checkouts.' },
      { id: '03', title: 'Responsive Across Devices', desc: 'Seamless interface scaling for smartphones, tablets, laptops, and wide desktop screens.' },
      { id: '04', title: 'Accessibility Compliance', desc: 'WCAG compliant colors, typography contrast, and screen-reader accessible components.' },
      { id: '05', title: 'Micro-Interactions & Motion', desc: 'Delightful hover states, page transitions, and feedback animations.' },
      { id: '06', title: 'Scalable Component Systems', desc: 'Reusable design patterns built to support rapid future feature releases.' }
    ],
    processTitle: 'Our UI/UX Design Process',
    processDesc: 'A human-centered design process ensuring your product looks stunning and feels effortless to use.',
    processSteps: [
      { id: '01', title: 'User Research & Discovery', icon: Users, desc: 'We analyze your target users, competitive products, and core business objectives.' },
      { id: '02', title: 'Information Architecture', icon: Code, desc: 'We map out user flows, sitemaps, and low-fidelity structural wireframes.' },
      { id: '03', title: 'Visual UI Crafting', icon: Monitor, desc: 'We design high-fidelity screens, color palettes, and component libraries.' },
      { id: '04', title: 'Prototyping & Testing', icon: ThumbsUp, desc: 'We test interactive prototypes with users to refine interactions and navigation.' },
      { id: '05', title: 'Developer Handoff', icon: Star, desc: 'We deliver developer-ready Figma specs, assets, and design tokens.' }
    ]
  },

  'graphic-design': {
    heroTitle: 'Graphic Design Services',
    heroDesc: 'Create high-impact visual graphics, marketing collateral, print assets, and digital brand designs that communicate your message with absolute clarity and artistic flair.',
    whyTitle: 'What You Get',
    whySubtitle: 'Comprehensive visual design assets tailored for marketing campaigns, print, and digital media.',
    whyCards: [
      { title: 'Marketing Collateral', content: 'Eye-catching social ad graphics, email templates, banner ads, and digital promotional assets.' },
      { title: 'Corporate Print Materials', content: 'Professional business cards, brochures, pitch decks, sales sheets, and annual reports.' },
      { title: 'Social Media Templates', content: 'Custom editable templates for Instagram, LinkedIn, Facebook, and Twitter/X feeds.' },
      { title: 'Packaging & Merchandise', content: 'Custom product packaging design, box layouts, labels, and branded merch.' },
      { title: 'Infographics & Data Vis', content: 'Complex data and statistics transformed into clear, visually engaging infographics.' },
      { title: 'Large Format Signage', content: 'Event banners, trade show booth graphics, billboards, and physical venue signage.' }
    ],
    capabilitiesTitle: 'Visual Communication Excellence',
    capabilitiesSubtitle: "Stand out with professional graphics that elevate your brand's authority.",
    capabilities: [
      { id: '01', title: 'Custom Vector Artwork', desc: 'Bespoke vector illustrations and icon sets tailored to your visual identity.' },
      { id: '02', title: 'Print-Ready Formatting', desc: 'Exact color calibration (CMYK/Pantone), bleed settings, and high-DPI prepress files.' },
      { id: '03', title: 'Consistent Brand Aesthetic', desc: 'Unified visual tone across physical print and digital marketing touchpoints.' },
      { id: '04', title: 'Rapid Campaign Turnaround', desc: 'Fast concept-to-final asset delivery for time-sensitive marketing campaigns.' },
      { id: '05', title: 'Scalable Master Files', desc: 'Editable AI, EPS, PSD, and SVG master source files delivered upon completion.' },
      { id: '06', title: 'Multi-Channel Optimization', desc: 'Assets formatted for web, mobile feeds, email headers, and high-res print.' }
    ],
    processTitle: 'Our Graphic Design Process',
    processDesc: 'Collaborative visual creation focused on concept exploration, refinement, and final delivery.',
    processSteps: [
      { id: '01', title: 'Creative Brief', icon: Users, desc: 'We gather design requirements, target specs, brand guidelines, and visual references.' },
      { id: '02', title: 'Concept Drafting', icon: Code, desc: 'We explore multiple creative directions, layouts, and visual compositions.' },
      { id: '03', title: 'Refinement & Polishing', icon: Monitor, desc: 'We fine-tune typography, color palettes, and element placement based on feedback.' },
      { id: '04', title: 'Prepress & Quality Check', icon: ThumbsUp, desc: 'We perform print-color calibration and resolution verification.' },
      { id: '05', title: 'Final Asset Package', icon: Star, desc: 'We export print-ready PDFs, high-res web files, and editable source vector files.' }
    ]
  },

  'motion-graphics': {
    heroTitle: 'Motion Design Services',
    heroDesc: 'Motion design combines graphic design, animation, and visual storytelling to create engaging digital experiences. By adding movement to graphics, logos, text, and illustrations, motion design captures attention, simplifies complex ideas, and delivers memorable brand experiences across digital platforms.',
    whyTitle: 'What You Get',
    whySubtitle: 'Dynamic animated assets and motion graphics engineered for digital products, social ads, and video.',
    whyCards: [
      { title: 'UI Micro-Animations', content: 'Lightweight Lottie and SVG animations for web and app hover effects, icons, and loaders.' },
      { title: 'Animated Explainer Videos', content: 'Story-driven 2D/3D explainer videos that break down complex products into clear narratives.' },
      { title: 'Logo Motion & Ident', content: 'Dynamic animated logo reveals and video bumpers for YouTube, events, and broadcast.' },
      { title: 'Social Video Creatives', content: 'Thumb-stopping animated ads, Instagram Reels, TikTok graphics, and video banners.' },
      { title: 'Product Walkthroughs', content: 'High-fidelity animated product walkthroughs showcasing key software features.' },
      { title: 'Kinetic Typography', content: 'Engaging animated text compositions for promo videos and presentation slides.' }
    ],
    capabilitiesTitle: 'Bring Your Story to Life',
    capabilitiesSubtitle: 'Capture attention and elevate user engagement through fluid motion aesthetics.',
    capabilities: [
      { id: '01', title: 'Lightweight Web Lottie', desc: 'Ultra-fast JSON animations that load instantly on web pages without speed loss.' },
      { id: '02', title: 'High-Recall Storytelling', desc: 'Visual motion narratives engineered to increase message retention and conversions.' },
      { id: '03', title: 'Native App Integration', desc: 'Animation files optimized for seamless integration in iOS, Android, and React.' },
      { id: '04', title: 'Custom Sound Design', desc: 'Synchronized sound effects and background scores for maximum emotional impact.' },
      { id: '05', title: 'Multi-Format Render', desc: 'Exported in 4K MP4, WebM, GIF, and Lottie JSON formats for any screen.' },
      { id: '06', title: 'Brand Motion Guidelines', desc: 'Defined animation curves, timing rules, and easing specs for brand consistency.' }
    ],
    processTitle: 'Our Motion Design Process',
    processDesc: 'From initial script and storyboard to final animation rendering and asset export.',
    processSteps: [
      { id: '01', title: 'Script & Concept', icon: Users, desc: 'We outline the narrative arc, visual style, and key messaging goals.' },
      { id: '02', title: 'Storyboarding', icon: Code, desc: 'We illustrate keyframe drawings to define scene transitions and pacing.' },
      { id: '03', title: 'Animation & Rigging', icon: Monitor, desc: 'We bring vector graphics and typography to life with fluid motion curves.' },
      { id: '04', title: 'Sound Design & Sync', icon: ThumbsUp, desc: 'We layer sound effects, voiceovers, and music tracks to match the visuals.' },
      { id: '05', title: 'Rendering & Export', icon: Star, desc: 'We deliver web-optimized Lottie files, 4K MP4 video, and multi-format packages.' }
    ]
  },

  'software-development': {
    heroTitle: 'Software Development Services',
    heroDesc: 'Custom software engineered for scale, reliability, and security. We build enterprise applications, SaaS platforms, cloud architectures, and complex digital products tailored to your strategic business goals.',
    whyTitle: 'What You Get',
    whySubtitle: 'End-to-end software engineering solutions designed to solve complex business challenges.',
    whyCards: [
      { title: 'Enterprise SaaS Platforms', content: 'Multi-tenant cloud SaaS architectures built for high concurrency and enterprise security.' },
      { title: 'Custom API Microservices', content: 'Scalable backend microservices and secure REST/GraphQL API architectures.' },
      { title: 'Cloud Infrastructure & DevOps', content: 'High-availability server deployment and automated CI/CD pipelines on AWS and GCP.' },
      { title: 'Legacy System Modernization', content: 'Refactoring outdated legacy codebases into modular, modern software stacks.' },
      { title: 'Database & Data Pipelines', content: 'High-performance SQL/NoSQL database architecture, caching, and data processing.' },
      { title: 'Security & Compliance', content: 'SOC2, GDPR, and HIPAA compliant security engineering, data encryption, and audits.' }
    ],
    capabilitiesTitle: 'Engineered for High-Performance Growth',
    capabilitiesSubtitle: 'Bulletproof software architecture crafted by senior engineers.',
    capabilities: [
      { id: '01', title: '99.99% Infrastructure Uptime', desc: 'Fault-tolerant cloud architecture designed for mission-critical reliability.' },
      { id: '02', title: 'Clean & Maintainable Code', desc: 'Strict coding standards, automated unit testing, and peer code reviews.' },
      { id: '03', title: 'Sub-Second API Response', desc: 'Optimized database queries and multi-tier Redis caching for rapid speed.' },
      { id: '04', title: 'Seamless 3rd-Party Sync', desc: 'Integrations with Stripe, Salesforce, Hubspot, Twilio, and custom APIs.' },
      { id: '05', title: 'Agile Sprint Execution', desc: 'Transparent bi-weekly sprint deliveries with active progress dashboards.' },
      { id: '06', title: 'Full IP & Code Ownership', desc: 'Complete intellectual property assignment and technical documentation.' }
    ],
    processTitle: 'Our Software Engineering Process',
    processDesc: 'Agile engineering methodology ensuring fast delivery, code quality, and predictable milestones.',
    processSteps: [
      { id: '01', title: 'Architecture & Scope', icon: Users, desc: 'System architecture design, technology stack selection, and database schema planning.' },
      { id: '02', title: 'Agile Sprints', icon: Code, desc: 'Bi-weekly development iterations with continuous integration and deployment.' },
      { id: '03', title: 'QA & Penetration Testing', icon: Monitor, desc: 'Automated unit tests, integration testing, and vulnerability security scans.' },
      { id: '04', title: 'Cloud Provisioning & Launch', icon: ThumbsUp, desc: 'Server deployment, SSL setup, load balancing, and production launch.' },
      { id: '05', title: 'DevOps & Maintenance', icon: Star, desc: '24/7 server monitoring, performance tuning, and continuous feature updates.' }
    ]
  },

  'web-development': {
    heroTitle: 'Web Development Services',
    heroDesc: 'Build fast, scalable, and conversion-focused web platforms. From custom web applications to enterprise marketing sites, we deliver high-performance web engineering that powers digital business growth.',
    whyTitle: 'What You Get',
    whySubtitle: 'Comprehensive web development solutions engineered for performance, security, and SEO.',
    whyCards: [
      { title: 'Custom Web Applications', content: 'Bespoke full-stack web applications tailored specifically to your business workflows.' },
      { title: 'Modern React & Next.js Stacks', content: 'Lightning fast frontend interfaces built on React, Next.js, and TypeScript.' },
      { title: 'CMS & Content Controls', content: 'Custom CMS setups empowering marketing teams to create and edit pages easily.' },
      { title: 'Core Web Vitals Speed', content: 'Sub-second page loading speeds optimized for Google search rankings and UX.' },
      { title: 'API & Payment Integration', content: 'Secure connections with Stripe, PayPal, CRMs, ERPs, and custom backend APIs.' },
      { title: 'Ongoing Support & Hosting', content: 'Reliable cloud server management, SSL certificates, and security updates.' }
    ],
    capabilitiesTitle: 'Build a Web Engine That Scales',
    capabilitiesSubtitle: 'High-converting digital web experiences engineered for modern web standards.',
    capabilities: [
      { id: '01', title: 'Mobile-First Responsive Layouts', desc: 'Flawless presentation and usability across mobile, tablet, and desktop screens.' },
      { id: '02', title: 'SEO & Performance Optimized', desc: 'Clean semantic HTML, automated sitemaps, and optimized asset delivery.' },
      { id: '03', title: 'Robust Web Security', desc: 'Encrypted data transmission, XSS/CSRF protection, and DDoS prevention.' },
      { id: '04', title: 'Easy Content Editing', desc: 'User-friendly dashboard for updating text, images, blogs, and product listings.' },
      { id: '05', title: 'Global CDN Delivery', desc: 'Distributed web server delivery ensuring high speed for global site visitors.' },
      { id: '06', title: 'Scalable Cloud Architecture', desc: 'Built to withstand heavy traffic spikes without slowdowns or crashes.' }
    ],
    processTitle: 'Our Web Development Process',
    processDesc: 'Structured web engineering from initial requirements gathering to cloud deployment.',
    processSteps: [
      { id: '01', title: 'Technical Discovery', icon: Users, desc: 'Defining site architecture, tech stack, wireframes, and project scope.' },
      { id: '02', title: 'Frontend & Backend Build', icon: Code, desc: 'Clean modular code development using modern React and Node.js frameworks.' },
      { id: '03', title: 'QA & Performance Audit', icon: Monitor, desc: 'Cross-browser testing, accessibility validation, and speed optimization.' },
      { id: '04', title: 'Production Deployment', icon: ThumbsUp, desc: 'DNS setup, domain cutover, SSL configuration, and live launch.' },
      { id: '05', title: 'Post-Launch Optimization', icon: Star, desc: 'Analytics integration, search console submission, and continuous maintenance.' }
    ]
  },

  'mobile-apps': {
    heroTitle: 'Mobile App Development As You Want It',
    heroDesc: "Mobile development with Fireart is the proven way to get your product in your customers' pockets. We build intuitive, high-performance iOS and Android mobile apps that users love to launch every day.",
    whyTitle: 'What You Get',
    whySubtitle: 'End-to-end mobile app engineering for iOS, Android, and cross-platform mobile frameworks.',
    whyCards: [
      { title: 'Native iOS App Development', content: 'High-end Swift & SwiftUI applications built specifically for iPhone, iPad, and Apple Watch.' },
      { title: 'Native Android Apps', content: 'Scalable Kotlin applications optimized for Google Play and Android smartphones.' },
      { title: 'Cross-Platform Frameworks', content: 'Efficient React Native & Flutter apps built for simultaneous iOS & Android release.' },
      { title: 'Mobile UI/UX Design', content: 'Intuitive touch-first mobile interfaces designed for natural thumb gestures.' },
      { title: 'Backend & Cloud Database', content: 'Real-time database sync, user authentication, and push notification servers.' },
      { title: 'App Store Publishing', content: 'Full App Store & Google Play submission, guidelines review, and deployment.' }
    ],
    capabilitiesTitle: 'Put Your Brand in Every Pocket',
    capabilitiesSubtitle: 'Feature-rich mobile applications built for high retention and 5-star reviews.',
    capabilities: [
      { id: '01', title: '60 FPS Native Performance', desc: 'Silky smooth screen transitions and immediate touch responsiveness.' },
      { id: '02', title: 'Offline Data Sync', desc: 'App functionality continues seamlessly even without active cell connectivity.' },
      { id: '03', title: 'Push Notification Engine', desc: 'Targeted user re-engagement campaigns and instant activity alerts.' },
      { id: '04', title: 'Biometric Security', desc: 'Face ID, Touch ID, and secure hardware keychain integration.' },
      { id: '05', title: 'In-App Payments', desc: 'Apple Pay, Google Pay, and Stripe SDK mobile checkout integration.' },
      { id: '06', title: 'Hardware Integration', desc: 'Camera, GPS, Bluetooth, Accelerometer, and sensor connectivity.' }
    ],
    processTitle: 'Our Mobile App Development Process',
    processDesc: 'A streamlined mobile app pipeline from prototyping to official App Store distribution.',
    processSteps: [
      { id: '01', title: 'Feature Scope & Prototypes', icon: Users, desc: 'Mobile feature mapping and interactive tap-through prototypes.' },
      { id: '02', title: 'Mobile App Coding', icon: Code, desc: 'Native or cross-platform code implementation with bi-weekly test builds.' },
      { id: '03', title: 'Device QA Testing', icon: Monitor, desc: 'Testing across screen sizes, OS versions, and physical mobile devices.' },
      { id: '04', title: 'Store Submission', icon: ThumbsUp, desc: 'App Store & Google Play metadata, screenshots, and guidelines approval.' },
      { id: '05', title: 'App Maintenance', icon: Star, desc: 'OS updates, crash report monitoring, and continuous feature additions.' }
    ]
  },

  'shopify': {
    heroTitle: 'Shopify E-Commerce Services',
    heroDesc: 'High-converting custom Shopify and Shopify Plus online stores. We combine custom theme development, app integrations, and conversion rate optimization to turn store visitors into repeat buyers.',
    whyTitle: 'What You Get',
    whySubtitle: 'Complete e-commerce engineering for ambitious brands scaling on Shopify & Shopify Plus.',
    whyCards: [
      { title: 'Custom Shopify Themes', content: 'Bespoke Liquid & Dawn themes tailored to your visual brand identity and product catalog.' },
      { title: 'Shopify Plus Migration', content: 'Seamless migration from WooCommerce, Magento, or custom carts with zero data loss.' },
      { title: 'Custom Shopify Apps', content: 'Tailored private Shopify apps and APIs for custom checkout logic and ERP sync.' },
      { title: 'Checkout & Cart Optimization', content: 'Frictionless slide-out carts and optimized checkouts designed to cut abandonment.' },
      { title: 'Headless Shopify (Hydrogen)', content: 'Ultra-fast Remix & Hydrogen headless storefronts for complex brand requirements.' },
      { title: 'Conversion Rate Audits', content: 'Page speed acceleration, mobile UX fixes, and revenue optimization.' }
    ],
    capabilitiesTitle: 'Scale Your E-Commerce Revenue',
    capabilitiesSubtitle: 'Enterprise-grade Shopify stores built for high volume sales and lightning speed.',
    capabilities: [
      { id: '01', title: 'Sub-2 Second Page Load', desc: 'Optimized images, clean Liquid code, and streamlined app scripts.' },
      { id: '02', title: 'Multi-Currency & Gateways', desc: 'Shop Pay, Apple Pay, Klarna, and multi-region checkout capabilities.' },
      { id: '03', title: 'Mobile-First Shopping', desc: 'Thumb-friendly product pages, sticky add-to-cart buttons, and fast checkout.' },
      { id: '04', title: 'Automated Stock Sync', desc: 'ERP, CRM, and warehouse integrations for real-time inventory tracking.' },
      { id: '05', title: 'Subscriptions & Upsells', desc: 'Recharge and custom subscription flows to boost customer lifetime value.' },
      { id: '06', title: 'Accurate Analytics Tracking', desc: 'GA4, Meta Pixel, and server-side tracking setup for true ad ROI data.' }
    ],
    processTitle: 'Our Shopify Build Process',
    processDesc: 'Proven e-commerce build methodology designed to launch stores that convert from day one.',
    processSteps: [
      { id: '01', title: 'E-Commerce Blueprint', icon: Users, desc: 'Catalog structure planning, app audit, and conversion UX wireframing.' },
      { id: '02', title: 'Theme Engineering', icon: Code, desc: 'Pixel-perfect frontend build with responsive Shopify Liquid coding.' },
      { id: '03', title: 'Product Data & App Sync', icon: Monitor, desc: 'Catalog migration, payment gateway setup, and app integration.' },
      { id: '04', title: 'Checkout & QA Audit', icon: ThumbsUp, desc: 'Multi-device order placement testing and site speed verification.' },
      { id: '05', title: 'Live Store Cutover', icon: Star, desc: 'Domain transfer, payment testing, and live store launch.' }
    ]
  },

  'webflow': {
    heroTitle: 'Webflow Development Services',
    heroDesc: 'Fast, responsive, and custom Webflow websites. We combine pixel-perfect visual design with custom CMS structure, giving your marketing team complete creative freedom without technical debt.',
    whyTitle: 'What You Get',
    whySubtitle: 'Bespoke Webflow engineering that empowers your marketing team to publish instantly.',
    whyCards: [
      { title: 'Custom Webflow Build', content: 'Pixel-perfect HTML/CSS implementation using clean Webflow Client-First architecture.' },
      { title: 'Structured CMS Collections', content: 'Custom content models making blog posts, case studies, and team pages easy to manage.' },
      { title: 'Figma to Webflow Transfer', content: 'Flawless translation of Figma design mockups into fully responsive Webflow pages.' },
      { title: 'Advanced Webflow Motion', content: 'Custom scroll animations, hover triggers, parallax effects, and 3D interactions.' },
      { title: 'Gated Content & Memberships', content: 'Webflow membership portals, subscriber areas, and custom user login systems.' },
      { title: 'Custom JavaScript Integrations', content: 'API connections, custom form logic, and external web services integration.' }
    ],
    capabilitiesTitle: 'Empower Your Marketing Team',
    capabilitiesSubtitle: 'High-performance Webflow sites that look stunning and load instantly.',
    capabilities: [
      { id: '01', title: 'Zero-Code Page Builder', desc: 'Empowers marketing teams to build landing pages without developer help.' },
      { id: '02', title: 'Client-First Class System', desc: 'Clean, standardized CSS class naming for easy long-term maintenance.' },
      { id: '03', title: '100/100 Core Web Vitals', desc: 'Optimized Webflow asset bundling for maximum Google speed scores.' },
      { id: '04', title: 'Automated SEO Metadata', desc: 'Dynamic CMS meta titles, descriptions, and OpenGraph social share cards.' },
      { id: '05', title: 'AWS Enterprise Hosting', desc: 'Fastly & AWS global CDN hosting ensuring 99.99% site availability.' },
      { id: '06', title: 'Custom Breakpoint Views', desc: 'Tailored responsive styling for desktop, tablet, and mobile displays.' }
    ],
    processTitle: 'Our Webflow Development Process',
    processDesc: 'Structured Webflow build pipeline ensuring rapid delivery and easy editor management.',
    processSteps: [
      { id: '01', title: 'Figma & CMS Blueprint', icon: Users, desc: 'Reviewing Figma files and structuring Webflow CMS collection schemas.' },
      { id: '02', title: 'Client-First Webflow Build', icon: Code, desc: 'Building responsive HTML/CSS structures and static page layouts.' },
      { id: '03', title: 'Interactions & Animations', icon: Monitor, desc: 'Configuring smooth Webflow interaction triggers and scroll animations.' },
      { id: '04', title: 'SEO & Redirect Setup', icon: ThumbsUp, desc: 'Setting up dynamic meta tags, sitemap, and 301 redirect tables.' },
      { id: '05', title: 'Editor Training & Launch', icon: Star, desc: 'Video walkthrough for your team, custom domain mapping, and launch.' }
    ]
  },

  'seo': {
    heroTitle: 'Search Engine Optimization (SEO)',
    heroDesc: 'Drive organic traffic, rank higher on Google, and acquire high-intent customers. Our data-driven SEO strategies build long-term domain authority, technical health, and sustainable revenue growth.',
    whyTitle: 'What You Get',
    whySubtitle: 'Comprehensive technical, on-page, and off-page SEO solutions to dominate search results.',
    whyCards: [
      { title: 'Technical SEO Audits', content: 'Deep site crawl analysis fixing indexing errors, broken links, speed, and architecture.' },
      { title: 'Keyword Strategy & Intent', content: 'In-depth keyword research mapping search volume and buyer intent to landing pages.' },
      { title: 'On-Page Content Tuning', content: 'Heading optimization, internal linking structures, meta tags, and content depth.' },
      { title: 'Authority Content Pillars', content: 'Comprehensive blog posts and guides designed to rank for high-value search terms.' },
      { title: 'Link Building & Digital PR', content: 'White-hat backlink acquisition from high-domain authority industry publications.' },
      { title: 'Local & Global SEO', content: 'Geo-targeted Google Business Profile setup and international multi-language SEO.' }
    ],
    capabilitiesTitle: 'Dominate Search Engine Rankings',
    capabilitiesSubtitle: 'Sustainable organic growth strategies that turn search queries into sales.',
    capabilities: [
      { id: '01', title: 'Page 1 Keyword Rankings', desc: 'Target valuable non-branded keywords with high buyer conversion intent.' },
      { id: '02', title: 'Core Web Vitals Optimization', desc: 'Improve search rankings by boosting mobile load speeds and stability.' },
      { id: '03', title: 'Schema Structured Data', desc: 'Implement JSON-LD schema for Google Rich Snippets and star ratings.' },
      { id: '04', title: 'Transparent ROI Dashboards', desc: 'Monthly rank tracking, organic traffic, and conversion attribution reports.' },
      { id: '05', title: 'Algorithm Protection', desc: 'Ethical white-hat practices built to withstand Google search algorithm updates.' },
      { id: '06', title: 'Search-to-Sale Synergy', desc: 'Optimizing landing page copy so organic traffic turns into paying clients.' }
    ],
    processTitle: 'Our SEO Growth Process',
    processDesc: 'Data-driven optimization cycle focused on technical health, content authority, and keyword rank.',
    processSteps: [
      { id: '01', title: 'Technical SEO Audit', icon: Users, desc: 'Deep website scan identifying indexing errors, duplicate content, and speed fixes.' },
      { id: '02', title: 'Keyword Research & Mapping', icon: Code, desc: 'Identifying high-volume buyer keywords and mapping them to site URLs.' },
      { id: '03', title: 'On-Page Optimization', icon: Monitor, desc: 'Fixing meta tags, headers, image alt text, internal links, and page copy.' },
      { id: '04', title: 'Content & Link Outreach', icon: ThumbsUp, desc: 'Publishing authority content pillars and securing high-DR backlinks.' },
      { id: '05', title: 'Rank Tracking & Scaling', icon: Star, desc: 'Analyzing Search Console performance metrics and expanding keyword clusters.' }
    ]
  },

  'digital-marketing': {
    heroTitle: 'Digital Marketing Services',
    heroDesc: 'Data-driven digital marketing strategies to grow revenue and scale your brand. We combine multi-channel performance advertising, content marketing, and analytics to attract, convert, and retain customers.',
    whyTitle: 'What You Get',
    whySubtitle: 'Full-funnel digital marketing campaigns engineered for measurable ROI and revenue scale.',
    whyCards: [
      { title: 'Multi-Channel Ad Strategy', content: 'Coordinated performance ad campaigns across Google, Meta, LinkedIn, and TikTok.' },
      { title: 'Conversion Rate Optimization', content: 'A/B testing landing pages, headlines, CTAs, and offers to maximize conversions.' },
      { title: 'Email & Lifecycle Marketing', content: 'Automated welcome, abandoned cart, and re-engagement email flows (Klaviyo/Hubspot).' },
      { title: 'Content & Copywriting', content: 'Persuasive ad copy, landing page sales text, and high-impact email campaigns.' },
      { title: 'Analytics & Funnel Tracking', content: 'End-to-end multi-touch attribution modeling to track true customer acquisition cost.' },
      { title: 'Brand Awareness Campaigns', content: 'Targeted social video campaigns built to build industry category authority.' }
    ],
    capabilitiesTitle: 'Accelerate Growth Across Channels',
    capabilitiesSubtitle: 'Performance-driven marketing campaigns tailored to your target acquisition costs.',
    capabilities: [
      { id: '01', title: 'Lower Customer Acquisition Cost', desc: 'Strategic audience targeting and creative testing to decrease CAC.' },
      { id: '02', title: 'Higher Customer Lifetime Value', desc: 'Automated retention campaigns driving repeat purchases and subscriptions.' },
      { id: '03', title: 'High-Converting Creatives', desc: 'Video and static ad graphics designed for instant scroll-stopping impact.' },
      { id: '04', title: 'Real-Time ROI Dashboards', desc: 'Clear reporting tracking ROAS, MER, CPA, and net customer revenue.' },
      { id: '05', title: 'Scalable Ad Budget Growth', desc: 'Scaling ad spend profitably without diminishing returns on investment.' },
      { id: '06', title: 'Full Funnel Alignment', desc: 'Harmonizing top-of-funnel ads with bottom-of-funnel landing page messaging.' }
    ],
    processTitle: 'Our Digital Marketing Process',
    processDesc: 'Agile marketing strategy cycle focused on rapid testing, attribution, and profitable scale.',
    processSteps: [
      { id: '01', title: 'Funnel Audit & Plan', icon: Users, desc: 'Reviewing current conversion benchmarks, target personas, and channels.' },
      { id: '02', title: 'Creative & Tracking Build', icon: Code, desc: 'Drafting ad copy, visual assets, tracking pixels, and landing pages.' },
      { id: '03', title: 'Campaign Launch & Testing', icon: Monitor, desc: 'Launching multi-variant audience, creative, and placement test groups.' },
      { id: '04', title: 'Optimization & Scaling', icon: ThumbsUp, desc: 'Reallocating spend to top-performing ads and scaling winning campaigns.' },
      { id: '05', title: 'Weekly Performance Reviews', icon: Star, desc: 'Analyzing ROI metrics and launching fresh creative iterations.' }
    ]
  },

  'google-ads': {
    heroTitle: 'Google Ads PPC Services',
    heroDesc: 'High-ROI targeted Google Ads search, shopping, and display campaigns. Capture active buyers precisely when they search for your products or services on Google Search, YouTube, and Performance Max.',
    whyTitle: 'What You Get',
    whySubtitle: 'Precision PPC campaign management focused on high purchase intent and positive return on ad spend.',
    whyCards: [
      { title: 'Google Search Campaigns', content: 'Bidding on high-intent search queries to capture active buyers at the exact moment of search.' },
      { title: 'Performance Max (PMax)', content: 'AI-driven campaigns utilizing Google Search, Shopping, YouTube, and Gmail automatically.' },
      { title: 'Google Shopping Ads', content: 'Optimized product listing ads engineered for high ROAS e-commerce purchases.' },
      { title: 'YouTube Video Ads', content: 'High-impact video ad campaigns targeting relevant channels, topics, and searchers.' },
      { title: 'Google Display Retargeting', content: 'Re-engaging past site visitors across millions of premium web publisher sites.' },
      { title: 'Negative Keyword Filtering', content: 'Eliminating wasted ad spend by filtering out non-converting search terms daily.' }
    ],
    capabilitiesTitle: 'Capture High-Intent Buyers',
    capabilitiesSubtitle: 'Targeted pay-per-click management engineered for maximum conversion volume.',
    capabilities: [
      { id: '01', title: 'Maximize ROAS Profitability', desc: 'Data-driven bid management focused on net revenue return per ad dollar.' },
      { id: '02', title: 'Zero Wasted Ad Spend', desc: 'Strict match-type controls and aggressive negative keyword lists.' },
      { id: '03', title: 'High Quality Score Ads', desc: 'Optimizing landing pages and ad copy to lower cost-per-click (CPC).' },
      { id: '04', title: 'Server-Side Conversion CAPI', desc: '100% accurate conversion data tracking via Google Tag Manager CAPI.' },
      { id: '05', title: 'High Click-Through Ad Copy', desc: 'Responsive search ads with compelling headlines that outperform competitors.' },
      { id: '06', title: 'Competitor Term Target', desc: 'Ethical search ad campaigns targeting competitor brand terms for market share.' }
    ],
    processTitle: 'Our Google Ads Management Process',
    processDesc: 'Continuous campaign optimization pipeline engineered to reduce acquisition costs and scale volume.',
    processSteps: [
      { id: '01', title: 'Search Term & Account Audit', icon: Users, desc: 'Reviewing historical ad data, search queries, landing pages, and competitors.' },
      { id: '02', title: 'Campaign Architecture', icon: Code, desc: 'Building tightly themed ad groups, responsive ads, extensions, and bidding rules.' },
      { id: '03', title: 'Conversion Tracking Setup', icon: Monitor, desc: 'Configuring Google Tag Manager, GA4 event values, and conversion CAPI.' },
      { id: '04', title: 'Launch & Daily Bid Audit', icon: ThumbsUp, desc: 'Monitoring search query reports, bid adjustments, and impression shares.' },
      { id: '05', title: 'Scale & PMax Expansion', icon: Star, desc: 'Expanding winning keyword sets, PMax assets, and retargeting budgets.' }
    ]
  },

  'meta-ads': {
    heroTitle: 'Meta Ads Performance Marketing',
    heroDesc: 'Scale revenue with targeted social ads across Facebook and Instagram. We combine thumb-stopping creative assets, audience targeting, and multi-stage ad funnels to drive high-volume customer acquisition.',
    whyTitle: 'What You Get',
    whySubtitle: 'Full-service Meta advertising management from creative production to advanced audience scaling.',
    whyCards: [
      { title: 'UGC & Social Ad Creatives', content: 'Short-form video ads, static graphics, and carousels engineered for mobile feeds.' },
      { title: 'Prospecting & Retargeting', content: 'Cold traffic acquisition campaigns paired with warm visitor retargeting funnels.' },
      { title: 'Advantage+ Shopping (ASC)', content: 'AI-driven Meta campaigns optimized for maximum e-commerce order volume.' },
      { title: 'Meta Conversions API (CAPI)', content: 'Server-side event tracking ensuring full attribution accuracy post-iOS 14.' },
      { title: 'Ad Copy & Hook Testing', content: 'Testing multiple headlines, visual hooks, and offers to find winning ad combinations.' },
      { title: 'Lookalike & Broad Targeting', content: 'Leveraging Meta AI algorithms to find your ideal high-converting customers.' }
    ],
    capabilitiesTitle: 'Scale Revenue on Social Feeds',
    capabilitiesSubtitle: 'Turn Facebook & Instagram feeds into your primary revenue growth driver.',
    capabilities: [
      { id: '01', title: 'Thumb-Stopping Video Hooks', desc: 'First 3-second video hooks engineered to capture immediate user attention.' },
      { id: '02', title: 'iOS 14+ Resilient Attribution', desc: 'Server-to-server CAPI setup for complete data tracking accuracy.' },
      { id: '03', title: 'Weekly Creative Testing', desc: 'Systematic ad creative testing sprints to prevent audience ad fatigue.' },
      { id: '04', title: 'Lower Cost per Acquisition', desc: 'Optimizing campaign structures to lower CPA while expanding reach.' },
      { id: '05', title: 'Profitable Budget Scale', desc: 'Methodical scaling of winning ad sets without sacrificing ROAS.' },
      { id: '06', title: 'Ad-to-Landing Page Harmony', desc: 'Matching Meta ad visuals with landing page copy for seamless UX.' }
    ],
    processTitle: 'Our Meta Ads Growth Process',
    processDesc: 'Data-backed creative engine and ad optimization pipeline built for continuous scaling.',
    processSteps: [
      { id: '01', title: 'Creative & Offer Audit', icon: Users, desc: 'Auditing past ad assets, customer reviews, and landing page conversion rates.' },
      { id: '02', title: 'Creative Asset Production', icon: Code, desc: 'Designing video hooks, graphic carousels, and high-converting ad copy.' },
      { id: '03', title: 'Pixel & CAPI Configuration', icon: Monitor, desc: 'Setting up Meta Conversions API for server-side event tracking.' },
      { id: '04', title: 'Campaign Launch & Testing', icon: ThumbsUp, desc: 'Launching Advantage+ and manual ad testing structures across Facebook & Instagram.' },
      { id: '05', title: 'Scale Spend & Iterate', icon: Star, desc: 'Scaling winning ad variations while producing fresh creative iterations.' }
    ]
  }
};

// Tech Stack Items Data
const techStack = [
  { name: 'Swift', icon: 'https://fireart.studio/wp-content/uploads/2025/06/swift-logo-with-text.svg' },
  { name: 'React Native', icon: 'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg' },
  { name: 'Python', icon: 'https://fireart.studio/wp-content/uploads/2025/06/python-seeklogo-1.svg' },
  { name: 'Node.JS', icon: 'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg' },
  { name: 'Kotlin', icon: 'https://fireart.studio/wp-content/uploads/2025/06/kotlin-1.svg' },
  { name: 'Angular', icon: 'https://fireart.studio/wp-content/uploads/2025/07/angular-gradient-2.svg' },
  { name: 'Swift UI', icon: 'https://fireart.studio/wp-content/uploads/2025/06/icons8-swiftui-1.svg' },
  { name: 'Apple', icon: 'https://fireart.studio/wp-content/uploads/2025/06/apple-1.svg' },
  { name: 'Frame', icon: 'https://fireart.studio/wp-content/uploads/2025/06/frame.svg' },
  { name: 'Xcode', icon: 'https://fireart.studio/wp-content/uploads/2025/06/xcode-1.svg' },
  { name: 'Dev', icon: 'https://fireart.studio/wp-content/uploads/2025/06/image-2095.svg' },
  { name: 'Java', icon: 'https://fireart.studio/wp-content/uploads/2025/06/java.svg' },
  { name: 'C++', icon: 'https://fireart.studio/wp-content/uploads/2025/06/c.svg' },
  { name: 'Android', icon: 'https://fireart.studio/wp-content/uploads/2025/06/android-1.svg' },
  { name: 'Flutter', icon: 'https://fireart.studio/wp-content/uploads/2025/06/flutter-1.svg' },
  { name: 'Xamarin', icon: 'https://fireart.studio/wp-content/uploads/2025/06/xamarin-svgrepo-com.svg' },
  { name: 'C#', icon: 'https://fireart.studio/wp-content/uploads/2025/06/c-4.svg' },
  { name: 'Ruby on Rails', icon: 'https://fireart.studio/wp-content/uploads/2025/06/ruby-on-rails-1.svg' },
  { name: 'Firebase', icon: 'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg' },
  { name: 'AWS', icon: 'https://fireart.studio/wp-content/uploads/2025/06/aws-1.svg' },
  { name: 'Google Cloud', icon: 'https://fireart.studio/wp-content/uploads/2025/06/google-cloud-1.svg' }
];

// Testimonials Carousel Data matching Fireart 1:1 (Exact Order from Screenshot)
const testimonials = [
  // 1. Pablo Corredor (Sprightful) - Laptop Mockup with Blue Backdrop
  {
    id: 1,
    type: 'image',
    img: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326581.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    bg: '#2563EB',
    quote: 'We were successful in getting an MVP. Our team wasn’t exactly looking for users or any numbers — we were simply validating plenty of ideas. With Fireart’s help, we’d done that. This project was successful.',
    name: 'Pablo Corredor',
    role: 'CEO of Sprightful'
  },
  // 2. Head of Marketing (CFI Financial Group)
  {
    id: 2,
    type: 'text',
    quote: (
      <>
        What we found most impressive was their <span style={{ color: '#FF470A' }}>creativity, project management</span>, and <span style={{ color: '#FF470A' }}>professionalism</span> in delivering what's needed. I did not encounter any areas of improvement as they were very professional and responsive.
      </>
    ),
    name: 'Head of Marketing',
    role: 'CFI Financial Group'
  },
  // 3. JJ Oslund (Rapchat)
  {
    id: 3,
    type: 'image',
    img: 'https://fireart.studio/wp-content/uploads/2025/10/testimonial-472x298.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
    quote: (
      <>
        Thanks to Fireart Studio's efforts, the app has achieved <span style={{ color: '#FF470A' }}>15 million downloads</span>, and new product launches have generated more engagement. The team has delivered on time and within budget, communicating via virtual meetings, emails, and messages. Their high-quality work is impressive.
      </>
    ),
    name: 'JJ Oslund',
    role: 'COO, Rapchat • Music Production App'
  },
  // 4. Clutch 4.9 Rating Card
  {
    id: 4,
    type: 'rating',
    rating: '4.9',
    reviewCount: 'Based on 38 reviews'
  },
  // 5. Peter Isaacson (Replicant)
  {
    id: 5,
    type: 'image',
    img: 'https://fireart.studio/wp-content/uploads/2025/11/testimonials-442x298.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    quote: 'We really enjoyed working with Fireart! The value, for what we got, was terrific.',
    name: 'Peter Isaacson',
    role: 'CMO, Replicant'
  },
  // 6. Matthew Law (Revionics)
  {
    id: 6,
    type: 'text',
    quote: (
      <>
        Fireart Studio’s resources have done a fantastic job of using user research input to create excellent UI/UX designs, ultimately contributing to the client’s product development endeavors. <span style={{ color: '#FF470A' }}>The team excels at taking ownership of projects</span>, and they’re helpful, knowledgeable, and receptive to feedback.
      </>
    ),
    name: 'Matthew Law',
    role: 'Director of UI/UX, Revionics • Retail Technology Co'
  },
  // 7. Matthew Jewell (Sports Media Company)
  {
    id: 7,
    type: 'text',
    quote: 'This work cadence has helped us create better projects and products because we’re tightly coupled with Fireart Studio.',
    name: 'Matthew Jewell',
    role: 'VP of Product Design • Sports Media Company'
  },
  // 8. The All About Parenting Team
  {
    id: 8,
    type: 'image',
    img: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325503.png',
    fallbackImg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    quote: 'We are deeply grateful to the Fireart team for their contribution to our project\'s success. Their dedication and creative approach to UI/UX design, branding, and illustration have been instrumental in our journey. Fireart has become a reliable partner for us, and we look forward to continuing our collaboration.',
    name: 'The All About Parenting Team',
    role: 'Worldwide Parents Community'
  }
];

// FAQ Items Data
const faqs = [
  {
    q: 'What web development services do you offer?',
    a: 'We cover end-to-end custom web app development, full-stack engineering, API integrations, frontend UI implementation, CMS platforms, and ongoing maintenance.'
  },
  {
    q: 'How long does a web development project take?',
    a: 'Timeline depends on scope complexity. MVPs usually take 2-6 weeks, while full enterprise web applications take 3-6 months with agile sprints.'
  },
  {
    q: 'What technologies do you specialize in?',
    a: 'What technologies do you specialize in? Our core web tech stack includes React, Node.js, Angular, Python, TypeScript, Swift, Kotlin, AWS, and modern cloud infrastructures.'
  },
  {
    q: 'How do you handle quality assurance and testing?',
    a: 'We perform automated unit/integration testing, cross-browser testing, accessibility checks, and performance optimization before any release.'
  },
  {
    q: 'How soon can we start working together?',
    a: 'As soon as you are ready to go! We’re all about speed. The first step is a quick chat to see if we’re a good fit. Then, we can get cracking!'
  }
];

export default function ServicesPage() {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Mouse Drag State for Capabilities Slider
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const carouselRef = useRef(null);

  // Mouse Drag State for Testimonials Slider
  const [isTestimonialMouseDown, setIsTestimonialMouseDown] = useState(false);
  const [testimonialStartX, setTestimonialStartX] = useState(0);
  const [testimonialScrollPos, setTestimonialScrollPos] = useState(0);
  const testimonialRef = useRef(null);

  // Mouse Drag State for Process Track
  const [isProcessMouseDown, setIsProcessMouseDown] = useState(false);
  const [processStartX, setProcessStartX] = useState(0);
  const [processScrollPos, setProcessScrollPos] = useState(0);
  const processTrackRef = useRef(null);

  const handlePrevProcessTrack = () => {
    if (processTrackRef.current) {
      processTrackRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const handleNextProcessTrack = () => {
    if (processTrackRef.current) {
      processTrackRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  const handleProcessMouseDown = (e) => {
    if (!processTrackRef.current) return;
    setIsProcessMouseDown(true);
    setProcessStartX(e.pageX - processTrackRef.current.offsetLeft);
    setProcessScrollPos(processTrackRef.current.scrollLeft);
  };

  const handleProcessMouseUp = () => {
    setIsProcessMouseDown(false);
  };

  const handleProcessMouseMove = (e) => {
    if (!isProcessMouseDown || !processTrackRef.current) return;
    e.preventDefault();
    const x = e.pageX - processTrackRef.current.offsetLeft;
    const walk = (x - processStartX) * 1.6;
    processTrackRef.current.scrollLeft = processScrollPos - walk;
  };

  // Process Breakdown Scroll Animation State
  const [processProgress, setProcessProgress] = useState(0);
  const processSectionRef = useRef(null);

  const location = useLocation();
  const { slug } = useParams();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSlug = slug || (pathParts.length > 1 && pathParts[0] === 'services' ? pathParts[1] : 'web-development');
  const isMobileApp = currentSlug === 'mobile-app-development' || currentSlug === 'mobile-apps';

  const activeKey = canonicalSlugMap[currentSlug] || 'web-development';
  const activeData = serviceDataMap[activeKey] || serviceDataMap['web-development'];

  const getHeroTitle = () => activeData.heroTitle;
  const getHeroDesc = () => activeData.heroDesc;

  const whyTitle = activeData.whyTitle;
  const whySubtitle = activeData.whySubtitle;
  const whyChooseCards = activeData.whyCards;

  const capabilitiesTitle = activeData.capabilitiesTitle;
  const capabilitiesSubtitle = activeData.capabilitiesSubtitle;
  const capabilities = activeData.capabilities;

  const processTitle = activeData.processTitle;
  const processDesc = activeData.processDesc;
  const processSteps = activeData.processSteps;

  useEffect(() => {
    const handleScroll = () => {
      if (!processSectionRef.current) return;
      const rect = processSectionRef.current.getBoundingClientRect();
      const sectionHeight = processSectionRef.current.clientHeight - window.innerHeight;
      if (sectionHeight <= 0) return;
      
      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
      setProcessProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const shouldScroll = location.hash === '#contact' || location.state?.scrollToContact || window.location.hash === '#contact';
    if (shouldScroll) {
      const contactEl = document.getElementById('contact') || document.getElementById('cta');
      if (contactEl) {
        if (window.lenis) {
          window.lenis.scrollTo(contactEl, { duration: 1.2 });
        } else {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Update Capabilities slider arrow state on scroll
  const updateScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, []);

  const handlePrevCapability = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -412, behavior: 'smooth' });
    }
  };

  const handleNextCapability = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 412, behavior: 'smooth' });
    }
  };

  // Capabilities Drag Event Handlers
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftPos(carouselRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    carouselRef.current.scrollLeft = scrollLeftPos - walk;
  };

  // Testimonials Slider Navigation Controls
  const handlePrevTestimonial = () => {
    if (testimonialRef.current) {
      testimonialRef.current.scrollBy({ left: -460, behavior: 'smooth' });
    }
  };

  const handleNextTestimonial = () => {
    if (testimonialRef.current) {
      testimonialRef.current.scrollBy({ left: 460, behavior: 'smooth' });
    }
  };

  // Testimonials Drag Event Handlers
  const handleTestimonialMouseDown = (e) => {
    if (!testimonialRef.current) return;
    setIsTestimonialMouseDown(true);
    setTestimonialStartX(e.pageX - testimonialRef.current.offsetLeft);
    setTestimonialScrollPos(testimonialRef.current.scrollLeft);
  };

  const handleTestimonialMouseLeaveOrUp = () => {
    setIsTestimonialMouseDown(false);
  };

  const handleTestimonialMouseMove = (e) => {
    if (!isTestimonialMouseDown || !testimonialRef.current) return;
    e.preventDefault();
    const x = e.pageX - testimonialRef.current.offsetLeft;
    const walk = (x - testimonialStartX) * 1.6;
    testimonialRef.current.scrollLeft = testimonialScrollPos - walk;
  };

  const scrollToContactForm = (e) => {
    e?.preventDefault();
    const target = document.getElementById('contact') || document.getElementById('cta');
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Tilted Card Fly-Off Rotation Calculation for Process Breakdown
  const getCardTransformStyle = (idx) => {
    const progress = processProgress;
    
    // Card 0 (Idea Validation): rotates -28deg and flies off upward
    if (idx === 0) {
      if (progress <= 0.05) return { transform: 'rotate(0deg) translateY(0)', opacity: 1 };
      if (progress >= 0.28) return { transform: 'rotate(-28deg) translateY(-140%)', opacity: 0 };
      const p = (progress - 0.05) / 0.23;
      return {
        transform: `rotate(${-28 * p}deg) translateY(${-140 * p}%)`,
        opacity: 1 - p * 0.9
      };
    }
    
    // Card 1 (Innovation and Development): rotates +25deg and flies off upward
    if (idx === 1) {
      if (progress <= 0.28) return { transform: 'rotate(0deg) translateY(0)', opacity: 1 };
      if (progress >= 0.55) return { transform: 'rotate(25deg) translateY(-140%)', opacity: 0 };
      const p = (progress - 0.28) / 0.27;
      return {
        transform: `rotate(${25 * p}deg) translateY(${-140 * p}%)`,
        opacity: 1 - p * 0.9
      };
    }

    // Card 2 (Software Testing): rotates -22deg and flies off upward
    if (idx === 2) {
      if (progress <= 0.55) return { transform: 'rotate(0deg) translateY(0)', opacity: 1 };
      if (progress >= 0.80) return { transform: 'rotate(-22deg) translateY(-140%)', opacity: 0 };
      const p = (progress - 0.55) / 0.25;
      return {
        transform: `rotate(${-22 * p}deg) translateY(${-140 * p}%)`,
        opacity: 1 - p * 0.9
      };
    }

    // Card 3 (Project Governance): stays centered
    return { transform: 'rotate(0deg) translateY(0)', opacity: 1 };
  };

  const isServicesOverview = location.pathname === '/services' || location.pathname === '/services/';

  if (isServicesOverview) {
    return (
      <div style={{ background: '#F5F5F6', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#000000' }}>
        <Navbar />

        {/* Hero & Services Category Overview Section matching screenshots */}
        <section className="services-overview-section" style={{ paddingTop: '160px', paddingBottom: '100px', paddingLeft: 'clamp(1.5rem, 5vw, 5rem)', paddingRight: 'clamp(1.5rem, 5vw, 5rem)', background: '#F5F5F6' }}>
          <style>{`
            @media (max-width: 991px) {
              .services-overview-section {
                padding-top: 100px !important;
                padding-bottom: 60px !important;
              }
              .services-overview-grid {
                grid-template-columns: 1fr !important;
                gap: 1.5rem !important;
                margin-bottom: 2rem !important;
                padding-bottom: 0 !important;
              }
              .services-overview-divider {
                margin: 2rem 0 !important;
              }
            }
            @media (max-width: 767px) {
              .services-overview-section {
                padding-top: 90px !important;
                padding-bottom: 50px !important;
                padding-left: 18px !important;
                padding-right: 18px !important;
              }
              .services-overview-grid {
                margin-bottom: 1.75rem !important;
                padding-bottom: 1.75rem !important;
              }
              .services-overview-divider {
                margin: 1.75rem 0 !important;
              }
              .services-overview-grid h1 {
                font-size: clamp(1.6rem, 6vw, 2.2rem) !important;
              }
              .services-overview-grid h2 {
                font-size: 1.85rem !important;
              }
            }
          `}</style>
          <div style={{ maxWidth: '1656px', margin: '0 auto' }}>
            
            {/* Top Hero Header Block */}
            <div className="services-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start', marginBottom: '5rem' }}>
              <div>
                <h1 style={{ fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)', fontWeight: 400, lineHeight: 1.1, color: '#000000', margin: 0, letterSpacing: '-0.025em' }}>
                  Services that design, build, and scale digital experiences for ambitious brands.
                </h1>
              </div>
              <div>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#52525B', margin: '0 0 2.25rem', fontWeight: 400 }}>
                  We design and build digital products that combine clarity, performance, and craftsmanship. From custom software to high-performance websites and Shopify storefronts, we create systems that scale and deliver results. Every solution is engineered for speed, flexibility, and measurable impact. Built to last and built to grow.
                </p>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '0.6rem', alignItems: 'center', flexWrap: 'nowrap' }}>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById('contact');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#FF470A',
                      color: '#ffffff',
                      height: '44px',
                      padding: '0 1.25rem',
                      borderRadius: '9999px',
                      fontSize: 'clamp(0.85rem, 3.6vw, 0.95rem)',
                      fontWeight: 500,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 14px rgba(255, 71, 10, 0.3)',
                      transition: 'transform 0.2s ease, background-color 0.2s ease'
                    }}
                  >
                    Contact us
                  </a>
                  <Link
                    to="/projects"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#E4E4E7',
                      color: '#18181B',
                      height: '44px',
                      padding: '0 1.25rem',
                      borderRadius: '9999px',
                      fontSize: 'clamp(0.85rem, 3.6vw, 0.95rem)',
                      fontWeight: 500,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    See our work
                  </Link>
                </div>
              </div>
            </div>

            <div className="services-overview-divider" style={{ height: '1px', background: '#E4E4E7', margin: '0 0 5rem' }} />

            {/* CATEGORY 1: Design */}
            <div className="services-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start', paddingBottom: '5rem', borderBottom: '1px solid #E4E4E7', marginBottom: '5rem' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#000000', margin: '0 0 1.25rem' }}>
                  Design
                </h2>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#52525B', maxWidth: '480px', margin: 0, fontWeight: 400 }}>
                  We create compelling brand identities, intuitive UI/UX, and dynamic motion graphics. Our design approach blends visual craft with strategy to ensure every detail elevates your brand and engages your audience.
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#71717A', display: 'block', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
                  EXPERTISE
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { label: 'Branding', path: '/services/branding' },
                    { label: 'UI/UX', path: '/services/ui-ux' },
                    { label: 'Graphic Design', path: '/services/graphic-design' },
                    { label: 'Motion Graphics', path: '/services/motion-graphics' }
                  ].map((item, idx) => (
                    <Link 
                      key={idx} 
                      to={item.path}
                      style={{ 
                        padding: '1.1rem 0', 
                        borderBottom: '1px solid #E4E4E7', 
                        fontSize: '1.1rem', 
                        fontWeight: 400, 
                        color: '#000000',
                        textDecoration: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* CATEGORY 2: Develop */}
            <div className="services-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start', paddingBottom: '5rem', borderBottom: '1px solid #E4E4E7', marginBottom: '5rem' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#000000', margin: '0 0 1.25rem' }}>
                  Design
                </h2>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#52525B', maxWidth: '480px', margin: 0, fontWeight: 400 }}>
                  We create compelling brand identities, intuitive UI/UX, and dynamic motion graphics. Our design approach blends visual craft with strategy to ensure every detail elevates your brand and engages your audience.
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#71717A', display: 'block', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
                  EXPERTISE
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { label: 'Branding', path: '/services/branding' },
                    { label: 'UI/UX', path: '/services/ui-ux' },
                    { label: 'Graphic Design', path: '/services/graphic-design' },
                    { label: 'Motion Graphics', path: '/services/motion-graphics' }
                  ].map((item, idx) => (
                    <Link 
                      key={idx} 
                      to={item.path}
                      style={{ 
                        padding: '1.1rem 0', 
                        borderBottom: '1px solid #E4E4E7', 
                        fontSize: '1.1rem', 
                        fontWeight: 400, 
                        color: '#000000',
                        textDecoration: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* CATEGORY 2: Develop */}
            <div className="services-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start', paddingBottom: '5rem', borderBottom: '1px solid #E4E4E7', marginBottom: '5rem' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#000000', margin: '0 0 1.25rem' }}>
                  Develop
                </h2>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#52525B', maxWidth: '480px', margin: 0, fontWeight: 400 }}>
                  We engineer custom software, high-performing websites, mobile apps, and eCommerce platforms. From Webflow and Shopify to full-stack applications, we build fast, scalable digital products engineered for growth.
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#71717A', display: 'block', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
                  EXPERTISE
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { label: 'Software Development', path: '/services/software-development' },
                    { label: 'Web Development', path: '/services/web-development' },
                    { label: 'Mobile Apps', path: '/services/mobile-apps' },
                    { label: 'Shopify', path: '/services/shopify' },
                    { label: 'Webflow', path: '/services/webflow' }
                  ].map((item, idx) => (
                    <Link 
                      key={idx} 
                      to={item.path}
                      style={{ 
                        padding: '1.1rem 0', 
                        borderBottom: '1px solid #E4E4E7', 
                        fontSize: '1.1rem', 
                        fontWeight: 400, 
                        color: '#000000',
                        textDecoration: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* CATEGORY 3: Marketing */}
            <div className="services-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#000000', margin: '0 0 1.25rem' }}>
                  Marketing
                </h2>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#52525B', maxWidth: '480px', margin: 0, fontWeight: 400 }}>
                  We drive brand visibility and customer acquisition through data-driven campaigns, SEO, generative AI visibility (GEO), and performance marketing that turn attention into sustainable growth.
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#71717A', display: 'block', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
                  EXPERTISE
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { label: 'SEO', path: '/services/seo' },
                    { label: 'Digital Marketing', path: '/services/digital-marketing' },
                    { label: 'Google Ads', path: '/services/google-ads' },
                    { label: 'Meta Ads', path: '/services/meta-ads' }
                  ].map((item, idx) => (
                    <Link 
                      key={idx} 
                      to={item.path}
                      style={{ 
                        padding: '1.1rem 0', 
                        borderBottom: '1px solid #E4E4E7', 
                        fontSize: '1.1rem', 
                        fontWeight: 400, 
                        color: '#000000',
                        textDecoration: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        <Form />
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: '#F5F5F6', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#000000' }}>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .fireart-call-pill {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          height: 64px;
          background: #323234;
          color: #ffffff;
          padding: 4px 28px 4px 4px;
          border-radius: 120px;
          text-decoration: none;
          font-weight: 500;
          font-size: 18px;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        .fireart-call-pill:hover {
          background: #FF470A;
        }
        .fireart-call-pill img {
          height: 56px;
          width: auto;
          border-radius: 120px;
          object-fit: contain;
        }

        /* 1:1 Fireart Pill Button (Book a Call & I Want to Chat) */
        .fireart-btn-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 170px;
          height: 56px;
          font-family: "Inter", sans-serif !important;
          font-size: 16px;
          line-height: 22px;
          color: #ffffff;
          font-weight: 500;
          letter-spacing: -0.01em;
          text-align: center;
          text-decoration: none;
          padding: 14px 60px 14px 24px;
          border-radius: 120px;
          background-color: #FF470A;
          transition: all 0.3s ease;
          box-sizing: border-box;
          white-space: nowrap;
        }
        .fireart-btn-link:hover {
          background-color: #e43f08;
        }
        /* Stationary Circle Icon Container */
        .fireart-btn-link-icon {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 48px;
          height: 48px;
          background-color: rgba(255, 255, 255, 0.45);
          border-radius: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        /* ONLY Arrow SVG moves on hover */
        .fireart-btn-arrow-svg {
          transition: transform 0.3s ease;
        }
        .fireart-btn-link:hover .fireart-btn-arrow-svg {
          transform: translateX(4px);
        }

        /* 1:1 Fireart Navigation Arrow Buttons (< and >) */
        .fireart-nav-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 100%;
          background-color: #323234;
          color: #ffffff;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .fireart-nav-btn:hover:not(:disabled) {
          background-color: #FF470A;
        }
        .fireart-nav-btn:disabled {
          background-color: #EDEDED !important;
          color: #464554 !important;
          cursor: default;
        }

        /* Horizontal Carousel Styles for Cards 01 to 08 */
        .capabilities-carousel-container {
          display: flex;
          gap: 32px;
          overflow-x: auto;
          padding-bottom: 24px;
          user-select: none;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .capabilities-carousel-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        .capability-card {
          scroll-snap-align: start;
          background: #ffffff;
          border-radius: 16px;
          padding: 32px 32px;
          width: 380px;
          min-width: 380px;
          max-width: 380px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-sizing: border-box;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: all 0.3s ease;
        }
        .capability-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.07);
        }

        .capability-card-number {
          font-family: 'Inter', sans-serif !important;
          font-size: 20px;
          line-height: 26px;
          color: #FF470A;
          font-weight: 500;
        }

        .capability-card-separator {
          width: 100%;
          height: 1px;
          background-color: #EDEDED;
        }

        .capability-card-title {
          font-size: 24px;
          line-height: 30px;
          color: #000000;
          font-weight: 400;
          margin: 0 0 12px;
        }

        .capability-card-desc {
          font-size: 15px;
          line-height: 22px;
          color: #464554;
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        
        .why-card-item {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }

        /* Case Studies Subcards Hover Effects */
        .case-study-subcard:hover .case-study-img-zoom {
          transform: scale(1.03);
        }
        .case-study-subcard:hover .case-study-title {
          color: #FF470A !important;
        }

        /* Testimonials Slider Styles */
        .testimonials-slider-container {
          display: flex;
          gap: 28px;
          overflow-x: auto;
          padding-bottom: 24px;
          user-select: none;
          scrollbar-width: none;
          -ms-overflow-style: none;
          align-items: stretch;
        }
        .testimonials-slider-container::-webkit-scrollbar {
          display: none;
        }

        .testimonial-slider-card {
          flex-shrink: 0;
          background: #323234;
          border-radius: 20px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
          transition: transform 0.3s ease;
        }

        .testimonial-nav-pill-btn {
          background: #ffffff;
          color: #000000;
          border: none;
          padding: 14px 28px;
          border-radius: 120px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .testimonial-nav-pill-btn:hover {
          background: #FF470A;
          color: #ffffff;
        }

        .tech-grid-item {
          background: #EDEDED;
          border-radius: 8px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .tech-grid-item:hover {
          transform: translateY(-4px);
          background: #ffffff;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
        }

        .faq-accordion-row {
          border-bottom: 1px solid #E5E5E5;
          padding: 20px 0;
          cursor: pointer;
        }

        @media (max-width: 991px) {
          .service-detail-section {
            padding-top: 60px !important;
            padding-bottom: 60px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .why-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .why-container-grid { grid-template-columns: 1fr !important; }
          .case-study-featured-card { grid-template-columns: 1fr !important; padding: 24px !important; }
          .case-studies-subgrid { grid-template-columns: 1fr !important; }
          .capability-card { width: min(85vw, 340px) !important; min-width: min(85vw, 340px) !important; max-width: min(85vw, 340px) !important; padding: 24px 24px !important; }
          .testimonial-slider-card { width: min(85vw, 340px) !important; min-width: min(85vw, 340px) !important; max-width: min(85vw, 340px) !important; padding: 24px !important; }
          .service-hero-section { padding-top: 100px !important; padding-bottom: 50px !important; }
          .tech-stack-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }

        @media (max-width: 767px) {
          .service-detail-section {
            padding-top: 45px !important;
            padding-bottom: 45px !important;
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
          .why-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .why-card-item {
            padding: 22px 18px !important;
            border-radius: 14px !important;
          }
          .why-card-item h3 {
            font-size: 1.15rem !important;
            margin-bottom: 6px !important;
          }
          .why-card-item div {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
          .capability-card { 
            width: min(88vw, 290px) !important; 
            min-width: min(88vw, 290px) !important; 
            max-width: min(88vw, 290px) !important; 
            padding: 20px 18px !important; 
            border-radius: 14px !important;
          }
          .capability-card-title {
            font-size: 1.15rem !important;
            line-height: 1.3 !important;
            margin-bottom: 8px !important;
          }
          .capability-card-desc {
            font-size: 0.88rem !important;
            line-height: 1.45 !important;
          }
          .testimonial-slider-card { 
            width: min(88vw, 300px) !important; 
            min-width: min(88vw, 300px) !important; 
            max-width: min(88vw, 300px) !important; 
            padding: 20px !important; 
            border-radius: 16px !important;
          }
          .hero-heading { 
            font-size: clamp(1.5rem, 5.8vw, 2rem) !important; 
            line-height: 1.2 !important; 
            margin-bottom: 14px !important;
          }
          .section-heading-title { 
            font-size: clamp(1.3rem, 5.2vw, 1.7rem) !important; 
            line-height: 1.25 !important; 
            margin-bottom: 12px !important;
          }
          .fireart-call-pill { 
            height: 48px !important;
            font-size: 14px !important; 
            padding: 4px 18px 4px 4px !important; 
          }
          .fireart-call-pill img { 
            width: 40px !important; 
            height: 40px !important; 
          }
          .fireart-btn-link {
            height: 44px !important;
            min-width: 140px !important;
            font-size: 14px !important;
            padding: 10px 48px 10px 18px !important;
          }
          .fireart-btn-link-icon {
            width: 36px !important;
            height: 36px !important;
            top: 4px !important;
            right: 4px !important;
          }
          .fireart-nav-btn {
            width: 44px !important;
            height: 44px !important;
          }
          .tech-stack-grid { 
            grid-template-columns: repeat(2, 1fr) !important; 
            gap: 10px !important; 
          }
          .service-hero-section { 
            padding-top: 90px !important; 
            padding-bottom: 40px !important; 
            padding-left: 18px !important; 
            padding-right: 18px !important; 
          }
          .service-hero-mockup { 
            height: 240px !important; 
          }
          .faq-question-title { 
            font-size: 15px !important; 
          }
          .process-stack-card { 
            padding: 22px 18px !important; 
            border-radius: 18px !important;
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (`hero-with-images`)                                      */}
      {/* ========================================================================= */}
      <section className="service-hero-section" style={{ paddingTop: '140px', paddingBottom: '70px', paddingLeft: 'clamp(16px, 6vw, 132px)', paddingRight: 'clamp(16px, 6vw, 132px)', background: '#F5F5F6' }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>
          
          <div style={{ maxWidth: '980px', marginBottom: '32px' }}>
            <h1 className="hero-heading" style={{ fontSize: 'clamp(36px, 4.2vw, 60px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px', color: '#000000' }}>
              {getHeroTitle()}
            </h1>

            <p style={{ fontSize: 'clamp(16px, 1.6vw, 20px)', lineHeight: 1.4, color: '#76757F', fontWeight: 500, margin: 0, maxWidth: '860px' }}>
              {getHeroDesc()}
            </p>
          </div>

          {/* Pill Button & Clutch Rating (Full Width - Clutch Rating at Far Right End) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
            <a href="#contact" onClick={scrollToContactForm} className="fireart-call-pill">
              <img 
                src="https://fireart.studio/wp-content/uploads/2025/11/book-a-call-with-a-team-fireart-2x.png" 
                alt="Fireart Team" 
              />
              <span>Book a call with a team</span>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
              <img 
                src="https://fireart.studio/wp-content/uploads/2025/06/clutch-co-vector-logo-1-1.svg" 
                alt="Clutch" 
                style={{ height: '18px', width: 'auto' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '16px', fontWeight: 500, color: '#464554' }}>
                <Star size={16} fill="#FF470A" color="#FF470A" />
                <span>4.9</span>
                <span style={{ fontSize: '15px', color: '#464554', fontWeight: 400 }}>38 reviews</span>
              </div>
            </div>
          </div>

          {/* Hero Banner Mockup with Floating Testimonial Chat Bubble */}
          <div className="service-hero-mockup" style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', height: 'clamp(320px, 46vh, 540px)', background: '#EDEDED' }}>
            <img 
              src={location.pathname.includes('mobile-app-development') ? "https://fireart.studio/wp-content/uploads/2025/06/frame-2087325532.png" : "https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg"} 
              alt="Fireart Mockup" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />


          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHY CHOOSE FIREART STUDIO FOR YOUR WEB DEVELOPMENT PROJECT            */}
      {/* ========================================================================= */}
      <section className="service-detail-section" style={{ padding: '100px clamp(16px, 6vw, 132px)', background: '#F5F5F6' }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ maxWidth: '940px' }}>
              <h2 className="section-heading-title" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 20px', color: '#000000' }}>
                {whyTitle}
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.5, color: '#464554', fontWeight: 500, margin: 0 }}>
                {whySubtitle}
              </p>
            </div>

            <a href="#contact" onClick={scrollToContactForm} className="fireart-btn-link">
              <span>I want to chat</span>
              <div className="fireart-btn-link-icon">
                <ArrowRight size={20} color="#ffffff" className="fireart-btn-arrow-svg" />
              </div>
            </a>
          </div>

          {/* Cards only (image removed) */}
          <div className="why-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }}>
            {whyChooseCards.map((card, idx) => (
              <div key={idx} className="why-card-item">
                <h3 style={{ fontSize: '24px', fontWeight: 400, margin: '0 0 8px', color: '#000000', lineHeight: 1.25 }}>
                  {card.title}
                </h3>
                <div style={{ fontSize: '15px', lineHeight: 1.45, color: '#464554', fontWeight: 400, letterSpacing: '-0.01em' }}>
                  {card.content}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CAPABILITIES CAROUSEL SECTION (`mobile-app-section`)                   */}
      {/* ========================================================================= */}
      <section className="service-detail-section" style={{ padding: '100px clamp(16px, 6vw, 132px)', background: '#F5F5F6', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ maxWidth: '940px' }}>
              <h2 className="section-heading-title" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 20px', color: '#000000' }}>
                  {capabilitiesTitle}
              </h2>
              <p style={{ fontSize: '20px', lineHeight: 1.4, color: '#76757F', fontWeight: 500, margin: 0 }}>
                {capabilitiesSubtitle}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <a href="#contact" onClick={scrollToContactForm} className="fireart-btn-link">
                <span>Book a call</span>
                <div className="fireart-btn-link-icon">
                  <ArrowRight size={20} color="#ffffff" className="fireart-btn-arrow-svg" />
                </div>
              </a>

              {/* Slider Arrow Navigation Controls */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={handlePrevCapability}
                  disabled={!canScrollLeft}
                  className="fireart-nav-btn"
                >
                  <ChevronLeft size={22} />
                </button>

                <button 
                  onClick={handleNextCapability}
                  disabled={!canScrollRight}
                  className="fireart-nav-btn"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* Capability Cards Horizontal Slider Container (Cards 01 to 08 with Mouse Drag) */}
          <div 
            ref={carouselRef} 
            onScroll={updateScrollState}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className="capabilities-carousel-container"
          >
            {capabilities.map((item) => (
              <div key={item.id} className="capability-card">
                <div className="capability-card-number">
                  {item.id}
                </div>
                <div className="capability-card-separator" />
                <div>
                  <h3 className="capability-card-title">
                    {item.title}
                  </h3>
                  <div className="capability-card-desc">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

         {/* ========================================================================= */}
      {/* 5. PROCESS BREAKDOWN SECTION                                              */}
      {/* ========================================================================= */}
      {location.pathname.includes('mobile-app-development') ? (
        <section style={{ padding: '100px clamp(16px, 6vw, 132px)', background: '#F5F5F6' }}>
          <div style={{ maxWidth: '1656px', margin: '0 auto' }}>
            
            {/* Heading & Subtitle Row with Manual Scroller Arrows */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
              <div style={{ maxWidth: '980px' }}>
                <h2 className="section-heading-title" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 20px', color: '#000000' }}>
                  Mobile App Development Process
                </h2>
                <p style={{ fontSize: '18px', lineHeight: 1.5, color: '#76757F', fontWeight: 500, margin: 0 }}>
                  We provide both iOS and Android platform-specific mobile development services and mobile app development consulting. We collaborate with you to hone your idea and guarantee project success from the very first concept to a fully running app. Your mobile app development is in capable hands when you work with us.
                </p>
              </div>

              {/* Manual Scroller Arrows (< and >) */}
              <div style={{ display: 'flex', gap: '16px', flexShrink: 0 }}>
                <button 
                  onClick={handlePrevProcessTrack}
                  className="fireart-nav-btn"
                  aria-label="Previous Stage"
                >
                  <ChevronLeft size={24} color="#ffffff" />
                </button>
                <button 
                  onClick={handleNextProcessTrack}
                  className="fireart-nav-btn"
                  aria-label="Next Stage"
                >
                  <ChevronRight size={24} color="#ffffff" />
                </button>
              </div>
            </div>

            {/* Horizontal Scroll Track Wrapper for Process Timeline */}
            <div 
              ref={processTrackRef}
              onMouseDown={handleProcessMouseDown}
              onMouseLeave={handleProcessMouseUp}
              onMouseUp={handleProcessMouseUp}
              onMouseMove={handleProcessMouseMove}
              style={{ 
                overflowX: 'auto', 
                paddingBottom: '40px', 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div style={{ minWidth: '1770px', width: '1770px', position: 'relative', paddingTop: '40px', paddingBottom: '20px', boxSizing: 'border-box' }}>
                
                {/* Timeline Header Row (Stage 1 |, Stage 2 |, Stage 3 |, Stage 4 | + Ready App Badge) */}
                <div style={{ position: 'relative', width: '1640px', marginBottom: '40px' }}>
                  
                  {/* Horizontal Dashed Line (spans 0 to 1720px) */}
                  <div style={{
                    position: 'absolute',
                    top: '44px',
                    left: 0,
                    width: '1720px',
                    height: '1px',
                    borderTop: '2px dashed #C8C8D0',
                    zIndex: 1
                  }} />

                  {/* Grid for Stage Ticks (4 columns of 400px + 40px gap = 1720px total) */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 400px)', 
                    gap: '40px', 
                    position: 'relative',
                    zIndex: 2,
                    width: '1720px'
                  }}>
                    {['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'].map((stageLabel, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'relative' }}>
                        <div style={{ fontSize: '18px', color: '#464554', fontWeight: 500, marginBottom: '6px', paddingRight: '12px' }}>
                          {stageLabel}
                        </div>
                        {/* Ticks for Stage 1, 2, 3 */}
                        {idx < 3 && (
                          <div style={{ width: '1.5px', height: '20px', background: '#000000' }} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Ready App Badge & Vertical Black Line at exact right edge of Card 4 (1720px) */}
                  <div style={{
                    position: 'absolute',
                    top: '-36px',
                    left: '1720px',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 3
                  }}>
                    <div style={{
                      background: '#44434D',
                      color: '#ffffff',
                      padding: '8px 24px',
                      borderRadius: '100px',
                      fontSize: '16px',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      Ready App
                    </div>
                    {/* Vertical Line connected directly to bottom center of Ready App badge extending down right edge of Card 4 */}
                    <div style={{ width: '1.5px', height: '600px', background: '#000000', margin: 0 }} />
                  </div>

                </div>

                {/* 4 Staggered Process Cards (4 columns of 400px = 1720px total) */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 400px)', 
                  gap: '40px', 
                  width: '1720px',
                  alignItems: 'flex-start'
                }}>
                  
                  {/* Stage 1 Card */}
                  <div style={{ 
                    background: '#ffffff', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    marginTop: '0px',
                    minWidth: '400px'
                  }}>
                    <div style={{ background: '#FEE9E0', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '18px' }}>💡</span>
                      <span style={{ color: '#D4380D', fontSize: '16px', fontWeight: 600 }}>Validation of ideas</span>
                    </div>
                    <div style={{ padding: '24px 24px 28px' }}>
                      <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#464554', margin: 0, fontWeight: 400 }}>
                        We start by carefully analyzing the needs of your mobile application. This critical stage includes group discussions to choose the most promising app concepts and conduct a detailed feasibility analysis. We create a solid project strategy that is aimed at long-term success in the mobile industry.
                      </p>
                    </div>
                  </div>

                  {/* Stage 2 Card (Staggered Down) */}
                  <div style={{ 
                    background: '#ffffff', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    marginTop: '48px',
                    minWidth: '400px'
                  }}>
                    <div style={{ background: '#EEF0FD', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '15px', color: '#4338CA' }}>&lt;/&gt;</span>
                      <span style={{ color: '#4338CA', fontSize: '16px', fontWeight: 600 }}>Innovation & development</span>
                    </div>
                    <div style={{ padding: '24px 24px 28px' }}>
                      <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#464554', margin: 0, fontWeight: 400 }}>
                        Our skilled mobile development team is excellent at creating custom mobile solutions that precisely match your requirements. We use the newest frameworks and technologies to create an impressive application, even leveraging creative fixes for any gaps in your current IT setup.
                      </p>
                    </div>
                  </div>

                  {/* Stage 3 Card (Staggered Down Further) */}
                  <div style={{ 
                    background: '#ffffff', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    marginTop: '96px',
                    minWidth: '400px'
                  }}>
                    <div style={{ background: '#D4F5F5', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '18px' }}>🔍</span>
                      <span style={{ color: '#0D7E7E', fontSize: '16px', fontWeight: 600 }}>Software testing</span>
                    </div>
                    <div style={{ padding: '24px 24px 28px' }}>
                      <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#464554', margin: 0, fontWeight: 400 }}>
                        We use a thorough testing procedure to ensure the quality and usability of your mobile application. This includes software quality assurance and testing to verify functionality, performance, and adherence to standards. We also do user acceptance testing and identify areas for improvement.
                      </p>
                    </div>
                  </div>

                  {/* Stage 4 Card (Staggered Down Deepest) */}
                  <div style={{ 
                    background: '#ffffff', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    marginTop: '144px',
                    minWidth: '400px'
                  }}>
                    <div style={{ background: '#E6F8ED', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '18px' }}>👍</span>
                      <span style={{ color: '#15803D', fontSize: '16px', fontWeight: 600 }}>Project governance</span>
                    </div>
                    <div style={{ padding: '24px 24px 28px' }}>
                      <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#464554', margin: 0, fontWeight: 400 }}>
                        This step ensures that your mobile app launches smoothly and continues to succeed. It comprises a single point of contact, well-defined roles and duties, and total transparency in issue management and resolution in a collaborative atmosphere.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>
      ) : (
        <section 
          ref={processSectionRef} 
          style={{ 
            position: 'relative', 
            height: '280vh', 
            background: '#F5F5F6' 
          }}
        >
          <div style={{ 
            position: 'sticky', 
            top: 0, 
            height: '100vh', 
            overflow: 'hidden', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '0 clamp(16px, 6vw, 132px)',
            boxSizing: 'border-box'
          }}>
            
            {/* Pinned Stationary Header */}
            <div style={{ textAlign: 'center', maxWidth: '940px', margin: '0 auto 20px', zIndex: 1 }}>
              <h2 className="section-heading-title" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 16px', color: '#000000' }}>
                {processTitle}
              </h2>
              <p style={{ fontSize: '18px', lineHeight: 1.45, color: '#76757F', fontWeight: 500, margin: 0 }}>
                {processDesc}
              </p>
            </div>

            {/* Centered Cards Stack Box (Cards rotate and fly off sideways on scroll) */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '580px', height: '360px', margin: '10px auto 0' }}>
              {processSteps.map((step, idx) => {
                const IconC = step.icon;
                const cardAnimStyle = getCardTransformStyle(idx);
                return (
                  <div 
                    key={step.id} 
                    className="process-stack-card"
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      margin: '0 auto', 
                      width: '100%', 
                      height: '100%',
                      minHeight: '340px',
                      background: '#ffffff', 
                      borderRadius: '24px', 
                      padding: '36px 40px', 
                      boxShadow: '0 16px 50px rgba(0,0,0,0.07)', 
                      zIndex: 10 - idx, 
                      border: '1px solid rgba(0,0,0,0.05)',
                      transformOrigin: 'bottom center',
                      willChange: 'transform, opacity',
                      transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.15s ease',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      ...cardAnimStyle
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255, 71, 10, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconC size={26} color="#FF470A" />
                      </div>
                      <span style={{ fontSize: '18px', fontWeight: 600, color: '#FF470A' }}>{step.id}</span>
                    </div>

                    <h3 style={{ fontSize: '26px', fontWeight: 400, margin: '0 0 14px', color: '#000000', lineHeight: 1.25 }}>
                      {step.title}
                    </h3>

                    <p style={{ fontSize: '15px', lineHeight: 1.5, color: '#464554', margin: 0, fontWeight: 400 }}>
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 8. CLUTCH TESTIMONIALS CAROUSEL SLIDER SECTION (`clutch-testimonials`)    */}
      {/* ========================================================================= */}
      <section style={{ padding: '100px 0', background: '#19191A', color: '#ffffff', overflow: 'hidden' }}>
        {/* Header Area Container */}
        <div style={{ maxWidth: '1656px', margin: '0 auto', padding: '0 clamp(16px, 6vw, 132px)', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '44px', flexWrap: 'wrap', gap: '24px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 2.8vw, 42px)', fontWeight: 400, lineHeight: 1.18, letterSpacing: '-0.02em', margin: 0, color: '#ffffff', maxWidth: '620px' }}>
              Great partnerships, exceptional outcomes—see what our clients say.
            </h2>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={handlePrevTestimonial}
                className="testimonial-nav-pill-btn"
              >
                Previous
              </button>
              <button 
                onClick={handleNextTestimonial}
                className="testimonial-nav-pill-btn"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Testimonial Cards Horizontal Carousel Slider */}
        <div 
          ref={testimonialRef}
          onMouseDown={handleTestimonialMouseDown}
          onMouseLeave={handleTestimonialMouseLeaveOrUp}
          onMouseUp={handleTestimonialMouseLeaveOrUp}
          onMouseMove={handleTestimonialMouseMove}
          className="testimonials-slider-container"
          style={{ 
            paddingLeft: 'clamp(16px, 6vw, 132px)',
            paddingRight: 'clamp(16px, 6vw, 132px)',
            boxSizing: 'border-box'
          }}
        >
          {testimonials.map((item) => (
            <div 
              key={item.id} 
              className="testimonial-slider-card"
              style={{
                flexShrink: 0,
                width: item.type === 'rating' ? '360px' : '440px',
                minWidth: item.type === 'rating' ? '360px' : '440px',
                maxWidth: item.type === 'rating' ? '360px' : '440px',
                background: '#323234',
                borderRadius: '20px',
                padding: '36px 36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: '24px',
                boxSizing: 'border-box'
              }}
            >
              {/* Rating Card (4.9 Clutch Rating) */}
              {item.type === 'rating' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px', textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ fontSize: '92px', fontWeight: 400, lineHeight: 1, color: '#ffffff' }}>{item.rating}</div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill="#E62515" color="#E62515" />
                      ))}
                    </div>

                    <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: 400 }}>{item.reviewCount}</div>

                    <img 
                      src="https://fireart.studio/wp-content/uploads/2025/06/clutch-co-vector-logo-1.svg" 
                      alt="Clutch Logo" 
                      style={{ width: '110px', height: '32px', marginTop: '6px' }}
                    />
                  </div>
                </div>
              )}

              {/* Text Quote Card */}
              {item.type === 'text' && (
                <>
                  <div style={{ fontSize: '18px', lineHeight: 1.4, color: '#ffffff', fontWeight: 400 }}>
                    “{item.quote}”
                  </div>

                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 500, color: '#ffffff' }}>{item.name}</div>
                    <div style={{ fontSize: '13px', color: '#BFBEC9', fontWeight: 400, marginTop: '4px' }}>{item.role}</div>
                  </div>
                </>
              )}

              {/* Image Quote Card (image removed — quote only) */}
              {item.type === 'image' && (
                <>
                  <div style={{ fontSize: '18px', lineHeight: 1.4, color: '#ffffff', fontWeight: 400 }}>
                    “{item.quote}”
                  </div>

                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 500, color: '#ffffff' }}>{item.name}</div>
                    <div style={{ fontSize: '13px', color: '#BFBEC9', fontWeight: 400, marginTop: '4px' }}>{item.role}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FREQUENTLY ASKED QUESTIONS SECTION (`faq_section`)                     */}
      {/* ========================================================================= */}
      <section className="service-detail-section" style={{ padding: '100px clamp(16px, 6vw, 132px)', background: '#F5F5F6' }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>
          
          <h2 className="section-heading-title" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 40px', color: '#000000' }}>
            Frequently Asked Questions
          </h2>

          <div>
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="faq-accordion-row" onClick={() => setOpenFaqIndex(isOpen ? null : idx)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                    <h3 className="faq-question-title" style={{ fontSize: '20px', fontWeight: 500, margin: 0, color: isOpen ? '#FF470A' : '#000000', transition: 'color 0.3s' }}>
                      {faq.q}
                    </h3>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: isOpen ? '#323234' : '#ffffff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      flexShrink: 0,
                      transition: 'all 0.3s ease'
                    }}>
                      {isOpen ? <ArrowUp size={18} color="#ffffff" /> : <ArrowDown size={18} color="#000000" />}
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ marginTop: '16px', fontSize: '16px', lineHeight: 1.45, color: '#464554' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* FAQ Footer Callout */}
          <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '20px', fontWeight: 500, color: '#000000' }}>
              Ready to unlock the power of team augmentation?
            </div>
            <a href="#contact" onClick={scrollToContactForm} style={{ color: '#FF470A', fontSize: '20px', fontWeight: 500, textDecoration: 'underline' }}>
              Let’s go!
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CONTACT FORM & FOOTER                                                 */}
      {/* ========================================================================= */}
      <Form />
      <Footer />
    </div>
  );
}
