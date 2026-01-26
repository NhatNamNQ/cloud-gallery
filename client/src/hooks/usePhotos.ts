import { useCallback } from 'react'
import { usePhotoStore } from '../store'
import { photoService } from '../services'
import type { ApiError, Photo } from '../types'

/**
 * Custom hook for photo state and actions
 * Wraps usePhotoStore and photoService to provide a convenient API for photo operations
 */

export function usePhotos() {
  const {
    photos,
    isLoading,
    error,
    currentPage,
    pageSize,
    setPhotos,
    addPhoto,
    removePhoto,
    setLoading,
    setError,
    setCurrentPage,
    reset
  } = usePhotoStore()

  /**
   * Fetch all photos from the server
   */
  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const fetchedPhotos = await photoService.getAllPhotos()
      setPhotos(fetchedPhotos)

      return fetchedPhotos
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError.message || 'Failed to fetch photos')
      throw err
    } finally {
      setLoading(false)
    }
  }, [setPhotos, setLoading, setError])

  /**
   * Upload a new photo
   */
  const uploadPhoto = useCallback(
    async (title: string, file: File, userId: string) => {
      try {
        setLoading(true)
        setError(null)

        const response = await photoService.uploadPhoto(title, file, userId)
        addPhoto(response.photo)

        return response.photo
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || 'Failed to upload photo')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [addPhoto, setLoading, setError]
  )

  /**
   * Delete a photo by ID
   */
  const deletePhoto = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        setError(null)

        await photoService.deletePhoto(id)
        removePhoto(id)

        return true
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || 'Failed to delete photo')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [removePhoto, setLoading, setError]
  )

  /**
   * Get a single photo by ID
   */
  const getPhoto = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        setError(null)

        const photo = await photoService.getPhotoById(id)
        return photo
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError.message || 'Failed to fetch photo')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError]
  )

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [setError])

  /**
   * Get paginated photos (simple client-side pagination)
   */
  const getPaginatedPhotos = useCallback((): Photo[] => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return photos.slice(startIndex, endIndex)
  }, [photos, currentPage, pageSize])

  /**
   * Get total number of pages
   */
  const getTotalPages = useCallback((): number => {
    return Math.ceil(photos.length / pageSize)
  }, [photos.length, pageSize])

  /**
   * Go to next page
   */
  const nextPage = useCallback(() => {
    const totalPages = getTotalPages()
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }, [currentPage, getTotalPages, setCurrentPage])

  /**
   * Go to previous page
   */
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }, [currentPage, setCurrentPage])

  return {
    // State
    photos,
    paginatedPhotos: getPaginatedPhotos(),
    isLoading,
    error,
    currentPage,
    pageSize,
    totalPages: getTotalPages(),

    // Actions
    fetchPhotos,
    uploadPhoto,
    deletePhoto,
    getPhoto,
    clearError,
    setCurrentPage,
    nextPage,
    prevPage,
    reset
  }
}

export default usePhotos
