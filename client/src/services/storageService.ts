import type { User } from '../types'
import { STORAGE_KEYS } from '../utils'

/**
 * Storage service for managing authentication tokens and user data
 * Provides utilities for storing and retrieving auth-related data from localStorage
 */

export const storageService = {
  /**
   * Get auth token from localStorage
   */
  getToken: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    } catch (error) {
      console.error('Error reading token from storage:', error)
      return null
    }
  },

  /**
   * Set auth token in localStorage
   */
  setToken: (token: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    } catch (error) {
      console.error('Error saving token to storage:', error)
    }
  },

  /**
   * Clear auth token from localStorage
   */
  clearToken: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    } catch (error) {
      console.error('Error clearing token from storage:', error)
    }
  },

  /**
   * Get user data from localStorage
   */
  getUser: (): User | null => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER)
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error('Error reading user from storage:', error)
      return null
    }
  },

  /**
   * Set user data in localStorage
   */
  setUser: (user: User): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    } catch (error) {
      console.error('Error saving user to storage:', error)
    }
  },

  /**
   * Clear user data from localStorage
   */
  clearUser: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER)
    } catch (error) {
      console.error('Error clearing user from storage:', error)
    }
  },

  /**
   * Clear all auth-related data (token and user)
   */
  clearAuth: (): void => {
    storageService.clearToken()
    storageService.clearUser()
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!storageService.getToken()
  }
}

export default storageService
