import Link from 'next/link'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'

const projects = [
  {
    index: '01',
    year: '2026 · In progress',
    title: 'AI-UX Kit',
    body: 'A trust-first open-source component library for AI interfaces — streaming markdown, citations, confidence states, human-in-the-loop controls. The missing AI layer for shadcn/ui.',
    stack: 'React · TypeScript · Vercel AI SDK · Tailwind · npm',
    href: '#'
  },
  {
    index: '02',
    year: '2026',
    title: 'TaskLine Copilot',
    body: 'From CRUD workspace to AI-native: natural-language task capture, AI breakdowns with plan preview before bulk edits, full undo, visible confidence. Version 1 lives at taskline-elya.vercel.app.',
    stack: 'Next.js · NestJS · Prisma · PostgreSQL · dnd-kit',
    href: '#'
  },
  {
    index: '03',
    year: '2026 · Planned',
    title: 'A11y Copilot',
    body: 'An AI agent that scans sites for EAA/WCAG 2.1 AA failures, explains each in plain language, and proposes fixes — with human review before anything changes.',
    stack: 'Next.js · Puppeteer · LLM agents · WCAG 2.1',
    href: '#'
  }
]

export function Work() {
  return (
    <section id="work" className="border-t border-line px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Selected work"
          subtitle="Three products at the intersection of frontend craft and human-centered AI."
        />
        <div className="mt-12 grid gap-5">
          {projects.map((project) => (
            <Reveal key={project.title}>
              <article className="group relative overflow-hidden rounded-2xl border border-line bg-glass p-8 backdrop-blur-md transition-colors duration-300 hover:border-signal/40 md:p-9">
                <div className="flex items-center justify-between font-display text-sm text-muted">
                  <span>{project.index}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl tracking-tight">{project.title}</h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted">{project.body}</p>
                <p className="mt-4 font-display text-sm text-trust">{project.stack}</p>
                <Link
                  href={project.href}
                  aria-label={`Read ${project.title} case study`}
                  className="mt-5 inline-block font-semibold text-cream transition-colors group-hover:text-signal"
                >
                  Read case study →
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
