import { siteConfig } from '@/lib/site-config'

export function Footer() {
  return (
    <footer className="flex flex-wrap items-start justify-between gap-4 border-t border-line px-6 py-10 text-sm text-muted lg:px-10">
      <p>
        © {2026} {siteConfig.name} — designed & built by me.
      </p>
      <p className="max-w-md">
        This site is keyboard-navigable, respects{' '}
        <code className="text-trust">prefers-reduced-motion</code>, and targets WCAG 2.1 AA.
      </p>
    </footer>
  )
}
