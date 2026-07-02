import type { CreatePostData, UpdatePostData } from "@/lib/types"
import api from "./axios"

export const fetchPosts = async () => {
  const res = await api.get("/posts")
  return res.data.posts
}

export const fetchFeedPosts = async () => {
  const res = await api.get("/posts/feed")
  return res.data.posts
}

export const fetchPostByCat = async (category: string) => {
  const res = await api.get(`/posts/category/${category}`)
  return res.data.posts
}

export const fetchPostById = async (id: string) => {
  const res = await api.get(`/posts/${id}`)
  return res.data.post
}

export const createPost = async (data: CreatePostData) => {
  const res = await api.post("/posts", data)
  return res.data
}

export const updatePost = async (data: UpdatePostData) => {
  const res = await api.put(`/posts/${data.id}`, data)
  return res.data.post
}

export const deletePost = async (id: string) => {
  const res = await api.delete(`/posts/${id}`)
  return res.data
}
