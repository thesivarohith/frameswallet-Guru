import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ── Milestones Data ───────────────────────────── */
const milestones = [
  { year: '2023', icon: '🎬', tag: 'ORIGIN', title: 'Founded', desc: 'frames.wallet born in Coimbatore with a vision to redefine reels' },
  { year: '2023', icon: '✂️', tag: 'FIRST CUT', title: 'First Client', desc: 'Delivered our first reel — 200K views in 48 hours' },
  { year: '2023', icon: '👥', tag: 'GROWING', title: '5 Editors', desc: 'Team expanded to 5 specialists in editing and color' },
  { year: '2024', icon: '🏆', tag: 'MILESTONE', title: '50 Projects', desc: 'Crossed 50 delivered projects with 100% client satisfaction' },
  { year: '2024', icon: '🌆', tag: 'EXPANDING', title: 'Chennai Base', desc: 'Opened operations in Chennai — second city established' },
  { year: '2024', icon: '💰', tag: 'REVENUE', title: '₹25L Revenue', desc: 'Hit our first major revenue milestone as a unified team' },
  { year: '2025', icon: '🚀', tag: 'PRESENT', title: '15+ Team', desc: '15 specialists across 3 cities, 100+ projects delivered' },
  { year: '2025', icon: '🌍', tag: 'NEXT', title: 'Going Global', desc: 'First international client — the story continues' },
];

/* ── Values Data ───────────────────────────────── */
const values = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/>
      </svg>
    ),
    title: 'Frame-Perfect',
    text: 'Every cut intentional. We obsess over pacing until it feels exactly right.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Fast Turnaround',
    text: 'Deadlines are sacred. Quick delivery without compromising quality.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Premium Finish',
    text: 'Full colour, motion and sound review before every delivery.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Client-First',
    text: 'Your vision drives everything. We listen, adapt and exceed expectations.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'Scroll-Stopping',
    text: 'Built for platforms. Designed to hold attention from first frame to last.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: '15+ Specialists',
    text: 'Diverse skills, one unified vision delivering exceptional outcomes.',
  },
];

/* ── Scroll Reveal Hook ────────────────────────── */
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            e.target.classList.add('revealed');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms`;
      obs.observe(item);
    });
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Sprocket Bar ──────────────────────────────── */
function SprocketBar() {
  const holes = Array.from({ length: 60 });
  return (
    <div style={{
      width: '100%', height: 36,
      background: '#0d0d0d',
      borderBottom: '1px solid #1a1a1a',
      borderTop: '1px solid #1a1a1a',
      display: 'flex', alignItems: 'center',
      paddingLeft: 8,
    }}>
      {holes.map((_, i) => (
        <div key={i} style={{
          width: 24, height: 16, flexShrink: 0,
          borderRadius: 3,
          border: '1.5px solid #222',
          background: '#000',
          margin: '0 8px',
        }} />
      ))}
    </div>
  );
}

/* ── Milestone Frame ───────────────────────────── */
function MilestoneFrame({ m, index, total }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ flexShrink: 0, width: 280 }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `2px solid ${hovered ? '#39FF14' : '#1a1a1a'}`,
          borderRadius: 6,
          overflow: 'hidden',
          background: '#0a0a0a',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          boxShadow: hovered ? '0 0 24px rgba(57,255,20,0.2)' : 'none',
        }}
      >
        {/* Image area */}
        <div style={{
          height: 180,
          background: 'linear-gradient(135deg, #080808, #111)',
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Year bg */}
          <span style={{
            fontSize: 48, fontFamily: 'monospace',
            color: 'rgba(57,255,20,0.08)', position: 'absolute',
          }}>{m.year}</span>
          {/* Icon */}
          <span style={{ fontSize: 42, position: 'relative', zIndex: 1 }}>{m.icon}</span>
          {/* Frame number */}
          <span style={{
            fontFamily: 'monospace', fontSize: 9,
            color: 'rgba(255,255,255,0.2)',
            position: 'absolute', top: 8, left: 10,
          }}>F{String(index + 1).padStart(2, '0')}</span>
          {/* Tag */}
          <span style={{
            fontSize: 8, letterSpacing: 2,
            color: '#39FF14', opacity: 0.7,
            position: 'absolute', top: 8, right: 10,
            textTransform: 'uppercase', fontFamily: 'monospace',
          }}>{m.tag}</span>
        </div>
        {/* Info area */}
        <div style={{ padding: '16px 18px', borderTop: '1px solid #1a1a1a' }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: 16,
            color: '#F5F0E8', marginBottom: 6,
          }}>{m.title}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12,
            color: 'rgba(245,240,232,0.4)', lineHeight: 1.7,
          }}>{m.desc}</div>
        </div>
      </div>
      {/* Frame counter */}
      <div style={{
        textAlign: 'center', padding: '8px 0',
        fontFamily: 'monospace', fontSize: 9,
        color: 'rgba(255,255,255,0.12)', letterSpacing: 2,
      }}>
        FRAME {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
}

/* ── Value Card ────────────────────────────────── */
function ValueCard({ icon, title, text }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(57,255,20,0.04)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(57,255,20,0.3)' : 'rgba(57,255,20,0.08)'}`,
        borderRadius: 12,
        padding: '32px 28px',
        transition: 'all 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{
        width: 42, height: 42,
        background: 'rgba(57,255,20,0.1)',
        borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16,
      }}>{icon}</div>
      <div style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 600,
        fontSize: 15, color: '#F5F0E8', marginBottom: 8,
      }}>{title}</div>
      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: 13,
        color: 'rgba(245,240,232,0.45)', lineHeight: 1.7,
      }}>{text}</div>
    </div>
  );
}

/* ── Contact Icons ─────────────────────────────── */
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

/* ── Animations CSS ────────────────────────────── */
const animCss = `
@keyframes teamBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

.highlight-pen {
  display: inline-block;
  position: relative;
  z-index: 1;
  padding: 0 4px;
}

.highlight-text {
  position: relative;
  z-index: 2;
  color: #000 !important;
}

.highlight-text * {
  color: #000 !important;
}

.highlight-pen::before {
  content: '';
  position: absolute;
  top: 10%;
  bottom: 0%;
  left: -2%;
  right: -2%;
  background: #39FF14;
  z-index: 0;
  border-radius: 4px 8px 3px 6px;
  transform-origin: left center;
  transform: rotate(-1.5deg) scaleX(0);
  box-shadow: 0 0 15px rgba(57,255,20,0.5);
}

.revealed .highlight-pen::before,
.revealed.highlight-pen::before {
  animation: drawHighlight 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
}

@keyframes drawHighlight {
  0% { transform: rotate(-1.5deg) scaleX(0); }
  100% { transform: rotate(-1.5deg) scaleX(1); }
}

.spotlight-wrapper {
  position: relative;
}

.spotlight-wrapper .base-layer {
  transition: opacity 0.4s ease;
  opacity: 1;
}

@media (hover: hover) and (pointer: fine) {
  .hero-section:hover .spotlight-wrapper .base-layer {
    opacity: 0.2;
  }
}

.spotlight-wrapper .spotlight-layer {
  position: absolute;
  top: -150px; left: -150px; right: -150px; bottom: -150px;
  padding: 150px;
  box-sizing: border-box;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  -webkit-mask-image: radial-gradient(800px circle at calc(var(--x, -1000px) + 150px) calc(var(--y, -1000px) + 150px), black 0%, transparent 100%);
  mask-image: radial-gradient(800px circle at calc(var(--x, -1000px) + 150px) calc(var(--y, -1000px) + 150px), black 0%, transparent 100%);
}

@media (hover: hover) and (pointer: fine) {
  .hero-section:hover .spotlight-wrapper .spotlight-layer {
    opacity: 1;
  }
}
`;

/* ════════════════════════════════════════════════
   MAIN TEAM PAGE
   ════════════════════════════════════════════════ */
export default function TeamPage() {
  const pageRef = useScrollReveal();
  const stripRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ── Film strip drag logic ──────────────── */
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let isDragging = false, startX = 0, scrollLeft = 0;

    const onDown = (e) => {
      isDragging = true;
      el.style.cursor = 'grabbing';
      startX = (e.pageX ?? e.touches[0].pageX) - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = (e.pageX ?? e.touches[0].pageX) - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX);
    };
    const onUp = () => { isDragging = false; el.style.cursor = 'grab'; };

    const onScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 0) setScrollProgress(el.scrollLeft / maxScroll);
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onUp);
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mouseleave', onUp);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onUp);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* ── Custom scrollbar drag logic ─────────── */
  const handleTrackClick = (e) => {
    const el = stripRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const rect = track.getBoundingClientRect();
    const thumbW = 80;
    const usable = rect.width - thumbW;
    const clickPos = Math.max(0, Math.min(e.clientX - rect.left - thumbW / 2, usable));
    const ratio = clickPos / usable;
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
  };

  const handleThumbDrag = (e) => {
    e.preventDefault();
    const el = stripRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const rect = track.getBoundingClientRect();
    const thumbW = 80;
    const usable = rect.width - thumbW;

    const onMouseMove = (ev) => {
      const pos = Math.max(0, Math.min(ev.clientX - rect.left - thumbW / 2, usable));
      el.scrollLeft = (pos / usable) * (el.scrollWidth - el.clientWidth);
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div ref={pageRef} style={{ background: '#000', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: animCss }} />
      <Navbar />

      {/* ═══════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════ */}
      <section 
        className="hero-section"
        onMouseMove={(e) => {
          const els = document.querySelectorAll('.spotlight-wrapper');
          els.forEach(el => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--x', `${e.clientX - rect.left}px`);
            el.style.setProperty('--y', `${e.clientY - rect.top}px`);
          });
        }}
        style={{
        padding: '160px 40px 120px',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Pill badge */}
        <div className="reveal" style={{
          display: 'inline-block',
          background: 'rgba(57,255,20,0.08)',
          border: '1px solid rgba(57,255,20,0.2)',
          color: '#39FF14',
          fontFamily: "'Inter', sans-serif",
          fontSize: 11, letterSpacing: 3,
          borderRadius: 20, padding: '6px 16px',
          textTransform: 'uppercase', marginBottom: 32,
        }}>
          The Studio
        </div>

        {/* Heading */}
        <h1 className="reveal spotlight-wrapper" style={{ margin: 0, position: 'relative' }}>
          <span className="base-layer" style={{ display: 'block' }}>
            <span style={{
              display: 'block',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: '#F5F0E8', lineHeight: 1.1,
            }}>
              The Minds Behind
            </span>
            <span style={{
              display: 'block',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: '#39FF14', lineHeight: 1.1,
              textShadow: '0 0 60px rgba(57,255,20,0.3)',
            }}>
              Every Frame.
            </span>
          </span>
          <span className="spotlight-layer" aria-hidden="true" style={{ display: 'block' }}>
            <span style={{
              display: 'block',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: '#ffffff', lineHeight: 1.1,
              textShadow: '0 0 40px rgba(255,255,255,0.4)',
            }}>
              The Minds Behind
            </span>
            <span style={{
              display: 'block',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: '#39FF14', lineHeight: 1.1,
              textShadow: '0 0 80px rgba(57,255,20,0.8), 0 0 120px rgba(57,255,20,0.4)',
            }}>
              Every Frame.
            </span>
          </span>
        </h1>

        {/* Subtext */}
        <p className="reveal spotlight-wrapper" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16,
          maxWidth: 560, textAlign: 'center',
          margin: '32px auto 0', lineHeight: 1.8,
          position: 'relative'
        }}>
          <span className="base-layer" style={{ display: 'block', color: 'rgba(245,240,232,0.5)' }}>
            A team of 15+ editors, colorists and motion designers obsessed with the
            craft of visual storytelling. Based across Chennai, Coimbatore and Remote
            — we deliver content that stops the scroll.
          </span>
          <span className="spotlight-layer" aria-hidden="true" style={{ display: 'block', color: '#ffffff', textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
            A team of 15+ editors, colorists and motion designers obsessed with the
            craft of visual storytelling. Based across Chennai, Coimbatore and Remote
            — we deliver content that stops the scroll.
          </span>
        </p>

        {/* Scroll indicator */}
        <div className="reveal" style={{
          marginTop: 64, display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10, letterSpacing: 4,
            color: 'rgba(57,255,20,0.4)', textTransform: 'uppercase',
          }}>
            Scroll to Explore
          </span>
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="rgba(57,255,20,0.4)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ animation: 'teamBounce 2s ease-in-out infinite' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — FILM STRIP TIMELINE
          ═══════════════════════════════════════ */}
      <section style={{ padding: '120px 0 100px' }}>
        {/* Section heading */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 40, color: '#F5F0E8', margin: 0,
          }}>Our Journey</h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12, letterSpacing: 4,
            color: '#39FF14', textTransform: 'uppercase',
            marginTop: 12,
          }}>
            Drag the strip to explore our story
          </p>
        </div>

        {/* Film strip wrapper */}
        <style dangerouslySetInnerHTML={{ __html: `
          .film-strip-scroll::-webkit-scrollbar { display: none; }
        `}} />
        <div
          className="film-strip-scroll"
          ref={stripRef}
          style={{
            overflowX: 'auto', cursor: 'grab',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div style={{ width: 'max-content' }}>
            {/* Top sprocket bar */}
            <SprocketBar />

            {/* Frames row */}
            <div style={{
              padding: '48px 60px',
              display: 'flex', gap: 24,
              alignItems: 'flex-start',
              background: '#000',
            }}>
              {milestones.map((m, i) => (
                <React.Fragment key={i}>
                  <MilestoneFrame m={m} index={i} total={milestones.length} />
                  {i < milestones.length - 1 && (
                    <div style={{
                      width: 32, height: 2,
                      background: 'linear-gradient(to right, #1a1a1a, rgba(57,255,20,0.2), #1a1a1a)',
                      alignSelf: 'center',
                      marginBottom: 50,
                      flexShrink: 0,
                    }} />
                  )}
                </React.Fragment>
              ))}

              {/* "Continues" end card */}
              <div style={{
                flexShrink: 0, width: 220,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 50,
                padding: '0 40px',
              }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: '50%',
                  border: '1px solid rgba(57,255,20,0.2)',
                  background: 'rgba(57,255,20,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                    <polyline points="15 18 21 12 15 6" />
                  </svg>
                </div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontSize: 16,
                  color: 'rgba(57,255,20,0.5)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}>The story continues...</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10, letterSpacing: 3,
                  color: 'rgba(245,240,232,0.2)',
                  textTransform: 'uppercase',
                  marginTop: 8,
                }}>Stay tuned</div>
              </div>
            </div>

            {/* Bottom sprocket bar */}
            <SprocketBar />
          </div>
        </div>

        {/* Custom scrollbar */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          style={{
            position: 'relative',
            width: '80%', maxWidth: 500,
            height: 6,
            margin: '32px auto 0',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 3,
            cursor: 'pointer',
          }}
        >
          <div
            onMouseDown={handleThumbDrag}
            style={{
              position: 'absolute',
              top: -3, height: 12,
              width: 80,
              borderRadius: 6,
              background: '#39FF14',
              boxShadow: '0 0 12px rgba(57,255,20,0.4)',
              cursor: 'grab',
              left: `${scrollProgress * 100}%`,
              transform: `translateX(${-scrollProgress * 80}px)`,
              transition: 'box-shadow 0.2s',
            }}
          />
        </div>
        <div style={{
          textAlign: 'center', marginTop: 12,
          fontFamily: "'Inter', sans-serif",
          fontSize: 10, letterSpacing: 3,
          color: 'rgba(245,240,232,0.2)',
          textTransform: 'uppercase',
        }}>← Drag to scroll →</div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — WHY CHOOSE US
          ═══════════════════════════════════════ */}
      <section style={{
        padding: '160px 80px',
        maxWidth: 1100, margin: '0 auto',
      }}>
        <h2 className="reveal" style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700, fontSize: 40,
          color: '#F5F0E8', textAlign: 'center',
          margin: 0,
        }}>
          Why Choose <span className="highlight-pen"><span className="highlight-text">frames<span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>.wallet</span></span></span>?
        </h2>
        <p className="reveal" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15, color: 'rgba(245,240,232,0.5)',
          maxWidth: 580, margin: '16px auto 64px',
          textAlign: 'center', lineHeight: 1.7,
        }}>
          We combine creative instinct with technical precision. Our editors don't
          just know software — they understand storytelling, platform algorithms and
          what makes content stop the scroll.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
        }}>
          {values.map((v) => (
            <ValueCard key={v.title} icon={v.icon} title={v.title} text={v.text} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — CONTACT / CTA
          ═══════════════════════════════════════ */}
      <section className="reveal" style={{
        background: 'rgba(57,255,20,0.03)',
        borderTop: '1px solid rgba(57,255,20,0.1)',
        borderBottom: '1px solid rgba(57,255,20,0.1)',
        padding: '160px 40px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(28px, 4vw, 48px)',
          color: '#F5F0E8', margin: 0,
        }}>
          Ready to transform your footage?
        </h2>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic', fontSize: 20,
          color: 'rgba(57,255,20,0.7)',
          margin: '12px 0 48px',
        }}>
          Let's build something worth watching.
        </p>

        {/* Contact row */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: 48, flexWrap: 'wrap', marginBottom: 48,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <EmailIcon />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#F5F0E8' }}>
              frameswallet@gmail.com
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <PhoneIcon />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#F5F0E8' }}>
              +91 XXXXX XXXXX
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LocationIcon />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#F5F0E8' }}>
              Chennai · Coimbatore · Remote
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => { window.location = 'mailto:frameswallet@gmail.com'; }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 60px rgba(57,255,20,0.5)';
            e.currentTarget.style.transform = 'scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(57,255,20,0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          style={{
            background: '#39FF14',
            color: '#000',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700, fontSize: 13,
            letterSpacing: 2, textTransform: 'uppercase',
            padding: '16px 40px',
            borderRadius: 50, border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 40px rgba(57,255,20,0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          Start a Conversation
        </button>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — FOOTER
          ═══════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
