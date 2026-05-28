import { ScrollReveal } from '@/components/ui/ScrollReveal'

const galleryImages = [
  {
    src: 'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/1.png',
    alt: "Champaran's Jayka food",
    className: 'col-span-2 row-span-2',
  },
  {
    src: 'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/2.png',
    alt: "Champaran's Jayka dish",
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/lassi%20and%20litti.png',
    alt: 'Lassi and Litti',
    className: 'col-span-1 row-span-1',
  },
]

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 bg-[rgb(14_10_8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

          {/* Text */}
          <div>
            <ScrollReveal>
              <span className="section-label block mb-3 sm:mb-4">Our Story</span>
              <h2 className="section-title mb-4 sm:mb-6">
                Rooted in Champaran Tradition,<br />
                <span className="text-[rgb(196_142_72)] italic">Crafted with Love & Indian Flavours</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="divider-gold w-16 mb-6 sm:mb-8" />
              <p className="text-[rgb(160_140_120)] leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
                Champaran&apos;s Jayka was born from a passion to preserve the authentic taste of Bihar&apos;s legendary Champaran-style cooking. Inspired by age-old family recipes and the rich culinary traditions of Indian kitchens, every dish we serve carries the warmth of home and the soul of tradition.
              </p>
              <p className="text-[rgb(150_130_110)] leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
                From slow-cooked handi meats and smoky village-style spices to comforting dals, tandoori delights, and flavorful Indian classics, our menu celebrates the diversity of Indian cuisine while staying deeply rooted in the authentic Champaran essence.
              </p>
              <p className="text-[rgb(140_120_100)] leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
                Every recipe is prepared with handpicked ingredients, traditional cooking techniques, and a touch of love that turns every meal into an unforgettable experience. Whether it&apos;s the aroma of mustard oil, the richness of hand-ground masalas, or the warmth of freshly cooked rotis, each bite brings you closer to the true flavours of India.
              </p>
              <p className="text-[rgb(196_142_72)] leading-relaxed font-medium italic text-sm sm:text-base">
                At Champaran&apos;s Jayka, food is not just served — it is lovingly crafted to make you feel at home.
              </p>
            </ScrollReveal>
          </div>

          {/* Image Grid — responsive height */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 h-[260px] sm:h-[360px] lg:h-[480px] mt-8 lg:mt-0">
              {galleryImages.map((img, i) => (
                <div key={i} className={`${img.className} overflow-hidden rounded-sm`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
