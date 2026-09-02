import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Form from '../components/Form.jsx';

const teamMembers = [
  {
    name: 'Alona Vaisova',
    role: 'Head of Delivery',
    image: '/team/deepika-jain.png',
  },
  {
    name: 'Maciej Łyskawiński',
    role: 'Head of Engineering',
    image: '/team/harmeet-singh.png',
  },
  {
    name: 'Kostia Varhatiuk',
    role: 'Head of Design',
    image: '/team/shubham-sharma.png',
  },
  {
    name: 'Dima Venglinsky',
    role: 'Founder & CEO',
    image: '/team/jagjot-singh.png',
  },
  {
    name: 'Elena Rostova',
    role: 'Lead UI/UX Designer',
    image: '/team/elena-rostova.png',
  },
  {
    name: 'Maximilian Schwarz',
    role: 'Senior Full-Stack Engineer',
    image: '/team/maximilian-schwarz.png',
  },
  {
    name: 'Sophia Chen',
    role: 'Head of Product Strategy',
    image: '/team/sophia-chen.png',
  },
  {
    name: 'Alexey Pertsev',
    role: 'CTO & Tech Lead',
    image: '/team/tanvir-singh.png',
  },
  {
    name: 'Kate Kyslytsia',
    role: 'Head of Brand Design',
    image: '/team/alona-vaisova.png',
  },
];



export default function OurTeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#F5F5F6', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#000000' }}>
      <Navbar />

      <style>{`
        .ot-team-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          cursor: default;
        }
        .ot-team-card:hover .ot-member-name {
          color: #FF470A;
        }
        .ot-team-card:hover .ot-member-role {
          color: #FF470A;
        }
        .ot-member-name {
          font-size: 1.1rem;
          font-weight: 500;
          color: #000000;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }
        .ot-member-role {
          font-size: 0.9rem;
          font-weight: 400;
          color: #52525B;
          margin: 0;
          transition: color 0.25s ease;
        }
        .ot-team-img-wrap {
          width: 100%;
          aspect-ratio: 3/4;
          border-radius: 12px;
          overflow: hidden;
          background: #E5E5E7;
        }
        .ot-team-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
          transition: transform 0.5s ease;
        }
        .ot-team-card:hover .ot-team-img {
          transform: scale(1.04);
        }
        @media (max-width: 900px) {
          .ot-team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .ot-team-grid { grid-template-columns: 1fr !important; }
          .ot-statement { font-size: clamp(1.6rem, 5vw, 2.4rem) !important; }
        }
      `}</style>

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="hero-page-section" style={{
        background: '#F5F5F6',
        paddingTop: '140px',
        paddingBottom: '0',
        paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
      }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>

          {/* Title + description */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#000000',
            margin: '0 0 1.25rem',
            maxWidth: '820px',
          }}>
            Hi! Welcome to Designs Clue
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
            lineHeight: 1.65,
            color: '#52525B',
            maxWidth: '680px',
            margin: '0 0 2rem',
            fontWeight: 400,
          }}>
            Our story begins with a simple belief — that great design and clean code should work together. We started Designs Clue to create a studio that builds brands, digital products, and experiences that genuinely make a difference for the businesses and people we work with.
          </p>



          {/* Team Photo */}
          <div style={{
            width: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            height: 'clamp(280px, 42vw, 580px)',
            background: '#1a1a1a',
          }}>
            <img
              src="https://fireart.studio/wp-content/uploads/2025/06/frame-2087326578-e1751457664196.png"
              alt="Designs Clue Team"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: MEET OUR TEAM ─────────────────────────────────────── */}
      <section style={{
        background: '#F5F5F6',
        paddingTop: '80px',
        paddingBottom: '100px',
        paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
      }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>

          <h2 style={{
            fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            color: '#000000',
            textAlign: 'center',
            margin: '0 0 3rem',
          }}>
            Meet Our Team
          </h2>

          <div
            className="ot-team-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
            }}
          >
            {teamMembers.map((member, idx) => (
              <div key={idx} className="ot-team-card">
                <div className="ot-team-img-wrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="ot-team-img"
                  />
                </div>
                <div>
                  <h3 className="ot-member-name">{member.name}</h3>
                  <p className="ot-member-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
