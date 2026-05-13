import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { ArrowRight, Briefcase, FolderKanban, Sparkles, Zap } from 'lucide-react'
import { WHATSAPP_URL } from '../constants/links'
import { HeroLiveTerminal } from './HeroLiveTerminal'

function scrollToContact(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  document.getElementById('contact')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export function Hero() {
  return (
    <header
      id="home"
      className="relative z-10 scroll-mt-28 pb-16 pt-28 sm:scroll-mt-32 sm:pb-20 sm:pt-32 lg:pb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="grid min-h-0 grid-cols-1 gap-8 lg:grid-cols-[1fr_min(19rem,30vw)] lg:items-start lg:gap-x-10 lg:gap-y-6"
      >
        <div className="flex flex-wrap items-center gap-3 lg:col-start-1 lg:row-start-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-white/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-[0_0_20px_rgba(0,242,255,0.12)] backdrop-blur-xl">
            <Zap className="size-3.5 text-cyan-600" aria-hidden />
            CORE-FLOW
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/60 px-3 py-1 text-xs font-medium text-blue-800 shadow-sm backdrop-blur-md">
            <Sparkles className="size-3.5" aria-hidden />
            Next-gen automation studio
          </span>
        </div>

        <div className="space-y-6 lg:col-start-1 lg:row-start-2">
          <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-[0.025em] sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-[#0044ff] via-blue-600 to-[#00f2ff] bg-clip-text text-transparent">
              Python Automation Specialist
            </span>{' '}
            <span className="text-[#0f172a]">| AI &amp; ETL Pipelines</span>
          </h1>

          <p className="max-w-3xl text-pretty text-base font-semibold tracking-[0.03em] text-[#0f172a] sm:text-lg">
            Top-notch work &amp; Great communication
          </p>

          <p className="max-w-3xl text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl">
            I eliminate manual admin work by building one-command automation
            systems that turn messy data into structured results.
          </p>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-[#0f172a] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.2)] ring-1 ring-white/80 transition hover:bg-cyan-50"
            >
              Get a Free Consultation
              <ArrowRight className="size-4" aria-hidden />
            </motion.a>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="text-sm font-medium text-blue-700 underline-offset-4 hover:text-blue-900 hover:underline"
            >
              Or jump to contact details
            </a>
          </div>
        </div>

        <div className="flex min-h-0 w-full max-lg:max-h-[min(38rem,88vh)] flex-col lg:sticky lg:top-28 lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:max-h-[min(40rem,calc(100dvh-5.5rem))] lg:self-start lg:pt-1">
          <HeroLiveTerminal />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch lg:col-start-1 lg:row-start-3">
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="flex min-h-[3.25rem] items-center gap-3 rounded-2xl border border-cyan-400/30 bg-white/45 px-5 py-3 shadow-[0_0_24px_rgba(0,242,255,0.1)] backdrop-blur-2xl"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700 ring-1 ring-blue-500/15">
              <Briefcase className="size-5" aria-hidden />
            </span>
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Experience
              </p>
              <p className="text-sm font-semibold text-[#0f172a] sm:text-base">
                3+ Years Professional Experience
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="flex min-h-[3.25rem] items-center gap-3 rounded-2xl border border-violet-400/30 bg-white/45 px-5 py-3 shadow-[0_0_22px_rgba(168,85,247,0.12)] backdrop-blur-2xl"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-700 ring-1 ring-indigo-500/15">
              <FolderKanban className="size-5" aria-hidden />
            </span>
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Delivered
              </p>
              <p className="text-sm font-semibold text-[#0f172a] sm:text-base">
                100+ total · 10 showcased
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  )
}
