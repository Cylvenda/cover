import { motion, useReducedMotion } from 'framer-motion'

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" role="img" aria-label="cylvenda CV monogram">
      <defs>
        <linearGradient id="cv" x1="25" y1="22" x2="137" y2="142" gradientUnits="userSpaceOnUse">
          <stop stopColor="#70F6FF"/><stop offset=".48" stopColor="#2694FF"/><stop offset="1" stopColor="#A455FF"/>
        </linearGradient>
        <filter id="cvGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path opacity=".2" d="M80 8 142.4 44v72L80 152l-62.4-36V44L80 8Z" stroke="url(#cv)" />
      <path d="M112 49.5A45 45 0 1 0 112 111" stroke="url(#cv)" strokeWidth="11" strokeLinecap="round" filter="url(#cvGlow)"/>
      <path d="m55 54 25 54 25-54" stroke="url(#cv)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" filter="url(#cvGlow)"/>
      <path d="m123 31 4 8 8 4-8 4-4 8-4-8-8-4 8-4 4-8Z" fill="#B8FCFF"/>
    </svg>
  )
}

export function AnimatedLogo() {
  const reduced = useReducedMotion()
  return (
    <motion.div className="logo-wrap" initial={{ opacity: 0, scale: .3, rotate: -30 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .55, type: 'spring', stiffness: 90, damping: 13 }}>
      <motion.div animate={reduced ? {} : { y: [-5, 5, -5], rotateY: [-9, 9, -9], filter: ['brightness(1)', 'brightness(1.35)', 'brightness(1)'] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <LogoMark className="logo" />
      </motion.div>
      <span className="logo-orbit" />
    </motion.div>
  )
}
