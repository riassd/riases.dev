import { useEffect, useRef, useState } from 'react'

const LERP = 0.18

export function useCursor() {
  const dotRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches)
    const onChange = (e) => setEnabled(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...target }
    let raf = 0

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const onOver = (e) => {
      const hoverEl = e.target.closest('[data-cursor="hover"]')
      dotRef.current?.classList.toggle('cursor-dot--hover', Boolean(hoverEl))
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * LERP
      pos.y += (target.y - pos.y) * LERP
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  return { dotRef, enabled }
}
