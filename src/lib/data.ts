import { createServerClient } from './supabase/server'
import type { Category, MenuItem } from '@/types/database'

export async function getCategories(): Promise<Category[]> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return data ?? []
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching menu items:', error)
    return []
  }
  return data ?? []
}

export async function getBestsellers(): Promise<MenuItem[]> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_bestseller', true)
    .eq('is_available', true)
    .limit(6)

  if (error) {
    console.error('Error fetching bestsellers:', error)
    return []
  }
  return data ?? []
}

export async function getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('category_id', categoryId)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching menu items by category:', error)
    return []
  }
  return data ?? []
}
