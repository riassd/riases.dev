import { profile } from '../data/profile.js'

export default function Contact() {
  return (
    <section id="contacto" className="section">
      <h2 className="section-title">Contacto</h2>
      <p className="contact-text">
        ¿Tienes un proyecto en mente o quieres charlar sobre automatización y ciberseguridad?
        Escríbeme.
      </p>
      <div className="contact-links">
        <a className="button button-primary" href={`mailto:${profile.links.email}`}>
          {profile.links.email}
        </a>
        <a className="button button-ghost" href={profile.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </section>
  )
}
