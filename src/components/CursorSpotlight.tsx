import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'
import { useEffect } from 'react'

/** Faint radial glow that follows the cursor — illuminates code rain behind UI */
export function CursorSpotlight() {
  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  const bg = useMotionTemplate`radial-gradient(760px circle at ${x}px ${y}px, rgba(0, 255, 255, 0.1) 0%, rgba(0, 255, 255, 0.03) 32%, transparent 55%)`

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[3]"
      style={{ backgroundImage: bg }}
    />
  )
}
