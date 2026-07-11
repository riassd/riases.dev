import { highlights } from '../data/highlights.js'
import { useReveal } from '../hooks/useReveal.js'
import { useSpotlight } from '../hooks/useSpotlight.js'

function BentoItem({ item }) {
  const spotlight = useSpotlight()

  return (
    <div
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      className={`bento-item bento-item--${item.tone} ${item.span ? `bento-item--${item.span}` : ''}`}
    >
      <span className="bento-label">{item.label}</span>
    </div>
  )
}

export default function Highlights() {
  const reveal = useReveal()

  return (
    <section className="section">
      <div ref={reveal.ref} className={reveal.className}>
        <h2 className="section-title">En pocas palabras</h2>
        <div className="bento">
          {highlights.map((item) => (
            <BentoItem key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
