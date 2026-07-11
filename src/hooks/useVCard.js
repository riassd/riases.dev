import { profile } from '../data/profile.js'
import { unlockAchievement } from './useAchievements.js'

export function downloadVCard() {
  const [firstName, ...rest] = profile.name.split(' ')
  const lastName = rest.join(' ')

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${profile.name}`,
    `TITLE:${profile.role}`,
    `EMAIL;TYPE=INTERNET:${profile.links.email}`,
    `URL:${profile.links.github}`,
    `URL:${profile.links.linkedin}`,
    `ADR:;;${profile.location};;;;`,
    'END:VCARD',
  ]

  const blob = new Blob([lines.join('\n')], { type: 'text/vcard' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${profile.name.replace(/\s+/g, '-')}.vcf`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
  unlockAchievement('vcard')
}
