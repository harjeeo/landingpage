import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SplitText from './SplitText';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  
  const svgRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Trigger letters stagger horizontal entry on scroll viewport intersection
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsRevealed(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const footerContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll listener: holds rounded card shape when first visible, then starts scaling to full width as scroll continues
  useEffect(() => {
    const handleScroll = () => {
      if (!footerContainerRef.current) return;
      const rect = footerContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // As soon as top of footer enters viewport (rect.top <= windowHeight), scaling starts immediately!
      const startTrigger = windowHeight;
      const endTrigger = windowHeight - 350;
      
      const rawProgress = (startTrigger - rect.top) / (startTrigger - endTrigger);
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      setScrollProgress(progress);
    };

    if (window.lenis) {
      window.lenis.on('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (window.lenis) {
        window.lenis.off('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  // Symmetric scaling from both left & right sides (scaleX: 0.94 -> 1.0)
  const scaleX = 0.94 + (scrollProgress * 0.06);
  const borderRadius = `${(1 - scrollProgress) * 28}px ${(1 - scrollProgress) * 28}px 0 0`;

  return (
    <div style={{ backgroundColor: '#F5F5F6', width: '100%', overflow: 'hidden' }}>
      <footer 
        ref={footerContainerRef}
        className="section" 
        style={{ 
          backgroundColor: '#131313', 
          color: '#ffffff', 
          paddingTop: '4.5rem', 
          paddingBottom: '1.5rem',
          borderRadius: borderRadius,
          transform: `scaleX(${scaleX})`,
          transformOrigin: 'bottom center',
          transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
          boxSizing: 'border-box',
          willChange: 'transform, border-radius',
        }}
      >
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4rem', marginBottom: '3.5rem' }} className="footer-cols">
          
          {/* Links Columns */}
          <div style={{ display: 'flex', gap: '2rem', flex: '2 1 0%', minWidth: 0, flexWrap: 'wrap' }} className="footer-links-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: '1 1 0%', minWidth: '120px' }}>
              <div className="eyebrow" style={{ opacity: 0.5 }}>Sitemap</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1.1rem' }}>
                <a href="#hero" className="footer-link-hover">
                  <SplitText text="Home" />
                </a>
                <a href="#services" className="footer-link-hover">
                  <SplitText text="Projects" />
                </a>
                <a href="#blog" className="footer-link-hover">
                  <SplitText text="Blog" />
                </a>
                <Link to="/contact" className="footer-link-hover">
                  <SplitText text="Contact" />
                </Link>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: '1 1 0%', minWidth: '120px' }}>
              <div className="eyebrow" style={{ opacity: 0.5 }}>Services</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1.1rem' }}>
                <Link to="/services" className="footer-link-hover">
                  <SplitText text="Design" />
                </Link>
                <Link to="/services" className="footer-link-hover">
                  <SplitText text="Develop" />
                </Link>
                <Link to="/services" className="footer-link-hover">
                  <SplitText text="Marketing" />
                </Link>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: '1 1 0%', minWidth: '120px' }}>
              <div className="eyebrow" style={{ opacity: 0.5 }}>Social</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1.1rem' }}>
                <a href="https://www.linkedin.com/company/designsclue/" target="_blank" rel="noopener noreferrer" className="footer-link-hover">
                  <SplitText text="LinkedIn" />
                </a>
                <a href="http://instagram.com/designsclue" target="_blank" rel="noopener noreferrer" className="footer-link-hover">
                  <SplitText text="Instagram" />
                </a>
                <a href="https://www.facebook.com/designsclue" target="_blank" rel="noopener noreferrer" className="footer-link-hover">
                  <SplitText text="Facebook" />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: '1.2 1 0%', minWidth: 0 }}>
            <div className="eyebrow" style={{ opacity: 0.5 }}>Newsletter</div>
            <p style={{ color: 'var(--color-neutral-400)', fontSize: '1.05rem', lineHeight: '1.4' }}>
              We build digital experiences — and share the knowledge behind them.
            </p>
            
            {status === 'success' ? (
              <div style={{ color: 'var(--color-primary)', fontFamily: 'RM Mono, monospace', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                Amazing, we'll keep you in the loop!
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit} 
                className="footer-newsletter-form"
              >
                <input 
                  type="email" 
                  placeholder="info@designsclue.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="footer-newsletter-input"
                />
                <div className="footer-submit-btn-wrapper">
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="footer-submit-btn"
                  >
                    {status === 'loading' ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer SVG Logo with letter-by-letter stagger reveal grouping */}
        <div style={{ width: '100%', marginBottom: '2rem', opacity: 0.95, display: 'flex', justifyContent: 'center' }}>
          <svg 
            ref={svgRef}
            viewBox="90 0 150 76.9" 
            fill="none" 
            style={{ width: '80%', maxWidth: '950px', height: 'auto', color: '#ffffff' }}
            className={isRevealed ? 'footer-logo-revealed' : ''}
          >
            <g fill="currentColor">
              {/* DESIGNS */}
              <g className="footer-logo-letter" style={{ transitionDelay: '0s' }}>
                <path d="M92.2,30.3c-1-1.7-1.4-3.6-1.4-5.7s0.5-3.9,1.4-5.7c1-1.7,2.2-3,3.8-3.9c1.6-1,3.5-1.5,5.5-1.5c2.8,0,5.3,1.1,6.9,2.8c0.2,0.2,0.2,0.2,0.5,0.2c0.2,0,0.4-0.2,0.4-0.6V5.3h4.1v29.8h-3.1c0-0.7-0.1-1.6-0.2-2.3c-0.1-0.6-0.2-0.9-0.5-0.9c-0.2,0-0.5,0.1-0.9,0.6c-1.7,2.1-4.2,3.2-7.4,3.2C97.4,35.7,94.1,33.8,92.2,30.3z M107.3,30.3c1.4-1.4,2.1-3.3,2.1-5.5c0-2.3-0.7-4.2-2.1-5.5c-1.4-1.4-3.1-2-5.1-2c-2.8,0-5.1,1.4-6.3,3.7c-0.6,1.1-1,2.5-1,3.9c0,3,1.2,5.3,3.5,6.7c1.1,0.6,2.3,1,3.7,1C104.2,32.3,105.9,31.5,107.3,30.3z"/>
              </g>
              <g className="footer-logo-letter" style={{ transitionDelay: '0.06s' }}>
                <path d="M139,26.1h-17.3c0.2,3.8,3,6.3,6.8,6.3c3.1,0,5.3-1.5,6-3.7h4.1c-1,4.3-4.9,7-10.1,7c-4.3,0-7.8-2-9.6-5.3c-1-1.7-1.4-3.6-1.4-5.8c0-4.3,2.1-7.9,5.4-9.7c1.6-1,3.5-1.4,5.4-1.4c4.2,0,7.5,1.8,9.2,5.1c0.9,1.6,1.4,3.5,1.4,5.4C139,24.9,139,25.6,139,26.1z M121.7,22.9H135c-0.1-3.6-2.7-6-6.5-6C124.8,16.9,122.2,19.3,121.7,22.9z"/>
              </g>
              <g className="footer-logo-letter" style={{ transitionDelay: '0.12s' }}>
                <path d="M141.4,28.9h4.1c0.4,2.2,2.2,3.6,5.3,3.6c2.6,0,4.3-1.1,4.3-3c0-2-1.1-2.7-5.1-3.5c-5.7-1-7.8-2.8-7.8-6.5s3.2-6.2,8-6.2c4.9,0,7.8,2.3,8.4,6.5h-3.9c-0.5-2.3-1.8-3.3-4.4-3.3c-2.5,0-4.1,1-4.1,2.7c0,1.8,1.2,2.6,4.6,3.2c4.2,0.7,6.4,1.7,7.5,3.5c0.5,0.9,0.7,2,0.7,3.3c0,2.5-1.5,4.4-4.1,5.5c-1.2,0.6-2.7,0.9-4.3,0.9C145.5,35.7,142.2,33.3,141.4,28.9z"/>
              </g>
              <g className="footer-logo-letter" style={{ transitionDelay: '0.18s' }}>
                <path d="M162.8,8.3c0-1.5,1.2-2.6,2.7-2.6c1.6,0,2.7,1.1,2.7,2.6s-1.1,2.6-2.7,2.6C163.9,10.9,162.8,9.8,162.8,8.3z M167.6,35.1h-4.1v-21h4.1V35.1z"/>
              </g>
              <g className="footer-logo-letter" style={{ transitionDelay: '0.24s' }}>
                <path d="M172.6,36.6h4.1c0.7,2.7,3.3,4.3,6.7,4.3c4.1,0,6.3-2.1,6.3-6.2v-2.5c0-0.4-0.1-0.6-0.4-0.6c-0.1,0-0.4,0.1-0.5,0.4c-1.6,1.7-3.9,2.6-6.7,2.6c-3.9,0-7.3-2-9-5.1c-0.9-1.6-1.4-3.3-1.4-5.4c0-4.1,2-7.5,5.1-9.4c1.6-0.9,3.3-1.4,5.2-1.4c3,0,5.2,1,7.2,3.1c0.5,0.5,0.6,0.6,0.9,0.6c0.4,0,0.5-0.2,0.5-0.9c0.1-0.6,0.2-1.6,0.2-2.1h3.1v20.6c0,5.9-4.1,9.6-10.4,9.6C177.6,44.4,173.6,41.2,172.6,36.6z M187.8,29.4c1.4-1.2,2.1-3.1,2.1-5.3s-0.7-4.1-2.1-5.3c-1.2-1.2-2.8-1.8-4.8-1.8c-4.1,0-6.9,3-6.9,7.2c0,2.7,1.2,5.1,3.3,6.2c1.1,0.6,2.2,0.9,3.6,0.9C185,31.3,186.6,30.7,187.8,29.4z"/>
              </g>
              <g className="footer-logo-letter" style={{ transitionDelay: '0.30s' }}>
                <path d="M199.4,35.1v-21h3c0.1,1.1,0.1,1.8,0.2,2.3c0.1,0.7,0.2,1,0.6,1c0.2,0,0.4-0.1,0.7-0.6c1.6-2.2,3.8-3.5,6.9-3.5c5.1,0,8,3.2,8,8.8V35h-4.1V22.7c0-3.7-1.7-5.7-4.8-5.7c-2.1,0-3.7,0.9-4.8,2.5s-1.7,3.8-1.7,6.8V35h-4.1V35.1z"/>
              </g>
              <g className="footer-logo-letter" style={{ transitionDelay: '0.36s' }}>
                <path d="M222.4,28.9h4.1c0.4,2.2,2.2,3.6,5.3,3.6c2.6,0,4.3-1.1,4.3-3c0-2-1.1-2.7-5.1-3.5c-5.7-1-7.8-2.8-7.8-6.5s3.2-6.2,8-6.2c4.9,0,7.8,2.3,8.4,6.5h-3.9c-0.5-2.3-1.8-3.3-4.4-3.3c-2.5,0-4.1,1-4.1,2.7c0,1.8,1.2,2.6,4.6,3.2c4.2,0.7,6.4,1.7,7.5,3.5c0.5,0.9,0.7,2,0.7,3.3c0,2.5-1.5,4.4-4.1,5.5c-1.2,0.6-2.7,0.9-4.3,0.9C226.4,35.7,223.1,33.3,222.4,28.9z"/>
              </g>

              {/* CLUE */}
              <g className="footer-logo-letter" style={{ transitionDelay: '0.42s' }}>
                <path d="M92.3,64.3c-1-1.7-1.5-3.6-1.5-5.8c0-4.3,2-7.8,5.4-9.7c1.7-1,3.7-1.5,5.8-1.5c4.3,0,7.4,1.8,9.1,4.4c0.9,1.4,1.4,2.7,1.5,4.2h-4.1c-0.4-1.6-1-2.8-2.2-3.7c-1.1-1-2.6-1.4-4.3-1.4c-2.8,0-5.1,1.4-6.2,3.7c-0.6,1.2-0.9,2.5-0.9,3.9c0,3,1.2,5.4,3.5,6.7c1.1,0.6,2.3,1,3.7,1c1.7,0,3.1-0.5,4.3-1.4c1.1-1,1.8-2.2,2.2-3.7h4.1c-0.2,3-2,5.7-4.9,7.4c-1.6,0.9-3.3,1.2-5.5,1.2C97.8,69.8,94.2,67.8,92.3,64.3z"/>
              </g>
              <g className="footer-logo-letter" style={{ transitionDelay: '0.48s' }}>
                <path d="M120.7,69h-4.1V39.3h4.1V69z"/>
              </g>
              <g className="footer-logo-letter" style={{ transitionDelay: '0.54s' }}>
                <path d="M126.1,61V48.2h4.1v12.3c0,3.7,1.7,5.7,4.8,5.7c2.1,0,3.7-0.7,4.8-2.2c1.1-1.6,1.6-3.7,1.6-6.4v-9.4h4.1v21h-3c0-0.6-0.1-1.6-0.2-2.2c-0.1-0.7-0.2-1-0.6-1c-0.2,0-0.4,0.1-0.7,0.5c-1.6,2.1-3.7,3.2-6.7,3.2C129.1,69.8,126.1,66.6,126.1,61z"/>
              </g>
              <g className="footer-logo-letter" style={{ transitionDelay: '0.60s' }}>
                <path d="M171.1,60H154c0.2,3.8,3,6.3,6.8,6.3c3.1,0,5.3-1.5,6-3.7h4.1c-1,4.3-4.9,7-10.1,7c-4.3,0-7.8-2-9.6-5.3c-1-1.7-1.4-3.6-1.4-5.8c0-4.3,2.1-7.9,5.4-9.7c1.6-1,3.5-1.4,5.4-1.4c4.2,0,7.5,1.8,9.2,5.1c0.9,1.6,1.4,3.5,1.4,5.4C171.3,58.8,171.1,59.5,171.1,60z M154,56.8h13.3c-0.1-3.6-2.7-6-6.5-6S154.4,53.2,154,56.8z"/>
              </g>
            </g>
          </svg>
        </div>

        {/* Bottom row */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            fontSize: '0.85rem', 
            opacity: 0.6,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '1.25rem'
          }} 
          className="footer-bottom"
        >
          <div>© {new Date().getFullYear()} Designs Clue — All rights reserved.</div>
          <div>
            <a href="#privacy" style={{ color: '#ffffff', opacity: 0.75, textDecoration: 'none', transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0.75'}>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-logo-letter {
          opacity: 0;
          transform: translateX(45px);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .footer-logo-revealed .footer-logo-letter {
          opacity: 1;
          transform: translateX(0);
        }
        .footer-newsletter-form {
          display: flex;
          align-items: center;
          background: #1c1c1e;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 100px;
          padding: 6px 6px 6px 28px;
          height: 64px;
          width: 100%;
          max-width: 520px;
          box-sizing: border-box;
          margin-top: 4px;
        }
        .footer-newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 17px;
          font-weight: 400;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .footer-newsletter-input::placeholder {
          color: #8e8e93;
          opacity: 1;
        }
        .footer-submit-btn-wrapper {
          display: flex;
          align-items: center;
          height: 100%;
        }
        .footer-submit-btn {
          height: 52px;
          padding: 0 38px;
          border-radius: 100px;
          background: #4e4e52;
          color: #ffffff;
          border: none;
          font-weight: 400;
          font-size: 17px;
          cursor: pointer;
          transition: background 0.25s ease;
          white-space: nowrap;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .footer-link-hover {
          transition: color 0.3s ease;
        }
        .footer-link-hover:hover {
          color: var(--color-primary);
        }
        .footer-submit-btn:hover {
          background: #FF5B03 !important;
        }
        @media (max-width: 540px) {
          .footer-newsletter-form {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            height: 52px !important;
            background: #1c1c1e !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            border-radius: 100px !important;
            padding: 4px 4px 4px 16px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            margin-top: 8px !important;
          }
          .footer-newsletter-input {
            flex: 1 !important;
            min-width: 0 !important;
            height: 100% !important;
            background: transparent !important;
            border: none !important;
            padding: 0 8px 0 0 !important;
            font-size: 14px !important;
            color: #ffffff !important;
          }
          .footer-submit-btn-wrapper {
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
          .footer-submit-btn {
            height: 44px !important;
            padding: 0 20px !important;
            border-radius: 100px !important;
            background: #FF5B03 !important;
            color: #FFFFFF !important;
            font-size: 13.5px !important;
            font-weight: 500 !important;
            white-space: nowrap !important;
            border: none !important;
            cursor: pointer !important;
          }
        }
        @media (max-width: 767px) {
          .footer-cols {
            flex-direction: column !important;
            gap: 3rem !important;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
    </div>
  );
}
