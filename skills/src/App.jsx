import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './components/Courses';
import WhatWeOffer from './components/WhatWeOffer';
import InstructorShowcase from './components/InstructorShowcase';
import ProductsGrid from './components/ProductsGrid';
import WallOfLove from './components/WallOfLove';
import StudentSpotlight from './components/StudentSpotlight';
import FAQ from './components/FAQ';
import BlogSection from './components/BlogSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import DiscountPopupModal from './components/DiscountPopupModal';
import FigmaMasterclassPage from './pages/FigmaMasterclassPage';
import TestimonialsPage from './pages/TestimonialsPage';
import CoursesPage from './pages/CoursesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/StudentDashboard';
import MyLearningPage from './pages/MyLearningPage';
import ResourcesPage from './pages/ResourcesPage';
import FaqPage from './pages/FaqPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundCancellationPolicy from './pages/RefundCancellationPolicy';

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'auto' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <main>
      <Hero />
      <Courses />
      <WhatWeOffer />
      <InstructorShowcase />
      <ProductsGrid />
      <WallOfLove />
      <StudentSpotlight />
      <FAQ />
      <BlogSection />
      <Newsletter />
    </main>
  );
}

function MainLayout() {
  const location = useLocation();
  const isDashboard =
    location.pathname.startsWith('/dashboard') ||
    location.pathname === '/my-learning' ||
    location.pathname.startsWith('/resources') ||
    location.pathname === '/student-dashboard';

  return (
    <div className="min-h-screen bg-[#0c0e15] text-slate-100 selection:bg-[#6400e6] selection:text-white font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/buy-courses" element={<CoursesPage />} />
        <Route path="/buy" element={<CoursesPage />} />
        <Route path="/testimonial" element={<TestimonialsPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/refund-cancellation-policy" element={<RefundCancellationPolicy />} />
        <Route path="/refund-policy" element={<RefundCancellationPolicy />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/identity/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/my-learning" element={<MyLearningPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources-files" element={<ResourcesPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/courses/ui-design-masterclass" element={<FigmaMasterclassPage />} />
        <Route path="/courses/graphic-design-in-7-days" element={<FigmaMasterclassPage />} />
        <Route path="/courses/web-design-2-weeks-mastery-course" element={<FigmaMasterclassPage />} />
        <Route path="/courses/web-design-mastery-course" element={<FigmaMasterclassPage />} />
        <Route path="/courses/shopify-1-week-master-course" element={<FigmaMasterclassPage />} />
        <Route path="/courses/the-ultimate-figma-masterclass" element={<FigmaMasterclassPage />} />
        <Route path="/courses/ai-designer-graphic-designing" element={<FigmaMasterclassPage />} />
        <Route path="/courses/ux-ui-design-course" element={<FigmaMasterclassPage />} />
        <Route path="/courses/:courseSlug" element={<FigmaMasterclassPage />} />
        {/* Catch-all fallback route */}
        <Route path="*" element={<FigmaMasterclassPage />} />
      </Routes>
      {!isDashboard && <Footer />}
      {!isDashboard && <DiscountPopupModal />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollHandler />
      <MainLayout />
    </Router>
  );
}

