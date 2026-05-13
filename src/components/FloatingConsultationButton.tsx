import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { WHATSAPP_URL } from '../constants/links'

export function FloatingConsultationButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      title="Free Consultation"
      aria-label="Free Consultation on WhatsApp"
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26, delay: 0.35 }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-5 z-[45] flex size-14 items-center justify-center rounded-2xl border border-[#00f2ff]/60 bg-gradient-to-br from-[#0a1628]/95 to-[#0f172a]/95 text-cyan-200 shadow-[0_0_0_1px_rgba(0,242,255,0.15),0_0_32px_rgba(0,242,255,0.35),0_12px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:bottom-8 sm:right-8"
    >
      <Calendar className="size-6" strokeWidth={1.75} aria-hidden />
    </motion.a>
  )
}
