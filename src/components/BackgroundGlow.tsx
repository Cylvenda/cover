import { motion, useReducedMotion } from 'framer-motion'

export function BackgroundGlow() {
  const reduced = useReducedMotion()
  return (
    <div className="glow-field" aria-hidden="true">
      <motion.div className="blob blob-a" animate={reduced ? {} : { x: ['-8%', '8%', '-8%'], y: ['-5%', '9%', '-5%'], scale: [1, 1.18, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="blob blob-b" animate={reduced ? {} : { x: ['8%', '-10%', '8%'], y: ['8%', '-8%', '8%'], scale: [1.08, .9, 1.08] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="beam beam-a" />
      <div className="beam beam-b" />
      <div className="vignette" />
      <div className="noise" />
    </div>
  )
}
