import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ContactForm } from '@/components/sections/ContactForm'

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-[rgb(14_10_8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal className="text-center mb-8 sm:mb-10">
            <span className="section-label block mb-3 sm:mb-4">Contact Us</span>
            <h2 className="section-title mb-3 sm:mb-4">
              Send Us a <span className="text-[rgb(196_142_72)] italic">Message</span>
            </h2>
            <div className="divider-gold w-24 mx-auto mb-4 sm:mb-6" />
            <p className="text-[rgb(160_140_120)] leading-relaxed text-sm sm:text-base px-4">
              Have a question or want to plan a visit? Fill out the form and we&apos;ll get back to you shortly.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
