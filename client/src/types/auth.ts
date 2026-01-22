export interface User {
  id: string
  email: string
  createdAt: string
}

export interface SignupRequest {
  email: string
  password: string
}

export interface SignupResponse {
  message: string
  userId: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  token: string
  user: User
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}
