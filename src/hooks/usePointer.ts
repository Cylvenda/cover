import { useEffect, useRef } from 'react'
import type { PointerState } from '../types'

export function usePointer() {
  const pointer = useRef<PointerState>({ x: -100, y: -100, nx: 0, ny: 0, active: false })
  useEffect(() => {
    const move = (event: PointerEvent) => {
      pointer.current.x = event.clientX
      pointer.current.y = event.clientY
      pointer.current.nx = event.clientX / innerWidth - .5
      pointer.current.ny = event.clientY / innerHeight - .5
      pointer.current.active = true
    }
    const leave = () => { pointer.current.active = false }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [])
  return pointer
}
