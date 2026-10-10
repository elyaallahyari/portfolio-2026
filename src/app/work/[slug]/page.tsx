import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/case-studies'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { Reveal } from '@/components/ui/reveal'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllCaseStudies().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return {}
  return {
    title: study.frontmatter.title,
    description: study.frontmatter.summary,
    openGraph: {
      title: study.frontmatter.title,
      description: study.frontmatter.summary,
      type: 'article'
    }
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) notFound()

  const { frontmatter, content } = study

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      <Reveal>
        <Link
          href="/work"
          className="text-sm font-medium text-muted transition-colors hover:text-cream"
        >
          ← All work
        </Link>
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-sm text-muted">
            <span>{frontmatter.year}</span>
            <span aria-hidden="true">·</span>
            <span className="text-trust">{frontmatter.status}</span>
            <span aria-hidden="true">·</span>
            <span>{frontmatter.stack}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {frontmatter.title}
            <span className="text-signal">.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{frontmatter.summary}</p>
        </header>
      </Reveal>

      <hr className="mt-10 border-line" />

      <Reveal delay={100}>
        <MDXRemote source={content} components={mdxComponents} />
      </Reveal>

      <Reveal delay={150}>
        <div className="mt-16 rounded-2xl border border-line bg-glass p-8 text-center backdrop-blur-md">
          <p className="font-display text-lg text-cream">Questions about this project?</p>
          <a href="mailto:elyaallahyari@gmail.com" className="btn-primary mt-4">
            Get in touch
          </a>
        </div>
      </Reveal>
    </article>
  )
}
