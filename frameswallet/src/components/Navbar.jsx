import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ children, to, isActive }) => {
  const [hovered, setHovered] = useState(false);

  const isRouterLink = to.startsWith('/') && !to.startsWith('/#');

  const baseStyle = {
    cursor: 'pointer',
    color: isActive
      ? '#39FF14'
      : hovered
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(255, 255, 255, 0.8)',
    transition: 'color 0.2s ease',
    textDecoration: 'none',
    display: 'inline-block',
  };

  if (isRouterLink) {
    const handleClick = (e) => {
      if (isActive) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    return (
      <Link
        to={to}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={baseStyle}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={baseStyle}
    >
      {children}
    </a>
  );
};

const ConnectButton = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to="/connect" style={{ textDecoration: 'none' }}>
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
    </Link>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isTeamPage = location.pathname === '/team';
  const isConnectPage = location.pathname === '/connect';

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

      {/* Brand Logo — click goes home */}
      <Link 
        to="/"
        onClick={(e) => {
          if (isHomePage) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        <img
          src="/logo.webp"
          alt="Frames Wallet"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid rgba(57, 255, 20, 0.5)',
            boxShadow: '0 0 12px rgba(57, 255, 20, 0.3)',
            cursor: 'pointer'
          }}
        />
      </Link>

      {/* Nav Link Array */}
      <div style={{
        display: 'flex',
        gap: '40px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px',
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>
        <NavLink to="/" isActive={isHomePage}>Home</NavLink>
        <NavLink to={isHomePage ? '#projects' : '/#projects'}>Projects</NavLink>
        <NavLink to="/team" isActive={isTeamPage}>Team</NavLink>
      </div>

      {/* Connect Button */}
      <ConnectButton />
    </nav>
  );
}
