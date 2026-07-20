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
export type PostDifficultys = "beginner" | "intermediate" | "advanced"
export type communityVisibility = "public" | "private"
export type userRoles = "owner" | "member" | "moderator"

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
  difficulty?: string
  externalLink?: string
}

export interface CreateCommentData {
  text: string
  postId: string
}

export interface Post {
  id: string
  eventId?: string
  educationId?: string
  title: string
  content: string
  type: PostTypes
  media: string
  category: PostCategory
  creatorName: string
  profilePic: string | null
  date?: string
  max_participants?: number
  difficulty?: PostDifficultys
  externalLink?: string
  createdAt: Date
  savedAt?: Date
  joinedAt?: Date
}
export interface PostDetails {
  id: string
  eventId?: string
  educationId?: string
  title: string
  content: string
  type: PostTypes
  media: string
  communityId?: string
  category: PostCategory
  creatorName: string
  profilePic: string
  createdAt: Date
  userId?: string
  eventDate?: string
  maxParticipants?: number
  difficulty?: PostDifficultys
  externalLink?: string
  savedAt?: Date
  joinedAt?: Date
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
  creatorName: string
  profilePic: string | null
  eventDate: string
  maxParticipants: number
  createdAt: Date
}

export interface CreateEventData {
  title: string
  content: string
  category: PostCategory
  type: PostTypes
  media: string
  eventDate: string
  maxParticipants: number
}

export interface UpdateEventData {
  id: string
  title: string
  content: string
  category: PostCategory
  type?: PostTypes
  media: string
  eventDate: string
  maxParticipants: number
}

export interface UpdateEducationData {
  id: string
  title: string
  content: string
  category: PostCategory
  type?: PostTypes
  media: string
  difficulty: string
  externalLink: string
}

export interface userCommunitiesType {
  id: string
  name: string
  description: string
  createdBy: string
  category: PostCategory
  updatedAt: Date
  image: string
  banner: string
  visibility: communityVisibility
  creatorName: string
  profilePic: string
  role?: userRoles
}


export interface CommunityCRUD {
  id?: string
  name: string
  description: string
  createdBy?: string
  createdAt?: string
  category: PostCategory
  image: File | null | string
  banner: File | null | string
  visibility: communityVisibility
  creatorName?: string
  profilePic?: string
  role?: userRoles
}