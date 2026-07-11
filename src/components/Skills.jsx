import { motion } from 'framer-motion'
import { profile } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <motion.h2 variants={fadeUpItem} className="section-title">
        Skills
      </motion.h2>
      <motion.ul variants={staggerContainer(0.04)} className="skills-list">
        {profile.skills.map((skill) => (
          <motion.li key={skill} variants={fadeUpItem}>
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  )
}
