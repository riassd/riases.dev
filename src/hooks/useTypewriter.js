import { useEffect, useState } from 'react'

const TYPE_SPEED = 70
const DELETE_SPEED = 40
const HOLD_MS = 1800

export function useTypewriter(words) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }

    const current = words[wordIndex % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), HOLD_MS)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
      timeout = setTimeout(() => setText(next), deleting ? DELETE_SPEED : TYPE_SPEED)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words])

  return text
}
