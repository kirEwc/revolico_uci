import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  nombre: string
  created_at?: string
  perfil?: {
    avatar_url: string | null
    banner_url: string | null
    bio: string | null
    telefono: string | null
  }
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isInitialized: boolean

  initialize: () => Promise<void>
  login: (email: string) => Promise<{ success: boolean; message: string }>
  verifyCode: (email: string, code: string) => Promise<{ success: boolean; message: string }>
  registro: (email: string, code: string, nombre: string) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isInitialized: false,

      initialize: async () => {
        try {
          const res = await fetch('/api/auth/me')
          if (res.ok) {
            const data = await res.json()
            set({ user: data.user })
          }
        } catch {
          console.error('Error initializing auth')
        } finally {
          set({ isInitialized: true })
        }
      },

      fetchUser: async () => {
        try {
          const res = await fetch('/api/auth/me')
          if (res.ok) {
            const data = await res.json()
            set({ user: data.user })
          } else {
            set({ user: null })
          }
        } catch {
          console.error('Error fetching user')
          set({ user: null })
        }
      },

      login: async (email: string) => {
        set({ isLoading: true })
        try {
          const res = await fetch('/api/auth/send-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, isRegistro: false }),
          })

          const data = await res.json()

          if (!res.ok) {
            return { success: false, message: data.error || 'Error al enviar código' }
          }

          return { success: true, message: 'Código enviado a tu correo' }
        } catch {
          return { success: false, message: 'Error de conexión' }
        } finally {
          set({ isLoading: false })
        }
      },

      verifyCode: async (email: string, code: string) => {
        set({ isLoading: true })
        try {
          const res = await fetch('/api/auth/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, codigo: code }),
          })

          const data = await res.json()

          if (!res.ok) {
            return { success: false, message: data.error || 'Código inválido' }
          }

          set({ user: data.user })
          return { success: true, message: 'Sesión iniciada' }
        } catch {
          return { success: false, message: 'Error de conexión' }
        } finally {
          set({ isLoading: false })
        }
      },

      registro: async (email: string, code: string, nombre: string) => {
        set({ isLoading: true })
        try {
          const res = await fetch('/api/auth/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, codigo: code, nombre }),
          })

          const data = await res.json()

          if (!res.ok) {
            return { success: false, message: data.error || 'Código inválido' }
          }

          set({ user: data.user })
          return { success: true, message: 'Cuenta creada exitosamente' }
        } catch {
          return { success: false, message: 'Error de conexión' }
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await fetch('/api/auth/logout', { method: 'POST' })
          set({ user: null })
        } catch (error) {
          console.error('Error logging out:', error)
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)