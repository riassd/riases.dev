import { profile } from '../data/profile.js'
import { useReveal } from '../hooks/useReveal.js'

export default function Skills() {
  const reveal = useReveal()

  return (
    <section id="skills" className="section">
      <div ref={reveal.ref} className={reveal.className}>
        <h2 className="section-title">Skills</h2>
        <ul className="skills-list">
          {profile.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
