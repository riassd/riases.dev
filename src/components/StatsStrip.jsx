import * as ReactCountUp from 'react-countup'
import { motion } from 'framer-motion'

const CountUp = ReactCountUp.default?.default ?? ReactCountUp.default
import { experience, certifications } from '../data/profile.js'
import { otherProjects } from '../data/projects.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'

const STATS = [
  { end: experience.length, suffix: '+', label: 'Roles profesionales' },
  { end: certifications.length, suffix: '', label: 'Certificaciones' },
  { end: otherProjects.length + 1, suffix: '', label: 'Proyectos' },
  { end: 2027, suffix: '', label: 'Graduación Maestría', noComma: true },
]

export default function StatsStrip() {
  return (
    <motion.div
      className="stats-strip"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.08)}
    >
      {STATS.map((stat) => (
        <motion.div key={stat.label} variants={fadeUpItem} className="stat">
          <p className="stat-number">
            <CountUp
              end={stat.end}
              duration={2}
              separator={stat.noComma ? '' : ','}
              enableScrollSpy
              scrollSpyOnce
            />
            {stat.suffix}
          </p>
          <p className="stat-label">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
