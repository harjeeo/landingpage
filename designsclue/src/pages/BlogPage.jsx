import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Form from '../components/Form.jsx';

const posts = [
  {
    title: 'Why should we use Webflow for our new Website',
    desc: 'Create stunning websites easily with Webflow. Enjoy responsive design, SEO-friendly features, and e-commerce capabilities.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccc6b7096f12eb8ed81_64a6ea19e07bd716ae122f99_blog-007.png',
    slug: '/blog/why-should-we-use-webflow-for-our-new-website',
  },
  {
    title: 'Why good webdesign is essential for SEO',
    desc: 'Boost your SEO with effective web design. Our well-crafted websites provide exceptional user experience, mobile-friendliness, fast loading times, and easy crawlability.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccc09a18d504047c6e5_649f2546d02efeaa0772be91_blog-005.png',
    slug: '/blog/why-good-webdesign-is-essential-for-seo',
  },
  {
    title: 'Web Design for SEO: Best Practices for On-Page Optimization',
    desc: "Boost your website's visibility with effective on-page optimization techniques. Learn the best practices of web design for SEO in this insightful blog article.",
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccc6e6ecfcb9a1decd5_64a6eb0da191c467c1aa34e6_blog-009.png',
    slug: '/blog/web-design-for-seo-best-practices-for-on-page-optimization',
  },
  {
    title: 'What is Webflow?',
    desc: "Create beautiful, responsive websites without coding. Webflow's intuitive interface, CMS integration, and hosting make it a time-saving, cost-effective solution.",
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdcccd1e551661602699e_64b17602cb5040da34b4ac3a_blog-011.png',
    slug: '/blog/what-is-webflow',
  },
  {
    title: 'Tips for choosing the right CMS for your website',
    desc: "Make an informed decision when choosing a Content Management System (CMS) for your website. Discover tips on considering your website's needs, evaluating user interfaces, customization options, security features, and support.",
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccb8a5faff97c612abe_649f2619265b37a14fe683a8_blog-006.png',
    slug: '/blog/tips-for-choosing-the-right-cms-for-your-website',
  },
  {
    title: 'Strategies for Building a Strong Online Brand Presence',
    desc: 'Discover effective strategies for building a strong online brand presence. Define your identity, leverage content marketing, utilize social media, optimize your website, and monitor your reputation.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccb4670addbebdf6c12_64a6eaba0aa559cd3e06d8af_blog-008.png',
    slug: '/blog/strategies-for-building-a-strong-online-brand-presence',
  },
  {
    title: 'The Benefits of Using Webflow for your Website',
    desc: "Unlock Webflow's Benefits: Design, SEO, & More. Elevate Your Website Now!",
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccb754024c6c87aef53_653fbd87fb142c389c71f561_blog-015.jpeg',
    slug: '/blog/the-benefits-of-using-webflow-for-your-website',
  },
  {
    title: 'SEO-Friendly Web Design: Tips for Optimizing Your Website for Search Engines',
    desc: "Enhance your website's SEO with design optimization tips. Learn how responsive design, image optimization, SEO-friendly URLs, and more can boost your rankings.",
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccb83813f632d6b54d1_64e4d4b695091af3096ba24d_blog-014.jpeg',
    slug: '/blog/seo-friendly-web-design-tips-for-optimizing-your-website-for-search-engines',
  },
  {
    title: 'Optimizing Contact Forms for Higher Conversions',
    desc: 'Optimize your website forms for higher conversions with these essential tips. Keep it simple, use clear language, go mobile-friendly, leverage social proof, offer incentives.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccbf6101538dcb95ffc_64b177c0e501e03679d8376c_blog-010.png',
    slug: '/blog/optimizing-contact-forms-for-higher-conversions',
  },
  {
    title: 'Building a Successful Brand Identity through Web Design',
    desc: 'Learn how to build a successful brand identity through web design. Understand your brand and target audience, focus on user experience, use responsive design, incorporate social media, and maintain consistency.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdcca6516423e615fe0ec_649dc0e87fd23ab4bf305193_blog-002.png',
    slug: '/blog/building-a-successful-brand-identity-through-web-design',
  },
  {
    title: 'Generate More Leads with a Professional Website',
    desc: 'Unlock business growth with a professional website. Learn lead generation tips for a user-friendly, high-impact online presence. Invest wisely.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccaf6101538dcb95f8f_64c11b28c5ee7abe34f5b628_blog-012.jpeg',
    slug: '/blog/generate-more-leads-with-a-professional-website',
  },
  {
    title: 'Designing effective Call-to-Action Buttons for Higher Conversion Rates',
    desc: "Learn valuable tips and best practices for designing effective call-to-action (CTA) buttons that can improve your website's conversion rate.",
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccaf56299e239d9bdb9_649dc2751ef6c1a702fd1f8c_blog-003.png',
    slug: '/blog/designing-effective-call-to-action-buttons-for-higher-conversion-rates',
  },
  {
    title: 'Fathom Analytics - Is it better than Google Analytics?',
    desc: 'Discover why Fathom Analytics is a better choice than Google Analytics. With its privacy-focused approach, user-friendly interface, affordable pricing, and faster load times.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdcca232f698c4b95de80_649dbfe71ef6c1a702f99bc6_blog-001.png',
    slug: '/blog/fathom-analytics-is-it-better-than-google-analytics',
  },
  {
    title: 'How to Improve Website Loading Speed',
    desc: 'Website speed directly impacts bounce rates and conversions. Learn proven techniques to optimize images, leverage caching, and reduce server response times for a lightning-fast website.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccb83813f632d6b54d1_64e4d4b695091af3096ba24d_blog-014.jpeg',
    slug: '/blog/how-to-improve-website-loading-speed',
  },
  {
    title: 'The Role of Typography in Web Design',
    desc: 'Typography sets the tone of your entire brand. Discover how font choice, size, spacing, and hierarchy influence readability, user trust, and overall conversion performance.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdcca6516423e615fe0ec_649dc0e87fd23ab4bf305193_blog-002.png',
    slug: '/blog/the-role-of-typography-in-web-design',
  },
  {
    title: 'Understanding UX vs UI: What is the Difference?',
    desc: 'UX and UI are often used interchangeably, but they mean very different things. This article breaks down both disciplines, their overlap, and why both matter for your digital product.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccaf56299e239d9bdb9_649dc2751ef6c1a702fd1f8c_blog-003.png',
    slug: '/blog/understanding-ux-vs-ui-what-is-the-difference',
  },
  {
    title: 'E-commerce Design Best Practices to Boost Sales',
    desc: 'Your online store design can make or break conversions. From product page layouts to checkout flow optimizations, learn the design principles that top e-commerce brands use to maximise sales.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccb4670addbebdf6c12_64a6eaba0aa559cd3e06d8af_blog-008.png',
    slug: '/blog/ecommerce-design-best-practices-to-boost-sales',
  },
  {
    title: 'How to Write Content that Converts',
    desc: 'Great copy turns visitors into customers. Learn how to write compelling headlines, structure persuasive body copy, and craft CTAs that drive action across your website and landing pages.',
    image: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccbf6101538dcb95ffc_64b177c0e501e03679d8376c_blog-010.png',
    slug: '/blog/how-to-write-content-that-converts',
  },
];

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
      <Navbar />

      <style>{`
        .bp-card {
          background-color: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          cursor: pointer;
        }
        .bp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.10);
        }
        .bp-card:hover .bp-img {
          transform: scale(1.06);
        }
        .bp-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          display: block;
        }
        @media (max-width: 900px) {
          .bp-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .bp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero */}
      <section style={{
        background: '#ffffff',
        paddingTop: '9rem',
        paddingBottom: '2.5rem',
        paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
      }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#818180',
            marginBottom: '1.5rem',
            fontFamily: 'monospace',
          }}>
            INSIGHTS &amp; ARTICLES
          </p>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.2vw, 3.1rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: '#131313',
            margin: 0,
            maxWidth: '820px',
          }}>
            Insights, updates, and news from our studio.
          </h1>
        </div>
      </section>

      {/* Blog Grid — 18 cards, same style as home page */}
      <section style={{
        background: '#ffffff',
        paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
        paddingTop: '3.5rem',
        paddingBottom: '6rem',
      }}>
        <div style={{ maxWidth: '1656px', margin: '0 auto' }}>
          <div
            className="bp-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
            }}
          >
            {posts.map((post, index) => (
              <Link key={index} to={post.slug} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                <article className="bp-card">
                  {/* Image */}
                  <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="bp-img"
                    />
                  </div>

                  {/* Content */}
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '1.75rem', textAlign: 'left' }}>
                    <h3 style={{
                      color: '#131313',
                      fontSize: '1.15rem',
                      fontWeight: '600',
                      lineHeight: '1.3',
                      margin: '0 0 0.75rem',
                    }}>
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
                      overflow: 'hidden',
                    }}>
                      {post.desc}
                    </p>

                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#131313',
                      marginTop: 'auto',
                    }}>
                      <span>Learn more</span>
                      <span style={{ color: '#ff5b03', fontWeight: '700', fontSize: '1rem' }}>↗</span>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Form />
      <Footer />
    </div>
  );
}
