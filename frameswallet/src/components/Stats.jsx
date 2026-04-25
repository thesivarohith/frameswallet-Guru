import React, { useState, useEffect, useRef } from 'react';

const stats = [
  { number: '₹50L+', label: 'Revenue', index: '01' },
  { number: '15+', label: 'Team Members', index: '02' },
  { number: '2 Yrs', label: 'Experience', index: '03' },
  { number: '100+', label: 'Projects', index: '04' },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Scroll-position-based stat selection
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const sectionTop = section.offsetTop;
      const scrolled = window.scrollY - sectionTop;

      if (scrolled < 0) {
        setActive(0);
        return;
      }

      const sectionHeight = section.offsetHeight - window.innerHeight;

      if (scrolled > sectionHeight) {
        setActive(3);
        return;
      }

      const progress = scrolled / sectionHeight;
      const index = Math.min(3, Math.floor(progress * 4));
      setActive(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate stat transitions
  useEffect(() => {
    if (active === displayIndex) return;
    
    const animTimer = setTimeout(() => {
      setAnimating(true);
    }, 0);

    const t = setTimeout(() => {
      setDisplayIndex(active);
      setAnimating(false);
    }, 200);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(t);
    };
  }, [active, displayIndex]);

  const contentStyle = {
    opacity: animating ? 0 : 1,
    transform: animating ? 'translateY(-20px)' : 'translateY(0)',
    transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'center',
    padding: '0 20px',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <div
      ref={sectionRef}
      style={{
        height: '400vh',
        position: 'relative',
      }}
    >
      {/* Sticky inner container */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid rgba(134,239,172,0.12)',
        borderBottom: '1px solid rgba(134,239,172,0.12)',
      }}>
        {/* Stat content */}
        <div style={contentStyle}>
          <div style={{
            width: '40px',
            height: '1px',
            background: '#39FF14',
            margin: '0 auto 24px',
          }} />

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(50px, 15vw, 220px)',
            fontWeight: 700,
            color: '#F5F0E8',
            lineHeight: 1,
            wordBreak: 'break-word',
          }}>
            {stats[displayIndex].number}
          </div>

          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(11px, 3vw, 14px)',
            fontWeight: 500,
            letterSpacing: 'clamp(3px, 1vw, 6px)',
            textTransform: 'uppercase',
            color: '#39FF14',
            marginTop: '16px',
            padding: '0 10px',
          }}>
            {stats[displayIndex].label}
          </div>

          <div style={{
            width: '40px',
            height: '1px',
            background: '#39FF14',
            margin: '24px auto 0',
          }} />
        </div>

        {/* Progress dots */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          {stats.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === displayIndex ? '20px' : '4px',
                height: '4px',
                borderRadius: i === displayIndex ? '2px' : '50%',
                background: i === displayIndex ? '#39FF14' : 'rgba(134,239,172,0.25)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          ))}
        </div>
        
        {/* Mobile Snap Anchors — ensure each stat can be a 'stopping' */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} className="mobile-only">
          <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
          <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
          <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
          <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
        </div>

        {/* Scroll indicator — first stat only */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(50px, 10vh, 80px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: active === 0 ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontSize: '10px',
            letterSpacing: '4px',
            color: '#86efac',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
          }}>
            Scroll
          </span>
          <span style={{
            display: 'inline-block',
            color: '#86efac',
            fontSize: '12px',
            animation: 'statChevronBounce 1.5s ease-in-out infinite',
          }}>
            ▼
          </span>
        </div>

        <style>{`
          @keyframes statChevronBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(6px); }
          }
        `}</style>
      </div>
    </div>
  );
}
