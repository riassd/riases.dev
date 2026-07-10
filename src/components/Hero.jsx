import { profile } from '../data/profile.js'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <p className="hero-eyebrow">Hola, soy</p>
      <h1 className="hero-name">{profile.name}</h1>
      <p className="hero-role">{profile.role}</p>
      <p className="hero-bio">{profile.bio}</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#proyectos">
          Ver proyectos
        </a>
        <a className="button button-ghost" href="#contacto">
          Contacto
        </a>
      </div>
    </section>
  )
}
