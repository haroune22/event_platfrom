import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { Dispatch, SetStateAction } from "react"
import PostForm from "./PostForm"

type createPostDialogProps = {
  openDialog: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

const CreatePostDialog = ({
  openDialog,
  onOpenChange,
}: createPostDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={openDialog}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden rounded-3xl p-0">
        <PostForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}

export default CreatePostDialog
