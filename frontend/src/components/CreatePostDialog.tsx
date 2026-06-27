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
      <DialogContent className="max-w-4xl overflow-hidden rounded-2xl bg-white p-0 shadow-2xl">
        <PostForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}

export default CreatePostDialog
