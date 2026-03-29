import React, { useEffect, useRef, useState } from 'react';

export default function FrameScroll() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  
  const totalFrames = 180;
  const frames = useRef(new Array(totalFrames).fill(null));
  const progressBarRef = useRef(null);

  const PRIORITY_FRAMES = 15;

  useEffect(() => {
    let priorityLoaded = 0;

    for (let i = 1; i <= PRIORITY_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(5, '0');
      img.src = `/frames/${num}.avif`;
      img.onload = () => {
        frames.current[i - 1] = img;
        priorityLoaded++;
        const pct = (priorityLoaded / PRIORITY_FRAMES) * 100;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = pct + '%';
        }
        if (priorityLoaded === PRIORITY_FRAMES) {
          setReady(true);
          loadRemainingFrames();
        }
      };
      img.onerror = () => {
        priorityLoaded++;
        if (priorityLoaded === PRIORITY_FRAMES) {
          setReady(true);
          loadRemainingFrames();
        }
      };
    }

    function loadRemainingFrames() {
      for (let i = PRIORITY_FRAMES + 1; i <= totalFrames; i++) {
        const img = new Image();
        const num = String(i).padStart(5, '0');
        img.src = `/frames/${num}.avif`;
        img.onload = () => {
          frames.current[i - 1] = img;
        };
        img.onerror = () => {};
      }
    }
  }, []);

  const drawFrame = (index) => {
    let img = frames.current[index];
    
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = index; i >= 0; i--) {
        if (frames.current[i] && 
            frames.current[i].complete && 
            frames.current[i].naturalWidth !== 0) {
          img = frames.current[i];
          break;
        }
      }
    }
    
    if (!img) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, w, h);
  };

  useEffect(() => {
    if (!ready) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Initial draw on ready/resize
        drawFrame(Math.min(179, Math.max(0, Math.floor(progress * 180))));
      }
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    const handleScroll = () => {
      if (!sectionRef.current || !ready) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      
      if (scrolled < 0) {
        drawFrame(0);
        setProgress(0);
        return;
      }
      
      if (scrolled > sectionHeight) {
        drawFrame(179);
        setProgress(1);
        return;
      }
      
      const currentProgress = scrolled / sectionHeight;
      setProgress(currentProgress);
      
      const frameIndex = Math.min(
        179,
        Math.max(0, Math.floor(currentProgress * 180))
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
      <div ref={sectionRef} style={{ height: `calc(100vh + ${totalFrames * 12}px)`, position: 'relative', background: '#000', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
      
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
          
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
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '96px', fontStyle: 'italic', color: '#39FF14' }}>.wallet</span>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', letterSpacing: '6px', color: 'rgba(245,240,232,0.6)', textTransform: 'uppercase', marginTop: '16px' }}>
              VIDEO EDITING STUDIO
            </div>
            <div style={{ width: '40px', height: '1px', background: '#39FF14', margin: '16px auto' }}></div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '4px', color: 'rgba(57,255,20,0.6)', textTransform: 'uppercase' }}>
              SCROLL TO EXPLORE
            </div>
            <div style={{ marginTop: '16px', animation: 'bounce 1s infinite' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(57,255,20,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          fontSize: '28px',
          color: '#39FF14',
          fontStyle: 'italic',
          marginBottom: '24px'
        }}>
          frames.wallet
        </div>
        <div style={{
          width: '200px',
          height: '2px',
          background: 'rgba(57,255,20,0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '12px'
        }}>
          <div 
            ref={progressBarRef}
            style={{
              width: '0%',
              height: '100%',
              background: '#39FF14',
              transition: 'width 0.1s linear'
            }}
          />
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          letterSpacing: '3px',
          color: 'rgba(57,255,20,0.5)',
          textTransform: 'uppercase'
        }}>
          Preparing your experience...
        </div>
      </div>
    </>
  );
}
