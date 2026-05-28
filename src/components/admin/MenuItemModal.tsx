'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { X, Loader2 } from 'lucide-react'
import type { MenuItem, Category } from '@/types/database'

interface Props {
  item: MenuItem | null
  categories: Category[]
  onClose: () => void
  onSaved: (item: MenuItem, isNew: boolean) => void
}

type FormState = {
  name: string
  description: string
  price: string
  price_quarter: string
  price_half: string
  price_full: string
  category_id: string
  image_url: string
  is_veg: boolean
  is_spicy: boolean
  is_bestseller: boolean
  is_chef_special: boolean
  is_available: boolean
}

// Standalone — defined OUTSIDE the parent component so it never remounts on re-render
function PriceField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder: string
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <div className="flex items-center bg-[rgb(22_16_12)] border border-[rgb(45_35_28)] rounded focus-within:border-[rgb(196_142_72/0.6)] focus-within:shadow-[0_0_0_3px_rgb(196_142_72/0.08)] transition-all">
        <span className="pl-3 pr-2 text-sm text-[rgb(100_85_70)] select-none shrink-0">₹</span>
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const v = e.target.value
            if (v === '' || /^\d*\.?\d*$/.test(v)) onChange(v)
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[rgb(245_240_235)] text-sm py-3 pr-3 outline-none placeholder:text-[rgb(100_85_70)]"
        />
      </div>
    </div>
  )
}

// Standalone toggle — also outside to prevent remount
function ToggleField({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (val: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm text-[rgb(160_140_120)] group-hover:text-[rgb(200_185_165)] transition-colors">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
          value ? 'bg-[rgb(196_142_72)]' : 'bg-[rgb(45_35_28)]'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  )
}

export function MenuItemModal({ item, categories, onClose, onSaved }: Props) {
  const isNew = !item
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>({
    name: item?.name ?? '',
    description: item?.description ?? '',
    price: item?.price?.toString() ?? '',
    price_quarter: item?.price_quarter?.toString() ?? '',
    price_half: item?.price_half?.toString() ?? '',
    price_full: item?.price_full?.toString() ?? '',
    category_id: item?.category_id ?? categories[0]?.id ?? '',
    image_url: item?.image_url ?? '',
    is_veg: item?.is_veg ?? false,
    is_spicy: item?.is_spicy ?? false,
    is_bestseller: item?.is_bestseller ?? false,
    is_chef_special: item?.is_chef_special ?? false,
    is_available: item?.is_available ?? true,
  })

  const setField = (key: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const hasPortions = !!(form.price_quarter || form.price_half || form.price_full)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.category_id) {
      toast.error('Dish name and category are required')
      return
    }
    if (!form.price && !form.price_full && !form.price_half && !form.price_quarter) {
      toast.error('Enter at least one price')
      return
    }

    setLoading(true)
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: form.price_full
        ? parseFloat(form.price_full)
        : form.price ? parseFloat(form.price) : 0,
      price_quarter: form.price_quarter ? parseFloat(form.price_quarter) : null,
      price_half: form.price_half ? parseFloat(form.price_half) : null,
      price_full: form.price_full ? parseFloat(form.price_full) : null,
      category_id: form.category_id,
      image_url: form.image_url.trim() || null,
      is_veg: form.is_veg,
      is_spicy: form.is_spicy,
      is_bestseller: form.is_bestseller,
      is_chef_special: form.is_chef_special,
      is_available: form.is_available,
    }

    if (isNew) {
      const { data, error } = await (supabase as any)
        .from('menu_items').insert(payload).select().single()
      if (error) { toast.error('Failed to add item', { description: error.message }); setLoading(false); return }
      toast.success(`"${data.name}" added to menu`)
      onSaved(data, true)
    } else {
      const { data, error } = await (supabase as any)
        .from('menu_items').update(payload).eq('id', item!.id).select().single()
      if (error) { toast.error('Failed to update item', { description: error.message }); setLoading(false); return }
      toast.success(`"${data.name}" updated`)
      onSaved(data, false)
    }

    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[rgb(22_16_12)] border border-[rgb(45_35_28)] rounded-sm w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-warm">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgb(35_26_20)]">
          <h2 className="font-display text-xl text-[rgb(245_240_235)]">
            {isNew ? 'Add New Dish' : `Edit "${item?.name}"`}
          </h2>
          <button onClick={onClose} className="p-1 text-[rgb(100_85_70)] hover:text-[rgb(200_185_165)] transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Name */}
          <div>
            <label className="admin-label">Dish Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              placeholder="e.g. Champaran Mutton"
              className="input-dark"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="admin-label">Description</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setField('description', e.target.value)}
              placeholder="Short description of the dish..."
              className="input-dark resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="admin-label">Category *</label>
            <select
              value={form.category_id}
              onChange={(e) => setField('category_id', e.target.value)}
              className="input-dark"
              required
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Pricing */}
          <div className="bg-[rgb(18_13_10)] border border-[rgb(30_22_18)] rounded-sm p-4 space-y-3">
            <p className="text-xs tracking-wider uppercase text-[rgb(100_85_70)] font-semibold">
              Pricing — fill what applies
            </p>

            <div className="grid grid-cols-3 gap-3">
              <PriceField
                label="Quarter"
                value={form.price_quarter}
                onChange={(v) => setField('price_quarter', v)}
                placeholder="120"
              />
              <PriceField
                label="Half"
                value={form.price_half}
                onChange={(v) => setField('price_half', v)}
                placeholder="220"
              />
              <PriceField
                label="Full"
                value={form.price_full}
                onChange={(v) => setField('price_full', v)}
                placeholder="400"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[rgb(35_26_20)]" />
              <span className="text-[0.65rem] text-[rgb(80_65_55)] uppercase tracking-wider">or single price</span>
              <div className="flex-1 h-px bg-[rgb(35_26_20)]" />
            </div>

            <PriceField
              label="Single Price (drinks / desserts)"
              value={form.price}
              onChange={(v) => setField('price', v)}
              placeholder="150"
            />

            {hasPortions && (
              <p className="text-[0.65rem] text-[rgb(196_142_72)]">
                ✓ Portion pricing active — Quarter / Half / Full will show on menu
              </p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="admin-label">Image URL</label>
            <input
              type="url"
              value={form.image_url}
              onChange={(e) => setField('image_url', e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="input-dark"
            />
            {form.image_url && (
              <img
                src={form.image_url}
                alt="Preview"
                className="mt-2 h-24 w-full object-cover rounded-sm border border-[rgb(35_26_20)]"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            )}
          </div>

          {/* Toggles */}
          <div className="bg-[rgb(18_13_10)] border border-[rgb(30_22_18)] rounded-sm p-4 space-y-3">
            <p className="text-xs tracking-wider uppercase text-[rgb(100_85_70)] font-semibold mb-1">Properties</p>

            {/* Veg / Non-Veg selector */}
            <div>
              <p className="text-sm text-[rgb(160_140_120)] mb-2">Food Type</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setField('is_veg', true)}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-sm border text-sm font-medium transition-all ${
                    form.is_veg
                      ? 'bg-green-500/15 border-green-600 text-green-400'
                      : 'bg-[rgb(22_16_12)] border-[rgb(45_35_28)] text-[rgb(100_85_70)] hover:border-green-800 hover:text-green-600'
                  }`}
                >
                  <span className="w-3 h-3 rounded-sm border-2 border-green-600 bg-green-500 shrink-0" />
                  Vegetarian
                </button>
                <button
                  type="button"
                  onClick={() => setField('is_veg', false)}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-sm border text-sm font-medium transition-all ${
                    !form.is_veg
                      ? 'bg-red-500/15 border-red-700 text-red-400'
                      : 'bg-[rgb(22_16_12)] border-[rgb(45_35_28)] text-[rgb(100_85_70)] hover:border-red-900 hover:text-red-600'
                  }`}
                >
                  <span className="w-3 h-3 rounded-sm border-2 border-red-700 bg-red-600 shrink-0" />
                  Non-Vegetarian
                </button>
              </div>
            </div>

            <ToggleField label="Spicy"             value={form.is_spicy}        onChange={(v) => setField('is_spicy', v)} />
            <ToggleField label="Bestseller"        value={form.is_bestseller}   onChange={(v) => setField('is_bestseller', v)} />
            <ToggleField label="Chef's Special"    value={form.is_chef_special} onChange={(v) => setField('is_chef_special', v)} />
            <ToggleField label="Available on Menu" value={form.is_available}    onChange={(v) => setField('is_available', v)} />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading
                ? <><Loader2 size={14} className="animate-spin" /> Saving...</>
                : isNew ? 'Add Dish' : 'Save Changes'
              }
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
