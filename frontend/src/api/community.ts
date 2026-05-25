import api from "./axios"

export const fetchCommunityById = async (communityId: string) => {
  const res = await api.get(`/community/${communityId}`)
  return res.data.community
}
