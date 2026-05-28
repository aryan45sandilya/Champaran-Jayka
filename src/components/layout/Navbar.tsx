'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Bestsellers', href: '#bestsellers' },
  { label: 'About', href: '#about' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = [...navLinks].map((l) => l.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgb(14_10_8/0.96)] backdrop-blur-md border-b border-[rgb(45_35_28)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">

            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col leading-none group shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="font-display text-base sm:text-xl lg:text-2xl text-[rgb(245_240_235)] tracking-tight group-hover:text-[rgb(196_142_72)] transition-colors duration-300">
                Champaran&apos;s Jayka
              </span>
              <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[rgb(196_142_72)] font-medium">
                Taste Like Home
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const id = link.href.replace('#', '')
                const isActive = activeSection === id
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200 relative group py-1 ${
                      isActive ? 'text-[rgb(196_142_72)]' : 'text-[rgb(200_185_165)] hover:text-[rgb(245_240_235)]'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-[rgb(196_142_72)] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </button>
                )
              })}
            </nav>

            {/* Mobile toggle — large touch target */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-3 -mr-2 text-[rgb(200_185_165)] hover:text-[rgb(245_240_235)] transition-colors touch-manipulation"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu — full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[rgb(10_7_5/0.98)] backdrop-blur-lg flex flex-col"
          >
            {/* Close button top-right */}
            <div className="flex justify-end px-4 pt-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-3 text-[rgb(200_185_165)] hover:text-[rgb(245_240_235)] transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center flex-1 gap-6 pb-16">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNavClick(link.href)}
                  className="font-display text-2xl sm:text-3xl text-[rgb(245_240_235)] hover:text-[rgb(196_142_72)] transition-colors duration-200 py-2 px-8 touch-manipulation"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
