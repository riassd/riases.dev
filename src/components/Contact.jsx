import { useState } from 'react'
import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'
import { profile } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'
import MagneticButton from './MagneticButton.jsx'
import ContactCard from './ContactCard.jsx'
import ParticleNetwork from './ParticleNetwork.jsx'
import { useMagnetic } from '../hooks/useMagnetic.js'
import { downloadResumePdf } from '../hooks/useResumePdf.js'

function ResumeButton() {
  const magnetic = useMagnetic()
  const [status, setStatus] = useState('idle')

  const handleClick = async () => {
    if (status === 'loading') return
    setStatus('loading')
    try {
      await downloadResumePdf()
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  return (
    <button
      ref={magnetic.ref}
      type="button"
      className="magnetic button button-primary"
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      onClick={handleClick}
      data-cursor="hover"
      disabled={status === 'loading'}
    >
      {status === 'loading' ? 'Generando CV…' : status === 'error' ? 'Reintentar descarga' : 'Descargar CV (PDF)'}
    </button>
  )
}

export default function Contact() {
  return (
    <motion.section
      id="contacto"
      className="section section-contact"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <ParticleNetwork />
      <div className="contact-grid">
        <div>
          <motion.h2 variants={fadeUpItem} className="section-title glitch" data-text="Contacto">
            Contacto
          </motion.h2>
          <motion.p variants={fadeUpItem} className="contact-text">
            <Balancer>
              ¿Tienes un proyecto en mente o quieres charlar sobre automatización y
              ciberseguridad? Escríbeme.
            </Balancer>
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
            <ResumeButton />
          </motion.div>
        </div>
        <motion.div variants={fadeUpItem}>
          <ContactCard />
        </motion.div>
      </div>
    </motion.section>
  )
}
