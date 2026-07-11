import { useEffect, useRef } from 'react'

const COUNT = 55
const LINK_DIST = 130
const MOUSE_DIST = 160

export default function ParticleNetwork() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let raf = 0
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement
      canvas.width = clientWidth
      canvas.height = clientHeight
      particles = new Array(COUNT).fill(0).map(() => ({
        x: Math.random() * clientWidth,
        y: Math.random() * clientHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }))
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const draw = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dist = Math.hypot(p.x - b.x, p.y - b.y)
          if (dist < LINK_DIST) {
            ctx.strokeStyle = `rgba(244, 242, 236, ${0.12 * (1 - dist / LINK_DIST)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (md < MOUSE_DIST) {
          ctx.strokeStyle = `rgba(255, 210, 31, ${0.5 * (1 - md / MOUSE_DIST)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }

        ctx.fillStyle = 'rgba(244, 242, 236, 0.6)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    const observer = new ResizeObserver(resize)
    observer.observe(canvas.parentElement)
    canvas.parentElement.addEventListener('mousemove', onMove)
    canvas.parentElement.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      canvas.parentElement?.removeEventListener('mousemove', onMove)
      canvas.parentElement?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="particle-network" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
