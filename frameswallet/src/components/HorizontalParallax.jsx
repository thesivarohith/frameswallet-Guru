import React, { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Mock data with varying widths to create that "irregular" look
const TOP_ROW = [
    { src: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc", width: "300px" },
    { src: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea", width: "500px" },
    { src: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a", width: "400px" },
    { src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04", width: "600px" },
    { src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81", width: "350px" },
    { src: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc", width: "450px" },
];

const BOTTOM_ROW = [
    { src: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a", width: "400px" },
    { src: "https://images.unsplash.com/photo-1581362072978-14998d01fdaa", width: "300px" },
    { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4", width: "550px" },
    { src: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee", width: "420px" },
    { src: "https://images.unsplash.com/photo-1551710029-607e06bd45ff", width: "380px" },
    { src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad", width: "500px" },
];

export default function HorizontalParallax() {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Tight spring = fast response, no lag
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 20,
        restDelta: 0.001
    });

    // 1. Horizontal Movement: Move the entire track left
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);

    // 2. Vertical Split: Top moves UP, Bottom moves DOWN
    // We limit the split so images stay mostly visible even at the end
    const topY = useTransform(smoothProgress, [0, 0.5, 0.9, 1], [0, -100, -120, -120]);
    const bottomY = useTransform(smoothProgress, [0, 0.5, 0.9, 1], [0, 100, 120, 120]);

    // 3. Text Reveal: Scales up as images move away
    const textScale = useTransform(smoothProgress, [0.3, 0.6, 1], [0.8, 1.1, 1.1]);
    const textOpacity = useTransform(smoothProgress, [0.3, 0.5, 0.8, 1], [0, 1, 1, 1]);

    return (
        <section ref={targetRef} style={{ position: 'relative', height: '500vh', background: '#0a0a0a' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

                {/* REVEALED CONTENT (Becomes visible as rows split) */}
                <motion.div
                    style={{ 
                        scale: textScale, 
                        opacity: textOpacity,
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 0,
                        textAlign: 'center',
                        padding: '0 24px'
                    }}
                >
                    <h2 style={{ 
                        color: '#fff', 
                        fontSize: 'clamp(2.5rem, 12vw, 6rem)', 
                        fontWeight: 900, 
                        letterSpacing: '-0.03em', 
                        textTransform: 'uppercase', 
                        fontStyle: 'italic', 
                        margin: 0,
                        width: '100%',
                        wordWrap: 'break-word',
                        lineHeight: '1.0',
                        textShadow: '0 0 40px rgba(57, 255, 20, 0.3)'
                    }}>
                        CREATIVE <span style={{ color: '#39FF14' }}>EDITING</span>
                    </h2>
                    <p style={{ 
                        color: 'rgba(255, 255, 255, 0.6)', 
                        fontSize: 'clamp(0.9rem, 4vw, 1.2rem)', 
                        marginTop: '1.5rem', 
                        maxWidth: '24rem', 
                        lineHeight: '1.5',
                        padding: '0 10px'
                    }}>
                        Elevating visual storytelling with precision, dynamic flow, and world-class post-production.
                    </p>
                </motion.div>

                {/* HORIZONTAL TRACK */}
                <motion.div style={{ x, display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 3vw, 2rem)', paddingLeft: '10vw' }}>

                    {/* TOP ROW */}
                    <motion.div style={{ y: topY, display: 'flex', alignItems: 'center', gap: '3rem' }}>
                        {TOP_ROW.map((img, i) => (
                            <div
                                key={i}
                                style={{ 
                                    width: `clamp(260px, 70vw, 450px)`, 
                                    height: '25vh', 
                                    flexShrink: 0, 
                                    overflow: 'hidden', 
                                    borderRadius: '2rem', 
                                    border: '1px solid rgba(57, 255, 20, 0.3)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                    background: '#111'
                                }}
                            >
                                <img
                                    src={`${img.src}?q=80&w=800`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    alt="studio"
                                />
                            </div>
                        ))}
                    </motion.div>

                    {/* BOTTOM ROW */}
                    <motion.div style={{ y: bottomY, display: 'flex', alignItems: 'center', gap: '3rem' }}>
                        {BOTTOM_ROW.map((img, i) => (
                            <div
                                key={i}
                                style={{ 
                                    width: `clamp(260px, 70vw, 450px)`, 
                                    height: '25vh', 
                                    flexShrink: 0, 
                                    overflow: 'hidden', 
                                    borderRadius: '2rem', 
                                    border: '1px solid rgba(57, 255, 20, 0.3)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                    background: '#111'
                                }}
                            >
                                <img
                                    src={`${img.src}?q=80&w=800`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    alt="studio"
                                />
                            </div>
                        ))}
                    </motion.div>

                </motion.div>
                
                {/* Mobile Snap Anchors — ensure internal "stoppings" for the parallax scroll */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} className="mobile-only">
                    <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
                    <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
                    <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
                    <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
                    <div style={{ height: '100vh', scrollSnapAlign: 'start' }} />
                </div>

            </div>
        </section>
    );
}
