import { motion } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const

function scrollToHash(href: string) {
  const id = href.slice(1)
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type NavbarProps = {
  onOpenAbout: () => void
}

export function Navbar({ onOpenAbout }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/40 bg-white/55 shadow-[0_8px_40px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl backdrop-saturate-150"
    >
      <nav
        className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-10"
        aria-label="Primary"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            scrollToHash('#home')
            setOpen(false)
          }}
          className="flex items-center gap-2 rounded-xl px-1 py-0.5 text-[#0f172a] transition hover:opacity-90"
        >
          <motion.span
            className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30"
            animate={{
              boxShadow: [
                '0 4px 14px rgba(37,99,235,0.35)',
                '0 4px 28px rgba(0,242,255,0.45)',
                '0 4px 14px rgba(37,99,235,0.35)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          >
            <motion.span
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: ['-120%', '120%'] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 3.8,
                ease: 'easeInOut',
              }}
            />
            <Zap className="relative size-[1.15rem]" aria-hidden />
          </motion.span>
          <span className="text-sm font-semibold tracking-[0.04em] sm:text-base">
            CORE-FLOW
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHash(href)
                }}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70 hover:text-[#0f172a]"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pl-2">
            <motion.button
              type="button"
              onClick={() => {
                onOpenAbout()
                setOpen(false)
              }}
              className="relative overflow-hidden rounded-full px-5 py-2 text-sm font-semibold text-white"
              aria-label="About me"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(0,242,255,0.35), 0 0 22px rgba(0,68,255,0.45)',
                  '0 0 0 10px rgba(0,242,255,0), 0 0 38px rgba(0,242,255,0.55)',
                  '0 0 0 0 rgba(0,242,255,0.35), 0 0 22px rgba(0,68,255,0.45)',
                ],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0044ff] via-[#0077ff] to-[#00f2ff]" />
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.25)_50%,transparent_70%)] opacity-90" />
              <span className="relative">About Me</span>
            </motion.button>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-white/70 bg-white/50 p-2.5 text-slate-800 shadow-sm backdrop-blur-md md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Menu className="size-5" aria-hidden />
          )}
          <span className="sr-only">Menu</span>
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/40 bg-white/60 px-5 py-4 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-white/70"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash(href)
                    setOpen(false)
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <motion.button
                type="button"
                onClick={() => {
                  onOpenAbout()
                  setOpen(false)
                }}
                className="relative w-full overflow-hidden rounded-xl px-4 py-3 text-center text-sm font-semibold text-white"
                aria-label="About me"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(0,242,255,0.25), 0 0 18px rgba(0,68,255,0.35)',
                    '0 0 0 8px rgba(0,242,255,0), 0 0 32px rgba(0,242,255,0.5)',
                    '0 0 0 0 rgba(0,242,255,0.25), 0 0 18px rgba(0,68,255,0.35)',
                  ],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0044ff] via-[#0077ff] to-[#00f2ff]" />
                <span className="relative">About Me</span>
              </motion.button>
            </li>
          </ul>
        </div>
      ) : null}
    </motion.header>
  )
}
