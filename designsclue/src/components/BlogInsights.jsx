import React from 'react';
import { Link } from 'react-router-dom';
import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';

const blogPosts = [
  {
    title: 'Why should we use Webflow for our new Website',
    desc: 'Create stunning websites easily with Webflow. Enjoy responsive design, SEO-friendly features, and e-commerce capabilities.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccc6b7096f12eb8ed81_64a6ea19e07bd716ae122f99_blog-007.png',
    slug: '/blog/why-should-we-use-webflow-for-our-new-website'
  },
  {
    title: 'Why good webdesign is essential for SEO',
    desc: 'Boost your SEO with effective web design. Our well-crafted websites provide exceptional user experience, mobile-friendliness, fast loading times, and easy crawlability.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccc09a18d504047c6e5_649f2546d02efeaa0772be91_blog-005.png',
    slug: '/blog/why-good-webdesign-is-essential-for-seo'
  },
  {
    title: 'Web Design for SEO: Best Practices for On-Page Optimization',
    desc: "Boost your website's visibility with effective on-page optimization techniques. Learn the best practices of web design for SEO in this insightful blog article.",
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccc6e6ecfcb9a1decd5_64a6eb0da191c467c1aa34e6_blog-009.png',
    slug: '/blog/web-design-for-seo-best-practices-for-on-page-optimization'
  }
];

export default function BlogInsights() {
  return (
    <section id="blog" className="section is-white" style={{ backgroundColor: '#ffffff', padding: '7rem 0' }}>
      <style>{`
        .blog-card-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08) !important;
        }

        @media (max-width: 767px) {
          .blog-insights-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            justify-items: center !important;
          }
          .blog-card-item {
            max-width: 420px !important;
            width: 100% !important;
            margin: 0 auto !important;
          }
        }
      `}</style>

      <div className="container">
        <ScrollReveal>
          {/* Header & Controls */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end', 
              marginBottom: '3.5rem',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <span className="eyebrow" style={{ color: '#818180', marginBottom: '0.75rem', display: 'block' }}>
                INSIGHTS & ARTICLES
              </span>
              <h2 style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: '600',
                lineHeight: '1.12',
                letterSpacing: '-0.025em',
                color: '#131313'
              }}>
                Insights, updates, and news from our studio.
              </h2>
            </div>

            <div className="button-group" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Link
                to="/contact"
                className="button accent-orange"
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                <SplitText text="Personal consultation" />
              </Link>
              <Link
                to="/blog"
                className="button"
                style={{
                  backgroundColor: '#efeeec',
                  color: '#131313',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                <SplitText text="More Insights" />
              </Link>
            </div>
          </div>

          {/* 3 Blog Cards Grid */}
          <div 
            className="blog-insights-grid"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}
          >
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="blog-card-item"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflow: 'hidden',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '1.75rem', textAlign: 'left' }}>
                  <h3 style={{ color: '#131313', fontSize: '1.15rem', fontWeight: '600', lineHeight: '1.3', marginBottom: '0.75rem' }}>
                    {post.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    color: '#666666',
                    marginBottom: '1.5rem',
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.desc}
                  </p>
                  <Link
                    to={post.slug}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#131313',
                      textDecoration: 'none',
                      marginTop: 'auto'
                    }}
                  >
                    <span>Learn more</span>
                    <span style={{ color: '#ff5b03', fontWeight: '700', fontSize: '1rem' }}>↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
