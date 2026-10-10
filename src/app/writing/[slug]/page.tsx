import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { formatPostDate, getAllWritingPosts, getWritingPostBySlug } from '@/lib/writing'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { Reveal } from '@/components/ui/reveal'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllWritingPosts().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getWritingPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: 'article'
    }
  }
}

export default async function WritingPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getWritingPostBySlug(slug)
  if (!post) notFound()

  const { frontmatter, content, readingTime } = post

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      <Reveal>
        <Link
          href="/writing"
          className="text-sm font-medium text-muted transition-colors hover:text-cream"
        >
          ← All writing
        </Link>
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-sm text-muted">
            <span>{formatPostDate(frontmatter.date)}</span>
            <span aria-hidden="true">·</span>
            <span className="text-trust">{readingTime}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {frontmatter.title}
            <span className="text-signal">.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{frontmatter.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
      </Reveal>

      <hr className="mt-10 border-line" />

      <Reveal delay={100}>
        <MDXRemote source={content} components={mdxComponents} />
      </Reveal>

      <Reveal delay={150}>
        <div className="mt-16 rounded-2xl border border-line bg-glass p-8 text-center backdrop-blur-md">
          <p className="font-display text-lg text-cream">Disagree? Spotted a pattern I missed?</p>
          <p className="mt-2 text-sm text-muted">
            I&apos;d genuinely love to hear it — that&apos;s how the list gets better.
          </p>
          <a href="mailto:elyaallahyari@gmail.com" className="btn-primary mt-5">
            Reply to this post
          </a>
        </div>
      </Reveal>
    </article>
  )
}
