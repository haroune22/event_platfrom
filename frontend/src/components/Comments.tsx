import { deleteComment, fetchComments } from "@/api/comments"
import { useAuth } from "@/hooks/useAuth"
import type { commentData, DeleteComment } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { Button } from "./ui/button"
import { useState } from "react"
import { Heart, MessageCircleMore, Trash2 } from "lucide-react"

type CommentsProps = {
  postId: string
}

const Comments = ({ postId }: CommentsProps) => {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(false)

  const queryClient = useQueryClient()

  const {
    data: comments,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetch-comments", postId],
    queryFn: () => fetchComments(postId),
    retry: false,
  })

  const deleteCommentMutation = useMutation({
    mutationFn: (credentials: DeleteComment) => deleteComment(credentials),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["fetch-comments", postId],
      })
      console.log("comment delete successfully")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleDeleteComment = ({ postId, commentId }: DeleteComment) => {
    deleteCommentMutation.mutate({ postId, commentId })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching posts</div>
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      {comments.map((c: commentData) => (
        <div
          key={c.id}
          className="w-full rounded-xl border-b border-gray-300 bg-white p-4"
        >
          <div className="flex h-fit w-full items-center gap-4">
            {c.profilePic ? (
              <img
                src={c.profilePic}
                alt={`${c.name} logo`}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 font-medium text-gray-700">
                {c.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-sm text-gray-500">
                Posted by {c.name || "anonymous"}
              </p>
              <span className="flex text-base text-gray-400">
                {format(new Date(c.createdAt), "MMM dd, yyyy")}
              </span>
            </div>
            {user?.id === c.userId && (
              <Button
                onClick={() => handleDeleteComment({ postId, commentId: c.id })}
                className="group flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 text-gray-600 transition duration-200 hover:bg-yellow-50 hover:text-red-600"
              >
                <Trash2
                  size={18}
                  className="transition group-hover:scale-110"
                />
                <span className="text-sm font-medium">Delete</span>
              </Button>
            )}
          </div>
          <div className="mt-3 pl-14">
            <p className="wrap-break-word whitespace-pre-wrap text-gray-700">
              {c.text}
            </p>
          </div>
          <div className="flex items-center justify-between px-2 py-1">
            <Button
              variant={"ghost"}
              size={"lg"}
              onClick={() => setIsLiked(!isLiked)}
              className={`group flex flex-1 transition duration-200 ${
                isLiked
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-600 hover:bg-gray-100 hover:text-red-600"
              }`}
            >
              <Heart
                size={18}
                className={`transition group-hover:scale-110 ${
                  isLiked ? "fill-current" : ""
                }`}
              />
              <span className="text-sm font-medium">Like</span>
            </Button>
            <Button className="group flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition duration-200 hover:bg-yellow-50 hover:text-yellow-600">
              <MessageCircleMore
                size={18}
                className="transition group-hover:scale-110"
              />
              <span className="text-sm font-medium">Reply</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments
