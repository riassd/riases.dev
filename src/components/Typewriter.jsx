import { useTypewriter } from '../hooks/useTypewriter.js'

export default function Typewriter({ words }) {
  const text = useTypewriter(words)

  return (
    <span className="typewriter">
      {text}
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  )
}
