import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ children, to, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const isRouterLink = to.startsWith('/') && !to.startsWith('/#');

  const baseStyle = {
    cursor: 'pointer',
    color: isActive
      ? '#39FF14'
      : hovered
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(255, 255, 255, 0.8)',
    transition: 'color 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    display: 'inline-block',
  };

  if (isRouterLink) {
    const handleClick = (e) => {
      if (onClick) onClick(e);
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
      onClick={onClick}
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
          transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
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
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isProjectsPage = location.pathname === '/projects';
  const isTeamPage = location.pathname === '/team';
  const isConnectPage = location.pathname === '/connect';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Check if at the bottom of the page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Threshold to detect footer section
      const threshold = 100; 
      setIsAtBottom(scrollTop + windowHeight >= documentHeight - threshold);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      // On mobile: bottom if not at footer, top if at footer
      top: (isMobile && !isAtBottom) ? 'calc(100svh - 84px)' : '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)',
      maxWidth: '1200px',
      zIndex: 1000,
      padding: '12px 24px',
      background: scrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(24px) saturate(180%) brightness(1.1)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(1.1)',
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
      transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
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

      {/* Global Shimmer Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />

      {/* Brand Logo — click goes home */}
      <Link 
        to="/"
        className="brand-logo"
        style={{ position: 'relative', display: 'block', width: '42px', height: '42px' }}
        onClick={(e) => {
          if (isHomePage) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          zIndex: 0
        }} />
        <img
          src="/logo.webp"
          alt="Frames Wallet"
          onLoad={(e) => { e.currentTarget.style.opacity = 1; }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid rgba(57, 255, 20, 0.5)',
            boxShadow: '0 0 12px rgba(57, 255, 20, 0.3)',
            cursor: 'pointer',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            position: 'relative',
            zIndex: 1
          }}
        />
      </Link>

      {/* Desktop Nav Links */}
      <div className="desktop-nav-links" style={{
        display: 'flex',
        gap: '40px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        alignItems: 'center'
      }}>
        <NavLink to="/" isActive={isHomePage}>Home</NavLink>
        <NavLink to="/projects" isActive={isProjectsPage}>Projects</NavLink>
        <NavLink to="/team" isActive={isTeamPage}>Team</NavLink>
      </div>

      {/* Desktop Connect Button */}
      <div className="connect-btn-desktop">
        <ConnectButton />
      </div>

      {/* Mobile Nav Icons Row */}
      <div className="mobile-nav-icons" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 8px'
      }}>
        <Link to="/" style={{ 
          textDecoration: 'none',
          padding: '8px',
          borderRadius: '12px',
          background: isHomePage ? 'rgba(57,255,20,0.1)' : 'transparent',
          transition: 'all 0.3s ease'
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isHomePage ? '#39FF14' : 'rgba(255,255,255,0.6)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>
        <Link to="/projects" style={{ 
          textDecoration: 'none',
          padding: '8px',
          borderRadius: '12px',
          background: isProjectsPage ? 'rgba(57,255,20,0.1)' : 'transparent',
          transition: 'all 0.3s ease'
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isProjectsPage ? '#39FF14' : 'rgba(255,255,255,0.6)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </Link>
        <Link to="/team" style={{ 
          textDecoration: 'none',
          padding: '8px',
          borderRadius: '12px',
          background: isTeamPage ? 'rgba(57,255,20,0.1)' : 'transparent',
          transition: 'all 0.3s ease'
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isTeamPage ? '#39FF14' : 'rgba(255,255,255,0.6)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </Link>
        <Link to="/connect" style={{ 
          textDecoration: 'none', 
          background: isConnectPage ? '#39FF14' : 'rgba(57,255,20,0.05)', 
          border: isConnectPage ? '1px solid #39FF14' : '1px solid rgba(57,255,20,0.3)',
          borderRadius: '50%',
          width: '38px', height: '38px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: isConnectPage ? '0 0 20px rgba(57,255,20,0.4)' : 'none',
          transition: 'all 0.3s ease'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isConnectPage ? '#000' : '#39FF14'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </Link>
      </div>
    </nav>
  );
}
