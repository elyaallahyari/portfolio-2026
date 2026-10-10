/* eslint-disable @next/next/no-img-element */
import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-14 font-display text-2xl font-bold tracking-tight text-cream md:text-3xl"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-8 font-display text-xl font-semibold text-cream" {...props} />,
  p: (props) => <p className="mt-5 leading-relaxed text-muted" {...props} />,
  strong: (props) => <strong className="font-semibold text-cream" {...props} />,
  em: (props) => <em className="text-cream/90" {...props} />,
  a: (props) => (
    <a
      className="text-trust underline decoration-trust/40 underline-offset-4 transition-colors hover:decoration-trust"
      {...props}
    />
  ),
  ul: (props) => <ul className="mt-5 list-disc space-y-1.5 pl-6 text-muted" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-1.5 pl-6 text-muted" {...props} />,
  li: (props) => <li className="leading-relaxed marker:text-signal" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 rounded-r-2xl border-l-2 border-signal bg-glass px-6 py-4 text-cream/90"
      {...props}
    />
  ),
  hr: () => <hr className="mt-14 border-line" />,
  img: (props) => (
    <img alt="image" className="mt-8 rounded-2xl border border-line" loading="lazy" {...props} />
  ),
  code: (props) => (
    <code
      className="rounded-md bg-glass px-1.5 py-0.5 font-mono text-[0.9em] text-trust"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-2xl border border-line bg-ink-2 p-5 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-cream"
      {...props}
    />
  )
}
