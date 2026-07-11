import { motion } from 'framer-motion'
import { profile } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'
import MagneticButton from './MagneticButton.jsx'

export default function Contact() {
  return (
    <motion.section
      id="contacto"
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <motion.h2 variants={fadeUpItem} className="section-title">
        Contacto
      </motion.h2>
      <motion.p variants={fadeUpItem} className="contact-text">
        ¿Tienes un proyecto en mente o quieres charlar sobre automatización y ciberseguridad?
        Escríbeme.
      </motion.p>
      <motion.a
        variants={fadeUpItem}
        className="contact-link"
        href={`mailto:${profile.links.email}`}
        data-cursor="hover"
      >
        {profile.links.email}
      </motion.a>
      <motion.div variants={fadeUpItem} className="contact-links">
        <MagneticButton
          className="button button-ghost"
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </MagneticButton>
        <MagneticButton
          className="button button-ghost"
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </MagneticButton>
      </motion.div>
    </motion.section>
  )
}
