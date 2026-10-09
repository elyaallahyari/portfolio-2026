import { Reveal } from './reveal'

type SectionHeadingProps = {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal>
      <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
        {title}
        <span className="text-signal">.</span>
      </h2>
      {subtitle ? <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p> : null}
    </Reveal>
  )
}
