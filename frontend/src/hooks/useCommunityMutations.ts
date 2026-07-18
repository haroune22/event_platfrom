import { createCommunity, updateCommunity } from "@/api/community"
import type { CommunityCRUD } from "@/lib/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


export const useCommunityMutations = (community:CommunityCRUD) => {

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const createCommunityMutation = useMutation({
    mutationFn: (data: CommunityCRUD) => createCommunity(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["communities"],
      })
      toast.success("community created successfully")
      navigate('/communities')
      console.log("community created successfully", data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const updateCommunityMutation = useMutation({
    mutationFn: (data: CommunityCRUD) => updateCommunity(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["fetch-community-by-id", community?.id],
      })
      toast.success("community updated successfully")
      navigate(`/community/${community?.id}`)
      console.log("community updated successfully", data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return {
    createCommunityMutation,
    updateCommunityMutation
  }
}
