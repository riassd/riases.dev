import { useMotionValue, useSpring, useTransform } from 'framer-motion'

const SPRING = { stiffness: 200, damping: 20, mass: 0.5 }
const MAX_DEG = 6

export function useTilt() {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_DEG, -MAX_DEG]), SPRING)
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_DEG, MAX_DEG]), SPRING)

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const onMouseLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return { style: { rotateX, rotateY, transformPerspective: 900 }, onMouseMove, onMouseLeave }
}
