import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'

const steps = [
  {
    num: '01',
    title: 'Understand',
    body: "Talk to the people who'll use it. Find the real friction, not the assumed one."
  },
  {
    num: '02',
    title: 'Prototype fast',
    body: 'Ugly and live beats perfect and imaginary. Days, not weeks.'
  },
  {
    num: '03',
    title: 'Evaluate with humans',
    body: "Think-aloud sessions, task success, where trust breaks. Watch, don't guess."
  },
  {
    num: '04',
    title: 'Ship & measure',
    body: 'Instrument, learn, iterate. The first version is a hypothesis, not a monument.'
  }
]

export function Process() {
  return (
    <section id="process" className="border-t border-line px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="How I work"
          subtitle="A human-centered process — borrowed from HCI research, tuned for shipping."
        />
        <ol className="mt-12 grid list-none gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <li className="border-l border-line pl-6">
                <span className="font-display text-sm font-bold text-signal">{step.num}</span>
                <h3 className="mt-2 font-display text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
