/** Stronger neon aura on left & right viewport edges */
export function ViewportNeonRails() {
  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-0 right-0 z-[5] flex justify-between"
      aria-hidden
    >
      <div className="h-full w-[min(7rem,12vw)] bg-gradient-to-r from-[#00f2ff]/28 via-[#0044ff]/14 to-transparent blur-[0.5px]" />
      <div className="h-full w-[min(7rem,12vw)] bg-gradient-to-l from-[#bc13fe]/22 via-[#0044ff]/14 to-transparent blur-[0.5px]" />
    </div>
  )
}
