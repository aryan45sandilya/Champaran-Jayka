export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          category_id: string
          name: string
          description: string
          price: number
          price_quarter: number | null
          price_half: number | null
          price_full: number | null
          image_url: string | null
          is_bestseller: boolean
          is_available: boolean
          is_veg: boolean
          is_spicy: boolean
          is_chef_special: boolean
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          description: string
          price: number
          price_quarter?: number | null
          price_half?: number | null
          price_full?: number | null
          image_url?: string | null
          is_bestseller?: boolean
          is_available?: boolean
          is_veg?: boolean
          is_spicy?: boolean
          is_chef_special?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          description?: string
          price?: number
          price_quarter?: number | null
          price_half?: number | null
          price_full?: number | null
          image_url?: string | null
          is_bestseller?: boolean
          is_available?: boolean
          is_veg?: boolean
          is_spicy?: boolean
          is_chef_special?: boolean
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          created_at?: string
        }
      }
    }
  }
}

// Convenience types
export type Category = Database['public']['Tables']['categories']['Row']
export type MenuItem = Database['public']['Tables']['menu_items']['Row']
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
export type NewContactMessage = Database['public']['Tables']['contact_messages']['Insert']

// Restaurant settings
export interface RestaurantHour {
  day: string
  time: string
}

export interface RestaurantSettings {
  id: string
  address: string
  maps_embed_url: string
  maps_directions_url: string
  phone1: string
  phone2: string
  email: string
  hours: RestaurantHour[]
  updated_at: string
}
