import { useState } from 'react'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { profile } from '../data/profile.js'
import { downloadVCard } from '../hooks/useVCard.js'

export default function ContactCard() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="contact-card-scene">
      <motion.div
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
          <div>
            <p className="contact-card-eyebrow">riassd.</p>
            <h3 className="contact-card-name">{profile.name}</h3>
            <p className="contact-card-role">{profile.role}</p>
            <p className="contact-card-location">{profile.location}</p>
          </div>
          <span className="contact-card-hint">toca para voltear ↻</span>
        </div>

        <div className="contact-card-face contact-card-back">
          <div className="contact-card-qr">
            <QRCodeSVG
              value={profile.links.linkedin}
              size={112}
              bgColor="transparent"
              fgColor="#f4f2ec"
              level="M"
            />
          </div>
          <p className="contact-card-qr-label">Escanea para ir a mi LinkedIn</p>
          <button
            type="button"
            className="button button-primary contact-card-save"
            onClick={(e) => {
              e.stopPropagation()
              downloadVCard()
            }}
          >
            Guardar contacto (.vcf)
          </button>
        </div>
      </motion.div>
    </div>
  )
}
