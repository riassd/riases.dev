import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const RADIUS = 18
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function BackToTop() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf = 0

    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? doc.scrollTop / max : 0
      setProgress(pct)
      setVisible(doc.scrollTop > window.innerHeight * 0.6)
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          data-cursor="hover"
          aria-label="Volver arriba"
        >
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle className="back-to-top-track" cx="22" cy="22" r={RADIUS} />
            <circle
              className="back-to-top-ring"
              cx="22"
              cy="22"
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            />
          </svg>
          <span className="back-to-top-arrow">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
