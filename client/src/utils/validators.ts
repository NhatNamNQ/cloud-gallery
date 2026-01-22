import { VALIDATION, UPLOAD_SIZE_LIMIT } from './constants'

export const validators = {
  email: (email: string): string | null => {
    if (!email) return 'Email is required'
    if (!VALIDATION.EMAIL_REGEX.test(email)) {
      return 'Please enter a valid email'
    }
    return null
  },

  password: (password: string): string | null => {
    if (!password) return 'Password is required'
    if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      return `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`
    }
    return null
  },

  file: (file: File | null): string | null => {
    if (!file) return 'File is required'
    if (file.size > UPLOAD_SIZE_LIMIT) {
      return `File must be smaller than ${UPLOAD_SIZE_LIMIT / 1024 / 1024}MB`
    }
    if (!VALIDATION.FILE_TYPES.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, WebP, GIF)'
    }
    return null
  },

  photoTitle: (title: string): string | null => {
    if (!title || title.trim() === '') return 'Title is required'
    if (title.length > 100) return 'Title must be 100 characters or less'
    return null
  }
}
