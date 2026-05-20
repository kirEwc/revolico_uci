import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          email: string
          nombre: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          nombre: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          nombre?: string
          created_at?: string
        }
      }
      perfiles: {
        Row: {
          usuario_id: string
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          telefono: string | null
        }
        Insert: {
          usuario_id: string
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          telefono?: string | null
        }
        Update: {
          usuario_id?: string
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          telefono?: string | null
        }
      }
      productos: {
        Row: {
          id: string
          vendor_id: string
          titulo: string
          descripcion: string | null
          precio: number
          imagenes: string[]
          categoria: string
          estado: string
          created_at: string
        }
        Insert: {
          id?: string
          vendor_id: string
          titulo: string
          descripcion?: string | null
          precio: number
          imagenes?: string[]
          categoria: string
          estado?: string
          created_at?: string
        }
        Update: {
          id?: string
          vendor_id?: string
          titulo?: string
          descripcion?: string | null
          precio?: number
          imagenes?: string[]
          categoria?: string
          estado?: string
          created_at?: string
        }
      }
      verification_codes: {
        Row: {
          id: string
          email: string
          codigo: string
          expiracion: string
          used: boolean
        }
        Insert: {
          id?: string
          email: string
          codigo: string
          expiracion: string
          used?: boolean
        }
        Update: {
          id?: string
          email?: string
          codigo?: string
          expiracion?: string
          used?: boolean
        }
      }
    }
  }
}