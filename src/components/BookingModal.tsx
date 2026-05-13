import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'
import emailjs from '@emailjs/browser'

type Props = {
  open: boolean
  onClose: () => void
}

type Phase = 'steps' | 'processing' | 'success' | 'error'

const stepPanel = {
  enter: (dir: number) => ({
    rotateY: dir >= 0 ? 64 : -64,
    opacity: 0,
    x: dir >= 0 ? 48 : -48,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    x: 0,
  },
  exit: (dir: number) => ({
    rotateY: dir >= 0 ? -64 : 64,
    opacity: 0,
    x: dir >= 0 ? -48 : 48,
  }),
}

function todayISODate() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function parseISODate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  return new Date(y, mo - 1, d)
}

function formatAuditDate(dateIso: string, timeHHMM: string) {
  if (!dateIso) return 'your selected slot'
  const dt = parseISODate(dateIso)
  if (!dt || Number.isNaN(dt.getTime())) return dateIso
  const dateStr = dt.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  if (!timeHHMM) return dateStr
  const [hh, mm] = timeHHMM.split(':').map((x) => Number(x))
  if (Number.isNaN(hh) || Number.isNaN(mm)) return dateStr
  const t = new Date(2000, 0, 1, hh, mm)
  const timeStr = t.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `${dateStr} · ${timeStr}`
}

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** Fixed slots — Continue stays disabled until date + one slot are chosen. */
const TIME_SLOTS = ['09:00', '11:00', '13:00', '15:00', '17:00'] as const

const neonPickGlow =
  'shadow-[0_0_36px_rgba(0,242,255,0.75),0_0_64px_rgba(0,68,255,0.25),inset_0_0_28px_rgba(0,242,255,0.18)] ring-2 ring-[#00f2ff] ring-offset-2 ring-offset-white'

function calendarCells(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startPad = first.getDay()
  const daysInMonth = last.getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  return cells
}

function PythonProcessingAnimation() {
  const lines = [
    '>>> from core_flow.pipeline import AuditSession',
    '>>> session = AuditSession(trace_id="CF-AUD-Ω")',
    '>>> payload = session.ingest(bottleneck_stream)',
    '... normalizing rows ████████████████████ 100%',
    '>>> audit.export(destination="strategy_queue")',
    '✓ Pipeline OK · sealed for human confirmation',
  ]

  return (
    <motion.div
      className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-[#00f2ff]/35 bg-[#0a0f18]/95 px-4 py-4 text-left shadow-[0_0_40px_rgba(0,242,255,0.12),inset_0_1px_0_rgba(0,242,255,0.12)]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-3 flex items-center gap-2 border-b border-cyan-500/20 pb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
        <Terminal className="size-3.5 shrink-0 text-cyan-400" aria-hidden />
        python · audit_kernel.py
      </div>
      <motion.div
        className="space-y-2 font-mono text-[11px] leading-relaxed sm:text-xs"
        initial="hidden"
        animate="show"
        variants={{
          show: {
            transition: { staggerChildren: 0.14, delayChildren: 0.08 },
          },
        }}
      >
        {lines.map((line, i) => (
          <motion.p
            key={i}
            variants={{
              hidden: { opacity: 0, x: -6 },
              show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className={
              line.startsWith('✓')
                ? 'text-emerald-400'
                : line.startsWith('...')
                  ? 'text-cyan-200/90'
                  : 'text-slate-300'
            }
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0f18] to-transparent"
        aria-hidden
      />
    </motion.div>
  )
}

export function BookingModal({ open, onClose }: Props) {
  const titleId = useId()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [phase, setPhase] = useState<Phase>('steps')
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [bottleneck, setBottleneck] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [name, setName] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')

  const [viewMonth, setViewMonth] = useState(() => {
    const t = new Date()
    return new Date(t.getFullYear(), t.getMonth(), 1)
  })

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

  useEffect(() => {
    if (!open) {
      setStep(1)
      setPhase('steps')
      setSubmitError(null)
      setBottleneck('')
      setPreferredDate('')
      setPreferredTime('')
      setName('')
      setBusinessEmail('')
      setContactMessage('')
      const t = new Date()
      setViewMonth(new Date(t.getFullYear(), t.getMonth(), 1))
    }
  }, [open])

  const goNext = () => {
    setDirection(1)
    setStep((s) => Math.min(3, s + 1))
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(1, s - 1))
  }

  const canNextFrom1 = bottleneck.trim().length >= 8
  const canNextFrom2 = Boolean(preferredDate && preferredTime)
  const canSubmit =
    name.trim().length > 0 && businessEmail.trim().length > 0

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const cells = useMemo(() => calendarCells(year, month), [year, month])
  const today = todayISODate()
  const monthLabel = viewMonth.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  const shiftMonth = (delta: number) => {
    setViewMonth((d) => new Date(d.getFullYear(), d.getMonth() + delta, 1))
  }

  const dayISO = (day: number) => {
    const y = viewMonth.getFullYear()
    const m = viewMonth.getMonth() + 1
    return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const isSelectableDay = (day: number) => {
    const iso = dayISO(day)
    return iso >= today
  }

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSubmitError(null)

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()
    const apiOrigin = import.meta.env.VITE_EMAILJS_API_ORIGIN?.trim()

    if (!serviceId || !templateId || !publicKey) {
      console.error(
        '[CORE-FLOW booking] EmailJS env incomplete — add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY to .env in core-flow-portfolio and restart `npm run dev`.',
        {
          VITE_EMAILJS_SERVICE_ID: serviceId ? 'ok' : 'missing',
          VITE_EMAILJS_TEMPLATE_ID: templateId ? 'ok' : 'missing',
          VITE_EMAILJS_PUBLIC_KEY: publicKey ? 'ok' : 'missing',
        },
      )
      setSubmitError(
        'Booking email is not configured. Add the three VITE_EMAILJS_* values to .env and restart the dev server.',
      )
      setPhase('error')
      return
    }

    setPhase('processing')
    const minDelay = new Promise((r) => setTimeout(r, 2600))

    const booking_date = formatAuditDate(preferredDate, preferredTime)
    const message = [
      'CORE-FLOW — Strategy call request',
      '',
      `Name: ${name.trim()}`,
      `Reply-to: ${businessEmail.trim()}`,
      '',
      'Bottleneck:',
      bottleneck.trim(),
      '',
      'Contact notes:',
      contactMessage.trim(),
      '',
      `Preferred slot: ${booking_date}`,
    ].join('\n')

    // Object keys must match {{…}} variable names in your EmailJS template (dashboard).
    const templateParams = {
      from_name: name.trim(),
      reply_to: businessEmail.trim(),
      message,
      booking_date,
    }

    try {
      // Official API: https://api.emailjs.com (see REST docs). Do not use api.eu.emailjs.com — it does not resolve.
      emailjs.init(
        apiOrigin ? { publicKey, origin: apiOrigin } : { publicKey },
      )

      const [, res] = await Promise.all([
        minDelay,
        emailjs.send(serviceId, templateId, templateParams, { publicKey }),
      ])
      if (res.status < 200 || res.status >= 300) {
        throw new Error('EmailJS request was not accepted')
      }
      setPhase('success')
    } catch (e) {
      const isEmailJsStatus =
        typeof e === 'object' &&
        e !== null &&
        'status' in e &&
        typeof (e as { status: unknown }).status === 'number'

      let msg = 'Something went wrong. Try again in a moment.'
      if (isEmailJsStatus) {
        const st = e as { status: number; text?: string }
        if (st.status === 404) {
          console.error(
            '[CORE-FLOW booking] EmailJS 404 — check service ID, template ID, and public key match the EmailJS dashboard.',
          )
          msg =
            'EmailJS returned 404. Confirm service ID, template ID, and public key in the EmailJS dashboard match this app.'
        } else if (st.text) {
          msg = st.text
        }
      } else if (e instanceof Error) {
        msg =
          e.message === 'Failed to fetch'
            ? 'Network error (could not reach EmailJS). Check your connection; if VITE_EMAILJS_API_ORIGIN is set in .env, it must be a valid host such as https://api.emailjs.com.'
            : e.message
      }

      setSubmitError(msg)
      setPhase('error')
    }
  }

  const handleClose = () => {
    onClose()
  }

  const progressPct = (step / 3) * 100

  const stepHeadline =
    step === 1
      ? 'Describe your manual bottleneck.'
      : step === 2
        ? 'Select Date & Time.'
        : 'Contact Details.'

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="booking-root"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ perspective: 1400 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close booking"
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className={`relative z-10 w-full [transform-style:preserve-3d] ${
              phase === 'steps' && step === 2
                ? 'max-w-[min(96vw,56rem)]'
                : 'max-w-lg'
            }`}
          >
            <div className="pointer-events-none absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-[#00f2ff]/50 via-[#0044ff]/25 to-[#bc13fe]/40 opacity-80 blur-[1px]" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#00f2ff]/90 bg-white/80 shadow-[0_0_0_1px_rgba(0,242,255,0.35),0_0_48px_rgba(0,242,255,0.2),0_32px_80px_-28px_rgba(0,68,255,0.35)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.5)_0%,transparent_45%,rgba(0,242,255,0.06)_100%)]" />

              <div className="relative flex items-center justify-between border-b border-cyan-500/15 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0044ff] to-cyan-500 text-white shadow-lg shadow-cyan-500/25">
                    <Sparkles className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Mini-Audit · Pre-call
                    </p>
                    <h2
                      id={titleId}
                      className="text-sm font-semibold tracking-[0.02em] text-[#0f172a] sm:text-base"
                    >
                      Strategy intake
                    </h2>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-xl border border-slate-200/80 bg-white/70 p-2 text-slate-600 transition hover:bg-white hover:text-slate-900"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>

              {phase === 'steps' ? (
                <>
                  <div className="relative px-5 pt-4 sm:px-6">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/90 ring-1 ring-slate-300/40">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#0044ff] via-[#0099ff] to-[#00f2ff] shadow-[0_0_16px_rgba(0,242,255,0.55)]"
                        initial={false}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ type: 'spring', stiffness: 280, damping: 32 }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      <span className={step >= 1 ? 'text-cyan-700' : ''}>01 Audit</span>
                      <span className={step >= 2 ? 'text-cyan-700' : ''}>02 Slot</span>
                      <span className={step >= 3 ? 'text-cyan-700' : ''}>03 You</span>
                    </div>
                  </div>

                  <div className="relative flex justify-center gap-2 px-5 pt-3 sm:px-6">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="flex flex-1 items-center gap-2">
                        <div
                          className={`flex h-8 flex-1 items-center justify-center rounded-full text-[11px] font-bold transition ${
                            step === n
                              ? 'bg-gradient-to-r from-[#0044ff] to-cyan-500 text-white shadow-md shadow-cyan-500/30'
                              : step > n
                                ? 'bg-emerald-500/15 text-emerald-800 ring-1 ring-emerald-400/30'
                                : 'bg-slate-100/90 text-slate-400 ring-1 ring-slate-200/80'
                          }`}
                        >
                          {step > n ? <Check className="size-3.5" /> : n}
                        </div>
                        {n < 3 ? (
                          <div
                            className={`h-px flex-1 rounded-full ${step > n ? 'bg-emerald-400/50' : 'bg-slate-200/90'}`}
                            aria-hidden
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <p className="relative px-5 pt-2 text-center text-xs font-semibold text-[#0f172a] sm:px-6">
                    {stepHeadline}
                  </p>

                  <div
                    className="relative px-5 py-6 sm:px-6 sm:py-7"
                    style={{ perspective: 1200 }}
                  >
                    <div
                      className={`relative [transform-style:preserve-3d] ${
                        step === 2
                          ? 'min-h-[min(72vh,560px)] sm:min-h-[520px]'
                          : step === 3
                            ? 'min-h-[420px] sm:min-h-[460px]'
                            : 'min-h-[300px] sm:min-h-[320px]'
                      }`}
                    >
                      <AnimatePresence mode="wait" custom={direction}>
                        {step === 1 ? (
                          <motion.div
                            key="s1"
                            custom={direction}
                            variants={stepPanel}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 space-y-3 [backface-visibility:hidden]"
                          >
                            <label className="block text-sm font-semibold text-[#0f172a]">
                              Where is the manual work slowing you down?
                              <textarea
                                value={bottleneck}
                                onChange={(e) => setBottleneck(e.target.value)}
                                rows={6}
                                className="mt-2 w-full resize-y rounded-2xl border border-slate-200/90 bg-white/90 px-3 py-3 text-sm text-slate-800 shadow-inner outline-none transition focus:border-[#00f2ff]/70 focus:shadow-[0_0_0_3px_rgba(0,242,255,0.2)]"
                                placeholder="e.g. Messy Excel handoffs, slow APIs, manual data entry between tools…"
                              />
                            </label>
                          </motion.div>
                        ) : null}

                        {step === 2 ? (
                          <motion.div
                            key="s2"
                            custom={direction}
                            variants={stepPanel}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 [backface-visibility:hidden]"
                          >
                            <p className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
                              <Calendar className="size-4 shrink-0 text-cyan-600" aria-hidden />
                              Pick a date and a time slot — both need a neon lock before you continue.
                            </p>

                            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start lg:gap-8">
                              <div className="rounded-2xl border border-[#00f2ff]/50 bg-gradient-to-br from-[#0f172a]/[0.04] via-white/85 to-[#0044ff]/[0.08] p-4 shadow-[0_0_40px_rgba(0,242,255,0.14),inset_0_1px_0_rgba(0,242,255,0.22)] sm:p-5">
                                <div className="flex items-center justify-between gap-2 border-b border-cyan-500/25 pb-3">
                                  <button
                                    type="button"
                                    onClick={() => shiftMonth(-1)}
                                    className="rounded-xl border border-cyan-400/45 bg-white/85 p-2.5 text-cyan-800 shadow-[0_0_14px_rgba(0,242,255,0.22)] transition hover:border-[#00f2ff]/90 hover:shadow-[0_0_22px_rgba(0,242,255,0.4)]"
                                    aria-label="Previous month"
                                  >
                                    <ChevronLeft className="size-4" />
                                  </button>
                                  <p className="text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0f172a] sm:text-base">
                                    {monthLabel}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => shiftMonth(1)}
                                    className="rounded-xl border border-cyan-400/45 bg-white/85 p-2.5 text-cyan-800 shadow-[0_0_14px_rgba(0,242,255,0.22)] transition hover:border-[#00f2ff]/90 hover:shadow-[0_0_22px_rgba(0,242,255,0.4)]"
                                    aria-label="Next month"
                                  >
                                    <ChevronRight className="size-4" />
                                  </button>
                                </div>

                                <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:gap-2 sm:text-[11px]">
                                  {weekdayLabels.map((w) => (
                                    <span key={w} className="py-1">
                                      {w}
                                    </span>
                                  ))}
                                </div>
                                <div className="mt-2 grid grid-cols-7 gap-2 sm:gap-2.5">
                                  {cells.map((day, idx) =>
                                    day === null ? (
                                      <span key={`e-${idx}`} className="min-h-[2.75rem]" />
                                    ) : (
                                      <button
                                        key={day}
                                        type="button"
                                        disabled={!isSelectableDay(day)}
                                        onClick={() =>
                                          isSelectableDay(day) &&
                                          setPreferredDate(dayISO(day))
                                        }
                                        className={`relative flex min-h-[2.75rem] items-center justify-center rounded-xl text-sm font-bold transition sm:min-h-[3rem] sm:text-base ${
                                          preferredDate === dayISO(day)
                                            ? `z-[1] bg-gradient-to-br from-[#0044ff] to-[#00f2ff] text-white ${neonPickGlow}`
                                            : isSelectableDay(day)
                                              ? 'border border-slate-200/90 bg-white/95 text-[#0f172a] hover:border-[#00f2ff]/65 hover:shadow-[0_0_18px_rgba(0,242,255,0.3)]'
                                              : 'cursor-not-allowed border border-slate-100/80 bg-slate-100/50 text-slate-300'
                                        }`}
                                      >
                                        {day}
                                      </button>
                                    ),
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600">
                                  Time selection
                                </p>
                                <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-1">
                                  {TIME_SLOTS.map((slot) => (
                                    <button
                                      key={slot}
                                      type="button"
                                      onClick={() => setPreferredTime(slot)}
                                      className={`rounded-2xl border px-3 py-3.5 text-center text-sm font-bold tracking-wide transition sm:text-base ${
                                        preferredTime === slot
                                          ? `border-transparent bg-gradient-to-r from-[#0044ff] to-[#00f2ff] text-white ${neonPickGlow}`
                                          : 'border-[#00f2ff]/40 bg-white/90 text-[#0f172a] hover:border-[#00f2ff]/75 hover:shadow-[0_0_22px_rgba(0,242,255,0.28)]'
                                      }`}
                                    >
                                      {slot}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ) : null}

                        {step === 3 ? (
                          <motion.div
                            key="s3"
                            custom={direction}
                            variants={stepPanel}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 space-y-4 [backface-visibility:hidden]"
                          >
                            <p className="text-xs font-semibold text-slate-600">
                              Almost there — submit runs the live Python pipeline animation.
                            </p>
                            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                              Name
                              <input
                                type="text"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200/90 bg-white/95 px-3 py-3 text-sm text-[#0f172a] shadow-sm outline-none transition focus:border-[#00f2ff] focus:shadow-[0_0_0_3px_rgba(0,242,255,0.35),0_0_28px_rgba(0,242,255,0.18)]"
                                placeholder="Your name"
                              />
                            </label>
                            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                              Business email
                              <input
                                type="email"
                                autoComplete="email"
                                value={businessEmail}
                                onChange={(e) => setBusinessEmail(e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200/90 bg-white/95 px-3 py-3 text-sm text-[#0f172a] shadow-sm outline-none transition focus:border-[#00f2ff] focus:shadow-[0_0_0_3px_rgba(0,242,255,0.35),0_0_28px_rgba(0,242,255,0.18)]"
                                placeholder="you@company.com"
                              />
                            </label>
                            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                              Message
                              <textarea
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                rows={4}
                                className="mt-2 w-full resize-y rounded-2xl border border-slate-200/90 bg-white/95 px-3 py-3 text-sm text-[#0f172a] shadow-inner outline-none transition focus:border-[#00f2ff] focus:shadow-[0_0_0_3px_rgba(0,242,255,0.35),0_0_28px_rgba(0,242,255,0.18)]"
                                placeholder="Timezone, company, goals, or anything else before the call…"
                              />
                            </label>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="relative flex flex-col-reverse gap-2 border-t border-cyan-500/10 px-5 py-4 sm:flex-row sm:justify-between sm:px-6">
                    <button
                      type="button"
                      onClick={step === 1 ? handleClose : goBack}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-white/80 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white"
                    >
                      {step === 1 ? (
                        'Cancel'
                      ) : (
                        <>
                          <ArrowLeft className="size-4" aria-hidden />
                          Back
                        </>
                      )}
                    </button>
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={
                          (step === 1 && !canNextFrom1) ||
                          (step === 2 && !canNextFrom2)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0044ff] to-[#00f2ff] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition enabled:hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Continue
                        <ArrowRight className="size-4" aria-hidden />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0044ff] to-[#00f2ff] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition enabled:hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Run audit &amp; submit
                        <ArrowRight className="size-4" aria-hidden />
                      </button>
                    )}
                  </div>
                </>
              ) : null}

              {phase === 'processing' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative space-y-6 px-5 py-12 text-center sm:px-6"
                >
                  <PythonProcessingAnimation />
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">
                      Python pipeline · live
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Encoding audit payload · routing to CORE-FLOW inbox
                    </p>
                  </div>
                </motion.div>
              ) : null}

              {phase === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative space-y-5 px-6 py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.85 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 ring-2 ring-emerald-400/40"
                  >
                    <Check className="size-8" strokeWidth={2.5} aria-hidden />
                  </motion.div>
                  <p className="text-pretty text-base font-semibold leading-relaxed tracking-[0.02em] text-[#0f172a]">
                    System Audit Complete. Your Strategy Call is requested for{' '}
                    <span className="whitespace-normal text-cyan-700">
                      {formatAuditDate(preferredDate, preferredTime)}
                    </span>
                    . I will manually confirm via email within 2 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Close
                  </button>
                </motion.div>
              ) : null}

              {phase === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative space-y-4 px-6 py-10 text-center"
                >
                  <p className="text-sm font-semibold text-red-700">
                    {submitError ?? 'Request failed'}
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setPhase('steps')
                        setStep(3)
                      }}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800"
                    >
                      Edit &amp; retry
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
