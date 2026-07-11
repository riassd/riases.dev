import { createElement } from 'react'
import { profile } from '../data/profile.js'
import { unlockAchievement } from './useAchievements.js'

export async function downloadResumePdf() {
  const [{ pdf }, { default: ResumeDocument }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('../pdf/ResumeDocument.jsx'),
  ])

  const blob = await pdf(createElement(ResumeDocument)).toBlob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `CV-${profile.name.replace(/\s+/g, '-')}.pdf`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
  unlockAchievement('cv')
}
