'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Star, CheckCircle, XCircle, X, ZoomIn } from 'lucide-react'
import type { Category, MenuItem } from '@/types/database'

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative w-full sm:max-w-lg bg-[rgb(18_13_10)] border border-[rgb(45_35_28)] rounded-t-xl sm:rounded-sm overflow-hidden shadow-warm"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 bg-[rgb(14_10_8/0.8)] backdrop-blur-sm rounded-full text-[rgb(200_185_165)] hover:text-white transition-colors touch-manipulation"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Image */}
          <div className="w-full aspect-[4/3] overflow-hidden bg-[rgb(14_10_8)]">
            <img src={item.image_url!} alt={item.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display text-lg sm:text-xl text-[rgb(245_240_235)]">{item.name}</h2>
                <span
                  className={`w-3.5 h-3.5 rounded-sm border-2 shrink-0 ${item.is_veg ? 'border-green-600 bg-green-500' : 'border-red-700 bg-red-600'}`}
                  title={item.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}
                />
              </div>
              <div className="shrink-0 text-right">
                {item.price_quarter || item.price_half || item.price_full ? (
                  <div className="flex flex-col gap-1 items-end">
                    {item.price_quarter && <span className="text-xs bg-[rgb(30_22_18)] border border-[rgb(45_35_28)] rounded-sm px-2 py-0.5"><span className="text-[rgb(120_100_85)]">Qtr </span><span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_quarter}</span></span>}
                    {item.price_half    && <span className="text-xs bg-[rgb(30_22_18)] border border-[rgb(45_35_28)] rounded-sm px-2 py-0.5"><span className="text-[rgb(120_100_85)]">Half </span><span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_half}</span></span>}
                    {item.price_full    && <span className="text-xs bg-[rgb(30_22_18)] border border-[rgb(45_35_28)] rounded-sm px-2 py-0.5"><span className="text-[rgb(120_100_85)]">Full </span><span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_full}</span></span>}
                  </div>
                ) : (
                  <span className="text-[rgb(196_142_72)] font-semibold text-lg">₹{item.price.toFixed(0)}</span>
                )}
              </div>
            </div>

            {item.description && (
              <p className="text-sm text-[rgb(140_120_100)] leading-relaxed mb-3">{item.description}</p>
            )}

            <div className="flex items-center gap-3 flex-wrap">
              {item.is_spicy       && <span className="flex items-center gap-1 text-orange-400 text-xs font-semibold"><Flame size={12} /> Spicy</span>}
              {item.is_chef_special && <span className="flex items-center gap-1 text-[rgb(196_142_72)] text-xs font-semibold"><Star size={12} fill="currentColor" /> Chef&apos;s Special</span>}
              {item.is_bestseller  && <span className="text-[rgb(196_142_72)] text-xs font-semibold">⭐ Bestseller</span>}
              {!item.is_available  && <span className="text-[rgb(100_85_70)] text-xs border border-[rgb(45_35_28)] px-2 py-0.5 rounded-sm">Currently Unavailable</span>}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function MenuClient({ categories, menuItems }: { categories: Category[]; menuItems: MenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? '')
  const [zoomedItem, setZoomedItem] = useState<MenuItem | null>(null)

  const filtered = menuItems.filter((item) => item.category_id === activeCategory)

  return (
    <>
      <div>
        {/* Category Tabs — scrollable on mobile */}
        <div className="flex gap-2 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-4 sm:px-6 py-2 sm:py-2.5 text-xs tracking-[0.12em] uppercase font-semibold transition-all duration-200 rounded-sm whitespace-nowrap shrink-0 touch-manipulation ${
                activeCategory === cat.id
                  ? 'text-[rgb(14_10_8)] bg-[rgb(196_142_72)]'
                  : 'text-[rgb(140_120_100)] border border-[rgb(45_35_28)] hover:text-[rgb(200_185_165)]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5"
          >
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-16 text-[rgb(100_85_70)]">
                <p className="text-sm">No items in this category yet.</p>
              </div>
            ) : (
              filtered.map((item, i) => (
                <MenuItemRow key={item.id} item={item} index={i} onZoom={() => item.image_url && setZoomedItem(item)} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {zoomedItem && <Lightbox item={zoomedItem} onClose={() => setZoomedItem(null)} />}
    </>
  )
}

// ── Row ───────────────────────────────────────────────────────────────────────
function MenuItemRow({ item, index, onZoom }: { item: MenuItem; index: number; onZoom: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="group flex gap-3 sm:gap-4 p-3 sm:p-4 bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] hover:border-[rgb(196_142_72/0.25)] rounded-sm transition-all duration-300"
    >
      {/* Clickable image */}
      {item.image_url && (
        <button
          onClick={onZoom}
          className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-sm overflow-hidden relative touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(196_142_72)]"
          aria-label={`View ${item.name}`}
        >
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow" />
          </div>
        </button>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <h3
              onClick={item.image_url ? onZoom : undefined}
              className={`font-display text-sm sm:text-base text-[rgb(245_240_235)] leading-tight ${item.image_url ? 'cursor-pointer hover:text-[rgb(196_142_72)] transition-colors' : ''}`}
            >
              {item.name}
            </h3>
            <span
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm border-2 shrink-0 ${item.is_veg ? 'border-green-600 bg-green-500' : 'border-red-700 bg-red-600'}`}
              title={item.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}
            />
          </div>

          {/* Price */}
          <div className="shrink-0 text-right">
            {item.price_quarter || item.price_half || item.price_full ? (
              <div className="flex flex-col gap-0.5 items-end">
                {item.price_quarter && <span className="text-[0.65rem] sm:text-xs bg-[rgb(30_22_18)] border border-[rgb(45_35_28)] rounded-sm px-1.5 py-0.5"><span className="text-[rgb(120_100_85)]">Qtr </span><span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_quarter}</span></span>}
                {item.price_half    && <span className="text-[0.65rem] sm:text-xs bg-[rgb(30_22_18)] border border-[rgb(45_35_28)] rounded-sm px-1.5 py-0.5"><span className="text-[rgb(120_100_85)]">Half </span><span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_half}</span></span>}
                {item.price_full    && <span className="text-[0.65rem] sm:text-xs bg-[rgb(30_22_18)] border border-[rgb(45_35_28)] rounded-sm px-1.5 py-0.5"><span className="text-[rgb(120_100_85)]">Full </span><span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_full}</span></span>}
              </div>
            ) : (
              <span className="text-[rgb(196_142_72)] font-semibold text-xs sm:text-sm">₹{item.price.toFixed(0)}</span>
            )}
          </div>
        </div>

        <p className="text-[0.7rem] sm:text-xs text-[rgb(120_100_85)] leading-relaxed mb-1.5 sm:mb-2 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {item.is_spicy        && <span className="flex items-center gap-0.5 text-orange-400 text-[0.6rem] tracking-wider uppercase font-semibold"><Flame size={9} /> Spicy</span>}
          {item.is_chef_special && <span className="flex items-center gap-0.5 text-[rgb(196_142_72)] text-[0.6rem] tracking-wider uppercase font-semibold"><Star size={9} fill="currentColor" /> Chef&apos;s Special</span>}
          {item.is_bestseller   && <span className="text-[rgb(196_142_72)] text-[0.6rem] tracking-wider uppercase font-semibold">Bestseller</span>}
          <span className={`flex items-center gap-0.5 text-[0.6rem] tracking-wider uppercase font-semibold ml-auto ${item.is_available ? 'text-green-500' : 'text-[rgb(100_85_70)]'}`}>
            {item.is_available ? <><CheckCircle size={9} /> Available</> : <><XCircle size={9} /> Unavailable</>}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
