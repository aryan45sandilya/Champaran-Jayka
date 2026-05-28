import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import type { RestaurantSettings } from '@/types/database'

const FALLBACK: RestaurantSettings = {
  id: 'main',
  address: '280, Pratap Vihar Rd, Sector 12, Block J, Pratap Vihar, Ghaziabad, Uttar Pradesh – 201009',
  maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.3144533897807!2d77.40577318097343!3d28.65030181288328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf02507fb7f87%3A0x4c3472513c6cbce7!2s280%2C%20Pratap%20Vihar%20Rd%2C%20Sector%2012%2C%20Block%20J%2C%20Pratap%20Vihar%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201009!5e0!3m2!1sen!2sin!4v1779963833912!5m2!1sen!2sin',
  maps_directions_url: 'https://maps.google.com/?q=280,+Pratap+Vihar+Rd,+Sector+12,+Block+J,+Pratap+Vihar,+Ghaziabad,+Uttar+Pradesh+201009',
  phone1: '+91 76677 51506',
  phone2: '+91 99344 12330',
  email: 'champaranjayka@gmail.com',
  hours: [
    { day: 'Monday – Friday', time: '11:00 AM – 10:00 PM' },
    { day: 'Saturday – Sunday', time: '10:00 AM – 11:00 PM' },
  ],
  updated_at: '',
}

export async function Location() {
  const supabase = await createServerClient()
  const { data } = await (supabase as any).from('restaurant_settings').select('*').eq('id', 'main').single()
  const info: RestaurantSettings = data ?? FALLBACK

  return (
    <section id="location" className="py-16 sm:py-24 lg:py-32 bg-[rgb(18_13_10)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <span className="section-label block mb-3 sm:mb-4">Find Us</span>
          <h2 className="section-title mb-3 sm:mb-4">Location & Hours</h2>
          <div className="divider-gold w-24 mx-auto" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Map */}
          <ScrollReveal direction="right">
            <div className="rounded-sm overflow-hidden border border-[rgb(35_26_20)] shadow-warm h-[280px] sm:h-[380px] lg:h-[500px]">
              <iframe
                src={info.maps_embed_url}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Champaran's Jayka location map"
              />
            </div>
          </ScrollReveal>

          {/* Info */}
          <div className="space-y-6 sm:space-y-8">

            <ScrollReveal delay={0.1}>
              <div className="flex gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgb(196_142_72/0.1)] border border-[rgb(196_142_72/0.2)] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={16} className="text-[rgb(196_142_72)]" />
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.15em] uppercase text-[rgb(196_142_72)] font-semibold mb-2">Address</h3>
                  <p className="text-sm sm:text-base text-[rgb(200_185_165)] leading-relaxed">{info.address}</p>
                  <a href={info.maps_directions_url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[rgb(196_142_72)] hover:text-[rgb(220_165_90)] transition-colors mt-2 inline-block tracking-wider uppercase font-medium">
                    Get Directions →
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="flex gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgb(196_142_72/0.1)] border border-[rgb(196_142_72/0.2)] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={16} className="text-[rgb(196_142_72)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs tracking-[0.15em] uppercase text-[rgb(196_142_72)] font-semibold mb-3">Opening Hours</h3>
                  <ul className="space-y-2">
                    {info.hours.map(({ day, time }) => (
                      <li key={day} className="flex flex-col xs:flex-row xs:justify-between gap-0.5 xs:gap-4 text-sm">
                        <span className="text-[rgb(160_140_120)]">{day}</span>
                        <span className="text-[rgb(200_185_165)] font-medium">{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgb(196_142_72/0.1)] border border-[rgb(196_142_72/0.2)] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={16} className="text-[rgb(196_142_72)]" />
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.15em] uppercase text-[rgb(196_142_72)] font-semibold mb-2">Call Us</h3>
                  {info.phone1 && <a href={`tel:${info.phone1.replace(/\s/g, '')}`} className="text-sm text-[rgb(200_185_165)] hover:text-[rgb(245_240_235)] transition-colors block py-0.5">{info.phone1}</a>}
                  {info.phone2 && <a href={`tel:${info.phone2.replace(/\s/g, '')}`} className="text-sm text-[rgb(200_185_165)] hover:text-[rgb(245_240_235)] transition-colors block py-0.5">{info.phone2}</a>}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="flex gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgb(196_142_72/0.1)] border border-[rgb(196_142_72/0.2)] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={16} className="text-[rgb(196_142_72)]" />
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.15em] uppercase text-[rgb(196_142_72)] font-semibold mb-2">Email</h3>
                  <a href={`mailto:${info.email}`} className="text-sm text-[rgb(200_185_165)] hover:text-[rgb(245_240_235)] transition-colors break-all">{info.email}</a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <a href="#contact" className="btn-primary inline-block w-full sm:w-auto text-center">Make a Reservation</a>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  )
}
