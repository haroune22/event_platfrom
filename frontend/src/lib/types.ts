export interface User {
  id: string
  name: string
  email: string
  bio?: string
  profilePic?: string
  createdAt: string
}
export interface AuthContextType {
  user: User | null
  loading: boolean
}

export interface LoginData {
  email: string
  password: string
}
export interface RegisterData {
  username: string
  email: string
  password: string
}
