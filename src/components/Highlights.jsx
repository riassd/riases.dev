import { highlights } from '../data/highlights.js'
import { useReveal } from '../hooks/useReveal.js'

export default function Highlights() {
  const reveal = useReveal()

  return (
    <section className="section">
      <div ref={reveal.ref} className={reveal.className}>
        <h2 className="section-title">En pocas palabras</h2>
        <div className="bento">
          {highlights.map((item) => (
            <div
              key={item.label}
              className={`bento-item bento-item--${item.tone} ${item.span ? `bento-item--${item.span}` : ''}`}
            >
              <span className="bento-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
