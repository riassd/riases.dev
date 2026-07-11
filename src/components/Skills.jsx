import { motion } from 'framer-motion'
import { profile } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'
import DigitalRain from './DigitalRain.jsx'

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="section section-skills"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <DigitalRain />
      <motion.h2 variants={fadeUpItem} className="section-title glitch" data-text="Skills">
        Skills
      </motion.h2>
      <motion.div variants={staggerContainer(0.12)} className="skill-groups">
        {profile.skillGroups.map((group) => (
          <motion.div key={group.title} variants={fadeUpItem} className="skill-group">
            <h3 className={`skill-group-title skill-group-title--${group.tone}`}>{group.title}</h3>
            <ul className="skills-list">
              {group.skills.map((skill) => (
                <li key={skill} className={`skill-pill skill-pill--${group.tone}`}>
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
