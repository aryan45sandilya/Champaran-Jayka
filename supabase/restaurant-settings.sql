-- ============================================================
-- Restaurant Settings Table
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.restaurant_settings (
  id          TEXT PRIMARY KEY DEFAULT 'main',  -- single row, always 'main'
  address     TEXT NOT NULL DEFAULT '',
  maps_embed_url    TEXT NOT NULL DEFAULT '',
  maps_directions_url TEXT NOT NULL DEFAULT '',
  phone1      TEXT NOT NULL DEFAULT '',
  phone2      TEXT NOT NULL DEFAULT '',
  email       TEXT NOT NULL DEFAULT '',
  hours       JSONB NOT NULL DEFAULT '[{"day":"Monday – Friday","time":"11:00 AM – 10:00 PM"},{"day":"Saturday – Sunday","time":"10:00 AM – 11:00 PM"}]',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;

-- Public can read (for the website frontend)
CREATE POLICY "settings_public_read"
  ON public.restaurant_settings FOR SELECT
  TO anon, authenticated
  USING (TRUE);

-- Only authenticated admins can update
CREATE POLICY "settings_auth_update"
  ON public.restaurant_settings FOR UPDATE
  TO authenticated
  USING (TRUE);

-- Insert the default row
INSERT INTO public.restaurant_settings (
  id, address, maps_embed_url, maps_directions_url, phone1, phone2, email, hours
) VALUES (
  'main',
  '280, Pratap Vihar Rd, Sector 12, Block J, Pratap Vihar, Ghaziabad, Uttar Pradesh – 201009',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.3144533897807!2d77.40577318097343!3d28.65030181288328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf02507fb7f87%3A0x4c3472513c6cbce7!2s280%2C%20Pratap%20Vihar%20Rd%2C%20Sector%2012%2C%20Block%20J%2C%20Pratap%20Vihar%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201009!5e0!3m2!1sen!2sin!4v1779963833912!5m2!1sen!2sin',
  'https://maps.google.com/?q=280,+Pratap+Vihar+Rd,+Sector+12,+Block+J,+Pratap+Vihar,+Ghaziabad,+Uttar+Pradesh+201009',
  '+91 76677 51506',
  '+91 99344 12330',
  'champaranjayka@gmail.com',
  '[{"day":"Monday – Friday","time":"11:00 AM – 10:00 PM"},{"day":"Saturday – Sunday","time":"10:00 AM – 11:00 PM"}]'
) ON CONFLICT (id) DO NOTHING;
