import React, { useState, useEffect, useRef } from 'react';

const stats = [
  { number: "₹50L+", label: "Revenue" },
  { number: "15+", label: "Team Members" },
  { number: "2 Years", label: "Experience" },
  { number: "100+", label: "Projects" }
];

export default function Stats() {
  const sectionRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [animState, setAnimState] = useState('entering'); // 'entering' | 'centered' | 'exiting'

  useEffect(() => {
    // Phase 1: enter -> center
    const tCenter = setTimeout(() => {
      setAnimState('centered');
    }, 50); // tiny delay to allow CSS to snap 'entering' position before animating to 'centered'

    // Phase 2: center -> exiting
    const tExit = setTimeout(() => {
      setAnimState('exiting');
    }, 1600 - 350); // wait majority of cycle, then exit

    // Phase 3: exiting -> increment -> enter
    const tNext = setTimeout(() => {
      setCurrent((c) => (c + 1) % stats.length);
      setAnimState('entering');
    }, 1600);

    return () => {
      clearTimeout(tCenter);
      clearTimeout(tExit);
      clearTimeout(tNext);
    };
  }, [current]);

  const getStyles = () => {
    if (animState === 'entering') {
      return {
        transform: 'translateY(60px)',
        opacity: 0,
        transition: 'none' // instant snap to bottom
      };
    }
    if (animState === 'centered') {
      return {
        transform: 'translateY(0)',
        opacity: 1,
        transition: 'transform 0.45s cubic-bezier(0,0,0.2,1), opacity 0.3s ease'
      };
    }
    // exiting
    return {
      transform: 'translateY(-60px)',
      opacity: 0,
      transition: 'transform 0.35s cubic-bezier(0.4,0,1,1), opacity 0.25s ease'
    };
  };

  return (
    <div 
      ref={sectionRef} 
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        background: 'transparent', zIndex: 1, 
        scrollSnapAlign: 'start', 
        scrollSnapStop: 'always' 
      }}
    >
      
        <section style={{
          background: 'transparent',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderTop: '1px solid rgba(57,255,20,0.12)',
          borderBottom: '1px solid rgba(57,255,20,0.12)'
        }}>
          <div style={{ textAlign: 'center', ...getStyles() }}>
          <div style={{ width: '60px', height: '1px', background: '#39FF14', margin: '0 auto 32px' }}></div>
          
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(120px, 18vw, 220px)',
            fontWeight: 'bold',
            color: '#F5F0E8',
            lineHeight: 1
          }}>
            {stats[current].number}
          </div>
          
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: '#39FF14',
            marginTop: '16px'
          }}>
            {stats[current].label}
          </div>
          
          <div style={{ width: '60px', height: '1px', background: '#39FF14', margin: '32px auto 0' }}></div>
        </div>
        </section>
      </div>
  );
}
