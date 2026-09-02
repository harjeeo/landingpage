import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import OurCapabilities from './components/OurCapabilities.jsx';
import TechStack from './components/TechStack.jsx';
import Testimonials from './components/Testimonials.jsx';
import BlogInsights from './components/BlogInsights.jsx';
import CTA from './components/CTA.jsx';
import Form from './components/Form.jsx';
import Footer from './components/Footer.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import OurTeamPage from './pages/OurTeamPage.jsx';
import CaseDetailPage from './pages/CaseDetailPage.jsx';

import ServiceDetailPage from './pages/ServiceDetailPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';


function SmoothScrollWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return children;
}

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <OurCapabilities />
      <TechStack />
      <Testimonials />
      <BlogInsights />
      <Form />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/team" element={<OurTeamPage />} />
          <Route path="/our-team" element={<OurTeamPage />} />

          {/* Case Study Pages */}
          <Route path="/cases/:slug" element={<CaseDetailPage />} />
          <Route path="/case/:slug" element={<CaseDetailPage />} />
          <Route path="/projects/:slug" element={<CaseDetailPage />} />
          <Route path="/project/:slug" element={<CaseDetailPage />} />
          
          {/* Service Detail Pages (All using standard ServicesPage structure) */}
          <Route path="/services/brand-identity" element={<ServicesPage />} />
          <Route path="/service/brand-identity" element={<ServicesPage />} />
          <Route path="/services/branding" element={<ServicesPage />} />
          <Route path="/service/branding" element={<ServicesPage />} />

          <Route path="/services/ui-ux-design" element={<ServicesPage />} />
          <Route path="/service/ui-ux-design" element={<ServicesPage />} />
          <Route path="/services/ui-ux" element={<ServicesPage />} />
          <Route path="/service/ui-ux" element={<ServicesPage />} />
          <Route path="/services/ui/ux" element={<ServicesPage />} />
          <Route path="/service/ui/ux" element={<ServicesPage />} />

          <Route path="/services/graphic-design" element={<ServicesPage />} />
          <Route path="/service/graphic-design" element={<ServicesPage />} />

          <Route path="/services/motion-graphics" element={<ServicesPage />} />
          <Route path="/service/motion-graphics" element={<ServicesPage />} />
          <Route path="/services/motion-design" element={<ServicesPage />} />
          <Route path="/service/motion-design" element={<ServicesPage />} />

          <Route path="/services/software-development" element={<ServicesPage />} />
          <Route path="/service/software-development" element={<ServicesPage />} />

          <Route path="/services/web-development" element={<ServicesPage />} />
          <Route path="/service/web-development" element={<ServicesPage />} />

          <Route path="/services/mobile-apps" element={<ServicesPage />} />
          <Route path="/service/mobile-apps" element={<ServicesPage />} />
          <Route path="/services/mobile-app-development" element={<ServicesPage />} />
          <Route path="/service/mobile-app-development" element={<ServicesPage />} />

          <Route path="/services/shopify" element={<ServicesPage />} />
          <Route path="/service/shopify" element={<ServicesPage />} />

          <Route path="/services/webflow" element={<ServicesPage />} />
          <Route path="/service/webflow" element={<ServicesPage />} />

          <Route path="/services/ecommerce" element={<ServicesPage />} />
          <Route path="/service/ecommerce" element={<ServicesPage />} />

          <Route path="/services/seo" element={<ServicesPage />} />
          <Route path="/service/seo" element={<ServicesPage />} />

          <Route path="/services/digital-marketing" element={<ServicesPage />} />
          <Route path="/service/digital-marketing" element={<ServicesPage />} />

          <Route path="/services/google-ads" element={<ServicesPage />} />
          <Route path="/service/google-ads" element={<ServicesPage />} />

          <Route path="/services/meta-ads" element={<ServicesPage />} />
          <Route path="/service/meta-ads" element={<ServicesPage />} />

          {/* Dynamic Fallback Routes */}
          <Route path="/services/:slug" element={<ServicesPage />} />
          <Route path="/service/:slug" element={<ServicesPage />} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
        </Routes>
      </SmoothScrollWrapper>
    </BrowserRouter>
  );
}
