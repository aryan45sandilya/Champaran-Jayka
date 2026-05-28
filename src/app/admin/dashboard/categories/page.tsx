import { createServerClient } from '@/lib/supabase/server'
import { CategoriesManager } from '@/components/admin/CategoriesManager'

export default async function CategoriesPage() {
  const supabase = await createServerClient()
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <CategoriesManager initialCategories={categories ?? []} />
    </div>
  )
}
