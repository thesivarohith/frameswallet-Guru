import React, { useEffect, useRef, useState } from 'react';

const statsData = [
  {
    number: 15,
    suffix: '+',
    label: 'Team',
    description: 'Editors, colorists & motion designers',
    sub: 'Working across every format and genre',
    index: '01',
    duration: 1000,
    delay: 0
  },
  {
    number: 2,
    suffix: ' Yrs',
    label: 'Experience',
    description: 'Building frame by frame, story by story',
    sub: 'Since 2023 — growing fast',
    index: '02',
    duration: 600,
    delay: 200
  },
  {
    number: 10000,
    suffix: '+',
    label: 'Hours',
    description: 'Hours of footage edited and delivered',
    sub: 'Across YouTube, films, ads, reels',
    index: '03',
    duration: 2200,
    delay: 400
  },
  {
    number: 3,
    suffix: '',
    label: 'Cities',
    description: 'Chennai · Coimbatore · Remote',
    sub: 'Wherever great stories need telling',
    index: '04',
    duration: 500,
    delay: 600
  }
];

const countUp = (target, duration, setter) => {
  const start = performance.now();
  const animate = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    setter(Math.floor(eased * target));
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

const StatRow = ({ stat, rowIndex, triggered }) => {
  const [value, setValue] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (triggered) {
      setTimeout(() => {
        countUp(stat.number, stat.duration, setValue);
      }, stat.delay);
    }
  }, [triggered, stat]);

  return (
    <div 
      className="stat-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(134,239,172,0.15)',
        position: 'relative',
        overflow: 'hidden',
        background: hovered ? 'rgba(57,255,20,0.02)' : 'transparent',
        transition: 'background 0.4s ease, opacity 0.7s ease, transform 0.7s ease',
        opacity: triggered ? 1 : 0,
        transform: triggered ? 'translateX(0)' : 'translateX(-30px)',
        transitionDelay: triggered && !hovered ? `${rowIndex * 100}ms, ${rowIndex * 100}ms, 0s` : '0s'
      }}
    >
      {/* ROW NUMBER */}
      <div className="stat-index">
        {stat.index}
      </div>

      {/* LEFT SIDE */}
      <div className="stat-left">
        <div className="stat-label">
          {stat.label}
        </div>
        
        <div className="stat-number-wrapper">
          {value.toLocaleString()}
          <span className="stat-suffix">
            {stat.suffix}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="stat-right">
        <div className="stat-desc">
          {stat.description}
        </div>

        <div className="stat-sub">
          {stat.sub}
        </div>
      </div>
      
    </div>
  );
};

export default function Team() {
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const [particles] = useState(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 4 + Math.random() * 4,
    delay: Math.random() * -8
  })));

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !triggered) {
        setTriggered(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <div 
      ref={sectionRef}
      style={{
        background: '#000',
        padding: '100px 0 20px 0',
        overflow: 'hidden',
        position: 'relative',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always'
      }}
    >
      
        <section style={{ background: 'transparent' }}>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes drift {
              from { transform: translateY(0); }
              to { transform: translateY(-30px); }
            }
            .stat-row { 
              padding: 48px 80px; 
              flex-wrap: nowrap; 
            }
            .stat-index {
              position: absolute;
              top: 24px;
              right: 80px;
              font-family: 'Inter', sans-serif;
              font-size: 11px;
              color: #86efac;
              letter-spacing: 3px;
            }
            .stat-left { 
              width: 50%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              border-bottom: none; 
              padding-bottom: 0; 
            }
            .stat-label {
              font-family: 'Inter', sans-serif;
              font-size: 12px;
              letter-spacing: 6px;
              text-transform: uppercase;
              color: #39FF14;
              margin-bottom: 16px;
            }
            .stat-number-wrapper {
              display: flex;
              align-items: baseline;
              gap: 8px;
              font-family: 'Cormorant Garamond', serif;
              font-size: clamp(64px, 7vw, 110px);
              font-weight: 700;
              color: #F5F0E8;
              line-height: 1;
              text-shadow: 0 0 80px rgba(57,255,20,0.15), 0 0 160px rgba(57,255,20,0.08);
            }
            .stat-suffix {
              font-size: 0.4em;
              color: #39FF14;
              font-style: italic;
              font-family: 'Cormorant Garamond', serif;
            }
            .stat-right { 
              width: 50%; 
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding-left: 60px; 
              border-left: 1px solid rgba(57,255,20,0.3); 
              margin-top: 0; 
            }
            .stat-desc {
              font-family: 'Playfair Display', serif;
              font-style: italic;
              font-size: 32px;
              color: rgba(245,240,232,1);
              line-height: 1.3;
              text-shadow: 0 0 40px rgba(245,240,232,0.1);
            }
            .stat-sub {
              font-family: 'Inter', sans-serif;
              font-size: 15px;
              color: rgba(245,240,232,0.6);
              margin-top: 16px;
              letter-spacing: 1px;
            }

            @media (max-width: 768px) {
              .stat-row { 
                padding: 40px 32px; 
                flex-wrap: wrap; 
              }
              .stat-index {
                top: 40px;
                right: 32px;
              }
              .stat-left { 
                width: 100%; 
                border-bottom: 2px solid rgba(57,255,20,0.05); 
                padding-bottom: 32px; 
              }
              .stat-number-wrapper {
                font-size: clamp(72px, 18vw, 140px);
                gap: 12px;
              }
              .stat-right { 
                width: 100%; 
                padding-left: 0; 
                border-left: none; 
                margin-top: 32px; 
              }
              .stat-desc {
                font-size: 28px;
                line-height: 1.4;
              }
              .stat-sub {
                font-size: 14px;
                margin-top: 12px;
              }
            }
          `}} />

          {/* PARTICLES GENERATOR */}
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                width: '2px',
                height: '2px',
                background: 'rgba(57,255,20,0.4)',
                borderRadius: '50%',
                left: `${p.left}%`,
                top: `${p.top}%`,
                animation: `drift ${p.duration}s ease-in-out ${p.delay}s infinite alternate`
              }}
            />
          ))}

          {/* OVERHEAD HEADING BLOCK */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
            }}>
              <div style={{
                flex: 1,
                maxWidth: '120px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(57,255,20,0.5))',
              }} />
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '48px',
                color: '#F5F0E8',
                margin: 0,
                whiteSpace: 'nowrap',
              }}>
                The Studio
              </h2>
              <div style={{
                flex: 1,
                maxWidth: '120px',
                height: '1px',
                background: 'linear-gradient(to left, transparent, rgba(57,255,20,0.5))',
              }} />
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              letterSpacing: '4px',
              color: '#39FF14',
              marginTop: '12px',
              textTransform: 'uppercase',
            }}>
              Numbers that define us
            </p>
          </div>

          {/* EXCLUSIVELY STACKED 4 STAT FULL-WIDTH ROWS */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{ borderTop: '1px solid rgba(134,239,172,0.12)' }}>
              {statsData.map((stat, i) => (
                <StatRow 
                  key={i} 
                  stat={stat} 
                  rowIndex={i} 
                  triggered={triggered} 
                />
              ))}
            </div>
          </div>

          {/* FOOTER TAGLINE */}
          <div style={{
            padding: '60px 80px',
            textAlign: 'center',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(20px, 3vw, 36px)',
            color: '#86efac',
            position: 'relative',
            zIndex: 1
          }}>
            We don't just edit. We craft <span style={{ color: '#39FF14' }}>stories</span>.
          </div>
          
        </section>
      </div>
  );
}
