import { useEffect } from 'react'

const CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useKonamiCode(onUnlock) {
  useEffect(() => {
    let progress = 0

    const onKeyDown = (e) => {
      const expected = CODE[progress]
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key

      if (key === expected) {
        progress += 1
        if (progress === CODE.length) {
          progress = 0
          onUnlock()
        }
      } else {
        progress = key === CODE[0] ? 1 : 0
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onUnlock])
}
