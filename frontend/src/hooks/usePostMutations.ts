import { attendEvent, createEvent, deleteEvent, updateEvent } from "@/api/events"
import { createPost, deleteEducationPost, deletePost, savePost, updateEducationPost, updatePost } from "@/api/post"
import type {
  CreateEventData,
  CreatePostData,
  Post,
  UpdateEducationData,
  UpdateEventData,
  UpdatePostData,
} from "@/lib/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const usePostMutations = (post?: Post) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

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

  const createEventMutation = useMutation({
    mutationFn: (data: CreateEventData) => createEvent(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["fetch-events"],
      })
      toast.success("Event created successfully")
      // console.log("Event created successfully", data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const updateEventMutation = useMutation({
    mutationFn: (data: UpdateEventData) => updateEvent(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["fetch_event_by_id", post?.eventId],
      })
      toast.success("Event updated successfully")
      // console.log("Event updated successfully", data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const updateEducationMutation = useMutation({
    mutationFn: (data: UpdateEducationData) => updateEducationPost(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["fetch-post-by-id", post?.id],
      })
      toast.success("Education updated successfully")
      // console.log("Education updated successfully", data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const deletePostMutation = useMutation({
      mutationFn: deletePost,
  
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["posts"],
        })
  
        toast.success("Post deleted successfully 🗑️")
  
        navigate("/")
      },
  
      onError: () => {
        toast.error("Failed to delete post.")
      },
    })

    const deleteEventMutation = useMutation({
      mutationFn: deleteEvent,
       onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["events"],
        })
  
        toast.success("Event deleted successfully 🗑️")
  
        navigate("/")
      },
  
      onError: () => {
        toast.error("Failed to delete event.")
      },
    })

    const deleteEducationMutation = useMutation({
      mutationFn: deleteEducationPost,
       onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["posts"],
        })
  
        toast.success("Education deleted successfully 🗑️")
  
        navigate("/")
      },
  
      onError: () => {
        toast.error("Failed to delete education.")
      },
    })
  
    const savePostMutation = useMutation({
      mutationFn: savePost,
       onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["saved-posts"],
        })
  
        toast.success("Post saved successfully")
  
      },
  
      onError: () => {
        toast.error("Failed to save post.")
      },
    })

    const attendEventMutation = useMutation({
      mutationFn: attendEvent,
       onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["events"],
        })
  
        toast.success("Attending Event")
  
      },
  
      onError: () => {
        toast.error("Failed to attend event.")
      },
    })
  return {
    createPostMutation,
    updatePostMutation,
    createEventMutation,
    updateEventMutation,
    deletePostMutation,
    deleteEventMutation,
    updateEducationMutation,
    deleteEducationMutation,
    savePostMutation,
    attendEventMutation,
  }
}
