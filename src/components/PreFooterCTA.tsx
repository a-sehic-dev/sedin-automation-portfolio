import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { WHATSAPP_URL } from '../constants/links'

function scrollToContact(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  document.getElementById('contact')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export function PreFooterCTA() {
  return (
    <section
      id="cta"
      className="relative z-10 py-24"
      aria-labelledby="prefooter-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2.25rem] border border-cyan-400/40 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-10 text-center shadow-[0_32px_100px_-36px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,242,255,0.2),0_18px_0_-8px_rgba(15,23,42,0.35)_inset] sm:rounded-[2.5rem] sm:p-14 lg:p-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-10%,rgba(96,165,250,0.4),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        <div className="relative mx-auto max-w-3xl space-y-6">
          <h2
            id="prefooter-heading"
            className="text-balance text-3xl font-semibold tracking-[0.03em] text-white sm:text-4xl lg:text-5xl"
          >
            Let&apos;s Build the Future of Your Business
          </h2>
          <p className="text-pretty text-base leading-relaxed text-blue-100/90 sm:text-lg">
            Bring the messy reality — spreadsheets, PDFs, marketplaces, APIs —
            and leave with automation that your team can run, extend, and trust.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-semibold text-[#0f172a] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] transition hover:bg-cyan-50"
            >
              Get a Free Consultation
              <ArrowRight className="size-4" aria-hidden />
            </motion.a>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="text-sm font-medium text-white/90 underline-offset-4 hover:text-white hover:underline"
            >
              Or jump to contact details
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
