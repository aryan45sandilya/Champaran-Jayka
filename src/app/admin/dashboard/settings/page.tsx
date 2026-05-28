import { createServerClient } from '@/lib/supabase/server'
import { SettingsEditor } from '@/components/admin/SettingsEditor'
import type { RestaurantSettings } from '@/types/database'

const DEFAULT_SETTINGS: RestaurantSettings = {
  id: 'main',
  address: '280, Pratap Vihar Rd, Sector 12, Block J, Pratap Vihar, Ghaziabad, Uttar Pradesh – 201009',
  maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.3144533897807!2d77.40577318097343!3d28.65030181288328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf02507fb7f87%3A0x4c3472513c6cbce7!2s280%2C%20Pratap%20Vihar%20Rd%2C%20Sector%2012%2C%20Block%20J%2C%20Pratap%20Vihar%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201009!5e0!3m2!1sen!2sin!4v1779963833912!5m2!1sen!2sin',
  maps_directions_url: 'https://maps.google.com/?q=280,+Pratap+Vihar+Rd,+Sector+12,+Block+J,+Pratap+Vihar,+Ghaziabad,+Uttar+Pradesh+201009',
  phone1: '+91 76677 51506',
  phone2: '+91 99344 12330',
  email: 'champaranjayka@gmail.com',
  hours: [
    { day: 'Monday – Friday', time: '11:00 AM – 10:00 PM' },
    { day: 'Saturday – Sunday', time: '10:00 AM – 11:00 PM' },
  ],
  updated_at: new Date().toISOString(),
}

export default async function SettingsPage() {
  const supabase = await createServerClient()
  const { data } = await (supabase as any)
    .from('restaurant_settings')
    .select('*')
    .eq('id', 'main')
    .single()

  const settings: RestaurantSettings = data ?? DEFAULT_SETTINGS

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <SettingsEditor initialSettings={settings} />
    </div>
  )
}
