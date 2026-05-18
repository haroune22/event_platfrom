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
