import { motion } from 'framer-motion'
import { achievements, experience } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'
import EduTimeline from './EduTimeline.jsx'

export default function Experience() {
  return (
    <motion.section
      id="experiencia"
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <motion.h2 variants={fadeUpItem} className="section-title">
        Experiencia
      </motion.h2>
      <motion.ul variants={staggerContainer(0.08)} className="timeline">
        {experience.map((item) => (
          <motion.li key={item.role} variants={fadeUpItem} className="timeline-item">
            <p className="timeline-period">{item.period}</p>
            <h3 className="timeline-role">{item.role}</h3>
            <p className="timeline-org">{item.org}</p>
            <p className="timeline-desc">{item.description}</p>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div variants={fadeUpItem} className="edu-achievement">
        <div>
          <h3 className="subsection-title">Educación</h3>
          <EduTimeline />
        </div>
        <div>
          <h3 className="subsection-title">Logros</h3>
          <div className="achievement-list">
            {achievements.map((item) => (
              <div key={item.title} className="achievement-banner">
                <p className="achievement-title">{item.title}</p>
                <p className="achievement-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
