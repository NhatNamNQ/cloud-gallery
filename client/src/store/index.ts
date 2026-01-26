/**
 * Barrel exports for all store modules
 * Provides centralized access to all Zustand stores
 */

export { useAuthStore, default as useAuthStoreDefault } from './useAuthStore'
export { usePhotoStore, default as usePhotoStoreDefault } from './usePhotoStore'
export type { AuthStoreState, AuthStoreActions, PhotoStoreState, PhotoStoreActions } from './types'
