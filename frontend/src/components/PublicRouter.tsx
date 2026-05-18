import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

export const PublicRoute = () => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
