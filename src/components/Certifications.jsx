import { motion } from 'framer-motion'
import { SiCisco, SiGoogle } from 'react-icons/si'
import { BsMicrosoft } from 'react-icons/bs'
import { FaGraduationCap } from 'react-icons/fa6'
import { certifications } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'

const ICONS = {
  cisco: SiCisco,
  google: SiGoogle,
  microsoft: BsMicrosoft,
  university: FaGraduationCap,
}

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
        {certifications.map((cert) => {
          const Icon = ICONS[cert.icon] ?? FaGraduationCap
          return (
            <motion.div key={cert.name} variants={fadeUpItem} className="cert-card">
              <div className="cert-icon">
                <Icon aria-hidden="true" />
              </div>
              <div>
                <p className="cert-name">{cert.name}</p>
                <p className="cert-meta">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.section>
  )
}
