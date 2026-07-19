import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { BsFileEarmarkPdfFill } from 'react-icons/bs'
import { TbCopy } from 'react-icons/tb'
import Balancer from 'react-wrap-balancer'
import { profile } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'
import { useSpotlight } from '../hooks/useSpotlight.js'
import { useMagnetic } from '../hooks/useMagnetic.js'
import { downloadResumePdf } from '../hooks/useResumePdf.js'
import ContactCard from './ContactCard.jsx'

const TIME_ZONE = 'America/Bogota'

function useLocalTime() {
  const format = () =>
    new Intl.DateTimeFormat('es-CO', { hour: '2-digit', minute: '2-digit', timeZone: TIME_ZONE }).format(new Date())

  const [time, setTime] = useState(format)

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(id)
  }, [])

  return time
}

function ContactTile({ icon: Icon, label, onClick, href, ...rest }) {
  const spotlight = useSpotlight()
  const magnetic = useMagnetic()
  const Tag = href ? 'a' : 'button'

  const setRef = (el) => {
    spotlight.ref.current = el
    magnetic.ref.current = el
  }

  return (
    <Tag
      ref={setRef}
      href={href}
      type={href ? undefined : 'button'}
      onClick={onClick}
      onMouseMove={(e) => {
        spotlight.onMouseMove(e)
        magnetic.onMouseMove(e)
      }}
      onMouseLeave={magnetic.onMouseLeave}
      className="contact-tile"
      data-cursor="hover"
      {...rest}
    >
      <Icon className="contact-tile-icon" aria-hidden="true" />
      <span className="contact-tile-label">{label}</span>
    </Tag>
  )
}

function CopyEmailButton() {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.links.email)
      toast('📋 Email copiado', { description: profile.links.email })
    } catch {
      toast.error('No se pudo copiar el email')
    }
  }

  return (
    <button type="button" className="contact-copy-btn" onClick={handleCopy} data-cursor="hover" aria-label="Copiar email">
      <TbCopy aria-hidden="true" />
    </button>
  )
}

export default function Contact() {
  const time = useLocalTime()

  const handleDownloadCv = async () => {
    try {
      await downloadResumePdf()
    } catch {
      toast.error('No se pudo generar el CV')
    }
  }

  return (
    <motion.section
      id="contacto"
      className="section section-contact"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <div className="contact-grid">
        <div>
          <motion.h2 variants={fadeUpItem} className="section-title glitch" data-text="Contacto">
            Contacto
          </motion.h2>
          <motion.p variants={fadeUpItem} className="contact-text">
            <Balancer>
              ¿Tienes un proyecto en mente o quieres charlar sobre automatización y
              ciberseguridad? Escríbeme.
            </Balancer>
          </motion.p>

          <motion.div variants={fadeUpItem} className="contact-status">
            <span className="contact-status-dot" aria-hidden="true" />
            Disponible para nuevas oportunidades
            <span className="contact-status-sep">·</span>
            {time} en {profile.location.split(',')[0]}
          </motion.div>

          <motion.div variants={fadeUpItem} className="contact-email-row">
            <a className="contact-link" href={`mailto:${profile.links.email}`} data-cursor="hover">
              {profile.links.email}
            </a>
            <CopyEmailButton />
          </motion.div>

          <motion.div variants={staggerContainer(0.06)} className="contact-tiles">
            <ContactTile
              icon={FaGithub}
              label="GitHub"
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
            />
            <ContactTile
              icon={FaLinkedin}
              label="LinkedIn"
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
            />
            <ContactTile icon={BsFileEarmarkPdfFill} label="Descargar CV" onClick={handleDownloadCv} />
          </motion.div>
        </div>
        <motion.div variants={fadeUpItem}>
          <ContactCard />
        </motion.div>
      </div>
    </motion.section>
  )
}
