import { createPost, updatePost } from "@/api/post"
import type { CreatePostData, PostDetails, UpdatePostData } from "@/lib/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"






export const usePostMutations = (post?: PostDetails) => {

      const queryClient = useQueryClient()

      const createPostMutation = useMutation({
    mutationFn: (data: CreatePostData) => createPost(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
      toast.success("Post created successfully")
      console.log("post created successfully", data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: (data: UpdatePostData) => updatePost(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["fetch-post-by-id", post?.id],
      })
      toast.success("Post updated successfully")
      console.log("post updated successfully", data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

    return {
        createPostMutation,
        updatePostMutation
    }
}