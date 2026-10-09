import { Hero } from '@/components/sections/hero'
import { Values } from '@/components/sections/values'
import { Work } from '@/components/sections/work'
import { Process } from '@/components/sections/process'
import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Values />
      <Work />
      <Process />
      <About />
      <Contact />
    </>
  )
}
