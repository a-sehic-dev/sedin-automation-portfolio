import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

const LINES = [
  '> Initializing ETL Pipeline... OK',
  '> Connection established to PostgreSQL... SUCCESS',
  '> Processing 3M+ records... DONE',
  '> Data deduplication & schema normalization... 100%',
  '> Manual work reduced by 90%... ACTIVE',
  '> Integrating OpenAI/Llama-3 models... DONE',
  '> Generating one-command automation scripts... READY',
  '> Optimizing Google Workspace sync... OK',
  '> System status: READY TO SCALE 🚀',
  '> Scaling infrastructure for concurrent requests... OK',
  '> Authenticating secure API endpoints (FastAPI)... SUCCESS',
  '> Bypassing anti-bot protections (Playwright)... DONE',
  '> Syncing results to CRM & Client Dashboards... 100%',
  '> Data Integrity Check... PASSED',
  '> System Latency: 42ms... OPTIMAL',
  '> All automation nodes heartbeat... ACTIVE',
  '> CORE-FLOW Engine: All systems operational.',
  "> Type 'contact' to begin your transformation...",
] as const

const TYPE_MS = 46
const LINE_PAUSE_MS = 620
const CYCLE_END_MS = 7200

/** Success-style tokens highlighted with neon blue gradient */
const KEYWORD_RE =
  /\b(OK|DONE|SUCCESS|READY|PASSED|OPTIMAL|ACTIVE)\b|100%/g

const keywordClass =
  'bg-gradient-to-r from-[#0044ff] to-[#0099ff] bg-clip-text font-semibold text-transparent'

function renderLineWithKeywords(text: string) {
  const parts: { key: string; isKw: boolean; text: string }[] = []
  let last = 0
  let m: RegExpExecArray | null
  const re = new RegExp(KEYWORD_RE.source, KEYWORD_RE.flags)
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push({
        key: `t-${last}`,
        isKw: false,
        text: text.slice(last, m.index),
      })
    }
    parts.push({ key: `k-${m.index}`, isKw: true, text: m[0] })
    last = m.index + m[0].length
  }
  if (last < text.length) {
    parts.push({ key: `t-${last}`, isKw: false, text: text.slice(last) })
  }
  if (parts.length === 0) {
    return text
  }
  return parts.map((p) =>
    p.isKw ? (
      <span key={p.key} className={keywordClass}>
        {p.text}
      </span>
    ) : (
      <Fragment key={p.key}>{p.text}</Fragment>
    ),
  )
}

export function HeroLiveTerminal() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [doneLines, setDoneLines] = useState<string[]>([])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    if (lineIdx >= LINES.length) {
      const t = window.setTimeout(() => {
        setDoneLines([])
        setLineIdx(0)
        setCharIdx(0)
      }, CYCLE_END_MS)
      return () => window.clearTimeout(t)
    }

    const full = LINES[lineIdx]
    if (charIdx < full.length) {
      const t = window.setTimeout(() => setCharIdx((c) => c + 1), TYPE_MS)
      return () => window.clearTimeout(t)
    }

    const t = window.setTimeout(() => {
      setDoneLines((prev) => [...prev, full])
      setLineIdx((i) => i + 1)
      setCharIdx(0)
    }, LINE_PAUSE_MS)
    return () => window.clearTimeout(t)
  }, [lineIdx, charIdx])

  /** Keep the latest output pinned to the bottom (scrollbar visually hidden). */
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [doneLines, lineIdx, charIdx])

  const partial =
    lineIdx < LINES.length ? LINES[lineIdx].slice(0, charIdx) : ''
  const showCursor = lineIdx < LINES.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full min-h-0 max-h-full w-full max-w-full flex-col overflow-hidden rounded-2xl border border-cyan-500/30"
      style={{
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow:
          '0 0 20px rgba(0, 123, 255, 0.2), 0 0 0 1px rgba(0, 242, 255, 0.1), inset 0 1px 0 rgba(148, 163, 184, 0.08)',
      }}
      aria-label="Live status terminal"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(480px_140px_at_50%_0%,rgba(59,130,246,0.12),transparent)]" />
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-600/50 bg-slate-950/40 px-3 py-2">
        <Terminal className="size-3.5 shrink-0 text-cyan-400/90" aria-hidden />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/85">
          core-flow · live
        </span>
        <span className="ml-auto flex gap-1.5 pr-1">
          <span className="size-2 rounded-full bg-red-500/80" />
          <span className="size-2 rounded-full bg-amber-400/80" />
          <span className="size-2 rounded-full bg-blue-500/80" />
        </span>
      </div>

      {/*
        Outer clip: overflow hidden on the card.
        Inner: overflow-y auto for scrollHeight/scrollTop (required for JS scroll-to-bottom).
        Scrollbars hidden via CSS; user sees a fixed viewport with content “following” the typewriter.
      */}
      <div className="relative min-h-0 flex-1 overflow-y-hidden">
        <div
          ref={scrollRef}
          className="h-full min-h-[500px] max-h-full overflow-x-hidden overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] lg:max-h-[min(34rem,calc(100dvh-10rem))] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
        >
          <pre className="p-3 pb-4 font-mono text-[11px] leading-relaxed text-[#e2e8f0] sm:text-xs sm:leading-relaxed">
            {doneLines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap break-words">
                {renderLineWithKeywords(line)}
              </div>
            ))}
            {showCursor ? (
              <div className="whitespace-pre-wrap break-words">
                {renderLineWithKeywords(partial)}
                <span
                  className="ml-0.5 inline-block h-3 w-2 translate-y-0.5 animate-pulse rounded-sm bg-gradient-to-b from-[#0044ff] to-[#00f2ff] align-middle sm:h-3.5 sm:w-2"
                  aria-hidden
                />
              </div>
            ) : null}
          </pre>
        </div>
      </div>
    </motion.div>
  )
}
