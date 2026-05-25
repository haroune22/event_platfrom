import { logoutUser } from "@/api/user"
import { useAuth } from "@/hooks/useAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Search, Bell, Plus, Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Navbar = () => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["auth-user"],
      })
      console.log("logout successful")
      navigate("/login")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    logoutMutation.mutate()
  }

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-12 w-40 items-center justify-center rounded-lg bg-linear-to-br">
              <img src="logo.png" className="h-full w-full object-cover" />
            </div>
          </Link>

          <div className="mx-8 hidden max-w-md flex-1 md:flex">
            <div className="flex w-full items-center gap-3 rounded-full bg-gray-100 px-4 py-2 transition duration-200 hover:bg-gray-200">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search posts, events..."
                className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none"
              />
            </div>
          </div>

          <div className="hidden items-center gap-6 sm:flex">
            <button className="group relative">
              <Bell
                size={20}
                className="text-gray-700 transition duration-200 hover:text-blue-600"
              />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              <div className="pointer-events-none absolute right-0 z-10 mt-2 w-48 rounded-lg bg-white p-4 opacity-0 shadow-lg transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <p className="text-sm text-gray-600">No new notifications</p>
              </div>
            </button>

            <Link
              to="/create-post"
              className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 font-medium text-white transition duration-200 hover:bg-blue-700"
            >
              <Plus size={18} />
              <span className="hidden lg:inline">Create</span>
            </Link>

            <div className="group relative">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="h-8 w-8 cursor-pointer rounded-full object-cover transition duration-200 hover:ring-2 hover:ring-blue-500"
                />
              ) : (
                <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-blue-400 to-indigo-600 font-semibold text-white transition duration-200 hover:ring-2 hover:ring-blue-500">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <button
              onClick={(e) => handleLogout(e)}
              className="w-full cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white transition duration-200 hover:bg-red-500"
            >
              Logout
            </button>
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 transition duration-200 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
