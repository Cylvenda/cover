import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
const lines=['> Initializing...','> Compiling future...','> git push origin main','> AI Ready','> System Online','> Web3 Connected','> docker compose up']
export function AmbientMessages(){
  const [i,setI]=useState(-1),reduced=useReducedMotion()
  useEffect(()=>{if(reduced)return;const t=setInterval(()=>setI(v=>(v+1)%lines.length),5200);return()=>clearInterval(t)},[reduced])
  return <div className="terminal" aria-hidden="true"><AnimatePresence mode="wait">{i>=0&&<motion.span key={i} initial={{opacity:0,width:0}} animate={{opacity:[0,1,1,0],width:'auto'}} exit={{opacity:0}} transition={{duration:4}}>{lines[i]}</motion.span>}</AnimatePresence></div>
}
