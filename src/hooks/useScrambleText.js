import { useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01#$%&_/\\'

export function useScrambleText(text) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const raf = useRef(null)

  const scramble = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    cancelAnimationFrame(raf.current)
    frame.current = 0
    const totalFrames = text.length * 3

    const tick = () => {
      frame.current += 1
      const revealCount = Math.floor((frame.current / totalFrames) * text.length)

      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealCount) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(''),
      )

      if (frame.current < totalFrames) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    raf.current = requestAnimationFrame(tick)
  }

  const reset = () => {
    cancelAnimationFrame(raf.current)
    setDisplay(text)
  }

  return { display, onMouseEnter: scramble, onMouseLeave: reset }
}
