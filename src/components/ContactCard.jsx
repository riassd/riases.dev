import { useState } from 'react'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { FaLinkedin } from 'react-icons/fa6'
import { profile, certifications } from '../data/profile.js'
import { downloadVCard } from '../hooks/useVCard.js'
import { useTilt } from '../hooks/useTilt.js'
import { useSpotlight } from '../hooks/useSpotlight.js'

const INITIALS = profile.name
  .split(' ')
  .slice(0, 2)
  .map((word) => word[0])
  .join('')

export default function ContactCard() {
  const [flipped, setFlipped] = useState(false)
  const tilt = useTilt()
  const spotlight = useSpotlight()

  const handleMouseMove = (e) => {
    tilt.onMouseMove(e)
    spotlight.onMouseMove(e)
  }

  return (
    <motion.div
      className="contact-card-scene"
      style={tilt.style}
      onMouseMove={handleMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <motion.div
        ref={spotlight.ref}
        className="contact-card"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setFlipped((f) => !f)}
        data-cursor="hover"
        role="button"
        tabIndex={0}
        aria-label="Voltear tarjeta de presentación"
        onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
      >
        <div className="contact-card-face contact-card-front">
          <div className="contact-card-stat">
            <b>{certifications.length}</b>
            <span>cert.</span>
          </div>
          <div className="contact-card-top">
            <span className="contact-card-avatar">{INITIALS}</span>
            <p className="contact-card-eyebrow">riassd.</p>
          </div>
          <div>
            <h3 className="contact-card-name">{profile.name}</h3>
            <p className="contact-card-role">{profile.role}</p>
          </div>
          <ul className="contact-card-tags">
            {profile.skillGroups.map((group) => (
              <li key={group.title} className={`contact-card-tag contact-card-tag--${group.tone}`}>
                <span className="contact-card-tag-dot" />
                {group.title}
              </li>
            ))}
          </ul>
          <div className="contact-card-footer">
            <p className="contact-card-location">{profile.location}</p>
            <span className="contact-card-hint">toca para voltear ↻</span>
          </div>
        </div>

        <div className="contact-card-face contact-card-back">
          <div className="contact-card-back-header">
            <FaLinkedin className="contact-card-linkedin-icon" aria-hidden="true" />
            <span>Conecta en LinkedIn</span>
          </div>
          <div className="contact-card-qr">
            <QRCodeSVG
              value={profile.links.linkedin}
              size={92}
              bgColor="transparent"
              fgColor="#f4f2ec"
              level="M"
            />
          </div>
          <p className="contact-card-qr-label">Escanea o toca "Ver perfil"</p>
          <div className="contact-card-back-actions">
            <a
              className="button button-ghost contact-card-linkedin-btn"
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              data-cursor="hover"
            >
              Ver perfil
            </a>
            <button
              type="button"
              className="button button-primary contact-card-save"
              onClick={(e) => {
                e.stopPropagation()
                downloadVCard()
              }}
            >
              Guardar (.vcf)
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
