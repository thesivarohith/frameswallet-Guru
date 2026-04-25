import React, { useState, useEffect, useRef } from 'react';

const clients = [
  {
    name: "Alex Morgan",
    rating: 5.0,
    date: "12 Jan 2025",
    img: "https://i.pravatar.cc/150?img=1",
    quote: "Absolutely cinematic work. frames.wallet transformed our raw footage into something we could not have imagined. Every cut, every transition felt intentional and powerful."
  },
  {
    name: "Diana Johnston",
    rating: 4.9,
    date: "29 Aug 2024",
    img: "https://i.pravatar.cc/150?img=5",
    quote: "Overall a pleasurable experience. Pay as milestones are achieved — which made me feel very confident throughout. Seamless and easy process from start to finish."
  },
  {
    name: "Lauren Contreras",
    rating: 4.9,
    date: "14 Mar 2025",
    img: "https://i.pravatar.cc/150?img=9",
    quote: "The team at frames.wallet has an eye for storytelling that very few editors possess. Our brand video got 10x the engagement we expected. Worth every penny."
  }
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [displayedClient, setDisplayedClient] = useState(clients[0]);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleClientChange = React.useCallback((index) => {
    if (index === active) return;
    setQuoteVisible(false); // Fade out
    
    // Smooth crossfade logic waiting 250ms for opacity to drop
    setTimeout(() => {
      setDisplayedClient(clients[index]);
      setActive(index); // Ensure styling on left list updates exactly as quote swaps
      setQuoteVisible(true); // Fade back in over 400ms
    }, 250); 
  }, [active, clients]);

  // Auto cycle
  useEffect(() => {
    const timer = setInterval(() => {
      handleClientChange((active + 1) % clients.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [active, handleClientChange, clients.length]);

  return (
    <div ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', background: 'transparent', zIndex: 1, scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes orbitSpin {
          0% { transform: rotateX(70deg) rotateZ(0deg); }
          100% { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes orbitSpinSlow {
          0% { transform: rotateX(70deg) rotateZ(0deg); }
          100% { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />
      
        <section 
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', 
            padding: '20px 80px 80px 80px',
            background: 'transparent',
            overflow: 'hidden',
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div style={{ maxWidth: '1200px', width: '100%' }}>
            
            {/* HEADING above the grid */}
            <div style={{ marginBottom: '60px', textAlign: 'center' }}>
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
                  fontWeight: 700,
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}>Client Reviews</h2>
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
                What our clients say
              </p>
            </div>

            {/* Two column grid layout */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '40% 60%',
              alignItems: 'center'
            }}>
              
              {/* LEFT COLUMN */}
              <div style={{ position: 'relative' }}>
                
                {/* SVG Connector Line */}
                <svg width="2" height="100%" style={{ position: 'absolute', left: '38px', top: '60px', zIndex: 0 }}>
                  <path d="M1 0 Q1 50 1 100 Q1 150 1 200 Q1 250 1 300"
                    stroke="rgba(57,255,20,0.3)" strokeWidth="1.5" 
                    fill="none" strokeDasharray="4 4" />
                </svg>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {clients.map((client, index) => {
                    const isActive = index === active;
                    
                    return (
                      <div 
                        key={index}
                        onClick={() => handleClientChange(index)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          padding: '20px 0',
                          cursor: 'pointer',
                          position: 'relative',
                          zIndex: 1,
                          opacity: isActive ? 1 : 0.5,
                          transform: isActive ? 'scale(1.05)' : 'scale(0.95)',
                          transformOrigin: 'left center',
                          transition: 'all 0.5s ease'
                        }}
                      >
                        {/* 3D Avatar with orbiting ring */}
                        <div style={{
                          position: 'relative',
                          width: isActive ? '80px' : '54px',
                          height: isActive ? '80px' : '54px',
                          flexShrink: 0,
                          perspective: '200px',
                          transition: 'all 0.5s ease',
                        }}>
                          {/* Orbiting ring */}
                          <div style={{
                            position: 'absolute',
                            inset: isActive ? '-6px' : '-4px',
                            borderRadius: '50%',
                            border: isActive
                              ? '2px solid rgba(57,255,20,0.7)'
                              : '1px solid rgba(57,255,20,0.2)',
                            animation: isActive
                              ? 'orbitSpin 3s linear infinite'
                              : 'orbitSpinSlow 8s linear infinite',
                            boxShadow: isActive
                              ? '0 0 16px rgba(57,255,20,0.4), inset 0 0 16px rgba(57,255,20,0.15)'
                              : 'none',
                            transition: 'border 0.5s ease, box-shadow 0.5s ease',
                          }} />
                          {/* Second ring offset */}
                          <div style={{
                            position: 'absolute',
                            inset: isActive ? '-10px' : '-6px',
                            borderRadius: '50%',
                            border: isActive
                              ? '1px solid rgba(57,255,20,0.3)'
                              : '1px solid rgba(57,255,20,0.08)',
                            animation: isActive
                              ? 'orbitSpin 5s linear infinite reverse'
                              : 'orbitSpinSlow 12s linear infinite reverse',
                            transition: 'border 0.5s ease',
                          }} />
                          {/* Avatar image with Skeleton Loader */}
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s infinite',
                            zIndex: 1
                          }} />
                          <img
                            src={client.img}
                            alt={client.name}
                            onLoad={(e) => { e.currentTarget.style.opacity = 1; }}
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: isActive ? '2px solid #39FF14' : '1px solid rgba(255,255,255,0.1)',
                              filter: isActive ? 'none' : 'grayscale(100%)',
                              transition: 'all 0.5s ease, opacity 0.3s ease',
                              position: 'relative',
                              zIndex: 2,
                              opacity: 0
                            }}
                          />
                          {/* Glow underneath */}
                          {isActive && (
                            <div style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '60%',
                              height: '60%',
                              borderRadius: '50%',
                              background: 'rgba(57,255,20,0.25)',
                              filter: 'blur(20px)',
                              zIndex: 0,
                            }} />
                          )}
                        </div>
                        {/* Metadata */}
                        <div>
                          <div style={{
                            fontFamily: isActive ? "'Cormorant Garamond', serif" : "'Inter', sans-serif",
                            fontSize: isActive ? '22px' : '14px',
                            fontWeight: isActive ? 700 : 400,
                            color: isActive ? '#F5F0E8' : 'rgba(245,240,232,0.35)',
                            marginBottom: '4px',
                            transition: 'all 0.5s ease'
                          }}>
                            {client.name}
                          </div>
                          
                          {isActive ? (
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#39FF14', transition: 'all 0.5s ease' }}>
                              ★ {client.rating.toFixed(1)} <span style={{ color: '#86efac', fontSize: '12px' }}>&bull; {client.date}</span>
                            </div>
                          ) : (
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(57,255,20,0.35)', transition: 'all 0.5s ease' }}>
                              ★ {client.rating.toFixed(1)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div style={{ position: 'relative', paddingLeft: '40px' }}>
                
                {/* Large gold quote mark element */}
                <div style={{
                  fontSize: '120px',
                  color: '#39FF14',
                  opacity: 0.25,
                  fontFamily: "Georgia, serif",
                  lineHeight: 0.8,
                  display: 'block',
                  marginBottom: '-20px'
                }}>
                  "
                </div>

                {/* Dynamic faded quote text block */}
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontSize: '22px',
                  lineHeight: 1.9,
                  color: 'rgba(245,240,232,0.9)',
                  maxWidth: '560px',
                  opacity: quoteVisible ? 1 : 0,
                  transition: `opacity ${quoteVisible ? '0.4s' : '0.25s'} ease`
                }}>
                  {displayedClient.quote}
                </div>

                {/* Client signature under the quote */}
                <div style={{
                  marginTop: '32px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#39FF14',
                  opacity: quoteVisible ? 1 : 0,
                  transition: `opacity ${quoteVisible ? '0.4s' : '0.25s'} ease`
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '30px',
                    height: '1px',
                    background: '#39FF14',
                    marginRight: '12px',
                    verticalAlign: 'middle'
                  }}></span>
                  {displayedClient.name}
                </div>
                
              </div>

            </div>
          </div>
        </section>
      </div>
  );
}
