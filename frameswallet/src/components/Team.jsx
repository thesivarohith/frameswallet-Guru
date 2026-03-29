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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '48px 80px',
        borderBottom: '1px solid rgba(57,255,20,0.15)',
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
      <div style={{
        position: 'absolute',
        top: '24px',
        right: '80px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px',
        color: 'rgba(57,255,20,0.45)',
        letterSpacing: '3px'
      }}>
        {stat.index}
      </div>

      {/* LEFT SIDE: 50% */}
      <div style={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          color: '#39FF14',
          marginBottom: '12px'
        }}>
          {stat.label}
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px',
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(48px, 7vw, 96px)',
          fontWeight: 700,
          color: '#F5F0E8',
          lineHeight: 1,
          textShadow: `
            0 0 80px rgba(57,255,20,0.15),
            0 0 160px rgba(57,255,20,0.08)
          `
        }}>
          {value.toLocaleString()}
          <span style={{
            fontSize: '0.4em',
            color: '#39FF14',
            fontStyle: 'italic',
            fontFamily: "'Playfair Display', serif"
          }}>
            {stat.suffix}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: 50% */}
      <div style={{
        width: '50%',
        paddingLeft: '40px',
        borderLeft: '1px solid rgba(57,255,20,0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: '26px',
          color: 'rgba(245,240,232,1)',
          lineHeight: 1.4,
          textShadow: '0 0 40px rgba(245,240,232,0.1)'
        }}>
          {stat.description}
        </div>

        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: 'rgba(245,240,232,0.6)',
          marginTop: '8px',
          letterSpacing: '1px'
        }}>
          {stat.sub}
        </div>
      </div>
      
    </div>
  );
};

export default function Team() {
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * -8
    }));
    setParticles(generated);
  }, []);

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
                fontFamily: "'Playfair Display', serif",
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
            <div style={{ borderTop: '1px solid rgba(57,255,20,0.08)' }}>
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
            color: 'rgba(245,240,232,0.6)',
            position: 'relative',
            zIndex: 1
          }}>
            We don't just edit. We craft <span style={{ color: '#39FF14' }}>stories</span>.
          </div>
          
        </section>
      </div>
  );
}
