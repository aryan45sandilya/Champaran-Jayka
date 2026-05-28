-- ============================================================
-- Ember & Oak Restaurant — Supabase Database Schema
-- ============================================================
-- Run this in your Supabase SQL Editor to set up the database.
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: categories
-- ============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: menu_items
-- ============================================================
CREATE TABLE IF NOT EXISTS public.menu_items (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id     UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  description     TEXT NOT NULL DEFAULT '',
  price           NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  image_url       TEXT,
  is_bestseller   BOOLEAN NOT NULL DEFAULT FALSE,
  is_available    BOOLEAN NOT NULL DEFAULT TRUE,
  is_veg          BOOLEAN NOT NULL DEFAULT FALSE,
  is_spicy        BOOLEAN NOT NULL DEFAULT FALSE,
  is_chef_special BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster category filtering
CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON public.menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_bestseller ON public.menu_items(is_bestseller) WHERE is_bestseller = TRUE;

-- ============================================================
-- TABLE: contact_messages
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- categories: public read, no public write
CREATE POLICY "categories_public_read"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (TRUE);

-- menu_items: public read, no public write
CREATE POLICY "menu_items_public_read"
  ON public.menu_items FOR SELECT
  TO anon, authenticated
  USING (TRUE);

-- contact_messages: anyone can insert (for the contact form)
CREATE POLICY "contact_messages_public_insert"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (TRUE);

-- contact_messages: only authenticated users (admins) can read
CREATE POLICY "contact_messages_auth_read"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (TRUE);
