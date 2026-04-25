import React, { useEffect, useRef } from "react";
import { Zap, Sparkles } from "lucide-react";
import "./TestimonialsBento.css";

const TESTIMONIALS = [
  {
    id: "1",
    name: "Alex Morgan",
    role: "Director",
    company: "Cinematic Co",
    content: "Absolutely cinematic work. frames.wallet transformed our raw footage into something we could not have imagined. Every cut, every transition felt intentional and powerful.",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Jane Doe",
    role: "Producer",
    company: "Creative Studio",
    content: "An incredible experience from start to finish.",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "3",
    name: "John Smith",
    role: "CEO",
    company: "Vanguard Media",
    content: "Best investment we made this year. Period.",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "4",
    name: "Lauren Contreras",
    role: "Marketing Head",
    company: "Global Brands",
    content: "The team at frames.wallet has an eye for storytelling that very few editors possess. Our brand video got 10x the engagement we expected. Worth every penny.",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: "5",
    name: "Diana Johnston",
    role: "Founder",
    company: "StartUp Inc",
    content: "Overall a pleasurable experience. Pay as milestones are achieved — which made me feel very confident throughout. Seamless and easy process from start to finish.",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

export default function TestimonialsBento({
    testimonials = TESTIMONIALS,
    backgroundColor = "#030303",
    headerCardBgColor = "#111111",
    headerCardBlurColor = "rgba(57,255,20,0.1)",
    headerTextColor = "#F5F0E8",
    headerText = "What people say.",
    card1BgColor = "#1a1a1a",
    card1TextColor = "#F5F0E8",
    card2BgColor = "#39FF14",
    card2TextColor = "#000000",
    card2QuoteColor = "#000000",
    card2CompanyColor = "rgba(0,0,0,0.6)",
    card3BgColor = "#0a0a0a",
    card3AvatarBorderColor = "#39FF14",
    card3QuoteColor = "#F5F0E8",
    card3QuoteItalic = true,
    card3AuthorColor = "#F5F0E8",
    card3RoleColor = "#888888",
    statCardBgColor = "#1a1a1a",
    statValueColor = "#39FF14",
    statLabelColor = "#888888",
    card5BgColor = "#111111",
    card5HoverBgColor = "#1a1a1a",
    card5TextColor = "#cccccc",
    card5IconColor = "#39FF14",
    card5AuthorColor = "#888888",
    card6BgColor = "#1a1a1a",
    card6IconBgColor = "#0a0a0a",
    card6IconColor = "#39FF14",
    card6TextColor = "#F5F0E8",
}) {
    const gridRef = useRef(null);

    // Mobile-only scroll-triggered card entrance
    useEffect(() => {
        if (window.innerWidth >= 768) return; // desktop: skip
        const cards = gridRef.current?.querySelectorAll('.bento-card, .bento-c7');
        if (!cards) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('bento-visible');
                        observer.unobserve(entry.target); // fire once
                    }
                });
            },
            { threshold: 0.12 }
        );

        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    if (testimonials.length === 0) return null;

    return (
        <section className="bento-container" style={{ backgroundColor, fontFamily: "'Inter', sans-serif" }}>
            {/* Main Section Header */}
            <div style={{ marginBottom: '60px', textAlign: 'center', width: '100%', maxWidth: '1200px' }}>
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
                  fontSize: 'clamp(32px, 5vw, 48px)',
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

            <div className="bento-grid" ref={gridRef}>
                
                {/* Header Card */}
                <div className="bento-card bento-header group" style={{ backgroundColor: headerCardBgColor }}>
                    <div className="bento-header-blur" style={{ backgroundColor: headerCardBlurColor }} />
                    <h2 className="t-h2" style={{ color: headerTextColor, fontFamily: "'Cormorant Garamond', serif" }}>{headerText}</h2>
                </div>

                {/* Card 1 */}
                <div className="bento-card bento-c1" style={{ backgroundColor: card1BgColor }}>
                    <p className="t-lg" style={{ color: card1TextColor }}>"{testimonials[0]?.text || testimonials[0]?.content}"</p>
                    <div className="t-gap">
                        <img src={testimonials[0]?.image || testimonials[0]?.avatar} className="t-full-img" alt={testimonials[0]?.name} />
                        <div className="t-sm-bold" style={{ color: card1TextColor }}>{testimonials[0]?.name}</div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bento-card bento-c2" style={{ backgroundColor: card2BgColor }}>
                    <div className="t-5xl-black" style={{ color: card2QuoteColor, opacity: 0.2 }}>"</div>
                    <p className="t-bold-tight" style={{ color: card2TextColor }}>Best investment we made this year.</p>
                    <p className="t-xs-bold-up" style={{ color: card2CompanyColor }}>- {testimonials[2]?.company}</p>
                </div>

                {/* Card 3 */}
                <div className="bento-card bento-c3" style={{ backgroundColor: card3BgColor, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <img src={testimonials[3]?.image || testimonials[3]?.avatar} className="t-full-img-lg" style={{ borderColor: card3AvatarBorderColor }} alt={testimonials[3]?.name} />
                    <div>
                        <p className={`t-xl-light ${card3QuoteItalic ? 't-italic' : ''}`} style={{ color: card3QuoteColor, fontFamily: "'Playfair Display', serif" }}>"{testimonials[3]?.text || testimonials[3]?.content}"</p>
                        <p className="t-sm-bold" style={{ color: card3RoleColor }}>{testimonials[3]?.name}, {testimonials[3]?.role}</p>
                    </div>
                </div>

                {/* Stat Card */}
                <div className="bento-card bento-c4-stat" style={{ backgroundColor: statCardBgColor }}>
                    <div className="t-5xl-black" style={{ color: statValueColor }}>98%</div>
                    <div className="t-sm-med" style={{ color: statLabelColor }}>Customer Satisfaction</div>
                </div>

                {/* Card 5 */}
                <div className="bento-card bento-c5" style={{ backgroundColor: card5BgColor }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = card5HoverBgColor; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = card5BgColor; }}>
                    <div className="t-flex-between">
                        <p className="t-sm-med" style={{ color: card5TextColor, lineHeight: 1.6, marginBottom: '16px', maxWidth: '85%' }}>{testimonials[4]?.text || testimonials[4]?.content}</p>
                        <Zap size={16} style={{ color: card5IconColor, flexShrink: 0 }} />
                    </div>
                    <div className="t-xs-bold-up" style={{ color: card5AuthorColor, marginTop: 0 }}>{testimonials[4]?.name}</div>
                </div>

                {/* Card 6 */}
                <div className="bento-card bento-c6" style={{ backgroundColor: card6BgColor }}>
                    <div className="t-gap-4">
                        <div className="t-p-icon" style={{ backgroundColor: card6IconBgColor }}>
                            <Sparkles style={{ color: card6IconColor }} />
                        </div>
                        <div className="t-sm-med" style={{ color: card6TextColor }}>
                            "Simply pure magic."
                        </div>
                    </div>
                </div>

                {/* Card 7 - Creative Fill */}
                <div className="bento-c7 group">
                    <div className="radar-container">
                        <div className="radar-bg" />
                    </div>
                    <div style={{
                        position: 'absolute', inset: '2px', // leaves 2px for the glowing animated border
                        background: '#0a0a0a',
                        borderRadius: '22px',
                        zIndex: 1,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        gap: '12px'
                    }}>
                        <p style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(20px, 2.5vw, 28px)',
                            color: '#F5F0E8',
                            fontStyle: 'italic',
                            margin: 0
                        }}>Ready to be next?</p>
                        <a href="/connect" style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '12px',
                            letterSpacing: '2px',
                            color: '#39FF14',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            fontWeight: 700,
                            padding: '10px 24px',
                            border: '1px solid #39FF14',
                            borderRadius: '50px',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#39FF14';
                            e.currentTarget.style.color = '#000';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(57,255,20,0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#39FF14';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        >
                            Book a Session
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
