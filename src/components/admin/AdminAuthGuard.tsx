'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login')
      } else {
        setChecking(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/admin/login')
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (checking) {
    return (
      <div className="min-h-screen bg-[rgb(10_7_5)] flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-[rgb(196_142_72)]" />
      </div>
    )
  }

  return <>{children}</>
}
