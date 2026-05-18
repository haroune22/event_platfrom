import type { LoginData, RegisterData } from "@/lib/types"
import api from "./axios"

export const fetchUser = async () => {
  const res = await api.get("/auth/user")
  return res.data.user
}

export const loginUser = async (data: LoginData) => {
  const res = await api.post("/auth/login", data)
  return res.data
}

export const registerUser = async (data: RegisterData) => {
  const res = await api.post("/auth/register", data)
  return res.data.user
}

export const logoutUser = async () => {
  const res = await api.post("/auth/logout")
  return res.data.user
}
