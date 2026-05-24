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

export type PostTypes = "normal" | "event" | "education"

export type PostCategory =
  | "sports"
  | "gaming"
  | "technology"
  | "fitness"
  | "education"
  | "movies"

export interface UpdatePostData {
  title: string
  content: string
  media: string
  category: PostCategory
}
export interface CreatePostData {
  title: string
  content: string
  category: PostCategory
  type: PostTypes
}

export interface CreateCommentData {
  text: string
}

export interface Post {
  id: string
  title: string
  content: string
  type: PostTypes
  media: string
  category: PostCategory
  creatorName: string
  createdAt: Date
}
