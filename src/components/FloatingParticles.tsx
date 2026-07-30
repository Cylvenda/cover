import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import type { PointerState } from '../types'

const TOKENS = ['</>','{}','React','AI','⚡','🚀','✨','💻','TypeScript','Docker','async','=>','Web3','🔒','API','git','[]','🤖']
type P = { x:number;y:number;vx:number;vy:number;r:number;a:number;tw:number }
type Glyph = { x:number;y:number;vx:number;vy:number;life:number;max:number;text:string;size:number;front:boolean;rot:number }

export function FloatingParticles({ pointer }: { pointer: RefObject<PointerState> }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const glyphs = useRef<Glyph[]>([])
  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d', { alpha: true })!
    let particles:P[] = [], raf = 0, last = performance.now(), dpr = 1
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => {
      dpr = Math.min(devicePixelRatio, 1.5)
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr
      canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`
      ctx.setTransform(dpr,0,0,dpr,0,0)
      const count = reduced ? 45 : Math.min(260, Math.floor(innerWidth * innerHeight / 5500))
      particles = Array.from({length:count}, () => ({ x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:Math.random()*1.5+.25,a:Math.random()*.6+.2,tw:Math.random()*6 }))
    }
    const burst = (e: PointerEvent) => {
      if (glyphs.current.length > 80) glyphs.current.splice(0, 25)
      for(let i=0;i<10;i++){ const a=Math.random()*Math.PI*2,s=1+Math.random()*3; glyphs.current.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1,life:0,max:70+Math.random()*35,text:TOKENS[Math.floor(Math.random()*TOKENS.length)],size:10+Math.random()*10,front:true,rot:Math.random()*2-1}) }
    }
    const ambient = window.setInterval(() => {
      if (reduced || glyphs.current.length > 35) return
      glyphs.current.push({x:Math.random()*innerWidth,y:innerHeight+30,vx:(Math.random()-.5)*.35,vy:-.18-Math.random()*.3,life:0,max:500+Math.random()*300,text:TOKENS[Math.floor(Math.random()*TOKENS.length)],size:9+Math.random()*9,front:Math.random()>.58,rot:(Math.random()-.5)*.005})
    }, 900)
    const draw = (now:number) => {
      const dt=Math.min(2,(now-last)/16.67); last=now; ctx.clearRect(0,0,innerWidth,innerHeight)
      const m=pointer.current
      for(let i=0;i<particles.length;i++){ const p=particles[i],dx=p.x-m.x,dy=p.y-m.y,d2=dx*dx+dy*dy
        if(m.active&&d2<15000){const f=(1-Math.sqrt(d2)/123)*.035;p.vx+=dx*f;p.vy+=dy*f}
        p.vx*=.985;p.vy*=.985;p.x+=p.vx*dt;p.y+=p.vy*dt
        if(p.x<0)p.x=innerWidth;if(p.x>innerWidth)p.x=0;if(p.y<0)p.y=innerHeight;if(p.y>innerHeight)p.y=0
        const sparkle=.55+.45*Math.sin(now*.002+p.tw);ctx.fillStyle=`rgba(102,220,255,${p.a*sparkle})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r*sparkle,0,7);ctx.fill()
        if(i<70) for(let j=i+1;j<Math.min(75,particles.length);j++){const q=particles[j],ex=p.x-q.x,ey=p.y-q.y,ed=ex*ex+ey*ey;if(ed<7000){ctx.strokeStyle=`rgba(78,153,255,${.055*(1-ed/7000)})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}
      }
      glyphs.current=glyphs.current.filter(g=>g.life<g.max)
      for(const g of glyphs.current){g.life++;g.x+=g.vx*dt;g.y+=g.vy*dt;g.vy+=g.max<150?.035:0;const alpha=Math.sin(Math.min(1,g.life/30)*Math.PI/2)*Math.min(1,(g.max-g.life)/45)
        ctx.save();ctx.translate(g.x,g.y);ctx.rotate(g.rot*g.life);ctx.font=`500 ${g.size}px "Space Grotesk"`;ctx.textAlign='center';ctx.shadowBlur=g.front?12:5;ctx.shadowColor='#3cecff';ctx.fillStyle=g.front?`rgba(164,241,255,${alpha*.8})`:`rgba(84,137,178,${alpha*.28})`;ctx.fillText(g.text,0,0);ctx.restore()
      }
      raf=requestAnimationFrame(draw)
    }
    resize();window.addEventListener('resize',resize);window.addEventListener('pointerdown',burst);raf=requestAnimationFrame(draw)
    return()=>{cancelAnimationFrame(raf);clearInterval(ambient);window.removeEventListener('resize',resize);window.removeEventListener('pointerdown',burst)}
  },[pointer])
  return <canvas ref={ref} className="particle-canvas" aria-hidden="true"/>
}
