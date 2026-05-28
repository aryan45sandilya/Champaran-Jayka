import { getBestsellers } from '@/lib/data'
import { BestsellerCard } from '@/components/ui/BestsellerCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FALLBACK_BESTSELLERS } from '@/lib/fallback-data'

export async function Bestsellers() {
  let items = await getBestsellers()
  if (items.length === 0) items = FALLBACK_BESTSELLERS

  return (
    <section id="bestsellers" className="py-16 sm:py-24 lg:py-32 bg-[rgb(14_10_8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <span className="section-label block mb-3 sm:mb-4">Chef&apos;s Selection</span>
          <h2 className="section-title mb-3 sm:mb-4">Our Bestsellers</h2>
          <div className="divider-gold w-24 mx-auto mb-4 sm:mb-6" />
          <p className="section-subtitle mx-auto text-center px-4">
            Dishes that have earned a permanent place on our menu — loved by guests, perfected by our kitchen.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {items.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <BestsellerCard item={item} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10 sm:mt-14" delay={0.2}>
          <a href="#menu" className="btn-outline inline-block">
            View Full Menu
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
