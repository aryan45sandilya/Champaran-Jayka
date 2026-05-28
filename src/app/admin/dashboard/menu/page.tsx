import { createServerClient } from '@/lib/supabase/server'
import { MenuManager } from '@/components/admin/MenuManager'

export default async function MenuPage() {
  const supabase = await createServerClient()
  const [{ data: items }, { data: categories }] = await Promise.all([
    supabase.from('menu_items').select('*').order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('created_at', { ascending: true }),
  ])

  return (
    <div className="p-6 lg:p-8">
      <MenuManager
        initialItems={items ?? []}
        categories={categories ?? []}
      />
    </div>
  )
}
