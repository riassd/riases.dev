import { profile } from '../data/profile.js'
import { useReveal } from '../hooks/useReveal.js'
import Typewriter from './Typewriter.jsx'

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
          <a className="button button-primary" href="#proyectos" data-cursor="hover">
            Ver proyectos
          </a>
          <a className="button button-ghost" href="#contacto" data-cursor="hover">
            Contacto
          </a>
        </div>
      </div>
    </section>
  )
}
