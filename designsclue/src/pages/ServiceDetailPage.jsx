import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Re-exported for use by other components (e.g., Services.jsx)
export function slugify(text) {
  return text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
}

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Form from '../components/Form.jsx';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── SERVICE DATA ────────────────────────────────────────────────────────────
const serviceData = {
  'web-development': {
    title: 'Web Development Services',
    subtitle: 'Fireart provides end-to-end web development services to build web platforms, applications, and websites. Our code is so clean that the only bugs we tolerate are the spiders spinning webs in our server room.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg',
    heroTestimonial: {
      name: 'Matthew Jewell',
      role: 'VP of FloSport',
      text: 'The tight partnership with Fireart Studio has helped us create better projects and products.',
    },
    capabilitiesTitle: 'Our web development solutions',
    capabilitiesSubtitle: 'What you get: your product on the web just like you imagined.',
    capabilities: [
      { id: '01', title: 'Project scope definition', desc: 'We can help you define the scope, advise on the features and architecture for your web page development, and define deliverables and budget allocations.' },
      { id: '02', title: 'Custom web development', desc: 'Stop settling for a basic site when you can have a high-performance growth engine built by an elite web development team.' },
      { id: '03', title: 'Post-launch support', desc: 'For most clients, launching is just the beginning of our journey together. We are the team that will stay beside you to help with any necessary updates and build-ups.' },
      { id: '04', title: 'Custom web design', desc: 'What makes you different? We make sure that your brand\'s image adds to the user\'s experience when using your website.' },
      { id: '05', title: 'Website maintenance & support', desc: 'We always have your back, from security to website support. With our web development team\'s support, you can always make your service look awesome.' },
      { id: '06', title: 'CMS implementation', desc: 'We help you take full ownership of your content with powerful CMS solutions that are easy to use and hard to break.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Discovery & Planning', icon: '🔍', desc: 'We start by understanding your business goals, target audience, and technical requirements. We define the product scope, create a roadmap, and establish milestones.' },
      { stage: 'Stage 2', title: 'Design & Architecture', icon: '🎨', desc: 'Our designers create wireframes and visual designs while our architects plan the technical structure, ensuring scalability, security, and performance from day one.' },
      { stage: 'Stage 3', title: 'Development & Testing', icon: '💻', desc: 'We build your product in sprints with continuous code reviews and automated testing. Every feature is tested rigorously before it advances to the next stage.' },
      { stage: 'Stage 4', title: 'Launch & Support', icon: '🚀', desc: 'We deploy your product and monitor its performance closely. Post-launch, we stay with you to address feedback, push updates, and optimize conversion.' },
    ],
    whyTitle: 'Why Choose Fireart Studio for your web development project',
    whySubtitle: 'We believe web development is about user experiences, solving complex problems, and building things that matter.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: '100+', desc: 'Web projects delivered successfully across all industries.' },
      { stat: '4.9★', desc: 'Clutch rating based on 38 verified client reviews.' },
      { stat: '10+', desc: 'Years of combined team experience in modern web technologies.' },
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'Next.js', 'Vue.js', 'PostgreSQL', 'AWS', 'Docker'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/python-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/aws-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/google-cloud-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/ruby-on-rails-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/java.svg',
    ],
  },
  'mobile-app-development': {
    title: 'Mobile App Development As You Want It',
    subtitle: 'Mobile development with Fireart is the proven way to get your product in your customers\' pockets.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087325532.png',
    heroTestimonial: {
      name: 'JJ Oslund',
      role: 'CEO at Rapchat',
      text: 'Fireart delivered a polished, high-quality app on time, every time. Their communication was flawless.',
    },
    capabilitiesTitle: 'Our mobile app development solutions',
    capabilitiesSubtitle: 'What you get: your product on mobile just like you imagined.',
    capabilities: [
      { id: '01', title: 'Cross-Platform App Development', desc: 'Our mobile app development team does cross-platform app development, based on work with React Native and Flutter. It lets you build apps with a native-like experience on both Android and iOS.' },
      { id: '02', title: 'iOS App Development', desc: 'Let\'s break into the high-end market with iOS app development. Our mobile developers make apps work flawlessly across all iOS screens — and they make them stunning, too.' },
      { id: '03', title: 'Android App Development', desc: 'Unlock Android\'s huge user database with our app development and become the boss of the world\'s most widely used mobile OS.' },
      { id: '04', title: 'We are business-centric', desc: 'Fireart Studio has been created by Founders, for Founders. We get the business goals, we know your pains and struggles, and we keep an eye on the prize for you.' },
      { id: '05', title: 'We stay with you after the launch', desc: 'We are the team that sticks around. After your mobile app rolls out, we will stay with you to test it further, assess areas for improvements, and help with tweaks and upgrades.' },
      { id: '06', title: 'Mobile app design included', desc: 'Beautiful UI/UX is built into every app we deliver. Our designers work alongside developers to create interfaces users love at first swipe.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Requirements & prototyping', icon: '📋', desc: 'Our skilled mobile development team is excellent at creating custom mobile solutions that precisely match your requirements. We advise on features, architecture and define deliverables.' },
      { stage: 'Stage 2', title: 'Mobile app design & development', icon: '📱', desc: 'Our skilled mobile development team is excellent at creating custom mobile solutions using the newest frameworks and technologies to create an impressive application.' },
      { stage: 'Stage 3', title: 'Software testing', icon: '🔍', desc: 'We use a thorough testing procedure to ensure the quality and usability of your mobile application. This includes QA, performance testing, and user acceptance testing.' },
      { stage: 'Stage 4', title: 'Project governance', icon: '🚀', desc: 'This step ensures that your mobile app launches smoothly and continues to succeed. It comprises a single point of contact, well-defined roles and total transparency.' },
    ],
    whyTitle: 'Why Choose Fireart Studio for Mobile App Development?',
    whySubtitle: 'Give your business a one-up with Fireart\'s dedicated team of professional mobile app developers. We know the ins and outs of the most successful mobile apps.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: 'Android', desc: 'Billions of people use Android devices daily — and you can reach them with our help.' },
      { stat: 'iOS', desc: 'Get into every iPhone and iPad launch pad with our iOS app development team.' },
      { stat: 'QA', desc: 'Our QA engineers work on your app from start to finish, checking every nook and cranny.' },
    ],
    technologies: ['Swift', 'SwiftUI', 'Kotlin', 'React Native', 'Flutter', 'Firebase', 'AWS', 'Node.js'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/swift-logo-with-text.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/icons8-swiftui-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/kotlin-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/flutter-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/aws-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/android-1.svg',
    ],
  },
  'web-design': {
    title: 'Web Design Services',
    subtitle: 'We design websites that are not just beautiful — they convert. Every pixel is intentional, every interaction considered.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg',
    heroTestimonial: { name: 'Pablo Corredor', role: 'CEO at CFI', text: 'The design work from Fireart completely transformed our online presence. Our conversions increased by 40%.' },
    capabilitiesTitle: 'Our web design solutions',
    capabilitiesSubtitle: 'Design that makes your users stay, engage, and convert.',
    capabilities: [
      { id: '01', title: 'UI/UX Design', desc: 'We research your audience, map out clear user journeys, and design clean, engaging interfaces that increase engagement and boost conversions.' },
      { id: '02', title: 'Landing Page Design', desc: 'High-converting landing pages built on data-driven design principles. Every element is strategically placed to guide users toward your goal.' },
      { id: '03', title: 'Responsive Design', desc: 'Your website will look and function perfectly on every device — desktop, tablet, and mobile — without compromise.' },
      { id: '04', title: 'Design Systems', desc: 'We build scalable component libraries, style guides, and design tokens to ensure your brand stays consistent everywhere it lives.' },
      { id: '05', title: 'Interaction Design', desc: 'Micro-animations, transitions, and hover effects that make your product feel alive and premium without slowing it down.' },
      { id: '06', title: 'UX Audit', desc: 'Analyzing your existing product to identify friction points, drop-off areas, and opportunities to improve conversion and retention.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Research & Discovery', icon: '🔍', desc: 'We conduct user research, competitive analysis, and stakeholder interviews to understand your market and users\' needs before a single pixel is drawn.' },
      { stage: 'Stage 2', title: 'Wireframing', icon: '📐', desc: 'We create low-fidelity wireframes and user flow diagrams to validate structure and information architecture before moving to visual design.' },
      { stage: 'Stage 3', title: 'Visual Design', icon: '🎨', desc: 'Our designers craft pixel-perfect, on-brand visual designs with a focus on clarity, hierarchy, and conversion optimization.' },
      { stage: 'Stage 4', title: 'Handoff & Support', icon: '🚀', desc: 'We deliver developer-ready files with detailed specs, assets, and design system documentation. We stay on hand for any design questions during development.' },
    ],
    whyTitle: 'Why Choose Fireart Studio for Web Design?',
    whySubtitle: 'We\'ve designed products used by millions. Our design team combines aesthetics with strategy to deliver results.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: '200+', desc: 'Beautiful digital products designed and shipped.' },
      { stat: '4.9★', desc: 'Clutch rating from verified clients across the globe.' },
      { stat: '40%', desc: 'Average increase in conversion for redesigned products.' },
    ],
    technologies: ['Figma', 'Sketch', 'Adobe XD', 'Principle', 'Framer', 'Webflow', 'Storybook'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/icons8-swiftui-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/angular-gradient-2.png',
      'https://fireart.studio/wp-content/uploads/2025/06/python-seeklogo-1.svg',
    ],
  },
  'brand-identity': {
    title: 'Branding Services',
    subtitle: 'Build a Bold Brand That Creates Lasting Impact. Your brand is more than just a logo—it\'s the identity, personality, and promise your business makes to its customers. Strong branding helps you stand out in a competitive market, build trust, and create meaningful connections with your audience.',
    heroImage: 'https://images.unsplash.com/photo-1542744094-3a317272018a?auto=format&fit=crop&w=1400&q=80',
    capabilitiesTitle: 'What You Get',
    capabilitiesSubtitle: 'Our branding services provide everything you need to establish a powerful and memorable brand.',
    capabilities: [
      { id: '01', title: 'Brand Strategy', desc: 'Develop a clear brand vision, positioning, messaging, and value proposition that aligns with your business goals.' },
      { id: '02', title: 'Brand Identity Design', desc: 'Create a unique visual identity, including logos, typography, color palettes, icons, and design elements that represent your brand.' },
      { id: '03', title: 'Brand Messaging', desc: 'Craft compelling messaging, taglines, tone of voice, and communication guidelines that resonate with your target audience.' },
      { id: '04', title: 'Marketing Collateral', desc: 'Design professional business cards, brochures, presentations, packaging, social media assets, and promotional materials.' },
      { id: '05', title: 'Digital Brand Presence', desc: 'Maintain a consistent brand identity across websites, mobile applications, digital campaigns, and social media platforms.' },
      { id: '06', title: 'Brand Guidelines', desc: 'Develop comprehensive brand guidelines to ensure consistency across every customer touchpoint.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Discovery & Research', icon: '🔍', desc: 'We learn about your business, target audience, competitors, industry, and goals.' },
      { stage: 'Stage 2', title: 'Brand Strategy', icon: '🎯', desc: 'We define your positioning, mission, vision, personality, messaging, and unique value proposition.' },
      { stage: 'Stage 3', title: 'Identity Design', icon: '🎨', desc: 'Our creative team develops your logo, typography, color palette, imagery, and visual language.' },
      { stage: 'Stage 4', title: 'Brand Development', icon: '🛠️', desc: 'We apply your identity across digital and print assets to create a cohesive and recognizable brand.' },
      { stage: 'Stage 5', title: 'Brand Launch', icon: '🚀', desc: 'We help introduce your refreshed or new brand to your audience with consistency across all platforms.' },
      { stage: 'Stage 6', title: 'Ongoing Brand Support', icon: '📈', desc: 'As your business grows, we refine and evolve your brand to keep it relevant, competitive, and impactful.' },
    ],
    whyTitle: 'Proper Strategic Branding',
    whySubtitle: 'Successful brands don\'t happen by chance—they are built through strategy. We help you define your identity, differentiate from competitors, and build customer trust.',
    whyImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
    whyCards: [
      { stat: 'Strategy', desc: 'Define your unique brand identity and differentiate from competitors.' },
      { stat: 'Trust', desc: 'Build customer trust, credibility, and long-term brand loyalty.' },
      { stat: 'Growth', desc: 'Position your business as an industry leader and drive sustainable growth.' },
    ],
    technologies: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'After Effects', 'InDesign', 'Brand Guidelines'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/icons8-swiftui-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
    ],
  },
  'branding': {
    title: 'Branding Services',
    subtitle: 'Build a Bold Brand That Creates Lasting Impact. Your brand is more than just a logo—it\'s the identity, personality, and promise your business makes to its customers.',
    heroImage: 'https://images.unsplash.com/photo-1542744094-3a317272018a?auto=format&fit=crop&w=1400&q=80',
    capabilitiesTitle: 'What You Get',
    capabilitiesSubtitle: 'Our branding services provide everything you need to establish a powerful and memorable brand.',
    capabilities: [
      { id: '01', title: 'Brand Strategy', desc: 'Develop a clear brand vision, positioning, messaging, and value proposition that aligns with your business goals.' },
      { id: '02', title: 'Brand Identity Design', desc: 'Create a unique visual identity, including logos, typography, color palettes, icons, and design elements.' },
      { id: '03', title: 'Brand Messaging', desc: 'Craft compelling messaging, taglines, tone of voice, and communication guidelines.' },
      { id: '04', title: 'Marketing Collateral', desc: 'Design professional business cards, brochures, presentations, packaging, and social media assets.' },
      { id: '05', title: 'Digital Brand Presence', desc: 'Maintain a consistent brand identity across websites, mobile apps, and digital campaigns.' },
      { id: '06', title: 'Brand Guidelines', desc: 'Develop comprehensive brand guidelines to ensure consistency across every customer touchpoint.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Discovery & Research', icon: '🔍', desc: 'We learn about your business, target audience, competitors, industry, and goals.' },
      { stage: 'Stage 2', title: 'Brand Strategy', icon: '🎯', desc: 'We define your positioning, mission, vision, personality, messaging, and value proposition.' },
      { stage: 'Stage 3', title: 'Identity Design', icon: '🎨', desc: 'Our creative team develops your logo, typography, color palette, imagery, and visual language.' },
      { stage: 'Stage 4', title: 'Brand Development', icon: '🛠️', desc: 'We apply your identity across digital and print assets to create a cohesive brand.' },
      { stage: 'Stage 5', title: 'Brand Launch', icon: '🚀', desc: 'We help introduce your refreshed or new brand to your audience with consistency across all platforms.' },
      { stage: 'Stage 6', title: 'Ongoing Brand Support', icon: '📈', desc: 'As your business grows, we refine and evolve your brand to keep it relevant and impactful.' },
    ],
    whyTitle: 'Proper Strategic Branding',
    whySubtitle: 'Successful brands don\'t happen by chance—they are built through strategy. We help you differentiate your business and build lasting loyalty.',
    whyImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
    whyCards: [
      { stat: 'Strategy', desc: 'Define your unique brand identity and differentiate from competitors.' },
      { stat: 'Trust', desc: 'Build customer trust, credibility, and long-term brand loyalty.' },
      { stat: 'Growth', desc: 'Position your business as an industry leader and drive sustainable growth.' },
    ],
    technologies: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'After Effects'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/icons8-swiftui-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
    ],
  },
  'application-reengineering': {
    title: 'Application Reengineering Services',
    subtitle: 'Modernize and optimize your legacy software without losing business continuity. We transform outdated systems into scalable, high-performance platforms.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg',
    heroTestimonial: { name: 'Matthew Law', role: 'CTO at Sprightful', text: 'Fireart took our 10-year-old codebase and turned it into something we\'re proud to demo. Pure engineering excellence.' },
    capabilitiesTitle: 'Our reengineering solutions',
    capabilitiesSubtitle: 'Give your legacy software a new lease of life without starting from scratch.',
    capabilities: [
      { id: '01', title: 'Legacy System Modernization', desc: 'We assess your existing codebase, identify technical debt, and create a modernization roadmap that minimizes risk and downtime.' },
      { id: '02', title: 'Cloud Migration', desc: 'Move your on-premise applications to the cloud with zero data loss and minimal disruption to your business operations.' },
      { id: '03', title: 'Microservices Architecture', desc: 'We break down monolithic applications into scalable microservices that can be developed, deployed, and scaled independently.' },
      { id: '04', title: 'Performance Optimization', desc: 'Eliminate bottlenecks, reduce load times, and improve system throughput through targeted profiling and code optimization.' },
      { id: '05', title: 'API Redesign', desc: 'We rebuild your APIs using modern REST or GraphQL standards, improving security, documentation, and developer experience.' },
      { id: '06', title: 'Database Optimization', desc: 'Schema redesign, query optimization, and database migration services to support your growing data needs.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Technical Assessment', icon: '🔍', desc: 'We conduct a deep audit of your existing codebase, infrastructure, and dependencies to identify risks, bottlenecks, and opportunities.' },
      { stage: 'Stage 2', title: 'Architecture Design', icon: '🏗️', desc: 'We design the target architecture and create a step-by-step migration plan that preserves business logic while modernizing the tech stack.' },
      { stage: 'Stage 3', title: 'Incremental Migration', icon: '💻', desc: 'We migrate in controlled increments, testing each component thoroughly before proceeding — ensuring continuous system availability.' },
      { stage: 'Stage 4', title: 'Optimization & Handoff', icon: '🚀', desc: 'Final performance tuning, documentation, and knowledge transfer to your internal team.' },
    ],
    whyTitle: 'Why Choose Fireart for Application Reengineering?',
    whySubtitle: 'We\'ve modernized dozens of legacy systems — each time delivering a faster, more reliable platform that teams love to work with.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: '50+', desc: 'Legacy systems successfully modernized.' },
      { stat: '0', desc: 'Data loss incidents in our migration projects.' },
      { stat: '3x', desc: 'Average performance improvement post-reengineering.' },
    ],
    technologies: ['Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'Node.js', 'Python', 'GraphQL'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/python-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/aws-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/google-cloud-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/java.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/ruby-on-rails-1.svg',
    ],
  },
  'software-maintenance-services': {
    title: 'Software Maintenance Services',
    subtitle: 'Keep your digital product secure, fast, and continuously improving. We provide proactive maintenance so you never have to worry about your product falling behind.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg',
    heroTestimonial: { name: 'Head of Marketing', role: 'CFI Education', text: 'Fireart keeps our platform running flawlessly. Their proactive approach means we catch issues before they affect users.' },
    capabilitiesTitle: 'Our maintenance solutions',
    capabilitiesSubtitle: 'Everything your product needs to stay healthy, secure, and performant.',
    capabilities: [
      { id: '01', title: 'Bug Fixes & Patches', desc: 'Rapid identification and resolution of bugs, errors, and issues — before they impact your users or your reputation.' },
      { id: '02', title: 'Security Updates', desc: 'Regular security audits, vulnerability scanning, and patch management to keep your product protected against emerging threats.' },
      { id: '03', title: 'Performance Monitoring', desc: '24/7 system monitoring with alerting and proactive optimization to ensure your product stays fast and available.' },
      { id: '04', title: 'Infrastructure Updates', desc: 'Keeping your servers, databases, and cloud infrastructure up to date with the latest stable releases and configurations.' },
      { id: '05', title: 'Feature Updates', desc: 'Adding new features and improving existing ones based on user feedback and business goals — at a pace that suits you.' },
      { id: '06', title: 'Documentation & Reporting', desc: 'Monthly reports on system health, changes made, and recommendations for future improvements.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Onboarding & Audit', icon: '🔍', desc: 'We review your existing codebase, infrastructure, and documentation to understand the system and identify any existing issues.' },
      { stage: 'Stage 2', title: 'Monitoring Setup', icon: '📊', desc: 'We install monitoring and alerting tools to give us real-time visibility into your system\'s health, performance, and security.' },
      { stage: 'Stage 3', title: 'Ongoing Maintenance', icon: '🔧', desc: 'Regular maintenance cycles including bug fixes, security patches, dependency updates, and performance optimization.' },
      { stage: 'Stage 4', title: 'Reporting & Planning', icon: '📋', desc: 'Monthly reports with insights on system health, issues resolved, and a roadmap of recommended improvements.' },
    ],
    whyTitle: 'Why Choose Fireart for Software Maintenance?',
    whySubtitle: 'Reliable, proactive maintenance that lets you focus on your business while we keep your product in peak condition.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: '99.9%', desc: 'Average uptime across maintained products.' },
      { stat: '<2h', desc: 'Average response time for critical issues.' },
      { stat: '100%', desc: 'Client retention rate on maintenance contracts.' },
    ],
    technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Datadog', 'PostgreSQL', 'Redis'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/aws-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/google-cloud-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/python-seeklogo-1.svg',
    ],
  },
  'website-development': {
    title: 'Website Development Services',
    subtitle: 'Build fast, scalable, and responsive websites that drive results. From simple landing pages to complex web applications, we deliver excellence at every level.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg',
    heroTestimonial: { name: 'Matthew Jewell', role: 'VP of FloSport', text: 'Fireart\'s website development team is top-tier. Our new website outperforms the old one in every measurable way.' },
    capabilitiesTitle: 'Our website development solutions',
    capabilitiesSubtitle: 'Everything you need to have a powerful web presence.',
    capabilities: [
      { id: '01', title: 'Corporate Websites', desc: 'Professional, conversion-focused corporate websites that represent your brand and drive business inquiries.' },
      { id: '02', title: 'E-commerce Development', desc: 'Scalable online stores with smooth checkout experiences, payment integrations, and inventory management.' },
      { id: '03', title: 'SaaS Platform Development', desc: 'Complex SaaS applications with multi-tenancy, role-based access control, billing integrations, and analytics dashboards.' },
      { id: '04', title: 'CMS Development', desc: 'Custom CMS implementations that give your team full content control without relying on developers for every update.' },
      { id: '05', title: 'Landing Pages', desc: 'High-converting landing pages designed and developed for maximum lead generation and campaign performance.' },
      { id: '06', title: 'Web App Development', desc: 'Full-featured web applications with complex business logic, real-time features, and third-party integrations.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Discovery & Planning', icon: '🔍', desc: 'Requirements gathering, technical planning, and project roadmapping to ensure we build exactly what you need.' },
      { stage: 'Stage 2', title: 'Design & Prototyping', icon: '🎨', desc: 'Visual design and interactive prototypes that let you experience and refine the product before development begins.' },
      { stage: 'Stage 3', title: 'Development & QA', icon: '💻', desc: 'Agile development with continuous integration, automated testing, and regular client reviews at each milestone.' },
      { stage: 'Stage 4', title: 'Launch & Growth', icon: '🚀', desc: 'Smooth deployment with performance monitoring, SEO optimization, and ongoing support for continuous improvement.' },
    ],
    whyTitle: 'Why Choose Fireart for Website Development?',
    whySubtitle: 'We build websites that your team is proud of and your customers love to use.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: '300+', desc: 'Websites developed for clients worldwide.' },
      { stat: '4.9★', desc: 'Rated by 38 verified clients on Clutch.' },
      { stat: '2x', desc: 'Average conversion rate improvement post-launch.' },
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'WordPress', 'Shopify', 'AWS', 'PostgreSQL'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/aws-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/python-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/google-cloud-1.svg',
    ],
  },
  'quality-assurance': {
    title: 'Quality Assurance Services',
    subtitle: 'Ensure your product launches with zero critical bugs. Our QA engineers work alongside your team to catch issues early, maintain high standards, and protect your users.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg',
    heroTestimonial: { name: 'JJ Oslund', role: 'CEO at Rapchat', text: 'Since working with Fireart\'s QA team, we\'ve had zero production incidents. They are meticulous and thorough.' },
    capabilitiesTitle: 'Our QA solutions',
    capabilitiesSubtitle: 'Rigorous testing so your users never encounter a broken product.',
    capabilities: [
      { id: '01', title: 'Manual Testing', desc: 'Thorough manual testing by experienced QA engineers who think like your users and test every edge case imaginable.' },
      { id: '02', title: 'Automated Testing', desc: 'We build robust automated test suites that run on every code change, giving your team confidence in every release.' },
      { id: '03', title: 'Performance Testing', desc: 'Load testing, stress testing, and performance profiling to ensure your system handles peak traffic without degradation.' },
      { id: '04', title: 'Security Testing', desc: 'Penetration testing and security audits to identify vulnerabilities before attackers do.' },
      { id: '05', title: 'API Testing', desc: 'Comprehensive API validation covering functionality, performance, reliability, and security of your backend services.' },
      { id: '06', title: 'Regression Testing', desc: 'Ensuring that new features don\'t break existing functionality through systematic regression test suites.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Test Planning', icon: '📋', desc: 'We analyze requirements and create a comprehensive test plan covering scope, resources, schedule, and test approach.' },
      { stage: 'Stage 2', title: 'Test Case Design', icon: '✍️', desc: 'Our QA engineers design detailed test cases covering functional, non-functional, and edge-case scenarios.' },
      { stage: 'Stage 3', title: 'Test Execution', icon: '🔍', desc: 'Systematic test execution with detailed defect reporting, severity classification, and developer collaboration.' },
      { stage: 'Stage 4', title: 'Sign-off & Reporting', icon: '✅', desc: 'Final quality report with test coverage metrics, defect statistics, and a clear go/no-go recommendation.' },
    ],
    whyTitle: 'Why Choose Fireart for Quality Assurance?',
    whySubtitle: 'Quality is not a phase — it\'s a mindset. Our QA team ensures every release is something you\'re proud to ship.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: '99%', desc: 'Bug detection rate before production deployments.' },
      { stat: '0', desc: 'Critical production incidents on QA-covered projects.' },
      { stat: '80%', desc: 'Reduction in regression testing time through automation.' },
    ],
    technologies: ['Selenium', 'Cypress', 'Jest', 'Postman', 'JMeter', 'JIRA', 'TestRail'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/python-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/java.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/aws-1.svg',
    ],
  },
  'motion-design': {
    title: 'Motion Design Services',
    subtitle: 'Bring your brand and product to life with stunning animations and motion graphics. We create motion that delights users and makes your product unforgettable.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg',
    heroTestimonial: { name: 'All About Parenting', role: 'Product Lead', text: 'The animations Fireart created for our app made it feel premium. Users constantly mention how smooth it feels.' },
    capabilitiesTitle: 'Our motion design solutions',
    capabilitiesSubtitle: 'Motion that communicates, engages, and converts.',
    capabilities: [
      { id: '01', title: 'UI Micro-animations', desc: 'Subtle, purposeful animations that make your UI feel alive — hover states, loading animations, transitions, and feedback effects.' },
      { id: '02', title: 'Explainer Videos', desc: 'Engaging animated explainer videos that communicate your product\'s value proposition clearly and memorably.' },
      { id: '03', title: 'Brand Motion Identity', desc: 'Animated logo reveals, brand transitions, and motion guidelines that keep your brand consistent across video content.' },
      { id: '04', title: 'Lottie Animations', desc: 'Lightweight, web-optimized Lottie animations that add delight to your product without impacting performance.' },
      { id: '05', title: 'Social Media Motion', desc: 'Eye-catching animated content for social media ads, stories, and posts that stop the scroll.' },
      { id: '06', title: 'Prototype Animations', desc: 'High-fidelity motion prototypes that demonstrate exactly how your product interactions will feel.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Brief & Concept', icon: '💡', desc: 'We review your brief, understand your brand voice, and develop motion concepts with storyboards for your approval.' },
      { stage: 'Stage 2', title: 'Motion Design', icon: '🎬', desc: 'Our motion designers bring the approved concepts to life with frame-by-frame precision and attention to every timing detail.' },
      { stage: 'Stage 3', title: 'Revisions', icon: '🔄', desc: 'We refine the animations based on your feedback until every movement feels exactly right.' },
      { stage: 'Stage 4', title: 'Export & Delivery', icon: '📦', desc: 'We deliver in all required formats — MP4, GIF, Lottie JSON, WebM — ready for immediate use.' },
    ],
    whyTitle: 'Why Choose Fireart for Motion Design?',
    whySubtitle: 'Motion is the language of emotion. We use it to make your brand feel premium and your product feel alive.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: '100+', desc: 'Motion projects delivered for web and mobile.' },
      { stat: '4.9★', desc: 'Top-rated on Clutch for creative quality.' },
      { stat: '3x', desc: 'Increase in engagement for animated vs. static content.' },
    ],
    technologies: ['After Effects', 'Lottie', 'Rive', 'Figma', 'Cinema 4D', 'Spline'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/icons8-swiftui-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
    ],
  },
  'product-design': {
    title: 'Product Design Services',
    subtitle: 'User-centered digital products built from concept to launch. We combine strategy, research, and craft to design products that users love and businesses grow with.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg',
    heroTestimonial: { name: 'Peter Isaacson', role: 'CMO at Replicant', text: 'Fireart\'s product design team understood our users better than we did. The product they designed is used daily by thousands.' },
    capabilitiesTitle: 'Our product design solutions',
    capabilitiesSubtitle: 'From your first idea to a polished, production-ready product.',
    capabilities: [
      { id: '01', title: 'User Research', desc: 'In-depth user interviews, surveys, and behavioral analysis to build a clear picture of who your users are and what they need.' },
      { id: '02', title: 'UX Strategy', desc: 'We develop a product vision, user journey maps, and information architecture that aligns with your business goals.' },
      { id: '03', title: 'Wireframing & Prototyping', desc: 'Low and high-fidelity wireframes and interactive prototypes that let you validate concepts before spending on development.' },
      { id: '04', title: 'UI Design', desc: 'Beautiful, pixel-perfect UI design that reflects your brand and creates intuitive experiences users return to.' },
      { id: '05', title: 'Design Systems', desc: 'Comprehensive design systems with component libraries, style guides, and documentation that scale with your product.' },
      { id: '06', title: 'Usability Testing', desc: 'Structured usability sessions with real users to validate designs and identify improvements before launch.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Discovery & Research', icon: '🔍', desc: 'We immerse ourselves in your product space through user research, competitor analysis, and stakeholder interviews.' },
      { stage: 'Stage 2', title: 'UX Strategy & Wireframes', icon: '📐', desc: 'Information architecture, user flows, and wireframes that establish the structural foundation of your product.' },
      { stage: 'Stage 3', title: 'Visual Design', icon: '🎨', desc: 'High-fidelity designs and interactive prototypes that bring your product to life in stunning detail.' },
      { stage: 'Stage 4', title: 'Dev Handoff & Support', icon: '🚀', desc: 'Detailed developer handoff with annotated specs, assets, and a design system. We support the team through development.' },
    ],
    whyTitle: 'Why Choose Fireart for Product Design?',
    whySubtitle: 'Great products are built on great design thinking. We bring the rigor of research and the craft of design to create products people love.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: '200+', desc: 'Digital products designed from concept to launch.' },
      { stat: '4.9★', desc: 'Clutch rating from 38 verified client reviews.' },
      { stat: '40%', desc: 'Average reduction in user support tickets post-redesign.' },
    ],
    technologies: ['Figma', 'Protopie', 'Maze', 'Hotjar', 'Framer', 'Lottie'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/icons8-swiftui-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/angular-gradient-2.png',
    ],
  },
  'design-team-augmentation': {
    title: 'Design Team Augmentation',
    subtitle: 'Scale your design team instantly with vetted, senior-level designers. Integrate seamlessly with your existing team and ship better products faster.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg',
    heroTestimonial: { name: 'Head of Marketing', role: 'CFI Education', text: 'Fireart\'s augmented designers integrated with our team in days. It felt like they\'d been with us for years.' },
    capabilitiesTitle: 'Our design augmentation solutions',
    capabilitiesSubtitle: 'The right designer for your team, ready to contribute from week one.',
    capabilities: [
      { id: '01', title: 'UI/UX Designers', desc: 'Senior UI/UX designers who can own end-to-end design projects or plug into your existing process seamlessly.' },
      { id: '02', title: 'Product Designers', desc: 'Strategic product designers who think beyond screens — they consider the whole product experience and business outcomes.' },
      { id: '03', title: 'Motion Designers', desc: 'Motion specialists who add premium animations and micro-interactions that make your product feel extraordinary.' },
      { id: '04', title: 'Design System Experts', desc: 'Designers specialized in building and maintaining design systems at scale — ensuring consistency across your entire product.' },
      { id: '05', title: 'Flexible Engagement', desc: 'Hire for a sprint, a quarter, or longer. We adapt to your project\'s needs and scale up or down as required.' },
      { id: '06', title: 'Rapid Onboarding', desc: 'Our designers are senior professionals who are productive from week one — no lengthy ramp-up time required.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Profile Matching', icon: '🎯', desc: 'We match you with designers who have the right skills, experience, and working style for your team and project.' },
      { stage: 'Stage 2', title: 'Meet & Approve', icon: '🤝', desc: 'You interview and approve the designer before any work begins. You\'re always in control of who joins your team.' },
      { stage: 'Stage 3', title: 'Onboarding', icon: '🚀', desc: 'The designer integrates into your tools, processes, and team — contributing from the very first sprint.' },
      { stage: 'Stage 4', title: 'Ongoing Management', icon: '📊', desc: 'We handle all HR, admin, and performance management so you can focus entirely on your product.' },
    ],
    whyTitle: 'Why Choose Fireart for Design Augmentation?',
    whySubtitle: 'Access world-class design talent on demand — without the overhead, recruitment risk, or long-term commitment.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: '7 days', desc: 'Average time from request to designer starting.' },
      { stat: '100%', desc: 'Of augmented designers pass our rigorous vetting process.' },
      { stat: '4.9★', desc: 'Rated on Clutch for quality of talent.' },
    ],
    technologies: ['Figma', 'Sketch', 'Adobe XD', 'Lottie', 'Framer', 'Webflow'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/icons8-swiftui-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
    ],
  },
  'development-team-augmentation': {
    title: 'Development Team Augmentation',
    subtitle: 'Extend your development team with elite engineers who integrate instantly, deliver fast, and scale with you as your product grows.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg',
    heroTestimonial: { name: 'Matthew Law', role: 'CTO at Sprightful', text: 'Fireart\'s engineers became a core part of our team within a week. The code quality is outstanding.' },
    capabilitiesTitle: 'Our development augmentation solutions',
    capabilitiesSubtitle: 'The right engineers for your stack, ready to ship from day one.',
    capabilities: [
      { id: '01', title: 'Frontend Engineers', desc: 'Senior React, Vue, and Angular developers who build fast, accessible, and visually polished user interfaces.' },
      { id: '02', title: 'Backend Engineers', desc: 'Node.js, Python, and Java engineers who design scalable APIs, microservices, and data pipelines.' },
      { id: '03', title: 'Full-Stack Engineers', desc: 'Versatile engineers who own complete features from database to UI — perfect for fast-moving startups.' },
      { id: '04', title: 'Mobile Developers', desc: 'iOS, Android, and React Native engineers who build performant, native-quality mobile applications.' },
      { id: '05', title: 'DevOps Engineers', desc: 'Infrastructure experts who build CI/CD pipelines, manage cloud environments, and keep your systems reliable.' },
      { id: '06', title: 'Flexible Contracts', desc: 'Hire for a sprint or a year. We scale your team up or down based on your project\'s changing needs.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Requirements Matching', icon: '🎯', desc: 'We assess your technical needs, team culture, and project requirements to identify the perfect engineers for your team.' },
      { stage: 'Stage 2', title: 'Technical Vetting', icon: '💻', desc: 'All engineers pass our rigorous technical interviews and code reviews before they\'re ever presented to a client.' },
      { stage: 'Stage 3', title: 'Integration', icon: '🤝', desc: 'Your new engineers join your sprint, start contributing to your codebase, and become part of your team.' },
      { stage: 'Stage 4', title: 'Ongoing Management', icon: '📊', desc: 'We handle HR, admin, and performance reviews so you get all the benefits of a great engineer without the overhead.' },
    ],
    whyTitle: 'Why Choose Fireart for Development Augmentation?',
    whySubtitle: 'Stop waiting months to hire the right engineers. Get battle-tested talent working on your product within days.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: '7 days', desc: 'Average time from request to engineer starting.' },
      { stat: '100%', desc: 'Of engineers pass a rigorous technical vetting process.' },
      { stat: '4.9★', desc: 'Rated on Clutch for engineering quality.' },
    ],
    technologies: ['React', 'Node.js', 'Python', 'AWS', 'Kubernetes', 'PostgreSQL', 'Swift', 'Kotlin'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/python-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/aws-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/swift-logo-with-text.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/kotlin-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/java.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/google-cloud-1.svg',
    ],
  },
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ServiceDetailPage({ overrideSlug }) {
  const { slug: pathSlug } = useParams();
  const slug = overrideSlug || pathSlug;
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
  }, [slug]);

  const data = serviceData[slug];

  // If no matching slug, derive a title and show default layout
  const detail = data || {
    title: slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Service',
    subtitle: 'We provide high-impact digital solutions that elevate your brand, streamline your products, and accelerate business growth.',
    heroImage: 'https://fireart.studio/wp-content/uploads/2025/07/frame-2087325499.jpg',

    capabilitiesTitle: 'Our solutions',
    capabilitiesSubtitle: 'World-class digital services tailored to your needs.',
    capabilities: [
      { id: '01', title: 'Strategic Planning', desc: 'In-depth research and clear roadmaps for execution.' },
      { id: '02', title: 'Custom Execution', desc: 'Bespoke design and code built specifically for your goals.' },
      { id: '03', title: 'Quality Assurance', desc: 'Rigorous testing across browsers, devices, and platforms.' },
      { id: '04', title: 'Performance Optimization', desc: 'Lightning fast speed, security, and SEO optimization.' },
      { id: '05', title: 'Seamless Handoff', desc: 'Full documentation, training, and ongoing support.' },
      { id: '06', title: 'Growth & Scaling', desc: 'Continuous improvements and conversion optimization.' },
    ],
    process: [
      { stage: 'Stage 1', title: 'Discovery', icon: '🔍', desc: 'We start by understanding your business goals, target audience, and technical requirements.' },
      { stage: 'Stage 2', title: 'Design', icon: '🎨', desc: 'Our designers create wireframes and visual designs while our architects plan the technical structure.' },
      { stage: 'Stage 3', title: 'Development', icon: '💻', desc: 'We build your product in sprints with continuous code reviews and automated testing.' },
      { stage: 'Stage 4', title: 'Launch', icon: '🚀', desc: 'We deploy your product and monitor its performance closely.' },
    ],
    whyTitle: 'Why Choose Fireart Studio?',
    whySubtitle: 'We partner closely with ambitious teams to deliver measurable results.',
    whyImage: 'https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png',
    whyCards: [
      { stat: '300+', desc: 'Projects delivered for clients worldwide.' },
      { stat: '4.9★', desc: 'Rated on Clutch by 38 verified clients.' },
      { stat: '10+', desc: 'Years of combined team experience.' },
    ],
    technologies: ['React', 'Node.js', 'AWS', 'Figma'],
    techIcons: [
      'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg',
      'https://fireart.studio/wp-content/uploads/2025/06/aws-1.svg',
    ],
  };

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * 420, behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact-form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#F5F5F6', minHeight: '100vh' }}>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .sdp-btn-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 64px;
          padding: 16px 72px 16px 24px;
          border-radius: 120px;
          background: #FF470A;
          color: #fff;
          font-family: Inter, sans-serif;
          font-size: 18px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.3s ease;
          cursor: pointer;
          border: none;
          white-space: nowrap;
        }
        .sdp-btn-pill:hover { background: #e43f08; }
        .sdp-btn-pill::after {
          content: '';
          position: absolute;
          top: 4px; right: 4px;
          width: 56px; height: 56px;
          background: rgba(255,255,255,0.45) url("data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.4258 6.93896L19.3511 11.8643L14.4258 16.7897' stroke='white' stroke-width='1.5' stroke-linecap='square'/%3E%3Cpath d='M5.49984 11.8639L18.6368 11.8639' stroke='white' stroke-width='1.5' stroke-linecap='square'/%3E%3C/svg%3E") no-repeat center/24px;
          border-radius: 120px;
          transition: transform 0.3s ease;
        }
        .sdp-btn-pill:hover::after { transform: translateX(4px); }

        .sdp-btn-dark {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 64px;
          padding: 16px 72px 16px 24px;
          border-radius: 120px;
          background: #323234;
          color: #fff;
          font-family: Inter, sans-serif;
          font-size: 18px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.3s ease;
          cursor: pointer;
          border: none;
          white-space: nowrap;
        }
        .sdp-btn-dark:hover { background: #FF470A; }
        .sdp-btn-dark::after {
          content: '';
          position: absolute;
          top: 4px; right: 4px;
          width: 56px; height: 56px;
          background: rgba(255,255,255,0.45) url("data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.4258 6.93896L19.3511 11.8643L14.4258 16.7897' stroke='white' stroke-width='1.5' stroke-linecap='square'/%3E%3Cpath d='M5.49984 11.8639L18.6368 11.8639' stroke='white' stroke-width='1.5' stroke-linecap='square'/%3E%3C/svg%3E") no-repeat center/24px;
          border-radius: 120px;
          transition: transform 0.3s ease;
        }
        .sdp-btn-dark:hover::after { transform: translateX(4px); }

        .sdp-nav-btn {
          display: flex; align-items: center; justify-content: center;
          width: 64px; height: 64px; border-radius: 50%; border: none;
          cursor: pointer; transition: all 0.3s ease;
        }
        .sdp-nav-btn:disabled { background: #EDEDED !important; cursor: default; }
        .sdp-nav-btn:not(:disabled):hover { background: #FF470A !important; }

        .sdp-cap-card {
          flex-shrink: 0;
          width: 420px; min-width: 420px; max-width: 420px;
          background: #fff; border-radius: 16px; padding: 32px 36px;
          display: flex; flex-direction: column; gap: 20px;
          box-sizing: border-box;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .sdp-cap-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .sdp-process-item {
          flex: 1; min-width: 220px; max-width: 320px;
          background: #fff; border-radius: 16px; padding: 32px 28px;
          display: flex; flex-direction: column; gap: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: transform 0.3s ease;
        }
        .sdp-process-item:hover { transform: translateY(-4px); }

        .sdp-why-card {
          background: #fff; border-radius: 16px; padding: 36px 32px;
          display: flex; flex-direction: column; gap: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }

        .sdp-tech-item {
          width: 120px; height: 120px;
          background: #EDEDED; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .sdp-tech-item:hover { transform: translateY(-4px); background: #fff; box-shadow: 0 8px 20px rgba(0,0,0,0.08); }

        .sdp-carousel-track {
          display: flex; gap: 28px; overflow-x: auto; padding-bottom: 16px;
          scrollbar-width: none; -ms-overflow-style: none;
          scroll-behavior: smooth;
        }
        .sdp-carousel-track::-webkit-scrollbar { display: none; }

        @media (max-width: 1024px) {
          .sdp-cap-card { width: 340px !important; min-width: 340px !important; max-width: 340px !important; }
          .sdp-tech-item { width: 80px !important; height: 80px !important; }
          .sdp-process-item { min-width: 180px !important; }
        }
        @media (max-width: 640px) {
          .sdp-cap-card { width: 280px !important; min-width: 280px !important; max-width: 280px !important; padding: 24px !important; }
          .sdp-btn-pill, .sdp-btn-dark { height: 52px !important; font-size: 15px !important; padding: 12px 60px 12px 20px !important; }
          .sdp-nav-btn { width: 48px !important; height: 48px !important; }
          .sdp-tech-item { width: 72px !important; height: 72px !important; }
        }
      `}</style>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: '140px', paddingBottom: '70px', paddingLeft: 'clamp(16px, 6vw, 132px)', paddingRight: 'clamp(16px, 6vw, 132px)', background: '#F5F5F6' }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>

          {/* Heading */}
          {/* Header Text */}
          <div style={{ maxWidth: '980px', marginBottom: '32px' }}>
            <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 72px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', color: '#000000', fontFamily: 'Inter, sans-serif' }}>
              {detail.title}
            </h1>
            <p style={{ fontSize: 'clamp(16px, 1.6vw, 24px)', lineHeight: 1.4, color: '#76757F', fontWeight: 500, margin: 0, maxWidth: '860px', fontFamily: 'Inter, sans-serif' }}>
              {detail.subtitle}
            </p>
          </div>

          {/* CTA Row (Full Width - Clutch Rating at Far Right End) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
            <a href="#contact-form-section" onClick={scrollToContact} className="sdp-btn-pill">
              <img src="https://fireart.studio/wp-content/uploads/2025/11/book-a-call-with-a-team-fireart-2x.png" alt="Team" style={{ height: '44px', width: 'auto', borderRadius: '120px', marginRight: '8px' }} />
              Book a 15-minute call
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
              <img src="https://fireart.studio/wp-content/uploads/2025/06/clutch-co-vector-logo-1-1.svg" alt="Clutch" style={{ height: '18px', width: 'auto' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '16px', fontWeight: 500, color: '#464554', fontFamily: 'Inter, sans-serif' }}>
                <Star size={16} fill="#FF470A" color="#FF470A" />
                <span>4.9</span>
                <span style={{ fontSize: '15px', color: '#464554', fontWeight: 400 }}>38 reviews</span>
              </div>
            </div>
          </div>

          {/* Hero Banner */}
          <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', height: 'clamp(280px, 42vh, 580px)', background: '#EDEDED' }}>
            <img src={detail.heroImage} alt={detail.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />


          </div>

        </div>
      </section>

      {/* ── 2. CAPABILITIES CAROUSEL ─────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(16px, 6vw, 132px)', background: '#F5F5F6', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>

          {/* Section Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ maxWidth: '800px' }}>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 60px)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 16px', color: '#000', fontFamily: 'Inter, sans-serif' }}>
                {detail.capabilitiesTitle}
              </h2>
              <p style={{ fontSize: 'clamp(15px, 1.4vw, 24px)', color: '#76757F', fontWeight: 500, margin: 0, lineHeight: 1.4, fontFamily: 'Inter, sans-serif' }}>
                {detail.capabilitiesSubtitle}
              </p>
            </div>

            {/* Nav Buttons */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexShrink: 0 }}>
              <button
                className="sdp-nav-btn"
                style={{ background: canScrollLeft ? '#323234' : '#EDEDED' }}
                disabled={!canScrollLeft}
                onClick={() => scrollCarousel(-1)}
                aria-label="Previous"
              >
                <ChevronLeft size={24} color={canScrollLeft ? '#fff' : '#464554'} />
              </button>
              <button
                className="sdp-nav-btn"
                style={{ background: canScrollRight ? '#323234' : '#EDEDED' }}
                disabled={!canScrollRight}
                onClick={() => scrollCarousel(1)}
                aria-label="Next"
              >
                <ChevronRight size={24} color={canScrollRight ? '#fff' : '#464554'} />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div
            className="sdp-carousel-track"
            ref={carouselRef}
            onScroll={checkScroll}
          >
            {detail.capabilities.map((cap) => (
              <div key={cap.id} className="sdp-cap-card">
                <div style={{ fontSize: '20px', fontWeight: 500, color: '#FF470A', fontFamily: 'Inter, sans-serif' }}>{cap.id}</div>
                <div style={{ height: '1px', background: '#EDEDED', width: '100%' }} />
                <div>
                  <h3 style={{ fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 400, color: '#000', margin: '0 0 12px', lineHeight: 1.2, fontFamily: 'Inter, sans-serif' }}>{cap.title}</h3>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#464554', margin: 0, fontFamily: 'Inter, sans-serif' }}>{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. PROCESS SECTION ───────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(16px, 6vw, 132px)', background: '#F5F5F6' }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 60px)', fontWeight: 400, lineHeight: 1.2, margin: 0, color: '#000', maxWidth: '700px', fontFamily: 'Inter, sans-serif' }}>
              Our development process
            </h2>
            <a href="#contact-form-section" onClick={scrollToContact} className="sdp-btn-pill">
              Book a call
            </a>
          </div>

          {/* Process Cards Grid */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {detail.process.map((step, i) => (
              <div key={i} className="sdp-process-item">
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#76757F', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>{step.stage}</div>
                <div style={{ fontSize: '36px', lineHeight: 1 }}>{step.icon}</div>
                <h3 style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', fontWeight: 500, color: '#000', margin: 0, lineHeight: 1.2, fontFamily: 'Inter, sans-serif' }}>{step.title}</h3>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#464554', margin: 0, fontFamily: 'Inter, sans-serif' }}>{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. WHY CHOOSE FIREART ────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(16px, 6vw, 132px)', background: '#F5F5F6' }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ maxWidth: '61%' }}>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 60px)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 16px', color: '#000', fontFamily: 'Inter, sans-serif' }}>
                {detail.whyTitle}
              </h2>
              <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', color: '#464554', fontWeight: 500, margin: 0, lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
                {detail.whySubtitle}
              </p>
            </div>
            <a href="#contact-form-section" onClick={scrollToContact} className="sdp-btn-pill">
              I want to chat
            </a>
          </div>

          {/* Content: Stat Cards (image removed) */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'stretch' }}>
            {detail.whyCards.map((card, i) => (
              <div key={i} className="sdp-why-card" style={{ flex: '1 1 200px' }}>
                <div style={{ fontSize: 'clamp(28px, 2.8vw, 40px)', fontWeight: 400, color: '#000', lineHeight: 1.1, fontFamily: 'Inter, sans-serif' }}>{card.stat}</div>
                <p style={{ fontSize: '15px', lineHeight: 1.5, color: '#464554', margin: 0, fontFamily: 'Inter, sans-serif' }}>{card.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* ── 6. CONTACT FORM ─────────────────────────────────────────────── */}
      <div id="contact-form-section">
        <Form />
      </div>

      <Footer />
    </div>
  );
}
