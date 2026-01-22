// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout'
  },
  PHOTOS: {
    UPLOAD: '/photos/upload',
    GET_ALL: '/photos',
    GET_ONE: (id: string) => `/photos/${id}`,
    DELETE: (id: string) => `/photos/${id}`
  }
}

// App Configuration
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Cloud Gallery'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'
export const UPLOAD_SIZE_LIMIT = parseInt(import.meta.env.VITE_UPLOAD_SIZE_LIMIT || '10485760', 10) // 10MB default

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'cloud_gallery_token',
  USER: 'cloud_gallery_user',
  THEME: 'cloud_gallery_theme'
}

// Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
}

// UI Configuration
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100
}

// Routes
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  GALLERY: '/gallery',
  NOT_FOUND: '/404'
}

// Messages
export const MESSAGES = {
  SUCCESS: {
    SIGNUP: 'Account created successfully! Please log in.',
    LOGIN: 'Logged in successfully!',
    LOGOUT: 'Logged out successfully.',
    UPLOAD: 'Photo uploaded successfully!'
  },
  ERROR: {
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'Please log in to continue.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'Resource not found.',
    SERVER: 'Server error. Please try again later.',
    INVALID_EMAIL: 'Please enter a valid email.',
    WEAK_PASSWORD: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters.`,
    FILE_TOO_LARGE: `File must be smaller than ${UPLOAD_SIZE_LIMIT / 1024 / 1024}MB.`,
    INVALID_FILE_TYPE: 'Please upload a valid image file.'
  }
}
