-- ============================================================
-- Add Half / Quarter / Full pricing to menu_items
-- Run this in Supabase SQL Editor
-- ============================================================

ALTER TABLE public.menu_items
  ADD COLUMN IF NOT EXISTS price_quarter NUMERIC(10,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS price_half    NUMERIC(10,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS price_full    NUMERIC(10,2) DEFAULT NULL;

-- The old `price` column stays as a fallback for items that
-- don't use portion pricing (e.g. drinks, desserts).
-- If price_full is set, it takes precedence on the customer side.
