import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'
import { featuredProject, otherProjects } from '../data/projects.js'
import { useSpotlight } from '../hooks/useSpotlight.js'
import { useTilt } from '../hooks/useTilt.js'
import { useScrambleText } from '../hooks/useScrambleText.js'
import { fadeUpItem, scaleIn, staggerContainer, viewport } from '../motion.js'
import MagneticButton from './MagneticButton.jsx'

function FeaturedCard({ project }) {
  const spotlight = useSpotlight()
  const tilt = useTilt()

  return (
    <motion.div
      variants={scaleIn}
      style={tilt.style}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="beam-wrap"
    >
      <article ref={spotlight.ref} onMouseMove={spotlight.onMouseMove} className="card card-featured">
        <span className="card-index">{project.index}</span>
        <div className="card-body">
          <p className="card-eyebrow">Proyecto destacado</p>
          <h3 className="card-title">{project.name}</h3>
          <p className="card-tagline">
            <Balancer>{project.tagline}</Balancer>
          </p>
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
    </motion.div>
  )
}

function ProjectCard({ project }) {
  const spotlight = useSpotlight()
  const tilt = useTilt()
  const links = project.links ?? (project.repoUrl ? [{ label: 'Repositorio', url: project.repoUrl }] : [])

  return (
    <motion.article
      ref={spotlight.ref}
      variants={fadeUpItem}
      style={tilt.style}
      onMouseMove={(e) => {
        spotlight.onMouseMove(e)
        tilt.onMouseMove(e)
      }}
      onMouseLeave={tilt.onMouseLeave}
      className="card"
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
    </motion.article>
  )
}

export default function Projects() {
  const scramble = useScrambleText('Proyectos')

  return (
    <motion.section
      id="proyectos"
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <motion.h2
        variants={fadeUpItem}
        className="section-title"
        onMouseEnter={scramble.onMouseEnter}
        onMouseLeave={scramble.onMouseLeave}
      >
        {scramble.display}
      </motion.h2>
      <FeaturedCard project={featuredProject} />
      <motion.div variants={staggerContainer(0.08)} className="card-grid">
        {otherProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </motion.div>
    </motion.section>
  )
}
