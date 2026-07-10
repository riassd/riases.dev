import { useCursor } from '../hooks/useCursor.js'

export default function Cursor() {
  const { dotRef, enabled } = useCursor()

  if (!enabled) return null

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
}
