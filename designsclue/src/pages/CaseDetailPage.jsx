import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Form from '../components/Form.jsx';
import Footer from '../components/Footer.jsx';

function RevealOnScroll({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
        transition: `opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style
      }}
    >
      {children}
    </div>
  );
}

const caseDataStore = {
  'pure-plank-fitness-app-development': {
    title: 'Pure Plank: Fitness App Development',
    introText: 'Pure Plank needed a modern digital experience to empower core workout enthusiasts with AI-driven real-time posture tracking and custom workout plans.',
    tags: ['Fitness', 'Mobile App', 'B2C', 'UI/UX Design', 'iOS & Android'],
    heroImg: 'https://cdn.prod.website-files.com/678e40df211f369be7e616a3/693031d7909c1abf8769756d_Herniencenter.jpg',
    description: 'Pure Plank is an innovative digital fitness platform designed to transform home workout routines. Founded to make professional core training accessible anywhere, the platform combines computer vision technology with gamified streak rewards to keep users motivated.',
    meta: {
      website: 'pureplank.com',
      industry: 'Health & Fitness, Mobile Tech',
      region: 'United States & Global',
      companySize: '50-100 employees'
    },
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  'drive-your-success': {
    title: 'CFI: A Fintech Platform Redesign',
    introText: 'As a global trading leader with 25 years of experience, CFI needed its digital presence to match its real-world reputation. The team\'s goal was to transform the CFI website from an outdated portal into a modern, trustworthy asset that could support global growth.',
    tags: ['Fintech', 'Corporate Website', 'B2C', 'Design Systems', 'UX/UI Design'],
    heroImg: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
    description: 'CFI is an award-winning global multi-asset broker company. Founded in 1998, with 12+ international licenses, it has 25 years of experience empowering traders with access to 15,000+ financial instruments. CFI is a major force in the finance industry, serving clients on five continents. They are known for moving fast and expecting the same level of agility and proactivity from their design partners.',
    meta: {
      website: 'CFI.trade',
      industry: 'Fintech, Online Trading, Financial Services',
      region: 'United Arab Emirates, with global presence across 5 continents',
      companySize: '501-1000 employees'
    },
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  'genseo-ai-platform': {
    title: 'Genseo: Next-Gen AI Content & Search Engine',
    introText: 'Genseo required a sleek, ultra-responsive SaaS application platform to streamline AI content creation and keyword intelligence for scaling marketing teams.',
    tags: ['AI SaaS', 'Web App', 'Product Design', 'Design Systems'],
    heroImg: 'https://cdn.prod.website-files.com/678e40df211f369be7e616a3/6930282d2eff5d7129028bd3_Genseo.jpg',
    description: 'Genseo is a leading AI intelligence platform enabling content creators and SEO strategists to produce high-performing articles and analyze real-time search trends with unmatched accuracy.',
    meta: {
      website: 'genseo.co',
      industry: 'Artificial Intelligence, SaaS',
      region: 'Global',
      companySize: '100-250 employees'
    },
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop'
    ]
  }
};

export default function CaseDetailPage() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const currentCase = caseDataStore[slug] || {
    title: 'CFI: A Fintech Platform Redesign',
    introText: 'As a global trading leader with 25 years of experience, CFI needed its digital presence to match its real-world reputation. The team\'s goal was to transform the CFI website from an outdated portal into a modern, trustworthy asset that could support global growth.',
    tags: ['Fintech', 'Corporate Website', 'B2C', 'Design Systems', 'UX/UI Design'],
    heroImg: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
    description: 'CFI is an award-winning global multi-asset broker company. Founded in 1998, with 12+ international licenses, it has 25 years of experience empowering traders with access to 15,000+ financial instruments. CFI is a major force in the finance industry, serving clients on five continents. They are known for moving fast and expecting the same level of agility and proactivity from their design partners.',
    meta: {
      website: 'CFI.trade',
      industry: 'Fintech, Online Trading, Financial Services',
      region: 'United Arab Emirates, with global presence across 5 continents',
      companySize: '501-1000 employees'
    },
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop'
    ]
  };

  return (
    <div style={{ background: '#F5F5F6', color: '#000000', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      <style>{`
        .case-tag-pill {
          padding: 8px 18px;
          border-radius: 100px;
          background: rgba(0, 0, 0, 0.05);
          font-size: 0.88rem;
          font-weight: 500;
          color: #27272A;
          display: inline-block;
          white-space: nowrap;
        }
        .case-meta-label {
          font-size: 0.95rem;
          color: #71717A;
          font-weight: 400;
        }
        .case-meta-value {
          font-size: 1.05rem;
          font-weight: 600;
          color: #000000;
          line-height: 1.4;
        }
        .case-meta-link {
          color: #000000;
          text-decoration: underline;
          text-decoration-color: #FF470A;
          text-underline-offset: 4px;
          font-weight: 600;
          font-size: 1.05rem;
          transition: color 0.2s ease;
        }
        .case-meta-link:hover {
          color: #FF470A;
        }
        .case-showcase-img-box {
          border-radius: 20px;
          overflow: hidden;
          background: #E5E5E7;
          aspect-ratio: 4 / 3;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }
        .case-showcase-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .case-showcase-img-box:hover img {
          transform: scale(1.03);
        }
      `}</style>

      {/* 1. Header Section */}
      <section style={{
        paddingTop: '160px',
        paddingBottom: '50px',
        paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
        maxWidth: '1656px',
        margin: '0 auto'
      }}>
        <RevealOnScroll delay={100}>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '-0.035em',
            color: '#000000',
            maxWidth: '1100px',
            marginBottom: '1.75rem'
          }}>
            {currentCase.title}
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={180}>
          <p style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
            lineHeight: 1.6,
            color: '#52525B',
            maxWidth: '920px',
            marginBottom: '2.5rem'
          }}>
            {currentCase.introText}
          </p>
        </RevealOnScroll>

        {/* Tag Pills */}
        <RevealOnScroll delay={250}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {currentCase.tags.map((tag, i) => (
              <span key={i} className="case-tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* 2. Big Hero Image Section */}
      <section style={{
        paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
        maxWidth: '1656px',
        margin: '0 auto 5rem'
      }}>
        <RevealOnScroll delay={150}>
          <div style={{
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: '24px',
            overflow: 'hidden',
            background: '#141416',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)'
          }}>
            <img 
              src={currentCase.heroImg} 
              alt={currentCase.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </RevealOnScroll>
      </section>

      {/* 3. Company Info Section */}
      <section style={{
        paddingBottom: '90px',
        paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
        maxWidth: '1656px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Left Column Description */}
          <RevealOnScroll delay={100}>
            <p style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
              lineHeight: 1.65,
              color: '#3F3F46',
              margin: 0
            }}>
              {currentCase.description}
            </p>
          </RevealOnScroll>

          {/* Right Column Project Meta */}
          <RevealOnScroll delay={200}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                <span className="case-meta-label">Website</span>
                <a href={`https://${currentCase.meta.website}`} target="_blank" rel="noopener noreferrer" className="case-meta-link">
                  {currentCase.meta.website}
                </a>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                <span className="case-meta-label">Industry</span>
                <span className="case-meta-value">{currentCase.meta.industry}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                <span className="case-meta-label">Region</span>
                <span className="case-meta-value">{currentCase.meta.region}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                <span className="case-meta-label">Company Size</span>
                <span className="case-meta-value">{currentCase.meta.companySize}</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 4. Images Showcase Section */}
      <section style={{
        paddingBottom: '120px',
        paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
        maxWidth: '1656px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '2.5rem'
        }}>
          {currentCase.images.map((imgUrl, i) => (
            <RevealOnScroll key={i} delay={150 + i * 150}>
              <div className="case-showcase-img-box">
                <img src={imgUrl} alt="" />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 5. Form Section */}
      <Form />

      {/* 6. Footer Section */}
      <Footer />
    </div>
  );
}
