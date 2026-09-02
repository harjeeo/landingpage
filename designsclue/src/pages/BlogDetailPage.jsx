import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Form from '../components/Form.jsx';

const blogArticles = {
  'why-good-webdesign-is-essential-for-seo': {
    title: 'Why good webdesign is essential for SEO',
    date: 'May 3, 2025',
    desc: 'Boost your SEO with effective web design. Our well-crafted websites provide exceptional user experience, mobile-friendliness, fast loading times, and easy crawlability.',
    img: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccc09a18d504047c6e5_649f2546d02efeaa0772be91_blog-005.png',
    sections: [
      {
        heading: 'User Experience (UX)',
        content: 'User experience (UX) is the overall experience that visitors have when they interact with your website. A well-designed website provides a positive user experience, which means that visitors can easily navigate and find the information they need. Search engines like Google take user experience into account when ranking websites. If your site is difficult to navigate, has slow loading times, or is cluttered with ads, it will negatively impact your search engine rankings.'
      },
      {
        heading: 'Mobile-Friendliness',
        content: 'With the rise of mobile devices, more and more people are using smartphones and tablets to browse the internet. As a result, Google includes mobile-friendliness as a key ranking factor. If your website is not optimized for mobile devices, you will be penalized in search engine rankings. A good web design ensures that your site is responsive and looks great on all screen sizes.'
      },
      {
        heading: 'Site Speed',
        content: 'Site speed is another important ranking factor for search engines. A website that loads quickly provides a better user experience and ranks higher in search results. Good web design takes into account factors affecting site speed, such as image compression, clean code structure, and efficient browser caching.'
      },
      {
        heading: 'Crawlability & Site Structure',
        content: 'Search engines use bots to crawl and index websites. A poorly designed website can make it difficult for these bots to crawl your site and index your content correctly. A good web design ensures your site structure is logical, clean, and easily crawlable with proper URL parameters.'
      },
      {
        heading: 'Branding & Trust',
        content: 'Your website is often the first impression potential clients have of your business. A well-designed website that reflects your brand identity builds trust and credibility with visitors, leading to higher engagement and longer dwell time.'
      },
      {
        heading: 'Security',
        content: 'Website security is essential for SEO. Search engines prioritize websites that are secure with valid SSL certificates (HTTPS). Good web design incorporates security best practices to protect your data and maintain high search visibility.'
      }
    ]
  },
  'why-should-we-use-webflow-for-our-new-website': {
    title: 'Why should we use Webflow for our new Website',
    date: 'April 28, 2025',
    desc: 'Create stunning websites easily with Webflow. Enjoy responsive design, SEO-friendly features, and e-commerce capabilities.',
    img: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccc6b7096f12eb8ed81_64a6ea19e07bd716ae122f99_blog-007.png',
    sections: [
      {
        heading: 'Unmatched Visual Development Flexibility',
        content: 'Webflow bridges the gap between design and production code. It allows designers to build clean, semantic HTML5, CSS3, and JavaScript visually, without compromising performance or custom code extensibility.'
      },
      {
        heading: 'Built-in CMS & Dynamic Content',
        content: 'With Webflow CMS, managing blog posts, portfolio projects, team members, and custom content types is seamless. Client editors can modify text and imagery directly on the live page without touching code.'
      },
      {
        heading: 'Enterprise-Grade Hosting & Security',
        content: 'Hosted on Amazon Web Services (AWS) and Fastly CDN, Webflow websites load lightning fast worldwide with 99.99% uptime, automated SSL certificates, and enterprise DDoS protection.'
      }
    ]
  },
  'web-design-for-seo-best-practices-for-on-page-optimization': {
    title: 'Web Design for SEO: Best Practices for On-Page Optimization',
    date: 'May 10, 2025',
    desc: "Boost your website's visibility with effective on-page optimization techniques. Learn the best practices of web design for SEO in this insightful article.",
    img: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccc6e6ecfcb9a1decd5_64a6eb0da191c467c1aa34e6_blog-009.png',
    sections: [
      {
        heading: 'Semantic HTML Structure',
        content: 'Using correct HTML5 elements (header, main, section, article, h1-h6) helps search engines understand page context and hierarchy easily.'
      },
      {
        heading: 'Image Optimization & Alt Text',
        content: 'Compressing images to modern WebP/AVIF formats and providing descriptive alt text improves both page load speeds and Google Image search rankings.'
      }
    ]
  }
};

export default function BlogDetailPage() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Fallback content if post slug is not explicitly defined above
  const article = blogArticles[slug] || {
    title: slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Blog Article',
    date: 'May 2025',
    desc: 'Discover key insights, strategies, and design practices for modern digital experiences.',
    img: 'https://cdn.prod.website-files.com/678e40df211f369be7e616da/680fdccc09a18d504047c6e5_649f2546d02efeaa0772be91_blog-005.png',
    sections: [
      {
        heading: 'Overview',
        content: 'Digital design and technical execution work hand-in-hand to build scalable, high-converting web applications. By focusing on user experience, performance, and clear brand identity, businesses create lasting value.'
      },
      {
        heading: 'Key Insights',
        content: 'High-performing websites prioritize speed, responsive layouts, accessibility, and clear calls to action across all screen dimensions.'
      }
    ]
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', 'DM Sans', sans-serif", color: '#131313' }}>
      <Navbar />

      <style>{`
        .blog-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          max-width: 1656px;
          margin: 0 auto;
          padding: 9rem clamp(1.5rem, 5vw, 4rem) 5rem;
        }

        @media (max-width: 991px) {
          .blog-header-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding-top: 7.5rem;
          }
        }
      `}</style>

      <main>
        {/* Article Header (2-Column Side-by-Side Grid) */}
        <section className="blog-header-grid">
          {/* Left Column: Image */}
          <div style={{
            width: '100%',
            aspectRatio: '16/10',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#efeeec',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
          }}>
            <img
              src={article.img}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Right Column: Date, Title, Description */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '1.05rem', color: '#818180', fontWeight: 500, marginBottom: '1.25rem' }}>
              {article.date}
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              color: '#131313',
              margin: '0 0 1.5rem'
            }}>
              {article.title}
            </h1>

            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.55,
              color: '#686868',
              margin: 0
            }}>
              {article.desc}
            </p>
          </div>
        </section>

        {/* Article Body */}
        <section style={{ maxWidth: '1656px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {article.sections.map((sec, idx) => (
              <div key={idx}>
                <h2 style={{
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#131313',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.25,
                  margin: '0 0 0.85rem'
                }}>
                  {sec.heading}
                </h2>
                <p style={{
                  fontSize: '1.08rem',
                  lineHeight: 1.7,
                  color: '#444444',
                  margin: 0
                }}>
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <Form />
      </main>

      <Footer />
    </div>
  );
}
