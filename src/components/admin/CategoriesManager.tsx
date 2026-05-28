'use client'

import { useState, useTransition } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, Check, X, Loader2 } from 'lucide-react'
import type { Category } from '@/types/database'

export function CategoriesManager({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    setAdding(true)
    const { data, error } = await (supabase as any)
      .from('categories')
      .insert({ name: newName.trim() })
      .select()
      .single()
    if (error) {
      toast.error('Failed to add category', { description: error.message })
      console.error('Category insert error:', error)
    } else {
      setCategories((prev) => [...prev, data])
      setNewName('')
      toast.success(`Category "${data.name}" added`)
      startTransition(() => router.refresh())
    }
    setAdding(false)
  }

  const handleEdit = async (id: string) => {
    if (!editName.trim()) return
    const { data, error } = await (supabase as any)
      .from('categories')
      .update({ name: editName.trim() })
      .eq('id', id)
      .select()
      .single()
    if (error) {
      toast.error('Failed to update category', { description: error.message })
      console.error('Category update error:', error)
    } else {
      setCategories((prev) => prev.map((c) => c.id === id ? data : c))
      toast.success('Category updated')
      startTransition(() => router.refresh())
    }
    setEditId(null)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? All menu items in this category will also be deleted.`)) return
    setDeletingId(id)
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete category', { description: error.message })
      console.error('Category delete error:', error)
    } else {
      setCategories((prev) => prev.filter((c) => c.id !== id))
      toast.success(`Category "${name}" deleted`)
      startTransition(() => router.refresh())
    }
    setDeletingId(null)
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl lg:text-3xl text-[rgb(245_240_235)]">Categories</h1>
        <p className="text-sm text-[rgb(120_100_85)] mt-1">Manage your menu categories</p>
      </div>

      {/* Add new */}
      <form onSubmit={handleAdd} className="flex gap-3 mb-8">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name..."
          className="input-dark flex-1"
        />
        <button
          type="submit"
          disabled={adding || !newName.trim()}
          className="btn-primary flex items-center gap-2 disabled:opacity-60 whitespace-nowrap"
        >
          {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          Add
        </button>
      </form>

      {/* List */}
      <div className="space-y-2">
        {categories.length === 0 && (
          <p className="text-sm text-[rgb(100_85_70)] text-center py-8">No categories yet.</p>
        )}
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-3 bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm px-4 py-3"
          >
            {editId === cat.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleEdit(cat.id); if (e.key === 'Escape') setEditId(null) }}
                  className="input-dark flex-1 py-1.5 text-sm"
                  autoFocus
                />
                <button onClick={() => handleEdit(cat.id)} className="p-1.5 text-green-400 hover:bg-green-500/10 rounded-sm">
                  <Check size={14} />
                </button>
                <button onClick={() => setEditId(null)} className="p-1.5 text-[rgb(100_85_70)] hover:bg-[rgb(35_26_20)] rounded-sm">
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-[rgb(200_185_165)] font-medium">{cat.name}</span>
                <span className="text-xs text-[rgb(80_65_55)]">
                  {new Date(cat.created_at).toLocaleDateString()}
                </span>
                <button
                  onClick={() => { setEditId(cat.id); setEditName(cat.name) }}
                  className="p-1.5 text-[rgb(120_100_85)] hover:text-[rgb(196_142_72)] hover:bg-[rgb(196_142_72/0.1)] rounded-sm transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  disabled={deletingId === cat.id}
                  className="p-1.5 text-[rgb(120_100_85)] hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors disabled:opacity-50"
                >
                  {deletingId === cat.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
