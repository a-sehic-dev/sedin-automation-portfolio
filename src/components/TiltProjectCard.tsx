import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'

const spring = { stiffness: 320, damping: 28, mass: 0.9 }

type Props = {
  children: ReactNode
  className?: string
  floatDelay?: number
}

export function TiltProjectCard({
  children,
  className = '',
  floatDelay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(
    useTransform(my, [0, 1], [11, -11]),
    spring,
  )
  const rotateY = useSpring(
    useTransform(mx, [0, 1], [-11, 11]),
    spring,
  )

  const glareX = useTransform(mx, [0, 1], [0, 100])
  const glareY = useTransform(my, [0, 1], [0, 100])
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.55), transparent 55%)`

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ type: 'spring', stiffness: 130, damping: 19 }}
    >
      <motion.div
        className="group perspective-[1100px]"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 5.2 + floatDelay * 0.12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay * 0.06,
        }}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative h-full will-change-transform"
        >
          <motion.div
            style={{ backgroundImage: glare }}
            className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-70 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="relative overflow-hidden rounded-3xl p-[1px]">
            <motion.div
              aria-hidden
              className="absolute -inset-[100%] z-0 bg-[conic-gradient(from_180deg,#0044ff,#00f2ff,#6366f1,#a855f7,#0044ff)] opacity-55 blur-[0.5px]"
              animate={{ rotate: 360 }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <div
              className="thunder-sheen project-neon-frame relative z-[1] m-[1px] min-h-0 overflow-hidden rounded-[22px]"
              style={{ transform: 'translateZ(0)' }}
            >
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
