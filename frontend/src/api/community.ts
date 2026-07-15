import api from "./axios"

export const fetchCommunityById = async (communityId: string) => {
  const res = await api.get(`/community/${communityId}`)
  return res.data.community
}


export const fetchUserCommunities = async () => {
  const res = await api.get('/community/me')
  return res.data.communities
}

export const fetchCommunities = async () => {
  const res = await api.get('/community')
  return res.data.communities
}