import type { ReactNode } from 'react'
import type { Photo } from './photo'

// Common components - aligned with shadcn/ui patterns
export interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
}

export interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export interface InputProps {
  name: string
  type?: 'text' | 'email' | 'password' | 'file' | 'number'
  label?: string
  placeholder?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

export interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export interface SkeletonProps {
  className?: string
}

export interface AlertProps {
  variant?: 'default' | 'destructive'
  title?: string
  description?: string
  children?: ReactNode
  className?: string
}

// Feature components
export interface AuthFormProps {
  mode: 'signup' | 'login'
  onSubmit: (data: { email: string; password: string }) => Promise<void>
  isLoading?: boolean
  error?: string
}

export interface PhotoCardProps {
  photo: Photo
  onPreview?: (photo: Photo) => void
  onClick?: () => void
}

export interface PhotoGalleryProps {
  photos: Photo[]
  isLoading: boolean
  onPhotoClick?: (photo: Photo) => void
  onLoadMore?: () => void
  hasMore?: boolean
}

export interface PhotoUploadProps {
  onSuccess?: (photo: Photo) => void
  onError?: (error: string) => void
  isLoading?: boolean
}

export interface PhotoPreviewProps {
  photo: Photo | null
  isOpen: boolean
  onClose: () => void
}
