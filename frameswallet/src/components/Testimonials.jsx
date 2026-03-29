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

  // Auto cycle
  useEffect(() => {
    const timer = setInterval(() => {
      handleClientChange((active + 1) % clients.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [active]);

  const handleClientChange = (index) => {
    if (index === active) return;
    setQuoteVisible(false); // Fade out
    
    // Smooth crossfade logic waiting 250ms for opacity to drop
    setTimeout(() => {
      setDisplayedClient(clients[index]);
      setActive(index); // Ensure styling on left list updates exactly as quote swaps
      setQuoteVisible(true); // Fade back in over 400ms
    }, 250); 
  };

  return (
    <div ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', background: 'transparent', zIndex: 1, scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
      
        <section 
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', 
            padding: '80px',
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
            <div style={{ marginBottom: '60px' }}>
              <div style={{
                width: '40px', height: '3px', background: '#39FF14', marginBottom: '16px'
              }} />
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '36px',
                color: '#F5F0E8',
                fontWeight: 700,
                margin: 0
              }}>Client Reviews</h2>
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
                <svg width="2" height="100%" style={{ position: 'absolute', left: '28px', top: '60px', zIndex: 0 }}>
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
                        {/* Avatar */}
                        <img 
                          src={client.img} 
                          alt={client.name}
                          style={{
                            width: isActive ? '68px' : '46px',
                            height: isActive ? '68px' : '46px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: isActive ? '2px solid #39FF14' : '1px solid rgba(255,255,255,0.1)',
                            filter: isActive ? 'none' : 'grayscale(100%)',
                            transition: 'all 0.5s ease'
                          }}
                        />
                        {/* Metadata */}
                        <div>
                          <div style={{
                            fontFamily: isActive ? "'Playfair Display', serif" : "'Inter', sans-serif",
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
                              ★ {client.rating.toFixed(1)} <span style={{ color: 'rgba(245,240,232,0.5)', fontSize: '12px' }}>&bull; {client.date}</span>
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
