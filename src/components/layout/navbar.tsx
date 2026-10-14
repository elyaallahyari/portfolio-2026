'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/site-config'

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

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
            className="hidden rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-signal md:block"
          >
            Contact
          </Link>

          {/* mobile disclosure — audit fix #2 */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-signal md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-cream transition-colors hover:bg-glass"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl bg-cream px-3 py-3 text-center text-base font-semibold text-ink transition-colors hover:bg-signal"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
