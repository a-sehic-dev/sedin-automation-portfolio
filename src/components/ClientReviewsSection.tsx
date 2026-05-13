import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '../data/testimonials'

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4 fill-amber-400/90 text-amber-400"
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export function ClientReviewsSection() {
  return (
    <section
      id="reviews"
      className="relative z-10 scroll-mt-24 py-24"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-3xl space-y-3">
          <motion.h2
            id="reviews-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold tracking-[0.03em] text-[#0f172a] sm:text-4xl"
          >
            Trusted by Global Clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-lg font-medium tracking-[0.02em] text-slate-700"
          >
            Five-star delivery across time zones — Python automation, scraping, and revenue ops
            without the drama.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-base leading-relaxed text-slate-600"
          >
            Real outcomes across Python automation, high-volume scraping, and lead-generation
            systems — from solo founders to global teams.
          </motion.p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.24) }}
              className="group relative flex flex-col rounded-2xl border border-[#00f2ff]/45 bg-[#0b1220] p-6 shadow-[0_0_0_1px_rgba(0,242,255,0.15),0_0_40px_rgba(0,242,255,0.12),inset_0_1px_0_rgba(0,242,255,0.12)] transition-[box-shadow,transform] duration-300 hover:border-[#00f2ff]/70 hover:shadow-[0_0_48px_rgba(0,242,255,0.22)]"
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#00f2ff]/20 via-transparent to-[#0044ff]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex flex-1 flex-col gap-4">
                <StarRow />
                <p className="flex-1 text-pretty text-sm leading-relaxed text-white/95">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold text-white">{t.attribution}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-cyan-200/80">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
