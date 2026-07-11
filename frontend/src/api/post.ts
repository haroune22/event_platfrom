import type { CreatePostData, UpdatePostData } from "@/lib/types"
import api from "./axios"

export const fetchPosts = async (category?: string) => {
  const res = await api.get("/posts", {
    params:{
      category
    }
  })
  return res.data.posts
}

export const fetchFeedPosts = async (category: string) => {
  const res = await api.get("/posts/feed", {
    params:{
      category
    }
  })
  return res.data.data
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
export const updateEducationPost = async (data: UpdatePostData) => {
  const res = await api.put(`/posts/education/${data.id}`, data)
  return res.data.post
}

export const deleteEducationPost = async (id: string) => {
  const res = await api.delete(`/posts/education/${id}`)
  return res.data
}

export const getSavedPosts = async () => {
  const res = await api.get(`/posts/saved`)
  return res.data.savedPosts
}

export const savePost = async (id: string) => {
  const res = await api.post(`/posts/${id}/save`)
  return res.data
}
export const unSavePost = async (id: string) => {
  const res = await api.delete(`/posts/${id}/save`)
  return res.data
}
