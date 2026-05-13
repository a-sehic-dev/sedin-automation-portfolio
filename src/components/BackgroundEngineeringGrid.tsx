import { useId } from 'react'

/** Fixed faint SVG grid — engineering / schematic vibe */
export function BackgroundEngineeringGrid() {
  const id = useId().replace(/:/g, '')
  const patternId = `eng-grid-${id}`

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] opacity-[0.12] sm:opacity-[0.1]"
      aria-hidden
    >
      <svg className="h-full w-full text-slate-500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={patternId}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              className="opacity-40"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}
