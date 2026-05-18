import api from "./axios"

export const fetchUser = async () => {
  const res = await api.get("/user")
  return res.data.user
}
