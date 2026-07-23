import type { CommunityCRUD } from "@/lib/types"
import api from "./axios"

export const fetchCommunityById = async (id?: string) => {
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

export const fetchCommunityPosts = async (id?: string, page?: number) => {
  const res = await api.get(`/community/${id}/posts`, {
    params: {
      page
    }
  })
  return res.data
}

export const fetchCommunityEvents = async (id?: string, page?: number) => {
  const res = await api.get(`/community/${id}/events`, {
    params: {
      page
    }
  })
  return res.data
}

export const fetchCommunityMembers = async (id?: string, page?: number) => {
  const res = await api.get(`/community/${id}/members`, {
    params: {
      page
    }
  })
  return res.data
}

export const createCommunity = async (community: CommunityCRUD) => {
  const res = await api.post('community', community)
  return res.data
}

export const updateCommunity = async (community: CommunityCRUD) => {
  const res = await api.put(`community/${community.id}`, community)
  return res.data
}

export const joinCommunity = async (communityId: string) => {
  // try {
    const res = await api.post(`/community/${communityId}/join`)
    return res.data
  // } catch (error: Error) {
  //   const errorMessage =
  //     error.res?.data?.message || "Failed to join community"
  //     console.log(errorMessage)
    // throw new Error(errorMessage)
  // }
}
 
// Leave Community
export const leaveCommunity = async (communityId: string) => {
  try {
    const res = await api.post(`/community/${communityId}/leave`)
    return res.data
  } catch (error: unknown) {
     if (error instanceof Error) {
    console.log(error.message); 
  } else {
    console.log("An unexpected error occurred:", error);
  }
  }
}