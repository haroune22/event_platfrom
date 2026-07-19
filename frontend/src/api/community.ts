import type { CommunityCRUD } from "@/lib/types"
import api from "./axios"

export const fetchCommunityById = async (id: string) => {
  const res = await api.get(`/community/${id}`)
  return res.data
}


export const fetchUserCommunities = async () => {
  const res = await api.get('/community/me')
  return res.data.communities
}

export const fetchCommunities = async (name?:string) => {
  const res = await api.get('/community', {
    params:{
      name
    }
  })
  return res.data.communities
}

export const createCommunity = async (community: CommunityCRUD) => {
  const res = await api.post('community', community)
  return res.data
}

export const updateCommunity = async (community: CommunityCRUD) => {
  const res = await api.put(`community/${community.id}`, community)
  return res.data
}