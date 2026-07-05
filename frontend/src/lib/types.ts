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
export type PostLevels = "beginner" | "intermediate" | "advanced"

export type PostCategory =
  | "sports"
  | "gaming"
  | "technology"
  | "fitness"
  | "education"
  | "movies"

export interface UpdatePostData {
  id: string
  title: string
  content: string
  type?: PostTypes
  media: string
  category: PostCategory
}
export interface CreatePostData {
  title: string
  content: string
  category: PostCategory
  type: PostTypes
  media: string
}

export interface CreateCommentData {
  text: string
  postId: string
}

export interface Post {
  id: string
  title: string
  content: string
  type: PostTypes
  media: string
  category: PostCategory
  creatorName: string
  profilePic: string | null
  createdAt: Date
}
export interface PostDetails {
  id: string
  title: string
  content: string
  type: PostTypes
  media: string
  communityId: string
  category: PostCategory
  creatorName: string
  profilePic: string
  createdAt: Date
  userId?: string
  eventDate?: Date
  maxParticipants?: number
  level?: PostLevels
  extraLinks?: string
}

export interface commentData {
  createdAt: Date
  name: string
  id: string
  postId: string
  profilePic: string
  text: string
  updatedAt: Date
  userId: string
}

export interface DeleteComment {
  postId: string
  commentId: string
}

export interface Event {
  id: string
  title: string
  content: string
  type: PostTypes
  media: string
  category: PostCategory
  name: string
  profilePic: string | null
  date: Date
  max_participants: number
  createdAt: Date
}

export interface CreateEventData {
  title: string
  content: string
  category: PostCategory
  type: PostTypes
  media: string
  date: Date
  max_participants: number
}

export interface UpdateEventData {
  id: string
  title: string
  content: string
  category: PostCategory
  type?: PostTypes
  media: string
  date: Date
  max_participants: number
}