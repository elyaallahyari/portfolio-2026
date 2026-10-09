import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'

const values = [
  {
    title: 'Human–AI trust',
    span: true,
    body: "Streaming states, confidence indicators, citations, undo. Trust isn't a feature you add — it's the interface itself."
  },
  {
    title: 'Accessibility first',
    span: false,
    body: 'WCAG 2.1 AA, keyboard-first, reduced-motion aware. The European Accessibility Act made this non-negotiable — I made it a habit.'
  },
  {
    title: 'AI ethics in practice',
    span: false,
    body: 'Not manifestos — mechanisms. Human-in-the-loop, disclosure, graceful failure, data dignity.'
  },
  {
    title: 'Performance as UX',
    span: false,
    body: 'Every 100ms of latency is a broken promise. Compositor-friendly motion, lean bundles, honest Core Web Vitals.'
  },
  {
    title: 'Architecture under the hood',
    span: false,
    body: 'Monorepos, typed APIs, Prisma, Postgres. I care about the part users never see — because it decides what they feel.'
  },
  {
    title: 'Design systems',
    span: true,
    body: 'Tokens, components, documentation. Consistency at scale is how small teams ship like big ones.'
  }
]

export function Values() {
  return (
    <section id="values" className="border-t border-line px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="What I care about"
          subtitle="Not a skills list — a belief system. Every product decision I make runs through these."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} className={value.span ? 'md:col-span-2' : ''} delay={i * 60}>
              <article className="h-full rounded-2xl border border-line bg-glass p-7 backdrop-blur-md transition-colors duration-300 hover:border-signal/45">
                <h3 className="font-display text-lg">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
