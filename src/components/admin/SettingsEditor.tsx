'use client'

import { useState, useTransition } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, Trash2, Save, MapPin, Phone, Mail, Clock, Map } from 'lucide-react'
import type { RestaurantSettings, RestaurantHour } from '@/types/database'

export function SettingsEditor({ initialSettings }: { initialSettings: RestaurantSettings }) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [saving, setSaving] = useState(false)
  const [s, setS] = useState<RestaurantSettings>(initialSettings)

  const set = (key: keyof RestaurantSettings, value: string) =>
    setS((prev) => ({ ...prev, [key]: value }))

  const setHour = (i: number, field: keyof RestaurantHour, value: string) =>
    setS((prev) => ({
      ...prev,
      hours: prev.hours.map((h, idx) => idx === i ? { ...h, [field]: value } : h),
    }))

  const addHour = () =>
    setS((prev) => ({ ...prev, hours: [...prev.hours, { day: '', time: '' }] }))

  const removeHour = (i: number) =>
    setS((prev) => ({ ...prev, hours: prev.hours.filter((_, idx) => idx !== i) }))

  const handleSave = async () => {
    setSaving(true)
    const payload = {
      address: s.address,
      maps_embed_url: s.maps_embed_url,
      maps_directions_url: s.maps_directions_url,
      phone1: s.phone1,
      phone2: s.phone2,
      email: s.email,
      hours: s.hours,
      updated_at: new Date().toISOString(),
    }

    // Upsert — insert if not exists, update if exists
    const { error } = await (supabase as any)
      .from('restaurant_settings')
      .upsert({ id: 'main', ...payload })

    if (error) {
      toast.error('Failed to save', { description: error.message })
    } else {
      toast.success('Settings saved! Website will reflect changes on next load.')
      startTransition(() => router.refresh())
    }
    setSaving(false)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl text-[rgb(245_240_235)]">Settings</h1>
          <p className="text-sm text-[rgb(120_100_85)] mt-1">Contact info, location & opening hours</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2 disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">

        {/* Address */}
        <div className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={15} className="text-[rgb(196_142_72)]" />
            <h2 className="text-sm font-semibold text-[rgb(200_185_165)] tracking-wider uppercase">Address</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="admin-label">Full Address</label>
              <textarea
                rows={3}
                value={s.address}
                onChange={(e) => set('address', e.target.value)}
                placeholder="Street, Area, City, State – PIN"
                className="input-dark resize-none"
              />
            </div>
            <div>
              <label className="admin-label">Google Maps Directions URL</label>
              <input
                type="url"
                value={s.maps_directions_url}
                onChange={(e) => set('maps_directions_url', e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                className="input-dark"
              />
              <p className="text-xs text-[rgb(80_65_55)] mt-1">
                Google Maps pe apna location open karo → address bar ka URL copy karo
              </p>
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Map size={15} className="text-[rgb(196_142_72)]" />
            <h2 className="text-sm font-semibold text-[rgb(200_185_165)] tracking-wider uppercase">Google Maps Embed</h2>
          </div>
          <div>
            <label className="admin-label">Embed URL (from Share → Embed a map → src="...")</label>
            <textarea
              rows={3}
              value={s.maps_embed_url}
              onChange={(e) => set('maps_embed_url', e.target.value)}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="input-dark resize-none font-mono text-xs"
            />
          </div>
          {/* Live preview */}
          {s.maps_embed_url && (
            <div className="mt-3 rounded-sm overflow-hidden border border-[rgb(35_26_20)] h-40">
              <iframe
                src={s.maps_embed_url}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)' }}
                loading="lazy"
                title="Map preview"
              />
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Phone size={15} className="text-[rgb(196_142_72)]" />
            <h2 className="text-sm font-semibold text-[rgb(200_185_165)] tracking-wider uppercase">Contact</h2>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="admin-label">Phone 1</label>
                <input
                  type="text"
                  value={s.phone1}
                  onChange={(e) => set('phone1', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="input-dark"
                />
              </div>
              <div>
                <label className="admin-label">Phone 2 (optional)</label>
                <input
                  type="text"
                  value={s.phone2}
                  onChange={(e) => set('phone2', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="input-dark"
                />
              </div>
            </div>
            <div>
              <label className="admin-label">
                <Mail size={12} className="inline mr-1" />
                Email
              </label>
              <input
                type="email"
                value={s.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="hello@restaurant.com"
                className="input-dark"
              />
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-[rgb(196_142_72)]" />
              <h2 className="text-sm font-semibold text-[rgb(200_185_165)] tracking-wider uppercase">Opening Hours</h2>
            </div>
            <button
              type="button"
              onClick={addHour}
              className="flex items-center gap-1.5 text-xs text-[rgb(196_142_72)] hover:text-[rgb(220_165_90)] transition-colors"
            >
              <Plus size={13} />
              Add Row
            </button>
          </div>
          <div className="space-y-2">
            {s.hours.map((h, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={h.day}
                  onChange={(e) => setHour(i, 'day', e.target.value)}
                  placeholder="Monday – Friday"
                  className="input-dark flex-1"
                />
                <input
                  type="text"
                  value={h.time}
                  onChange={(e) => setHour(i, 'time', e.target.value)}
                  placeholder="11:00 AM – 10:00 PM"
                  className="input-dark flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeHour(i)}
                  className="p-2 text-[rgb(100_85_70)] hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save bottom */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>

      </div>
    </div>
  )
}
