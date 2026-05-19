import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { SideBar } from "./SideBar"

export const ProtectedRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) return <div> Loading....</div>
  if (!user) return <Navigate to="/login" />

  return (
    <>
      <Navbar />
      <div className="flex pt-18">
        <SideBar />
        <main className="flex flex-1 justify-center p-2">
          <div className="w-full max-w-3xl">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}
