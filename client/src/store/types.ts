/**
 * Type definitions for store modules
 */

export interface AuthStoreState {
  user: {
    id: string
    email: string
  } | null
  token: string | null
  isLoading: boolean
  error: string | null
}

export interface AuthStoreActions {
  setUser: (user: AuthStoreState['user']) => void
  setToken: (token: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export interface PhotoStoreState {
  photos: Array<{
    id: string
    title: string
    s3Key: string
    webUrl: string
    userId: string
    createdAt: string
    user?: { id: string; email: string }
  }>
  isLoading: boolean
  error: string | null
  currentPage: number
  pageSize: number
}

export interface PhotoStoreActions {
  setPhotos: (photos: PhotoStoreState['photos']) => void
  addPhoto: (photo: PhotoStoreState['photos'][0]) => void
  removePhoto: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setCurrentPage: (page: number) => void
  reset: () => void
}
