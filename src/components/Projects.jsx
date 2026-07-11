import { featuredProject, otherProjects } from '../data/projects.js'
import { useReveal } from '../hooks/useReveal.js'
import { useSpotlight } from '../hooks/useSpotlight.js'
import MagneticButton from './MagneticButton.jsx'

function FeaturedCard({ project }) {
  const reveal = useReveal()
  const spotlight = useSpotlight()

  return (
    <article
      ref={(node) => {
        reveal.ref.current = node
        spotlight.ref.current = node
      }}
      onMouseMove={spotlight.onMouseMove}
      className={`card card-featured ${reveal.className}`}
    >
      <span className="card-index">{project.index}</span>
      <div className="card-body">
        <p className="card-eyebrow">Proyecto destacado</p>
        <h3 className="card-title">{project.name}</h3>
        <p className="card-tagline">{project.tagline}</p>
        <p className="card-description">{project.description}</p>
        <ul className="card-highlights">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul className="tech-list">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="card-actions">
          {project.private ? (
            <span className="badge-private">Repositorio privado</span>
          ) : (
            <>
              <MagneticButton className="button button-primary" href={project.repoUrl} target="_blank" rel="noreferrer">
                Ver repositorio
              </MagneticButton>
              {project.releasesUrl && (
                <MagneticButton
                  className="button button-ghost"
                  href={project.releasesUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Descargas
                </MagneticButton>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project }) {
  const reveal = useReveal()
  const spotlight = useSpotlight()
  const links = project.links ?? (project.repoUrl ? [{ label: 'Repositorio', url: project.repoUrl }] : [])

  return (
    <article
      ref={(node) => {
        reveal.ref.current = node
        spotlight.ref.current = node
      }}
      onMouseMove={spotlight.onMouseMove}
      className={`card ${reveal.className}`}
    >
      <span className="card-index">{project.index}</span>
      <div className="card-body">
        <h3 className="card-title">{project.name}</h3>
        <p className="card-tagline">{project.tagline}</p>
        {project.description && <p className="card-description">{project.description}</p>}
        {project.tech.length > 0 && (
          <ul className="tech-list">
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
        <div className="card-actions">
          {project.private ? (
            <span className="badge-private">Repositorio privado</span>
          ) : (
            links.map((link) => (
              <MagneticButton key={link.url} className="button button-ghost" href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </MagneticButton>
            ))
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="proyectos" className="section">
      <h2 className="section-title">Proyectos</h2>
      <FeaturedCard project={featuredProject} />
      <div className="card-grid">
        {otherProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
