'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  Plus, Pencil, Trash2, Search, Loader2,
  CheckCircle, XCircle, Star, Flame, Leaf
} from 'lucide-react'
import type { MenuItem, Category } from '@/types/database'
import { MenuItemModal } from './MenuItemModal'

interface Props {
  initialItems: MenuItem[]
  categories: Category[]
}

export function MenuManager({ initialItems, categories }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [items, setItems] = useState<MenuItem[]>(initialItems)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<MenuItem | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filtered = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'all' || item.category_id === filterCat
    return matchSearch && matchCat
  })

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this menu item? This cannot be undone.')) return
    setDeletingId(id)
    const { error } = await supabase.from('menu_items').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete item')
    } else {
      setItems((prev) => prev.filter((i) => i.id !== id))
      toast.success('Item deleted')
      startTransition(() => router.refresh())
    }
    setDeletingId(null)
  }

  const handleToggleAvailable = async (item: MenuItem) => {
    const { error } = await supabase
      .from('menu_items')
      .update({ is_available: !item.is_available } as never)
      .eq('id', item.id)
    if (error) {
      toast.error('Failed to update')
    } else {
      setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, is_available: !i.is_available } : i))
      toast.success(`Marked as ${!item.is_available ? 'available' : 'unavailable'}`)
      startTransition(() => router.refresh())
    }
  }

  const handleSaved = (saved: MenuItem, isNew: boolean) => {
    if (isNew) {
      setItems((prev) => [saved, ...prev])
    } else {
      setItems((prev) => prev.map((i) => i.id === saved.id ? saved : i))
    }
    startTransition(() => router.refresh())
  }

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? '—'

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl text-[rgb(245_240_235)]">Menu Items</h1>
          <p className="text-sm text-[rgb(120_100_85)] mt-1">{items.length} total items</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setModalOpen(true) }}
          className="btn-primary flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={14} />
          Add New Dish
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(100_85_70)]" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark pl-9"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="input-dark sm:w-44"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[rgb(100_85_70)]">
            <p className="text-sm">No items found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgb(35_26_20)]">
                  {['Dish', 'Category', 'Price', 'Flags', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs tracking-wider uppercase text-[rgb(100_85_70)] font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(30_22_18)]">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[rgb(28_20_16)] transition-colors">
                    {/* Dish */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-10 h-10 rounded-sm object-cover shrink-0"
                          />
                        )}
                        <div>
                          <p className="font-medium text-[rgb(245_240_235)]">{item.name}</p>
                          <p className="text-xs text-[rgb(100_85_70)] line-clamp-1 max-w-[200px]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-4 py-3 text-[rgb(160_140_120)]">
                      {getCategoryName(item.category_id)}
                    </td>
                    {/* Price */}
                    <td className="px-4 py-3">
                      {item.price_quarter || item.price_half || item.price_full ? (
                        <div className="space-y-0.5">
                          {item.price_quarter && <p className="text-xs text-[rgb(160_140_120)]">Qtr: <span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_quarter}</span></p>}
                          {item.price_half    && <p className="text-xs text-[rgb(160_140_120)]">Half: <span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_half}</span></p>}
                          {item.price_full    && <p className="text-xs text-[rgb(160_140_120)]">Full: <span className="text-[rgb(196_142_72)] font-semibold">₹{item.price_full}</span></p>}
                        </div>
                      ) : (
                        <span className="text-[rgb(196_142_72)] font-semibold">₹{item.price.toFixed(0)}</span>
                      )}
                    </td>
                    {/* Flags */}
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {item.is_veg && (
                          <span title="Veg" className="w-5 h-5 rounded-sm border-2 border-green-600 bg-green-500/20 flex items-center justify-center">
                            <Leaf size={10} className="text-green-400" />
                          </span>
                        )}
                        {item.is_spicy && (
                          <span title="Spicy" className="w-5 h-5 rounded-sm border-2 border-orange-600 bg-orange-500/20 flex items-center justify-center">
                            <Flame size={10} className="text-orange-400" />
                          </span>
                        )}
                        {item.is_bestseller && (
                          <span title="Bestseller" className="w-5 h-5 rounded-sm border-2 border-[rgb(196_142_72/0.6)] bg-[rgb(196_142_72/0.1)] flex items-center justify-center">
                            <Star size={10} className="text-[rgb(196_142_72)]" />
                          </span>
                        )}
                      </div>
                    </td>
                    {/* Status toggle */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleAvailable(item)}
                        className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-sm border transition-colors ${
                          item.is_available
                            ? 'border-green-700/50 text-green-400 bg-green-500/10 hover:bg-green-500/20'
                            : 'border-[rgb(60_45_35)] text-[rgb(100_85_70)] bg-[rgb(30_22_18)] hover:border-[rgb(196_142_72/0.3)]'
                        }`}
                      >
                        {item.is_available
                          ? <><CheckCircle size={11} /> Available</>
                          : <><XCircle size={11} /> Hidden</>
                        }
                      </button>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditItem(item); setModalOpen(true) }}
                          className="p-1.5 text-[rgb(140_120_100)] hover:text-[rgb(196_142_72)] hover:bg-[rgb(196_142_72/0.1)] rounded-sm transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="p-1.5 text-[rgb(140_120_100)] hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === item.id
                            ? <Loader2 size={14} className="animate-spin" />
                            : <Trash2 size={14} />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <MenuItemModal
          item={editItem}
          categories={categories}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </>
  )
}
