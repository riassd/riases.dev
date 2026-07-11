const EASE = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export function staggerContainer(stagger = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  }
}

export const viewport = { once: true, amount: 0.2 }
