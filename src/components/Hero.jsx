import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'
import { profile } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'
import Typewriter from './Typewriter.jsx'
import MagneticButton from './MagneticButton.jsx'
import HeroSphere from './HeroSphere.jsx'

export default function Hero() {
  const nameWords = profile.name.split(' ')

  return (
    <section id="top" className="hero">
      <HeroSphere />
      <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={staggerContainer(0.1)}>
        <motion.p variants={fadeUpItem} className="hero-eyebrow">
          Hola, soy
        </motion.p>

        <motion.h1 variants={staggerContainer(0.08)} className="hero-name">
          {nameWords.map((word, i) => (
            <span key={word + i} className="hero-name-line">
              <motion.span variants={fadeUpItem} className="hero-name-word">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p variants={fadeUpItem} className="hero-role">
          <Typewriter words={profile.roles} />
        </motion.p>
        <motion.p variants={fadeUpItem} className="hero-degree">
          {profile.role}
        </motion.p>
        <motion.p variants={fadeUpItem} className="hero-bio">
          <Balancer>{profile.bio}</Balancer>
        </motion.p>
        <motion.div variants={fadeUpItem} className="hero-actions">
          <MagneticButton className="button button-primary" href="#proyectos">
            Ver proyectos
          </MagneticButton>
          <MagneticButton className="button button-ghost" href="#contacto">
            Contacto
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
