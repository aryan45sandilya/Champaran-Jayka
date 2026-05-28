'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

const BG_IMAGES = [
  'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/1.png',
  'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/2.png',
  'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/b10fd0ba-a979-4e31-891f-59daf2a2f1ec.png',
  'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/lassi%20and%20litti.png',
  'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/ethali.png',
  'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/md.png',
  'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/sp.png',
]

export function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BG_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Slideshow background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={BG_IMAGES[current]}
            alt="Champaran's Jayka"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[rgb(10_7_5/0.65)]" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgb(14 10 8 / 0.5) 70%, rgb(14 10 8) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgb(10 7 5 / 0.55) 100%)' }} />
      </div>

      {/* Slide dots — above scroll indicator */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2 flex-wrap justify-center px-4">
        {BG_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full min-w-[6px] min-h-[6px] ${
              i === current
                ? 'w-6 h-1.5 bg-[rgb(196_142_72)]'
                : 'w-1.5 h-1.5 bg-[rgb(255_255_255/0.35)] hover:bg-[rgb(255_255_255/0.6)]'
            }`}
          />
        ))}
      </div>

      {/* Content — padded to clear banner (28px) + navbar (56px) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 sm:pt-36 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 sm:mb-6"
        >
          <span className="section-label">Authentic Champaran</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-display text-[clamp(2.5rem,10vw,7rem)] font-normal leading-[1.05] tracking-tight text-[rgb(245_240_235)] mb-4 sm:mb-6"
          style={{ textShadow: '0 2px 24px rgb(0 0 0 / 0.6)' }}
        >
          Champaran&apos;s
          <br />
          <span className="text-[rgb(196_142_72)] italic">Jayka</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-[rgb(220_205_185)] text-base sm:text-lg lg:text-xl max-w-xl mx-auto mb-3 leading-relaxed font-medium"
          style={{ textShadow: '0 1px 12px rgb(0 0 0 / 0.5)' }}
        >
          Taste Like Home
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-[rgb(180_160_135)] text-sm sm:text-base max-w-sm sm:max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
          style={{ textShadow: '0 1px 8px rgb(0 0 0 / 0.5)' }}
        >
          Authentic flavours of Champaran — slow-cooked, spice-rich, and made with the love only a home kitchen knows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center px-4"
        >
          <button
            onClick={() => scrollToSection('menu')}
            className="btn-primary w-full max-w-xs sm:w-auto"
          >
            View Menu
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => scrollToSection('bestsellers')}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[rgb(196_142_72)] hover:text-[rgb(220_165_90)] transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[0.6rem] tracking-[0.2em] uppercase font-medium hidden sm:block">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
