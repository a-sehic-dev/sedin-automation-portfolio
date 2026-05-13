import type { ReactNode } from 'react'

const tones = {
  cyan: {
    tl: 'from-cyan-400/30 via-blue-500/10 to-transparent',
    br: 'from-sky-400/20 via-transparent to-transparent',
  },
  violet: {
    tl: 'from-violet-500/25 via-fuchsia-500/10 to-transparent',
    br: 'from-indigo-500/20 via-transparent to-transparent',
  },
  deep: {
    tl: 'from-blue-700/25 via-slate-900/10 to-transparent',
    br: 'from-cyan-500/15 via-transparent to-transparent',
  },
} as const

type Tone = keyof typeof tones

export function SectionAura({
  tone,
  children,
  className = '',
}: {
  tone: Tone
  children: ReactNode
  className?: string
}) {
  const c = tones[tone]
  return (
    <div className={`relative ${className}`}>
      <div
        className={`pointer-events-none absolute -left-24 -top-24 h-[min(28rem,70vw)] w-[min(28rem,70vw)] rounded-full bg-gradient-to-br ${c.tl} blur-3xl`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute -bottom-28 -right-20 h-[min(24rem,60vw)] w-[min(24rem,60vw)] rounded-full bg-gradient-to-tl ${c.br} blur-3xl`}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
