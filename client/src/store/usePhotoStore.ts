import { create } from 'zustand'
import type { PhotoStoreActions, PhotoStoreState } from './types'
/**
 * Zustand store for photo state management
 * Manages photos list, pagination, loading, and error states
 */

const initialState: PhotoStoreState = {
  photos: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  pageSize: 12
}

export const usePhotoStore = create<PhotoStoreState & PhotoStoreActions>((set) => ({
  ...initialState,

  setPhotos: (photos) => set({ photos }),

  addPhoto: (photo) =>
    set((state) => ({
      photos: [photo, ...state.photos]
    })),

  removePhoto: (id) =>
    set((state) => ({
      photos: state.photos.filter((photo) => photo.id !== id)
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setCurrentPage: (currentPage) => set({ currentPage }),

  reset: () => set(initialState)
}))

export default usePhotoStore
