import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import storageService from './storageService'
import { API_BASE_URL } from '../utils'
import type { ApiError } from '../types'

/**
 * Create and configure axios HTTP client with interceptors
 * Handles auth token injection and error handling
 */

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

/**
 * Request interceptor: Inject auth token into headers
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storageService.getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

/**
 * Response interceptor: Handle errors and token expiration
 */
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      storageService.clearAuth()
      window.location.href = '/auth'
    }

    // Transform error into ApiError type
    const apiError: ApiError = {
      message: (error.response?.data as any)?.message || error.message || 'An error occurred',
      status: error.response?.status || 500,
      code: (error.response?.data as any)?.code
    }

    return Promise.reject(apiError)
  }
)

export default apiClient
