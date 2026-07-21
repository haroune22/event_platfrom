import { Plus, Search } from "lucide-react"
import { Link } from "react-router-dom"

export const MobileNavBar = () => {
  return (
    <div>
      <div className="border-t border-gray-200 bg-white sm:hidden">
        <div className="space-y-3 px-4 py-4">
          <div className="flex items-center gap-3 rounded-full bg-gray-100 px-4 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none"
            />
          </div>

          <Link
            to="/create-post"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition duration-200 hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Post
          </Link>

          <Link
            to="/profile"
            className="block rounded-lg px-4 py-2 text-gray-700 transition duration-200 hover:bg-gray-100"
          >
            Profile
          </Link>
          <button className="w-full rounded-lg px-4 py-2 text-left text-red-600 transition duration-200 hover:bg-red-50">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
