import { achievement, education, experience } from '../data/profile.js'
import { useReveal } from '../hooks/useReveal.js'

export default function Experience() {
  const reveal = useReveal()

  return (
    <section id="experiencia" className="section">
      <div ref={reveal.ref} className={reveal.className}>
        <h2 className="section-title">Experiencia</h2>
        <ul className="timeline">
          {experience.map((item) => (
            <li key={item.role} className="timeline-item">
              <p className="timeline-period">{item.period}</p>
              <h3 className="timeline-role">{item.role}</h3>
              <p className="timeline-org">{item.org}</p>
              <p className="timeline-desc">{item.description}</p>
            </li>
          ))}
        </ul>

        <div className="edu-achievement">
          <div>
            <h3 className="subsection-title">Educación</h3>
            <ul className="edu-list">
              {education.map((item) => (
                <li key={item.degree}>
                  <p className="edu-degree">{item.degree}</p>
                  <p className="edu-school">
                    {item.school} · {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="achievement-banner">
            <p className="achievement-title">{achievement.title}</p>
            <p className="achievement-desc">{achievement.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
