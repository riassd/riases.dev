import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let raf = 0

    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`
      }
      raf = 0
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  )
}
