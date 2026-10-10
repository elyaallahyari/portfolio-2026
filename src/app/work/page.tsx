import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllCaseStudies } from '@/lib/case-studies'
import { Reveal } from '@/components/ui/reveal'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies in frontend craft and human-centered AI — decisions, trade-offs and failures included.'
}

const statusStyles: Record<string, string> = {
  Shipped: 'border-signal/40 text-signal',
  'In progress': 'border-trust/40 text-trust',
  Planned: 'border-line text-muted'
}

export default function WorkIndexPage() {
  const studies = getAllCaseStudies()

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
      <Reveal>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Selected work<span className="text-signal">.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Deep dives into products at the intersection of frontend craft and human-centered AI —
          decisions, trade-offs and failures included.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5">
        {studies.map((study, i) => (
          <Reveal key={study.slug} delay={i * 60}>
            <Link
              href={`/work/${study.slug}`}
              className="group block rounded-2xl border border-line bg-glass p-8 backdrop-blur-md transition-colors duration-300 hover:border-signal/40 md:p-9"
            >
              <div className="flex items-center justify-between font-display text-sm text-muted">
                <span>{String(study.frontmatter.order).padStart(2, '0')}</span>
                <span
                  className={`rounded-full border px-3 py-1 text-xs ${
                    statusStyles[study.frontmatter.status] ?? statusStyles.Planned
                  }`}
                >
                  {study.frontmatter.status}
                </span>
              </div>
              <h2 className="mt-5 font-display text-2xl tracking-tight text-cream">
                {study.frontmatter.title}
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted">
                {study.frontmatter.summary}
              </p>
              <p className="mt-4 font-display text-sm text-trust">{study.frontmatter.stack}</p>
              <span className="mt-5 inline-block font-semibold text-cream transition-colors group-hover:text-signal">
                Read case study →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
