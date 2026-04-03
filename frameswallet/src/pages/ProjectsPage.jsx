import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HorizontalParallax from '../components/HorizontalParallax';

export default function ProjectsPage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HorizontalParallax />
      </main>
      <Footer />
    </div>
  );
}
