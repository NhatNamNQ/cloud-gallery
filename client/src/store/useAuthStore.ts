import { create } from 'zustand'
import type { AuthStoreActions, AuthStoreState } from './types'

/**
 * Zustand store for authentication state management
 * Manages user data, auth token, and loading/error states
 */

const initialState: AuthStoreState = {
  user: null,
  token: null,
  isLoading: false,
  error: null
}

export const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
  ...initialState,

  setUser: (user) => set({ user }),

  setToken: (token) => set({ token }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  reset: () => set(initialState)
}))

export default useAuthStore
