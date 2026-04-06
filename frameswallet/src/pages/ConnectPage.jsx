import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ConnectPage() {
  const cursorRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [revealed, setRevealed] = useState([]);
  const [isDesktop] = useState(() => window.matchMedia('(pointer: fine)').matches);

  // Mouse cursor dot — desktop only
  useEffect(() => {
    const dot = cursorRef.current;
    if (!dot) return;
    const onMove = (e) => {
      dot.style.left = e.clientX - 4 + 'px';
      dot.style.top = e.clientY - 4 + 'px';
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  // Scroll reveal on mount
  useEffect(() => {
    const ids = ['badge', 'h1', 'h2', 'sub', 'item0', 'div0', 'item1', 'div1', 'item2', 'bottom'];
    ids.forEach((id, i) => {
      setTimeout(() => setRevealed((prev) => [...prev, id]), 200 + i * 150);
    });
  }, []);

  const revealStyle = (id) => ({
    opacity: revealed.includes(id) ? 1 : 0,
    transform: revealed.includes(id) ? 'translateY(0)' : 'translateY(40px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  });

  const labelStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 10,
    letterSpacing: 5,
    color: 'rgba(57,255,20,0.5)',
    textTransform: 'uppercase',
    marginBottom: 8,
  };

  const underlineBase = {
    display: 'block',
    height: 2,
    background: '#39FF14',
    width: '0%',
    transition: 'width 0.4s ease',
    marginTop: 4,
  };

  return (
    <div style={{ background: '#000000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Cursor Dot — desktop only */}
      {isDesktop && (
        <div
          ref={cursorRef}
          style={{
            width: hoveredItem ? 24 : 8,
            height: hoveredItem ? 24 : 8,
            background: hoveredItem ? 'transparent' : '#39FF14',
            border: hoveredItem ? '2px solid #39FF14' : 'none',
            borderRadius: '50%',
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 9999,
            boxShadow: hoveredItem ? '0 0 20px rgba(57,255,20,0.5)' : '0 0 16px rgba(57,255,20,0.8)',
            transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border 0.2s ease, box-shadow 0.2s ease',
            marginLeft: hoveredItem ? -12 : -4,
            marginTop: hoveredItem ? -12 : -4,
            opacity: hoveredItem ? 0.4 : 1,
          }}
        />
      )}

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(120px, 14vw, 160px) clamp(20px, 5vw, 40px) 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            fontSize: 400,
            fontFamily: "'Playfair Display', serif",
            color: 'rgba(57,255,20,0.015)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 0,
            letterSpacing: -20,
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          fw
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Badge */}
          <div
            style={{
              ...revealStyle('badge'),
              background: 'rgba(57,255,20,0.08)',
              border: '1px solid rgba(57,255,20,0.2)',
              color: '#39FF14',
              fontSize: 11,
              letterSpacing: 4,
              borderRadius: 20,
              padding: '6px 20px',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              marginBottom: 48,
              display: 'inline-block',
            }}
          >
            Let's talk
          </div>

          {/* Heading */}
          <h1
            style={{
              ...revealStyle('h1'),
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(48px, 8vw, 120px)',
              color: '#F5F0E8',
              lineHeight: 1,
              margin: 0,
            }}
          >
            Got a project
          </h1>
          <h1
            style={{
              ...revealStyle('h2'),
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(48px, 8vw, 120px)',
              color: '#39FF14',
              textShadow: '0 0 80px rgba(57,255,20,0.3)',
              lineHeight: 1,
              margin: '0 0 48px',
            }}
          >
            in mind?
          </h1>

          {/* Subtext */}
          <p
            style={{
              ...revealStyle('sub'),
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              color: 'rgba(245,240,232,0.4)',
              letterSpacing: 1,
              marginBottom: 80,
              marginTop: 0,
            }}
          >
            We're one message away.
          </p>

          {/* Contact Items */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {/* WhatsApp */}
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredItem('wa')}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                ...revealStyle('item0'),
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'transform 0.3s ease, opacity 0.7s ease',
                transform: revealed.includes('item0')
                  ? hoveredItem === 'wa' ? 'scale(1.02)' : 'scale(1)'
                  : 'translateY(40px)',
                cursor: 'pointer',
              }}
            >
              <div style={labelStyle}>WHATSAPP</div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 5vw, 72px)',
                  color: hoveredItem === 'wa' ? '#39FF14' : '#F5F0E8',
                  transition: 'color 0.3s ease',
                }}
              >
                +91 XXXXX XXXXX
              </div>
              <span style={{ ...underlineBase, width: hoveredItem === 'wa' ? '100%' : '0%' }} />
            </a>

            {/* Divider */}
            <div
              style={{
                ...revealStyle('div0'),
                width: 1,
                height: 40,
                background: 'rgba(57,255,20,0.1)',
                margin: '20px auto',
              }}
            />

            {/* Email */}
            <a
              href="mailto:frameswallet@gmail.com"
              onMouseEnter={() => setHoveredItem('email')}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                ...revealStyle('item1'),
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'transform 0.3s ease, opacity 0.7s ease',
                transform: revealed.includes('item1')
                  ? hoveredItem === 'email' ? 'scale(1.02)' : 'scale(1)'
                  : 'translateY(40px)',
                cursor: 'pointer',
              }}
            >
              <div style={labelStyle}>EMAIL</div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(24px, 3.5vw, 52px)',
                  color: hoveredItem === 'email' ? '#39FF14' : '#F5F0E8',
                  transition: 'color 0.3s ease',
                }}
              >
                frameswallet@gmail.com
              </div>
              <span style={{ ...underlineBase, width: hoveredItem === 'email' ? '100%' : '0%' }} />
            </a>

            {/* Divider */}
            <div
              style={{
                ...revealStyle('div1'),
                width: 1,
                height: 40,
                background: 'rgba(57,255,20,0.1)',
                margin: '20px auto',
              }}
            />

            {/* Instagram */}
            <a
              href="https://instagram.com/frameswallet"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredItem('ig')}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                ...revealStyle('item2'),
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'transform 0.3s ease, opacity 0.7s ease',
                transform: revealed.includes('item2')
                  ? hoveredItem === 'ig' ? 'scale(1.02)' : 'scale(1)'
                  : 'translateY(40px)',
                cursor: 'pointer',
              }}
            >
              <div style={labelStyle}>INSTAGRAM</div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: 'clamp(24px, 3.5vw, 52px)',
                  color: hoveredItem === 'ig' ? '#39FF14' : 'rgba(245,240,232,0.6)',
                  transition: 'color 0.3s ease',
                }}
              >
                @frames.wallet
              </div>
              <span style={{ ...underlineBase, width: hoveredItem === 'ig' ? '100%' : '0%' }} />
            </a>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              ...revealStyle('bottom'),
              marginTop: 100,
              paddingTop: 40,
              borderTop: '1px solid rgba(57,255,20,0.08)',
              width: '100%',
              maxWidth: 600,
              display: 'flex',
              justifyContent: 'space-between',
              textAlign: 'left',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  letterSpacing: 3,
                  color: 'rgba(245,240,232,0.3)',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Based in
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: '#F5F0E8',
                }}
              >
                Chennai · Coimbatore · Remote
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  letterSpacing: 3,
                  color: 'rgba(245,240,232,0.3)',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Available
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: '#F5F0E8',
                }}
              >
                7 days · 9am - 8pm
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
