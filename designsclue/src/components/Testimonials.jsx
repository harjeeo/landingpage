import React, { useState, useRef } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    type: 'text',
    quote: 'We were successful in getting an MVP. Our team wasn’t exactly looking for users or any numbers — we were simply validating plenty of ideas. With Fireart’s help, we’d done that. This project was successful.',
    name: 'Pablo Corredor',
    role: 'CEO of Sprightful'
  },
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
  {
    id: 3,
    type: 'image',
    quote: (
      <>
        Thanks to Fireart Studio's efforts, the app has achieved <span style={{ color: '#FF470A' }}>15 million downloads</span>, and new product launches have generated more engagement. The team has delivered on time and within budget, communicating via virtual meetings, emails, and messages. Their high-quality work is impressive.
      </>
    ),
    name: 'JJ Oslund',
    role: 'COO, Rapchat • Music Production App'
  },
  {
    id: 4,
    type: 'rating',
    rating: '4.9',
    reviewCount: 'Based on 38 reviews'
  },
  {
    id: 5,
    type: 'image',
    quote: 'We really enjoyed working with Fireart! The value, for what we got, was terrific.',
    name: 'Peter Isaacson',
    role: 'CMO, Replicant'
  },
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
  {
    id: 7,
    type: 'text',
    quote: 'This work cadence has helped us create better projects and products because we’re tightly coupled with Fireart Studio.',
    name: 'Matthew Jewell',
    role: 'VP of Product Design • Sports Media Company'
  },
  {
    id: 8,
    type: 'image',
    quote: 'We are deeply grateful to the Fireart team for their contribution to our project\'s success. Their dedication and creative approach to UI/UX design, branding, and illustration have been instrumental in our journey. Fireart has become a reliable partner for us, and we look forward to continuing our collaboration.',
    name: 'The All About Parenting Team',
    role: 'Worldwide Parents Community'
  }
];

export default function Testimonials() {
  const [isTestimonialMouseDown, setIsTestimonialMouseDown] = useState(false);
  const [testimonialStartX, setTestimonialStartX] = useState(0);
  const [testimonialScrollPos, setTestimonialScrollPos] = useState(0);
  const testimonialRef = useRef(null);

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

  return (
    <section style={{ padding: '100px 0', background: '#19191A', color: '#ffffff', overflow: 'hidden' }}>
      <style>{`
        .testimonials-slider-container {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          cursor: grab;
          user-select: none;
          padding-bottom: 20px;
        }

        .testimonials-slider-container:active {
          cursor: grabbing;
        }

        .testimonials-slider-container::-webkit-scrollbar {
          display: none;
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

        @media (max-width: 767px) {
          .testimonial-slider-card {
            width: min(85vw, 320px) !important;
            min-width: min(85vw, 320px) !important;
            max-width: min(85vw, 320px) !important;
            padding: 22px 18px !important;
            gap: 16px !important;
            border-radius: 16px !important;
          }

          .testimonial-quote-text {
            font-size: 14px !important;
            line-height: 1.45 !important;
          }

          .testimonial-author-name {
            font-size: 14.5px !important;
          }

          .testimonial-author-role {
            font-size: 12px !important;
          }

          .testimonial-rating-num {
            font-size: 60px !important;
          }
        }
      `}</style>

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
                <div className="testimonial-rating-num" style={{ fontSize: '92px', fontWeight: 400, lineHeight: 1, color: '#ffffff' }}>{item.rating}</div>

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
                <div className="testimonial-quote-text" style={{ fontSize: '18px', lineHeight: 1.4, color: '#ffffff', fontWeight: 400 }}>
                  “{item.quote}”
                </div>

                <div>
                  <div className="testimonial-author-name" style={{ fontSize: '17px', fontWeight: 500, color: '#ffffff' }}>{item.name}</div>
                  <div className="testimonial-author-role" style={{ fontSize: '13px', color: '#BFBEC9', fontWeight: 400, marginTop: '4px' }}>{item.role}</div>
                </div>
              </>
            )}

            {/* Image Quote Card */}
            {item.type === 'image' && (
              <>
                <div className="testimonial-quote-text" style={{ fontSize: '18px', lineHeight: 1.4, color: '#ffffff', fontWeight: 400 }}>
                  “{item.quote}”
                </div>

                <div>
                  <div className="testimonial-author-name" style={{ fontSize: '17px', fontWeight: 500, color: '#ffffff' }}>{item.name}</div>
                  <div className="testimonial-author-role" style={{ fontSize: '13px', color: '#BFBEC9', fontWeight: 400, marginTop: '4px' }}>{item.role}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
