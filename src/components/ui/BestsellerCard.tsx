'use client'

import { motion } from 'framer-motion'
import { Flame, Star } from 'lucide-react'
import type { MenuItem } from '@/types/database'

export function BestsellerCard({ item }: { item: MenuItem }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&auto=format&fit=crop'

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group bg-[rgb(22_16_12)] rounded-sm overflow-hidden border border-[rgb(35_26_20)] hover:border-[rgb(196_142_72/0.3)] transition-all duration-300 shadow-warm h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden shrink-0">
        <img
          src={item.image_url || fallbackImage}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(22_16_12)] via-transparent to-transparent opacity-60" />

        {/* Badges top-left */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1.5 flex-wrap max-w-[70%]">
          {item.is_veg ? (
            <span className="flex items-center gap-1 bg-[rgb(14_10_8/0.85)] backdrop-blur-sm border border-green-700/50 text-green-400 text-[0.6rem] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block shrink-0" />
              Veg
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-[rgb(14_10_8/0.85)] backdrop-blur-sm border border-red-800/50 text-red-400 text-[0.6rem] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block shrink-0" />
              Non-Veg
            </span>
          )}
          {item.is_spicy && (
            <span className="flex items-center gap-1 bg-[rgb(14_10_8/0.85)] backdrop-blur-sm border border-orange-700/50 text-orange-400 text-[0.6rem] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-sm">
              <Flame size={9} />
              Spicy
            </span>
          )}
        </div>

        {item.is_chef_special && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <span className="flex items-center gap-1 bg-[rgb(196_142_72)] text-[rgb(14_10_8)] text-[0.6rem] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-sm">
              <Star size={9} fill="currentColor" />
              Chef&apos;s Special
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-base sm:text-lg text-[rgb(245_240_235)] leading-tight group-hover:text-[rgb(220_200_175)] transition-colors">
            {item.name}
          </h3>
          <div className="shrink-0 text-right">
            {item.price_quarter || item.price_half || item.price_full ? (
              <div className="flex flex-col gap-0.5 items-end">
                {item.price_quarter && <span className="text-xs text-[rgb(160_140_120)]">Qtr <span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_quarter}</span></span>}
                {item.price_half    && <span className="text-xs text-[rgb(160_140_120)]">Half <span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_half}</span></span>}
                {item.price_full    && <span className="text-xs text-[rgb(160_140_120)]">Full <span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_full}</span></span>}
              </div>
            ) : (
              <span className="text-[rgb(196_142_72)] font-semibold text-sm sm:text-base">
                ₹{item.price.toFixed(0)}
              </span>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[rgb(140_120_100)] leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        {!item.is_available && (
          <span className="inline-block mt-3 text-[0.65rem] tracking-wider uppercase text-[rgb(100_85_70)] border border-[rgb(45_35_28)] px-2 py-0.5 rounded-sm">
            Currently Unavailable
          </span>
        )}
      </div>
    </motion.article>
  )
}
