import * as ReactCountUp from 'react-countup'
import { motion } from 'framer-motion'

const CountUp = ReactCountUp.default?.default ?? ReactCountUp.default
import { useGithubStats } from '../hooks/useGithubStats.js'
import { profile } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'

function relativeTime(iso) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'hoy'
  if (days === 1) return 'hace 1 día'
  if (days < 30) return `hace ${days} días`
  const months = Math.floor(days / 30)
  if (months === 1) return 'hace 1 mes'
  if (months < 12) return `hace ${months} meses`
  const years = Math.floor(months / 12)
  return years === 1 ? 'hace 1 año' : `hace ${years} años`
}

export default function GitHubPulse() {
  const username = profile.links.github.replace(/.*github\.com\//, '')
  const { status, data } = useGithubStats(username)

  if (status === 'error') return null

  return (
    <motion.div
      className="gh-pulse"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.08)}
    >
      <motion.p variants={fadeUpItem} className="gh-pulse-label">
        <span className="gh-pulse-dot" aria-hidden="true" />
        GitHub en vivo
      </motion.p>
      <motion.div variants={fadeUpItem} className="gh-pulse-stats">
        <div className="gh-pulse-stat">
          <span className="gh-pulse-number">
            {data ? <CountUp end={data.publicRepos} duration={1.6} /> : '—'}
          </span>
          <span className="gh-pulse-sub">Repos públicos</span>
        </div>
        <div className="gh-pulse-stat">
          <span className="gh-pulse-number">
            {data ? <CountUp end={data.stars} duration={1.6} /> : '—'}
          </span>
          <span className="gh-pulse-sub">Stars totales</span>
        </div>
        <div className="gh-pulse-stat">
          <span className="gh-pulse-number">
            {data ? <CountUp end={data.followers} duration={1.6} /> : '—'}
          </span>
          <span className="gh-pulse-sub">Followers</span>
        </div>
      </motion.div>
      {data?.latestRepo && (
        <motion.a
          variants={fadeUpItem}
          className="gh-pulse-latest"
          href={data.latestRepo.url}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
        >
          Último commit en <strong>{data.latestRepo.name}</strong> ·{' '}
          {relativeTime(data.latestRepo.pushedAt)}
        </motion.a>
      )}
    </motion.div>
  )
}
