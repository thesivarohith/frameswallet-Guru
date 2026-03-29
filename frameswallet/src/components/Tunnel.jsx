import React, { useRef, useState, useCallback } from 'react';

const projects = [
  { title: 'Brand Reel', before: 'https://www.w3schools.com/html/mov_bbb.mp4', after: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { title: 'Product Launch', before: 'https://www.w3schools.com/html/mov_bbb.mp4', after: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { title: 'Event Highlight', before: 'https://www.w3schools.com/html/mov_bbb.mp4', after: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { title: 'Music Video', before: 'https://www.w3schools.com/html/mov_bbb.mp4', after: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { title: 'Wedding Film', before: 'https://www.w3schools.com/html/mov_bbb.mp4', after: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { title: 'Corporate Story', before: 'https://www.w3schools.com/html/mov_bbb.mp4', after: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { title: 'Travel Reel', before: 'https://www.w3schools.com/html/mov_bbb.mp4', after: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { title: 'Fashion Edit', before: 'https://www.w3schools.com/html/mov_bbb.mp4', after: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

export default function Tunnel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [muted, setMuted] = useState(true);
  const [fading, setFading] = useState(false);
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const [volHover, setVolHover] = useState(false);

  const containerRef = useRef(null);
  const beforeVideoRef = useRef(null);
  const afterVideoRef = useRef(null);

  const current = projects[activeIndex];

  function handleMove(clientX) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, pos)));
  }

  const handleProjectChange = useCallback((index) => {
    setFading(true);
    setTimeout(() => {
      setActiveIndex(index);
      setSliderPos(50);
      setTimeout(() => setFading(false), 50);
    }, 200);
  }, []);

  function goPrev() {
    const next = activeIndex === 0 ? projects.length - 1 : activeIndex - 1;
    handleProjectChange(next);
  }

  function goNext() {
    const next = activeIndex === projects.length - 1 ? 0 : activeIndex + 1;
    handleProjectChange(next);
  }

  function toggleMute() {
    const newMuted = !muted;
    setMuted(newMuted);
    [beforeVideoRef.current, afterVideoRef.current].forEach((v) => {
      if (!v) return;
      v.muted = newMuted;
      if (!newMuted) v.play();
    });
  }

  const arrowBaseStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '44px',
    height: '44px',
    background: 'rgba(57,255,20,0.08)',
    border: '1px solid rgba(57,255,20,0.3)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: 0,
  };

  const arrowHoverStyle = {
    background: 'rgba(57,255,20,0.2)',
    borderColor: 'rgba(57,255,20,0.8)',
    boxShadow: '0 0 16px rgba(57,255,20,0.3)',
  };

  return (
    <section
      style={{
        background: '#000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '48px',
              color: '#F5F0E8',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Our Work
          </h2>
          <div style={{
            flex: 1,
            maxWidth: '120px',
            height: '1px',
            background: 'linear-gradient(to left, transparent, rgba(57,255,20,0.5))',
          }} />
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            letterSpacing: '4px',
            color: '#39FF14',
            marginTop: '12px',
            textTransform: 'uppercase',
          }}
        >
          Drag to reveal the difference
        </p>
      </div>

      {/* Project title */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.5)',
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        {current.title}
      </div>

      {/* Wrapper for arrows + slider */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
        }}
      >
        {/* Left arrow */}
        <button
          onClick={goPrev}
          onMouseEnter={() => setLeftHover(true)}
          onMouseLeave={() => setLeftHover(false)}
          style={{
            ...arrowBaseStyle,
            left: '-60px',
            ...(leftHover ? arrowHoverStyle : {}),
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#39FF14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={goNext}
          onMouseEnter={() => setRightHover(true)}
          onMouseLeave={() => setRightHover(false)}
          style={{
            ...arrowBaseStyle,
            right: '-60px',
            ...(rightHover ? arrowHoverStyle : {}),
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#39FF14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>

        {/* Slider container */}
        <div
          ref={containerRef}
          onMouseDown={(e) => {
            setDragging(true);
            handleMove(e.clientX);
          }}
          onMouseMove={(e) => {
            if (dragging) handleMove(e.clientX);
          }}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={(e) => {
            setDragging(true);
            handleMove(e.touches[0].clientX);
          }}
          onTouchMove={(e) => {
            if (dragging) handleMove(e.touches[0].clientX);
          }}
          onTouchEnd={() => setDragging(false)}
          style={{
            position: 'relative',
            width: '360px',
            height: '640px',
            borderRadius: '16px',
            overflow: 'hidden',
            cursor: 'ew-resize',
            border: '1px solid rgba(57,255,20,0.2)',
            boxShadow: '0 0 60px rgba(0,0,0,0.8)',
            userSelect: 'none',
            opacity: fading ? 0 : 1,
            transition: fading ? 'opacity 0.2s ease' : 'opacity 0.3s ease',
          }}
        >
          {/* BEFORE side (full width, filtered) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              filter: 'grayscale(80%) brightness(0.7)',
            }}
          >
            <video
              ref={beforeVideoRef}
              key={`before-${activeIndex}`}
              src={current.before}
              muted={muted}
              loop
              autoPlay
              playsInline
              preload="auto"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* AFTER side (clipped) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(0 0 0 ${sliderPos}%)`,
            }}
          >
            <video
              ref={afterVideoRef}
              key={`after-${activeIndex}`}
              src={current.after}
              muted={muted}
              loop
              autoPlay
              playsInline
              preload="auto"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Volume toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseEnter={() => setVolHover(true)}
            onMouseLeave={() => setVolHover(false)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
              width: '36px',
              height: '36px',
              background: 'rgba(0,0,0,0.6)',
              border: volHover
                ? '1px solid rgba(57,255,20,0.8)'
                : muted
                  ? '1px solid rgba(57,255,20,0.3)'
                  : '1px solid rgba(57,255,20,0.6)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          >
            {muted ? (
              /* Muted speaker icon */
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              /* Speaker with waves icon */
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#39FF14"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>

          {/* BEFORE label */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '16px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              background: 'rgba(0,0,0,0.5)',
              padding: '4px 10px',
              borderRadius: '4px',
              zIndex: 5,
            }}
          >
            Before
          </div>

          {/* AFTER label */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '16px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#39FF14',
              background: 'rgba(0,0,0,0.5)',
              padding: '4px 10px',
              borderRadius: '4px',
              zIndex: 5,
            }}
          >
            After
          </div>

          {/* Divider line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              width: '2px',
              height: '100%',
              background: '#39FF14',
              boxShadow: '0 0 12px rgba(57,255,20,0.8)',
              left: `${sliderPos}%`,
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              zIndex: 4,
            }}
          />

          {/* Handle circle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${sliderPos}%`,
              transform: 'translate(-50%, -50%)',
              width: '44px',
              height: '44px',
              background: '#39FF14',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(57,255,20,0.6)',
              zIndex: 5,
              pointerEvents: 'none',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: '2px' }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: '2px' }}
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </div>
        </div>
      </div>

      {/* Dots navigation */}
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
        }}
      >
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => handleProjectChange(i)}
            style={{
              width: i === activeIndex ? '20px' : '4px',
              height: '4px',
              borderRadius: i === activeIndex ? '2px' : '50%',
              background:
                i === activeIndex ? '#39FF14' : 'rgba(57,255,20,0.2)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}
