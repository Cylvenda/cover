import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedLogo } from './components/AnimatedLogo'
import { BackgroundGlow } from './components/BackgroundGlow'
import { Cursor } from './components/Cursor'
import { EdgeAnimation } from './components/EdgeAnimation'
import { FloatingParticles } from './components/FloatingParticles'
import { InteractiveTitle } from './components/InteractiveTitle'
import { AmbientMessages } from './components/AmbientMessages'
import { Controls } from './components/Controls'
import { SocialLinks } from './components/SocialLinks'
import { usePointer } from './hooks/usePointer'

export default function App(){
  const pointer=usePointer(),[ready,setReady]=useState(false)
  useEffect(()=>{const t=setTimeout(()=>setReady(true),150);return()=>clearTimeout(t)},[])
  return <main className={ready?'ready':''}>
    <BackgroundGlow/><FloatingParticles pointer={pointer}/><EdgeAnimation/><Cursor/>
    <motion.div className="coordinate top-left" initial={{opacity:0}} animate={{opacity:.55}} transition={{delay:1.8}}>06.7924° S<br/>39.2083° E</motion.div>
    <motion.div className="coordinate top-right" initial={{opacity:0}} animate={{opacity:.55}} transition={{delay:1.8}}>DIGITAL<br/>CRAFT / 2026</motion.div>
    <section className="hero">
      <AnimatedLogo/>
      <InteractiveTitle pointer={pointer}/>
      <motion.p className="tagline" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1.8,duration:1}}>DIGITAL CRAFTSMANSHIP <i/> FUTURE SYSTEMS</motion.p>
    </section>
    <AmbientMessages/><SocialLinks/><Controls/>
    <div className="intro-curtain" aria-hidden="true"/>
  </main>
}
