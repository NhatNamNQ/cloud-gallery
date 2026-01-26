import { useCallback } from 'react'
import { useAuthStore } from '../store'
import { authService } from '../services'
import type { ApiError, LoginRequest, SignupRequest } from '../types'

/**
 * Custom hook for authentication state and actions
 * Wraps useAuthStore and authService to provide a convenient API
 */

export function useAuth() {
  const { user, token, isLoading, error, setUser, setToken, setLoading, setError, reset } = useAuthStore()

  /**
   * Sign up a new user
   */
  const signup = useCallback(
    async (credentials: SignupRequest) => {
      try {
        setLoading(true)
        setError(null)

        const response = await authService.signup(credentials)
        console.log('Signup successful:', response)

        // Note: Full login happens in login() method
        // Here we just confirm the signup succeeded
        return response
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || 'Signup failed')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError]
  )

  /**
   * Log in an existing user
   */
  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        setLoading(true)
        setError(null)

        const { user: userData, token: authToken } = await authService.login(credentials)

        setUser(userData)
        setToken(authToken)

        return { user: userData, token: authToken }
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || 'Login failed')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setUser, setToken, setLoading, setError]
  )

  /**
   * Log out the current user
   */
  const logout = useCallback(async () => {
    try {
      setLoading(true)
      await authService.logout()
      reset()
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError.message || 'Logout failed')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, reset])

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [setError])

  /**
   * Initialize auth state from storage on app load
   */
  const initializeAuth = useCallback(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [setUser])

  return {
    // State
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token && !!user,

    // Actions
    signup,
    login,
    logout,
    clearError,
    initializeAuth
  }
}

export default useAuth
