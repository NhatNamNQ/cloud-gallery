export interface Photo {
  id: string
  title: string
  s3Key: string
  webUrl: string
  userId: string
  createdAt: string
  user?: {
    id: string
    email: string
  }
}

export interface UploadPhotoRequest {
  title: string
  file: File
}

export interface UploadPhotoResponse {
  message: string
  photo: Photo
}

export interface GetPhotosResponse {
  photos: Photo[]
}

export interface PhotoState {
  photos: Photo[]
  isLoading: boolean
  error: string | null
  currentPage: number
  pageSize: number
}
