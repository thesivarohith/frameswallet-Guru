import { useEffect, useRef } from 'react'

export default function ParticleSystem() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth > 768) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const PARTICLE_COUNT = 120
    const particles = []

    // Sections detected by scroll position
    // 0=hero, 1=stats, 2=ourwork, 3=team, 4=testimonials
    let currentSection = 0

    // ── PARTICLE INIT ──
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(i))
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        ox: Math.random() * canvas.width,
        oy: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        green: Math.random() > 0.6,
        pulse: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
      }
    }

    // ── MOUSE / TOUCH ──
    let touchX = -999, touchY = -999

    window.addEventListener('mousemove', e => {
      touchX = e.clientX
      touchY = e.clientY
    })
    window.addEventListener('touchmove', e => {
      touchX = e.touches[0].clientX
      touchY = e.touches[0].clientY
    }, { passive: true })
    window.addEventListener('touchend', () => {
      touchX = -999; touchY = -999
    })

    // ── SCROLL SECTION DETECTION ──
    function detectSection() {
      const vh = window.innerHeight
      const sy = window.scrollY
      // Approximate section boundaries
      if (sy < vh * 1) currentSection = 0        // hero
      else if (sy < vh * 5) currentSection = 1   // stats
      else if (sy < vh * 12) currentSection = 2  // our work
      else if (sy < vh * 16) currentSection = 3  // team
      else currentSection = 4                     // testimonials
    }

    window.addEventListener('scroll', () => {
      detectSection()
    }, { passive: true })

    // ── ANIMATION LOOP ──
    let rafId
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.pulse += p.speed

        // SECTION 0 — HERO: ambient drift, scatter on touch
        if (currentSection === 0) {
          const dx = touchX - p.x
          const dy = touchY - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120 && touchX !== -999) {
            p.vx -= (dx / dist) * 0.5
            p.vy -= (dy / dist) * 0.5
          }

          // Gentle ambient drift
          p.vx += (Math.random() - 0.5) * 0.02
          p.vy += (Math.random() - 0.5) * 0.02
          p.vx += (p.ox - p.x) * 0.005 // slowly return to bounds
          p.vy += (p.oy - p.y) * 0.005
          p.vx *= 0.92
          p.vy *= 0.92
        }

        // SECTION 1 — STATS: orbit center of screen
        else if (currentSection === 1) {
          const cx = canvas.width / 2
          const cy = canvas.height / 2
          const angle = Math.atan2(p.y - cy, p.x - cx)
          const radius = 80 + (i % 5) * 40
          const tx = cx + Math.cos(angle + 0.005) * radius
          const ty = cy + Math.sin(angle + 0.005) * radius
          p.vx += (tx - p.x) * 0.02
          p.vy += (ty - p.y) * 0.02
          p.vx *= 0.92
          p.vy *= 0.92
        }

        // SECTION 2 — OUR WORK: float upward slowly
        else if (currentSection === 2) {
          p.vy -= 0.02
          p.vx += (Math.random() - 0.5) * 0.1
          p.vx *= 0.95
          p.vy *= 0.98
          if (p.y < -10) {
            p.y = canvas.height + 10
            p.x = Math.random() * canvas.width
          }
        }

        // SECTION 3 — TEAM: scatter outward from center
        else if (currentSection === 3) {
          const cx = canvas.width / 2
          const cy = canvas.height / 2
          const dx = p.x - cx
          const dy = p.y - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            p.vx += (dx / dist) * 0.3
            p.vy += (dy / dist) * 0.3
          }
          p.vx += (p.ox - p.x) * 0.01
          p.vy += (p.oy - p.y) * 0.01
          p.vx *= 0.92
          p.vy *= 0.92
        }

        // SECTION 4 — TESTIMONIALS: gentle drift
        else {
          p.vx += (Math.random() - 0.5) * 0.05
          p.vy += (Math.random() - 0.5) * 0.05
          p.vx *= 0.97
          p.vy *= 0.97
        }

        p.x += p.vx
        p.y += p.vy

        // Keep in bounds
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        const alpha = p.alpha + Math.sin(p.pulse) * 0.15
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.green
          ? `rgba(57,255,20,${alpha})`
          : `rgba(245,240,232,${alpha * 0.6})`
        ctx.fill()
      })

      rafId = requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  if (typeof window !== 'undefined' && window.innerWidth > 768) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
}
