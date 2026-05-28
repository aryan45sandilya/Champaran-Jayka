import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[rgb(10_7_5)] flex">
        <AdminSidebar />
        <main className="flex-1 min-w-0 overflow-auto">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  )
}
