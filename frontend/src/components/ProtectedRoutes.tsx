import { useAuth } from "@/hooks/useAuth"
import { Outdent } from "lucide-react"
import { Navigate } from "react-router-dom"

export const ProtectedRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) return <div> Loading....</div>
  if (!user) return <Navigate to="/login" />

  return <Outdent />
}
