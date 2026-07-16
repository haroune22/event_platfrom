import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { userCommunitiesType } from "@/lib/types"
import type { Dispatch, SetStateAction } from "react"
import CommunityForm from "./CommunityForm"

type createPostDialogProps = {
  openDialog: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  community?: userCommunitiesType
}

const CreateCommunityDialog = ({
  openDialog,
  onOpenChange,
  community,
}: createPostDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={openDialog}>
      <DialogContent className="h-[92vh] w-[95vw] max-w-[1500px] overflow-hidden p-0">
        <CommunityForm community={community} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateCommunityDialog
