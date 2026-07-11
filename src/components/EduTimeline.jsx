import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { education } from '../data/profile.js'

export default function EduTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.6'],
  })
  const lineHeight = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 })

  return (
    <div ref={ref} className="edu-timeline">
      <div className="edu-timeline-track">
        <motion.div className="edu-timeline-line" style={{ scaleY: lineHeight }} />
      </div>
      <ul className="edu-timeline-list">
        {education.map((item) => (
          <li key={item.degree} className="edu-timeline-item">
            <span className="edu-timeline-dot" />
            <p className="edu-degree">{item.degree}</p>
            <p className="edu-school">
              {item.school} · {item.period}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
