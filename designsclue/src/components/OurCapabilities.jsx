import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const capabilities = [
  {
    id: '01',
    title: 'Project scope definition',
    desc: (
      <>
        We can help you <b>define the scope, advise on the features and architecture</b> for your web page development, and <b>define deliverables and budget allocations</b>. Plus, our professional website development services include heads-up on any risks to the timeline and budget, and our plan to address them.
      </>
    )
  },
  {
    id: '02',
    title: 'Custom web development',
    desc: (
      <>
        Stop settling for a basic site when you can have a high-performance growth engine built by an elite web development team. Get the strategic web development for business that lets you scale fast and leave the competition in the dust.
      </>
    )
  },
  {
    id: '03',
    title: 'Post-launch support',
    desc: (
      <>
        For most clients, launching is just the beginning of our journey together. Our support naturally evolves into long-term maintenance to keep your product sharp and scaling. We are the team that <b>will stay beside you</b> to help with any necessary updates and build-ups.
      </>
    )
  },
  {
    id: '04',
    title: 'Custom web design',
    desc: (
      <>
        What makes you different? We make sure that your brand's image adds to the user's experience when using your website. The goal is to show all the great things that your company is.
      </>
    )
  },
  {
    id: '05',
    title: 'Website maintenance & support',
    desc: (
      <>
        We always have your back, from security to website support. With our web development team's support, you can always make your service look awesome.
      </>
    )
  },
  {
    id: '06',
    title: 'CMS implementation',
    desc: (
      <>
        Want easy control over your website? Our professional website development services include the <b>implementation of Content Management Systems (CMS)</b>, making it easy for you to update content and manage your site.
      </>
    )
  },
  {
    id: '07',
    title: 'Custom web application development',
    desc: (
      <>
        Do you have a great idea that calls for the ideal web development services? We can make it happen! We provide <b>custom web application development services for streamlined tools and innovative platforms</b>.
      </>
    )
  },
  {
    id: '08',
    title: 'Website performance optimization',
    desc: (
      <>
        Want a website that works? With Fireart as your web development company, your website is going to fly!
      </>
    )
  }
];

export default function OurCapabilities() {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse Drag State
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

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

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftPos.current = carouselRef.current.scrollLeft;
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseLeaveOrUp = () => {
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftPos.current - walk;
    updateScrollState();
  };

  const scrollToContactForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('contact') || document.getElementById('cta');
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section style={{ padding: '100px clamp(16px, 6vw, 132px)', background: '#F5F5F6', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        /* 1:1 Fireart Pill Button (Book a Call) */
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
        /* Arrow SVG moves on hover */
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

        /* Mobile Adjustments for Buttons & Cards */
        @media (max-width: 767px) {
          .fireart-btn-link {
            height: 44px !important;
            min-width: 135px !important;
            padding: 10px 46px 10px 16px !important;
            font-size: 14px !important;
            line-height: 20px !important;
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
          .capabilities-actions-row {
            gap: 10px !important;
            width: 100%;
            justify-content: space-between;
          }
          .capabilities-nav-btns {
            gap: 8px !important;
          }
          .capability-card {
            width: min(85vw, 320px) !important;
            min-width: min(85vw, 320px) !important;
            max-width: min(85vw, 320px) !important;
            padding: 24px 20px !important;
            gap: 16px !important;
          }
          .capability-card-title {
            font-size: 20px !important;
            line-height: 26px !important;
          }
          .capability-card-desc {
            font-size: 14px !important;
            line-height: 20px !important;
          }
        }

        /* Horizontal Carousel Styles for Cards 01 to 08 */
        .capabilities-carousel-container {
          display: flex;
          gap: 32px;
          overflow-x: auto;
          padding-bottom: 24px;
          user-select: none;
          cursor: grab;
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
      `}</style>

      <div style={{ maxWidth: '1656px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ maxWidth: '940px' }}>
            <h2 className="section-heading-title" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 20px', color: '#000000' }}>
              Our Capabilities
            </h2>
            <p style={{ fontSize: '20px', lineHeight: 1.4, color: '#76757F', fontWeight: 500, margin: 0 }}>
              Building a web product is always a ride. So, wouldn't you want a driver who's been on the road before and knows all the bumps? That's what we have for you — a <b>knowledgeable web development team</b> that voices out the best routes and shares good ideas.
            </p>
          </div>

          <div className="capabilities-actions-row" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#contact" onClick={scrollToContactForm} className="fireart-btn-link">
              <span>Book a call</span>
              <div className="fireart-btn-link-icon">
                <ArrowRight size={18} color="#ffffff" className="fireart-btn-arrow-svg" />
              </div>
            </a>

            {/* Slider Arrow Navigation Controls */}
            <div className="capabilities-nav-btns" style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={handlePrevCapability}
                disabled={!canScrollLeft}
                className="fireart-nav-btn"
              >
                <ChevronLeft size={20} />
              </button>

              <button 
                onClick={handleNextCapability}
                disabled={!canScrollRight}
                className="fireart-nav-btn"
              >
                <ChevronRight size={20} />
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
  );
}
