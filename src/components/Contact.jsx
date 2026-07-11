import { profile } from '../data/profile.js'
import { useReveal } from '../hooks/useReveal.js'
import MagneticButton from './MagneticButton.jsx'

export default function Contact() {
  const reveal = useReveal()

  return (
    <section id="contacto" className="section">
      <div ref={reveal.ref} className={reveal.className}>
        <h2 className="section-title">Contacto</h2>
        <p className="contact-text">
          ¿Tienes un proyecto en mente o quieres charlar sobre automatización y ciberseguridad?
          Escríbeme.
        </p>
        <a className="contact-link" href={`mailto:${profile.links.email}`} data-cursor="hover">
          {profile.links.email}
        </a>
        <div className="contact-links">
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
        </div>
      </div>
    </section>
  )
}
