import { getCategories, getMenuItems } from '@/lib/data'
import { MenuClient } from '@/components/sections/MenuClient'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FALLBACK_CATEGORIES, FALLBACK_MENU_ITEMS } from '@/lib/fallback-data'

export async function Menu() {
  let [categories, menuItems] = await Promise.all([
    getCategories(),
    getMenuItems(),
  ])

  // Use fallback data if Supabase isn't configured yet
  if (categories.length === 0) {
    categories = FALLBACK_CATEGORIES
    menuItems = FALLBACK_MENU_ITEMS
  }

  return (
    <section id="menu" className="py-16 sm:py-24 lg:py-32 bg-[rgb(18_13_10)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <span className="section-label block mb-3 sm:mb-4">Curated with Care</span>
          <h2 className="section-title mb-3 sm:mb-4">Our Menu</h2>
          <div className="divider-gold w-24 mx-auto mb-4 sm:mb-6" />
          <p className="section-subtitle mx-auto text-center px-4">
            Seasonal ingredients, classical techniques, and a relentless pursuit of flavour — every dish is a conversation.
          </p>
        </ScrollReveal>

        {/* Interactive Menu */}
        <MenuClient categories={categories} menuItems={menuItems} />
      </div>
    </section>
  )
}
