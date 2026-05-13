import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'

const spring = { stiffness: 300, damping: 26, mass: 0.85 }

type Variant = 'process' | 'stats'

const variantClass: Record<
  Variant,
  { border: string; hover: string; pulse: string }
> = {
  process: {
    border:
      'border border-[#00f2ff] shadow-[0_0_0_1px_rgba(0,242,255,0.45),0_0_26px_rgba(0,242,255,0.18)]',
    hover:
      'group-hover:shadow-[0_0_0_1px_#00f2ff,0_0_40px_rgba(0,242,255,0.5),0_0_72px_rgba(0,68,255,0.22)]',
    pulse: 'from-cyan-400/50 via-[#00f2ff]/45 to-blue-600/40',
  },
  stats: {
    border:
      'border border-[#a855f7] shadow-[0_0_0_1px_rgba(168,85,247,0.45),0_0_24px_rgba(168,85,247,0.2)]',
    hover:
      'group-hover:shadow-[0_0_0_1px_#bc13fe,0_0_38px_rgba(188,19,254,0.38),0_0_56px_rgba(168,85,247,0.25)]',
    pulse: 'from-violet-500/50 via-[#bc13fe]/45 to-indigo-600/40',
  },
}

type Props = {
  children: ReactNode
  className?: string
  variant: Variant
  tilt?: 'normal' | 'subtle'
}

export function TiltNeonCard({
  children,
  className = '',
  variant,
  tilt = 'normal',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const max = tilt === 'subtle' ? 7 : 14

  const rotateX = useSpring(
    useTransform(my, [0, 1], [max, -max]),
    spring,
  )
  const rotateY = useSpring(
    useTransform(mx, [0, 1], [-max, max]),
    spring,
  )

  const glareX = useTransform(mx, [0, 1], [0, 100])
  const glareY = useTransform(my, [0, 1], [0, 100])
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.45), transparent 55%)`

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

  const v = variantClass[variant]

  return (
    <motion.div
      className={`group perspective-[1100px] ${className}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full will-change-transform rounded-3xl ${v.border} ${v.hover} transition-shadow duration-300`}
      >
        <motion.div
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r ${v.pulse} opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-80`}
        />
        <motion.div
          style={{ backgroundImage: glare }}
          className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-50 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
        />
        <div
          className="mesh-card-inner relative z-10 h-full overflow-hidden rounded-3xl bg-white/30 backdrop-blur-xl"
          style={{ transform: 'translateZ(0)' }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
