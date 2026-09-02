import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SplitText from './SplitText';
import { 
  ChevronDown, 
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  X,
  Menu
} from 'lucide-react';

import logoAsset from '../assets/logo.svg';

// Inline SVG icon components for the mega menu — orange on salmon background style
const NavIcon = ({ children }) => (
  <div style={{
    width: '44px', height: '44px', borderRadius: '12px',
    background: '#FFF0EC', display: 'flex',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0
  }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="#FF470A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  </div>
);

const IconBranding = () => <NavIcon>
  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
  <path d="M2 17l10 5 10-5"/>
  <path d="M2 12l10 5 10-5"/>
</NavIcon>;

const IconUiUx = () => <NavIcon>
  <rect x="3" y="3" width="18" height="14" rx="2"/>
  <path d="M8 21h8"/>
  <path d="M12 17v4"/>
</NavIcon>;

const IconGraphicDesign = () => <NavIcon>
  <path d="M12 19l7-7 3 3-7 7-3-3z"/>
  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
  <path d="M2 2l7.586 7.586"/>
  <circle cx="11" cy="11" r="2"/>
</NavIcon>;

const IconMotionGraphics = () => <NavIcon>
  <polygon points="5 3 19 12 5 21 5 3"/>
  <path d="M19 12H5" strokeDasharray="3 2"/>
</NavIcon>;

const IconSoftwareDev = () => <NavIcon>
  <polyline points="16 18 22 12 16 6"/>
  <polyline points="8 6 2 12 8 18"/>
</NavIcon>;

const IconWebDev = () => <NavIcon>
  <rect x="2" y="4" width="20" height="16" rx="2"/>
  <path d="M2 9h20"/>
  <path d="M7 4v5"/>
</NavIcon>;

const IconMobileApps = () => <NavIcon>
  <rect x="7" y="2" width="10" height="20" rx="2"/>
  <path d="M12 18h.01"/>
</NavIcon>;

const IconShopify = () => <NavIcon>
  <path d="M16 8h2l1 10H5L6 8h2"/>
  <path d="M9 8V6a3 3 0 1 1 6 0v2"/>
</NavIcon>;

const IconWebflow = () => <NavIcon>
  <path d="M16 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
  <path d="M9 9l3 6 3-6"/>
</NavIcon>;

const IconSeo = () => <NavIcon>
  <circle cx="11" cy="11" r="7"/>
  <path d="M21 21l-4.35-4.35"/>
  <path d="M8.5 11h5"/>
  <path d="M11 8.5v5"/>
</NavIcon>;

const IconDigitalMarketing = () => <NavIcon>
  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
</NavIcon>;

const IconGoogleAds = () => <NavIcon>
  <rect x="2" y="7" width="20" height="14" rx="2"/>
  <path d="M16 3H8l-2 4h12l-2-4z"/>
  <path d="M9 13h6M9 16h4"/>
</NavIcon>;

const IconMetaAds = () => <NavIcon>
  <path d="M21 12a9 9 0 1 0-9 9"/>
  <path d="M3.6 9h16.8M3.6 15h8.4"/>
  <path d="M12 3a15 15 0 0 1 0 18"/>
  <path d="M16 18l4-4 4 4"/>
  <path d="M20 14v7"/>
</NavIcon>;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubPanel, setMobileSubPanel] = useState(null); // null | 'services'
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderDark, setIsHeaderDark] = useState(true);
  const [expandedMobileSection, setExpandedMobileSection] = useState(null);

  const closeTimeoutRef = useRef(null);
  const mobileOverlayRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileSection = (section) => {
    setExpandedMobileSection(prev => prev === section ? null : section);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (mobileOverlayRef.current) {
      mobileOverlayRef.current.scrollTop = 0;
    }
  }, [mobileSubPanel]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      setIsScrolled(scrolled);

      const path = location.pathname;

      // Pages that start with dark hero (like Home page)
      let topIsDark = path === '/';

      // Check if current scroll position is over footer or dark sections
      const footerEl = document.querySelector('footer');
      let activeIsDark = topIsDark;

      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 0) {
          activeIsDark = true;
        }
      }

      setIsHeaderDark(activeIsDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsServicesOpen(false);
    setIsOpen(false);
    setMobileSubPanel(null);
    setExpandedMobileSection(null);
  }, [location.pathname]);

  const toggleMenu = () => {
    if (isOpen) {
      setMobileSubPanel(null);
    }
    setIsOpen(!isOpen);
  };

  const handleLogoClick = (e) => {
    if (isOpen) setIsOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleMouseEnterServices = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeaveServices = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  // Dynamic header styles for desktop
  const isDark = isScrolled ? false : isHeaderDark;

  const headerColor = isDark ? '#ffffff' : '#000000';
  const headerBg = 'transparent';
  const headerBorder = '1px solid transparent';

  const capsuleBg = isScrolled
    ? 'rgba(255, 255, 255, 0.4)'
    : (isHeaderDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.4)');

  const capsuleBorder = isScrolled
    ? '1px solid rgba(0, 0, 0, 0.12)'
    : (isHeaderDark ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(255, 255, 255, 0.65)');

  const capsuleShadow = isScrolled
    ? '0 10px 30px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)'
    : (isHeaderDark
        ? '0 12px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
        : '0 12px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8)');

  const capsuleLinkColor = isDark ? '#ffffff' : '#000000';

  const buttonBg = capsuleBg;
  const buttonBorder = capsuleBorder;
  const buttonColor = isDark ? '#ffffff' : '#000000';
  const buttonShadow = 'none';

  // Services Mega Panel Data with inline SVG icons
  const servicesMegaMenu = {
    design: [
      { iconEl: <IconBranding />, title: 'Branding', desc: 'Build bold, memorable brand identities.', link: '/services/branding' },
      { iconEl: <IconUiUx />, title: 'UI/UX', desc: 'Design intuitive, engaging user experiences.', link: '/services/ui-ux-design' },
      { iconEl: <IconGraphicDesign />, title: 'Graphic Design', desc: 'Create high-impact visual brand assets.', link: '/services/graphic-design' },
      { iconEl: <IconMotionGraphics />, title: 'Motion Graphics', desc: 'Animate digital products with motion graphics.', link: '/services/motion-graphics' }
    ],
    develop: [
      { iconEl: <IconSoftwareDev />, title: 'Software Development', desc: 'Custom software engineered for business growth.', link: '/services/software-development' },
      { iconEl: <IconWebDev />, title: 'Web Development', desc: 'Build fast, scalable digital web platforms.', link: '/services/web-development' },
      { iconEl: <IconMobileApps />, title: 'Mobile Apps', desc: 'Develop intuitive iOS and Android apps.', link: '/services/mobile-apps' },
      { iconEl: <IconShopify />, title: 'Shopify', desc: 'High-converting custom Shopify online stores.', link: '/services/shopify' },
      { iconEl: <IconWebflow />, title: 'Webflow', desc: 'Fast, responsive custom Webflow websites.', link: '/services/webflow' }
    ],
    marketing: [
      { iconEl: <IconSeo />, title: 'SEO', desc: 'Drive organic traffic and rank higher.', link: '/services/seo' },
      { iconEl: <IconDigitalMarketing />, title: 'Digital Marketing', desc: 'Data-driven strategies to grow revenue.', link: '/services/digital-marketing' },
      { iconEl: <IconGoogleAds />, title: 'Google Ads', desc: 'High-ROI targeted search PPC campaigns.', link: '/services/google-ads' },
      { iconEl: <IconMetaAds />, title: 'Meta Ads', desc: 'Scale revenue with targeted social ads.', link: '/services/meta-ads' }
    ]
  };

  return (
    <>
      {/* DESKTOP HEADER (Visible ONLY on screen widths >= 992px) */}
      <div className="desktop-header-wrap">
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: isScrolled ? '0.75rem var(--container-padding)' : '2rem var(--container-padding)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            backgroundColor: headerBg,
            borderBottom: headerBorder,
            color: headerColor
          }}
        >
          {/* 3-Column Flex Layout */}
          <div
            style={{
              maxWidth: '1656px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              position: 'relative'
            }}
          >
            {/* Logo */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                flex: isScrolled ? '0 0 0px' : '1 1 0%', 
                minWidth: 0,
                opacity: isScrolled ? 0 : 1,
                transform: isScrolled ? 'translateX(140px)' : 'translateX(0)',
                pointerEvents: isScrolled ? 'none' : 'auto',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden'
              }}
            >
              <Link
                to="/"
                onClick={handleLogoClick}
                aria-label="home"
                className="nav-logo-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: headerColor,
                  height: '32px',
                  transition: 'color 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <img 
                  src={logoAsset} 
                  alt="Logo" 
                  style={{ 
                    height: '32px', 
                    width: 'auto', 
                    objectFit: 'contain',
                    filter: isHeaderDark ? 'brightness(0) invert(1)' : 'none'
                  }} 
                />
              </Link>
            </div>

            {/* Capsule Menu */}
            <div style={{ display: 'flex', justifyContent: 'center', flex: isScrolled ? '1 1 auto' : '0 0 auto', position: 'relative' }}>
              <div
                className="desktop-only-menu"
                style={{
                  display: 'flex',
                  gap: isScrolled ? '1.5rem' : '2.5rem',
                  height: isScrolled ? '3.6rem' : '2.75rem',
                  backgroundColor: capsuleBg,
                  backdropFilter: 'blur(10px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(10px) saturate(180%)',
                  border: capsuleBorder,
                  boxShadow: capsuleShadow,
                  padding: isScrolled ? '0 0.5rem 0 1.5rem' : '0 2rem',
                  borderRadius: '100px',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Logo Icon ONLY inside Capsule */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: isScrolled ? '32px' : '0px',
                    opacity: isScrolled ? 1 : 0,
                    transform: isScrolled ? 'translateX(0px)' : 'translateX(-40px)',
                    overflow: 'hidden',
                    transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    marginRight: isScrolled ? '0.4rem' : '0'
                  }}
                >
                  <Link
                    to="/"
                    onClick={handleLogoClick}
                    aria-label="home"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: capsuleLinkColor,
                      width: '24px',
                      height: '24px',
                      flexShrink: 0
                    }}
                  >
                    <svg 
                      width="22" 
                      height="22" 
                      viewBox="0 0 75 77" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: capsuleLinkColor }}
                    >
                      <path 
                        d="M70,23.8H53.4v-8.4l0,0c0-8.1-6.5-14.7-14.7-14.7l0,0H15.6H0.8v14.7v23.1v14.7h14.7h8.3v8.4l0,0c0,8.1,6.5,14.7,14.7,14.7l0,0h37.7v-3.3V61.5v-3.3H61.5v3.3H38.4V38.4H23.8v0.1h-8.3V15.5h23.1v8.4h-0.1v14.7h23.1v4.2h14.7v-4.2V28.1v-4.2H70V23.8z" 
                        fill="currentColor" 
                      />
                    </svg>
                  </Link>
                </div>

                <Link to="/" className="nav-link" style={{ color: capsuleLinkColor, transition: 'color 0.7s cubic-bezier(0.16, 1, 0.3, 1)', textDecoration: 'none' }}>
                  <SplitText text="Home" />
                </Link>
                <Link to="/projects" className="nav-link" style={{ color: capsuleLinkColor, transition: 'color 0.7s cubic-bezier(0.16, 1, 0.3, 1)', textDecoration: 'none' }}>
                  <SplitText text="Projects" />
                </Link>

                {/* SERVICES WITH MEGA PANEL DROPDOWN */}
                <div 
                  onMouseEnter={handleMouseEnterServices}
                  onMouseLeave={handleMouseLeaveServices}
                  style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                >
                  <Link 
                    to="/services" 
                    className="nav-link" 
                    style={{ 
                      color: isServicesOpen ? '#FF470A' : capsuleLinkColor, 
                      transition: 'color 0.3s ease', 
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <SplitText text="Services" />
                    {isServicesOpen ? <ChevronUp size={15} color="#FF470A" /> : <ChevronDown size={15} />}
                  </Link>

                  {/* MEGA PANEL DROPDOWN */}
                  {isServicesOpen && (
                    <div
                      onMouseEnter={handleMouseEnterServices}
                      onMouseLeave={handleMouseLeaveServices}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 14px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '840px',
                        background: '#ffffff',
                        borderRadius: '24px',
                        padding: '24px 32px',
                        boxShadow: '0 24px 70px rgba(0,0,0,0.14), 0 4px 20px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        color: '#000000',
                        zIndex: 10000,
                        animation: 'mega-panel-fade-in 0.25s ease-out forwards',
                        boxSizing: 'border-box'
                      }}
                    >
                      {/* SECTION 1: Design */}
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#76757F', marginBottom: '8px', letterSpacing: '0.02em', textAlign: 'left' }}>
                          Design
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', textAlign: 'left' }}>
                          {servicesMegaMenu.design.map((item, idx) => (
                            <Link 
                              key={idx} 
                              to={item.link}
                              onClick={() => setIsServicesOpen(false)}
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px', 
                                textDecoration: 'none', 
                                padding: '6px 8px', 
                                borderRadius: '12px', 
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                              }}
                              className="mega-menu-item-hover"
                            >
                              {item.iconEl}

                              <div>
                                <div className="mega-menu-title" style={{ fontSize: '15px', fontWeight: 600, color: '#000000', lineHeight: 1.2, marginBottom: '2px', transition: 'color 0.2s ease' }}>
                                  {item.title}
                                </div>
                                <div style={{ fontSize: '13px', color: '#76757F', lineHeight: 1.3, fontWeight: 400 }}>
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* SECTION 2: Develop */}
                      <div style={{ marginTop: '18px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#76757F', marginBottom: '8px', letterSpacing: '0.02em', textAlign: 'left' }}>
                          Develop
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', textAlign: 'left' }}>
                          {servicesMegaMenu.develop.map((item, idx) => (
                            <Link 
                              key={idx} 
                              to={item.link}
                              onClick={() => setIsServicesOpen(false)}
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px', 
                                textDecoration: 'none', 
                                padding: '6px 8px', 
                                borderRadius: '12px', 
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                              }}
                              className="mega-menu-item-hover"
                            >
                              {item.iconEl}

                              <div>
                                <div className="mega-menu-title" style={{ fontSize: '15px', fontWeight: 600, color: '#000000', lineHeight: 1.2, marginBottom: '2px', transition: 'color 0.2s ease' }}>
                                  {item.title}
                                </div>
                                <div style={{ fontSize: '13px', color: '#76757F', lineHeight: 1.3, fontWeight: 400 }}>
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* SECTION 3: Marketing */}
                      <div style={{ marginTop: '18px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#76757F', marginBottom: '8px', letterSpacing: '0.02em', textAlign: 'left' }}>
                          Marketing
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', textAlign: 'left' }}>
                          {servicesMegaMenu.marketing.map((item, idx) => (
                            <Link 
                              key={idx} 
                              to={item.link}
                              onClick={() => setIsServicesOpen(false)}
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px', 
                                textDecoration: 'none', 
                                padding: '6px 8px', 
                                borderRadius: '12px', 
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                              }}
                              className="mega-menu-item-hover"
                            >
                              {item.iconEl}

                              <div>
                                <div className="mega-menu-title" style={{ fontSize: '15px', fontWeight: 600, color: '#000000', lineHeight: 1.2, marginBottom: '2px', transition: 'color 0.2s ease' }}>
                                  {item.title}
                                </div>
                                <div style={{ fontSize: '13px', color: '#76757F', lineHeight: 1.3, fontWeight: 400 }}>
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/our-team" className="nav-link" style={{ color: capsuleLinkColor, transition: 'color 0.7s cubic-bezier(0.16, 1, 0.3, 1)', textDecoration: 'none' }}>
                  <SplitText text="Our Team" />
                </Link>

                <Link to="/blog" className="nav-link" style={{ color: capsuleLinkColor, transition: 'color 0.7s cubic-bezier(0.16, 1, 0.3, 1)', textDecoration: 'none' }}>
                  <SplitText text="Blog" />
                </Link>

                {/* Contact Button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: isScrolled ? '160px' : '0px',
                    opacity: isScrolled ? 1 : 0,
                    transform: isScrolled ? 'translateX(0px)' : 'translateX(50px)',
                    overflow: 'hidden',
                    transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    marginLeft: isScrolled ? '0.4rem' : '0'
                  }}
                >
                  <Link
                    to="/contact"
                    className="button"
                    style={{
                      backgroundColor: buttonBg,
                      color: buttonColor,
                      border: buttonBorder,
                      boxShadow: buttonShadow,
                      backdropFilter: 'blur(5px)',
                      WebkitBackdropFilter: 'blur(5px)',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                  >
                    <SplitText text="Contact us" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center', 
                gap: '1rem', 
                flex: isScrolled ? '0 0 0px' : '1 1 0%', 
                minWidth: 0,
                opacity: isScrolled ? 0 : 1,
                transform: isScrolled ? 'translateX(-140px)' : 'translateX(0)',
                pointerEvents: isScrolled ? 'none' : 'auto',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden'
              }}
            >
              <Link
                to="/contact"
                className="button"
                style={{
                  backgroundColor: buttonBg,
                  color: buttonColor,
                  border: buttonBorder,
                  boxShadow: buttonShadow,
                  transition: 'all 0.4s cubic-bezier(0.65, 0.05, 0, 1)',
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <SplitText text="Contact us" />
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* MOBILE FLOATING HEADER CAPSULE (Visible ONLY on screen widths <= 991px) */}
      <div
        className="mobile-only-header"
        style={{
          position: 'fixed',
          top: '12px',
          left: '12px',
          right: '12px',
          zIndex: 1001,
          margin: '0 auto',
          maxWidth: '540px',
          backgroundColor: isOpen ? '#FFFFFF' : (isHeaderDark ? 'rgba(15, 15, 15, 0.4)' : 'rgba(255, 255, 255, 0.88)'),
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderRadius: '100px',
          border: isOpen ? '1px solid rgba(0, 0, 0, 0.08)' : (isHeaderDark ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(0, 0, 0, 0.12)'),
          boxShadow: isHeaderDark && !isOpen ? '0 10px 32px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15)' : '0 10px 30px rgba(0, 0, 0, 0.08)',
          padding: '6px 8px 6px 16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          width: 'calc(100% - 24px)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        {/* Left: Logo (Icon Mark on Mobile Phone, Full Logo on Tablet) */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="mobile-header-logo-link"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}
        >
          <img
            src={logoAsset}
            alt="Logo"
            className="mobile-header-logo-img"
            style={{
              height: '26px',
              width: 'auto',
              objectFit: 'contain',
              filter: isHeaderDark && !isOpen ? 'brightness(0) invert(1)' : 'none'
            }}
          />
        </Link>

        {/* Right: Menu / Close Icon Button (No background circle, clean white icon on dark) */}
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            transition: 'opacity 0.2s ease'
          }}
        >
          {isOpen ? (
            <X size={24} color="#000000" />
          ) : (
            <Menu size={24} color={isHeaderDark ? '#FFFFFF' : '#000000'} />
          )}
        </button>
      </div>

      {/* MOBILE MENU FULL OVERLAY (Visible when isOpen is true on mobile) */}
      <div
        ref={mobileOverlayRef}
        className="mobile-menu-overlay"
        data-lenis-prevent="true"
        data-lenis-prevent-touch="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          zIndex: 1000,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          touchAction: 'pan-y',
          paddingTop: '80px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '140px',
          boxSizing: 'border-box',
          fontFamily: "'Inter', sans-serif",
          willChange: 'transform',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, visibility 0.4s ease'
        }}
      >
        <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative', width: '100%' }}>
          {/* PANEL 1: MAIN MENU PANEL */}
          <div
            style={{
              width: '100%',
              display: mobileSubPanel === 'services' ? 'none' : 'flex',
              flexDirection: 'column',
              gap: 0
            }}
          >
            {/* 1. Home */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '64px',
                minHeight: '64px',
                borderBottom: '1px solid #F0F0F0',
                boxSizing: 'border-box'
              }}
            >
              <Link
                to="/"
                onClick={() => { setIsOpen(false); setMobileSubPanel(null); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                  fontSize: 'clamp(1.1rem, 4.5vw, 1.25rem)',
                  fontWeight: 500,
                  color: '#000000',
                  textDecoration: 'none'
                }}
              >
                Home
              </Link>
            </div>

            {/* 2. Projects */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '64px',
                minHeight: '64px',
                borderBottom: '1px solid #F0F0F0',
                boxSizing: 'border-box'
              }}
            >
              <Link
                to="/projects"
                onClick={() => { setIsOpen(false); setMobileSubPanel(null); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                  fontSize: 'clamp(1.1rem, 4.5vw, 1.25rem)',
                  fontWeight: 500,
                  color: '#000000',
                  textDecoration: 'none'
                }}
              >
                Projects
              </Link>
            </div>

            {/* 3. Services (Text opens /services page, Arrow opens Services sub-panel) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '64px',
                minHeight: '64px',
                borderBottom: '1px solid #F0F0F0',
                boxSizing: 'border-box'
              }}
            >
              <Link
                to="/services"
                onClick={() => {
                  setIsOpen(false);
                  setMobileSubPanel(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  flex: 1,
                  fontSize: 'clamp(1.1rem, 4.5vw, 1.25rem)',
                  fontWeight: 500,
                  color: '#000000',
                  textDecoration: 'none'
                }}
              >
                Services
              </Link>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMobileSubPanel('services');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  paddingLeft: '16px',
                  paddingRight: '0px',
                  cursor: 'pointer'
                }}
                aria-label="Open Services Sub-panel"
              >
                <ChevronRight size={20} color="#111" />
              </div>
            </div>

            {/* 4. Our Team */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '64px',
                minHeight: '64px',
                borderBottom: '1px solid #F0F0F0',
                boxSizing: 'border-box'
              }}
            >
              <Link
                to="/our-team"
                onClick={() => { setIsOpen(false); setMobileSubPanel(null); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                  fontSize: 'clamp(1.1rem, 4.5vw, 1.25rem)',
                  fontWeight: 500,
                  color: '#000000',
                  textDecoration: 'none'
                }}
              >
                Our Team
              </Link>
            </div>

            {/* 5. Blog */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '64px',
                minHeight: '64px',
                borderBottom: '1px solid #F0F0F0',
                boxSizing: 'border-box'
              }}
            >
              <Link
                to="/blog"
                onClick={() => { setIsOpen(false); setMobileSubPanel(null); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                  fontSize: 'clamp(1.1rem, 4.5vw, 1.25rem)',
                  fontWeight: 500,
                  color: '#000000',
                  textDecoration: 'none'
                }}
              >
                Blog
              </Link>
            </div>

            {/* 6. Contact us Button */}
            <div style={{ paddingTop: '1.5rem', marginTop: '0.5rem' }}>
              <Link
                to="/contact"
                onClick={() => { setIsOpen(false); setMobileSubPanel(null); }}
                className="button"
                style={{
                  backgroundColor: '#2D2D2E',
                  color: '#FFFFFF',
                  borderRadius: '100px',
                  padding: '14px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  width: '100%',
                  height: 'auto',
                  boxSizing: 'border-box',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <SplitText text="Contact us" />
              </Link>
            </div>
          </div>

          {/* PANEL 2: SERVICES SUB-PANEL */}
          <div
            style={{
              width: '100%',
              display: mobileSubPanel === 'services' ? 'flex' : 'none',
              flexDirection: 'column',
              gap: '0.1rem'
            }}
          >
            {/* Header with Back button */}
            <div style={{ borderBottom: '1px solid #F0F0F0' }}>
              <div
                onClick={() => setMobileSubPanel(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.9rem 0',
                  cursor: 'pointer',
                  color: '#FF470A',
                  fontSize: 'clamp(1.1rem, 4.5vw, 1.25rem)',
                  fontWeight: 600
                }}
              >
                <ChevronLeft size={22} color="#FF470A" />
                <span>Back to Menu</span>
              </div>
            </div>

            {/* All Services Sub-Links Lined like Main Navbar Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '10rem' }}>
              {/* 1. DESIGN */}
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#FF470A', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: '1rem', paddingBottom: '0.4rem' }}>
                Design
              </div>
              {servicesMegaMenu.design.map((item, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #F0F0F0' }}>
                  <Link
                    to={item.link}
                    onClick={() => { setIsOpen(false); setMobileSubPanel(null); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '0.85rem 0',
                      textDecoration: 'none'
                    }}
                  >
                    {item.iconEl}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 'clamp(1rem, 4vw, 1.1rem)', fontWeight: 600, color: '#000000', lineHeight: 1.25 }}>
                        {item.title}
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#76757F', marginTop: '2px', lineHeight: 1.3 }}>
                        {item.desc}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}

              {/* 2. DEVELOP */}
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#FF470A', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: '1.4rem', paddingBottom: '0.4rem' }}>
                Develop
              </div>
              {servicesMegaMenu.develop.map((item, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #F0F0F0' }}>
                  <Link
                    to={item.link}
                    onClick={() => { setIsOpen(false); setMobileSubPanel(null); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '0.85rem 0',
                      textDecoration: 'none'
                    }}
                  >
                    {item.iconEl}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 'clamp(1rem, 4vw, 1.1rem)', fontWeight: 600, color: '#000000', lineHeight: 1.25 }}>
                        {item.title}
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#76757F', marginTop: '2px', lineHeight: 1.3 }}>
                        {item.desc}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}

              {/* 3. MARKETING */}
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#FF470A', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: '1.4rem', paddingBottom: '0.4rem' }}>
                Marketing
              </div>
              {servicesMegaMenu.marketing.map((item, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #F0F0F0' }}>
                  <Link
                    to={item.link}
                    onClick={() => { setIsOpen(false); setMobileSubPanel(null); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '0.85rem 0',
                      textDecoration: 'none'
                    }}
                  >
                    {item.iconEl}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 'clamp(1rem, 4vw, 1.1rem)', fontWeight: 600, color: '#000000', lineHeight: 1.25 }}>
                        {item.title}
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#76757F', marginTop: '2px', lineHeight: 1.3 }}>
                        {item.desc}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mobile-panel-slide-down {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes mega-panel-fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, 12px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .mega-menu-item-hover:hover {
          background: #F5F5F6 !important;
        }
        .mega-menu-item-hover:hover .mega-menu-title {
          color: #FF470A !important;
        }

        .mobile-only-header {
          display: none !important;
        }
        .mobile-menu-overlay {
          display: none;
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .mobile-menu-overlay::-webkit-scrollbar,
        .mobile-menu-overlay::-webkit-scrollbar-thumb,
        .mobile-menu-overlay::-webkit-scrollbar-track,
        .mobile-menu-overlay::-webkit-scrollbar-corner {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
          opacity: 0 !important;
        }
        .desktop-header-wrap {
          display: block !important;
        }

        @media (max-width: 991px) {
          .desktop-header-wrap {
            display: none !important;
          }
          .mobile-only-header {
            display: flex !important;
          }
          .mobile-menu-overlay {
            display: block !important;
          }
        }

        @media (max-width: 767px) {
          .mobile-header-logo-link {
            width: auto !important;
            height: 28px !important;
            overflow: visible !important;
          }
          .mobile-header-logo-img {
            height: 26px !important;
            width: auto !important;
            max-width: 150px !important;
            object-fit: contain !important;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .mobile-only-header {
            max-width: 720px !important;
            padding: 8px 12px 8px 24px !important;
            top: 18px !important;
            left: 24px !important;
            right: 24px !important;
          }
          .mobile-menu-overlay {
            padding-top: 100px !important;
            padding-left: 36px !important;
            padding-right: 36px !important;
          }
        }
      `}</style>
    </>
  );
}
