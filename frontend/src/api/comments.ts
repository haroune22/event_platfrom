import type { CreateCommentData, DeleteComment } from "@/lib/types"
import api from "./axios"

export const fetchComments = async (postId: string) => {
  const res = await api.get(`/posts/${postId}/comments`)
  return res.data.comments
}

export const createComment = async (data: CreateCommentData) => {
  const res = await api.post(`/posts/${data.postId}/comment`, data)
  return res.data.comment
}

export const deleteComment = async (data: DeleteComment) => {
  const res = await api.delete(
    `/posts/${data.postId}/comment/${data.commentId}`
  )
  return res.data
}
