import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'

const facts = [
  { label: 'B.Sc.', value: 'Computer Engineering, Sadjad University of Technology' },
  { label: 'Stack', value: 'React · Next.js · TypeScript · NestJS · Postgres' },
  { label: 'Now', value: 'AI-UX Kit v0.1 — building in public' },
  { label: 'Next', value: 'MSc Human-Centered AI · Europe · 2027' }
]

export function About() {
  return (
    <section id="about" className="border-t border-line px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="About" />
        <div className="mt-12 grid items-start gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="text-lg leading-loose text-muted">
              I&apos;m Elya — a computer engineering graduate from Mashhad, Iran, and a frontend
              engineer who fell for the moment where technology meets a person. Two years into
              React, Next.js and TypeScript, I found the question that won&apos;t leave me alone:{' '}
              <strong className="text-cream">what should it feel like when software thinks?</strong>{' '}
              I&apos;m building toward that answer — one component, one case study, one evaluation
              at a time — and preparing for MSc studies in Human-Centered AI in Europe.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="list-none">
              {facts.map((fact) => (
                <li key={fact.label} className="flex gap-5 border-b border-line py-4 text-sm">
                  <span className="min-w-16 font-display text-xs font-semibold text-signal">
                    {fact.label}
                  </span>
                  <span className="text-muted">{fact.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
