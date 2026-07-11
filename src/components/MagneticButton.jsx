import { useMagnetic } from '../hooks/useMagnetic.js'

export default function MagneticButton({ className, children, ...props }) {
  const magnetic = useMagnetic()

  return (
    <a
      ref={magnetic.ref}
      className={`magnetic ${className ?? ''}`}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      data-cursor="hover"
      {...props}
    >
      {children}
    </a>
  )
}
