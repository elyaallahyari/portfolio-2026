import type { Metadata } from 'next'
import Link from 'next/link'
import { formatPostDate, getAllWritingPosts } from '@/lib/writing'
import { Reveal } from '@/components/ui/reveal'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes from the workbench — AI-UX patterns, trust in interfaces, accessibility, and what I learn building in public.'
}

export default function WritingIndexPage() {
  const posts = getAllWritingPosts()

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
      <Reveal>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Writing<span className="text-signal">.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Notes from the workbench — AI-UX patterns, trust in interfaces, accessibility, and what I
          learn building in public.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 60}>
            <Link
              href={`/writing/${post.slug}`}
              className="group block rounded-2xl border border-line bg-glass p-8 backdrop-blur-md transition-colors duration-300 hover:border-signal/40 md:p-9"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-sm text-muted">
                <span>{formatPostDate(post.frontmatter.date)}</span>
                <span aria-hidden="true">·</span>
                <span className="text-trust">{post.readingTime}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl tracking-tight text-cream">
                {post.frontmatter.title}
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted">
                {post.frontmatter.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                aria-hidden="true"
                className="mt-5 inline-block font-semibold text-cream transition-colors group-hover:text-signal"
              >
                Read post →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
