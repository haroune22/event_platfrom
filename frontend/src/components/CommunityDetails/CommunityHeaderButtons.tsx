import { useMutation, useQueryClient } from "@tanstack/react-query"
import { joinCommunity, leaveCommunity } from "@/api/community"
import { Button } from "@/components/ui/button"
import { LogOut, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface CommunityHeaderButtonsProps {
  communityId?: string
  isMember: boolean
  isOwner: boolean
}

export const CommunityHeaderButtons = ({
  communityId,
  isMember,
  isOwner,
}: CommunityHeaderButtonsProps) => {
  const queryClient = useQueryClient()

  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)

  const joinMutation = useMutation({
    mutationFn: () => joinCommunity(communityId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community", communityId] })
      queryClient.invalidateQueries({ queryKey: ["members", communityId] })
      queryClient.invalidateQueries({ queryKey: ["isMember", communityId] })
      toast.success("community joined successfully")
    },
    onError: (err: Error) => {
      console.log(err)
    },
  })

  const leaveMutation = useMutation({
    mutationFn: () => leaveCommunity(communityId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community", communityId] })
      queryClient.invalidateQueries({ queryKey: ["members", communityId] })
      queryClient.invalidateQueries({ queryKey: ["isMember", communityId] })
      toast.success("Left community successfully")
      setShowLeaveConfirm(false)
    },
    onError: (err: Error) => {
      toast.error(err.message)
      console.log(err)
    },
  })

  const handleJoin = () => {
    joinMutation.mutate()
  }

  const handleLeave = () => {
    if (isOwner) return
    leaveMutation.mutate()
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {isMember ? (
          <Button
            onClick={() => {
              if (isOwner) {
                toast.error(
                  "You can't leave a community you own. Transfer ownership or delete the community first."
                )
                return
              }

              setShowLeaveConfirm(true)
            }}
            disabled={leaveMutation.isPending}
            variant="outline"
            className="cursor-pointer border-red-300 bg-white px-4 py-5 text-red-800 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {leaveMutation.isPending ? "Leaving..." : "Leave Community"}
          </Button>
        ) : (
          <Button
            onClick={handleJoin}
            disabled={joinMutation.isPending}
            className="bg-blue-600 cursor-pointer px-4 py-5 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            {joinMutation.isPending ? "Joining..." : "Join Community"}
          </Button>
        )}
      </div>

      {showLeaveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white shadow-lg">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">
                Leave community?
              </h3>
            </div>

            <div className="px-6 py-4">
              <p className="text-gray-600">
                Are you sure you want to leave this community? You can join
                again anytime.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <Button
                variant="outline"
                onClick={() => setShowLeaveConfirm(false)}
                disabled={leaveMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleLeave}
                disabled={leaveMutation.isPending}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {leaveMutation.isPending ? "Leaving..." : "Leave Community"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
