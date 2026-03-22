import React, { useEffect, useRef, useState } from 'react';

export default function FrameScroll() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  
  const totalFrames = 233;
  const frames = useRef(new Array(totalFrames).fill(null));
  const loadedCount = useRef(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    // Preload frames
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const num = String(i).padStart(5, '0');
      img.src = `/frames/${num}.webp`;
      img.onload = () => {
        frames.current[i - 1] = img;
        loadedCount.current += 1;
        
        const pct = (loadedCount.current / totalFrames) * 100;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = pct + '%';
        }
        
        if (loadedCount.current === totalFrames) {
          setReady(true);
        }
      };
      img.onerror = () => {
        // Handle missing frames gracefully by counting them anyway
        loadedCount.current += 1;
        if (loadedCount.current === totalFrames) {
          setReady(true);
        }
      };
    }
  }, []);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = frames.current[index];
    
    if (img && img.complete && img.naturalHeight !== 0) {
      // Fit image cover style
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  };

  useEffect(() => {
    if (!ready) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Initial draw on ready/resize
        drawFrame(Math.min(232, Math.max(0, Math.floor(progress * 233))));
      }
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    const handleScroll = () => {
      if (!sectionRef.current || !ready) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      
      // Strict clamping ensures frame exactly hits 0 and 232 on the logical bounds
      if (scrolled < 0) {
        drawFrame(0);
        setProgress(0);
        return;
      }
      
      if (scrolled > sectionHeight) {
        drawFrame(232);
        setProgress(1);
        return;
      }
      
      const currentProgress = scrolled / sectionHeight;
      setProgress(currentProgress);
      
      const frameIndex = Math.min(
        232,
        Math.max(0, Math.floor(currentProgress * 233))
      );
      drawFrame(frameIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ready]);

  return (
    <>
      <div ref={sectionRef} style={{ height: `calc(100vh + ${totalFrames * 4}px)`, position: 'relative', background: '#000', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
      
        {/* Scrollable Sticky Container */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
          
          {/* Logo Overlay */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: progress > 0.05 ? 0 : 1,
            transition: 'opacity 0.6s ease',
            pointerEvents: 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '96px', fontWeight: '700', color: '#F5F0E8' }}>frames</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '96px', fontStyle: 'italic', color: '#C9922A' }}>.wallet</span>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', letterSpacing: '6px', color: 'rgba(245,240,232,0.6)', textTransform: 'uppercase', marginTop: '16px' }}>
              VIDEO EDITING STUDIO
            </div>
            <div style={{ width: '40px', height: '1px', background: '#C9922A', margin: '16px auto' }}></div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '4px', color: 'rgba(201,146,42,0.6)', textTransform: 'uppercase' }}>
              SCROLL TO EXPLORE
            </div>
            <div style={{ marginTop: '16px', animation: 'bounce 1s infinite' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(201,146,42,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(10px); }
              }
            `}} />
          </div>
        </div>

      </div>

      {/* Loading Screen */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: ready ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out',
          pointerEvents: ready ? 'none' : 'all'
        }}
        onTransitionEnd={(e) => {
          if (ready) e.currentTarget.style.display = 'none';
        }}
      >
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '24px',
          color: '#C9922A',
          fontStyle: 'italic',
          marginBottom: '24px'
        }}>
          Loading frames...
        </div>
        <div style={{
          width: '200px',
          height: '2px',
          background: 'rgba(201,146,42,0.2)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div 
            ref={progressBarRef}
            style={{
              width: '0%',
              height: '100%',
              background: '#C9922A',
              transition: 'width 0.1s linear'
            }}
          />
        </div>
      </div>
    </>
  );
}
