import { useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export function Cursor() {
  const x = useSpring(-50, { stiffness: 700, damping: 45 })
  const y = useSpring(-50, { stiffness: 700, damping: 45 })
  const ringX = useSpring(-50, { stiffness: 220, damping: 28 })
  const ringY = useSpring(-50, { stiffness: 220, damping: 28 })
  const pressed = useRef(false)
  useEffect(() => {
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); ringX.set(e.clientX); ringY.set(e.clientY) }
    const down = () => { pressed.current = true; document.body.classList.add('cursor-down') }
    const up = () => { pressed.current = false; document.body.classList.remove('cursor-down') }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', down); window.removeEventListener('pointerup', up) }
  }, [x, y, ringX, ringY])
  return <div className="cursor-layer" aria-hidden="true"><motion.i className="cursor-ring" style={{ x: ringX, y: ringY }}/><motion.i className="cursor-dot" style={{ x, y }}/></div>
}
