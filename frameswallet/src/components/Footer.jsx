import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- Icons ---
const Linkedin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Twitter = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const Instagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Github = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const ArrowUpRight = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

// --- Data ---
const SOCIALS = [
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "#" },
    { name: "Twitter", icon: <Twitter size={20} />, href: "#" },
    { name: "Instagram", icon: <Instagram size={20} />, href: "#" },
    { name: "GitHub", icon: <Github size={20} />, href: "#" },
];

const LINKS = [
    { name: "Home", to: "/" },
    { name: "Projects", to: "/#projects" },
    { name: "Team", to: "/team" },
    { name: "Connect", to: "/connect" }
];

// --- Link Component to handle hover state ---
const HoverLink = ({ children, to, isExternal }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const style = { 
        color: isHovered ? '#39FF14' : 'inherit',
        textDecoration: 'none',
        transition: 'color 0.2s ease-in-out',
        display: 'inline-block'
    };

    if (isExternal) {
        return <a href={to} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={style}>{children}</a>;
    }

    const isHash = to.startsWith('#') || to.startsWith('/#');
    if (isHash) {
        return <a href={to} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={style}>{children}</a>;
    }

    return (
        <Link to={to} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={style}>
            {children}
        </Link>
    );
};

export default function Footer() {
    const [btnHover, setBtnHover] = useState(false);
    const [framesHover, setFramesHover] = useState(false);

    return (
        <div style={{
            backgroundColor: '#030303', 
            padding: '40px 16px 0 16px',
            fontFamily: "'Inter', sans-serif"
        }}>
            <style dangerouslySetInnerHTML={{__html: `
              @media (max-width: 768px) {
                .footer-responsive {
                  padding: 48px 24px !important;
                  min-height: auto !important;
                }
                .footer-bottom-row {
                  margin-top: 40px !important;
                  padding-top: 32px !important;
                }
                .frames-blink {
                  animation: framesBlink 3s infinite ease-in-out !important;
                }
              }
              @keyframes framesBlink {
                0%, 100% {
                  color: rgba(255, 255, 255, 0.03);
                  text-shadow: none;
                }
                50% {
                  color: #39FF14;
                  text-shadow: 0 0 40px rgba(57, 255, 20, 0.4);
                }
              }
            `}} />
            <footer 
                className="footer-responsive"
                onMouseEnter={() => setFramesHover(true)}
                onMouseLeave={() => setFramesHover(false)}
                style={{
                    backgroundColor: '#111',
                    borderTopLeftRadius: '3rem',
                    borderTopRightRadius: '3rem',
                    color: 'white',
                    padding: '80px',
                    minHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5)',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '48px'
                }}>
                    <div>
                        <h2 style={{
                            fontSize: ' clamp(40px, 5vw, 60px)',
                            fontFamily: "'Playfair Display', serif",
                            fontStyle: 'italic',
                            marginBottom: '24px',
                            marginTop: 0,
                            letterSpacing: '-1px'
                        }}>Let's craft.</h2>
                        <p style={{
                            color: 'rgba(245,240,232,0.6)',
                            maxWidth: '448px',
                            margin: 0,
                            lineHeight: 1.6
                        }}>Transforming raw footage into scroll-stopping content with technical precision and creative excellence.</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '32px'
                    }}>
                        <div>
                            <h4 style={{
                                fontWeight: '700',
                                marginBottom: '24px',
                                color: '#555',
                                marginTop: 0,
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontSize: '13px'
                            }}>Menu</h4>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                fontSize: '16px',
                                color: '#ccc'
                            }}>
                                {LINKS.map(l => (
                                    <li key={l.name}><HoverLink to={l.to}>{l.name}</HoverLink></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 style={{
                                fontWeight: '700',
                                marginBottom: '24px',
                                color: '#555',
                                marginTop: 0,
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontSize: '13px'
                            }}>Social</h4>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                fontSize: '16px',
                                color: '#ccc'
                            }}>
                                {SOCIALS.map(s => (
                                    <li key={s.name}><HoverLink isExternal to={s.href}>{s.name}</HoverLink></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom-row" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '48px',
                    marginTop: '80px'
                }}>
                    <h1 
                        className="frames-blink"
                        style={{
                            fontSize: 'clamp(40px, 12vw, 160px)',
                            fontWeight: '800',
                            lineHeight: 0.8,
                            color: framesHover ? '#39FF14' : 'rgba(255, 255, 255, 0.03)',
                            textShadow: framesHover ? '0 0 40px rgba(57, 255, 20, 0.4)' : 'none',
                            userSelect: 'none',
                            margin: 0,
                            letterSpacing: '-2px',
                            transition: 'all 0.4s ease-in-out',
                            cursor: 'default'
                        }}
                    >
                        FRAMES
                    </h1>
                    
                    <Link to="/connect" style={{ textDecoration: 'none' }}>
                        <button 
                            onMouseEnter={() => setBtnHover(true)}
                            onMouseLeave={() => setBtnHover(false)}
                            style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: '#39FF14',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'none',
                                cursor: 'pointer',
                                transform: btnHover ? 'scale(1.1)' : 'scale(1)',
                                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                boxShadow: btnHover ? '0 0 30px rgba(57, 255, 20, 0.4)' : 'none',
                                flexShrink: 0
                            }}
                        >
                            <ArrowUpRight size={28} color="#000" />
                        </button>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
