import { useState } from 'react'

export function Controls(){
  const [sound,setSound]=useState(false),[full,setFull]=useState(false)
  const toggleFull=async()=>{if(!document.fullscreenElement){await document.documentElement.requestFullscreen();setFull(true)}else{await document.exitFullscreen();setFull(false)}}
  return <div className="controls">
    <button aria-pressed={sound} aria-label="Toggle ambient sound" onClick={()=>setSound(v=>!v)}><i className={sound?'sound-on':''}/>{sound?'AMBIENT ON':'AMBIENT'}</button>
    <button aria-pressed={full} aria-label="Toggle fullscreen" onClick={toggleFull}>{full?'MINIMIZE':'FULLSCREEN'} <span>↗</span></button>
  </div>
}
