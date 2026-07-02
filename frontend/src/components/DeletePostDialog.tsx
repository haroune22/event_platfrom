import { deletePost } from "@/api/post"
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

type DeletePostDialogProps = {
  postId: string
}

const DeletePostDialog = ({ postId }: DeletePostDialogProps) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
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

  const handleDeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    deleteMutation.mutate(postId)
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
            disabled={deleteMutation.isPending}
            className="cursor-pointer text-white bg-red-600 hover:bg-red-700"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Post"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePostDialog