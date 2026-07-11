import { profile } from '../data/profile.js'
import { useReveal } from '../hooks/useReveal.js'
import Typewriter from './Typewriter.jsx'
import MagneticButton from './MagneticButton.jsx'

export default function Hero() {
  const reveal = useReveal()

  return (
    <section id="top" className="hero">
      <div ref={reveal.ref} className={reveal.className}>
        <p className="hero-eyebrow">Hola, soy</p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-role">
          <Typewriter words={profile.roles} />
        </p>
        <p className="hero-degree">{profile.role}</p>
        <p className="hero-bio">{profile.bio}</p>
        <div className="hero-actions">
          <MagneticButton className="button button-primary" href="#proyectos">
            Ver proyectos
          </MagneticButton>
          <MagneticButton className="button button-ghost" href="#contacto">
            Contacto
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
