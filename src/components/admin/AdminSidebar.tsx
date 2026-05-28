'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tags,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ExternalLink,
  FileSpreadsheet,
  Settings,
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard',            label: 'Overview',    icon: LayoutDashboard },
  { href: '/admin/dashboard/menu',       label: 'Menu Items',  icon: UtensilsCrossed },
  { href: '/admin/dashboard/categories', label: 'Categories',  icon: Tags },
  { href: '/admin/dashboard/import',     label: 'CSV Import',  icon: FileSpreadsheet },
  { href: '/admin/dashboard/messages',   label: 'Messages',    icon: MessageSquare },
  { href: '/admin/dashboard/settings',   label: 'Settings',    icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Signed out')
    router.push('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-[rgb(30_22_18)]">
        <p className="font-display text-lg text-[rgb(245_240_235)] leading-tight">
          Champaran&apos;s Jayka
        </p>
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[rgb(196_142_72)] mt-0.5">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-[rgb(196_142_72/0.12)] text-[rgb(196_142_72)] border border-[rgb(196_142_72/0.2)]'
                  : 'text-[rgb(140_120_100)] hover:text-[rgb(200_185_165)] hover:bg-[rgb(30_22_18)]'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-[rgb(30_22_18)] space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-[rgb(140_120_100)] hover:text-[rgb(200_185_165)] hover:bg-[rgb(30_22_18)] transition-all"
        >
          <ExternalLink size={16} />
          View Website
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-[rgb(140_120_100)] hover:text-red-400 hover:bg-[rgb(30_22_18)] transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-[rgb(14_10_8)] border-r border-[rgb(30_22_18)] h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm text-[rgb(200_185_165)]"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-56 bg-[rgb(14_10_8)] border-r border-[rgb(30_22_18)] flex flex-col">
            <div className="flex justify-end p-3">
              <button onClick={() => setMobileOpen(false)} className="p-1 text-[rgb(140_120_100)]">
                <X size={18} />
              </button>
            </div>
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  )
}
