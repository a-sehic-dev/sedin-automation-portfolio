import { motion } from 'framer-motion'
import { Database, LineChart, ShoppingCart } from 'lucide-react'

const services = [
  {
    title: 'E-Commerce Automation',
    description:
      'Custom scrapers and inventory sync — marketplace listings, pricing, and stock pipelines that keep revenue moving.',
    icon: ShoppingCart,
  },
  {
    title: 'Financial Bots',
    description:
      'Trading infrastructure and API integrations — exchange connectivity, execution logic, and resilient monitoring.',
    icon: LineChart,
  },
  {
    title: 'Data Engineering',
    description:
      'Turning messy Excel and PDF data into clean databases — extraction, validation, and export-ready datasets.',
    icon: Database,
  },
] as const

const neonCard =
  'mesh-card-inner flex min-h-[280px] flex-col rounded-3xl border border-[#00f2ff] bg-white/25 p-8 shadow-[0_0_0_1px_rgba(0,242,255,0.35),0_0_28px_rgba(0,242,255,0.12)] backdrop-blur-2xl transition-shadow duration-300 hover:shadow-[0_0_0_1px_#00f2ff,0_0_40px_rgba(0,242,255,0.38),0_12px_48px_-24px_rgba(0,68,255,0.18)]'

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-10 scroll-mt-24 py-24"
      aria-labelledby="services-heading"
    >
      <div className="w-full">
        <div className="mb-12 max-w-2xl space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600"
          >
            CORE-FLOW
          </motion.p>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold tracking-[0.03em] text-[#0f172a] sm:text-4xl"
          >
            What we ship
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-base leading-relaxed text-slate-600"
          >
            Three pillars of automation work — each delivered as production code,
            not slide decks.
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((svc, i) => (
            <motion.article
              key={svc.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`group/svc ${neonCard}`}
            >
              <span className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-700 shadow-[0_0_20px_rgba(0,242,255,0.15)] transition group-hover/svc:scale-105 group-hover/svc:shadow-[0_0_28px_rgba(0,242,255,0.35)]">
                <svc.icon className="size-7" aria-hidden />
              </span>
              <h3 className="text-xl font-semibold tracking-[0.02em] text-slate-900">
                {svc.title}
              </h3>
              <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-slate-700 sm:text-base">
                {svc.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
