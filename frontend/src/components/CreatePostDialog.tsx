import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { Dispatch, SetStateAction } from "react"
import PostForm from "./PostForm"
import type { PostDetails, PostTypes } from "@/lib/types"

type createPostDialogProps = {
  openDialog: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  post?: PostDetails
  PostType?: PostTypes
}

const CreatePostDialog = ({
  openDialog,
  onOpenChange,
  PostType,
  post
}: createPostDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={openDialog}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden rounded-3xl p-0">
        <PostForm PostType={PostType} post={post} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}

export default CreatePostDialog
