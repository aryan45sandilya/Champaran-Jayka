import { createServerClient } from '@/lib/supabase/server'
import { Mail, Phone, Calendar } from 'lucide-react'
import type { ContactMessage } from '@/types/database'

export default async function MessagesPage() {
  const supabase = await createServerClient()
  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  const messages = (data ?? []) as ContactMessage[]

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl lg:text-3xl text-[rgb(245_240_235)]">Contact Messages</h1>
        <p className="text-sm text-[rgb(120_100_85)] mt-1">{messages.length} total messages</p>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 text-[rgb(100_85_70)]">
          <Mail size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm p-5 hover:border-[rgb(196_142_72/0.2)] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-[rgb(245_240_235)]">{msg.name}</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <a
                      href={`mailto:${msg.email}`}
                      className="flex items-center gap-1.5 text-xs text-[rgb(196_142_72)] hover:underline"
                    >
                      <Mail size={11} />
                      {msg.email}
                    </a>
                    {msg.phone && (
                      <a
                        href={`tel:${msg.phone}`}
                        className="flex items-center gap-1.5 text-xs text-[rgb(140_120_100)] hover:text-[rgb(200_185_165)]"
                      >
                        <Phone size={11} />
                        {msg.phone}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[rgb(80_65_55)] shrink-0">
                  <Calendar size={11} />
                  {new Date(msg.created_at).toLocaleString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </div>
              </div>
              <p className="text-sm text-[rgb(160_140_120)] leading-relaxed bg-[rgb(18_13_10)] rounded-sm p-3 border border-[rgb(30_22_18)]">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
