'use client'

import { useEffect, useRef, useState } from 'react'

type StreamingTextProps = {
  phrases: string[]
  label?: string
}

export function StreamingText({ phrases, label = 'Live streaming text demo' }: StreamingTextProps) {
  const [text, setText] = useState('')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setText(phrases[0])
      return
    }

    let cancelled = false
    let phraseIndex = 0
    let charIndex = 0

    const type = () => {
      if (cancelled) return
      const phrase = phrases[phraseIndex]
      if (charIndex <= phrase.length) {
        setText(phrase.slice(0, charIndex))
        charIndex += 1
        timers.current.push(setTimeout(type, 26 + Math.random() * 46))
      } else {
        timers.current.push(setTimeout(erase, 2100))
      }
    }

    const erase = () => {
      if (cancelled) return
      const phrase = phrases[phraseIndex]
      if (charIndex >= 0) {
        charIndex -= 1
        setText(phrase.slice(0, charIndex))
        timers.current.push(setTimeout(erase, 12))
      } else {
        phraseIndex = (phraseIndex + 1) % phrases.length
        charIndex = 0
        timers.current.push(setTimeout(type, 400))
      }
    }

    type()
    return () => {
      cancelled = true
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span role="status" aria-label={label}>
      <span aria-hidden="true">{text}</span>
    </span>
  )
}
