import type { CreateCommentData } from "@/lib/types"
import api from "./axios"

export const fetchComments = async (postId: string) => {
  const res = await api.get(`/posts/${postId}/comments`)
  return res.data.comments
}

export const createComment = async (
  data: CreateCommentData,
  postId: string
) => {
  const res = await api.post(`/posts/${postId}/comments`, data)
  return res.data.comment
}

export const deletePost = async (postId: string, commentId: string) => {
  const res = await api.delete(`/posts/${postId}/comment/${commentId}`)
  return res.data
}
