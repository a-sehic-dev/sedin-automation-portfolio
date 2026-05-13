import { motion } from 'framer-motion'
import { ArrowUpRight, Layers, Zap } from 'lucide-react'
import type { Project } from '../data/projects'
import { projects } from '../data/projects'
import { TiltProjectCard } from './TiltProjectCard'

function ProjectCard({
  project: p,
  index,
  spanClass,
  featured,
}: {
  project: Project
  index: number
  spanClass: string
  featured?: boolean
}) {
  return (
    <TiltProjectCard
      floatDelay={index}
      className={`${spanClass} ${featured ? 'min-h-[220px] lg:min-h-[280px]' : 'min-h-[180px]'}`}
    >
      <article
        className={`mesh-card-inner flex h-full min-h-0 flex-col justify-between rounded-[22px] border border-[#0044ff] bg-white/28 backdrop-blur-2xl transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_#0044ff,0_0_32px_rgba(0,68,255,0.3),0_0_48px_rgba(0,242,255,0.15)] ${featured ? 'p-6 sm:p-8 lg:p-8' : 'p-6 sm:p-7'}`}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <Layers className="size-3.5 text-blue-600" aria-hidden />
              Project
            </div>
            <ArrowUpRight
              className="size-5 shrink-0 text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-500"
              aria-hidden
            />
          </div>
          <h3
            className={`text-balance font-semibold tracking-tight text-slate-900 ${featured ? 'text-xl sm:text-2xl lg:text-[1.65rem]' : 'text-lg sm:text-xl'}`}
          >
            {p.title}
          </h3>
          <p className="text-pretty text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
            {p.description}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-200/60 bg-white/40 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur-md sm:text-xs"
            >
              {t}
            </span>
          ))}
        </div>
      </article>
    </TiltProjectCard>
  )
}

export function ProjectBento() {
  const retail = projects[0]
  const binance = projects[1]
  const oligo = projects[2]
  const ecom = projects[3]
  const rest = projects.slice(4)

  return (
    <section
      id="projects"
      className="relative z-10 min-h-[800px] scroll-mt-24 py-24"
      aria-labelledby="work-heading"
    >
      <div className="w-full">
        <div className="mb-12 flex max-w-3xl flex-col gap-3 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700"
          >
            <Zap className="size-3.5" aria-hidden />
            Portfolio
          </motion.p>
          <motion.h2
            id="work-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold tracking-[0.03em] text-[#0f172a] sm:text-4xl"
          >
            Signature Builds
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-base leading-relaxed text-slate-600"
          >
            A thunderous selection of production-grade systems—from trading
            infrastructure to medical PDF mining and revenue intelligence.
          </motion.p>
        </div>

        <div className="grid auto-rows-min grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            project={retail}
            index={0}
            spanClass="col-span-1 md:col-span-2 lg:col-span-2"
            featured
          />
          <ProjectCard project={oligo} index={1} spanClass="col-span-1" />
          <ProjectCard
            project={binance}
            index={2}
            spanClass="col-span-1 md:col-span-2 lg:col-span-2"
            featured
          />
          <ProjectCard project={ecom} index={3} spanClass="col-span-1" />
          {rest.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={4 + i}
              spanClass="col-span-1"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
