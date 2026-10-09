import { siteConfig } from '@/lib/site-config'
import Link from 'next/link'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          {siteConfig.wordmark}
          <span className="text-signal">.</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-7">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden text-sm font-medium text-muted transition-colors hover:text-cream md:block"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-signal"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
