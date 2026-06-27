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
      <DialogContent>
        <PostForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreatePostDialog
