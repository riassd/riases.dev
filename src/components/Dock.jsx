import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTrophy } from 'react-icons/fa6'
import { MdOutlineMailOutline } from 'react-icons/md'
import { BsTerminalFill, BsFileEarmarkPdfFill } from 'react-icons/bs'
import { profile } from '../data/profile.js'
import { downloadResumePdf } from '../hooks/useResumePdf.js'
import { unlockableAchievements } from '../data/unlockables.js'
import { useAchievements } from '../hooks/useAchievements.js'

const BASE_ITEMS = [
  {
    label: 'GitHub',
    Icon: FaGithub,
    action: () => window.open(profile.links.github, '_blank', 'noreferrer'),
  },
  {
    label: 'LinkedIn',
    Icon: FaLinkedin,
    action: () => window.open(profile.links.linkedin, '_blank', 'noreferrer'),
  },
  {
    label: 'Email',
    Icon: MdOutlineMailOutline,
    action: () => {
      window.location.href = `mailto:${profile.links.email}`
    },
  },
  {
    label: 'Terminal',
    Icon: BsTerminalFill,
    action: () => window.dispatchEvent(new Event('open-terminal')),
  },
  {
    label: 'Descargar CV',
    Icon: BsFileEarmarkPdfFill,
    action: () => downloadResumePdf(),
  },
]

function DockIcon({ item, mouseX }) {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })
  const widthSync = useTransform(distance, [-140, 0, 140], [38, 60, 38])
  const width = useSpring(widthSync, { mass: 0.15, stiffness: 200, damping: 14 })
  const size = shouldReduceMotion ? 44 : width

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{ width: size, height: size }}
      className="dock-icon"
      onClick={item.action}
      data-cursor="hover"
      aria-label={item.label}
    >
      <item.Icon />
      {item.badge > 0 && <span className="dock-badge">{item.badge}</span>}
      <span className="dock-tooltip" aria-hidden="true">
        {item.label}
      </span>
    </motion.button>
  )
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity)
  const unlocked = useAchievements()

  const items = [
    ...BASE_ITEMS,
    {
      label: `Logros (${unlocked.length}/${unlockableAchievements.length})`,
      Icon: FaTrophy,
      badge: unlocked.length,
      action: () => window.dispatchEvent(new Event('open-achievements')),
    },
  ]

  return (
    <motion.div
      className="dock"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      role="toolbar"
      aria-label="Accesos rápidos"
    >
      {items.map((item) => (
        <DockIcon key={item.label} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  )
}
