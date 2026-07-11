import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useKonamiCode } from '../hooks/useKonamiCode.js'
import { unlockAchievement } from '../hooks/useAchievements.js'

export default function EasterEgg() {
  const [visible, setVisible] = useState(false)

  const unlock = useCallback(() => {
    setVisible(true)
    unlockAchievement('konami')
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#ffd21f', '#f472b6', '#38bdf8'],
      })
    }
    setTimeout(() => setVisible(false), 3500)
  }, [])

  useKonamiCode(unlock)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="easter-egg"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          role="status"
        >
          🕹️ Modo desarrollador desbloqueado — sabes tu Konami Code.
        </motion.div>
      )}
    </AnimatePresence>
  )
}
