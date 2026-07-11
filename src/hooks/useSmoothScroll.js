import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // autoRaf: false hands the tick loop to GSAP so Lenis's smoothed scroll
    // position and any scrub-linked ScrollTrigger animation update on the
    // exact same frame — otherwise the two drift and scrubbed reveals jitter.
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
