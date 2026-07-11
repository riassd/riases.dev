import { lazy, Suspense, useEffect, useState } from 'react'

const NetworkSphere = lazy(() => import('./NetworkSphere.jsx'))

export default function HeroSphere() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return

    const el = document.getElementById('top')
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.05,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="hero-canvas-wrap" aria-hidden="true">
      {visible && (
        <Suspense fallback={null}>
          <NetworkSphere />
        </Suspense>
      )}
    </div>
  )
}
