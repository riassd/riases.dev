import { useEffect, useRef } from 'react'

const CHARS = '01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&'

export default function DigitalRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const fontSize = 16
    let columns = 0
    let drops = []
    let raf = 0
    let lastTime = 0

    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement
      canvas.width = clientWidth
      canvas.height = clientHeight
      columns = Math.floor(clientWidth / fontSize)
      drops = new Array(columns).fill(0).map(() => Math.random() * -50)
    }

    const draw = (time) => {
      if (time - lastTime > 55) {
        lastTime = time
        ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = `bold ${fontSize}px monospace`

        for (let i = 0; i < columns; i++) {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)]
          const y = drops[i] * fontSize
          ctx.fillStyle = Math.random() > 0.92 ? '#ffffff' : 'rgba(244, 63, 129, 0.85)'
          ctx.fillText(char, i * fontSize, y)

          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i] += 0.5
        }
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)

    const observer = new ResizeObserver(resize)
    observer.observe(canvas.parentElement)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="digital-rain" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
