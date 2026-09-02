import React, { useState } from 'react';
import { submitLead } from '../lib/leads';

export default function Form({ title = "You have an idea.\nWe have the team." }) {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('info@designsclue.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    if (!name || !email) return;

    setError('');
    setSubmitting(true);
    try {
      await submitLead({
        name,
        contact: email,
        sourcePage: window.location.pathname,
        message: [
          data.get('company') && `Company: ${data.get('company')}`,
          data.get('phone') && `Phone: ${data.get('phone')}`,
          data.get('industry') && `Industry: ${data.get('industry')}`,
          data.get('companySize') && `Company size: ${data.get('companySize')}`,
          data.get('website') && `Current website: ${data.get('website')}`,
          data.get('launch') && `Planned launch: ${data.get('launch')}`,
          data.get('details') && `Details: ${data.get('details')}`,
        ]
          .filter(Boolean)
          .join('\n'),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    height: '56px',
    padding: '0 20px',
    background: '#F5F5F6',
    border: 'none',
    borderRadius: '14px',
    fontSize: '15px',
    color: '#000000',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '18px',
    fontWeight: 400,
    color: '#000000',
    marginBottom: '12px'
  };

  return (
    <section id="contact" style={{
      background: '#F5F5F6',
      paddingLeft: 'clamp(1.25rem, 5vw, 5rem)',
      paddingRight: 'clamp(1.25rem, 5vw, 5rem)',
      paddingTop: 'clamp(3.5rem, 7vw, 6rem)',
      paddingBottom: 'clamp(2rem, 4vw, 3.5rem)',
    }}>
      <style>{`
        @media (max-width: 991px) {
          .service-content-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .quote-left-col {
            position: static !important;
          }
        }

        @media (max-width: 767px) {
          .form-card-container {
            padding: 24px 18px !important;
            border-radius: 18px !important;
          }
          .form-grid-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            margin-bottom: 20px !important;
          }
          .form-phones-grid, .form-address-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .form-label {
            font-size: 15px !important;
            margin-bottom: 8px !important;
          }
          .form-input {
            height: 48px !important;
            font-size: 14px !important;
            padding: 0 16px !important;
            border-radius: 12px !important;
          }
          .form-section-title {
            font-size: 20px !important;
            margin-bottom: 20px !important;
          }
          .form-submit-btn {
            height: 42px !important;
            font-size: 14px !important;
            max-width: 220px !important;
            margin: 0 auto !important;
            display: block !important;
          }
        }
      `}</style>

      <div
        className="service-content-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}
      >
        {/* Left Column */}
        <div className="quote-left-col" style={{ position: 'sticky', top: 'max(100px, calc(50vh - 230px))', alignSelf: 'start' }}>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#FF470A',
            marginBottom: '1rem',
            fontFamily: 'monospace',
          }}>Request a quote</p>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
            fontWeight: 400,
            color: '#000000',
            letterSpacing: '-0.035em',
            lineHeight: 1.12,
            margin: '0 0 1.25rem',
            whiteSpace: 'pre-line'
          }}>
            {title}
          </h2>
          {[
            'Design, development, and strategy — all in one place.',
            'Tailored advice instead of generic solutions.',
            'A transparent process from concept to launch.'
          ].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'rgba(255, 71, 10, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="#FF470A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p style={{ color: '#000000', fontSize: '0.95rem', lineHeight: 1.55, margin: 0, fontWeight: 400 }}>{item}</p>
            </div>
          ))}

          {/* Contact Information Details (Email, Phone, Address) */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid #E4E4E7' }}>
            {/* Row 1: Email (Left) & Phone (Right) */}
            <div className="form-email-phone-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {/* Email Section */}
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#000000', margin: '0 0 0.4rem' }}>
                  Email
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <a 
                    href="mailto:info@designsclue.com" 
                    style={{ color: '#000000', fontSize: '1.05rem', fontWeight: 400, textDecoration: 'none' }}
                  >
                    info@designsclue.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email address"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '2px',
                      cursor: 'pointer',
                      color: copied ? '#10B981' : '#71717A',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {copied ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone Section (Right of Email) */}
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#000000', margin: '0 0 0.4rem' }}>
                  Phone
                </h4>
                <div>
                  <a href="tel:+919814522993" style={{ fontSize: '0.92rem', color: '#000000', fontWeight: 400, textDecoration: 'none' }}>+91-9814522993</a>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#000000', margin: '0 0 0.5rem' }}>
                Address
              </h4>
              <div>
                <p style={{ fontSize: '0.92rem', color: '#000000', margin: 0, lineHeight: 1.5, fontWeight: 400 }}>
                  Bulara Rd, back side G.N.E College,
                </p>
                <p style={{ fontSize: '0.92rem', color: '#000000', margin: 0, lineHeight: 1.5, fontWeight: 400 }}>
                  Ludhiana, Gill, Punjab 141116
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — 1:1 FIREART FORM CARD */}
        <div className="form-card-container" style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#FF470A',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '1.5rem'
              }}>✓</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 500, color: '#000000', marginBottom: '0.75rem' }}>Thank You!</h3>
              <p style={{ color: '#71717A', fontSize: '1rem', lineHeight: 1.6 }}>
                Your request has been received. Our team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <h3 className="form-section-title" style={{ fontSize: '24px', fontWeight: 400, color: '#000000', margin: '0 0 28px', lineHeight: 1.2 }}>
                Personal information
              </h3>
              
              {/* Row 1: Name & Company */}
              <div className="form-grid-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px', alignItems: 'end' }}>
                <div>
                  <label className="form-label" style={labelStyle}>
                    Name <span style={{ color: '#FF470A' }}>*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="form-input"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="form-label" style={labelStyle}>
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your Company"
                    className="form-input"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="form-grid-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px', alignItems: 'end' }}>
                <div>
                  <label className="form-label" style={labelStyle}>
                    Email <span style={{ color: '#FF470A' }}>*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Your Email-Address"
                    className="form-input"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="form-label" style={labelStyle}>
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Your Number"
                    className="form-input"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Horizontal Divider Line */}
              <div style={{ height: '1px', background: '#EDEDED', margin: '36px 0' }} />

              {/* Project Information */}
              <h3 className="form-section-title" style={{ fontSize: '24px', fontWeight: 400, color: '#000000', margin: '0 0 28px', lineHeight: 1.2 }}>
                Project information
              </h3>

              {/* Row 3: Industry & Company Size */}
              <div className="form-grid-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px', alignItems: 'end' }}>
                <div>
                  <label className="form-label" style={labelStyle}>
                    In which industry do you work? <span style={{ color: '#FF470A' }}>*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="industry"
                    placeholder="Your branch"
                    className="form-input"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="form-label" style={labelStyle}>
                    Company size <span style={{ color: '#FF470A' }}>*</span>
                  </label>
                  <select
                    required
                    name="companySize"
                    className="form-input"
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="">Please select...</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="101-200">101-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Current Website & Planned Launch */}
              <div className="form-grid-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px', alignItems: 'end' }}>
                <div>
                  <label className="form-label" style={labelStyle}>
                    Current website
                  </label>
                  <input
                    type="text"
                    name="website"
                    placeholder="Your current website"
                    className="form-input"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="form-label" style={labelStyle}>
                    Planned launch
                  </label>
                  <input
                    type="text"
                    name="launch"
                    placeholder="Planned launch"
                    className="form-input"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 5: Additional Project Information */}
              <div style={{ marginBottom: '32px' }}>
                <label className="form-label" style={labelStyle}>
                  Additional project informations <span style={{ color: '#FF470A' }}>*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  name="details"
                  placeholder="Short project summary + planned goals"
                  className="form-input"
                  style={{
                    ...inputStyle,
                    height: 'auto',
                    minHeight: '130px',
                    padding: '16px 20px',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Privacy Policy Agreement */}
              <p style={{ fontSize: '13px', color: '#71717A', lineHeight: 1.45, marginBottom: '24px' }}>
                By submitting this form, I agree that my information will be processed for the purpose of handling my request. Further details can be found in our <a href="#" style={{ color: '#000000', textDecoration: 'underline' }}>Privacy Policy</a>.
              </p>

              {error && (
                <p style={{ fontSize: '13px', color: '#FF470A', marginBottom: '16px' }}>{error}</p>
              )}

              {/* Orange Pill Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="form-submit-btn"
                style={{
                  background: '#FF470A',
                  color: '#ffffff',
                  border: 'none',
                  height: '56px',
                  borderRadius: '120px',
                  fontWeight: 500,
                  fontSize: '16px',
                  cursor: submitting ? 'default' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                  width: '100%',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e43f08'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#FF470A'}
              >
                {submitting ? 'Submitting…' : 'Submit request'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '13px', color: '#71717A', marginTop: '12px', marginBottom: 0 }}>
                100% free & non-binding
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
