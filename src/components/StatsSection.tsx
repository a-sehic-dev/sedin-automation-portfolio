import { TiltNeonCard } from './TiltNeonCard'

type Stat = {
  num: string
  label: string
  description: string
}

const stats: readonly Stat[] = [
  {
    num: '3+',
    label: 'Years Experience',
    description:
      'Expert in Python automation and ETL pipelines for US/EU markets.',
  },
  {
    num: '100+',
    label: 'Total Systems',
    description:
      'Including AI-backed assistants like BidPilot and high-volume scrapers.',
  },
  {
    num: '100%',
    label: 'Satisfaction',
    description:
      'Specialized in eliminating manual admin work through one-command systems.',
  },
  {
    num: '24/7',
    label: 'Monitoring',
    description:
      'Implementing robust systems with automatic error-handling and logging.',
  },
]

export function StatsSection() {
  return (
    <section
      className="relative z-10 scroll-mt-24 pb-24 pt-10 sm:pt-12"
      aria-label="Key metrics"
    >
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((s) => (
            <TiltNeonCard key={s.label} variant="stats" tilt="subtle">
              <div className="p-6 sm:p-8">
                <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  {s.num}
                </p>
                <p className="mt-3 text-sm font-bold leading-snug text-slate-800 sm:text-base">
                  {s.label}
                </p>
                <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600 sm:text-sm">
                  {s.description}
                </p>
              </div>
            </TiltNeonCard>
          ))}
        </div>
      </div>
    </section>
  )
}
