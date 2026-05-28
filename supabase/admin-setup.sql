-- ============================================================
-- Admin Setup — Run this in Supabase SQL Editor
-- ============================================================
-- This adds RLS policies that allow authenticated admins to
-- perform full CRUD on menu_items and categories.
-- ============================================================

-- Allow authenticated users (admins) to INSERT categories
CREATE POLICY "categories_auth_insert"
  ON public.categories FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

-- Allow authenticated users (admins) to UPDATE categories
CREATE POLICY "categories_auth_update"
  ON public.categories FOR UPDATE
  TO authenticated
  USING (TRUE);

-- Allow authenticated users (admins) to DELETE categories
CREATE POLICY "categories_auth_delete"
  ON public.categories FOR DELETE
  TO authenticated
  USING (TRUE);

-- Allow authenticated users (admins) to INSERT menu_items
CREATE POLICY "menu_items_auth_insert"
  ON public.menu_items FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

-- Allow authenticated users (admins) to UPDATE menu_items
CREATE POLICY "menu_items_auth_update"
  ON public.menu_items FOR UPDATE
  TO authenticated
  USING (TRUE);

-- Allow authenticated users (admins) to DELETE menu_items
CREATE POLICY "menu_items_auth_delete"
  ON public.menu_items FOR DELETE
  TO authenticated
  USING (TRUE);
