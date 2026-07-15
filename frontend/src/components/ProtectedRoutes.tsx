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
        <main className="w-full flex-1 md:ml-64">
          <div className="mx-auto max-w-6xl px-2 py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}
