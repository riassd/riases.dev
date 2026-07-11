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

function Track() {
  return (
    <div className="marquee-track">
      {ITEMS.map(({ label, Icon }) => (
        <span key={label} className="marquee-item">
          <Icon aria-hidden="true" />
          {label}
        </span>
      ))}
    </div>
  )
}

export default function TechMarquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <Track />
      <Track />
    </div>
  )
}
