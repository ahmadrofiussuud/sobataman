import { create } from 'zustand'

export type UserRole = 'KLIEN' | 'HELPER' | 'KELUARGA' | null

interface AuthState {
  selectedRole: UserRole
  setRole: (role: UserRole) => void
  registrationData: any
  setRegistrationData: (data: any) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  selectedRole: null,
  setRole: (role) => set({ selectedRole: role }),
  registrationData: {},
  setRegistrationData: (data) => set((state) => ({ 
    registrationData: { ...state.registrationData, ...data } 
  })),
}))
