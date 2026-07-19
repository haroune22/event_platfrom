import { MessageCircle, Calendar, Users, Info } from "lucide-react"
import { Link, useLocation, useParams } from "react-router-dom"

const CommunityNavbar = () => {
  const location = useLocation()
  const { id } = useParams()


  const navItems = [
    {
      label: "Posts",
      icon: <MessageCircle size={18} />,
      path: `/communities/${id}`,
    },
    {
      label: "Events",
      icon: <Calendar size={18} />,
      path: `/communities/${id}/events`,
    },
    {
      label: "Members",
      icon: <Users size={18} />,
      path: `/communities/${id}/members`,
    },
    {
      label: "About",
      icon: <Info size={18} />,
      path: `/communities/${id}/about`,
    },
  ]


  const isActive = (path: string) => {
    if (path === `/communities/${id}`) {
      return location.pathname === path
    }
    return location.pathname === path
  }

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-16 z-40">
      <div className="flex items-center overflow-x-auto px-4 sm:px-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-2 px-4 py-3 font-medium text-sm transition duration-200 whitespace-nowrap
              border-b-2
              ${
                isActive(item.path)
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }
            `}
          >
            <span className={`${isActive(item.path) ? "text-blue-600" : "text-gray-500"}`}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default CommunityNavbar