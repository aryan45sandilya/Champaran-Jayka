import { createServerClient } from '@/lib/supabase/server'
import { CsvImporter } from '@/components/admin/CsvImporter'

export default async function ImportPage() {
  const supabase = await createServerClient()
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <CsvImporter categories={categories ?? []} />
    </div>
  )
}
