import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'transparent', zIndex: 1,
      padding: '40px 80px',
      borderTop: '1px solid rgba(57,255,20,0.15)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always'
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '24px',
        fontStyle: 'italic',
        color: '#39FF14'
      }}>
        frames.wallet
      </div>

      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        color: 'rgba(245,240,232,0.4)'
      }}>
        &copy; 2025 frames.wallet — All rights reserved
      </div>

      <div style={{
        display: 'flex',
        gap: '24px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        <a href="#" style={{ color: '#39FF14', textDecoration: 'none' }}>Instagram</a>
        <a href="#" style={{ color: '#39FF14', textDecoration: 'none' }}>YouTube</a>
        <a href="#" style={{ color: '#39FF14', textDecoration: 'none' }}>LinkedIn</a>
      </div>
    </footer>
  );
}
