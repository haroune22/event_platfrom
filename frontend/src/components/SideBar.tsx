import { Home, TrendingUp, Calendar, Users, Bookmark } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export const SideBar = () => {
  const location = useLocation()

  const mainLinks = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={20} />,
    },
    {
      name: "Popular",
      path: "/feed",
      icon: <TrendingUp size={20} />,
    },
    {
      name: "Event",
      path: "/event",
      icon: <Calendar size={20} />,
    },
    {
      name: "Communities",
      path: "/communities",
      icon: <Users size={20} />,
    },
    {
      name: "Saved",
      path: "/posts/saved",
      icon: <Bookmark size={20} />,
    },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <aside className="fixed top-16 left-0 hidden h-[calc(100vh-64px)] w-64 overflow-y-auto border-r border-gray-300 bg-white md:block">
      <div className="space-y-8 p-6">
        <nav className="space-y-2">
          <p className="mb-3 px-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Navigation
          </p>
          {mainLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition duration-200 ${
                isActive(link.path)
                  ? "border-l-4 border-blue-600 bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              } `}
            >
              <span
                className={` ${isActive(link.path) ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"} `}
              >
                {link.icon}
              </span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="space-y-4 border-t border-gray-300 pt-4">
          <p className="px-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Categories
          </p>
          <div className="space-y-2 px-2">
            {[
              "Sports",
              "Gaming",
              "Technology",
              "Fitness",
              "Movies",
              "education",
            ].map((category) => (
              <button
                key={category}
                className="w-full rounded-lg px-4 py-2 text-left text-sm text-gray-600 transition duration-200 hover:bg-gray-50 hover:text-gray-900"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
