import { type ReactNode } from "react"
import { AuthContext } from "./AuthContext"
import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "@/api/user"

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["auth-user"],
    queryFn: fetchUser,
    retry: false,
  })

  return (
    <AuthContext.Provider
      value={{
        loading: isPending,
        user: isError ? null : data,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
