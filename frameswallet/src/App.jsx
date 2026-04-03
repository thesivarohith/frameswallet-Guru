import Navbar from './components/Navbar'
import FrameScroll from './components/FrameScroll'
import Stats from './components/Stats'
import Tunnel from './components/Tunnel'
import Team from './components/Team'
import TestimonialsBento from './components/TestimonialsBento'
import Footer from './components/Footer'
import ParticleSystem from './components/ParticleSystem'

export default function App() {
  return (
    <>
      <ParticleSystem />
      <div style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
        <Navbar />
        <div className="snap-section"><FrameScroll /></div>
        <div className="snap-section"><Stats /></div>
        <div className="snap-section"><Tunnel /></div>
        <div className="snap-section"><Team /></div>
        <div className="snap-section"><TestimonialsBento /></div>
        <div className="snap-section"><Footer /></div>
      </div>
    </>
  )
}
