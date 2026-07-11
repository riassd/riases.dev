import { motion } from 'framer-motion'
import { highlights } from '../data/highlights.js'
import { useSpotlight } from '../hooks/useSpotlight.js'
import { useTilt } from '../hooks/useTilt.js'
import { useScrambleText } from '../hooks/useScrambleText.js'
import { fadeUpItem, scaleIn, staggerContainer, viewport } from '../motion.js'

function BentoItem({ item }) {
  const spotlight = useSpotlight()
  const tilt = useTilt()

  return (
    <motion.div
      ref={spotlight.ref}
      variants={scaleIn}
      style={tilt.style}
      onMouseMove={(e) => {
        spotlight.onMouseMove(e)
        tilt.onMouseMove(e)
      }}
      onMouseLeave={tilt.onMouseLeave}
      className={`bento-item bento-item--${item.tone} ${item.span ? `bento-item--${item.span}` : ''}`}
    >
      <span className="bento-label">{item.label}</span>
    </motion.div>
  )
}

export default function Highlights() {
  const scramble = useScrambleText('En pocas palabras')

  return (
    <motion.section
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <motion.h2
        variants={fadeUpItem}
        className="section-title"
        onMouseEnter={scramble.onMouseEnter}
        onMouseLeave={scramble.onMouseLeave}
      >
        {scramble.display}
      </motion.h2>
      <motion.div variants={staggerContainer(0.07)} className="bento">
        {highlights.map((item) => (
          <BentoItem key={item.label} item={item} />
        ))}
      </motion.div>
    </motion.section>
  )
}
