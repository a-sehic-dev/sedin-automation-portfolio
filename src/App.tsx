import { Analytics } from '@vercel/analytics/react'
import { useCallback, useEffect, useState } from 'react'
import { AboutMeModal } from './components/AboutMeModal'
import { ClientReviewsSection } from './components/ClientReviewsSection'
import { AmbientBackgroundLayer } from './components/AmbientBackgroundLayer'
import { BackgroundEngineeringGrid } from './components/BackgroundEngineeringGrid'
import { CursorSpotlight } from './components/CursorSpotlight'
import { ExperienceTimeline } from './components/ExperienceTimeline'
import { FloatingConsultationButton } from './components/FloatingConsultationButton'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ParticleBackground } from './components/ParticleBackground'
import { PreFooterCTA } from './components/PreFooterCTA'
import { ProcessSection } from './components/ProcessSection'
import { ProjectBento } from './components/ProjectBento'
import { SectionAura } from './components/SectionAura'
import { ServicesSection } from './components/ServicesSection'
import { StatsSection } from './components/StatsSection'
import { TechStackSection } from './components/TechStackSection'
import { ViewportNeonRails } from './components/ViewportNeonRails'

function measureDocHeight() {
  if (typeof document === 'undefined') return 900
  return Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    window.innerHeight,
  )
}

function App() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [aboutMountId, setAboutMountId] = useState(0)

  const openAbout = useCallback(() => {
    setAboutMountId((id) => id + 1)
    setAboutOpen(true)
  }, [])

  const [docH, setDocH] = useState(() =>
    typeof window !== 'undefined' ? measureDocHeight() : 900,
  )

  useEffect(() => {
    const schedule = () => {
      requestAnimationFrame(() => setDocH(measureDocHeight()))
    }
    schedule()
    const ro = new ResizeObserver(schedule)
    ro.observe(document.documentElement)
    ro.observe(document.body)
    window.addEventListener('resize', schedule)
    window.addEventListener('load', schedule)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', schedule)
      window.removeEventListener('load', schedule)
    }
  }, [])

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#e8ecf6] text-slate-900">
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 w-full overflow-hidden"
        style={{ height: docH }}
        aria-hidden
      >
        <div className="hero-blob-layer absolute inset-0 bg-[radial-gradient(1440px_840px_at_15%_-10%,rgba(191,219,254,0.68),transparent),radial-gradient(1080px_720px_at_90%_0%,rgba(224,231,255,0.58),transparent),radial-gradient(1080px_672px_at_50%_100%,rgba(226,232,240,0.9),transparent)]" />
        <ParticleBackground pageHeight={docH} />
        <AmbientBackgroundLayer pageHeight={docH} />
      </div>

      <BackgroundEngineeringGrid />

      <CursorSpotlight />

      <ViewportNeonRails />

      <div
        className="cinematic-noise pointer-events-none fixed inset-0 z-[20] opacity-[0.022] mix-blend-multiply"
        aria-hidden
      />

      <AboutMeModal
        key={aboutMountId}
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />

      <Navbar onOpenAbout={openAbout} />

      <FloatingConsultationButton />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <SectionAura tone="cyan">
          <Hero />
          <StatsSection />
          <ClientReviewsSection />
          <ServicesSection />
          <ProcessSection />
        </SectionAura>

        <SectionAura tone="violet">
          <ProjectBento />
          <TechStackSection />
          <ExperienceTimeline />
        </SectionAura>

        <SectionAura tone="deep">
          <PreFooterCTA />
          <Footer />
        </SectionAura>
      </div>

      <Analytics />
    </div>
  )
}

export default App
