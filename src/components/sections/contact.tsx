// → components/sections/contact.tsx
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { siteConfig } from '@/lib/site-config'

export function Contact() {
  return (
    <section id="contact" className="border-t border-line px-6 py-24 text-center lg:px-10">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Let's talk" />
        <Reveal delay={100}>
          <p className="mt-4 text-lg text-muted">
            Admissions committees, recruiters, builders — my inbox is open.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a className="btn-primary" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <a
              className="btn-ghost"
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="btn-ghost"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
