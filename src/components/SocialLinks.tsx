import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Social = {
  label: string
  href: string
  icon: ReactNode
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const socials: Social[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/cylvenda',
    icon: <svg {...iconProps}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.7" r=".7" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/cylvenda',
    icon: <svg {...iconProps}><path d="M14.5 21v-8h2.8l.5-3h-3.3V8.1c0-.9.3-1.6 1.7-1.6H18V3.8c-.6-.1-1.5-.2-2.5-.2-2.6 0-4.3 1.6-4.3 4.4v2H8.3v3h2.9v8"/></svg>,
  },
  {
    label: 'X',
    href: 'https://x.com/cylvenda',
    icon: <svg {...iconProps}><path d="M4 4l16 16M20 4 4 20"/><path d="m7 4 13 16M17 4 4 20"/></svg>,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Cylvenda',
    icon: <svg {...iconProps}><path d="M15 22v-3.8c0-1 .1-1.5-.5-2.1 3.2-.4 6.5-1.6 6.5-7A5.5 5.5 0 0 0 19.5 5c.2-.4.7-2-.2-4 0 0-1.2-.4-4.3 1.6a15 15 0 0 0-6 0C5.9.6 4.7 1 4.7 1c-.9 2-.4 3.6-.2 4A5.5 5.5 0 0 0 3 9.1c0 5.4 3.3 6.6 6.5 7-.5.5-.6 1-.6 2.1V22"/><path d="M9 19c-3 .9-3-1.5-4.2-2"/></svg>,
  },
  {
    label: 'Email',
    href: 'mailto:hello@cylvenda.co.tz',
    icon: <svg {...iconProps}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>,
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@cylvenda',
    icon: <svg {...iconProps}><path d="M14 4v11.2a4.2 4.2 0 1 1-3.4-4.1"/><path d="M14 4c.5 2.7 2.1 4.2 5 4.5"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/brayan-mlawa',
    icon: <svg {...iconProps}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.1M12 17v-4c0-1.7 1-3 2.7-3 1.5 0 2.3 1 2.3 3v4M12 10v7"/></svg>,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@cylvenda',
    icon: <svg {...iconProps}><path d="M21 12c0 2.2-.2 4.2-.7 5-.4.7-1 1-1.8 1.2-1.5.3-5.4.3-6.5.3s-5 0-6.5-.3c-.8-.2-1.4-.5-1.8-1.2-.5-.8-.7-2.8-.7-5s.2-4.2.7-5c.4-.7 1-1 1.8-1.2C7 5.5 10.9 5.5 12 5.5s5 0 6.5.3c.8.2 1.4.5 1.8 1.2.5.8.7 2.8.7 5Z"/><path d="m10 9 5 3-5 3Z"/></svg>,
  },
]

export function SocialLinks() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.nav
      className="social-dock"
      aria-label="cylvenda social media"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.1, duration: .7 }}
    >
      {socials.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target={social.href.startsWith('http') ? '_blank' : undefined}
          rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
          aria-label={social.label}
          data-label={social.label}
          data-social={social.label.toLowerCase()}
          animate={reducedMotion ? undefined : {
            y: [0, -6, 2, 0],
            rotate: [0, index % 2 ? 8 : -8, index % 2 ? -5 : 5, 0],
            scale: [1, 1.08, .98, 1],
          }}
          whileHover={{
            y: -9,
            scale: 1.24,
            rotate: 360,
            transition: { type: 'spring', stiffness: 360, damping: 16 },
          }}
          whileTap={{ scale: .9 }}
          transition={reducedMotion ? undefined : {
            duration: 2.5 + (index % 3) * .35,
            repeat: Infinity,
            repeatDelay: .35 + (index % 2) * .3,
            delay: index * .16,
            ease: 'easeInOut',
          }}
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.nav>
  )
}
