import React from 'react';

const techStack = [
  { name: 'Swift', icon: 'https://fireart.studio/wp-content/uploads/2025/06/swift-logo-with-text.svg' },
  { name: 'React Native', icon: 'https://fireart.studio/wp-content/uploads/2025/06/react-native-1.svg' },
  { name: 'Node.JS', icon: 'https://fireart.studio/wp-content/uploads/2025/06/node-js-seeklogo-1.svg' },
  { name: 'Apple', icon: 'https://fireart.studio/wp-content/uploads/2025/06/apple-1.svg' },
  { name: 'Xcode', icon: 'https://fireart.studio/wp-content/uploads/2025/06/xcode-1.svg' },
  { name: 'Android', icon: 'https://fireart.studio/wp-content/uploads/2025/06/android-1.svg' },
  { name: 'Ruby on Rails', icon: 'https://fireart.studio/wp-content/uploads/2025/06/ruby-on-rails-1.svg' },
  { name: 'Firebase', icon: 'https://fireart.studio/wp-content/uploads/2025/06/firebase-1.svg' },
  { name: 'AWS', icon: 'https://fireart.studio/wp-content/uploads/2025/06/aws-1.svg' },
  { name: 'Google Cloud', icon: 'https://fireart.studio/wp-content/uploads/2025/06/google-cloud-1.svg' }
];

export default function TechStack() {
  return (
    <section style={{
      background: '#F5F5F6',
      paddingTop: '60px',
      paddingBottom: '100px',
      color: '#000000',
      fontFamily: "'Inter', sans-serif"
    }}>
      <style>{`
        .tech-tile-item {
          transition: transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
        }
        .tech-tile-item:hover {
          transform: translateY(-4px);
          background-color: #FFFFFF !important;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
        }
        .tech-tile-icon {
          max-width: 58px;
          max-height: 44px;
          object-fit: contain;
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .tech-header-block {
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: center !important;
          }
          .tech-grid-container {
            justify-content: center !important;
          }
        }

        @media (max-width: 767px) {
          .tech-grid-container {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          .tech-tile-item {
            width: 100% !important;
            height: 144px !important;
            border-radius: 20px !important;
            padding: 1.5rem !important;
          }
          .tech-tile-icon {
            max-width: 76px !important;
            max-height: 60px !important;
          }
        }
      `}</style>

      <div style={{
        maxWidth: '1656px',
        margin: '0 auto',
        paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 5rem)'
      }}>
        {/* Header Block */}
        <div 
          className="tech-header-block"
          style={{ maxWidth: '820px', marginBottom: '3.25rem' }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#000000',
            marginBottom: '1rem'
          }}>
            Technologies we use
          </h2>
          <p style={{
            fontSize: 'clamp(0.98rem, 1.35vw, 1.12rem)',
            lineHeight: 1.6,
            color: '#52525B',
            margin: 0
          }}>
            From modern web frameworks and mobile SDKs to cloud infrastructure, we leverage a high-performance tech stack engineered to build fast, scale seamlessly, and deliver exceptional digital experiences.
          </p>
        </div>

        {/* Tech Grid matching screenshot */}
        <div 
          className="tech-grid-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.25rem'
          }}
        >
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="tech-tile-item"
              title={tech.name}
              style={{
                width: '106px',
                height: '106px',
                backgroundColor: '#EFEFEF',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="tech-tile-icon"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
