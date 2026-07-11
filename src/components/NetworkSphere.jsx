import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Sphere() {
  const groupRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const reducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.6, 2), [])

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return
    if (!reducedMotion) {
      group.rotation.y += delta * 0.15
    }
    group.rotation.x += (mouse.current.y * 0.2 - group.rotation.x) * 0.03
    group.rotation.z += (-mouse.current.x * 0.12 - group.rotation.z) * 0.03
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#f4f2ec" transparent opacity={0.18} />
      </lineSegments>
      <points geometry={geometry}>
        <pointsMaterial color="#ffd21f" size={0.045} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  )
}

export default function NetworkSphere() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Sphere />
      </Suspense>
    </Canvas>
  )
}
