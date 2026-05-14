import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Code2, Link2, Mail, MessageCircle, Phone, Zap } from 'lucide-react'
import {
  CONTACT_EMAIL,
  LINKEDIN_URL,
  MAILTO_URL,
  VIBER_URL,
  WHATSAPP_URL,
} from '../constants/links'

const profiles = [
  {
    label: 'GitHub',
    handle: 'a-sehic-dev',
    href: 'https://github.com/a-sehic-dev',
    icon: Code2,
  },
  {
    label: 'LinkedIn',
    handle: 'sedin-sehic-1134253a8',
    href: 'https://www.linkedin.com/in/sedin-sehic-1134253a8',
    icon: Link2,
  },
  {
    label: 'Upwork',
    handle: 'sedins',
    href: 'https://www.upwork.com/freelancers/sedins',
    icon: Briefcase,
  },
] as const

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 scroll-mt-24 border-t border-white/50 bg-white/40 py-24 backdrop-blur-2xl"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] border border-[#0044ff] bg-gradient-to-br from-white/85 via-blue-50/40 to-indigo-50/35 p-8 shadow-[0_0_0_1px_rgba(0,68,255,0.35),0_0_28px_rgba(0,68,255,0.12),0_32px_80px_-40px_rgba(30,58,138,0.45)] ring-1 ring-white/80 sm:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-800">
                Ready to scale?
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Ship automation that survives real traffic — not demos.
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Tell CORE-FLOW about your data sources, deadlines, and success
                metrics. You get a clear build plan, tight communication, and
                code you can extend.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:shadow-xl"
              >
                Start a conversation
                <ArrowRight className="size-4" aria-hidden />
              </motion.a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/80 bg-white/60 px-6 py-3 text-sm font-medium text-slate-800 backdrop-blur-md transition hover:bg-white/90"
              >
                WhatsApp instead
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-12 border-t border-white/40 pt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25">
                <Zap className="size-6" aria-hidden />
              </span>
              <div>
                <p className="text-lg font-bold tracking-tight text-slate-900">
                  CORE-FLOW
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Python automation specialist — BI, bots, and data pipelines for
                  teams that outgrew spreadsheets.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Contact
              </p>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    WhatsApp
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-slate-900 hover:text-blue-700"
                    >
                      <Phone className="size-4 text-emerald-600" aria-hidden />
                      +38670 410565
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Viber
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={VIBER_URL}
                      className="inline-flex cursor-pointer items-center gap-2 font-medium text-slate-900 underline-offset-2 hover:text-violet-700 hover:underline"
                    >
                      <MessageCircle className="size-4 text-violet-600" aria-hidden />
                      +38764 415 27 99
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={MAILTO_URL}
                      className="inline-flex cursor-pointer items-center gap-2 break-all font-medium text-slate-900 underline-offset-2 hover:text-blue-700 hover:underline"
                    >
                      <Mail className="size-4 shrink-0 text-blue-600" aria-hidden />
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Profiles
              </p>
              <ul className="mt-4 space-y-2">
                {profiles.map(({ label, handle, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/65 bg-white/50 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-md transition hover:border-blue-200/90 hover:bg-white/80"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon className="size-4 text-blue-600" aria-hidden />
                        {label}
                      </span>
                      <span className="truncate text-xs font-normal text-slate-500">
                        {handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/35 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} CORE-FLOW. Built with Vite &amp; React.</p>
          <p className="text-[11px] sm:text-xs">
            Light, glass, and motion — engineered for a full-page experience.
          </p>
        </div>
      </div>
    </footer>
  )
}
