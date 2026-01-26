/**
 * Barrel exports for all service modules
 * Provides centralized access to all service utilities
 */

export { default as apiClient } from './api'
export { storageService } from './storageService'
export { authService } from './authService'
export { photoService } from './photoService'

// Re-export for convenience
export * from './storageService'
export * from './authService'
export * from './photoService'
