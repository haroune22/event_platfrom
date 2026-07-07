
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


  const { deleteEventMutation, deletePostMutation } = usePostMutations()

  const handleDeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(post.type === 'event'){
      deleteEventMutation.mutate(post?.eventId ?? post.id)
    }else {
      deletePostMutation.mutate(post.id)
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

      <AlertDialogContent className="max-w-md bg-white rounded-2xl">
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
            disabled={deletePostMutation.isPending}
            className="cursor-pointer text-white bg-red-600 hover:bg-red-700"
          >
            {deleteEventMutation.isPending ? "Deleting..." : "Delete Post"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePostDialog