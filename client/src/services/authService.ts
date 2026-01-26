import type { SignupRequest, SignupResponse, LoginRequest, LoginResponse, User } from '../types'
import { API_ENDPOINTS } from '../utils'
import apiClient from './api'
import storageService from './storageService'

/**
 * Auth service for handling authentication-related API calls
 * Includes signup and login endpoints
 */

export const authService = {
  /**
   * Sign up a new user with email and password
   * POST /auth/signup
   */
  signup: async (credentials: SignupRequest): Promise<SignupResponse> => {
    try {
      const response = await apiClient.post<SignupResponse>(API_ENDPOINTS.AUTH.SIGNUP, credentials)
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Log in with email and password
   * POST /auth/login
   * Stores token and user data in localStorage
   */
  login: async (credentials: LoginRequest): Promise<{ user: User; token: string }> => {
    try {
      const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)

      const { token, user } = response.data

      // Store token and user data
      storageService.setToken(token)
      storageService.setUser(user)

      return { user, token }
    } catch (error) {
      throw error
    }
  },

  /**
   * Log out the current user
   * POST /auth/logout
   * Clears token and user data from localStorage
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always clear auth data locally
      storageService.clearAuth()
    }
  },

  /**
   * Get the currently authenticated user from storage
   */
  getCurrentUser: (): User | null => {
    return storageService.getUser()
  },

  /**
   * Check if user is currently authenticated
   */
  isAuthenticated: (): boolean => {
    return storageService.isAuthenticated()
  }
}

export default authService
