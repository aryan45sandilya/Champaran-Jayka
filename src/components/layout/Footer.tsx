import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import type { RestaurantSettings } from '@/types/database'

const footerLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Bestsellers', href: '#bestsellers' },
  { label: 'About', href: '#about' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
]

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}
function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}
function TwitterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  )
}

const socialLinks = [
  { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
]

const FALLBACK: Pick<RestaurantSettings, 'address' | 'phone1' | 'phone2' | 'email' | 'hours'> = {
  address: '280, Pratap Vihar Rd, Sector 12, Block J, Pratap Vihar, Ghaziabad, UP – 201009',
  phone1: '+91 76677 51506',
  phone2: '+91 99344 12330',
  email: 'champaranjayka@gmail.com',
  hours: [
    { day: 'Monday – Friday', time: '11:00 AM – 10:00 PM' },
    { day: 'Saturday – Sunday', time: '10:00 AM – 11:00 PM' },
  ],
}

export async function Footer() {
  const supabase = await createServerClient()
  const { data } = await (supabase as any)
    .from('restaurant_settings')
    .select('address, phone1, phone2, email, hours')
    .eq('id', 'main')
    .single()

  const info = data ?? FALLBACK
  return (
    <footer className="bg-[rgb(10_7_5)] border-t border-[rgb(30_22_18)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-display text-2xl text-[rgb(245_240_235)] block">
                Champaran&apos;s Jayka
              </span>
              <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[rgb(196_142_72)] font-medium">
                Taste Like Home
              </span>
            </div>
            <p className="text-sm text-[rgb(140_120_100)] leading-relaxed mb-6">
              Where every dish tastes like home and every visit feels like family.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-[rgb(45_35_28)] flex items-center justify-center text-[rgb(140_120_100)] hover:text-[rgb(196_142_72)] hover:border-[rgb(196_142_72/0.5)] transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-[rgb(196_142_72)] font-semibold mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[rgb(140_120_100)] hover:text-[rgb(245_240_235)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-[rgb(196_142_72)] font-semibold mb-5">
              Hours
            </h3>
            <ul className="space-y-3">
              {(info.hours as { day: string; time: string }[]).map(({ day, time }) => (
                <li key={day} className="flex items-start gap-2">
                  <Clock size={13} className="text-[rgb(196_142_72)] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-sm text-[rgb(200_185_165)] block">{day}</span>
                    <span className="text-xs text-[rgb(140_120_100)]">{time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-[rgb(196_142_72)] font-semibold mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-[rgb(196_142_72)] mt-0.5 shrink-0" />
                <span className="text-sm text-[rgb(140_120_100)] leading-relaxed whitespace-pre-line">
                  {info.address}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={13} className="text-[rgb(196_142_72)] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  {info.phone1 && (
                    <a href={`tel:${info.phone1.replace(/\s/g, '')}`} className="text-sm text-[rgb(140_120_100)] hover:text-[rgb(245_240_235)] transition-colors">
                      {info.phone1}
                    </a>
                  )}
                  {info.phone2 && (
                    <a href={`tel:${info.phone2.replace(/\s/g, '')}`} className="text-sm text-[rgb(140_120_100)] hover:text-[rgb(245_240_235)] transition-colors">
                      {info.phone2}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-[rgb(196_142_72)] shrink-0" />
                <a href={`mailto:${info.email}`} className="text-sm text-[rgb(140_120_100)] hover:text-[rgb(245_240_235)] transition-colors">
                  {info.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-gold mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[rgb(100_85_70)]">
            © {new Date().getFullYear()} Champaran&apos;s Jayka. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[rgb(100_85_70)] hover:text-[rgb(200_185_165)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-[rgb(100_85_70)] hover:text-[rgb(200_185_165)] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
