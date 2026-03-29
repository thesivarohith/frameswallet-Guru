import React, { useState, useEffect } from 'react';

const NavLink = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        color: hovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.8)',
        transition: 'color 0.2s ease',
        textDecoration: 'none'
      }}
    >
      {children}
    </span>
  );
};

const ConnectButton = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(46, 204, 68, 0.95)' : 'rgba(57, 255, 20, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(57,255,20,0.6)',
        borderTop: '1px solid rgba(255,255,255,0.3)',
        boxShadow: hovered 
          ? '0 6px 24px rgba(57,255,20,0.5), inset 0 1px 0 rgba(255,255,255,0.3)'
          : '0 4px 16px rgba(57,255,20,0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
        color: '#000',
        fontWeight: '700',
        borderRadius: '50px',
        padding: '10px 24px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
    >
      Connect
    </button>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)',
      maxWidth: '1200px',
      zIndex: 1000,
      padding: '12px 24px',
      background: scrolled ? 'rgba(255,255,255,0.07)' : 'rgba(255, 255, 255, 0.04)',
      backdropFilter: scrolled ? 'blur(80px) saturate(200%)' : 'blur(60px) saturate(180%) brightness(1.1)',
      WebkitBackdropFilter: scrolled ? 'blur(80px) saturate(200%)' : 'blur(60px) saturate(180%) brightness(1.1)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
      borderRadius: '28px',
      boxShadow: `
        0 8px 32px rgba(0, 0, 0, 0.4),
        0 1px 0 rgba(255,255,255,0.12) inset,
        0 -1px 0 rgba(255,255,255,0.04) inset,
        inset 0 0 80px rgba(255,255,255,0.02)
      `,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.4s ease'
    }}>
      {/* Absolute Shimmer Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        background: `linear-gradient(
          135deg,
          rgba(255,255,255,0.06) 0%,
          rgba(255,255,255,0.00) 40%,
          rgba(255,255,255,0.03) 100%
        )`,
        pointerEvents: 'none',
        zIndex: -1
      }} />

      {/* Brand */}
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '22px',
        fontStyle: 'italic',
        color: '#39FF14'
      }}>
        frames.wallet
      </div>

      {/* Nav Link Array */}
      <div style={{
        display: 'flex',
        gap: '40px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px',
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>
        <NavLink>Projects</NavLink>
        <NavLink>Team</NavLink>
        <NavLink>Revenue</NavLink>
        <NavLink>Testimonials</NavLink>
      </div>

      {/* Connect Button */}
      <ConnectButton />
    </nav>
  );
}
