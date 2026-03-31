import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

export default function ConnectPage() {
  const [hoveredSubmit, setHoveredSubmit] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate background stars
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div style={{ background: '#030303', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Navbar />

      {/* Floating particles background */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          background: 'rgba(255,255,255,0.7)',
          borderRadius: '50%',
          boxShadow: '0 0 8px rgba(255,255,255,0.8)',
          animation: `twinkle ${p.duration}s infinite alternate ${p.delay}s`,
          pointerEvents: 'none'
        }} />
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}}/>

      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '160px 24px 80px',
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20, padding: '6px 16px',
            fontFamily: "'Inter', sans-serif", fontSize: 12,
            color: '#aaa', marginBottom: 24,
            background: 'rgba(255,255,255,0.03)'
          }}>
            Get In Touch
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: 'clamp(40px, 6vw, 64px)',
            color: '#F5F0E8', margin: 0, lineHeight: 1.1
          }}>
            Let's Start a<br/>
            <span style={{ color: '#39FF14', textShadow: '0 0 40px rgba(57,255,20,0.3)' }}>Conversation</span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 16,
            color: 'rgba(245,240,232,0.6)',
            maxWidth: 600, margin: '24px auto 0', lineHeight: 1.6
          }}>
            Ready to transform your footage? Fill out the form below<br/>
            and our team will get back to you within 24 hours
          </p>
        </div>

        {/* Two column layout */}
        <div style={{
          display: 'flex', gap: 24, width: '100%',
          flexDirection: window.innerWidth < 900 ? 'column' : 'row' // simple responsive
        }}>
          {/* Left Col - Contact Info */}
          <div style={{
            flex: 1,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 16, padding: 48,
          }}>
            <h2 style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 24,
              color: '#fff', marginBottom: 40, marginTop: 0
            }}>Contact Information</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {/* Email */}
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: '#39FF14',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <EmailIcon />
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, color: '#fff', marginBottom: 4 }}>Email Us</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,240,232,0.6)' }}>frameswallet@gmail.com</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,240,232,0.4)', marginTop: 2 }}>We reply within 24 hours</div>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: '#39FF14',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <PhoneIcon />
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, color: '#fff', marginBottom: 4 }}>Call Us</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,240,232,0.6)' }}>+91 XXXXX XXXXX</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,240,232,0.4)', marginTop: 2 }}>7 days a week: 9am - 8pm</div>
                </div>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: '#39FF14',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <LocationIcon />
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, color: '#fff', marginBottom: 4 }}>Visit Us</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,240,232,0.6)' }}>Chennai · Coimbatore</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,240,232,0.4)', marginTop: 2 }}>Remote worldwide</div>
                </div>
              </div>
            </div>
            
            {/* List items with bullet */}
            <div style={{ marginTop: 48, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                "Free consultation and strategy session",
                "Custom solutions tailored to your needs",
                "Quick response within 24 hours",
                "No obligation, no pressure approach"
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#39FF14' }}></div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,240,232,0.7)' }}>{text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col - Form */}
          <div style={{
            flex: 1.2,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 16, padding: 48,
          }}>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              <div>
                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#fff', marginBottom: 8, fontWeight: 500 }}>Your Name *</label>
                <input type="text" placeholder="Your Name" style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 14,
                  outline: 'none', transition: 'border-color 0.2s'
                }} onFocus={(e) => e.target.style.borderColor = '#39FF14'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#fff', marginBottom: 8, fontWeight: 500 }}>Contact Number *</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 14,
                  outline: 'none', transition: 'border-color 0.2s'
                }} onFocus={(e) => e.target.style.borderColor = '#39FF14'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#fff', marginBottom: 8, fontWeight: 500 }}>Email Address *</label>
                <input type="email" placeholder="you@example.com" style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 14,
                  outline: 'none', transition: 'border-color 0.2s'
                }} onFocus={(e) => e.target.style.borderColor = '#39FF14'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#fff', marginBottom: 8, fontWeight: 500 }}>Service Needed *</label>
                <select style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 14,
                  outline: 'none', transition: 'border-color 0.2s', appearance: 'none'
                }} onFocus={(e) => e.target.style.borderColor = '#39FF14'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}>
                  <option value="" disabled selected>Select a service</option>
                  <option value="reel" style={{background: '#111'}}>Reel Editing</option>
                  <option value="film" style={{background: '#111'}}>Film Editing</option>
                  <option value="color" style={{background: '#111'}}>Color Grading</option>
                  <option value="motion" style={{background: '#111'}}>Motion Graphics</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#fff', marginBottom: 8, fontWeight: 500 }}>Message (Optional)</label>
                <textarea rows="4" placeholder="Tell us about your project..." style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 14,
                  outline: 'none', transition: 'border-color 0.2s', resize: 'vertical'
                }} onFocus={(e) => e.target.style.borderColor = '#39FF14'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
              </div>

              <button
                onMouseEnter={() => setHoveredSubmit(true)}
                onMouseLeave={() => setHoveredSubmit(false)}
                style={{
                  width: '100%', padding: '16px', marginTop: 8,
                  background: hoveredSubmit ? '#2ECC44' : '#39FF14',
                  border: 'none', borderRadius: 8,
                  color: '#000', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: hoveredSubmit ? '0 0 24px rgba(57,255,20,0.4)' : 'none'
                }}
              >
                Send Message
                <SendIcon />
              </button>

            </form>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
