import { createServerClient } from '@/lib/supabase/server'
import { UtensilsCrossed, Tags, MessageSquare, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import type { ContactMessage } from '@/types/database'

async function getStats() {
  const supabase = await createServerClient()
  const [
    { count: totalItems },
    { count: availableItems },
    { count: bestsellers },
    { count: categories },
    { count: messages },
  ] = await Promise.all([
    supabase.from('menu_items').select('*', { count: 'exact', head: true }),
    supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('is_available', true),
    supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('is_bestseller', true),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
  ])
  return {
    totalItems: totalItems ?? 0,
    availableItems: availableItems ?? 0,
    bestsellers: bestsellers ?? 0,
    categories: categories ?? 0,
    messages: messages ?? 0,
  }
}

async function getRecentMessages(): Promise<ContactMessage[]> {
  const supabase = await createServerClient()
  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  return (data ?? []) as ContactMessage[]
}

export default async function DashboardPage() {
  const [stats, recentMessages] = await Promise.all([getStats(), getRecentMessages()])

  const statCards = [
    { label: 'Total Menu Items', value: stats.totalItems, icon: UtensilsCrossed, href: '/admin/dashboard/menu' },
    { label: 'Available Items', value: stats.availableItems, icon: CheckCircle, href: '/admin/dashboard/menu' },
    { label: 'Bestsellers', value: stats.bestsellers, icon: Star, href: '/admin/dashboard/menu' },
    { label: 'Categories', value: stats.categories, icon: Tags, href: '/admin/dashboard/categories' },
    { label: 'Contact Messages', value: stats.messages, icon: MessageSquare, href: '/admin/dashboard/messages' },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl lg:text-3xl text-[rgb(245_240_235)]">Dashboard</h1>
        <p className="text-sm text-[rgb(120_100_85)] mt-1">Overview of your restaurant data</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {statCards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm p-4 hover:border-[rgb(196_142_72/0.3)] transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon size={16} className="text-[rgb(196_142_72)]" />
            </div>
            <p className="font-display text-2xl text-[rgb(245_240_235)] group-hover:text-[rgb(196_142_72)] transition-colors">
              {value}
            </p>
            <p className="text-xs text-[rgb(100_85_70)] mt-1">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Link
          href="/admin/dashboard/menu?action=new"
          className="flex items-center gap-3 p-4 bg-[rgb(196_142_72)] text-[rgb(14_10_8)] rounded-sm hover:bg-[rgb(220_165_90)] transition-colors font-semibold text-sm"
        >
          <UtensilsCrossed size={16} />
          Add New Dish
        </Link>
        <Link
          href="/admin/dashboard/categories?action=new"
          className="flex items-center gap-3 p-4 bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] text-[rgb(200_185_165)] rounded-sm hover:border-[rgb(196_142_72/0.4)] transition-colors text-sm"
        >
          <Tags size={16} />
          Add Category
        </Link>
        <Link
          href="/admin/dashboard/messages"
          className="flex items-center gap-3 p-4 bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] text-[rgb(200_185_165)] rounded-sm hover:border-[rgb(196_142_72/0.4)] transition-colors text-sm"
        >
          <MessageSquare size={16} />
          View Messages
        </Link>
      </div>

      {/* Recent messages */}
      {recentMessages.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[rgb(200_185_165)] tracking-wider uppercase">
              Recent Messages
            </h2>
            <Link href="/admin/dashboard/messages" className="text-xs text-[rgb(196_142_72)] hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[rgb(245_240_235)]">{msg.name}</p>
                    <p className="text-xs text-[rgb(100_85_70)]">{msg.email}</p>
                  </div>
                  <span className="text-xs text-[rgb(80_65_55)] shrink-0">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-[rgb(140_120_100)] mt-2 line-clamp-2">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
