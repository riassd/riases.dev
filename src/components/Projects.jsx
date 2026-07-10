import { featuredProject, otherProjects } from '../data/projects.js'

function FeaturedCard({ project }) {
  return (
    <article className="card card-featured">
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
        <a className="button button-primary" href={project.repoUrl} target="_blank" rel="noreferrer">
          Ver repositorio
        </a>
        <a className="button button-ghost" href={project.releasesUrl} target="_blank" rel="noreferrer">
          Descargas
        </a>
      </div>
    </article>
  )
}

function ProjectCard({ project }) {
  const isPlaceholder = !project.repoUrl

  return (
    <article className={`card ${isPlaceholder ? 'card-placeholder' : ''}`}>
      <h3 className="card-title">{project.name}</h3>
      <p className="card-tagline">{project.tagline}</p>
      {project.tech.length > 0 && (
        <ul className="tech-list">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      )}
      {!isPlaceholder && (
        <div className="card-actions">
          <a className="button button-ghost" href={project.repoUrl} target="_blank" rel="noreferrer">
            Ver repositorio
          </a>
        </div>
      )}
    </article>
  )
}

export default function Projects() {
  return (
    <section id="proyectos" className="section">
      <h2 className="section-title">Proyectos</h2>
      <FeaturedCard project={featuredProject} />
      <div className="card-grid">
        {otherProjects.map((project, index) => (
          <ProjectCard key={`${project.name}-${index}`} project={project} />
        ))}
      </div>
    </section>
  )
}
