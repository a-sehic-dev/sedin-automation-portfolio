import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { ExternalLink, X } from 'lucide-react'
import { LINKEDIN_URL } from '../constants/links'

type Props = {
  open: boolean
  onClose: () => void
}

export function AboutMeModal({ open, onClose }: Props) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="about-root"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close about"
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-10 flex max-h-[min(92dvh,52rem)] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-[#00f2ff]/55 bg-[#070b12]/92 shadow-[0_0_0_1px_rgba(0,242,255,0.12),0_0_60px_rgba(0,242,255,0.18),0_32px_80px_-24px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#0044ff]/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_-20%,rgba(0,242,255,0.08),transparent)]" />

            <div className="relative flex items-start justify-between gap-3 border-b border-cyan-500/20 px-5 py-4 sm:px-6">
              <div className="min-w-0 space-y-1 pr-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                  About · CV
                </p>
                <h2
                  id={titleId}
                  className="text-balance text-lg font-semibold tracking-[0.02em] text-white sm:text-xl"
                >
                  ✨ Sedin Sehic | Python Automation Specialist 🐍
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-xl border border-cyan-400/30 bg-white/5 p-2 text-cyan-100 transition hover:border-cyan-300/60 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative max-h-[min(78dvh,44rem)] overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
              <div className="space-y-6 text-sm leading-relaxed text-slate-200/95 sm:text-[0.9375rem]">
                <p className="text-cyan-100/90">
                  <span className="font-semibold text-cyan-200">Tagline:</span>{' '}
                  &apos;I eliminate manual admin work by building one-command
                  systems.&apos; ⚡
                </p>
                <p>
                  <span className="font-semibold text-cyan-200">Location:</span>{' '}
                  Zenica, Bosnia and Herzegovina 🇧🇦
                </p>
                <p>
                  <span className="font-semibold text-cyan-200">Contact:</span>{' '}
                  📧 sedinsehic81@gmail.com | 📱 WhatsApp: +386 70 410 565
                </p>

                <section className="rounded-2xl border border-cyan-500/20 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(0,242,255,0.08)]">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/90">
                    📝 Professional Summary
                  </h3>
                  <p className="text-slate-300/95">
                    &apos;Expert Python Automation Developer with 3+ years of
                    experience. Specialized in building end-to-end ETL pipelines
                    and AI-driven workflows. I focus on eliminating manual
                    administration by transforming complex data into structured,
                    &quot;one-command&quot; systems.&apos;
                  </p>
                </section>

                <section className="rounded-2xl border border-cyan-500/20 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(0,242,255,0.08)]">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/90">
                    🛠️ Core Technical Skills
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-slate-300/95 marker:text-cyan-400/80">
                    <li>
                      <span className="font-semibold text-slate-100">
                        Languages:
                      </span>{' '}
                      Python (Expert) 🐍
                    </li>
                    <li>
                      <span className="font-semibold text-slate-100">
                        Web &amp; APIs:
                      </span>{' '}
                      FastAPI, REST APIs, API integration 🌐
                    </li>
                    <li>
                      <span className="font-semibold text-slate-100">
                        Automation &amp; ETL:
                      </span>{' '}
                      ETL Pipeline Development, AI Workflow Automation, Web
                      scraping (Playwright, Selenium), ADB automation (Android
                      USB) 🤖
                    </li>
                    <li>
                      <span className="font-semibold text-slate-100">
                        Data &amp; Productivity:
                      </span>{' '}
                      Google Sheets API, Excel/CSV automation, SQL/SQLite, data
                      deduplication 📊
                    </li>
                    <li>
                      <span className="font-semibold text-slate-100">
                        Presentation:
                      </span>{' '}
                      Streamlit dashboards &amp; analytics 📈
                    </li>
                  </ul>
                </section>

                <section className="rounded-2xl border border-cyan-500/20 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(0,242,255,0.08)]">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/90">
                    🏆 Selected Engineering Projects
                  </h3>
                  <ul className="space-y-2 text-slate-300/95">
                    <li>📦 E-commerce ETL: Processed 3M+ records with safe batching.</li>
                    <li>
                      📱 Instagram Data Bot: Multi-device system using ADB and UI
                      automation.
                    </li>
                    <li>
                      🤖 BidPilot AI: Freelancer automation toolkit with AI backend.
                    </li>
                    <li>
                      📈 Binance Trading Bot: Automated SPOT trading system with
                      Telegram alerts.
                    </li>
                    <li>
                      🔍 SEO Automation Tool PRO: System for repeatable publishing
                      and data pulls.
                    </li>
                  </ul>
                </section>

                <section className="rounded-2xl border border-cyan-500/20 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(0,242,255,0.08)]">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/90">
                    💼 Professional Experience
                  </h3>
                  <p className="text-slate-300/95">
                    Freelance Developer (3+ years): Reduced manual processing by
                    90% for remote US/EU clients.
                  </p>
                </section>

                <section className="rounded-2xl border border-cyan-500/20 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(0,242,255,0.08)]">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/90">
                    🌍 Languages
                  </h3>
                  <p className="text-slate-300/95">
                    Bosnian (Native) | English (Fluent) | German (Working
                    Proficiency)
                  </p>
                </section>
              </div>
            </div>

            <div className="relative flex flex-col gap-2 border-t border-cyan-500/20 bg-[#050810]/80 px-5 py-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/70 hover:bg-cyan-500/20 hover:text-white"
              >
                LinkedIn
                <ExternalLink className="size-4 opacity-80" aria-hidden />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
