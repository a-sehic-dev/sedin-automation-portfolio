import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  r: number
}

type Props = {
  /** Full scrollable document height so particles cover the entire page */
  pageHeight: number
}

export function ParticleBackground({ pageHeight }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let particles: Particle[] = []
    let w = 0
    let h = 0

    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX / window.innerWidth
      mouseRef.current.ty = e.clientY / window.innerHeight
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = Math.max(pageHeight, window.innerHeight, 1)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const area = w * h
      const count = Math.min(220, Math.max(80, Math.floor(area / 14000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.35 * 1.2,
        vy: (Math.random() - 0.5) * 0.35 * 1.2,
        r: 0.6 + Math.random() * 1.8,
      }))
    }

    const step = () => {
      const { tx, ty } = mouseRef.current
      mouseRef.current.x += (tx - mouseRef.current.x) * 0.04
      mouseRef.current.y += (ty - mouseRef.current.y) * 0.04
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.clearRect(0, 0, w, h)

      const tiltX = (mx - 0.5) * 28
      const tiltY = (my - 0.5) * 22

      for (const p of particles) {
        p.x += p.vx + tiltX * 0.002 * (0.35 + p.z)
        p.y += p.vy + tiltY * 0.002 * (0.35 + p.z)
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        const depth = 0.2 + p.z * 0.85
        const parallaxX = (mx - 0.5) * 40 * depth
        const parallaxY = (my - 0.5) * 32 * depth
        const sx = p.x + parallaxX * 0.06
        const sy = p.y + parallaxY * 0.06

        const alpha = 0.06 + p.z * 0.14
        ctx.beginPath()
        ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`
        ctx.arc(sx, sy, p.r * (0.75 + p.z * 0.9) * 1.15, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    resize()
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [pageHeight])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full"
      style={{ height: pageHeight }}
      aria-hidden
    />
  )
}
