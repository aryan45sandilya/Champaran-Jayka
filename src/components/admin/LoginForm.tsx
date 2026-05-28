'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, Lock, Mail } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error('Login failed', { description: error.message })
      setLoading(false)
      return
    }

    toast.success('Welcome back!')
    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <form
      onSubmit={handleLogin}
      className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm p-8 shadow-warm"
    >
      <h2 className="text-lg font-semibold text-[rgb(245_240_235)] mb-6">Sign in to continue</h2>

      <div className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs tracking-[0.12em] uppercase text-[rgb(140_120_100)] font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(100_85_70)]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@champaransjayka.com"
              required
              className="input-dark pl-9"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs tracking-[0.12em] uppercase text-[rgb(140_120_100)] font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(100_85_70)]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="input-dark pl-9"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <><Loader2 size={14} className="animate-spin" /> Signing in...</> : 'Sign In'}
        </button>
      </div>
    </form>
  )
}
