import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-[72vh] flex-col items-center justify-center px-6 text-center">
      <p
        aria-hidden="true"
        className="font-display text-[clamp(5rem,18vw,11rem)] font-bold leading-none tracking-tight text-muted/40"
      >
        404<span className="text-signal">.</span>
      </p>
      <h1 className="mt-6 max-w-xl font-display text-2xl font-bold tracking-tight text-cream md:text-3xl">
        This page failed gracefully — that&apos;s kind of our thing.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted">
        A good failure state names what broke and offers the next step — so here&apos;s ours: the
        page you asked for doesn&apos;t exist (yet).
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/work" className="btn-ghost">
          Browse work instead
        </Link>
      </div>
    </section>
  )
}
