import { useRef } from 'react'

const STRENGTH = 0.35
const MAX_OFFSET = 10

export function useMagnetic() {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    const dx = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, x * STRENGTH))
    const dy = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, y * STRENGTH))
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (el) el.style.transform = ''
  }

  return { ref, onMouseMove, onMouseLeave }
}
