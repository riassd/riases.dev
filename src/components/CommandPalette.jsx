import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { profile } from '../data/profile.js'
import { featuredProject, otherProjects } from '../data/projects.js'
import { unlockAchievement } from '../hooks/useAchievements.js'

const SECTIONS = [
  { id: 'top', label: 'Inicio' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'certificaciones', label: 'Certificaciones' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'skills', label: 'Skills' },
  { id: 'contacto', label: 'Contacto' },
]

const ALL_PROJECTS = [featuredProject, ...otherProjects]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) unlockAchievement('palette')
  }, [open])

  const goTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const openLink = (url) => {
    setOpen(false)
    window.open(url, '_blank', 'noreferrer')
  }

  const openTerminal = () => {
    setOpen(false)
    window.dispatchEvent(new Event('open-terminal'))
  }

  const openAchievements = () => {
    setOpen(false)
    window.dispatchEvent(new Event('open-achievements'))
  }

  return (
    <>
      <button
        type="button"
        className="cmdk-trigger"
        onClick={() => setOpen(true)}
        data-cursor="hover"
        aria-label="Abrir menú de comandos"
      >
        <kbd>⌘</kbd>
        <kbd>K</kbd>
        <span>Comandos</span>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Menú de comandos"
        className="cmdk-root"
        overlayClassName="cmdk-overlay"
        contentClassName="cmdk-content"
      >
        <Command.Input autoFocus placeholder="Buscar una sección, proyecto o enlace…" />
        <Command.List>
          <Command.Empty>Sin resultados.</Command.Empty>

          <Command.Group heading="Navegar">
            {SECTIONS.map((section) => (
              <Command.Item key={section.id} onSelect={() => goTo(section.id)}>
                {section.label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Proyectos">
            {ALL_PROJECTS.map((project) => {
              const url = !project.private && (project.repoUrl ?? project.links?.[0]?.url)
              return (
                <Command.Item
                  key={project.name}
                  onSelect={() => (url ? openLink(url) : goTo('proyectos'))}
                >
                  {project.name}
                  {project.private ? ' (repositorio privado)' : ''}
                </Command.Item>
              )
            })}
          </Command.Group>

          <Command.Group heading="Enlaces">
            <Command.Item onSelect={() => openLink(profile.links.github)}>GitHub</Command.Item>
            <Command.Item onSelect={() => openLink(profile.links.linkedin)}>LinkedIn</Command.Item>
            <Command.Item onSelect={() => openLink(`mailto:${profile.links.email}`)}>
              Enviar email
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Herramientas">
            <Command.Item onSelect={openTerminal}>Abrir terminal (Ctrl+`)</Command.Item>
            <Command.Item onSelect={openAchievements}>Ver logros</Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  )
}
