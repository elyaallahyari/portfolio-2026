import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { StreamingText } from '../ui/streaming-text'

const streamPhrases = [
  'streaming answers people can interrupt…',
  'confidence you can see…',
  'citations you can check…',
  'failures that fail gracefully…',
  'humans always in the loop…'
]

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 lg:px-10"
    >
      {/* ambient glows */}
      <div
        aria-hidden="true"
        className="absolute -top-20 right-[8%] h-105 w-105 rounded-full bg-signal opacity-15 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 left-[4%] h-90 w-90 rounded-full bg-trust opacity-10 blur-[90px]"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-glass px-4 py-2 text-sm text-muted">
          <span className="pulse-dot" aria-hidden="true" />
          {siteConfig.status}
        </p>

        <h1 className="max-w-[14ch] font-display text-[clamp(2.6rem,7.5vw,5.5rem)] font-bold leading-[1.02] tracking-tight">
          I design the <em className="not-italic text-signal">human</em> side of AI
          <span className="text-signal">.</span>
        </h1>

        <p
          aria-label="Live streaming text demo"
          className="mt-6 min-h-[1.8em] font-display text-xl text-trust md:text-2xl"
        >
          <span className="mr-3 inline-block rounded-full border border-line px-2 py-0.5 align-middle font-body text-[0.7rem] uppercase tracking-[0.12em] text-muted">
            live · streaming
          </span>
          <span className="align-middle">
            <StreamingText phrases={streamPhrases} />
          </span>
          <span className="caret" aria-hidden="true" />
        </p>

        <p className="mt-5 max-w-xl text-lg text-muted">
          Frontend engineer from Tehran building AI products people can trust — from streaming UX
          and trust indicators to accessible, ethical interfaces.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/#work" className="btn-primary">
            View case studies
          </Link>
          <a href="/resume.pdf" className="btn-ghost">
            Download CV ↓
          </a>
        </div>
      </div>
    </section>
  )
}
