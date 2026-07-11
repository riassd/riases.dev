import { motion } from 'framer-motion'
import { certifications } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'

export default function Certifications() {
  return (
    <motion.section
      id="certificaciones"
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <motion.h2 variants={fadeUpItem} className="section-title glitch" data-text="Certificaciones">
        Certificaciones
      </motion.h2>
      <motion.div variants={staggerContainer(0.05)} className="cert-grid">
        {certifications.map((cert) => (
          <motion.div key={cert.name} variants={fadeUpItem} className="cert-card">
            <p className="cert-name">{cert.name}</p>
            <p className="cert-meta">
              {cert.issuer} · {cert.date}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
