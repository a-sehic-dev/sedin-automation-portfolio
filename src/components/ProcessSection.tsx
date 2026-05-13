import { motion } from 'framer-motion'
import { Cog, LineChart, Search } from 'lucide-react'
import { TiltNeonCard } from './TiltNeonCard'

const steps = [
  {
    title: 'Audit',
    body: 'Map systems, data sources, and failure points — so automation targets ROI, not noise.',
    icon: Search,
  },
  {
    title: 'Automate',
    body: 'Ship Python pipelines, APIs, and bots with logging, retries, and observability baked in.',
    icon: Cog,
  },
  {
    title: 'Scale',
    body: 'Harden throughput, hand off runbooks, and iterate as volume and complexity grow.',
    icon: LineChart,
  },
] as const

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative z-10 scroll-mt-24 py-24"
      aria-labelledby="process-heading"
    >
      <div className="w-full">
        <div className="mb-12 max-w-3xl space-y-3 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700"
          >
            Method
          </motion.p>
          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold tracking-[0.03em] text-[#0f172a] sm:text-4xl"
          >
            The Core-Flow process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-base leading-relaxed text-slate-600"
          >
            A repeatable path from discovery to production — the same discipline
            applied across 100+ delivered automation systems.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <TiltNeonCard key={step.title} variant="process">
              <div className="flex flex-col p-8">
                <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 ring-1 ring-cyan-400/25">
                  <step.icon className="size-6" aria-hidden />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[0.95rem]">
                  {step.body}
                </p>
              </div>
            </TiltNeonCard>
          ))}
        </div>
      </div>
    </section>
  )
}
