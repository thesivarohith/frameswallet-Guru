import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFoundPage() {
    return (
        <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            {/* The main content area takes up the remaining flexible space */}
            <main style={{ flex: 1 }}></main>
            
            <Footer />
        </div>
    );
}
