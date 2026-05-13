import { motion } from 'framer-motion'
import { Crown, Rocket, Sparkles, Terminal } from 'lucide-react'

const milestones = [
  {
    period: '2023',
    title: 'Developer — Python automation & BI',
    body: 'Hands-on pandas pipelines, retail analytics, and PDF / Excel extraction — building the foundation for high-trust client delivery.',
    icon: Terminal,
  },
  {
    period: '2024',
    title: 'Senior automation engineer',
    body: 'CCXT trading stacks, FastAPI services, and resilient scrapers at higher volume — production logging, retries, and clean handoffs became standard.',
    icon: Rocket,
  },
  {
    period: '2025',
    title: 'Technical lead',
    body: 'Owning architecture across concurrent builds: data contracts, deployment patterns, and mentoring on automation quality across squads.',
    icon: Crown,
  },
  {
    period: '2026',
    title: 'Director-level Automation Lead',
    body: 'From Developer to Director-level scope — steering automation strategy, stakeholder alignment, and mission-critical systems that scale with the business.',
    icon: Sparkles,
  },
] as const

const timelineCard =
  'mesh-card-inner min-w-0 flex-1 rounded-3xl border border-[#0044ff] bg-white/25 px-5 py-6 shadow-[0_0_0_1px_rgba(0,68,255,0.35),0_0_26px_rgba(0,68,255,0.12)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_0_1px_#0044ff,0_0_40px_rgba(0,68,255,0.35),0_18px_50px_-32px_rgba(15,23,42,0.25)] sm:px-7 sm:py-7'

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="relative z-10 scroll-mt-24 py-24"
      aria-labelledby="experience-heading"
    >
      <div className="w-full">
        <div className="mb-14 max-w-2xl space-y-3">
          <motion.h2
            id="experience-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold tracking-[0.03em] text-[#0f172a] sm:text-4xl"
          >
            Experience timeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-base leading-relaxed text-slate-600"
          >
            2023–2026: from hands-on developer to Director-level Automation Lead —
            same stack, rising ownership, and compounding delivery volume.
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute bottom-3 left-[1.125rem] top-3 w-px bg-gradient-to-b from-[#0044ff]/80 via-cyan-400/40 to-slate-300/60 sm:left-5"
            aria-hidden
          />
          <ol className="relative space-y-12 sm:space-y-14">
            {milestones.map((m, i) => (
              <motion.li
                key={m.period}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08 }}
                className="group/tl relative flex gap-6 sm:gap-8"
              >
                <div className="relative z-10 flex shrink-0 justify-center">
                  <span className="flex size-10 items-center justify-center rounded-2xl border border-[#0044ff] bg-white/70 text-blue-700 shadow-[0_0_18px_rgba(0,68,255,0.25)] backdrop-blur-md transition group-hover/tl:shadow-[0_0_28px_rgba(0,68,255,0.45)] sm:size-11">
                    <m.icon className="size-5 sm:size-[1.35rem]" aria-hidden />
                  </span>
                </div>
                <div className={timelineCard}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0044ff]">
                    {m.period}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-[0.02em] text-slate-900 sm:text-xl">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                    {m.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
