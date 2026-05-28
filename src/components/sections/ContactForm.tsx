'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Send, Loader2 } from 'lucide-react'
import type { NewContactMessage } from '@/types/database'

interface FormData { name: string; email: string; phone: string; message: string }
interface FormErrors { name?: string; email?: string; message?: string }

export function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const payload: NewContactMessage = {
        name: form.name.trim(), email: form.email.trim(),
        phone: form.phone.trim() || null, message: form.message.trim(),
      }
      const { supabase } = await import('@/lib/supabase/client')
      const { error } = await supabase.from('contact_messages').insert(payload as never)
      if (error) throw error
      toast.success('Message sent!', { description: "We'll be in touch within 24 hours." })
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      toast.error('Something went wrong', { description: 'Please try again or call us directly.' })
    } finally {
      setLoading(false)
    }
  }

  const Field = ({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
    <div>
      <label htmlFor={id} className="block text-xs tracking-[0.12em] uppercase text-[rgb(140_120_100)] font-medium mb-2">
        {label} {required && <span className="text-[rgb(196_142_72)]">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm p-5 sm:p-8">
      <h3 className="font-display text-xl sm:text-2xl text-[rgb(245_240_235)] mb-6 sm:mb-8">Send us a Message</h3>

      <div className="space-y-4 sm:space-y-5">
        <Field id="name" label="Full Name" required error={errors.name}>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
            placeholder="Your name" className={`input-dark ${errors.name ? 'border-red-700/60' : ''}`} />
        </Field>

        <Field id="email" label="Email Address" required error={errors.email}>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="you@example.com" className={`input-dark ${errors.email ? 'border-red-700/60' : ''}`} />
        </Field>

        <Field id="phone" label="Phone Number">
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
            placeholder="+91 98765 43210" className="input-dark" />
        </Field>

        <Field id="message" label="Message" required error={errors.message}>
          <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange}
            placeholder="Tell us about your visit, dietary requirements, or any questions..."
            className={`input-dark resize-none ${errors.message ? 'border-red-700/60' : ''}`} />
        </Field>

        <button type="submit" disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <><Send size={14} /> Send Message</>}
        </button>
      </div>
    </form>
  )
}
