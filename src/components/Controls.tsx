import { useEffect, useState } from 'react'

export function Controls(){
  const [sound,setSound]=useState(false),[full,setFull]=useState(false)
  const [theme,setTheme]=useState<'dark'|'light'>(() => {
    const saved=localStorage.getItem('cylvenda-theme')
    if(saved==='dark'||saved==='light')return saved
    return matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'
  })
  useEffect(()=>{
    document.documentElement.dataset.theme=theme
    localStorage.setItem('cylvenda-theme',theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='light'?'#eaf8ff':'#03040a')
  },[theme])
  const toggleFull=async()=>{if(!document.fullscreenElement){await document.documentElement.requestFullscreen();setFull(true)}else{await document.exitFullscreen();setFull(false)}}
  return <div className="controls">
    <button aria-pressed={sound} aria-label="Toggle ambient sound" onClick={()=>setSound(v=>!v)}><i className={sound?'sound-on':''}/>{sound?'AMBIENT ON':'AMBIENT'}</button>
    <button className="theme-toggle" aria-pressed={theme==='light'} aria-label={`Switch to ${theme==='dark'?'light':'dark'} theme`} onClick={()=>setTheme(v=>v==='dark'?'light':'dark')}>
      <span className="theme-icon" aria-hidden="true">{theme==='dark'?'☼':'☾'}</span>{theme==='dark'?'LIGHT':'DARK'}
    </button>
    <button aria-pressed={full} aria-label="Toggle fullscreen" onClick={toggleFull}>{full?'MINIMIZE':'FULLSCREEN'} <span>↗</span></button>
  </div>
}
