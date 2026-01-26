import type { GetPhotosResponse, Photo, UploadPhotoResponse } from '../types'
import { API_ENDPOINTS } from '../utils'
import apiClient from './api'

/**
 * Photo service for handling photo-related API calls
 * Includes upload and fetch endpoints
 */

export const photoService = {
  /**
   * Upload a new photo with title and file
   * POST /photos/upload
   * Uses FormData to send file and metadata
   */
  uploadPhoto: async (title: string, file: File, userId: string): Promise<UploadPhotoResponse> => {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('file', file)
      formData.append('userId', userId)

      const response = await apiClient.post<UploadPhotoResponse>(API_ENDPOINTS.PHOTOS.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Fetch all photos
   * GET /photos
   */
  getAllPhotos: async (): Promise<Photo[]> => {
    try {
      const response = await apiClient.get<GetPhotosResponse>(API_ENDPOINTS.PHOTOS.GET_ALL)
      return response.data.photos
    } catch (error) {
      throw error
    }
  },

  /**
   * Fetch a single photo by ID
   * GET /photos/:id
   */
  getPhotoById: async (id: string): Promise<Photo> => {
    try {
      const response = await apiClient.get<Photo>(API_ENDPOINTS.PHOTOS.GET_ONE(id))
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Delete a photo by ID
   * DELETE /photos/:id
   */
  deletePhoto: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(API_ENDPOINTS.PHOTOS.DELETE(id))
    } catch (error) {
      throw error
    }
  }
}

export default photoService
