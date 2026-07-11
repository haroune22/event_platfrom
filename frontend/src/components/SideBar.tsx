import { Home, TrendingUp, Calendar, Users, Bookmark } from "lucide-react"
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom"

export const SideBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get("category")

  const canFilter = ["/", "/feed", "/posts/saved", "events"].includes(
    location.pathname
  )
  console.log(canFilter)

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

  const categories = [
    { label: "Sports", icon: "⚽" },
    { label: "Gaming", icon: "🎮" },
    { label: "Technology", icon: "💻" },
    { label: "Fitness", icon: "🏋️" },
    { label: "Movies", icon: "🎬" },
    { label: "Education", icon: "🎓" },
  ]

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams)

    if (selectedCategory === category.toLocaleLowerCase()) {
      params.delete("category")
    } else {
      params.set("category", category.toLocaleLowerCase())
    }

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    })
  }

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
              to={{
                pathname: link.path,
                search: "",
              }}
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
            {categories.map((category) => (
              <button
                key={category.label}
                onClick={() => handleCategory(category.label)}
                className={`w-full cursor-pointer rounded-lg px-4 py-2 text-left transition-all duration-300 ease-out ${
                  selectedCategory === category.label.toLowerCase()
                    ? "scale-[1.05] bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:scale-[1.03] hover:bg-gray-50 hover:shadow-sm"
                }`}
              >
                <span className="mr-2 inline-block transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                  {category.icon}
                </span>{" "}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
