import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Form from '../components/Form.jsx';
import Footer from '../components/Footer.jsx';

const caseStudies = [
  {
    id: 1,
    slug: 'pure-plank-fitness-app-development',
    title: 'Pure Plank — Fitness App Development',
    category: 'Mobile App, Health & Fitness',
    img: 'https://cdn.prod.website-files.com/678e40df211f369be7e616a3/693031d7909c1abf8769756d_Herniencenter.jpg'
  },
  {
    id: 2,
    slug: 'drive-your-success',
    title: 'Drive your Success — Trade like a Champion',
    category: 'Branding, Product Design, Web Design',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    slug: 'genseo-ai-platform',
    title: 'Gaming-first blockchain platform',
    category: 'Web3, Web Design, Motion',
    img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4,
    slug: 'boostation-mobile-app',
    title: 'Explainer Video for Boostation Mobile App',
    category: 'Art Direction, Branding, Product Design',
    img: 'https://cdn.prod.website-files.com/678e40df211f369be7e616a3/693028d91f7f78da0df12e62_Theory%20Sabers.jpeg'
  },
  {
    id: 5,
    slug: 'flash-up-channel-app',
    title: 'User Interface Design for Flash Up Channel App',
    category: 'Mobile App, UI/UX Design',
    img: 'https://cdn.prod.website-files.com/678e40df211f369be7e616a3/6930282d2eff5d7129028bd3_Genseo.jpg'
  },
  {
    id: 6,
    slug: 'google-play-illustrations',
    title: 'Narrative Illustrations and User Avatars for Google Play',
    category: 'Illustration, Character Design',
    img: 'https://cdn.prod.website-files.com/678e40df211f369be7e616a3/69302a2e746a1c73158b0e31_KL-A.jpg'
  },
  {
    id: 7,
    slug: 'theory-sabers-ecommerce',
    title: 'Theory Sabers Custom E-Commerce Experience',
    category: 'Shopify, Brand Identity',
    img: 'https://cdn.prod.website-files.com/678e40df211f369be7e616a3/693026b4c7650b7c52cbbefd_Automotivelaw.jpg'
  },
  {
    id: 8,
    slug: '301hero-seo-platform',
    title: '301Hero SEO Migration Automation Platform',
    category: 'SaaS Dashboard, Cloud Infrastructure',
    img: 'https://cdn.prod.website-files.com/678e40df211f369be7e616a3/69302b6d9a80f758487b9fa5_301Hero.jpg'
  },
  {
    id: 9,
    slug: 'patient-portal-mobile-health',
    title: 'Automation That Callers Love',
    category: 'AI SaaS, Product Design',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function ProjectsPage() {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ background: '#F5F5F6', color: '#000000', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Hover Cursor Badge */}
      <div
        className="cursor-badge"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: '#FF470A',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate(${mousePos.x - 45}px, ${mousePos.y - 45}px) scale(${hoveredCardId !== null ? 1 : 0})`,
          opacity: hoveredCardId !== null ? 1 : 0,
          transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease',
          boxShadow: '0 12px 30px rgba(255, 71, 10, 0.45)',
          textAlign: 'center',
          fontSize: '0.88rem',
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          userSelect: 'none'
        }}
      >
        <span>Watch</span>
        <span>Case</span>
      </div>

      <style>{`
        .fireart-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        .fireart-img-box {
          width: 100%;
          border-radius: 18px;
          overflow: hidden;
          background: #E5E5E7;
          aspect-ratio: 3 / 4.2;
          position: relative;
          cursor: none !important;
        }
        .fireart-img-box * {
          cursor: none !important;
        }
        .fireart-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fireart-card:hover .fireart-img-box img {
          transform: scale(1.035);
        }
        .fireart-card-title {
          font-size: clamp(1.05rem, 1.3vw, 1.22rem);
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.015em;
          color: #000000;
          margin-top: 0.85rem;
          margin-bottom: 0.25rem;
          transition: color 0.25s ease;
          cursor: pointer;
        }
        .fireart-card:hover .fireart-card-title {
          color: #FF470A;
        }
        .fireart-card-subtitle {
          font-size: 0.85rem;
          color: #71717A;
          margin: 0;
          font-weight: 400;
          cursor: pointer;
        }

        @media (max-width: 991px) {
          .projects-section-container {
            padding-top: 100px !important;
            padding-bottom: 60px !important;
          }
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.2rem 1.5rem !important;
          }
          .cursor-badge {
            display: none !important;
          }
          .fireart-img-box, .fireart-img-box * {
            cursor: pointer !important;
          }
        }

        @media (max-width: 767px) {
          .projects-section-container {
            padding-top: 90px !important;
            padding-bottom: 50px !important;
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
          .projects-heading {
            font-size: clamp(1.4rem, 6vw, 1.85rem) !important;
            margin-bottom: 2.2rem !important;
          }
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .fireart-img-box {
            aspect-ratio: 16 / 11 !important;
            border-radius: 16px !important;
          }
          .fireart-card-title {
            font-size: 1.1rem !important;
            margin-top: 0.75rem !important;
            margin-bottom: 0.2rem !important;
          }
          .fireart-card-subtitle {
            font-size: 0.85rem !important;
          }
        }
      `}</style>

      {/* Main Section */}
      <section 
        className="projects-section-container"
        style={{
          paddingTop: '160px',
          paddingBottom: '120px',
          paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
          paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
          maxWidth: '1656px',
          margin: '0 auto'
        }}
      >
        {/* Title */}
        <h1 
          className="projects-heading"
          style={{
            fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
            fontWeight: 400,
            lineHeight: 1.25,
            letterSpacing: '-0.03em',
            color: '#000000',
            maxWidth: '920px',
            marginBottom: '3.5rem'
          }}
        >
          Great products cannot happen without passion, intelligence, &amp; personal commitment
        </h1>

        {/* 3 Column Grid matching Fireart cases layout */}
        <div 
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '3rem 2rem'
          }}
        >
          {caseStudies.map((item) => (
            <Link 
              key={item.id} 
              to={`/cases/${item.slug}`} 
              className="fireart-card"
            >
              <div 
                className="fireart-img-box"
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <img src={item.img} alt={item.title} />
              </div>
              <h3 className="fireart-card-title">
                {item.title}
              </h3>
              <p className="fireart-card-subtitle">
                {item.category}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <Form />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
