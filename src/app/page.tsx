import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Bestsellers } from '@/components/sections/Bestsellers'
import { Menu } from '@/components/sections/Menu'
import { About } from '@/components/sections/About'
import { Location } from '@/components/sections/Location'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Bestsellers />
        <Menu />
        <About />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
