import { useEffect, useMemo, useState } from 'react'
import type { RefObject } from 'react'
import { animate, motion, useAnimation, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { PointerState } from '../types'

const TITLE='cylvenda.co.tz'
const dances = [
  { rotateZ:[0,-2,2,0],scaleY:[1,1.13,.92,1] },
  { rotateY:[0,22,-18,0],rotateX:[0,-8,8,0] },
  { scale:[1,1.08,.96,1.03,1],y:[0,-18,5,0] },
  { rotateZ:[0,360],scale:[1,.9,1] },
]

export function InteractiveTitle({ pointer }: { pointer: RefObject<PointerState> }) {
  const controls=useAnimation(), reduced=useReducedMotion(), x=useMotionValue(0),y=useMotionValue(0)
  const sx=useSpring(x,{stiffness:80,damping:16,mass:.8}),sy=useSpring(y,{stiffness:80,damping:16,mass:.8})
  const rotateY=useTransform(sx,[-innerWidth/2,innerWidth/2],[-7,7]),rotateX=useTransform(sy,[-innerHeight/2,innerHeight/2],[6,-6])
  const [hover,setHover]=useState(false)
  const letters=useMemo(()=>TITLE.split(''),[])
  useEffect(()=>{ if(reduced)return; const id=setInterval(async()=>{await controls.start({...dances[Math.floor(Math.random()*dances.length)],transition:{duration:1.35,type:'spring',stiffness:90,damping:12}});controls.set({rotateZ:0,rotateX:0,rotateY:0,scale:1,y:0})},4300);return()=>clearInterval(id)},[controls,reduced])
  const release=()=>{animate(x,0,{type:'spring',stiffness:45,damping:10,mass:1.4});animate(y,0,{type:'spring',stiffness:45,damping:10,mass:1.4})}
  return (
    <motion.div className="title-stage" style={{x:sx,y:sy,rotateX,rotateY}} drag={!reduced} dragMomentum dragElastic={.18} onDragEnd={release} animate={controls}
      initial={{scale:0,opacity:0,filter:'blur(20px) brightness(3)'}} whileInView={{scale:1,opacity:1,filter:'blur(0px) brightness(1)'}} transition={{delay:.8,duration:1.15,type:'spring',bounce:.4}}
      onHoverStart={()=>{setHover(true);document.body.classList.add('title-hover')}} onHoverEnd={()=>{setHover(false);document.body.classList.remove('title-hover')}}>
      <div className="title-reflection" aria-hidden="true">{TITLE}</div>
      <h1 aria-label={TITLE}>
        {letters.map((char,i)=><motion.span key={i} custom={i} animate={hover&&!reduced?{x:(i-(letters.length-1)/2)*1.5,y:[0,-7,3,0],rotateZ:[0,i%2?3:-3,0]}:{y:[0,-2.5,0]}} transition={hover?{delay:i*.018,duration:.55,type:'spring'}:{delay:i*.05,duration:2.8,repeat:Infinity,ease:'easeInOut'}}>{char}</motion.span>)}
      </h1>
      <div className="title-shine"/>
    </motion.div>
  )
}
