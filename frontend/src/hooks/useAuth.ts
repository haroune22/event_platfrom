import { AuthContext } from "@/store/AuthContext"
import { useContext } from "react"

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside authProvider")
  }
  return context
}
