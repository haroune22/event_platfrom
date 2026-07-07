import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"

import type { PostDetails } from "@/lib/types"
import { usePostMutations } from "@/hooks/usePostMutations"

type DeletePostDialogProps = {
  post: PostDetails
}

const DeletePostDialog = ({ post }: DeletePostDialogProps) => {
  const { deleteEventMutation, deletePostMutation, deleteEducationMutation } = usePostMutations()

  const deleteMutation =
    post.type === "event" ? deleteEventMutation : post.type === "education" ? deleteEducationMutation : deletePostMutation

  const handleDeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (post.type === "event") {
      deleteMutation.mutate(post.eventId!)
    } else if (post.type === "normal") {
      deleteMutation.mutate(post.id)
    } else {
      deleteMutation.mutate(post.id)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md rounded-2xl bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-2xl">
            🗑️ Delete Post
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-2 leading-6">
            Are you sure you want to delete this post?
            <br />
            <span className="font-medium text-red-600">
              This action cannot be undone.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => handleDeletePost(e)}
            disabled={deleteMutation.isPending}
            className="cursor-pointer bg-red-600 text-white hover:bg-red-700"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePostDialog
