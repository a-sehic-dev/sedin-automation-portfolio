import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const SNIPPETS = [
  'def automate_pipeline():',
  'import pandas as pd',
  'while True:',
  'async with session:',
  'await page.goto(url)',
  'df = pd.read_excel(path)',
  'return JSONResponse(rows)',
  'for chunk in pd.read_sql(query, conn, chunksize=5000):',
  'schedule.every(1).minutes.do(job)',
  'with httpx.Client() as client:',
  'BaseModel.model_validate(data)',
  'ccxt.binance({"enableRateLimit": True})',
  'playwright.chromium.launch(headless=True)',
  'boto3.client("s3").upload_fileobj(fp, bucket, key)',
  'def transform(raw):',
  'yield from chunked(iterable, 500)',
]

type Cube = {
  nx: number
  ny: number
  s: number
  ax: number
  ay: number
  speed: number
  driftX: number
  driftY: number
  driftFreqX: number
  driftFreqY: number
  phaseX: number
  phaseY: number
  strokeAlpha: number
}

/** Faint code snippets + ultra-subtle floating 3D wireframe cubes (depth, no clutter) */
type Props = { pageHeight: number }

export function AmbientBackgroundLayer({ pageHeight }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0

    const cubes: Cube[] = Array.from({ length: 12 }, () => ({
      nx: 0.06 + Math.random() * 0.88,
      ny: 0.06 + Math.random() * 0.82,
      s: (20 + Math.random() * 26) * 1.2,
      ax: Math.random() * Math.PI * 2,
      ay: Math.random() * Math.PI * 2,
      speed: (0.1 + Math.random() * 0.14) * 1.2,
      driftX: (Math.random() - 0.5) * 0.045 * 1.2,
      driftY: (Math.random() - 0.5) * 0.04 * 1.2,
      driftFreqX: (0.000055 + Math.random() * 0.00005) * 1.2,
      driftFreqY: (0.000048 + Math.random() * 0.000045) * 1.2,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      strokeAlpha: 0.028 + Math.random() * 0.022,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = Math.max(pageHeight, window.innerHeight, 1)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const project = (
      x: number,
      y: number,
      z: number,
      cx: number,
      cy: number,
      f: number,
    ) => {
      const zz = z + f
      const sx = cx + (x * f) / zz
      const sy = cy + (y * f) / zz
      return [sx, sy] as const
    }

    const drawCube = (
      cx: number,
      cy: number,
      size: number,
      ax: number,
      ay: number,
      strokeAlpha: number,
    ) => {
      const verts: [number, number, number][] = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ].map(([x, y, z]) => {
        const cosA = Math.cos(ax)
        const sinA = Math.sin(ax)
        const cosB = Math.cos(ay)
        const sinB = Math.sin(ay)
        const rx = x
        const ry = cosA * y - sinA * z
        const rz = sinA * y + cosA * z
        const fx = cosB * rx + sinB * rz
        const fy = ry
        const fz = -sinB * rx + cosB * rz
        return [fx, fy, fz] as [number, number, number]
      })

      const f = 3.2
      const proj = verts.map(([x, y, z]) =>
        project(x * size, y * size, z * size, cx, cy, f),
      )

      const edges: [number, number][] = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ]

      ctx.strokeStyle = `rgba(71, 85, 105, ${strokeAlpha})`
      ctx.lineWidth = 1
      for (const [a, b] of edges) {
        ctx.beginPath()
        const [x1, y1] = proj[a]
        const [x2, y2] = proj[b]
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
    }

    let start = 0
    const step = (time: number) => {
      if (!start) start = time
      const t = time - start
      ctx.clearRect(0, 0, w, h)
      const scroll = scrollRef.current * 0.012
      for (const c of cubes) {
        const driftPx =
          Math.sin(t * c.driftFreqX + c.phaseX) * c.driftX * w +
          Math.cos(t * c.driftFreqY * 0.9 + c.phaseY) * c.driftY * 0.6 * w
        const driftPy =
          Math.cos(t * c.driftFreqY + c.phaseY) * c.driftY * h +
          Math.sin(t * c.driftFreqX * 0.85 + c.phaseX) * c.driftX * 0.55 * h
        const cx = c.nx * w + driftPx
        const cy = c.ny * h + driftPy + (scroll % 100) * 0.06
        const ax = c.ax + t * 0.00035 * c.speed
        const ay = c.ay + t * 0.00028 * c.speed
        drawCube(cx, cy, c.s, ax, ay, c.strokeAlpha)
      }
      raf = requestAnimationFrame(step)
    }

    window.addEventListener('resize', resize)
    resize()
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [pageHeight])

  const codeColor = 'rgba(51, 65, 85, 0.12)'

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] overflow-hidden"
      style={{ height: pageHeight }}
      aria-hidden
    >
      <div
        className="absolute inset-0 font-mono text-[11px] leading-relaxed sm:text-xs"
        style={{ color: codeColor }}
      >
        {SNIPPETS.map((text, i) => (
          <motion.div
            key={`${text}-${i}`}
            className="absolute max-w-[min(100%,20rem)] select-none whitespace-pre-wrap break-words"
            style={{
              left: `${(i * 37 + (i % 5) * 11) % 92}%`,
              top: `${(i * 23 + (i % 7) * 17) % 88}%`,
            }}
            animate={{
              opacity: [0.09, 0.16, 0.1],
              y: [0, -8, 0],
            }}
            transition={{
              duration: (8 + (i % 5)) / 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.35,
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
