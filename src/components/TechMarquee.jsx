import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  SiDocker,
  SiElectron,
  SiFastapi,
  SiJavascript,
  SiNodedotjs,
  SiOwasp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiVercel,
} from 'react-icons/si'
import { TbBrandPowershell } from 'react-icons/tb'

const ITEMS = [
  { label: 'JavaScript', Icon: SiJavascript },
  { label: 'Node.js', Icon: SiNodedotjs },
  { label: 'Python', Icon: SiPython },
  { label: 'React', Icon: SiReact },
  { label: 'Electron', Icon: SiElectron },
  { label: 'FastAPI', Icon: SiFastapi },
  { label: 'OWASP', Icon: SiOwasp },
  { label: 'PostgreSQL', Icon: SiPostgresql },
  { label: 'Supabase', Icon: SiSupabase },
  { label: 'Docker', Icon: SiDocker },
  { label: 'Vercel', Icon: SiVercel },
  { label: 'PowerShell', Icon: TbBrandPowershell },
]

function TrackItems() {
  return (
    <>
      {ITEMS.map(({ label, Icon }) => (
        <span key={label} className="marquee-item">
          <Icon aria-hidden="true" />
          {label}
        </span>
      ))}
    </>
  )
}

export default function TechMarquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Base infinite loop: the track holds two copies of the items, so
    // moving it by -50% brings the duplicate exactly into place.
    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 26,
      ease: 'none',
      repeat: -1,
    })

    // Scroll velocity nudges the marquee's speed/direction — scroll fast,
    // it races; scroll up, it reverses; stop scrolling, it eases back.
    let lastY = window.scrollY

    const onScroll = () => {
      const delta = window.scrollY - lastY
      lastY = window.scrollY
      const dir = delta < 0 ? -1 : 1
      const boost = Math.min(Math.abs(delta) / 12, 4)
      gsap.to(tween, { timeScale: dir * (1 + boost), duration: 0.25, overwrite: true })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    const decay = () => {
      const current = tween.timeScale()
      const target = current < 0 ? -1 : 1
      tween.timeScale(current + (target - current) * 0.03)
    }
    gsap.ticker.add(decay)

    return () => {
      window.removeEventListener('scroll', onScroll)
      gsap.ticker.remove(decay)
      tween.kill()
    }
  }, [])

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        <TrackItems />
        <TrackItems />
      </div>
    </div>
  )
}
