import React, { useRef, useState, useEffect } from 'react';

function VideoCard({ label, src, index, cardWidth }) {
  const videoRef = useRef()
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => {
    setHovered(true)
    videoRef.current?.play()
  }
  const handleLeave = () => {
    setHovered(false)
    videoRef.current?.pause()
    if (videoRef.current) videoRef.current.currentTime = 0
  }

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        width: `${cardWidth}px`,
        height: '405px',
        flexShrink: 0,
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: hovered
          ? '2px solid rgba(57,255,20,1)'
          : '2px solid rgba(57,255,20,0.3)',
        boxShadow: hovered
          ? '0 0 60px rgba(57,255,20,0.2), 0 20px 60px rgba(0,0,0,0.8)'
          : '0 8px 40px rgba(0,0,0,0.6)',
        transform: hovered
          ? 'scale(1.03) translateY(-8px)'
          : 'scale(1) translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), border 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        opacity: hovered ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none'
      }} />

      {/* Gold corner accent top-left */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '28px', height: '28px',
        borderTop: '2px solid #39FF14',
        borderLeft: '2px solid #39FF14',
        borderRadius: '10px 0 0 0',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
      }} />

      {/* Gold corner accent bottom-right */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '28px', height: '28px',
        borderBottom: '2px solid #39FF14',
        borderRight: '2px solid #39FF14',
        borderRadius: '0 0 10px 0',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
      }} />

      {/* Index number top-right */}
      <div style={{
        position: 'absolute', top: '16px', right: '20px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px', letterSpacing: '2px',
        color: 'rgba(57,255,20,0.5)',
        pointerEvents: 'none'
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Label bottom-left */}
      <div style={{
        position: 'absolute', bottom: '16px', left: '20px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '10px', letterSpacing: '3px',
        color: 'rgba(57,255,20,0.8)',
        textTransform: 'uppercase',
        pointerEvents: 'none'
      }}>
        {label}
      </div>

    </div>
  )
}

export default function Tunnel() {
  const sectionRef = useRef()
  const reelRef = useRef()
  const currentX = useRef(0)
  const targetX = useRef(0)
  const rafRef = useRef()

  const videos = [
    { label: 'REEL 001' },
    { label: 'REEL 002' },
    { label: 'REEL 003' },
    { label: 'REEL 004' },
    { label: 'REEL 005' },
    { label: 'REEL 006' },
    { label: 'REEL 007' },
    { label: 'REEL 008' },
  ]

  const VIDEO_SRC = 'https://www.w3schools.com/html/mov_bbb.mp4'
  const CARD_WIDTH = 720
  const CARD_GAP = 32
  
  const REEL_CONTENT_WIDTH = (CARD_WIDTH + CARD_GAP) * videos.length;
  const sectionHeightStyle = `calc(100vh + ${REEL_CONTENT_WIDTH}px)`;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const maxTranslate = REEL_CONTENT_WIDTH - window.innerWidth + 160;
      
      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, window.scrollY - sectionTop)
      const progress = Math.min(1, scrolled / sectionHeight)
      targetX.current = -(progress * maxTranslate)

      const bar = document.getElementById('reel-progress')
      if (bar) bar.style.width = (progress * 100) + '%'
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial sync
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.07
      if (reelRef.current) {
        reelRef.current.style.transform = `translateX(${currentX.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        height: sectionHeightStyle,
        position: 'relative',
        background: 'transparent', zIndex: 1,
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always'
      }}
    >
        {/* Sticky viewport */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'transparent', zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>

          {/* Section heading */}
          <div style={{
            textAlign: 'center',
            marginBottom: '48px',
            flexShrink: 0
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '48px',
              color: '#F5F0E8',
              margin: 0
            }}>Our Work</h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              letterSpacing: '4px',
              color: '#39FF14',
              marginTop: '12px',
              textTransform: 'uppercase'
            }}>Drag to explore</p>
          </div>

          {/* Film strip reel */}
          <div style={{
            overflow: 'visible',
            paddingLeft: '80px'
          }}>
            <div
              ref={reelRef}
              style={{
                display: 'flex',
                gap: `${CARD_GAP}px`,
                willChange: 'transform',
                alignItems: 'center'
              }}
            >
              {videos.map((v, i) => (
                <VideoCard
                  key={i}
                  label={v.label}
                  src={VIDEO_SRC}
                  index={i}
                  cardWidth={CARD_WIDTH}
                />
              ))}
            </div>
          </div>

          {/* Progress bar at bottom */}
          <div style={{
            position: 'absolute',
            bottom: '32px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: 'rgba(57,255,20,0.15)'
          }}>
            <div
              id="reel-progress"
              style={{
                height: '100%',
                background: '#39FF14',
                width: '0%',
                transition: 'none'
              }}
            />
          </div>

        </div>
    </section>
  )
}
