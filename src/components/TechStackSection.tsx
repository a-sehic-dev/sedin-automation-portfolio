import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import {
  Cloud,
  CodeXml,
  Database,
  Globe,
  Server,
  SquareTerminal,
} from 'lucide-react'

const stack = [
  { name: 'Python', icon: CodeXml, brand: '#3776AB' },
  { name: 'FastAPI', icon: Server, brand: '#009688' },
  { name: 'Selenium', icon: SquareTerminal, brand: '#43B02A' },
  { name: 'Playwright', icon: Globe, brand: '#2EAD33' },
  { name: 'AWS', icon: Cloud, brand: '#FF9900' },
  { name: 'SQL', icon: Database, brand: '#4479A1' },
] as const

const maskStyle: CSSProperties = {
  maskImage:
    'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
}

export function TechStackSection() {
  const marqueeItems = [...stack, ...stack, ...stack, ...stack]

  return (
    <section
      id="tech"
      className="relative z-10 scroll-mt-24 py-24"
      aria-labelledby="tech-heading"
    >
      <div className="w-full">
        <div className="mb-10 max-w-2xl space-y-3 sm:mb-12">
          <motion.h2
            id="tech-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold tracking-[0.03em] text-[#0f172a] sm:text-4xl"
          >
            Tech stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-base leading-relaxed text-slate-600"
          >
            Core tools behind high-volume scrapers, APIs, and data pipelines — the
            same stack trusted across enterprise-grade builds.
          </motion.p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-[#bc13fe] bg-white/15 py-5 shadow-[0_0_0_1px_rgba(188,19,254,0.35),0_0_36px_rgba(188,19,254,0.12),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl sm:py-6">
          <div
            className="pointer-events-none absolute inset-x-6 top-1/2 z-10 h-px -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white/35 to-transparent sm:inset-x-10"
            aria-hidden
          />
          <div className="relative overflow-hidden py-2" style={maskStyle}>
            <motion.div
              className="flex w-max gap-10 px-6 sm:gap-16 sm:px-10"
              animate={{ x: ['0%', '-25%'] }}
              transition={{
                duration: 48,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {marqueeItems.map((item, i) => (
                <motion.div
                  key={`${item.name}-${i}`}
                  className="flex shrink-0 items-center gap-3 text-slate-800"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  <motion.span
                    className="flex size-12 items-center justify-center rounded-2xl border border-white/50 bg-white/45 text-blue-700 shadow-sm"
                    whileHover={{
                      boxShadow: `0 0 0 1px ${item.brand}55, 0 0 28px ${item.brand}66, 0 0 48px ${item.brand}33`,
                    }}
                    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                  >
                    <item.icon
                      className="size-5"
                      style={{ color: item.brand }}
                      aria-hidden
                    />
                  </motion.span>
                  <span className="text-lg font-semibold tracking-[0.02em] text-slate-900">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
